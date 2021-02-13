
export const ExpandNav = {
  initial: { y: "20px", opacity: 0 },
  animate: { y: "0px", opacity: 1, transition: { duration: 0.4 } }
}

export const MobileNavSlide = {
  initial: { x: "-100vw" },
  animate: { x: "0vw", transition: { duration: 0.2 } },
  exit: { x: "-100vw", transition: { duration: 0.2 } }
}

export const HomeSocialsSlideUp = {
  initial: { y: "20px", opacity: 0 },
  animate: { y: "0px", opacity: 1, transition: { duration: 0.4, delay: 0.3 } }
}

export const HomeTitleSlideUp = {
  initial: { y: "20px", opacity: 0 },
  animate: { y: "0px", opacity: 1, transition: { duration: 0.4, delay: 0.6 } }
}

export const HomePronounceSlideUp = {
  initial: { y: "20px", opacity: 0 },
  animate: { y: "0px", opacity: 1, transition: { duration: 0.4, delay: 0.9 } }
}

export const HomeDefinitionSlideUp = {
  initial: { y: "20px", opacity: 0 },
  animate: { y: "0px", opacity: 1, transition: { duration: 0.4, delay: 1.2 } }
}

export const HomeInsultSlideUp = {
  initial: { y: "20px", opacity: 0 },
  animate: { y: "0px", opacity: 1, transition: { duration: 0.4, delay: 1.5 } }
}
