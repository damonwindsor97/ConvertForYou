import { FaEye, FaDatabase, FaUserShield, FaLock } from "react-icons/fa";
import { FaShield, FaBolt } from "react-icons/fa6";
import { MdUpdate } from "react-icons/md";
import { BiSupport } from "react-icons/bi";
import { Helmet } from 'react-helmet-async';

function PrivacyPolicy() {
  return (
    <div className="">
      <Helmet>
        <title>ConvertForYou | Privacy Policy</title>
        <meta
          name="description"
          content="ConvertForYou.com | Free Online Utilities for URLs - Convert MP4, YouTube & Soundcloud to Mp3, shorten URLs, Convert jpg to png and more with Linkify."
        />
        <meta
          name="keywords"
          content="link, url, shorten, utilities, oasis, youtube, to, mp3, convert, YouTube, YT, MP3, audio, YouTube, link oasis, utils for links, utilities for links, ConvertForYou, linkify, free online, converter, free, online, free online converter, tools, tool, spotify download, Spotify, Soundcloud, download, downloader, image convert, jpg, png, gif, icon, ico"
        />
        <meta name="author" content="Damon Windsor" />
      </Helmet>
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -inset-10 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
          <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
        </div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-16">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center space-x-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-2xl">
              <FaShield className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white">Privacy Policy</h1>
          </div>
          <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
            Your privacy is important to us. This policy explains how ConvertForYou collects, uses, and protects your information when you use our conversion services.
          </p>
        </div>

        {/* Main Content */}
        <div className="bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 shadow-2xl overflow-hidden">
          <div className="p-8 md:p-12">
            
            {/* Section 1: Analytics */}
            <div className="mb-12">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                  <FaEye className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white">1. Analytics</h2>
              </div>
              
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <p className="text-white/90 leading-relaxed">
                  We use Google Analytics to collect information such as Active Users, New Users, Active Users by Country, 
                  Views per Active User, and Average Engagement Time. This data helps us understand how our services are 
                  used and improve user experience. We do not share analytics data with any third parties beyond Google Analytics.
                </p>
              </div>
            </div>

            {/* Section 2: Data Collection */}
            <div className="mb-12">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                  <FaDatabase className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white">2. Data Collection and Storage</h2>
              </div>
              
              <div className="space-y-4">
                <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                  <p className="text-white/90 leading-relaxed mb-4">
                    We store data both temporarily and permanently, depending on its use within the application. 
                    Data is stored securely in our databases to enable our utilities and features to function. 
                    The types of data we store include:
                  </p>
                  
                  <div className="space-y-4">
                    <div className="bg-white/5 rounded-xl p-4 border border-blue-400/30">
                      <div className="flex items-start space-x-3">
                        <div className="w-6 h-6 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-white text-xs font-bold">a</span>
                        </div>
                        <div>
                          <h4 className="text-white font-semibold mb-2">URL Shortener</h4>
                          <p className="text-white/80 text-sm">
                            Links entered into our URL Shortener application, so our API can determine whether to create 
                            a new short URL or retrieve an existing one.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white/5 rounded-xl p-4 border border-red-400/30">
                      <div className="flex items-start space-x-3">
                        <div className="w-6 h-6 bg-red-500 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-white text-xs font-bold">b</span>
                        </div>
                        <div>
                          <h4 className="text-white font-semibold mb-2">Video Conversion (MP4 → MP3)</h4>
                          <p className="text-white/80 text-sm">
                            Videos submitted for conversion are stored only briefly for processing and are deleted 
                            immediately after conversion is complete.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white/5 rounded-xl p-4 border border-yellow-400/30">
                      <div className="flex items-start space-x-3">
                        <div className="w-6 h-6 bg-yellow-500 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-white text-xs font-bold">c</span>
                        </div>
                        <div>
                          <h4 className="text-white font-semibold mb-2">Cookies</h4>
                          <p className="text-white/80 text-sm">
                            We use cookies to track user history and limit usage to prevent abuse. Cookies and related 
                            data are stored temporarily and expire exactly 7 days after your first visit.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white/5 rounded-xl p-4 border border-green-400/30">
                      <div className="flex items-start space-x-3">
                        <div className="w-6 h-6 bg-green-500 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-white text-xs font-bold">d</span>
                        </div>
                        <div>
                          <h4 className="text-white font-semibold mb-2">Image Conversion</h4>
                          <p className="text-white/80 text-sm">
                            Image files are processed entirely in your browser using client-side technology. 
                            No image data is sent to our servers, ensuring complete privacy.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 3: User Rights */}
            <div className="mb-12">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                  <FaUserShield className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white">3. User Rights</h2>
              </div>
              
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <p className="text-white/90 leading-relaxed">
                  If you wish to access, correct, or request deletion of your data, please contact us at{' '}
                  <a href="mailto:support@convertforyou.com" className="text-purple-300 hover:text-purple-200 underline decoration-purple-300/50 hover:decoration-purple-200 transition-colors">
                    support@convertforyou.com
                  </a>
                  . We will respond to your request as soon as possible.
                </p>
              </div>
            </div>

            {/* Section 4: Security */}
            <div className="mb-12">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-orange-500 rounded-xl flex items-center justify-center">
                  <FaLock className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white">4. Security</h2>
              </div>
              
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <p className="text-white/90 leading-relaxed">
                  We take reasonable measures to protect your data from unauthorized access, disclosure, or loss. 
                  However, no method of transmission over the Internet or electronic storage is 100% secure.
                </p>
              </div>
            </div>

            {/* Section 5: Changes to Policy */}
            <div className="mb-12">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-xl flex items-center justify-center">
                  <MdUpdate className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white">5. Changes to This Policy</h2>
              </div>
              
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <p className="text-white/90 leading-relaxed">
                  We may update this privacy policy from time to time. Any changes will be posted on this page 
                  with an updated revision date.
                </p>
              </div>
            </div>

          </div>

          {/* Footer Section */}
          <div className="bg-white/5 border-t border-white/10 p-8">
            <div className="text-center space-y-4">
              <div className="flex items-center justify-center space-x-3 mb-4">
                <FaBolt className="w-5 h-5 text-purple-400" />
                <p className="text-white/60 text-sm">Last updated: <span className="text-white font-semibold">20/08/25 12:08am AEST</span></p>
              </div>
              
              <div className="bg-white/5 rounded-xl p-4 border border-white/10 max-w-2xl mx-auto">
                <div className="flex items-center justify-center space-x-3 mb-2">
                  <BiSupport className="w-5 h-5 text-blue-400" />
                  <h3 className="text-white font-semibold">Need Help?</h3>
                </div>
                <p className="text-white/80 text-sm">
                  If you have any questions or concerns about this privacy policy or your data, please contact us at{' '}
                  <a href="mailto:support@convertforyou.com" className="text-blue-300 hover:text-blue-200 underline decoration-blue-300/50 hover:decoration-blue-200 transition-colors">
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

export default PrivacyPolicy