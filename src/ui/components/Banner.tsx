export default function Banner({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="absolute top-20 order-1 -mt-20 w-full md:sticky md:order-2 md:w-1/3">
      <img
        src={`/images/banners/${src}L.png`}
        alt={alt}
        className="hidden md:inline"
      />
      <img
        src={`/images/banners/${src}.png`}
        alt={alt}
        className="w-full md:hidden"
      />
    </div>
  );
}
