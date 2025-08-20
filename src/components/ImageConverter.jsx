import { useState } from 'react';

import { Select } from '@mui/base/Select';
import { Option } from '@mui/base/Option';
import { GrPowerReset } from "react-icons/gr";
import { BarLoader } from 'react-spinners';
import { FaImage, FaUpload, FaDownload, FaCheckCircle, FaExclamationTriangle, FaFileImage } from "react-icons/fa";
import { MdCloudUpload, MdImage } from "react-icons/md";
import { BiImageAdd } from "react-icons/bi";

const ImageConverter = () => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState('');
  const [fromFormat, setFromFormat] = useState('');
  const [toFormat, setToFormat] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const SupportedFileTypes = [
    "jpg", "jpeg", "png", "webp", "x-icon", "gif"
  ];

  const handleFileChange = (e) => {
    // get the file that's been selected
    const selectedFile = e.target.files[0];
    // console.log(selectedFile)

    if (selectedFile) {
      // get the file type after image/
      const fileType = selectedFile.type.split('/')[1];
      // If the file type matches one of our supported file types, run this
      if (SupportedFileTypes.includes(fileType.toLowerCase())) {
        setFile(selectedFile);
        setPreview(URL.createObjectURL(selectedFile));
        setFromFormat(fileType);
        setError('');
      } else {
        setError('File type is not supported.');
        setFile(null);
        setPreview('');
        setFromFormat('');
      }
    }
  };

  const resetState = () => {
    const inputField = document.getElementsByName('fileInput')[0];
    if(inputField){
      inputField.value = '';
    }

    setFile(null);
    setPreview('');
    setFromFormat('');
    setToFormat('');
    setError('');
    setSuccess(false);
  };

  const convertImage = async () => {
    // Simple error handling to make sure there is a file and a format
    if (!file || !toFormat) {
      setError("Please select a file and format.");
      alert("Please select a file and format.");
      return;
    }

    setLoading(true);
    setError('');
    setSuccess(false);
  
    try {
      // Initiate a promise which will eventually hold a blob object
      const blob = await new Promise((resolve, reject) => {
        // create FileReader object, used to read contents of the file
        const reader = new FileReader();
        // setup event handler for the file reader
        reader.onload = function(event) {
          // Creating an image object to load image data into
          const img = new Image();

          img.onload = function() {
            // create a canvas element and set its dimensions to match the uploaded image
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            // Get back 2d rendering context of canvas, allows us to draw on the canvas
            const ctx = canvas.getContext('2d');
            // draw loaded image onto our canvas with position top-0 left-0
            ctx.drawImage(img, 0, 0);
            // convert our convas to a blob with the specified name
            canvas.toBlob(resolve, `image/${toFormat.toLowerCase()}`);
          };
          // error handler for the image loading
          img.onerror = reject;
          img.src = event.target.result;
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
  
      // Create a download link for the user
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');

      // Take away last 4 characters from name, usually is the old extension
      const fileName = file.name.slice(0, -4)
      // Attach our block/url to the anchor tag
      a.href = url;
      // Create the name for the download & then 'click' download for the user / auto download
      a.download = `${fileName}.${toFormat.toLowerCase()}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
  
      setSuccess(true);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
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
      {/* Header Section */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center space-x-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl flex items-center justify-center shadow-lg">
            <FaImage className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white">Image Converter</h2>
        </div>
        <p className="text-white/70 mb-4">Upload your image • Select output format • Convert instantly</p>
        <div className="flex justify-center">
          <div className="bg-white/10 rounded-lg px-4 py-2 border border-white/20">
            <p className='text-white/80 text-sm'>
              Supported formats: <span className='text-blue-400 font-semibold'>
                {SupportedFileTypes.map((fileType, index) => 
                  fileType.toUpperCase() + (index < SupportedFileTypes.length - 1 ? ', ' : '')
                )}
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Main Converter Card */}
      <div className={`bg-white/10 backdrop-blur-md rounded-2xl border p-8 transition-all duration-300 ${
        success ? 'border-green-400/50 shadow-green-400/20' : 'border-white/20'
      } shadow-2xl`}>
        
        {/* Powered By Badge */}
        <div className="flex justify-between items-center mb-6">
          <div className="text-xs text-white/60">Powered by: ConvertForYou</div>
          <button  onClick={resetState} className="p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-300 group" title="Reset form"
          >
            <GrPowerReset className="w-4 h-4 group-hover:rotate-180 transition-transform duration-300"/>
          </button>
        </div>

        <div className="space-y-6">
          {/* File Upload Section */}
          <div className="space-y-4">
            <label className="block text-white/80 text-sm font-medium"> Select Image File</label>
            
            {/* Custom File Upload Area */}
            <div className="relative">
              <input type="file" onChange={handleFileChange} name="fileInput" accept="image/*" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              />
              <div className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${
                file ? 'border-green-400/50 bg-green-400/10' : 'border-white/30 hover:border-white/50 hover:bg-white/5'
              }`}>
                <div className="flex flex-col items-center space-y-4">
                  <div className={`w-16 h-16 rounded-xl flex items-center justify-center transition-all duration-300 ${
                    file ? 'bg-green-500' : 'bg-white/10'
                  }`}>
                    {file ? (
                      <FaCheckCircle className="w-8 h-8 text-white" />
                    ) : (
                      <MdCloudUpload className="w-8 h-8 text-white/70" />
                    )}
                  </div>
                  <div>
                    <p className="text-white font-semibold mb-1">
                      {file ? 'File Selected!' : 'Drop your image here or click to browse'}
                    </p>
                    <p className="text-white/60 text-sm">
                      {file ? `${file.name} (${getFileSize(file.size)})` : 'Supports JPG, PNG, WebP, GIF, ICO formats'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Format Selection */}
          {file && (
            <div className="space-y-4">
              <div className="flex flex-col md:flex-row gap-4 items-start md:items-end">
                <div className="flex-1">
                  <label className="block text-white/80 text-sm font-medium mb-2"> Current Format</label>
                  <div className="bg-white/5 border border-white/20 rounded-xl px-4 py-3">
                    <div className="flex items-center space-x-3">
                      <FaFileImage className="w-5 h-5 text-blue-400" />
                      <span className="text-white font-semibold">{fromFormat?.toUpperCase()}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-center">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">→</span>
                  </div>
                </div>

                <div className="flex-1">
                  <label className="block text-white/80 text-sm font-medium mb-2">Convert To</label>
                  <div className="relative z-20">
                    <Select value={toFormat}onChange={(_, newValue) => setToFormat(newValue)} className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white font-semibold hover:bg-white/15 transition-all duration-300" placeholder="Select output format" slotProps={{
                        listbox: {
                          className: "z-50 rounded-xl bg-gray-900/95 backdrop-blur-md border border-white/20 text-white shadow-2xl mt-1 overflow-hidden max-h-80 overflow-y-auto"
                        }
                      }}
                    >
                      <Option value="PNG" className="p-4 hover:bg-white/10 cursor-pointer transition-colors border-b border-white/10">
                        <div className="flex items-center space-x-3">
                          <div className="w-6 h-6 bg-blue-500 rounded flex items-center justify-center">
                            <span className="text-white text-xs font-bold">PNG</span>
                          </div>
                          <span>PNG - Lossless compression</span>
                        </div>
                      </Option>   
                      <Option value="JPG" className="p-4 hover:bg-white/10 cursor-pointer transition-colors border-b border-white/10">
                        <div className="flex items-center space-x-3">
                          <div className="w-6 h-6 bg-red-500 rounded flex items-center justify-center">
                            <span className="text-white text-xs font-bold">JPG</span>
                          </div>
                          <span>JPG - Smaller file size</span>
                        </div>
                      </Option>   
                      <Option value="WEBP" className="p-4 hover:bg-white/10 cursor-pointer transition-colors border-b border-white/10">
                        <div className="flex items-center space-x-3">
                          <div className="w-6 h-6 bg-green-500 rounded flex items-center justify-center">
                            <span className="text-white text-xs font-bold">WP</span>
                          </div>
                          <span>WebP - Modern web format</span>
                        </div>
                      </Option>   
                      <Option value="ico" className="p-4 hover:bg-white/10 cursor-pointer transition-colors">
                        <div className="flex items-center space-x-3">
                          <div className="w-6 h-6 bg-purple-500 rounded flex items-center justify-center">
                            <span className="text-white text-xs font-bold">ICO</span>
                          </div>
                          <span>ICO - Icon format</span>
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
              <label className="block text-white/80 text-sm font-medium">Preview</label>
              <div className='bg-white/5 border border-white/20 rounded-xl p-6'>
                <div className="flex justify-center">
                  <div className="max-w-sm">
                    <img  src={preview} alt="Preview" className="max-w-full h-auto rounded-lg shadow-lg border border-white/20"/>
                  </div>
                </div>
                <div className="mt-4 text-center">
                  <p className="text-white/60 text-sm"> {file?.name} • {getFileSize(file?.size)} • {fromFormat?.toUpperCase()}</p>
                </div>
              </div>
            </div>
          )}

          <button onClick={convertImage}  disabled={loading || !file || !toFormat} className='w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 disabled:from-gray-500 disabled:to-gray-600 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl disabled:scale-100 disabled:shadow-none flex items-center justify-center space-x-3'>
            {loading ? (
              <>
                <BarLoader color="#ffffff" width={60} height={4} />
                <span className="ml-3">Converting...</span>
              </>
            ) : (
              <>
                <FaDownload className="w-5 h-5" />
                <span>Convert Image</span>
              </>
            )}
          </button>

          {/* Status Messages */}
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
                  <p className="text-green-200 text-sm">Your image has been downloaded</p>
                </div>
              </div>
            )}
          </div>


          <div className="bg-white/5 rounded-xl p-4 border border-white/10">
            <div className="flex items-center space-x-3 mb-3">
              <BiImageAdd className="w-5 h-5 text-blue-400" />
              <h3 className="text-white font-semibold">Client-Side Processing</h3>
            </div>
            <p className="text-white/60 text-sm leading-relaxed">Your images are processed entirely in your browser. No files are uploaded to our servers, 
              ensuring complete privacy and security. Conversion happens instantly using HTML5 Canvas technology.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageConverter