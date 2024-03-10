export default function Banner({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="sticky top-0 -mt-20 w-1/3">
      <img src={src} alt={alt} className="" />
    </div>
  );
}
