import Image from "assets/img/banner/3.png";
import PageWrapper from "ui/wrappers/PageWrapper";

export default function Stack() {
  return <PageWrapper width="w-1/2" image={{ alt: "me!", src: Image }}></PageWrapper>;
}
