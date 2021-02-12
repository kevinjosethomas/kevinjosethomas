import { Default } from "../layouts/default";

import { Project } from "../components/Project";

const Projects = (props) => {

  return (
    <Default>
      <div className="flex flex-col items-start justify-center my-20 xl:px-16 2xl:px-52 w-full h-full">
        <span className="mb-4 font-proxima font-bold text-5xl text-gray-300">PROJECTS</span>
        <div className="mt-4 flex flex-row items-center justify-between flex-wrap w-full">
          <Project
            from="from-purple-500"
            to="to-purple-400"
            genre="WEBSITE + BOT"
            name="HAVEN.BIO"
            description="Currently under development, Haven is a multipurpose website that
            allows you to connect all your social media platforms in one place. It also provides
            short vanity URLs for blog posts, articles or anything else that you want to show on
            your profile bio or description!"
            type="WEBSITE"
            redirect="https://hvn.bio/"
          />
          <Project
            from="from-blue-500"
            to="to-blue-400"
            genre="WEBSITE + BOT"
            name="DISBOTS.GG"
            description="disbots.gg was a Discord bot listing site. With superior UI and functionality,
            the fastest and most streamlined reviewal system, disbots.gg changed the way bot listing worked.
            Unfortunately, I decided to take it down after a couple months, and started the codebyte development
            team."
            type="ARCHIVE"
            redirect="https://disbots.kevinthomas.codes/"
          />
          <Project
            from="from-green-500"
            to="to-green-400"
            genre="WEBSITE + INTEGRATION"
            name="GHPROFILE.ME"
            description="ghprofile.me is a website and GitHub integration, currently in BETA. It allows you to
            monitor the number of views your GItHub profiles and repositories get. It also displays these statistics
            in an intuitive manner. on the website I plan to add more features like GitHub statistics soon!"
            type="REPOSITORY"
            redirect="https://github.com/trustedmercury/ghprofile.me/"
          />
        </div>
      </div>
    </Default>
  )

}

export default Projects