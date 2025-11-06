import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
  webpack: (config) => {
    config.resolve.extensionAlias = {
      ".js": [".js", ".ts", ".tsx"],
      ".jsx": [".jsx", ".tsx"],
    };
    return config;
  },
};

const withMDX = createMDX({
  extension: /\.mdx?$/,
});

export default withMDX(nextConfig);
