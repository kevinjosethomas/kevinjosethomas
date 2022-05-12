import Head from "next/head";

import Book from "./components/Book";
import Default from "ui/layouts/Default";

export default function Books(props) {
  const books = [
    {
      name: "The Book Thief",
      read_at: "May 2022",
      link: "https://www.amazon.ca/Book-Thief-Markus-Zusak/dp/0375842209",
      img: "/books/the-book-thief.png",
    },
    {
      name: "The Kite Runner",
      read_at: "April 2022",
      link: "https://www.amazon.ca/Kite-Runner-Khaled-Hosseini/dp/159463193X",
      img: "/books/the-kite-runner.png",
    },
    {
      name: "A Phở Love Story",
      read_at: "January 2022",
      link: "https://www.amazon.ca/Pho-Love-Story-Loan/dp/153444193X",
      img: "/books/a-pho-love-story.png",
    },
    {
      name: "Exo",
      read_at: "December 2021",
      link: "https://www.amazon.ca/Exo-Fonda-Lee/dp/0545933439",
      img: "/books/exo.png",
    },
    {
      name: "The Toll",
      read_at: "December 2021",
      link: "https://www.amazon.ca/Toll-3-Neal-Shusterman/dp/1481497073",
      img: "/books/the-toll.png",
      favourite: true,
    },
    {
      name: "Thunderhead",
      read_at: "November 2021",
      link: "https://www.amazon.ca/Thunderhead-Neal-Shusterman/dp/1442472456",
      img: "/books/thunderhead.png",
      favourite: true,
    },
    {
      name: "Scythe",
      read_at: "November 2021",
      link: "https://www.amazon.ca/Scythe-Arc-Book-1-ebook/dp/B01BKR487W",
      img: "/books/scythe.png",
      favourite: true,
    },
    {
      name: "The Block",
      read_at: "January 2022",
      link: "https://www.amazon.ca/Block-Second-Book-Loop-Trilogy/dp/1338589334",
      img: "/books/the-block.png",
    },
    {
      name: "The Loop",
      read_at: "November 2021",
      link: "https://www.amazon.ca/Loop-Ben-Oliver/dp/133858930X",
      img: "/books/the-loop.png",
    },
    {
      name: "Lore",
      read_at: "July 2021",
      link: "https://www.amazon.ca/Lore-Alexandra-Bracken/dp/1484778200",
      img: "/books/lore.png",
    },
  ];

  return (
    <Default>
      <Head>
        <title>Books • Kevin Thomas</title>
        <meta name="title" content="Books • Kevin Thomas" />
        <meta property="og:title" content="Books • Kevin Thomas" />
        <meta property="twitter:title" content="Books • Kevin Thomas" />
      </Head>
      <div className="flex w-full flex-col items-start justify-start space-y-4">
        <div className="flex w-full flex-col items-start justify-start space-y-1">
          <div className="flex items-center space-x-2 text-4xl font-bold tracking-[-0.02rem] text-white text-opacity-80">
            <img src="/icons/book.svg" className="h-[40px] select-none" draggable="false" />
            <p>Books</p>
          </div>
          <p className="text-lg leading-tight text-white text-opacity-60">
            Some cool books I've read recently :) Mostly fiction or self-help!
          </p>
        </div>
        <div className="flex w-full flex-col items-start justify-start space-y-2">
          {books.map((book, index) => (
            <Book key={index} index={index} {...book} />
          ))}
        </div>
      </div>
    </Default>
  );
}
