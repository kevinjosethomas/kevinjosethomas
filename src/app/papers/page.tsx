import Paper from "./components/Paper";
import Banner from "@/ui/components/Banner";
import { Papers, LiteraryPapers } from "./papers";

export default async function PaperPage() {
  return (
    <div className="flex w-full items-start justify-between">
      <div className="order-2 flex w-full flex-col items-start gap-4 md:order-1 md:w-1/2 md:gap-2">
        {Papers.map((paper, index) => (
          <Paper key={index} index={index} {...paper} />
        ))}
        {LiteraryPapers.map((paper, index) => (
          <Paper key={index} index={index} {...paper} />
        ))}
      </div>
      <Banner src="5" alt="Papers" />
    </div>
  );
}
