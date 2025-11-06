import Image from "next/image";

export default function Stack() {
  const stack = [
    {
      name: "Python",
      icon: "/icons/python.svg",
    },
    {
      name: "TypeScript",
      icon: "/icons/typescript.svg",
    },
    {
      name: "React.js",
      icon: "/icons/react.svg",
    },
    {
      name: "Next.js",
      icon: "/icons/next.svg",
    },
    {
      name: "PostgreSQL",
      icon: "/icons/postgresql.svg",
    },
    {
      name: "Codex + CC",
      icon: "/icons/claude.svg",
    },
    {
      name: "ONNX",
      icon: "/icons/onnx.svg",
    },
    {
      name: "Keras",
      icon: "/icons/keras.svg",
    },
    {
      name: "MediaPipe",
      icon: "/icons/mediapipe.svg",
    },
    {
      name: "Hugging Face",
      icon: "/icons/huggingface.svg",
    },
    {
      name: "Realtime API",
      icon: "/icons/openai.svg",
    },
    {
      name: "CI/CD",
      icon: "/icons/actions.svg",
    },
    {
      name: "Java",
      icon: "/icons/java.svg",
    },
    {
      name: "Tailwind CSS",
      icon: "/icons/tailwind.svg",
    },
    {
      name: "Docker",
      icon: "/icons/docker.svg",
    },
    {
      name: "React Native",
      icon: "/icons/react-native.svg",
    },
    {
      name: "Electron",
      icon: "/icons/electron.svg",
    },
    {
      name: "Raspberry Pi",
      icon: "/icons/raspberry-pi.svg",
    },
    {
      name: "Vercel",
      icon: "/icons/vercel.svg",
    },
    {
      name: "Ubuntu",
      icon: "/icons/ubuntu.svg",
    },
    {
      name: "Figma",
      icon: "/icons/figma.svg",
    },
    {
      name: "Stripe",
      icon: "/icons/stripe.svg",
    },
    {
      name: "PostHog",
      icon: "/icons/posthog.svg",
    },
    {
      name: "Obsidian",
      icon: "/icons/obsidian.svg",
    },
  ];

  const StackItem = ({ item }: { item: (typeof stack)[number] }) => {
    return (
      <div key={item.name} className="flex items-center justify-start gap-2">
        <Image
          src={item.icon}
          alt={item.name}
          width={20}
          height={20}
          draggable={false}
          className="select-none"
        />
        <p className="text-secondary text-sm">{item.name}</p>
      </div>
    );
  };

  return (
    <div className="border-border grid w-full grid-cols-2 grid-rows-2 border-b p-0 md:grid-cols-4 md:grid-rows-1 md:p-0">
      <div className="border-border flex flex-col items-start justify-start gap-4 border-r border-b p-6 md:border-b-0 md:p-16">
        {stack.slice(0, 6).map((item) => (
          <StackItem key={item.name} item={item} />
        ))}
      </div>
      <div className="border-border flex flex-col items-start justify-start gap-4 border-r border-b p-6 md:border-b-0 md:p-16">
        {stack.slice(6, 12).map((item) => (
          <StackItem key={item.name} item={item} />
        ))}
      </div>
      <div className="border-border flex flex-col items-start justify-start gap-4 border-r p-6 md:p-16">
        {stack.slice(12, 18).map((item) => (
          <StackItem key={item.name} item={item} />
        ))}
      </div>
      <div className="flex flex-col items-start justify-start gap-4 p-6 md:p-16">
        {stack.slice(18, 24).map((item) => (
          <StackItem key={item.name} item={item} />
        ))}
      </div>
    </div>
  );
}
