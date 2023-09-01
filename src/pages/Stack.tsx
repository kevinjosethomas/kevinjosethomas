import Image from "assets/img/banner/3.png";
import PageWrapper from "ui/wrappers/PageWrapper";

import StackList from "ui/components/Stack/Stack";
import Technology from "ui/components/Stack/Technology";

export default function Stack() {
  return (
    <PageWrapper width="w-1/2" image={{ alt: "me!", src: Image }}>
      <div className="grid w-full grid-cols-4 flex-col items-start gap-6">
        <StackList />
        <Technology />
      </div>
    </PageWrapper>
  );
}
