import path from 'node:path';
import fs from 'node:fs';
import { config, assert, hash, assets, write } from './common.mjs';

export const renderFlags=['--disable-gpu','--disable-skia-runtime-opts','--force-color-profile=srgb','--run-all-compositor-stages-before-draw','--disable-threaded-animation','--disable-threaded-scrolling','--font-render-hinting=none','--disable-lcd-text'];
export const captureStyle='*,*::before,*::after{animation:none!important;transition:none!important} .work-enter{transform:scale(1)!important;opacity:1!important}';
export const animationPolicy='css-disabled-final-frame-embedded-svg-v2';
export const animatedGifPaths=['/projects/images/kos-mujoco.gif','/projects/images/ksim-1.gif','/projects/images/ksim-2.gif','/projects/images/v0-auto.gif'];

export function expectedScreens(allRoutes) {
  const result=[];
  for(const viewport of Object.keys(config.viewports)) {
    for(const route of allRoutes) for(const state of ['initial','middle','bottom']) result.push(`${viewport}:${route}:${state}`);
    for(const state of ['engineering-off','research-off','community-on','all-on','reset','header-work','header-home','detail-back','hash-scroll','team-open','team-closed','zoom-open','zoom-closed','zoom-click-closed']) result.push(`${viewport}:interaction:${state}`);
  }
  for(const state of ['palette-open','palette-down','palette-up','palette-search','palette-enter','palette-escape','toc-scroll']) result.push(`desktop:interaction:${state}`);
  return result.sort();
}
export function expectedPath(key) {
  const [,route,state]=key.split(':');
  if(route!=='interaction')return route;
  if(['engineering-off','research-off','community-on','all-on','reset','header-work'].includes(state))return '/work';
  if(state==='hash-scroll')return config.interactions.hash;
  if(state.startsWith('team-'))return config.interactions.team;
  if(state.startsWith('zoom-'))return config.interactions.zoom;
  if(['palette-enter','palette-escape'].includes(state))return '/work/prime-intellect';
  if(state==='toc-scroll')return config.interactions.toc;
  return '/';
}
async function settle(page) {
  await page.evaluate(()=>document.fonts.ready);
  await page.waitForTimeout(650);
  await page.evaluate(async()=>{await Promise.all([...document.images].filter(i=>i.getBoundingClientRect().bottom>0 && i.getBoundingClientRect().top<innerHeight).map(i=>i.decode().catch(()=>{})));});
  assert(await page.locator('main, article').count()>0,'Missing page content');
  const broken=await page.evaluate(()=>[...document.images].filter(i=>i.getBoundingClientRect().top<innerHeight && i.getBoundingClientRect().bottom>0 && (!i.complete || !i.naturalWidth)).map(i=>i.src));
  assert(broken.length===0,`Broken visible images: ${broken}`);
}
export async function content(page) {
  return page.evaluate(()=>{
    const attrs=(el,names)=>Object.fromEntries(names.map(n=>[n,el.getAttribute(n)]));
    const normalize=url=>url?.startsWith(location.origin)?url.slice(location.origin.length):url;
    return {
      path:location.pathname+location.hash,title:document.title,lang:document.documentElement.lang,
      text:document.body.innerText,
      headings:[...document.querySelectorAll('h1,h2,h3,h4,h5,h6')].map(e=>({tag:e.tagName,text:e.textContent,id:e.id})),
      links:[...document.querySelectorAll('a')].map(e=>({text:e.textContent,...attrs(e,['href','target','rel','aria-label'])})),
      images:[...document.images].map(e=>{const r=e.getBoundingClientRect();const visible=r.width>0&&r.height>0&&r.bottom>0&&r.top<innerHeight&&r.right>0&&r.left<innerWidth;return {...attrs(e,['src','alt','srcset','sizes','loading','width','height']),currentSrc:visible?normalize(e.currentSrc):null};}),
      metadata:[...document.head.querySelectorAll('meta,link[rel="canonical"],link[rel="alternate"],link[rel="icon"]')].map(e=>({...attrs(e,['name','property','content','rel','href','type','sizes'])})),
      controls:[...document.querySelectorAll('button,input,[role="option"],[role="dialog"]')].map(e=>({tag:e.tagName,text:e.textContent,...attrs(e,['role','aria-label','aria-expanded','aria-selected','aria-modal','placeholder','type']),value:e.value??null})),
      animations:[...document.querySelectorAll('*')].map(e=>({name:getComputedStyle(e).animationName,duration:getComputedStyle(e).animationDuration,iterations:getComputedStyle(e).animationIterationCount})).filter(e=>e.name!=='none')
    };
  });
}
export async function captureParity(browser,base,dir,allRoutes,{proofOnly=false}={}) {
  const publicAssets=assets(),shots={},errors=[];
  fs.mkdirSync(path.join(dir,'screenshots'));
  for(const [viewport,size] of Object.entries(config.viewports)) {
    const context=await browser.newContext({viewport:size,deviceScaleFactor:1,locale:'en-US',timezoneId:'America/Los_Angeles',colorScheme:'dark',serviceWorkers:'block',hasTouch:viewport==='mobile',isMobile:viewport==='mobile'});
    try {
      // Playwright cannot reach CSS animations inside an <img> SVG document.
      // Apply only the permitted test animation override, preserving the original asset hash.
      await context.route('**/inference-header.svg',async route=>{
        assert(new URL(route.request().url()).origin===base,'Unexpected SVG origin');
        const response=await route.fetch();const original=await response.body();
        assert(response.ok() && hash(original)===publicAssets['public/inference-header.svg'],'Animated SVG does not match the source asset');
        const body=original.toString('utf8').replace('</svg>','<style>*{animation:none!important;transition:none!important}</style></svg>');
        const headers=response.headers();delete headers['content-length'];delete headers['content-encoding'];delete headers['transfer-encoding'];
        await route.fulfill({status:response.status(),headers,body});
      });
      const page=await context.newPage();
      page.on('pageerror',e=>errors.push({viewport,path:page.url().replace(base,''),message:e.message}));
      const go=async route=>{const res=await page.goto(base+route,{waitUntil:'load'});assert(res?.status()===200,`Parity route HTTP failure: ${route}`);await settle(page);};
      const snap=async key=>{
        await page.mouse.move(0,0);await settle(page);
        const masks=await page.locator('img').evaluateAll(images=>images.filter(i=>/\.gif(?:\?|$)/i.test(i.currentSrc||i.src)).map(i=>({src:i.getAttribute('src'),url:new URL(i.currentSrc||i.src).pathname})));
        for(const mask of masks)assert(animatedGifPaths.includes(mask.url) && publicAssets[`public${mask.url}`],`Only local hashed GIFs may be masked: ${mask.url}`);
        const maskLocators=masks.map(m=>page.locator(`img[src=${JSON.stringify(m.src)}]`));
        const file=`screenshots/${hash(key).slice(0,24)}.png`;
        const capturedContent=await content(page);const capturedScroll=await page.evaluate(()=>({x:scrollX,y:scrollY,height:document.documentElement.scrollHeight}));
        const buffer=await page.screenshot({path:path.join(dir,file),fullPage:false,style:captureStyle,animations:'disabled',caret:'hide',mask:maskLocators,maskColor:'#FF00FF'});
        shots[key]={file,sha256:hash(buffer),masks:masks.map(m=>({url:m.url,sha256:publicAssets[`public${m.url}`]})),content:capturedContent,scroll:capturedScroll};
      };
      const interaction=state=>snap(`${viewport}:interaction:${state}`);
      for(const route of allRoutes) {
        await go(route);
        await snap(`${viewport}:${route}:initial`);
        await page.evaluate(()=>scrollTo({top:Math.max(0,(document.documentElement.scrollHeight-innerHeight)/2),behavior:'instant'}));
        await snap(`${viewport}:${route}:middle`);
        await page.evaluate(()=>scrollTo({top:document.documentElement.scrollHeight,behavior:'instant'}));
        await snap(`${viewport}:${route}:bottom`);
      }
      await go('/work');
      // Record every transition, including empty selected set (= all projects).
      const initial=await content(page);
      await page.getByRole('button',{name:'Engineering',exact:true}).click();await interaction('engineering-off');
      await page.getByRole('button',{name:'Research',exact:true}).click();await interaction('research-off');
      await page.getByRole('button',{name:'Community',exact:true}).click();await interaction('community-on');
      await page.getByRole('button',{name:'Engineering',exact:true}).click();
      await page.getByRole('button',{name:'Research',exact:true}).click();await interaction('all-on');
      await page.getByRole('button',{name:'Community',exact:true}).click();await interaction('reset');
      assert(JSON.stringify((await content(page)).links)===JSON.stringify(initial.links),'Work filter did not reset');
      assert(shots[`${viewport}:interaction:engineering-off`].content.links.length!==initial.links.length,'Work filter had no effect');
      await go('/');
      await page.evaluate(()=>window.__navigationToken='client-navigation');
      await page.locator('header a[href="/work"]').click();await page.waitForURL(base+'/work');await interaction('header-work');
      assert(await page.evaluate(()=>window.__navigationToken)==='client-navigation','Header work navigation reloaded document');
      await page.locator('header a[href="/"]').click();await page.waitForURL(base+'/');await interaction('header-home');
      assert(await page.evaluate(()=>window.__navigationToken)==='client-navigation','Header home navigation reloaded document');
      await page.getByRole('link',{name:'Prime Intellect',exact:true}).click();await page.waitForURL(base+'/work/prime-intellect');await settle(page);
      await page.getByRole('button',{name:'Back',exact:true}).click();await page.waitForURL(base+'/');await interaction('detail-back');
      await go(config.interactions.hash);
      const target=config.interactions.hash.split('#')[1];
      await page.waitForFunction(id=>Math.abs(document.getElementById(id).getBoundingClientRect().top)<200,target,{timeout:5000});
      await interaction('hash-scroll');
      await go(config.interactions.team);
      const team=page.getByRole('button',{name:/Show \d+ more team member/});
      await team.focus();await page.keyboard.press('Space');
      assert(await team.getAttribute('aria-expanded')==='true','Team did not expand');await interaction('team-open');
      await page.keyboard.press('Space');
      assert(await team.getAttribute('aria-expanded')==='false','Team did not close');await interaction('team-closed');
      await go(config.interactions.zoom);
      const image=page.locator('img.cursor-zoom-in').first();
      await image.click();await page.getByRole('dialog').waitFor();
      assert(await page.evaluate(()=>document.documentElement.style.overflow)==='hidden','Zoom did not lock scroll');await interaction('zoom-open');
      await page.keyboard.press('Escape');await page.getByRole('dialog').waitFor({state:'detached'});await interaction('zoom-closed');
      assert(await page.evaluate(()=>document.documentElement.style.overflow)!=='hidden','Zoom did not restore scroll');
      await image.click();await page.getByRole('dialog').click();await page.getByRole('dialog').waitFor({state:'detached'});await interaction('zoom-click-closed');
      if(viewport==='desktop') {
        await go('/');
        await page.keyboard.press('Control+k');await page.getByRole('dialog',{name:'Command palette'}).waitFor();await interaction('palette-open');
        const selected=()=>page.locator('[role="option"][aria-selected="true"]').innerText();
        const first=await selected();await page.keyboard.press('ArrowDown');assert(await selected()!==first,'Palette ArrowDown failed');await interaction('palette-down');
        await page.keyboard.press('ArrowUp');assert(await selected()===first,'Palette ArrowUp failed');await interaction('palette-up');
        await page.getByRole('combobox').fill('Prime Intellect');assert((await selected()).includes('Prime Intellect'),'Palette search failed');await interaction('palette-search');
        await page.keyboard.press('Enter');await page.waitForURL(base+'/work/prime-intellect');await page.getByRole('dialog').waitFor({state:'detached'});await interaction('palette-enter');
        await page.keyboard.press('Control+k');await page.getByRole('dialog').waitFor();await page.keyboard.press('Escape');await page.getByRole('dialog').waitFor({state:'detached'});await interaction('palette-escape');
        await go(config.interactions.toc);
        const toc=page.locator('nav a[href^="#"]').first();
        assert(await toc.isVisible(),'Desktop TOC missing');const href=await toc.getAttribute('href');await toc.click();
        await page.waitForTimeout(1000);
        assert(await page.locator(`[id="${href.slice(1)}"]`).evaluate(e=>Math.abs(e.getBoundingClientRect().top)<200),'TOC did not scroll');await interaction('toc-scroll');
      }
    } finally {await context.close();}
  }
  write(path.join(dir,'parity.partial.json'),{shots,errors});
  assert(proofOnly || errors.length===0,`Parity runtime errors (see parity.partial.json): ${JSON.stringify(errors)}`);
  assert(JSON.stringify(Object.keys(shots).sort())===JSON.stringify(expectedScreens(allRoutes)),'Missing required parity states');
  return {complete:true,animationPolicy,captureStyle,renderFlags,browserVersion:browser.version(),shots,errors};
}
