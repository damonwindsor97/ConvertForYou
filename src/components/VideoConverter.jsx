import axios from 'axios';
import { useState } from 'react';
import { Select } from '@mui/base/Select';
import { Option } from '@mui/base/Option';
import { GrPowerReset } from "react-icons/gr";
import { BarLoader } from 'react-spinners';
import { FaVideo, FaDownload, FaCheckCircle, FaExclamationTriangle, FaFileVideo, FaMusic, FaCloud, FaServer } from "react-icons/fa";
import { MdCloudUpload } from "react-icons/md";

function VideoConverter() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState('');

  const [fromFormat, setFromFormat] = useState('');
  const [toFormat, setToFormat] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const [uploadProgress, setUploadProgress] = useState(0); 
  const [progress, setProgress] =useState(0);
  const [progressMessage, setProgressMessage] = useState('')

  const resetState = () => {
    const inputField = document.getElementById('fileInput');
    if(inputField){
      inputField.value = '';
    }
    
    setFile(null);
    setPreview('');
    setFromFormat('');
    setToFormat('');
    setError('');
    setSuccess(false);
    setProgressMessage('');
  };

  const SupportedFileTypes = [
    "mp4"
  ];

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]

    if(selectedFile){
      const fileType = selectedFile.type.split('/')[1];

      if(SupportedFileTypes.includes(fileType.toLowerCase())){
        setFile(selectedFile)
        setFromFormat(fileType)
        setPreview(URL.createObjectURL(selectedFile));
        setError('')
      } else {
        setError('File type is not supported.');
        setFile(null);
        setPreview('');
        setFromFormat('');
      }
    };
  };

  const convertVideo = async () => {
    if (!file || !toFormat){
      setError("Please select a file and format.");
      alert("Please select a file and format.");
      return;
    }

    if (file.size > 509715200) {
      setError("File size exceeds 500MB limit");
      return;
    }

    setLoading(true)
    setError('')
    setSuccess(false)
    setUploadProgress(0);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await axios.post(
        `${import.meta.env.VITE_API_ENDPOINT}/video/tomp3`,
        formData,
        {
          responseType: 'blob',
          withCredentials: true,
          onUploadProgress: (progressEvent) => {
            if (progressEvent.total) {
              const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
              setUploadProgress(percent);
            }
          }
        }
      );

      const url = window.URL.createObjectURL(response.data);
      const link = document.createElement('a');
      link.href = url;
      const fileName = file.name.replace(/\.[^/.]+$/, "") + ".mp3";
      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      setSuccess(true);
      setLoading(false);
      setUploadProgress(0);
    } catch (error) {
      setLoading(false);
      setError('An error occurred during conversion.');
      setUploadProgress(0);
    }
  };

  const getFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center space-x-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg">
            <FaVideo className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white">Video Converter</h2>
        </div>
        <p className="text-white/70 mb-4">Upload your video • Select output format • Convert to audio</p>
        <div className="flex justify-center">
          <div className="bg-white/10 rounded-lg px-4 py-2 border border-white/20">
            <p className='text-white/80 text-sm'>
              Supported formats: <span className='text-red-400 font-semibold'>
                {SupportedFileTypes.map((fileType, index) => 
                  fileType.toUpperCase() + (index < SupportedFileTypes.length - 1 ? ', ' : '')
                )}
              </span>
            </p>
          </div>
        </div>
      </div>

      <div className={`bg-white/10 backdrop-blur-md rounded-2xl border p-8 transition-all duration-300 ${
        success ? 'border-green-400/50 shadow-green-400/20' : 'border-white/20'
      } shadow-2xl`}>
        
        <div className="flex justify-between items-center mb-6">
          <div className="text-xs text-white/60">
            Powered by: ConvertForYou
          </div>
          <button  onClick={resetState} className="p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-300 group" title="Reset form">
            <GrPowerReset className="w-4 h-4 group-hover:rotate-180 transition-transform duration-300"/>
          </button>
        </div>

        <div className="space-y-6">
          <div className="space-y-4">
            <label className="block text-white/80 text-sm font-medium">
              Select Video File
            </label>
            
            <div className="relative">
              <input type="file" onChange={handleFileChange} name="fileInput" id="fileInput" accept="video/*" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"/>
              <div className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${
                file ? 'border-red-400/50 bg-red-400/10' : 'border-white/30 hover:border-white/50 hover:bg-white/5'
              }`}>
                <div className="flex flex-col items-center space-y-4">
                  <div className={`w-16 h-16 rounded-xl flex items-center justify-center transition-all duration-300 ${
                    file ? 'bg-red-500' : 'bg-white/10'
                  }`}>
                    {file ? (
                      <FaCheckCircle className="w-8 h-8 text-white" />
                    ) : (
                      <MdCloudUpload className="w-8 h-8 text-white/70" />
                    )}
                  </div>
                  <div>
                    <p className="text-white font-semibold mb-1">
                      {file ? 'Video Selected!' : 'Drop your video here or click to browse'}
                    </p>
                    <p className="text-white/60 text-sm">
                      {file ? `${file.name} (${getFileSize(file.size)})` : 'Maximum file size: 500MB'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-3 bg-yellow-500/20 border border-yellow-400/30 rounded-lg">
              <FaExclamationTriangle className="w-4 h-4 text-yellow-400 flex-shrink-0" />
              <p className="text-yellow-300 text-sm font-medium">Maximum file size: 500MB</p>
            </div>
          </div>

          {file && (
            <div className="space-y-4">
              <div className="flex flex-col md:flex-row gap-4 items-start md:items-end">
                <div className="flex-1">
                  <label className="block text-white/80 text-sm font-medium mb-2">
                    Current Format
                  </label>
                  <div className="bg-white/5 border border-white/20 rounded-xl px-4 py-3">
                    <div className="flex items-center space-x-3">
                      <FaFileVideo className="w-5 h-5 text-red-400" />
                      <span className="text-white font-semibold">{fromFormat?.toUpperCase()}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-center">
                  <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-purple-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">→</span>
                  </div>
                </div>

                <div className="flex-1">
                  <label className="block text-white/80 text-sm font-medium mb-2">
                    Convert To
                  </label>
                  <div className="relative z-20">
                    <Select value={toFormat} onChange={(_, newValue) => setToFormat(newValue)} className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white font-semibold hover:bg-white/15 transition-all duration-300" placeholder="Select output format" slotProps={{
                        listbox: {
                          className: " z-50 rounded-xl bg-gray-900/95 backdrop-blur-md border border-white/20 text-white shadow-2xl mt-1 overflow-hidden max-h-80 overflow-y-auto"
                        }
                      }}
                    >
                      <Option value="MP3" className="p-4 hover:bg-white/10 cursor-pointer transition-colors">
                        <div className="flex items-center space-x-3">
                          <div className="w-6 h-6 bg-green-500 rounded flex items-center justify-center">
                            <FaMusic className="w-3 h-3 text-white" />
                          </div>
                          <span>MP3 - Audio only</span>
                        </div>
                      </Option>
                    </Select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {preview && (
            <div className="space-y-4">
              <label className="block text-white/80 text-sm font-medium">
                Preview
              </label>
              <div className='bg-white/5 border border-white/20 rounded-xl p-6'>
                <div className="flex justify-center">
                  <div className="max-w-md">
                    <video 
                      src={preview}
                      controls
                      className="max-w-full h-auto rounded-lg shadow-lg border border-white/20" 
                    />
                  </div>
                </div>
                <div className="mt-4 text-center">
                  <p className="text-white/60 text-sm">
                    {file?.name} • {getFileSize(file?.size)} • {fromFormat?.toUpperCase()}
                  </p>
                </div>
              </div>
            </div>
          )}

          <button 
            onClick={convertVideo} 
            disabled={loading || !file || !toFormat}
            className='w-full bg-gradient-to-r from-red-500 to-purple-500 hover:from-red-600 hover:to-purple-600 disabled:from-gray-500 disabled:to-gray-600 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl disabled:scale-100 disabled:shadow-none flex items-center justify-center space-x-3'
          >
            {loading ? (
              <div className="flex flex-col items-center space-y-2">
                <BarLoader color="#ffffff" width={60} height={4} />
                <span className="text-sm">Converting...</span>
              </div>
            ) : (
              <>
                <FaDownload className="w-5 h-5" />
                <span>Convert Video</span>
              </>
            )}
          </button>

          {loading && (
            <div className="space-y-3 p-4 bg-white/5 border border-white/20 rounded-xl">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center animate-pulse">
                  <FaCloud className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-white font-medium">{progressMessage}</p>
                  {uploadProgress > 0 && uploadProgress < 100 && (
                    <div className="mt-2">
                      <div className="flex justify-between text-sm text-white/60 mb-1">
                        <span>Upload Progress</span>
                        <span>{uploadProgress}%</span>
                      </div>
                      <div className="w-full bg-white/20 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${uploadProgress}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          <div className="space-y-4">
            {error && (
              <div className="flex items-center space-x-3 p-4 bg-red-500/20 border border-red-400/30 rounded-xl">
                <FaExclamationTriangle className="w-5 h-5 text-red-400 flex-shrink-0" />
                <div>
                  <p className="text-red-300 font-bold">Error</p>
                  <p className="text-red-200 text-sm">{error}</p>
                </div>
              </div>
            )}

            {success && (
              <div className="flex items-center space-x-3 p-4 bg-green-500/20 border border-green-400/30 rounded-xl">
                <FaCheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                <div>
                  <p className="text-green-300 font-bold">Successfully Converted!</p>
                  <p className="text-green-200 text-sm">Your audio file has been downloaded</p>
                </div>
              </div>
            )}
          </div>

          <div className="bg-white/5 rounded-xl p-4 border border-white/10">
            <div className="flex items-center space-x-3 mb-3">
              <FaServer className="w-5 h-5 text-purple-400" />
              <h3 className="text-white font-semibold">Server-Side Processing</h3>
            </div>
            <p className="text-white/60 text-sm leading-relaxed">
              Your videos are uploaded to our secure servers for processing. Files are automatically deleted 
              after conversion to protect your privacy. Conversion quality is optimized for best results.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VideoConverter