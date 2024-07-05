import Project from "../components/Project";

export default function Disbots() {
  return (
    <Project name="disbots.gg" image="disbots.png" banner="disbots.png">
      <div className="flex flex-col gap-4">
        <iframe
          width="1024"
          height="576"
          src="https://www.youtube.com/embed/XCjmf23Ef0w?si=wV-RSw1sGmJM6acg"
          title="disbots.gg Trailer"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
        <p className="text-lg text-white">
          During my Grade 8 year, my school went digital because of the COVID
          pandemic, and I found myself with a lot of free time to code and do
          things I love. During this time, under a year after I moved from India
          to Toronto and only a couple of months after my first freelance
          project, I undertook my first large-scale project. As someone who was
          chronically online on Discord, and with some Discord bot development
          experience, I noticed the difficulty in growing bots and the lack of
          efficient platforms for bot developers to advertise their projects.
        </p>
        <p className="text-lg text-white">
          With funding from one of the first mentors who hired me as a
          freelancer, I set out to develop a Discord bot listing platform that
          bridges the gap and provides an intuitive and seamless experience for
          both bot developers and server owners to discover each other. Despite
          not having much web development experience, I spearheaded the design
          and implementation of this platform and developed a phenomenal product
          that was appreciated by hundreds of members of the Discord community.
        </p>
        <p className="text-lg text-white">
          In under a month after our launch, disbots.gg became the go-to
          platform for over 100 bot developers to advertise their projects and
          for over 10,000 Discord server owners to find bots to improve the
          member experience in their own servers. With this growth, I also
          expanded our development team and divided the engineering process of
          the application among 3 other young developers. Furthermore, I
          expanded the disbots.gg community to over 250 members and got over 5
          volunteers to vet all bots on the platform.
        </p>
      </div>
    </Project>
  );
}
