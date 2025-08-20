import { FaCheckCircle, FaClock, FaServer, FaLink, FaImage, FaVideo, FaMusic } from 'react-icons/fa';
import { FaBolt } from 'react-icons/fa6';
import { MdOnlinePrediction, MdOfflineBolt } from 'react-icons/md';
import { BiSupport } from 'react-icons/bi';
import { Helmet } from 'react-helmet-async';

export default function StatusPage() {
  const status = {
    "URL Shortener": "Online",
    "YouTube → MP3": "Online", 
    "YouTube → MP4": "Offline",
    "Soundcloud Converter": "Online",
    "Spotify → MP3 Converter": "Online",
    "Spotify Playlist Extractor": "Online",
    "Video → MP3 Converter": "Online",
    "Image Converter": "Online"
  };

  // Get service icons
  const getServiceIcon = (service) => {
    if (service.includes("URL") || service.includes("Shortener")) return FaLink;
    if (service.includes("Image")) return FaImage;
    if (service.includes("Video") || service.includes("MP4")) return FaVideo;
    if (service.includes("MP3") || service.includes("Soundcloud") || service.includes("Spotify")) return FaMusic;
    return FaServer;
  };


  const onlineCount = Object.values(status).filter(s => s === "Online").length;
  const totalServices = Object.keys(status).length;
  const uptime = Math.round((onlineCount / totalServices) * 100);

  return (
    <div className="">
      <Helmet>
        <title>ConvertForYou | Status Page</title>
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
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center shadow-2xl">
              <FaServer className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white">Service Status</h1>
          </div>
          <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
            Monitoring of all ConvertForYou services and conversion tools
          </p>
        </div>

        {/* Overall Status Card */}
        <div className="bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 shadow-2xl mb-8 overflow-hidden">
          <div className="p-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
              <div className="flex items-center space-x-3 mb-4 md:mb-0">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                  <FaCheckCircle className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white">Overall System Status</h2>
              </div>
              <div className={`px-6 py-3 rounded-full text-sm font-bold border-2 ${
                uptime === 100 
                  ? 'bg-green-500/20 text-green-300 border-green-400/50' 
                  : uptime >= 80 
                    ? 'bg-yellow-500/20 text-yellow-300 border-yellow-400/50'
                    : 'bg-red-500/20 text-red-300 border-red-400/50'
              }`}>
                {uptime === 100 ? '🟢 All Systems Operational' : uptime >= 80 ? '🟡 Partial Outage' : '🔴 Major Outage'}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white/5 rounded-2xl p-6 border border-green-400/30 text-center">
                <div className="text-4xl font-bold text-green-400 mb-2">{onlineCount}</div>
                <div className="text-white/70 font-medium">Services Online</div>
                <div className="mt-2">
                  <MdOnlinePrediction className="w-6 h-6 text-green-400 mx-auto" />
                </div>
              </div>
              
              <div className="bg-white/5 rounded-2xl p-6 border border-red-400/30 text-center">
                <div className="text-4xl font-bold text-red-400 mb-2">{totalServices - onlineCount}</div>
                <div className="text-white/70 font-medium">Services Offline</div>
                <div className="mt-2">
                  <MdOfflineBolt className="w-6 h-6 text-red-400 mx-auto" />
                </div>
              </div>
              
              <div className="bg-white/5 rounded-2xl p-6 border border-blue-400/30 text-center">
                <div className="text-4xl font-bold text-blue-400 mb-2">{uptime}%</div>
                <div className="text-white/70 font-medium">System Uptime</div>
                <div className="mt-2">
                  <FaBolt className="w-6 h-6 text-blue-400 mx-auto" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Service Details */}
        <div className="bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 shadow-2xl mb-8 overflow-hidden">
          <div className="p-8">
            <div className="flex items-center space-x-3 mb-8">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center">
                <FaClock className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white">Service Details</h2>
            </div>
            
            {/* Services Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {Object.entries(status).map(([service, serviceStatus]) => {
                const Icon = getServiceIcon(service);
                const isOnline = serviceStatus === "Online";
                
                return (
                  <div 
                    key={service}
                    className={`bg-white/5 rounded-xl p-4 border transition-all duration-300 hover:bg-white/10 ${
                      isOnline ? 'border-green-400/30' : 'border-red-400/30'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          isOnline ? 'bg-green-500' : 'bg-red-500'
                        }`}>
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h3 className="text-white font-semibold">{service}</h3>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <div className={`w-3 h-3 rounded-full ${
                          isOnline ? 'bg-green-400 animate-pulse' : 'bg-red-400'
                        }`}></div>
                        <span className={`font-bold text-sm ${
                          isOnline ? 'text-green-400' : 'text-red-400'
                        }`}>
                          {serviceStatus}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Status Legend */}
            <div className="mt-8 p-4 bg-white/5 rounded-xl border border-white/10">
              <h3 className="text-white font-semibold mb-3">Status Legend</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-green-400 font-medium">Online</span>
                  <span className="text-white/60">- Service is fully operational</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                  <span className="text-red-400 font-medium">Offline</span>
                  <span className="text-white/60">- Service is temporarily unavailable</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Incident History */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-xl p-6">
            <div className="flex items-center space-x-3 mb-4">
              <FaClock className="w-6 h-6 text-yellow-400" />
              <h3 className="text-xl font-bold text-white">Recent Incidents</h3>
            </div>
            <div className="space-y-3">
              {totalServices - onlineCount > 0 ? (
                <div className="bg-yellow-500/20 rounded-lg p-3 border border-yellow-400/30">
                  <p className="text-yellow-300 font-medium text-sm">YouTube → MP4 Converter Offline</p>
                  <p className="text-white/60 text-xs mt-1">Under maintenance - no estimated restoration</p>
                </div>
              ) : (
                <div className="bg-green-500/20 rounded-lg p-3 border border-green-400/30">
                  <p className="text-green-300 font-medium text-sm">No recent incidents</p>
                  <p className="text-white/60 text-xs mt-1">All systems have been stable</p>
                </div>
              )}
            </div>
          </div>

          {/* Support Contact */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-xl p-6">
            <div className="flex items-center space-x-3 mb-4">
              <BiSupport className="w-6 h-6 text-blue-400" />
              <h3 className="text-xl font-bold text-white">Need Help?</h3>
            </div>
            <div className="space-y-3">
              <p className="text-white/70 text-sm">Experiencing issues with our services? Our support team is here to help.</p>
              <a href="mailto:support@convertforyou.com" className="inline-flex items-center space-x-2 text-blue-300 hover:text-blue-200 underline decoration-blue-300/50 hover:decoration-blue-200 transition-colors text-sm"><span>support@convertforyou.com</span></a>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center">
          <div className="bg-white/5 rounded-xl p-4 border border-white/10 inline-block">
            <p className="text-white/60 text-sm">Last updated: <span className="text-white font-semibold">20/08/25 12:08am AEST</span></p>
          </div>
        </div>
      </div>
    </div>
  );
}