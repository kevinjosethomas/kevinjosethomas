import { useState } from "react";

import Image from "assets/img/2.png";
import Toggle from "ui/components/Work/Toggle";
import Awards from "ui/components/Work/Awards";
import PageWrapper from "ui/wrappers/PageWrapper";
import Projects from "ui/components/Work/Projects";
import Hackathons from "ui/components/Work/Hackathons";
import { Screen } from "types";

export default function Work() {
  const screens: Screen[] = [
    {
      label: "projects",
      component: <Projects />,
    },
    {
      label: "awards",
      component: <Awards />,
    },
    {
      label: "hackathons",
      component: <Hackathons />,
    },
  ];
  const [screen, setScreen] = useState<Screen>(screens[0]);

  return (
    <PageWrapper image={{ alt: "me!", src: Image, style: "w-1/3" }}>
      <div className="flex w-full flex-col items-start">
        <Toggle screens={screens} screen={screen} setScreen={setScreen} />
        {screen.component}
      </div>
    </PageWrapper>
  );
}
