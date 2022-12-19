import PageWrapper from "ui/wrappers/PageWrapper";
import Image from "assets/images/home.jpg";

const Home = () => {
  return <PageWrapper image={{ alt: "me!", src: Image, style: "w-1/3" }}></PageWrapper>;
};

export default Home;
