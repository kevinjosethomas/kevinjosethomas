import Award from "./components/Award";
import Default from "ui/layouts/Default";

export default function Awards(props) {
  const awards = [
    {
      title: "BorderHacks",
      subtitle: "Sep 25-26 2021",
      lines: [
        "Hackathon; Youngest winner among over 300 participants. 2 awards:",
        "• Optimizing Community Services with Open Data ($500)",
        "• Best UI / UX Design Award (Sketch, Thunkable & Axure licenses)",
      ],
    },
    {
      title: "CCC - 64/75",
      subtitle: "Feb 17 2021",
      lines: [
        "Youngest participant in the Canadian Computing Competiton 2021",
        "• Completed all challenges in under 2 hours with Python 3",
        "• Scored 45/45 in the first 3 challenges, 19/30 in the last 2",
      ],
    },
  ];

  return (
    <Default>
      <div className="flex flex-col items-start justify-start w-full space-y-4">
        <h1 className="font-bold text-4xl text-white text-opacity-80 tracking-[-0.02rem]">
          🏆 Awards
        </h1>
        <div className="flex flex-col items-start justify-start w-full space-y-2">
          {awards.map((award, index) => (
            <Award key={index} index={index} {...award} />
          ))}
        </div>
      </div>
    </Default>
  );
}
