import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Box } from '@mui/material';

import { HiLink, HiVideoCamera, HiMusicNote } from 'react-icons/hi';
import { MdAudiotrack, MdFormatListBulleted } from 'react-icons/md';
import { FaClock } from "react-icons/fa6";
import { FaHistory,FaBolt } from "react-icons/fa";
import { RiFilePaper2Fill } from "react-icons/ri";
import { BiSupport } from "react-icons/bi";
import MoonLoader from 'react-spinners/MoonLoader'

 function Navbar() {
  const [open, setOpen] = useState(false);
  const [utilityHistory, setUtilityHistory] = useState([]);
  const [data, setData] = useState()
  const [loading, setLoading] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit', 
            minute: '2-digit',
            hour12: false
        }); // "DD/MM/YYYY, HH:MM"
    };

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                setLoading(true)
                const response = await axios.get(`${import.meta.env.VITE_API_ENDPOINT}/server/anonUtilHistory`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true,
                });

                const data = response.data;

                if(!data.utilityHistory || data.utilityHistory.length === 0) {
                    setUtilityHistory([]);
                    setData(data);
                    setLoading(false);
                    return
                }
                
                setUtilityHistory(data.utilityHistory || []);
                setData(data)
                setLoading(false)
            } catch (error) {
                console.error('Error fetching history:', error);
            }
        };

        fetchHistory();
    }, []); 
    // Helper function to get icon for each utility type
    const getUtilityIcon = (type) => {
        const iconClass = "w-4 h-4 mr-2";
        switch (type) {
            case "url":
            case "URL Shortener":
            return <HiLink className={iconClass} />;
            case "Soundcloud Converter":
            case "Spotify > mp3 Converter":
            return <MdAudiotrack className={iconClass} />;
            case "Spotify Playlist to .txt Converter":
            return <MdFormatListBulleted className={iconClass} />;
            case "YouTube Converter":
            return <HiVideoCamera className={iconClass} />;
            case "MP4 > MP3 Converter":
            return <HiMusicNote className={iconClass} />;
            default:
            return null;
        }
    };

    // Helper function to truncate long URLs
    const truncateUrl = (url, maxLength = 50) => {
    if (!url || url.length <= maxLength) return url;
    return url.substring(0, maxLength) + '...';
    };

    
  return (
    <nav className='relative bg-white/10 backdrop-blur-md border-b border-white/20 shadow-lg z-50'>
        <div className='flex max-w-7xl mx-auto items-center justify-between px-6 py-4'>
            
            {/* Logo Section */}
            <div className='flex items-center space-x-8'>
                <Link to="/" className="group">
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                            <FaBolt className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent group-hover:from-purple-300 group-hover:via-pink-300 group-hover:to-purple-300 transition-all duration-300">
                                Convert
                                <span className="text-white">ForYou</span>
                            </p>
                            <p className="text-xs text-white/60 font-medium -mt-1">Free Online Converter</p>
                        </div>
                    </div>
                </Link>
                
                {/* Navigation Links */}
                <div className='hidden md:flex items-center space-x-2'>
                    <Link 
                        to="https://discord.gg/9ytVAPNtmz" 
                        className='group flex items-center space-x-2 px-4 py-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-300 border border-transparent hover:border-white/20'
                    >
                        <BiSupport className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                        <span className="font-medium">Support</span>
                    </Link>
                </div>
            </div>

            {/* History Button */}
            <button 
                onClick={handleOpen} 
                className="group relative bg-white/5 hover:bg-white/15 border border-white/20 hover:border-purple-400/50 rounded-xl px-4 py-3 text-white transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl backdrop-blur-sm"
                aria-label="View utility history"
            >
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-lg flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
                        <FaHistory className="w-4 h-4 text-white" />
                    </div>
                    <div className="text-left hidden sm:block">
                        <p className="font-semibold text-sm">guest{data ? data._id : "..."}</p>
                        <p className="text-xs text-white/60 group-hover:text-white/80 transition-colors">View history</p>
                    </div>
                </div>
            </button>

            {/* History Modal */}
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-900/95 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl w-[90vw] md:w-[700px] max-h-[80vh] overflow-hidden">

                    {/* Modal Header */}
                    <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-b border-white/20 p-6">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                                    <FaClock className='w-5 h-5 text-white'/>
                                </div>
                                <div>
                                    <h2 className="text-white text-xl font-bold">Utility History</h2>
                                    <p className="text-white/60 text-sm">Your recent conversions</p>
                                </div>
                            </div>
                            <button 
                                onClick={handleClose}
                                className="text-white/60 hover:text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
                            >
                                ✕
                            </button>
                        </div>
                        
                        {/* Expiry Warning */}
                        <div className="mt-4 flex items-center gap-3 text-sm font-medium p-4 bg-gradient-to-r from-red-500/20 to-pink-500/20 border border-red-400/30 rounded-xl text-red-300 backdrop-blur-sm">
                            <FaClock className="w-4 h-4 flex-shrink-0" />
                            <span>History expires: {formatDate(data ? data.expiresAt : '...')}</span>
                        </div>
                    </div>

                    {/* Modal Content */}
                    <div className="overflow-y-auto max-h-[calc(80vh-180px)] scroll-smooth">
                        {loading ? (
                            <div className="flex items-center justify-center py-12">
                                <MoonLoader color="#a855f7" size={40} />
                            </div>
                        ) : utilityHistory.length === 0 ? (
                            <div className="text-center py-16 text-white/60">
                                <RiFilePaper2Fill className="w-20 h-20 mx-auto mb-6 opacity-50" />
                                <h3 className="text-xl font-semibold text-white mb-2">No history available</h3>
                                <p className="text-sm">Your conversion history will appear here once you start using our tools</p>
                            </div>
                        ) : (
                            <div className="p-6 space-y-4">
                                {utilityHistory
                                    .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
                                    .map((entry, index) => (
                                    <article key={entry.timestamp} className={`group bg-white/5 hover:bg-white/10 rounded-xl p-5 border border-white/10 hover:border-white/30 transition-all duration-300 ${index === 0 ? 'ring-2 ring-purple-500/30 bg-gradient-to-r from-purple-500/10 to-pink-500/10' : ''}`}>
                                        <header className="flex items-start justify-between mb-4">
                                            <div className="flex items-center text-white space-x-3">
                                                <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                                    {getUtilityIcon(entry.type)}
                                                </div>
                                                <div>
                                                    <h3 className="font-semibold text-base">{entry.type}</h3>
                                                    <time className="text-xs text-white/50 mt-1 block">
                                                        {formatDate(entry.timestamp)}
                                                    </time>
                                                </div>
                                            </div>
                                            {index === 0 && (
                                                <span className="text-xs bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full font-medium shadow-lg">
                                                    Latest
                                                </span>
                                            )}
                                        </header>

                                        <div className="ml-11 space-y-3 text-sm">
                                            {(entry.type === "url" || entry.type === "URL Shortener") && (
                                                <div className="space-y-2 bg-white/5 rounded-lg p-3">
                                                    <div className="flex items-start gap-3">
                                                        <span className="text-white/60 min-w-[70px] font-medium">Original:</span>
                                                        <Link to={entry.details?.originalUrl} className="text-purple-300 hover:text-purple-200 transition-colors break-all font-medium underline decoration-purple-300/30 hover:decoration-purple-200" title={entry.details?.originalUrl}>
                                                            {truncateUrl(entry.details?.originalUrl)}
                                                        </Link>
                                                    </div>
                                                    <div className="flex items-start gap-3">
                                                        <span className="text-white/60 min-w-[70px] font-medium">Short:</span>
                                                        <Link to={entry.details?.shortUrl} className="text-pink-300 hover:text-pink-200 transition-colors font-bold underline decoration-pink-300/30 hover:decoration-pink-200">
                                                            {entry.details?.shortUrl}
                                                        </Link>
                                                    </div>
                                                </div>
                                            )}

                                            {entry.type === "Soundcloud Converter" && (
                                                <div className="space-y-2 bg-white/5 rounded-lg p-3">
                                                    <div className="flex items-start gap-3">
                                                        <span className="text-white/60 min-w-[50px] font-medium">Title:</span>
                                                        <span className="text-white font-semibold">{entry.details?.title}</span>
                                                    </div>
                                                    <div className="flex items-start gap-3">
                                                        <span className="text-white/60 min-w-[50px] font-medium">Source:</span>
                                                        <Link to={entry.details?.source} className="text-purple-300 hover:text-purple-200 transition-colors break-all underline decoration-purple-300/30 hover:decoration-purple-200" title={entry.details?.source}>
                                                            {truncateUrl(entry.details?.source)}
                                                        </Link>
                                                    </div>
                                                </div>
                                            )}

                                            {entry.type === "YouTube Converter" && (
                                                <div className="space-y-2 bg-white/5 rounded-lg p-3">
                                                    <div className="flex items-start gap-3">
                                                        <span className="text-white/60 min-w-[50px] font-medium">Title:</span>
                                                        <span className="text-white font-semibold">{entry.details?.title}</span>
                                                    </div>
                                                    <div className="flex items-start gap-3">
                                                        <span className="text-white/60 min-w-[50px] font-medium">Source:</span>
                                                        <Link to={entry.details?.source} className="text-purple-300 hover:text-purple-200 transition-colors break-all underline decoration-purple-300/30 hover:decoration-purple-200" title={entry.details?.source}>
                                                            {truncateUrl(entry.details?.source)}
                                                        </Link>
                                                    </div>
                                                </div>
                                            )}

                                            {entry.type === "Spotify Playlist to .txt Converter" && (
                                                <div className="space-y-2 bg-white/5 rounded-lg p-3">
                                                    <div className="flex items-start gap-3">
                                                        <span className="text-white/60 min-w-[60px] font-medium">Playlist:</span>
                                                        <span className="text-white font-semibold">{entry.details?.playlistName}</span>
                                                    </div>
                                                    <div className="flex items-start gap-3">
                                                        <span className="text-white/60 min-w-[60px] font-medium">URL:</span>
                                                        <Link to={entry.details?.playlistUrl} className="text-purple-300 hover:text-purple-200 transition-colors break-all underline decoration-purple-300/30 hover:decoration-purple-200" title={entry.details?.playlistUrl}>
                                                            {truncateUrl(entry.details?.playlistUrl)}
                                                        </Link>
                                                    </div>
                                                </div>
                                            )}

                                            {entry.type === "Spotify > mp3 Converter" && (
                                                <div className="space-y-2 bg-white/5 rounded-lg p-3">
                                                    <div className="flex items-start gap-3">
                                                        <span className="text-white/60 min-w-[50px] font-medium">Title:</span>
                                                        <span className="text-white font-semibold">{entry.details?.title}</span>
                                                    </div>
                                                    <div className="flex items-start gap-3">
                                                        <span className="text-white/60 min-w-[50px] font-medium">Source:</span>
                                                        <Link to={entry.details?.source} className="text-purple-300 hover:text-purple-200 transition-colors break-all underline decoration-purple-300/30 hover:decoration-purple-200" title={entry.details?.source}>
                                                            {truncateUrl(entry.details?.source)}
                                                        </Link>
                                                    </div>
                                                </div>
                                            )}

                                            {entry.type === "MP4 > MP3 Converter" && (
                                                <div className="space-y-2 bg-white/5 rounded-lg p-3">
                                                    <div className="flex items-start gap-3">
                                                        <span className="text-white/60 min-w-[50px] font-medium">File:</span>
                                                        <span className="text-white font-semibold">{entry.details?.fileName || "Unnamed.mp3"}</span>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </article>
                                ))}
                            </div>
                        )}
                    </div>
                </Box>
            </Modal>
        </div>
    </nav>
  )
}

export default Navbar;