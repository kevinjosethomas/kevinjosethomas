import { Default } from "../layouts/default.js";

const Index = () => {

  return (
    <Default>
      <div className="flex flex-col items-start justify-center pl-40">
        <div className="flex flex-col items-start justify-center mb-5">
          <div className="flex flex-row items-center justify-start">
            <a
              target="_blank"
              href="https://github.kevinthomas.codes/"
              className="mr-2 font-inter font-medium text-lg text-gray-300 hover:text-gray-400"
            >
              <i className="fab fa-github" /> trustedmercury
            </a>
            <a
              target="_blank"
              href="https://twitter.kevinthomas.codes/"
              className="ml-2 font-inter font-medium text-lg text-gray-300 hover:text-gray-400"
            >
              <i className="fab fa-twitter" /> trustedmercury
            </a>
          </div>
          <span className="font-inter font-bold text-8xl text-gradient bg-gradient-to-r from-purple-500 to-purple-400">Kev·in Thom·as</span>
          <span className="font-inter text-2xl text-gray-400">/ˈkevɪn tɒməs/</span>
        </div>
        <div className="flex flex-col items-start justify-center mt-5">
          <span className="font-inter italic text-xl text-gray-300">proper noun</span>
          <div className="flex flex-col items-start justify-center">
            <span className="font-inter text-3xl text-gray-400">13 y/o aspiring tech entrepreneur, developer and student</span>
            <span className="font-inter font-medium italic text-xl text-gray-500">“Kevin is a 13 y/o aspiring tech entrepreneur, developer and student”</span>
          </div>
        </div>
      </div>
    </Default>
  )

}

export default Index;
