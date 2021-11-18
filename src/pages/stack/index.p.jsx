import Head from "next/head";

import Default from "ui/layouts/Default";
import StackList from "./components/Stack";
import Technologies from "./components/Technologies";

export default function Stack(props) {
  return (
    <Default>
      <Head>
        <title>Stack • Kevin Thomas</title>
        <meta name="title" content="Stack • Kevin Thomas" />
        <meta property="og:title" content="Stack • Kevin Thomas" />
        <meta property="twitter:title" content="Stack • Kevin Thomas" />
      </Head>
      <div className="flex flex-col items-start justify-start w-full space-y-10">
        <StackList />
        <Technologies />
      </div>
    </Default>
  );
}
