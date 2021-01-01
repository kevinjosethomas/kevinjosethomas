
export const Footer = (props) => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between py-6 w-screen bg-dark-200">
      <div className="flex flex-row items-center justify-center mb-6 md:mb-0 md:ml-16 text-center">
        <span className="text-gray-500 font-semibold font-proxima">Created by <a href="https://github.kevinthomas.codes/" target="_blank" className="text-emph-100">TrustedMercury</a></span>
      </div>
      <div className="flex flex-row items-center justify-center md:mr-16">
        <a href="https://github.com/TrustedMercury/react-next-template" target="_blank">
          <div className="flex flex-row items-center justify-center py-3 px-5 bg-gradient-to-r from-emph-100 to-emph-200 rounded">
            <span className="text-gray-100 font-proxima font-semibold"><i class="fab fa-github mr-2"></i>Use this template</span>
          </div>
        </a>
      </div>
    </div>
  )
}
