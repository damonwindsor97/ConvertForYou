import { useEffect, useState } from "react";
import Converter from "../components/Converter";
import ImageConverter from "../components/ImageConverter";
import VideoConverter from "../components/VideoConverter";
import { HiLink, HiVideoCamera } from 'react-icons/hi';
import { MdImage } from 'react-icons/md';

function ConvertCarousel() {
  const [activeTab, setActiveTab] = useState("panel-1");

  useEffect(() => {
    let tabs = document.querySelectorAll(".tab");
    let indicator = document.querySelector(".indicator");
    
    const updateIndicator = (tab) => {
      if (indicator && tab) {
        indicator.style.width = tab.getBoundingClientRect().width + 'px';
        indicator.style.left = tab.getBoundingClientRect().left - tab.parentElement.getBoundingClientRect().left + 'px';
      }
    };

    if (tabs.length > 0 && indicator) {
      updateIndicator(tabs[0]);

      tabs.forEach(tab => {
        tab.addEventListener("click", () => {
          let tabTarget = tab.getAttribute('aria-controls');
          updateIndicator(tab);
          setActiveTab(tabTarget);
        });
      });
    }
  }, []);

  const tabs = [
    {
      id: "panel-1",
      label: " URLs",
      icon: HiLink,
      description: "Shorten and manage URLs"
    },
    {
      id: "panel-2", 
      label: "Images",
      icon: MdImage,
      description: "Convert image formats"
    },
    {
      id: "panel-3",
      label: "Videos", 
      icon: HiVideoCamera,
      description: "Convert video files"
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-6 ">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">Convert Anything,<span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"> Instantly</span></h1>
        <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">Choose your conversion type and transform your files with lightning speed. 
          Secure, fast, and completely free.</p>
      </div>

      {/* Tab Navigation */}
      <div className="flex justify-center mb-8">
        <div 
          role="tablist" aria-label="conversion tools" className="relative bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-2 shadow-2xl"
        >
          <div className="absolute h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl shadow-lg indicator transition-all duration-300 ease-out"></div>
          
          {tabs.map((tab, index) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            
            return (
              <button
                key={tab.id}
                role="tab"
                aria-selected={isActive}
                aria-controls={tab.id}
                id={`tab-${index + 1}`}
                tabIndex={isActive ? "0" : "-1"}
                className="relative tab h-12 px-6 md:px-8 rounded-xl transition-all duration-300 ease-out group"
                onClick={() => setActiveTab(tab.id)}
              >
                <div className="flex items-center space-x-3">
                  <Icon className={`w-5 h-5 transition-all duration-300 ${
                    isActive ? 'text-white scale-110' : 'text-white/70 group-hover:text-white group-hover:scale-105'
                  }`} />
                  <span className={`font-semibold transition-all duration-300 whitespace-nowrap ${
                    isActive ? 'text-white' : 'text-white/70 group-hover:text-white'
                  }`}>
                    {tab.label}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Description */}
      <div className="text-center mb-8">
        {tabs.map(tab => (
          activeTab === tab.id && (
            <p key={tab.id} className="text-white/60 text-lg animate-fade-in">
              {tab.description}
            </p>
          )
        ))}
      </div>

      {/* Tab Panels */}
      <div className="relative ">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10 shadow-2xl"></div>
        
        <div className="relative z-70 p-8 overflow-visible">
          {activeTab === "panel-1" && (
            <div  role="tabpanel"  id="panel-1"  className="tab-panel animate-fade-in" aria-labelledby="tab-1">
              <Converter />
            </div>
          )}
          
          {activeTab === "panel-2" && (
            <div  role="tabpanel"  id="panel-2" className="tab-panel animate-fade-in" aria-labelledby="tab-2">
              <ImageConverter />
            </div>
          )}
          
          {activeTab === "panel-3" && (
            <div role="tabpanel" id="panel-3" className="tab-panel animate-fade-in" aria-labelledby="tab-3">
              <VideoConverter />
            </div>
          )}
        </div>
      </div>

      {/* Trust Indicators */}
      <div className="flex justify-center items-center space-x-8 text-white/60 mt-8">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-sm font-medium">Secure Processing</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
          <span className="text-sm font-medium">Lightning Fast</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
          <span className="text-sm font-medium">No Registration</span>
        </div>
      </div>


    </div>
  );
}

export default ConvertCarousel;