import { motion } from "framer-motion";
import Default from "ui/layouts/Default";

export default function Awards(props) {
  return (
    <Default>
      <div className="flex flex-col items-start justify-start w-full space-y-4">
        <h1 className="font-bold text-4xl text-white text-opacity-80 tracking-[-0.02rem]">
          💻 Setup
        </h1>
        <div className="setup flex flex-col items-start justify-start w-full space-y-6">
          <motion.div
            className="flex flex-col items-start justify-start space-y-1"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <a
              target="_blank"
              rel="nofollow noreferrer"
              className="font-bold text-2xl text-white text-opacity-80"
              href="https://rog.asus.com/laptops/rog-strix/rog-strix-g-g531-series/"
            >
              ASUS ROG Strix G G531
            </a>
            <ol className="list-disc list-inside">
              <li className="text-xl text-white text-opacity-70">
                <span className="font-bold text-white text-opacity-80">CPU</span> Intel i7-9750H 2.6
                GHz
              </li>
              <li className="text-xl text-white text-opacity-70">
                <span className="font-bold text-white text-opacity-80">GPU</span> NVIDIA GeForce GTX
                1650
              </li>
              <li className="text-xl text-white text-opacity-70">
                <span className="font-bold text-white text-opacity-80">Monitor</span> 15.6in FHD
                1080p 60Hz IPS
              </li>
              <li className="text-xl text-white text-opacity-70">
                <span className="font-bold text-white text-opacity-80">Memory</span> 16GB DDR4
              </li>
              <li className="text-xl text-white text-opacity-70">
                <span className="font-bold text-white text-opacity-80">Disk</span> 512GB SSD
              </li>
              <li className="text-xl text-white text-opacity-70">
                <span className="font-bold text-white text-opacity-80">OS</span> Windows 11
              </li>
            </ol>
          </motion.div>
          <motion.div
            className="flex flex-col items-start justify-start space-y-1"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.5 }}
          >
            <h3 className="font-bold text-2xl text-white text-opacity-80">Other</h3>
            <ol className="list-disc list-inside">
              <li className="text-xl text-white text-opacity-70">
                <span className="font-bold text-white text-opacity-80">Monitor #2</span>{" "}
                <a
                  target="_blank"
                  rel="nofollow noreferrer"
                  href="https://www.dell.com/en-us/work/shop/dell-27-usb-c-monitor-p2720dc/apd/210-auln/monitors-monitor-accessories"
                >
                  Dell 27 - 27" 1440p 60Hz QHD IPS
                </a>
              </li>
              <li className="text-xl text-white text-opacity-70">
                <span className="font-bold text-white text-opacity-80">Mouse</span>{" "}
                <a
                  target="_blank"
                  rel="nofollow noreferrer"
                  href="https://www.acer.com/ac/en/CA/content/model/NP.MCE11.00G"
                >
                  Acer Nitro Gaming Mouse - NMW810
                </a>
              </li>
              <li className="text-xl text-white text-opacity-70">
                <span className="font-bold text-white text-opacity-80">Keyboard</span>{" "}
                <a
                  target="_blank"
                  rel="nofollow noreferrer"
                  href="https://www.logitechg.com/en-ca/products/gaming-keyboards/g413-mechanical-gaming-keyboard.html"
                >
                  Logitech G G413 Mechanical
                </a>
              </li>
              <li className="text-xl text-white text-opacity-70">
                <span className="font-bold text-white text-opacity-80">Headphones</span>{" "}
                <a
                  target="_blank"
                  rel="nofollow noreferrer"
                  href="https://www.bose.ca/en_ca/support/products/bose_headphones_support/bose_around_ear_headphones_support/quietcomfort-25-acoustic-noise-cancelling-headphones-apple-devices.html"
                >
                  Bose QuietComfort 25
                </a>
              </li>
              <li className="text-xl text-white text-opacity-70">
                <span className="font-bold text-white text-opacity-80">Headphones #2</span>{" "}
                <a
                  target="_blank"
                  rel="nofollow noreferrer"
                  href="https://www.bose.ca/en_ca/products/headphones/over_ear_headphones/soundlink-around-ear-wireless-headphones-ii.html#v=soundlink_ae_headphones_ii_white"
                >
                  Bose SoundLink Wireless Headphones II
                </a>
              </li>
              <li className="text-xl text-white text-opacity-70">
                <span className="font-bold text-white text-opacity-80">Microphone</span>{" "}
                <a
                  target="_blank"
                  rel="nofollow noreferrer"
                  href="https://www.razer.com/streaming-microphones/razer-seiren-mini/RZ19-03450100-R3U1"
                >
                  Razer Seiren Mini
                </a>
              </li>
            </ol>
          </motion.div>
        </div>
      </div>
    </Default>
  );
}
