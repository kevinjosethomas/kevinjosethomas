/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/signpaper",
        destination: "https://arxiv.org/abs/2408.09311",
        permanent: true,
      },
      {
        source: "/signvideo",
        destination: "https://youtu.be/uuPxMWQRoXc?si=XsrEzM87X40I0XCj",
        permanent: true,
      },
      {
        source: "/signgithub",
        destination:
          "https://github.com/kevinjosethomas/sign-language-processing",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
