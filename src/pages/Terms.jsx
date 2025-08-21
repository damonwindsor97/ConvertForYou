import { FaFileContract, FaCopyright, FaEyeSlash, FaUserCheck, FaExclamationTriangle, FaServer, FaEdit } from "react-icons/fa";
import { FaBolt } from "react-icons/fa6";
import { MdUpdate, MdGavel } from "react-icons/md";
import { BiSupport } from "react-icons/bi";
import { Helmet } from 'react-helmet-async';

function Terms() {
  return (
    <div className="">
      <Helmet>
        <title>ConvertForYou | Terms of Service</title>
        <meta name="description"
          content="ConvertForYou.com | Free Online Utilities for URLs - Convert MP4, YouTube & Soundcloud to Mp3, shorten URLs, Convert jpg to png and more with Linkify."/>
        <meta name="keywords" content="link, url, shorten, utilities, oasis, youtube, to, mp3, convert, YouTube, YT, MP3, audio, YouTube, link oasis, utils for links, utilities for links, ConvertForYou, linkify, free online, converter, free, online, free online converter, tools, tool, spotify download, Spotify, Soundcloud, download, downloader, image convert, jpg, png, gif, icon, ico"/>
        <meta name="author" content="Damon Windsor" />
      </Helmet>

      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -inset-10 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
          <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
        </div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center space-x-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-2xl">
              <FaFileContract className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white">Terms of Service</h1>
          </div>
          <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">Please read these terms carefully before using ConvertForYou. By using our services, you agree to comply with these terms and conditions.</p>
        </div>

        <div className="bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 shadow-2xl overflow-hidden">
          <div className="p-8 md:p-12">
            

            <div className="mb-12">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-pink-500 rounded-xl flex items-center justify-center">
                  <FaCopyright className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white">1. Copyright and Intellectual Property</h2>
              </div>
              
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <p className="text-white/90 leading-relaxed">By using ConvertForYou, you agree to comply with all applicable international copyright laws and regulations. You are responsible for ensuring you have the necessary rights or permissions to convert, download, or use any material. ConvertForYou does not condone or support copyright infringement and reserves the right to terminate access for users who violate intellectual property rights.</p>
              </div>
            </div>

    
            <div className="mb-12">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
                  <FaEyeSlash className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white">2. Content Restrictions</h2>
              </div>
              
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <p className="text-white/90 leading-relaxed mb-4">You agree not to use ConvertForYou or any associated platforms to convert, download, distribute, share, store, or interact with any of the following types of content:</p>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-red-500/20 rounded-xl p-4 border border-red-400/30">
                    <h4 className="text-white font-semibold mb-2">Prohibited Content</h4>
                    <ul className="text-white/80 text-sm space-y-1">
                      <li>• Not Safe For Work (NSFW) material</li>
                      <li>• Illegal or harmful content</li>
                      <li>• Copyrighted material without permission</li>
                      <li>• Malicious or harmful files</li>
                    </ul>
                  </div>
                  
                  <div className="bg-yellow-500/20 rounded-xl p-4 border border-yellow-400/30">
                    <h4 className="text-white font-semibold mb-2">Consequences</h4>
                    <p className="text-white/80 text-sm">
                      Violation of these restrictions may result in immediate suspension or termination of access to our services.
                    </p>
                  </div>
                </div>
              </div>
            </div>


            <div className="mb-12">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                  <FaUserCheck className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white">3. User Responsibility</h2>
              </div>
              
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <p className="text-white/90 leading-relaxed">You are solely responsible for your use of the service and any content you access, convert, or share. This includes ensuring compliance with all applicable laws and regulations in your jurisdiction. Users must also respect file size limits and usage guidelines to ensure fair access for all users.
                </p>
              </div>
            </div>


            <div className="mb-12">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center">
                  <FaExclamationTriangle className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white">4. Limitation of Liability</h2>
              </div>
              
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <div className="space-y-4">
                  <p className="text-white/90 leading-relaxed">ConvertForYou is provided "as is" without warranties of any kind, either express or implied. We make no guarantees about the availability, accuracy, or reliability of the service.
                  </p>
                  
                  <div className="bg-yellow-500/20 rounded-xl p-4 border border-yellow-400/30">
                    <h4 className="text-white font-semibold mb-2">Important Notice</h4>
                    <p className="text-white/80 text-sm">We are not liable for any damages, losses, or issues resulting from your use or inability to use the service, including but not limited to data loss, conversion errors, or service interruptions.
                    </p>
                  </div>
                </div>
              </div>
            </div>


            <div className="mb-12">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center">
                  <FaServer className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white">5. Service Availability</h2>
              </div>
              
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <p className="text-white/90 leading-relaxed">
                  We reserve the right to modify, suspend, or discontinue the service (or any part of it) at any time without notice. 
                  We may also impose limits on certain features or restrict access to parts or all of the service without notice or liability. 
                  Regular maintenance and updates may temporarily affect service availability.
                </p>
              </div>
            </div>

            {/* Section 6: Changes to Terms */}
            <div className="mb-12">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                  <MdUpdate className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white">6. Changes to Terms</h2>
              </div>
              
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <p className="text-white/90 leading-relaxed">
                  We may update these terms from time to time to reflect changes in our services or legal requirements. 
                  Continued use of the service after any such changes constitutes acceptance of the new terms. 
                  We encourage you to review this page periodically to stay informed of any updates.
                </p>
              </div>
            </div>

            {/* Section 7: Fair Use Policy */}
            <div className="mb-12">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center">
                  <MdGavel className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white">7. Fair Use Policy</h2>
              </div>
              
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <p className="text-white/90 leading-relaxed mb-4">
                  To ensure fair access for all users, we implement reasonable usage limits:
                </p>
                
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-blue-500/20 rounded-xl p-4 border border-blue-400/30">
                    <h4 className="text-white font-semibold mb-2">File Limits</h4>
                    <p className="text-white/80 text-sm">
                      Video files: 500MB maximum
                      <br />
                      Reasonable usage expected
                    </p>
                  </div>
                  
                  <div className="bg-green-500/20 rounded-xl p-4 border border-green-400/30">
                    <h4 className="text-white font-semibold mb-2">Rate Limits</h4>
                    <p className="text-white/80 text-sm">
                      Automated requests and excessive usage may be limited or blocked
                    </p>
                  </div>
                  
                  <div className="bg-purple-500/20 rounded-xl p-4 border border-purple-400/30">
                    <h4 className="text-white font-semibold mb-2">Quality</h4>
                    <p className="text-white/80 text-sm">
                      Conversions optimized for balance of quality and speed
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Footer Section */}
          <div className="bg-white/5 border-t border-white/10 p-8">
            <div className="text-center space-y-4">
              <div className="flex items-center justify-center space-x-3 mb-4">
                <FaBolt className="w-5 h-5 text-blue-400" />
                <p className="text-white/60 text-sm">Last updated: <span className="text-white font-semibold">20/08/25 12:08am AEST</span></p>
              </div>
              
              <div className="bg-white/5 rounded-xl p-4 border border-white/10 max-w-2xl mx-auto">
                <div className="flex items-center justify-center space-x-3 mb-2">
                  <BiSupport className="w-5 h-5 text-cyan-400" />
                  <h3 className="text-white font-semibold">Questions About These Terms?</h3>
                </div>
                <p className="text-white/80 text-sm">
                  If you have any questions about these terms of service, please contact us at{' '}
                  <a href="mailto:support@convertforyou.com" className="text-cyan-300 hover:text-cyan-200 underline decoration-cyan-300/50 hover:decoration-cyan-200 transition-colors">
                    support@convertforyou.com
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Terms