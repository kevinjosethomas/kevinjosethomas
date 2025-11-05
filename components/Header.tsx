export default function Header() {
  return (
    <header className="flex w-full items-center justify-between py-12">
      <div className="flex items-center justify-start gap-6">
        <h1 className="text-3xl font-bold">kevin thomas</h1>
        <p className="text-secondary text-xl">projects</p>
        <p className="text-secondary text-xl">writing</p>
      </div>
      <div className="flex items-center justify-start gap-6">
        <p className="text-secondary text-xl">x</p>
        <p className="text-secondary text-xl">gh</p>
      </div>
    </header>
  );
}
