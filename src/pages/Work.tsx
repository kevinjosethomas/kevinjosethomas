import { useState } from "react";

import { Screen } from "types";
import Image from "assets/img/banner/2.png";
import Toggle from "ui/components/Work/Toggle";
import Awards from "ui/components/Work/Awards";
import smImage from "assets/img/banner/2-sm.png";
import PageWrapper from "ui/wrappers/PageWrapper";
import Projects from "ui/components/Work/Projects";
import Hackathons from "ui/components/Work/Hackathons";

export default function Work() {
  const screens: Screen[] = [
    {
      label: "projects",
      component: <Projects />,
    },
    {
      label: "hackathons",
      component: <Hackathons />,
    },
    {
      label: "awards",
      component: <Awards />,
    },
  ];
  const [screen, setScreen] = useState<Screen>(screens[0]);

  return (
    <PageWrapper
      width="md:w-7/12"
      image={{ alt: "me!", src: Image }}
      smImage={{ alt: "me!", src: smImage }}
    >
      <div className="flex w-full flex-col items-start gap-4">
        <Toggle screens={screens} screen={screen} setScreen={setScreen} />
        {screen.component}
      </div>
    </PageWrapper>
  );
}
