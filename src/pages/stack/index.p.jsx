import Default from "ui/layouts/Default";
import StackList from "./components/Stack";
import Technologies from "./components/Technologies";

export default function Stack(props) {
  return (
    <Default>
      <div className="flex flex-col items-start justify-start w-full space-y-10">
        <StackList />
        <Technologies />
      </div>
    </Default>
  );
}
