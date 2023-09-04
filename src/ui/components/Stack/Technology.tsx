import { motion } from "framer-motion";

import Discord from "assets/img/icon/discord.svg";
import Electron from "assets/img/icon/electron.svg";
import Figma from "assets/img/icon/figma.svg";
import Actions from "assets/img/icon/actions.svg";
import NextJS from "assets/img/icon/nextjs.svg";
import RN from "assets/img/icon/react-native.svg";
import Stripe from "assets/img/icon/stripe.svg";
import Tailwind from "assets/img/icon/tailwind.svg";
import Ubuntu from "assets/img/icon/ubuntu.svg";
import Java from "assets/img/icon/java.svg";
import AWS from "assets/img/icon/aws.svg";
import Chrome from "assets/img/icon/chrome.svg";
import Postman from "assets/img/icon/postman.svg";
import PyPi from "assets/img/icon/pypi.svg";
import Expo from "assets/img/icon/expo.svg";
import Devpost from "assets/img/icon/devpost.svg";
import VSC from "assets/img/icon/vsc.svg";
import GitHub from "assets/img/icon/github.svg";
import Framer from "assets/img/icon/framer.svg";

export default function Technology() {
  const technology = [
    { name: "nextjs", icon: NextJS },
    { name: "tailwind", icon: Tailwind },
    { name: "github", icon: GitHub },
    { name: "actions", icon: Actions },
    { name: "java", icon: Java },
    { name: "figma", icon: Figma },
    { name: "framer", icon: Framer },
    { name: "react native", icon: RN },
    { name: "expo", icon: Expo },
    { name: "visual studio", icon: VSC },
    { name: "chrome api", icon: Chrome },
    { name: "discord api", icon: Discord },
    { name: "stripe", icon: Stripe },
    { name: "electron", icon: Electron },
    { name: "postman", icon: Postman },
    { name: "pypi", icon: PyPi },
    { name: "devpost", icon: Devpost },
    { name: "aws", icon: AWS },
    { name: "ubuntu", icon: Ubuntu },
  ];

  return (
    <div className="flex flex-col gap-1">
      {technology.map((t, i) => (
        <motion.div
          key={i}
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 0, opacity: 0 }}
          transition={{ duration: 0.2, delay: 0.2 + 0.1 * i }}
          className="flex select-none items-center gap-2 3xl:gap-3"
          draggable="false"
        >
          <img src={t.icon} alt={t.name} className="w-4 3xl:w-6" />
          <p className="text-base text-[#CCCCCC] 3xl:text-2xl">{t.name}</p>
        </motion.div>
      ))}
    </div>
  );
}
