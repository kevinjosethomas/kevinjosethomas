export default function Technologies(props) {
  const technology = [
    {
      icon: "fab fa-react",
      label: "React",
    },
    {
      icon: "tailwindcss.svg",
      label: "Tailwind",
    },
    {
      icon: "fab fa-github",
      label: "GitHub",
    },
    {
      icon: "fab fa-discord",
      label: "Discord",
    },
    {
      icon: "fab fa-figma",
      label: "Figma",
    },
    {
      icon: "fab fa-react",
      label: "React Native",
    },
    {
      icon: "electron.svg",
      label: "Electron",
    },
    {
      icon: "fab fa-aws",
      label: "AWS",
    },
    {
      icon: "vscode.svg",
      label: "VSCode",
    },
    {
      icon: "postman.svg",
      label: "Postman",
    },
    {
      icon: "fab fa-stripe-s",
      label: "Stripe",
    },
    {
      icon: "fab fa-ubuntu",
      label: "Ubuntu",
    },
    {
      icon: "fab fa-github",
      label: "Actions",
    },
    {
      icon: "fab fa-java",
      label: "Java",
    },
    {
      icon: "fab fa-raspberry-pi",
      label: "Raspberry Pi",
    },
    {
      icon: "fab fa-yarn",
      label: "Yarn",
    },
  ];

  return (
    <div className="flex flex-col items-start justify-start w-full space-y-2">
      <div className="flex flex-col items-start justify-start w-full">
        <h1 className="font-bold text-4xl text-white text-opacity-80 tracking-[-0.02rem]">
          🖥️ Technologies
        </h1>
        <p className="text-lg text-white text-opacity-60">
          Other software and technology that I'm experienced with and use regularly.
        </p>
      </div>
      <div className="grid grid-cols-4 gap-y-0.5 w-full">
        {technology.map((tech, index) => (
          <Technology key={index} {...tech} />
        ))}
      </div>
    </div>
  );
}

function Technology(props) {
  const isIcon = props.icon.startsWith("fab");

  const Icon = (props) =>
    isIcon ? (
      <i className={`${props.icon} w-[22.5px] text-center text-lg text-white text-opacity-80`} />
    ) : (
      <img src={`/tech/${props.icon}`} draggable="false" className="w-[22.5px]" />
    );

  return (
    <div className="flex flex-row items-center justify-start space-x-2 text-white">
      <Icon icon={props.icon} />
      <p className="text-lg text-white text-opacity-80">{props.label}</p>
    </div>
  );
}
