import { Fragment } from "react";

import { BasicLayout } from "../layouts/Basic";

const Index = (props) => {

  return (
    <Fragment>
      <BasicLayout>
        <div className="flex flex-col items-start justify-center pt-20 pl-40">
          <div className="flex flex-row items-center justify-start">
            <a
              href="https://github.com/trustedmercury"
              className="flex flex-row items-center justify-center mr-3 text-xl text-gray-300">
              <i class="fab fa-github mr-2"></i> <span className="font-inter font-medium">trustedmercury</span>
            </a>
            <a
              href="https://twitter.com/trustedmercury"
              className="flex flex-row items-center justify-center ml-3 text-xl text-gray-300">
              <i class="fab fa-twitter mr-2"></i> <span className="font-inter font-medium">trustedmercury</span>
            </a>
          </div>
          <div className="flex flex-col items-start justify-center pb-16">
            <span className="font-inter font-bold text-8xl text-gradient bg-gradient-to-r from-blue-500 to-blue-400">
              Kev·in Thom·as
            </span>
            <span className="font-inter text-gray-400 text-3xl">
              /ˈkevɪn tɒməs/
            </span>
          </div>
          <div className="flex flex flex-col items-start justify-center">
            <span className="font-inter italic text-gray-300 text-3xl">definition + usage</span>
            <div className="flex flex-col items-start justify-center mt-2 pl-10">
              <span className="font-inter text-gray-400 text-4xl">
                13 y/o aspiring tech entrepreneur, developer and student
              </span>
              <span className="font-inter font-medium italic text-gray-500 text-2xl">
                “Kevin is a 13 y/o aspiring tech entrepreneur, developer and student”
              </span>
            </div>
          </div>
        </div>
      </BasicLayout>
    </Fragment>
  )

}

export default Index;
