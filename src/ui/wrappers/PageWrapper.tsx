import Navbar from "ui/components/Navbar/Navbar";

const PageWrapper = () => {
  return (
    <div className="flex w-full items-start justify-between py-24 px-36">
      <div className="flex flex-col justify-start">
        <Navbar />
      </div>
    </div>
  );
};

export default PageWrapper;
