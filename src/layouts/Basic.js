
export const BasicLayout = (props) => {
  return (
    <div className="Background flex flex-col items-center justify-center w-screen max-w-full h-screen min-h-screen">
      <div className="flex flex-col items-center justify-center w-full h-full bg-dark-100 bg-opacity-90">
        { props.children }
      </div>
    </div>
  )
}
