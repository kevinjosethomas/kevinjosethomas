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
    { name: "NextJS", icon: NextJS },
    { name: "Tailwind", icon: Tailwind },
    { name: "GitHub", icon: GitHub },
    { name: "Actions", icon: Actions },
    { name: "Java", icon: Java },
    { name: "Figma", icon: Figma },
    { name: "Framer", icon: Framer },
    { name: "React Native", icon: RN },
    { name: "Expo", icon: Expo },
    { name: "Visual Studio", icon: VSC },
    { name: "Chrome API", icon: Chrome },
    { name: "Discord API", icon: Discord },
    { name: "Stripe", icon: Stripe },
    { name: "Electron", icon: Electron },
    { name: "Postman", icon: Postman },
    { name: "PyPI", icon: PyPi },
    { name: "Devpost", icon: Devpost },
    { name: "AWS", icon: AWS },
    { name: "Ubuntu", icon: Ubuntu },
  ];

  return (
    <div className="flex w-full flex-row flex-wrap gap-x-3 gap-y-1.5 md:flex-col md:gap-1">
      {technology.map((t, i) => (
        <motion.div
          key={i}
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 0, opacity: 0 }}
          transition={{ duration: 0.2, delay: 0.2 + 0.1 * i }}
          className="flex select-none items-center gap-1.5 2xl:gap-2 3xl:gap-3"
          draggable="false"
        >
          <img src={t.icon} alt={t.name} className="w-4 3xl:w-6" />
          <p className="text-sm text-[#CCCCCC] 2xl:text-base 3xl:text-2xl">
            {t.name}
          </p>
        </motion.div>
      ))}
    </div>
  );
}
