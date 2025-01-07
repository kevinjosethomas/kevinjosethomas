import { HackathonInterface } from "@/types";

const HACKATHONS: HackathonInterface[] = [
  {
    order: 1,
    winner: false,
    digital: false,
    prize: "",
    name: "Hack the North",
    organizer: "University of Waterloo",
    time: "September 2024",
    description:
      "Travelled to the University of Waterloo for Canada’s biggest hackathon. Used my prior computational sign language linguistics work to build a novel Chrome extension that added a live ASL interpreter to YouTube videos",
  },
  {
    order: 2,
    winner: true,
    digital: false,
    prize: "",
    name: "The Boreal Express",
    organizer: "Hack Club",
    time: "July 2024",
    description:
      "Invited to a seven-day cross-Canada hackathon aboard a train from Vancouver to Montreal, organized and all-expensed paid by Hack Club. Met 50 amazing high school developers from around the world and worked on environment-focused projects!",
  },
  {
    order: 3,
    winner: true,
    digital: false,
    prize: "",
    name: "The Summit",
    organizer: "Hack Club",
    time: "February 2024",
    description:
      "Got flown out to San Francisco for an all-expenses paid three-day hackathon sponsored by Tom Preston-Werner. Explored the city of San Francisco, met 50 hackers from all around the world, talked to industry leaders like Tom!",
  },
  {
    order: 4,
    winner: true,
    digital: false,
    prize: "",
    name: "nwHacks",
    organizer: "nwPlus UBC",
    time: "Jan 2024",
    description:
      "During my first in-person hackathon, I worked with a team of UBC students to develop a ML image recognition nutrition tracker.",
  },
  {
    order: 5,
    winner: true,
    digital: true,
    prize: "",
    name: "PantherHacks",
    organizer: "Princeton Day School",
    time: "May 2023",
    description:
      "After a long software development hiatus, I participated in PantherHacks and developed a social media platform catered towards high schoolers.",
  },
  {
    order: 6,
    winner: true,
    digital: true,
    prize: "$1500",
    name: "WinHacks",
    organizer: "University of Windsor",
    time: "March 2022",
    description:
      "As the youngest hacker among over 400 university students, I developed a marketplace for organizations to find and contract graduates.",
  },
  {
    order: 7,
    winner: true,
    digital: true,
    prize: "$500",
    name: "BorderHacks",
    organizer: "WindsorEssex",
    time: "Sept 2021",
    description:
      "As the youngest hacker during my first hackathon, I developed a platform that allows local governments to publicly share data about their communities.",
  },
];

export default HACKATHONS;
