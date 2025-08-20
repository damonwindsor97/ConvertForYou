import { Link } from "react-router-dom"
import { FaCoffee, FaDiscord, FaFileContract, FaServer } from "react-icons/fa"
import { FaBolt, FaShield } from "react-icons/fa6"

function Footer() {
  return (
    <footer className='relative bg-white/5 backdrop-blur-md border-t border-white/20 overflow-hidden'>
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-pink-900/20"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col lg:flex-row justify-between items-start space-y-8 lg:space-y-0">
          
          <div className="flex flex-col space-y-6 max-w-md">
            <div>
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                  <FaBolt className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">Convert<span className="text-white">ForYou</span></p>
                </div>
              </div>
              <p className="text-white/70 text-lg font-medium mb-2">Free Online Converter</p>
              <p className="text-white/50 text-sm leading-relaxed">Transform your files instantly with our secure, fast, and completely free conversion tools. No registration required.</p>
            </div>
            

            <Link to="https://www.buymeacoffee.com/sweg" className="group inline-flex items-center space-x-3 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 text-black font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl w-fit">
              <FaCoffee className="w-5 h-5 group-hover:animate-bounce" />
              <span>Buy me a coffee</span>
            </Link>
          </div>



          <div className="flex flex-col lg:flex-row space-y-8 lg:space-y-0 lg:space-x-16">
            <div>
              <h3 className="text-white font-bold text-lg mb-4 flex items-center space-x-2">
                <span>Quick Links</span>
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link to="/status" className="group flex items-center space-x-3 text-white/70 hover:text-white transition-all duration-300 hover:translate-x-1">
                    <FaServer className="w-4 h-4 text-green-400 group-hover:scale-110 transition-transform duration-300" />
                    <span>Tool Status</span>
                  </Link>
                </li>
                <li>
                  <Link to="/privacypolicy" className="group flex items-center space-x-3 text-white/70 hover:text-white transition-all duration-300 hover:translate-x-1">
                    <FaShield className="w-4 h-4 text-blue-400 group-hover:scale-110 transition-transform duration-300" />
                    <span>Privacy Policy</span>
                  </Link>
                </li>
                <li>
                  <Link to="/terms"  className="group flex items-center space-x-3 text-white/70 hover:text-white transition-all duration-300 hover:translate-x-1">
                    <FaFileContract className="w-4 h-4 text-purple-400 group-hover:scale-110 transition-transform duration-300" />
                    <span>Terms of Service</span>
                  </Link>
                </li>
              </ul>
            </div>


            <div>
              <h3 className="text-white font-bold text-lg mb-4">Support</h3>
              <ul className="space-y-3">
                <li>
                  <Link to="https://discord.gg/9ytVAPNtmz"  className="group flex items-center space-x-3 text-white/70 hover:text-white transition-all duration-300 hover:translate-x-1" >
                    <FaDiscord className="w-4 h-4 text-indigo-400 group-hover:scale-110 transition-transform duration-300" />
                    <span>Discord Community</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>


        <div className="border-t border-white/10 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-6 text-white/50 text-sm">
              <p>© 2025 ConvertForYou. All rights reserved.</p>
            </div>
            

            <div className="flex items-center space-x-6 text-white/60 text-xs">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span>100% Secure</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                <span>Privacy First</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                <span>Always Free</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer