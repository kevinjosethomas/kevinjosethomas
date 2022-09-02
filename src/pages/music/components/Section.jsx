import ScrollContainer from "react-indiana-drag-scroll";

import Item from "./Item";

export default function Section(props) {
  return (
    <div className="flex w-full flex-col space-y-1">
      <h1 className="text-2xl font-bold capitalize text-white text-opacity-80">
        Top {props.type}s
      </h1>
      <ScrollContainer vertical={false} className="w-f flex space-x-4 p-2">
        {props.music ? (
          props.music.map((item, i) => <Item key={i} type={props.type} {...item} />)
        ) : (
          <div />
        )}
        <a
          target="_blank"
          href="https://stats.fm/kevinthomas"
          className="group flex flex-1 items-center rounded border-2 border-white border-opacity-[0.04] bg-white bg-opacity-[0.03] px-10 transition duration-300 hover:bg-opacity-5"
        >
          <i className="fas fa-arrow-right text-4xl text-[#1DB954] text-opacity-60 transition duration-300 group-hover:text-opacity-100" />
        </a>
      </ScrollContainer>
    </div>
  );
}
