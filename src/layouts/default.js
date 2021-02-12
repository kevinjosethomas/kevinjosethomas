
export const Default = (props) => {

  return (
    <div className="bg flex flex-col items-center justify-center w-screen max-w-full h-full min-h-screen">
      <div className="flex flex-col items-center justify-center w-full h-full bg-dark-100 bg-opacity-50">
        { props.children }
      </div>
    </div>
  )

}
