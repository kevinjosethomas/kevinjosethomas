import Image from "assets/img/banner/3.png";
import PageWrapper from "ui/wrappers/PageWrapper";

import StackList from "ui/components/Stack/Stack";
import Technology from "ui/components/Stack/Technology";

export default function Stack() {
  return (
    <PageWrapper width="md:w-1/2" image={{ alt: "me!", src: Image }}>
      <div className="flex w-full flex-col items-start gap-6 md:grid md:grid-cols-4">
        <StackList />
        <Technology />
      </div>
    </PageWrapper>
  );
}
