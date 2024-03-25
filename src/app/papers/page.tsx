import Banner from "@/ui/components/Banner";
import { FetchPapers } from "@/api/papers";
import Paper from "./components/Paper";

export default async function Papers() {
  const papers = await FetchPapers();

  return (
    <div className="flex w-full items-start justify-between">
      <div className="order-2 flex w-full flex-col items-start gap-4 md:order-1 md:w-1/2 md:gap-2">
        {papers.map((paper, index) => (
          <Paper key={index} index={index} {...paper} />
        ))}
      </div>
      <Banner src="5" alt="Papers" />
    </div>
  );
}
