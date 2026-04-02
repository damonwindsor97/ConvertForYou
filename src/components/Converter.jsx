
import { useState } from 'react';
import axios from 'axios';

import { Select } from '@mui/base/Select';
import { Option } from '@mui/base/Option';
import { BarLoader } from 'react-spinners';
import { GrPowerReset } from "react-icons/gr";
import { FaLink, FaDownload, FaCheckCircle, FaExclamationTriangle } from "react-icons/fa";
import { MdCloudDownload } from "react-icons/md";
import { BiLinkExternal } from "react-icons/bi";

import SoundcloudLogo from '../assets/soundcloud-white.png'
import YouTubeLogo from '../assets/yt-white.png'
import SpotifyLogo from '../assets/spotify-white.png'

function Converter() {
    const [url, setUrl] = useState('');
    const [selectedUtility, setSelectedUtility] = useState(null);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();
    const [errorMessage, setErrorMessage] = useState('')
    const [success, setSuccess] = useState(false);

    const [tinyURL, setTinyURL] = useState(null);
    const [soundcloudURL, setSoundcloudUrl] = useState(null)
    const [youtubeURL, setYoutubeURL] = useState(null)

    const [toFormat, setToFormat] = useState('');
  
    const handleUrlChange = (e) => {
      setUrl(e.target.value);
    };
  
    const handleUtilityChange = (event, newValue) => {
      setSelectedUtility(newValue);
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      
      if (!url || selectedUtility === null) {
        alert('Please enter a URL and select a utility.');
        return;
      }
  
      switch (selectedUtility) {
        case 10:
          shortenUrl(url);
          break;
        case 20:
          convertYoutube(url);
          break;
        case 40:
          convertSoundcloudToMp3(url);
          break;
        case 50:
          extractSpotifyPlaylist(url)
          break;
        case 60:
          spotifyDownload(url)
          break
        default:
          alert('Please select a valid utility.');
      }
    };

    const resetState = () => {
      setUrl('');
      setSelectedUtility(null)
      setError(false);
      setSuccess(false);
      setSoundcloudUrl(null);
      setTinyURL(null);
      setYoutubeURL(null);
      setToFormat('')
    }

    const extractYoutubeId = (url) => {
      const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
      const match = url.match(regExp);
      return (match && match[2].length === 11) ? match[2] : null;
    };
    
    const shortenUrl = async () => {
        const longURL = document.getElementById("linkInput").value;
        try {
          setSuccess(false);
          setError(false);
          setTinyURL(null);
          setLoading(true);
          setSoundcloudUrl(null);
          setYoutubeURL(null);
          setErrorMessage(' ')
    
          const response = await fetch(`${import.meta.env.VITE_API_ENDPOINT}/url/shorten`, {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              url: longURL,
            }),
            credentials: 'include' 
          });
    
          const data = await response.json();
          console.log(data)
    
          if (data.short) {
            setTinyURL(data.short);
            setLoading(false);
            setSuccess(true)
          } else {
            throw new Error("Unable to process, please try again");
          }
        } catch (error) {
          setLoading(false);
          setErrorMessage(error.message || 'An error occurred')
          setError(true);
          setSuccess(false)
        }
    };
  

    const convertYoutube = async () => {
      const youtubeUrl = document.getElementById("linkInput").value;
      if(!toFormat){
        alert('Please enter a Format to convert to');
        return;
      }
    
      if (toFormat === "mp3") {
        const youtubeUrl = document.getElementById("linkInput").value;
      
        const videoId = youtubeUrl.includes('youtube.com') || youtubeUrl.includes('youtu.be') 
            ? extractYoutubeId(youtubeUrl) : youtubeUrl;
  
        const options = {
            method: 'GET',
            url: 'https://youtube-mp36.p.rapidapi.com/dl',
            params: { id: videoId }, 
            headers: {
                'x-rapidapi-key': import.meta.env.VITE_YOUTUBE_MP3_API_KEY,
                'x-rapidapi-host': import.meta.env.VITE_YOUTUBE_MP3_API_HOST
            }
        };
  
        try {
          setLoading(true)
          setError('')
          setSuccess(false)
          setSoundcloudUrl(null)
          setTinyURL(null)
          setYoutubeURL(null);
          setErrorMessage(' ');
    
          const response = await axios.request(options);
          console.log(response);
  
          const link = document.createElement('a');
          link.href = response.data.link;
          link.setAttribute('download', `${response.data.title}.m4a`);
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link)
  
          setSuccess(true)
          setLoading(false)
          setYoutubeURL(null)
        } catch (error) {
          setLoading(false)
          setErrorMessage(error.message || 'An error occurred')
          setError(true);
        }
      } else if (toFormat === "mp4") {
        const youtubeUrl = document.getElementById("linkInput").value;
      
        const videoId = youtubeUrl.includes('youtube.com') || youtubeUrl.includes('youtu.be') 
            ? extractYoutubeId(youtubeUrl) : youtubeUrl;
  
        const options = {
          method: 'GET',
          url: `https://youtube-video-fast-downloader-24-7.p.rapidapi.com/download_video/${videoId}`,
          params: {quality: '22'},
          headers: {
            'x-rapidapi-key': import.meta.env.VITE_YOUTUBE_MP4_API_KEY,
            'x-rapidapi-host': import.meta.env.VITE_YOUTUBE_MP4_API_HOST,
                'Content-Type': 'application/json'
          }
        };
  
        try {
          setLoading(true)
          setError('')
          setSuccess(false)
          setSoundcloudUrl(null)
          setTinyURL(null)
          setYoutubeURL(null);
          setErrorMessage(' ');
    
          const response = await axios.request(options);
          const downloadUrl = response.data.file;

          const link = document.createElement('a');
          link.href = downloadUrl;
          link.setAttribute('download', 'video.mp4');
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);

          // const videoResponse = await axios.get(downloadUrl, { responseType: 'blob' });
          // const blobUrl = URL.createObjectURL(videoResponse.data);

          // const link = document.createElement('a');
          // link.href = blobUrl;
          // link.setAttribute('download', 'video.mp4');
          // document.body.appendChild(link);
          // link.click();
          // document.body.removeChild(link);
          // URL.revokeObjectURL(blobUrl);
  
          setSuccess(true)
          setLoading(false)
          setYoutubeURL(null)
        } catch (error) {
          setLoading(false)
          setErrorMessage(error.message || 'An error occurred')
          setError(true);
        }
    };
  };

    const convertSoundcloudToMp3 = async () => {
      const soundCloudUrl = document.getElementById("linkInput").value;
      if(!toFormat){
        alert('Please enter a Format to convert to');
        return;
      }
      
      try {
          setLoading(true);
          setError(false);
          setSuccess(false);
          setSoundcloudUrl(false)
          setTinyURL(null)
          setYoutubeURL(null);
          setErrorMessage(' ');
          setToFormat('')

          const response = await axios.post(
            `${import.meta.env.VITE_API_ENDPOINT}/soundcloud/downloadMp3`,
            { link: soundCloudUrl },
            {
              responseType: 'blob',
              withCredentials: true
            }
          );
          const title = await axios.post(`${import.meta.env.VITE_API_ENDPOINT}/soundcloud/getTitle`, { link: soundCloudUrl}, { withCredentials: true });

          const blob = new Blob([response.data], { type: 'audio/mpeg' });
          const url = window.URL.createObjectURL(blob);

          const link = document.createElement("a");
          link.href = url;
          link.setAttribute('download', `${title.data}.${toFormat}`);
          document.body.appendChild(link);
          link.click();

          setSuccess(true);
          setSoundcloudUrl(true)
          setLoading(false);
      } catch (error) {
          setErrorMessage(error.message || 'An error occurred')
          setError(true);
          setLoading(false);
      }

    };


    const extractSpotifyPlaylist = async () => {
      const spotifyLink = document.getElementById('linkInput').value;

      try {
        setLoading(true);
        setError(false);
        setSuccess(false);
        setSoundcloudUrl(false)
        setTinyURL(null)
        setYoutubeURL(null);
        setErrorMessage(' ');
        setToFormat('')

        const response = await axios.post(`${import.meta.env.VITE_API_ENDPOINT}/spotify/playlistInfo,`, {link: spotifyLink}, { withCredentials: true });

        const fileData = response.data
        const blob = new Blob([fileData], {type: 'text/plain'})
        const url = URL.createObjectURL(blob)

        const link = document.createElement('a');
        link.download = "spotify-playlist.txt"
        link.href = url;
        link.click()

        setSuccess(true);
        setSoundcloudUrl(true)
        setLoading(false);
      } catch (error) {
        setErrorMessage(error.message || 'An error occurred')
        setLoading(false);
        setError(error);
      }
    };

    const spotifyDownload = async () => {
        const spotifyLink = document.getElementById('linkInput').value;

        try {
            setLoading(true);
            setError(false);
            setSuccess(false);
            setSoundcloudUrl(false);
            setTinyURL(null);
            setYoutubeURL(null);
            setErrorMessage(' ');
            setToFormat('');

            const response = await axios.post(
                `${import.meta.env.VITE_API_ENDPOINT}/spotify/downloadMp3`,
                { link: spotifyLink },
                { withCredentials: true, responseType: 'blob' } 
            );

            const blobUrl = URL.createObjectURL(new Blob([response.data], { type: 'audio/mpeg' }));
            const filename = response.headers['x-filename'] || 'track.mp3';

            const link = document.createElement('a');
            link.href = blobUrl;
            link.setAttribute('download', filename);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(blobUrl);

            setSuccess(true);
            setLoading(false);

        } catch (error) {
            setLoading(false);
            setError(error);
        }
    };

    const getUtilityName = () => {
      switch (selectedUtility) {
        case 10: return 'URL Shortener';
        case 20: return 'YouTube Converter';
        case 40: return 'Soundcloud Converter';
        case 50: return 'Spotify Playlist Extractor';
        case 60: return 'Spotify to MP3';
        default: return 'Select a tool';
      }
    };
  
    return (
        <div className="max-w-4xl mx-auto z-10">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg">
                <FaLink className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white">Links & Media Converter</h2>
            </div>
            <p className="text-white/70">Paste your link • Select your options • Click Convert</p>
          </div>

            <div className={`bg-white/10 z-10 overflow-visible backdrop-blur-md rounded-2xl border p-8 transition-all duration-300 ${success ? 'border-green-400/50 shadow-green-400/20' : 'border-white/20'} shadow-2xl overflow-visible`}>
            
            <div className="flex justify-between items-center mb-6">
              <div className="text-xs text-white/60">
                Powered by: {( selectedUtility === 10 || selectedUtility === 40 || selectedUtility === 50 || selectedUtility === 60 ) && " ConvertForYou"}
                {!selectedUtility || !toFormat ? "" : selectedUtility === 20 && toFormat === 'mp3' ? " RapidAPI" : " ConvertForYou"}
              </div>
              <button onClick={resetState} className="p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-300 group" title="Reset form">
                <GrPowerReset className="w-4 h-4 group-hover:rotate-180 transition-transform duration-300"/>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div className="flex flex-col md:flex-row gap-3">
                  <div className="flex-1">
                    <label className="block text-white/80 text-sm font-medium mb-2">Enter URL</label>
                    <input className="w-full bg-white/10 border border-white/20 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-purple-400 focus:bg-white/15 transition-all duration-300 placeholder-white/50" value={url}   onChange={handleUrlChange}  id="linkInput" placeholder="Paste your URL here..."/>
                  </div>
                  
                  <div className="md:min-w-[300px] z-10">
                    <label className="block text-white/80 text-sm font-medium mb-2">Select Tool</label>
                    <div className='relative '>
                      <Select id="UtilitySelect" className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white font-semibold hover:bg-white/15 transition-all duration-300"  placeholder="Choose conversion tool" onChange={handleUtilityChange} slotProps={{
                          listbox: {
                            className: " z-50 rounded-xl bg-gray-900/95 backdrop-blur-md border border-white/20 text-white shadow-2xl mt-1 overflow-hidden max-h-80 overflow-y-auto"
                          },
                        }}>
                        <Option value={10} className="p-4 hover:bg-white/10 cursor-pointer transition-colors border-b border-white/10">
                          <div className="flex items-center space-x-3">
                            <FaLink className="w-4 h-4 text-blue-400" />
                            <span>URL Shortener</span>
                          </div>
                        </Option>   

                        <Option value={20} className="p-4 hover:bg-white/10 cursor-pointer transition-colors border-b border-white/10">
                          <div className="flex items-center space-x-3">
                            <div className="w-5 h-5 bg-gradient-to-r from-red-500 to-red-600 rounded flex items-center justify-center">
                              <img src={YouTubeLogo} className='h-3 w-3'/>
                            </div>
                            <span>YouTube Converter</span>
                          </div>
                        </Option>   

                        <Option value={40} className="p-4 hover:bg-white/10 cursor-pointer transition-colors border-b border-white/10">
                          <div className="flex items-center space-x-3">
                            <div className="w-5 h-5 bg-gradient-to-r from-orange-500 to-orange-600 rounded flex items-center justify-center">
                              <img src={SoundcloudLogo} className='h-2'/>
                            </div>
                            <span>Soundcloud Converter</span>
                          </div>
                        </Option>   

                        <Option value={50} className="p-4 hover:bg-white/10 cursor-pointer transition-colors border-b border-white/10">
                          <div className="flex items-center space-x-3">
                            <div className="w-5 h-5 bg-gradient-to-r from-green-500 to-green-600 rounded flex items-center justify-center">
                              <img src={SpotifyLogo} className='h-3'/>
                            </div>
                            <span>Spotify Playlist to .txt</span>
                          </div>
                        </Option>   

                        <Option value={60} className="p-4 hover:bg-white/10 cursor-pointer transition-colors">
                          <div className="flex items-center space-x-3">
                            <div className="w-5 h-5 bg-gradient-to-r from-green-500 to-green-600 rounded flex items-center justify-center">
                              <img src={SpotifyLogo} className='h-3'/>
                            </div>
                            <span>Spotify Track to MP3</span>
                          </div>
                        </Option>   
                      </Select>
                    </div>
                  </div>
                </div>

                {/* YOUTUBE*/}
                {selectedUtility == 20 && (
                  <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                    <div className='flex items-center space-x-4'>
                      <label className='text-white font-medium'>Output Format:</label>
                      <Select 
                        value={toFormat}
                        onChange={(_, newValue) => setToFormat(newValue)}
                        className="px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white hover:bg-white/15 transition-all duration-300"
                        placeholder="Select format"
                      >
                        <div className="absolute z-10 rounded-lg bg-gray-900/95 backdrop-blur-md border border-white/20 text-white shadow-xl mt-1 overflow-hidden">
                          <Option value="mp3" className="p-3 hover:bg-white/10 cursor-pointer transition-colors">
                            <div className="flex items-center space-x-2">
                              <MdCloudDownload className="w-4 h-4 text-green-400" />
                              <span>.mp3</span>
                            </div>
                          </Option>
                          <Option value="mp4" className="p-3 opacity-50">
                            <div className="flex items-center space-x-2">
                              <MdCloudDownload className="w-4 h-4 text-red-400" />
                              <span>.mp4 (disabled)</span>
                            </div>
                          </Option>
                        </div>
                      </Select>
                    </div>
                  </div>
                )}

                {/* SOUNDCLOUD */}
                {selectedUtility == 40 && (
                  <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                    <div className='flex items-center space-x-4'>
                      <label className='text-white font-medium'>Output Format:</label>
                      <Select value={toFormat} onChange={(_, newValue) => setToFormat(newValue)} className="px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white hover:bg-white/15 transition-all duration-300" placeholder="Select format"
                      >
                        <div className="absolute z-10 rounded-lg bg-gray-900/95 backdrop-blur-md border border-white/20 text-white shadow-xl mt-1 overflow-hidden">
                          <Option value="mp3" className="p-3 hover:bg-white/10 cursor-pointer transition-colors">
                            <div className="flex items-center space-x-2">
                              <MdCloudDownload className="w-4 h-4 text-green-400" />
                              <span>.mp3</span>
                            </div>
                          </Option>
                          <Option value="m4a" className="p-3 hover:bg-white/10 cursor-pointer transition-colors">
                            <div className="flex items-center space-x-2">
                              <MdCloudDownload className="w-4 h-4 text-blue-400" />
                              <span>.m4a</span>
                            </div>
                          </Option>
                        </div>
                      </Select>
                    </div>
                  </div>
                )}
              </div>

              <button type="submit" className='w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:from-gray-500 disabled:to-gray-600 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl disabled:scale-100 disabled:shadow-none flex items-center justify-center space-x-3' disabled={loading || !url}>
                {loading ? (
                  <>
                    <BarLoader color="#ffffff" width={60} height={4} />
                    <span className="ml-3">Converting...</span>
                  </>
                ) : (
                  <>
                    <FaDownload className="w-5 h-5" />
                    <span>Use: {getUtilityName()}</span>
                  </>
                )}
              </button>
            </form>


            <div className="mt-6 space-y-4">
              {selectedUtility === 20 && toFormat === 'mp4' && (
                <div className="flex items-center space-x-3 p-4 bg-yellow-500/20 border border-yellow-400/30 rounded-xl">
                  <FaExclamationTriangle className="w-5 h-5 text-yellow-400 flex-shrink-0" />
                  <p className="text-yellow-300 font-medium">Conversion can take up to 20 seconds, depending on length.</p>
                </div>
              )}

              {selectedUtility === 40 && (
                <div className="flex items-center space-x-3 p-4 bg-orange-500/20 border border-orange-400/30 rounded-xl">
                  <FaExclamationTriangle className="w-5 h-5 text-orange-400 flex-shrink-0" />
                  <p className="text-orange-300 font-medium">Soundcloud GO+ songs cannot be processed.</p>
                </div>
              )}

              {/* {selectedUtility === 60 && (
                <div className="flex items-center space-x-3 p-4 bg-yellow-500/20 border border-yellow-400/30 rounded-xl">
                  <FaExclamationTriangle className="w-5 h-5 text-yellow-400 flex-shrink-0" />
                  <div>
                    <p className="text-yellow-300 font-bold">Due to changes within Spotify, our services are unavailable at this time.</p>
                  </div>
                </div>
              )}
              {selectedUtility === 50 && (
                <div className="flex items-center space-x-3 p-4 bg-yellow-500/20 border border-yellow-400/30 rounded-xl">
                  <FaExclamationTriangle className="w-5 h-5 text-yellow-400 flex-shrink-0" />
                  <div>
                    <p className="text-yellow-300 font-bold">Due to changes within Spotify, our services are unavailable at this time.</p>
                  </div>
                </div>
              )} */}

              {error && (
                <div className="flex items-center space-x-3 p-4 bg-red-500/20 border border-red-400/30 rounded-xl">
                  <FaExclamationTriangle className="w-5 h-5 text-red-400 flex-shrink-0" />
                  <div>
                    <p className="text-red-300 font-bold">An Error Occurred</p>
                    <p className="text-red-200 text-sm">{errorMessage}</p>
                  </div>
                </div>
              )}

              {success && (
                <div className="flex items-center space-x-3 p-4 bg-green-500/20 border border-green-400/30 rounded-xl">
                  <FaCheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <p className="text-green-300 font-bold">Successfully Converted!</p>
                </div>
              )}

              {tinyURL && (
                <div className="p-4 bg-white/5 border border-white/20 rounded-xl">
                  <p className="text-white font-bold mb-3 flex items-center space-x-2">
                    <FaLink className="w-4 h-4" />
                    <span>Your shortened URL:</span>
                  </p>
                  <div className="flex items-center space-x-3 p-3 bg-white/10 rounded-lg">
                    <a  href={tinyURL} className="text-blue-300 hover:text-blue-200 font-medium flex-1 break-all" target="_blank" rel="noopener noreferrer">
                      {tinyURL}
                    </a>
                    <BiLinkExternal className="w-4 h-4 text-white/60" />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
    )
}

export default Converter