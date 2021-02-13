
export const Project = (props) => {

  return (
    <div className="flex flex-col items-center justify-between my-4 xl:my-0 w-80 md:w-100 h-96 md:h-112">
      <div className={`w-full h-1/2 bg-gradient-to-tr ${props.from} ${props.to} rounded-t`}>
      </div>
      <div className="flex flex-col items-start justify-center p-4 w-full bg-dark-300">
        <div className="flex flex-col items-start justify-center mb-1">
          <span className={`upper font-inter font-bold text-sm md:text-md text-gradient bg-gradient-to-r ${props.from} ${props.to}`}>{ props.genre }</span>
          <span className="upper font-proxima font-bold text-3xl md:text-4xl text-gray-300">{ props.name }</span>
        </div>
        <span className="mt-1 font-inter font-medium text-xs md:text-sm text-gray-400">
          { props.description }
        </span>
      </div>
      <a
        target="_blank"
        href={props.redirect}
        className="flex flex-row items-center justify-center py-4 w-full bg-dark-400 rounded-b">
        <span className="font-proxima font-bold text-2xl md:text-3xl text-gray-400">VISIT {props.type}</span>
      </a>
    </div>
  )

}