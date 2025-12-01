import React, { useState, useEffect, useRef } from 'react';
import { 
  User, Settings, LogOut, Moon, Sun, Heart, MessageSquare,
  ArrowLeft, MapPin, Link2, Calendar, 
  Grid3X3, Tag, Image as ImageIcon, Lock, MoreHorizontal,
  Plus, X, Camera, Zap, Upload, CheckCircle, RefreshCw, 
  Type, Video, Palette, Play, Clock, ChevronRight, Send, Eye,
  ChevronUp, ChevronDown
} from 'lucide-react';

/* ==================================================================================================
 * 1. CONFIGURATION & DATA
 * ================================================================================================== */

// Minimized Navigation
const NAV_ITEMS = [
  { id: 'profile', label: 'Profile', icon: User },
];

// Helper to generate consistent mock posts
const generateMockPosts = (userId, count) => {
  const images = [
    '1554080353-a576cf803bda', '1508739773445-be4ff4218fb0', '1497215728101-856f4ea42174',
    '1515378791036-0648a3ef77b2', '1534528741775-53994a69daeb', '1504932414104-b79d2dbc04f6'
  ];
  return Array(count).fill(null).map((_, i) => ({
    id: `${userId}-post-${i}`,
    image: `https://images.unsplash.com/photo-${images[i % images.length]}?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80`,
    likes: Math.floor(Math.random() * 500) + 50,
    comments: Math.floor(Math.random() * 50) + 5,
  }));
};

// Mock Data for Current User
const MY_PROFILE_DATA = {
  id: 'me',
  name: 'Jane Doe',
  handle: '@jane_design',
  bio: 'Digital Designer & Photographer 📸 capturing life one pixel at a time. Based in NYC 🗽. Creating UI/UX magic ✨',
  location: 'New York, USA',
  website: 'janedoe.design',
  joined: 'September 2021',
  followers: '12.5k',
  following: '842',
  posts_count: '148',
  avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
  isCurrentUser: true,
  posts: generateMockPosts('me', 12),
  statuses: [] // Start with empty statuses
};

/* ==================================================================================================
 * 2. SHARED COMPONENTS
 * ================================================================================================== */

const UserMenuPopup = ({ isOpen, isDark, toggleTheme, positionClass, onNavigate }) => {
  if (!isOpen) return null;
  return (
    <div className={`absolute z-50 w-64 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 p-2 animate-fade-in ${positionClass}`}>
      <div className="px-3 py-2 mb-1">
        <p className="text-sm font-bold text-slate-900 dark:text-white">Jane Doe</p>
        <p className="text-xs text-slate-500 truncate">jane@example.com</p>
      </div>
      <button onClick={() => onNavigate('settings')} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 transition-colors text-sm font-medium"><Settings size={18} /> Settings</button>
      <button onClick={toggleTheme} className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 transition-colors text-sm font-medium">
        <div className="flex items-center gap-3">{isDark ? <Moon size={18} /> : <Sun size={18} />} <span>Theme</span></div>
        <span className="text-[10px] font-bold bg-slate-200 dark:bg-slate-700 px-2 py-0.5 rounded-full text-slate-500 dark:text-slate-400 uppercase tracking-wide">{isDark ? 'Dark' : 'Light'}</span>
      </button>
      <div className="h-px bg-slate-100 dark:bg-slate-800 my-1"></div>
      <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400 transition-colors text-sm font-medium"><LogOut size={18} /> Log Out</button>
    </div>
  );
}

const AvatarModal = ({ src, isOpen, onClose }) => {
  if (!isOpen) return null;
  return (
    <div 
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-950/90 backdrop-blur-md animate-fade-in p-4 md:p-8"
      onClick={onClose}
    >
      {/* Close Button */}
      <button 
        onClick={onClose} 
        className="absolute top-6 right-6 md:top-8 md:right-8 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all hover:scale-110 z-50"
      >
        <X size={32} />
      </button>
      <div className="relative flex items-center justify-center w-full h-full pointer-events-none">
        <img 
          src={src} 
          alt="Profile Full Size" 
          className="max-w-full max-h-[85vh] w-auto h-auto object-contain rounded-2xl shadow-2xl animate-pop-in pointer-events-auto border border-white/10"
          onClick={(e) => e.stopPropagation()} 
        />
      </div>
    </div>
  );
};

// --- STATUS VIEWER MODAL ---
const StatusViewerModal = ({ isOpen, onClose, statuses, initialIndex = 0, onMarkSeen }) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [progress, setProgress] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(initialIndex);
      setProgress(0);
    }
  }, [isOpen, initialIndex]);

  useEffect(() => {
    if (isOpen && statuses[currentIndex] && !statuses[currentIndex].isSeen) {
      onMarkSeen(statuses[currentIndex].id);
    }
  }, [currentIndex, isOpen, statuses, onMarkSeen]);

  useEffect(() => {
    if (!isOpen || !statuses[currentIndex]) return;

    const currentStatus = statuses[currentIndex];
    // Default durations: Text/Image = 5s, Video = 60s (or actual duration)
    const duration = currentStatus.meta?.duration || 5;
    const step = 100; 
    const totalSteps = (duration * 1000) / step;
    let currentStep = 0;

    if (timerRef.current) clearInterval(timerRef.current);

    timerRef.current = setInterval(() => {
      currentStep++;
      const newProgress = (currentStep / totalSteps) * 100;
      setProgress(newProgress);

      if (newProgress >= 100) {
        clearInterval(timerRef.current);
        handleNext();
      }
    }, step);

    return () => clearInterval(timerRef.current);
  }, [currentIndex, isOpen, statuses]);

  const handleNext = () => {
    if (currentIndex < statuses.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setProgress(0);
    } else {
      onClose();
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
      setProgress(0);
    }
  };

  if (!isOpen || !statuses[currentIndex]) return null;

  const status = statuses[currentIndex];

  return (
    <div className="fixed inset-0 z-[1200] bg-black flex flex-col animate-fade-in">
      <div className="flex gap-1 p-2 pt-4 absolute top-0 left-0 right-0 z-20">
        {statuses.map((s, idx) => (
          <div key={s.id} className="h-1 flex-1 bg-white/30 rounded-full overflow-hidden">
            <div 
              className={`h-full bg-white transition-all duration-100 ease-linear`}
              style={{ 
                width: idx < currentIndex ? '100%' : idx === currentIndex ? `${progress}%` : '0%' 
              }}
            />
          </div>
        ))}
      </div>

      <div className="absolute top-6 left-0 right-0 p-4 z-20 flex justify-between items-center mt-2">
         <div className="flex items-center gap-3">
           <div className="w-8 h-8 rounded-full bg-slate-200 overflow-hidden border border-white/20">
             <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500"></div>
           </div>
           <div className="flex flex-col">
             <span className="text-sm font-bold text-white shadow-sm">Jane Doe</span>
             <span className="text-[10px] text-white/70">Just now</span>
           </div>
         </div>
         <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full text-white transition-colors">
           <X size={24} />
         </button>
      </div>

      <div className="flex-1 relative flex items-center justify-center bg-slate-900">
        <div className="absolute inset-y-0 left-0 w-1/3 z-10" onClick={handlePrev}></div>
        <div className="absolute inset-y-0 right-0 w-1/3 z-10" onClick={handleNext}></div>

        {/* CONTENT RENDERER */}
        {status.type === 'text' ? (
          <div className={`w-full h-full flex items-center justify-center p-8 text-center ${status.meta?.color || 'bg-slate-800'}`}>
             <p className="text-2xl md:text-4xl font-bold text-white drop-shadow-md break-words max-w-2xl">
               {status.content}
             </p>
          </div>
        ) : status.type === 'image' ? (
          <div className="w-full h-full bg-black flex items-center justify-center">
            <img src={status.content} alt="Status" className="w-full h-full object-contain" />
          </div>
        ) : (
           <div className="w-full h-full flex items-center justify-center bg-black">
             <div className="text-white flex flex-col items-center gap-4">
               <Video size={48} className="opacity-50" />
               <p>Video Status Content</p>
             </div>
           </div>
        )}
      </div>

      <div className="p-4 absolute bottom-0 left-0 right-0 z-20 bg-gradient-to-t from-black/80 to-transparent pb-8">
        <div className="flex items-center justify-center">
          <ChevronUp size={24} className="text-white/50 animate-bounce" />
        </div>
      </div>
    </div>
  );
};

// --- REDESIGNED ACTION SHEET MODAL ---
const AvatarActionModal = ({ isOpen, onClose, mode, onViewProfile, onViewStatus, onUploadStatus, onChangePic }) => {
  if (!isOpen) return null;
  
  const isEditMode = mode === 'edit';

  return (
    <div className="fixed inset-0 z-[1150] flex items-center justify-center bg-slate-950/60 backdrop-blur-sm animate-fade-in p-4" onClick={onClose}>
      <div 
        className="bg-white dark:bg-slate-900 w-full max-w-sm rounded-3xl overflow-hidden shadow-2xl animate-pop-in border border-slate-200 dark:border-slate-800" 
        onClick={e => e.stopPropagation()}
      >
         <div className="p-4 border-b border-slate-100 dark:border-slate-800 text-center relative bg-slate-50/50 dark:bg-slate-900/50">
           <h3 className="font-bold text-lg text-slate-900 dark:text-white">
             {isEditMode ? 'Update Profile' : 'Profile Photo'}
           </h3>
           <button 
             onClick={onClose}
             className="absolute right-4 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-slate-200/50 dark:bg-slate-800 text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
           >
             <X size={18} />
           </button>
         </div>
         
         <div className="p-3 flex flex-col gap-2">
           {isEditMode ? (
             <>
               <button 
                 onClick={onUploadStatus} 
                 className="w-full p-3.5 rounded-xl hover:bg-purple-50 dark:hover:bg-purple-900/10 flex items-center gap-4 group transition-all duration-200 border border-transparent hover:border-purple-100 dark:hover:border-purple-900/30"
               >
                 <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 flex items-center justify-center group-hover:scale-105 transition-transform shadow-sm">
                   <Zap size={20} strokeWidth={2.5} />
                 </div>
                 <div className="text-left flex-1">
                   <p className="font-bold text-sm text-slate-900 dark:text-white">Add to Status</p>
                   <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Share a new update</p>
                 </div>
                 <ChevronRight size={18} className="text-slate-300 dark:text-slate-600 group-hover:text-purple-400 transition-colors" />
               </button>
               
               <button 
                 onClick={onChangePic} 
                 className="w-full p-3.5 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-900/10 flex items-center gap-4 group transition-all duration-200 border border-transparent hover:border-blue-100 dark:hover:border-blue-900/30"
               >
                 <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center group-hover:scale-105 transition-transform shadow-sm">
                   <Camera size={20} strokeWidth={2.5} />
                 </div>
                 <div className="text-left flex-1">
                   <p className="font-bold text-sm text-slate-900 dark:text-white">Change Profile Picture</p>
                   <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Upload a new photo</p>
                 </div>
                 <ChevronRight size={18} className="text-slate-300 dark:text-slate-600 group-hover:text-blue-400 transition-colors" />
               </button>
             </>
           ) : (
             <>
               <button 
                 onClick={onViewStatus} 
                 className="w-full p-3.5 rounded-xl hover:bg-purple-50 dark:hover:bg-purple-900/10 flex items-center gap-4 group transition-all duration-200 border border-transparent hover:border-purple-100 dark:hover:border-purple-900/30"
               >
                 <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 flex items-center justify-center group-hover:scale-105 transition-transform shadow-sm">
                   <Eye size={20} strokeWidth={2.5} />
                 </div>
                 <div className="text-left flex-1">
                   <p className="font-bold text-sm text-slate-900 dark:text-white">View Story</p>
                   <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">See recent updates</p>
                 </div>
                 <ChevronRight size={18} className="text-slate-300 dark:text-slate-600 group-hover:text-purple-400 transition-colors" />
               </button>
               
               <button 
                 onClick={onViewProfile} 
                 className="w-full p-3.5 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-900/10 flex items-center gap-4 group transition-all duration-200 border border-transparent hover:border-blue-100 dark:hover:border-blue-900/30"
               >
                 <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center group-hover:scale-105 transition-transform shadow-sm">
                   <ImageIcon size={20} strokeWidth={2.5} />
                 </div>
                 <div className="text-left flex-1">
                   <p className="font-bold text-sm text-slate-900 dark:text-white">View Profile Picture</p>
                   <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">See full size image</p>
                 </div>
                 <ChevronRight size={18} className="text-slate-300 dark:text-slate-600 group-hover:text-blue-400 transition-colors" />
               </button>
             </>
           )}
         </div>
      </div>
    </div>
  );
};

// --- STATUS UPLOAD MODAL ---
const StatusUploadModal = ({ isOpen, onClose, onUploadStatus }) => {
  const [mode, setMode] = useState('text'); // 'text' | 'image' | 'video'
  const [statusStep, setStatusStep] = useState('compose');
  const [textContent, setTextContent] = useState('');
  const [bgColor, setBgColor] = useState('bg-gradient-to-br from-purple-600 to-pink-500');
  
  // Media State
  const [mediaFile, setMediaFile] = useState(null);
  const [mediaPreview, setMediaPreview] = useState(null);
  
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (!isOpen) {
      setMode('text');
      setStatusStep('compose');
      setTextContent('');
      setBgColor('bg-gradient-to-br from-purple-600 to-pink-500');
      setMediaFile(null);
      setMediaPreview(null);
      setUploadProgress(0);
    }
  }, [isOpen]);

  const handleFileSelect = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      setMediaFile(file);
      setMediaPreview(URL.createObjectURL(file));
      setMode(type); // 'image' or 'video'
    }
  };

  const startUpload = () => {
    if ((mode === 'video' || mode === 'image') && !mediaFile) {
      fileInputRef.current?.click();
      return;
    }
    if (mode === 'text' && !textContent.trim()) return;

    setStatusStep('uploading');
    let progress = 0;
    const interval = setInterval(() => {
      progress += 5;
      setUploadProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setStatusStep('success');
          const duration = mode === 'video' ? 60 : 5; // Image/Text 5s, Video 60s
          onUploadStatus({
            id: Date.now(),
            type: mode,
            content: mode === 'text' ? textContent : mediaPreview,
            meta: mode === 'text' ? { color: bgColor, duration: 5 } : { duration },
            isSeen: false
          });
        }, 500);
      }
    }, 80);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[1100] flex items-center justify-center bg-black/90 backdrop-blur-xl animate-fade-in">
      <button onClick={onClose} className="absolute top-6 right-6 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white z-50"><X size={24} /></button>
      <div className="w-full h-full max-w-md md:h-[90vh] md:rounded-[32px] bg-slate-900 relative flex flex-col overflow-hidden border border-white/10 shadow-2xl">
        <div className="absolute top-0 left-0 right-0 p-4 z-20 flex justify-between items-center bg-gradient-to-b from-black/60 to-transparent">
          <h3 className="font-bold text-white text-lg drop-shadow-md">
            {statusStep === 'compose' ? 'New Status' : statusStep === 'uploading' ? 'Posting...' : 'Posted'}
          </h3>
        </div>
        <div className="flex-1 relative bg-slate-950 flex items-center justify-center">
          {statusStep === 'compose' && (
            <>
              {mode === 'text' && (
                <div className={`w-full h-full ${bgColor} flex items-center justify-center p-8 transition-colors duration-500`}>
                  <textarea value={textContent} onChange={(e) => setTextContent(e.target.value)} placeholder="Type a status..." className="w-full bg-transparent text-white text-4xl font-bold text-center outline-none resize-none placeholder-white/50 drop-shadow-md" maxLength={200} autoFocus />
                </div>
              )}
              {(mode === 'video' || mode === 'image') && (
                <div className="w-full h-full bg-black flex items-center justify-center relative">
                  {mediaPreview ? (
                    mode === 'video' ? 
                     <video src={mediaPreview} className="w-full h-full object-contain" controls autoPlay muted loop /> :
                     <img src={mediaPreview} alt="Preview" className="w-full h-full object-contain" />
                  ) : (
                    <div className="flex flex-col items-center justify-center gap-4 text-slate-500 cursor-pointer hover:text-slate-300 transition-colors" onClick={() => fileInputRef.current?.click()}>
                      <div className="w-20 h-20 rounded-full bg-slate-800 flex items-center justify-center">
                        {mode === 'video' ? <Video size={32} /> : <ImageIcon size={32} />}
                      </div>
                      <p className="font-medium">Tap to select {mode}</p>
                      <p className="text-xs bg-slate-800 px-2 py-1 rounded text-slate-400">
                        {mode === 'video' ? 'Max 60 seconds' : 'Photo'}
                      </p>
                    </div>
                  )}
                  {/* Hidden Input handles both based on mode */}
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    className="hidden" 
                    accept={mode === 'video' ? "video/*" : "image/*"} 
                    onChange={(e) => handleFileSelect(e, mode)} 
                  />
                </div>
              )}
            </>
          )}
          {statusStep === 'uploading' && (
            <div className="flex flex-col items-center gap-6 z-30">
               <div className="w-24 h-24 rounded-full border-4 border-slate-800 relative flex items-center justify-center">
                 <div className="absolute inset-0 rounded-full border-4 border-blue-500 border-t-transparent animate-spin"></div>
                 <span className="text-lg font-bold text-blue-500">{uploadProgress}%</span>
               </div>
               <p className="font-medium text-white animate-pulse">Sharing update...</p>
            </div>
          )}
          {statusStep === 'success' && (
            <div className="flex flex-col items-center gap-6 animate-pop-in z-30">
              <div className="w-20 h-20 rounded-full bg-green-500 flex items-center justify-center text-white shadow-lg shadow-green-500/30"><CheckCircle size={40} strokeWidth={3} /></div>
              <div className="text-center"><h4 className="text-2xl font-bold text-white mb-2">Sent!</h4><p className="text-slate-400">Your status is now visible.</p></div>
              <button onClick={onClose} className="mt-4 px-8 py-3 bg-white text-black rounded-full font-bold hover:scale-105 transition-transform">Close</button>
            </div>
          )}
        </div>
        {statusStep === 'compose' && (
          <div className="bg-slate-900 p-4 pb-6 border-t border-white/5 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              {mode === 'text' ? (
                <div className="flex gap-2 overflow-x-auto scrollbar-hide max-w-[200px] md:max-w-[300px] py-1">
                   {['bg-gradient-to-br from-purple-600 to-pink-500', 'bg-gradient-to-tr from-blue-500 to-cyan-400', 'bg-gradient-to-bl from-orange-500 to-red-500', 'bg-slate-800', 'bg-black', 'bg-gradient-to-r from-emerald-500 to-teal-600'].map(c => (
                      <button key={c} onClick={() => setBgColor(c)} className={`w-8 h-8 rounded-full ${c} border-2 ${bgColor === c ? 'border-white ring-2 ring-blue-500' : 'border-transparent'} flex-shrink-0 transition-all`} />
                    ))}
                </div>
              ) : (
                <button onClick={() => fileInputRef.current?.click()} className="text-xs font-bold text-blue-400 flex items-center gap-1"><RefreshCw size={12} /> Change File</button>
              )}
              <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-slate-500 bg-slate-800 px-3 py-1 rounded-full"><Clock size={12} /> {mode === 'text' ? '5s' : mode === 'image' ? '5s' : 'Up to 60s'}</div>
            </div>
            
            {/* Mode Switcher */}
            <div className="flex items-center gap-3">
              <div className="flex-1 bg-slate-800 rounded-full p-1 flex relative">
                <button onClick={() => setMode('text')} className={`flex-1 py-2.5 rounded-full text-xs font-bold flex items-center justify-center gap-2 transition-all z-10 ${mode === 'text' ? 'text-white' : 'text-slate-400 hover:text-slate-200'}`}><Type size={14} /> Text</button>
                <button onClick={() => setMode('image')} className={`flex-1 py-2.5 rounded-full text-xs font-bold flex items-center justify-center gap-2 transition-all z-10 ${mode === 'image' ? 'text-white' : 'text-slate-400 hover:text-slate-200'}`}><ImageIcon size={14} /> Image</button>
                <button onClick={() => setMode('video')} className={`flex-1 py-2.5 rounded-full text-xs font-bold flex items-center justify-center gap-2 transition-all z-10 ${mode === 'video' ? 'text-white' : 'text-slate-400 hover:text-slate-200'}`}><Video size={14} /> Video</button>
                
                {/* Sliding Background Logic */}
                <div className={`absolute top-1 bottom-1 w-[calc(33.33%-3px)] bg-slate-700 rounded-full transition-all duration-300 ${mode === 'text' ? 'left-1' : mode === 'image' ? 'left-[calc(33.33%+2px)]' : 'left-[calc(66.66%+2px)]'}`}></div>
              </div>
              <button onClick={startUpload} className="w-12 h-12 bg-blue-600 hover:bg-blue-500 text-white rounded-full flex items-center justify-center shadow-lg shadow-blue-600/20 transition-transform hover:scale-105 active:scale-95"><Send size={20} className="ml-0.5" /></button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const ChangeProfilePicModal = ({ isOpen, onClose, onUpdateProfilePic }) => {
  const [step, setStep] = useState('select');
  const [imageSrc, setImageSrc] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (!isOpen) {
      setStep('select');
      setImageSrc(null);
      setUploadProgress(0);
    }
  }, [isOpen]);

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageSrc(reader.result);
        setStep('preview');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = () => {
    setStep('uploading');
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setUploadProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setStep('success');
          onUpdateProfilePic(imageSrc);
        }, 500);
      }
    }, 150);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[1100] flex items-center justify-center bg-slate-950/80 backdrop-blur-xl animate-fade-in p-4">
      <div className="bg-white dark:bg-slate-900 rounded-3xl w-full max-w-sm shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden animate-pop-in flex flex-col max-h-[90vh]">
        <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center shrink-0">
          <h3 className="font-bold text-lg text-slate-900 dark:text-white">
            {step === 'select' ? 'Change Profile Photo' : step === 'preview' ? 'Preview' : 'Uploading'}
          </h3>
          {step !== 'uploading' && step !== 'success' && <button onClick={onClose} className="text-slate-500 hover:text-slate-900 dark:hover:text-white"><X size={20} /></button>}
        </div>
        <div className="p-6 flex flex-col items-center justify-center flex-1 overflow-y-auto">
          {step === 'select' && (
            <div className="w-full flex flex-col items-center animate-fade-in">
              <div className="w-32 h-32 rounded-full bg-slate-100 dark:bg-slate-800 border-2 border-dashed border-slate-300 dark:border-slate-700 flex items-center justify-center mb-6 cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-700/50 transition-colors group" onClick={() => fileInputRef.current.click()}>
                <Upload size={32} className="text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-colors" />
                <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileSelect} />
              </div>
              <button onClick={() => fileInputRef.current.click()} className="w-full py-3 rounded-xl bg-blue-600 text-white font-bold text-sm hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/20">Select from Device</button>
            </div>
          )}
          {step === 'preview' && imageSrc && (
            <div className="w-full flex flex-col items-center animate-fade-in">
              <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-white dark:border-slate-800 shadow-xl mb-8 relative">
                <img src={imageSrc} alt="Preview" className="w-full h-full object-cover" />
              </div>
              <div className="flex gap-3 w-full">
                <button onClick={() => { setStep('select'); setImageSrc(null); }} className="flex-1 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-sm hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">Back</button>
                <button onClick={handleUpload} className="flex-1 py-3 rounded-xl bg-blue-600 text-white font-bold text-sm hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2"><Upload size={16} /> Upload</button>
              </div>
            </div>
          )}
          {step === 'uploading' && (
            <div className="w-full flex flex-col items-center animate-fade-in py-6">
               <div className="w-24 h-24 rounded-full border-4 border-slate-100 dark:border-slate-800 mb-6 relative flex items-center justify-center">
                 <div className="absolute inset-0 rounded-full border-4 border-blue-500 border-t-transparent animate-spin"></div>
                 <span className="text-sm font-bold text-blue-500">{uploadProgress}%</span>
               </div>
               <p className="font-medium text-slate-900 dark:text-white mb-2">Updating...</p>
            </div>
          )}
          {step === 'success' && (
            <div className="flex flex-col items-center animate-pop-in w-full">
              <div className="w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center mb-4 text-green-500 border-4 border-green-50 dark:border-green-900/30"><CheckCircle size={40} strokeWidth={2.5} /></div>
              <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-1">Success!</h4>
              <div className="flex flex-col gap-3 w-full mt-6">
                 <button onClick={onClose} className="w-full py-3 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-sm hover:opacity-90 transition-opacity shadow-lg">Close</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

/* ==================================================================================================
 * 3. PROFILE VIEW COMPONENT
 * ================================================================================================== */

// Helper to draw status ring based on number of statuses
const StatusRing = ({ count, allSeen, layout }) => {
  if (count === 0) return null;
  
  // SVG Parameters
  const size = 100; 
  const strokeWidth = 4; 
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const center = size / 2;
  
  // Gap logic
  const gap = count > 1 ? 6 : 0;
  const segmentLength = (circumference - (count * gap)) / count;
  
  // UNIQUE ID for gradient based on layout + seen state
  const gradientId = `${layout}-status-gradient-${allSeen ? 'seen' : 'unseen'}`;

  return (
    <svg 
      viewBox={`0 0 ${size} ${size}`} 
      className="absolute inset-0 w-full h-full rotate-[-90deg] pointer-events-none"
      style={{ transform: 'rotate(-90deg)' }}
    >
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="100%" x2="100%" y2="0%">
          {allSeen ? (
            <>
             <stop offset="0%" stopColor="#94a3b8" /> 
             <stop offset="100%" stopColor="#64748b" /> 
            </>
          ) : (
            <>
             <stop offset="0%" stopColor="#f09433" /> 
             <stop offset="25%" stopColor="#e6683c" /> 
             <stop offset="50%" stopColor="#dc2743" /> 
             <stop offset="75%" stopColor="#cc2366" /> 
             <stop offset="100%" stopColor="#bc1888" /> 
            </>
          )}
        </linearGradient>
      </defs>
      {Array.from({ length: count }).map((_, index) => {
        const dashOffset = -(segmentLength + gap) * index;
        return (
          <circle
            key={index}
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke={`url(#${gradientId})`}
            strokeWidth={strokeWidth}
            strokeDasharray={count > 1 ? `${segmentLength} ${circumference - segmentLength}` : circumference}
            strokeDashoffset={count > 1 ? dashOffset : 0}
            strokeLinecap="round"
          />
        );
      })}
    </svg>
  );
};

const ProfileView = ({ userId, onViewImage, onOpenChangePic, onOpenStatus, onOpenStatusViewer, onOpenActionSheet, profileData, layout }) => {
  const [activeTab, setActiveTab] = useState('posts');
  
  const displayProfile = profileData || MY_PROFILE_DATA;
  const statuses = displayProfile.statuses || [];
  const statusCount = statuses.length;
  const hasUnseen = statuses.some(s => !s.isSeen);

  // Unified Click Handler for Avatar
  const handleAvatarClick = () => {
    if (statusCount > 0) {
        if (hasUnseen) {
            const firstUnseenIndex = statuses.findIndex(s => !s.isSeen);
            onOpenStatusViewer(firstUnseenIndex);
        } else {
            onOpenActionSheet();
        }
    } else {
        onViewImage(displayProfile.avatar);
    }
  };

  const TabButton = ({ id, label, icon: Icon }) => (
    <button 
      onClick={() => setActiveTab(id)}
      className={`flex-1 flex items-center justify-center gap-2 py-4 text-sm font-medium border-b-2 transition-all ${
        activeTab === id 
          ? 'border-slate-900 dark:border-white text-slate-900 dark:text-white' 
          : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
      }`}
    >
      {Icon && <Icon size={18} />}
      <span className="hidden sm:inline">{label}</span>
    </button>
  );

  return (
    <div className="w-full max-w-[1200px] mx-auto pb-20 animate-fade-in">
      
      <div className="relative mb-4 md:mb-8 pt-4 md:pt-8">
        <div className="px-4 md:px-8">
          <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-4 md:gap-8 items-start relative z-10">
            
            {/* Avatar Area */}
            <div className="relative group flex-shrink-0 md:row-span-3">
              
              {/* Status Ring Container - Dynamic padding logic */}
              <div className={`w-24 h-24 md:w-36 md:h-36 relative rounded-full transition-all duration-300 ${statusCount > 0 ? 'p-2' : 'p-0'}`}>
                
                {/* Render Dynamic Ring if statuses exist */}
                {statusCount > 0 && <StatusRing count={statusCount} allSeen={!hasUnseen} layout={layout} />}

                <div 
                  className="w-full h-full rounded-full border-4 border-white dark:border-slate-950 overflow-hidden bg-white dark:bg-slate-900 shadow-lg cursor-pointer group-hover:opacity-90 transition-all relative z-10"
                  onClick={handleAvatarClick}
                >
                  <img src={displayProfile.avatar} alt="Profile" className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                </div>
              </div>
              
              {displayProfile.isCurrentUser && (
                <div className="absolute bottom-1 right-1 md:bottom-2 md:right-2 z-30">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      // Trigger the action sheet in "edit" mode
                      onOpenActionSheet(true); 
                    }}
                    className={`bg-blue-500 text-white p-1.5 md:p-2 rounded-full border-2 border-white dark:border-slate-950 shadow-sm transition-all hover:bg-blue-600 active:scale-95`}
                  >
                    <Plus size={16} strokeWidth={3} />
                  </button>
                </div>
              )}
            </div>

            {/* Header Info */}
            <div className="min-w-0 md:mt-2">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 md:gap-4">
                <div>
                  <h2 className="text-xl md:text-3xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    {displayProfile.name}
                    {displayProfile.isPrivate && <Lock size={18} className="text-slate-400" />}
                    {displayProfile.isCurrentUser && <span className="text-blue-500"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg></span>}
                  </h2>
                  <p className="text-xs md:text-base text-slate-500 dark:text-slate-400 font-medium">{displayProfile.handle}</p>
                </div>
                
                <div className="flex items-center gap-2 md:gap-3">
                  {displayProfile.isCurrentUser ? (
                    <>
                      <button className="px-3 md:px-6 py-1.5 md:py-2 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white rounded-lg md:rounded-xl font-bold text-xs md:text-sm hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors border border-slate-200 dark:border-slate-700">Edit</button>
                      <button className="px-3 md:px-6 py-1.5 md:py-2 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white rounded-lg md:rounded-xl font-bold text-xs md:text-sm hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors border border-slate-200 dark:border-slate-700">Share</button>
                      <button className="p-1.5 md:p-2 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white rounded-lg md:rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors border border-slate-200 dark:border-slate-700"><Settings size={18} className="md:w-5 md:h-5" /></button>
                    </>
                  ) : null}
                </div>
              </div>
            </div>

            {/* Stats (Static) */}
            <div className="col-span-2 md:col-span-1 flex items-center gap-6 md:gap-10">
              <div className="flex items-baseline gap-1">
                <span className="font-bold text-slate-900 dark:text-white text-lg">{displayProfile.posts_count}</span>
                <span className="text-slate-500 text-sm">posts</span>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="font-bold text-slate-900 dark:text-white text-lg">{displayProfile.followers}</span>
                <span className="text-slate-500 text-sm">followers</span>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="font-bold text-slate-900 dark:text-white text-lg">{displayProfile.following}</span>
                <span className="text-slate-500 text-sm">following</span>
              </div>
            </div>

            {/* Bio & Details */}
            <div className="col-span-2 md:col-span-1 max-w-2xl">
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm md:text-base">{displayProfile.bio}</p>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-4 text-xs md:text-sm text-slate-500 dark:text-slate-400">
                <div className="flex items-center gap-1.5"><MapPin size={16} /> {displayProfile.location}</div>
                <div className="flex items-center gap-1.5 hover:text-blue-500 cursor-pointer transition-colors"><Link2 size={16} /> {displayProfile.website}</div>
                <div className="flex items-center gap-1.5"><Calendar size={16} /> Joined {displayProfile.joined}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="sticky top-0 bg-slate-50/95 dark:bg-slate-950/95 backdrop-blur-sm z-20 border-b border-slate-200 dark:border-slate-800 px-4 md:px-8 mb-4">
        <div className="flex items-center max-w-md">
          {['posts', 'media', 'tagged'].map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} className={`flex-1 flex items-center justify-center gap-2 py-4 text-sm font-medium border-b-2 transition-all capitalize ${activeTab === tab ? 'border-slate-900 dark:border-white text-slate-900 dark:text-white' : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}>
              {tab === 'posts' ? <Grid3X3 size={18} /> : tab === 'media' ? <ImageIcon size={18} /> : <Tag size={18} />}
              <span className="hidden sm:inline">{tab}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Content Grid */}
      <div className="px-1 md:px-8">
        {activeTab === 'posts' ? (
          <div className="grid grid-cols-3 gap-0.5 md:gap-4 lg:gap-6">
            {displayProfile.posts.map((post) => (
              <div key={post.id} className="relative group aspect-square bg-slate-200 dark:bg-slate-800 overflow-hidden md:rounded-xl">
                <img src={post.image} alt="Post" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="flex items-center gap-6 text-white font-bold">
                    <div className="flex items-center gap-2"><Heart className="fill-white" size={20} /> {post.likes}</div>
                    <div className="flex items-center gap-2"><MessageSquare className="fill-white" size={20} /> {post.comments}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-slate-400">
            <div className="w-20 h-20 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-4">{activeTab === 'media' ? <ImageIcon size={32} /> : <Tag size={32} />}</div>
            <h3 className="font-bold text-lg text-slate-900 dark:text-white">No {activeTab} yet</h3>
          </div>
        )}
      </div>
    </div>
  );
};

/* ==================================================================================================
 * 4. CONTENT AREA
 * ================================================================================================== */

const ContentArea = ({ activeTab, onViewImage, onOpenChangePic, onOpenStatus, onOpenStatusViewer, onOpenActionSheet, profileData, hasStatus, layout }) => {
  return (
    <div className="flex-1 overflow-y-auto overflow-x-hidden scroll-smooth relative h-full">
      <ProfileView 
        userId="me" 
        onViewImage={onViewImage} 
        onOpenChangePic={onOpenChangePic} 
        onOpenStatus={onOpenStatus}
        onOpenStatusViewer={onOpenStatusViewer}
        onOpenActionSheet={onOpenActionSheet}
        profileData={profileData}
        hasStatus={hasStatus}
        layout={layout}
      />
    </div>
  );
}

/* ==================================================================================================
 * 5. LAYOUT COMPONENTS & MAIN
 * ================================================================================================== */
const MobileLayout = ({ navStack, activeTab, handleNavClick, sharedState, profileData, hasStatus }) => {
  const MobileNavItem = ({ item }) => {
    if (!item) return null;
    const isActive = navStack[0] === item.id;
    return (
      <button onClick={() => handleNavClick(item.id)} className={`flex flex-col items-center justify-center w-full h-full gap-1 transition-all duration-200 ${isActive ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400 dark:text-slate-500'} `}>
        <item.icon size={24} strokeWidth={isActive ? 2.5 : 2} className={`transition-transform duration-200 ${isActive ? '-translate-y-1' : ''}`} />
        <span className="text-[9px] font-medium">{item.label}</span>
      </button>
    );
  };

  return (
    <div className="flex flex-col h-full w-full md:hidden">
      <header className="h-14 flex-none px-4 flex items-center justify-between border-b border-slate-200/50 dark:border-slate-800/50 bg-white/50 dark:bg-slate-950/50 backdrop-blur-md sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white"><span className="font-bold text-sm">S</span></div>
          <span className="font-bold text-lg">SocialApp</span>
        </div>
      </header>
      {/* Pass layout prop 'mobile' */}
      <ContentArea 
        activeTab={activeTab} 
        onViewImage={sharedState.handleImageClick} 
        onOpenChangePic={sharedState.handleOpenChangePic}
        onOpenStatus={sharedState.handleOpenStatus}
        onOpenStatusViewer={sharedState.handleOpenStatusViewer}
        onOpenActionSheet={sharedState.handleOpenActionSheet}
        profileData={profileData}
        hasStatus={hasStatus}
        layout="mobile"
      />
      
      <div className={`fixed bottom-0 left-0 right-0 h-16 border-t flex items-center justify-around px-2 z-50 pb-safe transition-all duration-300 bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800`}>
        <div className="z-30 flex items-center justify-center w-full"><MobileNavItem item={NAV_ITEMS[0]} /></div>
      </div>
    </div>
  );
};

const DesktopLayout = ({ navStack, activeTab, handleNavClick, sharedState, profileData, hasStatus }) => {
  const { isUserMenuOpen, setIsUserMenuOpen, isDark, toggleTheme, handleSettingsClick } = sharedState;
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
  const sidebarMenuRef = useRef(null);

  useEffect(() => {
    const handleResize = () => setSidebarCollapsed(window.innerWidth < 1280);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isUserMenuOpen && sidebarMenuRef.current && !sidebarMenuRef.current.contains(event.target)) setIsUserMenuOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isUserMenuOpen, setIsUserMenuOpen]);

  const DesktopSidebarLink = ({ item }) => (
    <button onClick={() => handleNavClick(item.id)} className={`flex items-center gap-4 px-4 py-3.5 rounded-xl w-full transition-all duration-300 group relative overflow-hidden ${navStack[0] === item.id ? 'bg-slate-900 text-white shadow-lg shadow-slate-900/20 dark:bg-white dark:text-slate-900' : 'text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'} ${isSidebarCollapsed ? 'justify-center' : 'justify-start'}`}>
      <item.icon size={22} className="transition-transform duration-300 group-hover:scale-110 flex-shrink-0" strokeWidth={navStack[0] === item.id ? 2.5 : 2} />
      <span className={`font-medium text-[15px] whitespace-nowrap transition-all duration-300 ${isSidebarCollapsed ? 'hidden' : 'block'}`}>{item.label}</span>
    </button>
  );

  return (
    <div className="hidden md:flex h-full w-full">
      <aside className={`flex-none flex flex-col border-r border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl z-30 transition-all duration-500 ease-[cubic-bezier(0.25,0.8,0.25,1)] ${isSidebarCollapsed ? 'w-[88px] px-3' : 'w-[280px] px-6'}`}>
        <div className={`h-24 flex items-center ${isSidebarCollapsed ? 'justify-center' : 'justify-start'}`}>
          <div className="w-10 h-10 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-500/20 flex-shrink-0 cursor-pointer hover:scale-105 transition-transform" onClick={() => setSidebarCollapsed(!isSidebarCollapsed)}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-6 h-6"><path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /><path d="M9 10a.5.5 0 00-1 0V9a.5.5 0 00-1 0v3a5 5 0 005 5h1a.5.5 0 000-1H12a4 4 0 01-4-4v-1a.5.5 0 00-1 0v1a.5.5 0 001 0v-1z" /></svg>
          </div>
          <span className={`ml-3 font-bold text-xl tracking-tight transition-opacity duration-300 ${isSidebarCollapsed ? 'hidden' : 'block'}`}>SocialApp</span>
        </div>
        <nav className="flex-1 space-y-2 py-4 overflow-y-auto scrollbar-hide">
          {NAV_ITEMS.map((item) => <DesktopSidebarLink key={item.id} item={item} />)}
        </nav>
        <div className="pb-8 space-y-4">
          <div className="relative" ref={sidebarMenuRef}>
            <button onClick={() => setIsUserMenuOpen(!isUserMenuOpen)} className={`w-full rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 transition-all duration-300 flex items-center cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-800/80 ${isSidebarCollapsed ? 'p-2 justify-center' : 'p-3 justify-start'}`}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 flex-shrink-0"></div>
                <div className={`overflow-hidden text-left transition-all duration-300 ${isSidebarCollapsed ? 'hidden' : 'block'}`}>
                  <p className="font-bold text-sm truncate">Jane Doe</p>
                  <p className="text-xs text-slate-500 truncate">@jane_design</p>
                </div>
              </div>
            </button>
            <UserMenuPopup isOpen={isUserMenuOpen} isDark={isDark} toggleTheme={toggleTheme} positionClass="bottom-full left-0 mb-4" onNavigate={handleSettingsClick} />
          </div>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 flex-none px-8 flex items-center justify-between border-b border-slate-200/50 dark:border-slate-800/50 bg-white/50 dark:bg-slate-950/50 backdrop-blur-md sticky top-0 z-20">
          <div className="flex items-center gap-4 w-full max-w-md">
            <h1 className="text-xl font-bold capitalize text-slate-900 dark:text-white mr-8">Profile</h1>
          </div>
        </header>
        {/* Pass layout prop 'desktop' */}
        <ContentArea 
          activeTab={activeTab} 
          onViewImage={sharedState.handleImageClick} 
          onOpenChangePic={sharedState.handleOpenChangePic}
          onOpenStatus={sharedState.handleOpenStatus}
          onOpenStatusViewer={sharedState.handleOpenStatusViewer}
          onOpenActionSheet={sharedState.handleOpenActionSheet}
          profileData={profileData}
          hasStatus={hasStatus}
          layout="desktop"
        />
      </div>
    </div>
  );
};

export default function SocialLayout() {
  const [activeTab, setActiveTab] = useState('profile');
  const [navStack, setNavStack] = useState(['profile']);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  // GLOBAL STATE
  const [lightboxImage, setLightboxImage] = useState(null);
  const [changePicOpen, setChangePicOpen] = useState(false);
  const [statusUploadOpen, setStatusUploadOpen] = useState(false);
  const [statusViewerOpen, setStatusViewerOpen] = useState(false);
  const [statusViewerStartIndex, setStatusViewerStartIndex] = useState(0);
  const [actionSheetOpen, setActionSheetOpen] = useState(false);
  const [actionSheetMode, setActionSheetMode] = useState('view'); // 'view' or 'edit'
  
  const [profileData, setProfileData] = useState(MY_PROFILE_DATA);
  const [hasStatus, setHasStatus] = useState(false);

  useEffect(() => {
    if (isDarkMode) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [isDarkMode]);

  const handleNavClick = (id) => {
    if (id === activeTab && navStack.length === 1) return;
    setNavStack([id]);
    setActiveTab(id);
  };

  const handleBack = () => {
    if (navStack.length > 1) {
      const newStack = [...navStack];
      newStack.pop();
      setNavStack(newStack);
      setActiveTab(newStack[newStack.length - 1]);
    }
  };

  const handleSettingsClick = (id) => {
     setIsUserMenuOpen(false);
  };
  
  const handleUpdateProfilePic = (newImageUrl) => {
    setProfileData(prev => ({ ...prev, avatar: newImageUrl }));
    setChangePicOpen(false);
  };

  const handleUploadStatus = (statusData) => {
    setProfileData(prev => ({
        ...prev,
        statuses: [...(prev.statuses || []), statusData]
    }));
    setHasStatus(true);
    setStatusUploadOpen(false);
  };

  const handleMarkStatusSeen = (statusId) => {
    setProfileData(prev => ({
      ...prev,
      statuses: prev.statuses.map(s => s.id === statusId ? { ...s, isSeen: true } : s)
    }));
  };

  const sharedState = {
    isUserMenuOpen, 
    setIsUserMenuOpen, 
    isDark: isDarkMode, 
    toggleTheme: () => setIsDarkMode(!isDarkMode),
    handleSettingsClick,
    handleImageClick: (src) => setLightboxImage(src),
    handleOpenChangePic: () => setChangePicOpen(true),
    handleOpenStatus: () => setStatusUploadOpen(true),
    handleOpenStatusViewer: (index) => {
        setStatusViewerStartIndex(index);
        setStatusViewerOpen(true);
        setActionSheetOpen(false);
    },
    // Combined handler for opening action sheet
    handleOpenActionSheet: (isEditMode = false) => {
      setActionSheetMode(isEditMode ? 'edit' : 'view');
      setActionSheetOpen(true);
    }
  };

  return (
    <div className="flex h-screen w-full bg-slate-50 dark:bg-slate-950 font-sans text-slate-900 dark:text-white overflow-hidden selection:bg-blue-100 selection:text-blue-900">
      
      {/* Modals rendered at root */}
      <AvatarModal 
        src={lightboxImage} 
        isOpen={!!lightboxImage} 
        onClose={() => setLightboxImage(null)} 
      />
      
      <ChangeProfilePicModal 
        isOpen={changePicOpen} 
        onClose={() => setChangePicOpen(false)}
        onUpdateProfilePic={handleUpdateProfilePic}
      />

      <StatusUploadModal 
        isOpen={statusUploadOpen} 
        onClose={() => setStatusUploadOpen(false)}
        onUploadStatus={handleUploadStatus}
      />
      
      <StatusViewerModal 
        isOpen={statusViewerOpen}
        onClose={() => setStatusViewerOpen(false)}
        statuses={profileData.statuses}
        initialIndex={statusViewerStartIndex}
        onMarkSeen={handleMarkStatusSeen}
      />
      
      <AvatarActionModal 
        isOpen={actionSheetOpen}
        mode={actionSheetMode}
        onClose={() => setActionSheetOpen(false)}
        // View Actions
        onViewProfile={() => { setActionSheetOpen(false); setLightboxImage(profileData.avatar); }}
        onViewStatus={() => { setActionSheetOpen(false); setStatusViewerStartIndex(0); setStatusViewerOpen(true); }}
        // Edit Actions
        onChangePic={() => { setActionSheetOpen(false); setChangePicOpen(true); }}
        onUploadStatus={() => { setActionSheetOpen(false); setStatusUploadOpen(true); }}
      />

      <MobileLayout 
        navStack={navStack} 
        activeTab={activeTab} 
        handleBack={handleBack} 
        handleNavClick={handleNavClick} 
        sharedState={sharedState}
        profileData={profileData}
        hasStatus={hasStatus}
      />
      <DesktopLayout 
        navStack={navStack} 
        activeTab={activeTab} 
        handleBack={handleBack} 
        handleNavClick={handleNavClick} 
        sharedState={sharedState} 
        profileData={profileData}
        hasStatus={hasStatus}
      />
      
      <style>{`
        @keyframes fade-in { 0% { opacity: 0; } 100% { opacity: 1; } }
        .animate-fade-in { animation: fade-in 0.2s ease-out forwards; }
        @keyframes pop-in-center {
          0% { transform: scale(0.9); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
        .animate-pop-in { animation: pop-in-center 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .pb-safe { padding-bottom: env(safe-area-inset-bottom); }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}
