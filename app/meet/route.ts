const bookingUrl = "https://calendar.notion.so/meet/kevinjosethomas/30m";
const pageUrl = "https://kevinjosethomas.com/meet";
const imageUrl = "https://kevinjosethomas.com/meet/og.png";

// Serve metadata in the initial HTML so link previews do not follow an HTTP
// redirect to Notion. Browsers navigate immediately without loading React.
export function GET() {
  return new Response(
    `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Meet with Kevin Thomas</title>
    <meta name="description" content="Book a 30-minute conversation with Kevin Thomas.">
    <link rel="canonical" href="${pageUrl}">
    <link rel="icon" href="/favicon.ico">
    <meta property="og:type" content="website">
    <meta property="og:site_name" content="Kevin Thomas">
    <meta property="og:title" content="Meet with Kevin Thomas">
    <meta property="og:description" content="Book a 30-minute conversation with Kevin Thomas.">
    <meta property="og:url" content="${pageUrl}">
    <meta property="og:image" content="${imageUrl}">
    <meta property="og:image:type" content="image/png">
    <meta property="og:image:width" content="1200">
    <meta property="og:image:height" content="630">
    <meta property="og:image:alt" content="Let’s meet. Kevin Thomas — 30-minute conversation.">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="Meet with Kevin Thomas">
    <meta name="twitter:description" content="Book a 30-minute conversation with Kevin Thomas.">
    <meta name="twitter:image" content="${imageUrl}">
    <meta name="twitter:image:alt" content="Let’s meet. Kevin Thomas — 30-minute conversation.">
    <style>
      :root { color-scheme: dark; }
      * { box-sizing: border-box; }
      body { margin: 0; min-height: 100svh; display: grid; place-items: center; padding: 32px; background: #000; color: #ededed; font: 16px/1.6 system-ui, sans-serif; }
      main { width: 100%; max-width: 480px; }
      p { color: #999; }
      .name { font: 13px ui-monospace, monospace; color: #999; }
      h1 { font-size: clamp(36px, 8vw, 56px); font-weight: 500; letter-spacing: -.05em; margin: 24px 0 12px; }
      a { color: #ededed; text-underline-offset: 5px; }
      a:focus-visible { outline: 2px solid #ededed; outline-offset: 6px; }
    </style>
    <script>window.location.replace(${JSON.stringify(bookingUrl)});</script>
  </head>
  <body>
    <main>
      <div class="name">kevin thomas / meet</div>
      <h1>Let’s meet.</h1>
      <p>Opening my calendar for a 30-minute conversation.</p>
      <a href="${bookingUrl}">Choose a time →</a>
    </main>
  </body>
</html>`,
    { headers: { "Content-Type": "text/html; charset=utf-8" } },
  );
}
