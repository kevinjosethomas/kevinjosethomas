import Image from "assets/img/3.png";
import PageWrapper from "ui/wrappers/PageWrapper";

export default function Stack() {
  return <PageWrapper image={{ alt: "me!", src: Image, style: "w-1/3" }}></PageWrapper>;
}
