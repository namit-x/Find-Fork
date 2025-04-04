export const Footer = () => {
  return (
    <div>
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-6 md:mb-0">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xl font-bold">
                  Fork <span className="text-food-red">&</span> Find
                </span>
              </div>
              <p className="text-gray-400 max-w-xs">
                Discover the best food from over 1,000 cuisines and fast delivery to your doorstep
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">About</h3>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="#" className="hover:text-food-red transition-colors">About Us</a></li>
                  <li><a href="#" className="hover:text-food-red transition-colors">Careers</a></li>
                  <li><a href="#" className="hover:text-food-red transition-colors">Investors</a></li>
                  <li><a href="#" className="hover:text-food-red transition-colors">Company Blog</a></li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">Support</h3>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="#" className="hover:text-food-red transition-colors">Contact</a></li>
                  <li><a href="#" className="hover:text-food-red transition-colors">Help Center</a></li>
                  <li><a href="#" className="hover:text-food-red transition-colors">Privacy</a></li>
                  <li><a href="#" className="hover:text-food-red transition-colors">Terms</a></li>
                </ul>
              </div>

              <div className="col-span-2 md:col-span-1">
                <h3 className="text-lg font-semibold mb-4">Get The App</h3>
                <div className="flex space-x-4">
                  <a href="#" className="bg-white text-gray-900 px-4 py-2 rounded flex items-center gap-2">
                    <span className="font-medium">iOS</span>
                  </a>
                  <a href="#" className="bg-white text-gray-900 px-4 py-2 rounded flex items-center gap-2">
                    <span className="font-medium">Android</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500">&copy; 2023 Fork & Find. All rights reserved.</p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Facebook
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Twitter
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Instagram
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Footer
