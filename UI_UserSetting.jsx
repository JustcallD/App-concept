import React, { useState, useEffect, useRef } from 'react';
import { 
  Home, Compass, MessageCircle, Film, User, Construction, Bell, 
  Plus, Settings, LogOut, Moon, Sun, Phone, LayoutGrid, Heart, 
  MessageSquare, UserPlus, ArrowLeft, MoreHorizontal, Grid, Tag,
  ChevronRight, Shield, HelpCircle, UserCheck, Globe, Lock, EyeOff,
  UserX, Download, FileText, Smartphone, CreditCard, Clock, 
  Activity, Volume2, Eye, Languages, Accessibility, Megaphone,
  Share2, Key, Mail, Fingerprint, Laptop, AlertTriangle, Bookmark,
  FolderPlus, Folder, Image as ImageIcon, X, Check, Archive, Calendar,
  RotateCcw, Play, Search, ThumbsUp, BarChart2, BellOff, Timer,
  ToggleLeft, ToggleRight
} from 'lucide-react';

/* ==================================================================================================
 * CONFIGURATION & DATA
 * ================================================================================================== */

const NAV_ITEMS = [
  { id: 'feed', label: 'Feed', icon: Home, color: 'text-blue-500', bg: 'bg-blue-500' },
  { id: 'explore', label: 'Explore', icon: Compass, color: 'text-purple-500', bg: 'bg-purple-500' },
  { id: 'chats', label: 'Chats', icon: MessageCircle, color: 'text-green-500', bg: 'bg-green-500' },
  { id: 'connections', label: 'Connections', icon: UserPlus, color: 'text-pink-500', bg: 'bg-pink-500' },
  { id: 'calls', label: 'Calls', icon: Phone, color: 'text-orange-500', bg: 'bg-orange-500' },
  { id: 'reels', label: 'Reels', icon: Film, color: 'text-rose-500', bg: 'bg-rose-500' },
  { id: 'profile', label: 'Profile', icon: User, color: 'text-indigo-500', bg: 'bg-indigo-500' },
];

const EXTRA_PAGES = [
  { id: 'notifications', label: 'Notifications', icon: Bell, color: 'text-red-500', bg: 'bg-red-500' },
  { id: 'settings', label: 'Settings', icon: Settings, color: 'text-slate-500', bg: 'bg-slate-500' },
  { id: 'account-centre', label: 'Account Centre', icon: Shield, color: 'text-blue-600', bg: 'bg-blue-600' },
  { id: 'saved', label: 'Saved', icon: Bookmark, color: 'text-indigo-600', bg: 'bg-indigo-600' },
  { id: 'liked', label: 'Likes', icon: Heart, color: 'text-rose-600', bg: 'bg-rose-600' },
  { id: 'archive', label: 'Archive', icon: Archive, color: 'text-emerald-600', bg: 'bg-emerald-600' },
  { id: 'time-spent', label: 'Time Spent', icon: Clock, color: 'text-orange-600', bg: 'bg-orange-600' },
  { id: 'activity-log', label: 'Activity Log', icon: Activity, color: 'text-blue-500', bg: 'bg-blue-500' },
  { id: 'post-detail', label: 'Post Detail', icon: MessageSquare, color: 'text-slate-500', bg: 'bg-slate-500' },
];

const NOTIFICATIONS = [
  { id: 1, type: 'like', user: 'Sarah Wilson', text: 'liked your post.', time: '2m ago', read: false },
  { id: 2, type: 'comment', user: 'Mike Chen', text: 'commented: "Amazing shot! 📸"', time: '15m ago', read: false },
  { id: 3, type: 'follow', user: 'Alex Morgan', text: 'started following you.', time: '1h ago', read: true },
];

const MOCK_IMAGES = [
  'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1515965885039-183837af4627?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1526779218020-60a10edcc71c?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1481349518771-20055b2a7b24?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop',
];

/* ==================================================================================================
 * SPECIFIC VIEW COMPONENTS
 * ================================================================================================== */

const TimeSpentView = () => {
  const [selectedDay, setSelectedDay] = useState(3); // Default to Thursday (index 3)
  const [isNotificationsMuted, setIsNotificationsMuted] = useState(false);
  const [hasTimeLimit, setHasTimeLimit] = useState(false);

  const weeklyData = [
    { id: 0, day: 'M', fullDay: 'Monday', value: 45, label: '45m' },
    { id: 1, day: 'T', fullDay: 'Tuesday', value: 60, label: '1h' },
    { id: 2, day: 'W', fullDay: 'Wednesday', value: 30, label: '30m' },
    { id: 3, day: 'T', fullDay: 'Thursday', value: 95, label: '1h 35m' },
    { id: 4, day: 'F', fullDay: 'Friday', value: 50, label: '50m' },
    { id: 5, day: 'S', fullDay: 'Saturday', value: 120, label: '2h' },
    { id: 6, day: 'S', fullDay: 'Sunday', value: 80, label: '1h 20m' },
  ];

  const averageMinutes = Math.round(weeklyData.reduce((acc, curr) => acc + curr.value, 0) / 7);
  const hours = Math.floor(averageMinutes / 60);
  const mins = averageMinutes % 60;

  return (
    <div className="max-w-2xl mx-auto w-full pb-20 pt-4 px-4 animate-fade-in">
      <div className="text-center mb-8">
        <p className="text-slate-500 dark:text-slate-400 text-sm font-medium uppercase tracking-wider mb-1">Daily Average</p>
        <h2 className="text-4xl font-extrabold text-slate-900 dark:text-white">{hours}h {mins}m</h2>
        <p className="text-green-500 text-xs font-bold mt-2 flex items-center justify-center gap-1">
          <ArrowLeft size={12} className="rotate-90" /> 12% down from last week
        </p>
      </div>

      {/* Interactive Chart */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-100 dark:border-slate-800 shadow-sm mb-8">
        <div className="flex justify-between items-center mb-4">
            <span className="text-xs font-bold text-slate-400">Time on App</span>
            <span className="text-xs font-bold text-blue-500 bg-blue-50 dark:bg-blue-900/20 px-2 py-1 rounded-full">Last 7 Days</span>
        </div>
        <div className="h-48 flex items-end justify-between gap-2 md:gap-4 touch-none">
           {weeklyData.map((data, i) => {
             const isActive = selectedDay === i;
             return (
               <div 
                 key={i} 
                 onClick={() => setSelectedDay(i)}
                 className="flex flex-col items-center gap-2 flex-1 group cursor-pointer"
               >
                  <div className="relative w-full flex justify-center h-full items-end">
                     {/* Tooltip */}
                     <div className={`absolute -top-10 transition-all duration-300 ${isActive ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-2 group-hover:translate-y-0 group-hover:opacity-100 pointer-events-none'}`}>
                        <div className="bg-slate-800 dark:bg-white text-white dark:text-slate-900 text-[10px] font-bold py-1.5 px-2.5 rounded-lg shadow-xl whitespace-nowrap">
                           {data.label}
                        </div>
                        <div className="w-2 h-2 bg-slate-800 dark:bg-white rotate-45 absolute left-1/2 -translate-x-1/2 -bottom-1"></div>
                     </div>
                     
                     {/* Bar */}
                     <div 
                       style={{ height: `${(data.value / 120) * 100}%` }}
                       className={`w-full max-w-[30px] rounded-t-lg transition-all duration-500 relative overflow-hidden ${isActive ? 'bg-blue-500 shadow-lg shadow-blue-500/30' : 'bg-slate-100 dark:bg-slate-800 group-hover:bg-blue-200 dark:group-hover:bg-slate-700'}`}
                     >
                        {/* Selected Indicator Dot */}
                        {isActive && <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-white/50 rounded-full"></div>}
                     </div>
                  </div>
                  <span className={`text-xs font-bold transition-colors ${isActive ? 'text-blue-500' : 'text-slate-400'}`}>{data.day}</span>
               </div>
             );
           })}
        </div>
        <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 text-center">
            <p className="text-sm font-medium text-slate-600 dark:text-slate-300">
                You spent <span className="text-blue-500 font-bold">{weeklyData[selectedDay].label}</span> on <span className="text-slate-900 dark:text-white font-bold">{weeklyData[selectedDay].fullDay}</span>.
            </p>
        </div>
      </div>

      {/* Tools */}
      <h3 className="text-slate-900 dark:text-white font-bold text-lg mb-4 px-2">Manage Your Time</h3>
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 overflow-hidden">
         <button 
            onClick={() => setIsNotificationsMuted(!isNotificationsMuted)}
            className="w-full flex items-center justify-between p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors border-b border-slate-100 dark:border-slate-800 text-left"
         >
           <div className="flex items-center gap-4">
             <div className={`p-2 rounded-full transition-colors ${isNotificationsMuted ? 'bg-slate-200 text-slate-500 dark:bg-slate-800 dark:text-slate-400' : 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'}`}>
               <BellOff size={20} />
             </div>
             <div>
               <span className="block text-sm font-bold text-slate-900 dark:text-white">Mute Notifications</span>
               <span className="block text-xs text-slate-500">{isNotificationsMuted ? 'Notifications muted' : 'Tap to mute push notifications'}</span>
             </div>
           </div>
           {isNotificationsMuted ? <ToggleRight size={28} className="text-blue-500 fill-current" /> : <ToggleLeft size={28} className="text-slate-300" />}
         </button>
         
         <button 
            onClick={() => setHasTimeLimit(!hasTimeLimit)}
            className="w-full flex items-center justify-between p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors text-left"
         >
           <div className="flex items-center gap-4">
             <div className={`p-2 rounded-full transition-colors ${hasTimeLimit ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'}`}>
               <Timer size={20} />
             </div>
             <div>
               <span className="block text-sm font-bold text-slate-900 dark:text-white">Daily Time Limit</span>
               <span className="block text-xs text-slate-500">{hasTimeLimit ? 'Reminder set for 1h 30m' : 'Set a reminder to take a break'}</span>
             </div>
           </div>
           {hasTimeLimit ? <Check size={20} className="text-blue-500" /> : <ChevronRight size={20} className="text-slate-300 dark:text-slate-600" />}
         </button>
      </div>
    </div>
  );
};

const ActivityLogView = () => {
  const [activeFilter, setActiveFilter] = useState('All');

  // Comprehensive Demo Data
  const ALL_ACTIVITIES = [
    { 
      id: 1, 
      section: 'Today', 
      type: 'Likes',
      text: <span>You liked <span className="font-bold">sarah_w</span>'s post.</span>, 
      time: '2h ago', 
      icon: Heart, 
      color: 'text-rose-500', 
      bg: 'bg-rose-100 dark:bg-rose-900/20', 
      image: MOCK_IMAGES[0] 
    },
    { 
      id: 2, 
      section: 'Today', 
      type: 'Comments',
      text: <span>You commented on <span className="font-bold">design_daily</span>: "Great colors!"</span>, 
      time: '5h ago', 
      icon: MessageCircle, 
      color: 'text-blue-500', 
      bg: 'bg-blue-100 dark:bg-blue-900/20', 
      image: MOCK_IMAGES[2] 
    },
    { 
      id: 3, 
      section: 'Today', 
      type: 'Search', // Mapped to 'History' filter implicitly or 'All'
      text: <span>You searched for <span className="font-bold">minimalism</span></span>, 
      time: '8h ago', 
      icon: Search, 
      color: 'text-slate-500', 
      bg: 'bg-slate-100 dark:bg-slate-800', 
      image: null 
    },
    { 
      id: 4, 
      section: 'Yesterday', 
      type: 'Follows',
      text: <span>You started following <span className="font-bold">alex_art</span>.</span>, 
      time: 'Yesterday', 
      icon: UserPlus, 
      color: 'text-purple-500', 
      bg: 'bg-purple-100 dark:bg-purple-900/20', 
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex" 
    },
    { 
      id: 5, 
      section: 'Yesterday', 
      type: 'Likes',
      text: <span>You liked <span className="font-bold">mike_chen</span>'s reel.</span>, 
      time: 'Yesterday', 
      icon: Heart, 
      color: 'text-rose-500', 
      bg: 'bg-rose-100 dark:bg-rose-900/20', 
      image: MOCK_IMAGES[4] 
    },
    { 
      id: 6, 
      section: 'This Week', 
      type: 'Comments',
      text: <span>You commented on <span className="font-bold">travel_diary</span>: "Where is this?"</span>, 
      time: 'Mon', 
      icon: MessageCircle, 
      color: 'text-blue-500', 
      bg: 'bg-blue-100 dark:bg-blue-900/20', 
      image: MOCK_IMAGES[1] 
    },
    { 
      id: 7, 
      section: 'This Week', 
      type: 'Likes',
      text: <span>You liked 5 posts from <span className="font-bold">nature_geo</span>.</span>, 
      time: 'Sun', 
      icon: Heart, 
      color: 'text-rose-500', 
      bg: 'bg-rose-100 dark:bg-rose-900/20', 
      image: null 
    }
  ];

  // Filtering Logic
  const filteredActivities = activeFilter === 'All' 
    ? ALL_ACTIVITIES 
    : ALL_ACTIVITIES.filter(item => item.type === activeFilter || (activeFilter === 'Interactions' && ['Likes', 'Comments'].includes(item.type)));

  // Grouping Logic
  const groupedActivities = filteredActivities.reduce((groups, item) => {
    const group = groups[item.section] || [];
    group.push(item);
    groups[item.section] = group;
    return groups;
  }, {});

  const ActivityItem = ({ icon: Icon, color, bg, text, time, image }) => (
    <div className="flex items-start gap-3 py-3 animate-fade-in">
       <div className={`mt-1 w-8 h-8 rounded-full ${bg} ${color} flex items-center justify-center flex-shrink-0`}>
          <Icon size={14} fill="currentColor" className="opacity-90" />
       </div>
       <div className="flex-1 min-w-0">
         <p className="text-sm text-slate-900 dark:text-white leading-snug">
           {text}
         </p>
         <p className="text-xs text-slate-500 mt-1">{time}</p>
       </div>
       {image && (
         <div className="w-10 h-10 rounded-lg overflow-hidden bg-slate-200 dark:bg-slate-800 flex-shrink-0 border border-slate-100 dark:border-slate-700">
            <img src={image} className="w-full h-full object-cover" alt="activity context" />
         </div>
       )}
    </div>
  );

  const FILTERS = ['All', 'Likes', 'Comments', 'Follows', 'Search'];

  return (
    <div className="max-w-2xl mx-auto w-full pb-20 pt-4 px-4 animate-fade-in">
       <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Activity Log</h2>
        <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
          View and manage your interactions.
        </p>
      </div>

      {/* Filter Chips */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2 scrollbar-hide">
         {FILTERS.map((filter, i) => (
           <button 
             key={i} 
             onClick={() => setActiveFilter(filter)}
             className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-200 ${activeFilter === filter ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-md transform scale-105' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'}`}
           >
             {filter}
           </button>
         ))}
      </div>

      <div className="space-y-8 min-h-[300px]">
         {Object.keys(groupedActivities).length > 0 ? (
            Object.entries(groupedActivities).map(([section, items]) => (
              <div key={section} className="animate-fade-in">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 sticky top-0 bg-slate-50/90 dark:bg-slate-950/90 backdrop-blur-sm py-2 z-10">{section}</h3>
                  <div className="bg-white dark:bg-slate-900 rounded-2xl p-2 border border-slate-100 dark:border-slate-800 divide-y divide-slate-50 dark:divide-slate-800/50">
                    {items.map(item => (
                      <ActivityItem key={item.id} {...item} />
                    ))}
                  </div>
              </div>
            ))
         ) : (
            <div className="flex flex-col items-center justify-center py-12 text-slate-400">
               <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4">
                  <Activity size={32} />
               </div>
               <p>No activity found for "{activeFilter}"</p>
            </div>
         )}
      </div>
    </div>
  );
};

const ArchiveView = () => {
  const [activeTab, setActiveTab] = useState('stories'); // stories, posts, reels

  // Mock Data Generators
  const storyDates = Array.from({ length: 12 }, (_, i) => ({ 
    day: 28 - i, 
    month: 'DEC',
    image: MOCK_IMAGES[i % MOCK_IMAGES.length]
  }));

  return (
    <div className="max-w-4xl mx-auto w-full pb-20 pt-4 px-4 animate-fade-in">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center justify-center gap-2">
           Archive <RotateCcw size={18} className="text-slate-400" />
        </h2>
      </div>

      {/* Tabs */}
      <div className="flex p-1 bg-slate-100 dark:bg-slate-800 rounded-xl mb-6">
         <button 
           onClick={() => setActiveTab('stories')}
           className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${activeTab === 'stories' ? 'bg-white dark:bg-slate-700 shadow-sm text-slate-900 dark:text-white' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
         >
           Stories
         </button>
         <button 
           onClick={() => setActiveTab('posts')}
           className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${activeTab === 'posts' ? 'bg-white dark:bg-slate-700 shadow-sm text-slate-900 dark:text-white' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
         >
           Posts
         </button>
         <button 
           onClick={() => setActiveTab('reels')}
           className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${activeTab === 'reels' ? 'bg-white dark:bg-slate-700 shadow-sm text-slate-900 dark:text-white' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
         >
           Reels
         </button>
      </div>

      {/* Content Area */}
      <div className="animate-fade-in">
         {/* STORIES ARCHIVE */}
         {activeTab === 'stories' && (
           <div className="grid grid-cols-3 md:grid-cols-4 gap-1 md:gap-4">
             {storyDates.map((item, i) => (
               <div key={i} className="aspect-[9/16] relative rounded-lg overflow-hidden group cursor-pointer">
                  <img src={item.image} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-2 left-2 text-white">
                     <span className="text-xl font-bold block leading-none">{item.day}</span>
                     <span className="text-[10px] font-bold opacity-80">{item.month}</span>
                  </div>
                  <div className="absolute top-2 right-2 bg-black/50 p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                     <Eye size={12} className="text-white" />
                  </div>
               </div>
             ))}
           </div>
         )}

         {/* POSTS ARCHIVE */}
         {activeTab === 'posts' && (
           <div className="grid grid-cols-3 gap-1 md:gap-4">
             {MOCK_IMAGES.map((img, i) => (
               <div key={i} className="aspect-square bg-slate-200 dark:bg-slate-800 relative group cursor-pointer overflow-hidden md:rounded-xl">
                 <img src={img} className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity" />
                 <div className="absolute inset-0 flex items-center justify-center">
                    <Archive size={24} className="text-white drop-shadow-lg opacity-50 group-hover:opacity-0 transition-opacity" />
                 </div>
               </div>
             ))}
           </div>
         )}

         {/* REELS ARCHIVE */}
         {activeTab === 'reels' && (
           <div className="grid grid-cols-3 gap-1 md:gap-4">
             {MOCK_IMAGES.slice(0, 6).map((img, i) => (
               <div key={i} className="aspect-[9/16] bg-slate-900 relative group cursor-pointer overflow-hidden md:rounded-xl">
                 <img src={img} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                 <div className="absolute inset-0 flex items-center justify-center">
                    <Play size={32} fill="white" className="text-white opacity-80" />
                 </div>
                 <div className="absolute bottom-2 left-2 flex items-center gap-1 text-white text-xs font-medium">
                    <Play size={10} fill="currentColor" /> 1.2k
                 </div>
               </div>
             ))}
           </div>
         )}

         {/* Footer Message */}
         <div className="mt-8 text-center px-8">
           <p className="text-xs text-slate-400 dark:text-slate-500">
             Only you can see your archive. You can choose to share memories to your story or unarchive posts to show them on your profile.
           </p>
         </div>
      </div>
    </div>
  );
};

const LikedView = () => {
  return (
    <div className="max-w-4xl mx-auto w-full pb-20 pt-4 px-4 animate-fade-in">
       <div className="text-center mb-8">
        <div className="w-16 h-16 bg-rose-100 dark:bg-rose-900/30 rounded-2xl flex items-center justify-center text-rose-500 shadow-sm mx-auto mb-4">
          <Heart size={32} fill="currentColor" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Liked Posts</h2>
        <p className="text-slate-500 dark:text-slate-400 text-sm mt-2">
          Posts you've liked recently.
        </p>
      </div>

      <div className="grid grid-cols-3 gap-1 md:gap-4 md:px-0">
        {MOCK_IMAGES.map((img, i) => (
          <div key={i} className="aspect-square bg-slate-200 dark:bg-slate-800 relative group cursor-pointer overflow-hidden md:rounded-xl">
            <img src={img} alt="Liked post" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
               <Heart size={24} fill="white" className="text-white" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const SavedView = () => {
  const [collections, setCollections] = useState([
    { id: 'all', name: 'All Posts', cover: MOCK_IMAGES[0], count: 142 },
    { id: 'travel', name: 'Travel Inspo', cover: MOCK_IMAGES[1], count: 12 },
    { id: 'design', name: 'UI Design', cover: MOCK_IMAGES[2], count: 45 },
  ]);
  const [activeCollection, setActiveCollection] = useState(null); // null means viewing list of collections
  const [isCreating, setIsCreating] = useState(false);
  const [newCollectionName, setNewCollectionName] = useState('');

  const handleCreateCollection = (e) => {
    e.preventDefault();
    if (!newCollectionName.trim()) return;
    const newCollection = {
      id: Date.now().toString(),
      name: newCollectionName,
      cover: null, // Placeholder
      count: 0
    };
    setCollections([...collections, newCollection]);
    setNewCollectionName('');
    setIsCreating(false);
  };

  // Render content of a single collection
  if (activeCollection) {
    return (
      <div className="max-w-4xl mx-auto w-full pb-20 pt-4 px-4 animate-fade-in">
        <div className="flex items-center gap-4 mb-6">
           <button onClick={() => setActiveCollection(null)} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors">
              <ArrowLeft size={24} className="text-slate-900 dark:text-white" />
           </button>
           <div>
             <h2 className="text-xl font-bold text-slate-900 dark:text-white">{activeCollection.name}</h2>
             <p className="text-xs text-slate-500">{activeCollection.count} posts</p>
           </div>
        </div>

        <div className="grid grid-cols-3 gap-1 md:gap-4 md:px-0">
          {activeCollection.count > 0 ? (
             MOCK_IMAGES.slice(0, activeCollection.id === 'all' ? 9 : 3).map((img, i) => (
                <div key={i} className="aspect-square bg-slate-200 dark:bg-slate-800 relative group cursor-pointer overflow-hidden md:rounded-xl">
                  <img src={img} alt="Saved post" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                </div>
             ))
          ) : (
             <div className="col-span-3 py-20 text-center text-slate-400">
                <Bookmark size={48} className="mx-auto mb-4 opacity-20" />
                <p>No posts in this collection yet.</p>
             </div>
          )}
        </div>
      </div>
    );
  }

  // Render list of collections
  return (
    <div className="max-w-4xl mx-auto w-full pb-20 pt-4 px-4 animate-fade-in">
      <div className="flex items-center justify-between mb-8">
        <div>
           <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Saved</h2>
           <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Private collections only you can see.</p>
        </div>
        {!isCreating && (
          <button onClick={() => setIsCreating(true)} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full text-slate-900 dark:text-white">
            <Plus size={24} />
          </button>
        )}
      </div>

      {isCreating && (
         <form onSubmit={handleCreateCollection} className="mb-8 p-4 bg-slate-100 dark:bg-slate-800/50 rounded-2xl animate-fade-in">
            <label className="block text-xs font-bold text-slate-500 mb-2 uppercase">New Collection Name</label>
            <div className="flex gap-2">
               <input 
                 autoFocus
                 type="text" 
                 value={newCollectionName}
                 onChange={(e) => setNewCollectionName(e.target.value)}
                 placeholder="e.g., Summer 2024"
                 className="flex-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
               />
               <button type="submit" disabled={!newCollectionName.trim()} className="bg-blue-500 text-white p-3 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-600 transition-colors">
                  <Check size={20} />
               </button>
               <button type="button" onClick={() => setIsCreating(false)} className="bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 p-3 rounded-xl hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors">
                  <X size={20} />
               </button>
            </div>
         </form>
      )}

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
         {/* Collections Grid */}
         {collections.map(col => (
           <button key={col.id} onClick={() => setActiveCollection(col)} className="text-left group">
              <div className="aspect-square rounded-2xl bg-slate-100 dark:bg-slate-800 mb-3 overflow-hidden border border-slate-200 dark:border-slate-800 relative">
                 {col.cover ? (
                    <div className="w-full h-full grid grid-cols-2 grid-rows-2">
                       <img src={col.cover} className="w-full h-full object-cover col-span-2 row-span-2" />
                       <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                    </div>
                 ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-300 dark:text-slate-600">
                       <Folder size={40} />
                    </div>
                 )}
              </div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-white truncate">{col.name}</h3>
              <p className="text-xs text-slate-500">{col.count} posts</p>
           </button>
         ))}
      </div>
    </div>
  );
};

const AccountCentreView = () => {
  const Section = ({ title, children }) => (
    <div className="mb-8 animate-fade-in">
      {title && <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 px-2">{title}</h3>}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
        {children}
      </div>
    </div>
  );

  const ActionRow = ({ icon: Icon, label, sublabel, onClick, isDestructive }) => (
    <button onClick={onClick} className="w-full flex items-center justify-between p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors border-b last:border-0 border-slate-100 dark:border-slate-800 text-left">
      <div className="flex items-center gap-4">
        {Icon && (
          <div className="text-slate-500 dark:text-slate-400">
            <Icon size={24} strokeWidth={1.5} />
          </div>
        )}
        <div>
          <span className={`block text-sm font-semibold ${isDestructive ? 'text-red-600 dark:text-red-400' : 'text-slate-900 dark:text-white'}`}>{label}</span>
          {sublabel && <span className="block text-xs text-slate-500 dark:text-slate-400 mt-0.5">{sublabel}</span>}
        </div>
      </div>
      <ChevronRight size={20} className="text-slate-300 dark:text-slate-600" />
    </button>
  );

  return (
    <div className="max-w-2xl mx-auto w-full pb-20 pt-4 px-4">
      <div className="text-center mb-8 animate-fade-in">
        <div className="w-16 h-16 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg mx-auto mb-4">
          <Shield size={32} />
        </div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Account Centre</h2>
        <p className="text-slate-500 dark:text-slate-400 text-sm mt-2 max-w-sm mx-auto">
          Manage your connected experiences and account settings across our technologies.
        </p>
      </div>

      <Section>
        <div className="p-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer">
          <div className="flex items-center gap-4">
            <div className="flex -space-x-3">
              <div className="w-10 h-10 rounded-full border-2 border-white dark:border-slate-900 bg-slate-200 dark:bg-slate-800 bg-[url('https://api.dicebear.com/7.x/avataaars/svg?seed=Jane')] bg-cover bg-center"></div>
              <div className="w-10 h-10 rounded-full border-2 border-white dark:border-slate-900 bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-xs font-bold text-blue-600 dark:text-blue-400">f</div>
            </div>
            <div>
              <span className="block text-sm font-bold text-slate-900 dark:text-white">Profiles</span>
              <span className="block text-xs text-slate-500">Jane Doe • jane_design</span>
            </div>
          </div>
          <ChevronRight size={20} className="text-slate-300 dark:text-slate-600" />
        </div>
        <div className="border-t border-slate-100 dark:border-slate-800">
           <ActionRow icon={Share2} label="Connected Experiences" sublabel="Sharing across profiles, logging in with accounts" />
        </div>
      </Section>

      <Section title="Account Settings">
        <ActionRow icon={User} label="Personal Information" sublabel="Contact info, birthday, identity confirmation" />
        <ActionRow icon={Key} label="Password & Security" sublabel="Change password, 2FA, login alerts" />
        <ActionRow icon={CreditCard} label="Payments & Orders" sublabel="Ads payments, Meta Pay" />
        <ActionRow icon={Megaphone} label="Ad Preferences" sublabel="Ad topics, settings for ad partners" />
        <ActionRow icon={FileText} label="Your Information and Permissions" sublabel="Download your information, transfer copy" />
      </Section>

      <div className="mt-8 mb-12">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 px-2">Privacy & Legal</h3>
        <div className="space-y-4 px-2">
            <div className="flex items-start gap-3 text-xs text-slate-500">
                <Shield size={14} className="mt-0.5 shrink-0" />
                <p>We use your information to improve your experience and to help keep your account secure. <span className="text-blue-500 font-semibold cursor-pointer">Learn More</span></p>
            </div>
            <div className="flex items-start gap-3 text-xs text-slate-500">
                <FileText size={14} className="mt-0.5 shrink-0" />
                <p>By using Account Centre, you agree to our <span className="text-blue-500 font-semibold cursor-pointer">Terms of Service</span> and <span className="text-blue-500 font-semibold cursor-pointer">Privacy Policy</span>.</p>
            </div>
        </div>
      </div>
    </div>
  );
};

const SettingsView = ({ isDark, toggleTheme, onNavigate }) => {
  const Section = ({ title, children }) => (
    <div className="mb-6 animate-fade-in">
      <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 px-2">{title}</h3>
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
        {children}
      </div>
    </div>
  );

  const Item = ({ icon: Icon, label, value, onClick, isToggle, detail, isDestructive }) => (
    <button onClick={onClick} className="w-full flex items-center justify-between p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors border-b last:border-0 border-slate-100 dark:border-slate-800">
      <div className="flex items-center gap-3">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isDestructive ? 'bg-red-50 text-red-500 dark:bg-red-900/20' : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'}`}>
          <Icon size={18} />
        </div>
        <span className={`text-sm font-medium ${isDestructive ? 'text-red-600 dark:text-red-400' : 'text-slate-700 dark:text-slate-200'}`}>{label}</span>
      </div>
      <div className="flex items-center gap-2">
        {detail && <span className="text-xs text-slate-400 font-medium">{detail}</span>}
        {isToggle ? (
            <div className={`w-11 h-6 rounded-full transition-colors flex items-center px-1 ${value ? 'bg-blue-500' : 'bg-slate-300 dark:bg-slate-600'}`}>
            <div className={`w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${value ? 'translate-x-5' : 'translate-x-0'}`} />
            </div>
        ) : (
            <ChevronRight size={18} className="text-slate-400" />
        )}
      </div>
    </button>
  );

  return (
    <div className="max-w-2xl mx-auto w-full pb-20 pt-2 px-2">
      <button 
        onClick={() => onNavigate('account-centre')}
        className="w-full text-left p-4 mb-6 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl text-white shadow-lg transform transition-transform active:scale-[0.98]"
      >
          <div className="flex items-center gap-4">
             <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-md">
                 <Shield size={24} />
             </div>
             <div>
                 <h3 className="font-bold text-lg">Account Centre</h3>
                 <p className="text-blue-100 text-xs">Manage your password, security, and personal details.</p>
             </div>
             <ChevronRight className="ml-auto text-white/50" />
          </div>
      </button>

      {/* Removed "Your Account" Section */}

      <Section title="Content & Display">
        <Item icon={Bell} label="Notifications" detail="On" />
        <Item 
          icon={isDark ? Moon : Sun} 
          label="Dark Mode" 
          isToggle 
          value={isDark} 
          onClick={toggleTheme} 
        />
        <Item icon={Languages} label="Language" detail="English (UK)" />
        <Item icon={Accessibility} label="Accessibility" />
        <Item icon={Volume2} label="Media Quality" detail="High" />
      </Section>

      <Section title="Your Activity">
        <Item icon={Archive} label="Archive" onClick={() => onNavigate('archive')} />
        <Item icon={Bookmark} label="Saved" onClick={() => onNavigate('saved')} />
        <Item icon={Heart} label="Likes" onClick={() => onNavigate('liked')} />
        <Item icon={Clock} label="Time Spent" detail="1h 12m daily avg" onClick={() => onNavigate('time-spent')} />
        <Item icon={Activity} label="Activity Log" onClick={() => onNavigate('activity-log')} />
        <Item icon={Download} label="Download Your Information" />
      </Section>

      <Section title="Privacy & Safety">
        <Item icon={Lock} label="Private Account" isToggle value={true} />
        <Item icon={UserCheck} label="Close Friends" detail="24" />
        <Item icon={EyeOff} label="Hidden Words" />
        <Item icon={UserX} label="Blocked Accounts" />
        <Item icon={Eye} label="Story Controls" />
      </Section>
      
      <Section title="Support & About">
        <Item icon={HelpCircle} label="Help Center" />
        <Item icon={Smartphone} label="About Device" detail="iPhone 15 Pro" />
        <Item icon={FileText} label="Terms of Service" />
        <Item icon={Shield} label="Privacy Policy" />
      </Section>

      <Section title="Login">
        <Item icon={Plus} label="Add Account" />
        <Item icon={LogOut} label="Log Out" isDestructive />
      </Section>
      
      <div className="text-center mt-8 mb-4">
         <p className="text-xs font-bold text-slate-500">SocialApp Premium</p>
         <p className="text-[10px] text-slate-400 mt-1">v3.4.0 • Build 2024.12.21</p>
      </div>
    </div>
  );
};

const ProfileView = ({ onNavigate }) => {
  return (
    <div className="max-w-4xl mx-auto w-full pb-24 animate-fade-in">
      {/* Profile Header */}
      <div className="bg-white dark:bg-slate-900/50 md:rounded-3xl border-b md:border border-slate-200 dark:border-slate-800 p-6 md:p-8 mb-4">
        <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start">
          {/* Avatar */}
          <div className="relative group mx-auto md:mx-0">
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full p-1 bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500">
              <div className="w-full h-full rounded-full bg-white dark:bg-slate-950 p-1">
                <div className="w-full h-full rounded-full bg-slate-200 dark:bg-slate-800 bg-[url('https://api.dicebear.com/7.x/avataaars/svg?seed=Jane')] bg-cover bg-center"></div>
              </div>
            </div>
          </div>

          {/* Info */}
          <div className="flex-1 flex flex-col items-center md:items-start w-full">
            <div className="flex flex-col md:flex-row items-center gap-4 mb-4 w-full">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">jane_design</h2>
              <div className="flex gap-2">
                <button className="px-4 py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg text-sm font-semibold transition-colors">
                  Edit Profile
                </button>
                <button className="px-4 py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg text-sm font-semibold transition-colors">
                  Share
                </button>
                <button 
                  onClick={() => onNavigate('settings')}
                  className="p-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg text-slate-600 dark:text-slate-300 transition-colors"
                  title="Settings"
                >
                  <Settings size={20} />
                </button>
              </div>
            </div>

            {/* Stats */}
            <div className="flex gap-6 mb-4 text-sm md:text-base">
              <div className="text-center md:text-left"><span className="font-bold text-slate-900 dark:text-white">142</span> <span className="text-slate-500">posts</span></div>
              <div className="text-center md:text-left"><span className="font-bold text-slate-900 dark:text-white">12.4k</span> <span className="text-slate-500">followers</span></div>
              <div className="text-center md:text-left"><span className="font-bold text-slate-900 dark:text-white">890</span> <span className="text-slate-500">following</span></div>
            </div>

            {/* Bio */}
            <div className="text-center md:text-left max-w-md">
              <h3 className="font-bold text-slate-900 dark:text-white">Jane Doe</h3>
              <p className="text-slate-600 dark:text-slate-300 text-sm whitespace-pre-line">
                Digital Creator 🎨
                Capturing moments & designing dreams.
                📍 SF / NYC
                <span className="text-blue-500 cursor-pointer"> jane.design/portfolio</span>
              </p>
            </div>
          </div>
        </div>

        {/* Stories/Highlights */}
        <div className="flex gap-4 mt-8 overflow-x-auto pb-2 scrollbar-hide">
          {[1,2,3,4,5].map((i) => (
            <div key={i} className="flex flex-col items-center gap-1 flex-shrink-0 cursor-pointer">
              <div className="w-16 h-16 rounded-full border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 p-0.5">
                 <div className="w-full h-full rounded-full bg-slate-200 dark:bg-slate-700" />
              </div>
              <span className="text-xs font-medium text-slate-600 dark:text-slate-400">Travel {i}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Content Tabs */}
      <div className="flex items-center justify-around border-b border-slate-200 dark:border-slate-800 mb-1">
        <button className="flex-1 p-3 flex justify-center border-b-2 border-slate-900 dark:border-white text-slate-900 dark:text-white"><Grid size={20} /></button>
        <button className="flex-1 p-3 flex justify-center border-b-2 border-transparent text-slate-400 hover:text-slate-600"><Film size={20} /></button>
        <button className="flex-1 p-3 flex justify-center border-b-2 border-transparent text-slate-400 hover:text-slate-600"><Tag size={20} /></button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-3 gap-1 md:gap-4 md:px-0">
        {[...Array(9)].map((_, i) => (
          <div key={i} className="aspect-square bg-slate-200 dark:bg-slate-800 relative group cursor-pointer overflow-hidden md:rounded-xl">
             <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
               <div className="flex gap-4 text-white font-bold">
                 <span className="flex items-center gap-1"><Heart size={16} fill="white" /> 240</span>
                 <span className="flex items-center gap-1"><MessageCircle size={16} fill="white" /> 12</span>
               </div>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ==================================================================================================
 * SHARED COMPONENTS (Used by both layouts)
 * ================================================================================================== */

const NotificationsPopup = ({ isOpen, onViewAll }) => {
  if (!isOpen) return null;
  const getIcon = (type) => {
    switch(type) {
      case 'like': return <Heart size={10} className="text-white fill-current" />;
      case 'comment': return <MessageSquare size={10} className="text-white fill-current" />;
      case 'follow': return <UserPlus size={10} className="text-white" />;
      default: return <Bell size={10} className="text-white" />;
    }
  };
  const getBgColor = (type) => {
    switch(type) {
      case 'like': return 'bg-rose-500';
      case 'comment': return 'bg-blue-500';
      case 'follow': return 'bg-purple-500';
      default: return 'bg-slate-500';
    }
  };
  return (
    <div className="absolute right-[-60px] md:right-0 top-full mt-3 w-80 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden z-50 animate-fade-in origin-top-right">
      <div className="p-3 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm">
        <h3 className="font-bold text-sm text-slate-900 dark:text-white">Notifications</h3>
        <button className="text-[10px] font-bold text-blue-600 dark:text-blue-400 hover:underline uppercase tracking-wide">Mark all read</button>
      </div>
      <div className="max-h-[350px] overflow-y-auto">
        {NOTIFICATIONS.map((notif) => (
          <div key={notif.id} className={`p-3 flex gap-3 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer ${notif.read ? 'opacity-70' : 'bg-blue-50/30 dark:bg-blue-900/10'}`}>
            <div className="relative flex-shrink-0">
               <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-xs font-bold text-slate-500">
                  {notif.user.charAt(0)}
               </div>
               <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-white dark:border-slate-900 flex items-center justify-center ${getBgColor(notif.type)}`}>
                  {getIcon(notif.type)}
               </div>
            </div>
            <div className="flex-1 min-w-0">
               <p className="text-xs text-slate-900 dark:text-slate-100 leading-snug">
                 <span className="font-bold">{notif.user}</span> {notif.text}
               </p>
               <p className="text-[10px] text-slate-500 mt-1">{notif.time}</p>
            </div>
            {!notif.read && (
              <div className="w-2 h-2 rounded-full bg-blue-500 mt-1.5 flex-shrink-0"></div>
            )}
          </div>
        ))}
      </div>
      <button onClick={onViewAll} className="w-full p-2.5 text-center text-[11px] font-bold text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 border-t border-slate-100 dark:border-slate-800 transition-colors uppercase tracking-wide bg-slate-50/50 dark:bg-slate-900/50 hover:bg-slate-100 dark:hover:bg-slate-800">
        View All
      </button>
    </div>
  );
};

const UserMenuPopup = ({ isOpen, isDark, toggleTheme, positionClass, onNavigate }) => {
  if (!isOpen) return null;
  return (
    <div className={`absolute z-50 w-64 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 p-2 animate-fade-in ${positionClass}`}>
      <div className="px-3 py-2 mb-1">
        <p className="text-sm font-bold text-slate-900 dark:text-white">Jane Doe</p>
        <p className="text-xs text-slate-500 truncate">jane@example.com</p>
      </div>
      <button onClick={() => onNavigate('settings')} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 transition-colors text-sm font-medium">
        <Settings size={18} /> Settings
      </button>
      <button onClick={toggleTheme} className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 transition-colors text-sm font-medium">
        <div className="flex items-center gap-3">{isDark ? <Moon size={18} /> : <Sun size={18} />} <span>Theme</span></div>
        <span className="text-[10px] font-bold bg-slate-200 dark:bg-slate-700 px-2 py-0.5 rounded-full text-slate-500 dark:text-slate-400 uppercase tracking-wide">{isDark ? 'Dark' : 'Light'}</span>
      </button>
      <div className="h-px bg-slate-100 dark:bg-slate-800 my-1"></div>
      <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400 transition-colors text-sm font-medium">
        <LogOut size={18} /> Log Out
      </button>
    </div>
  );
}

const ContentArea = ({ activeTab, onPushView, sharedState }) => {
  if (activeTab === 'profile') {
    return (
      <div className="flex-1 overflow-y-auto overflow-x-hidden scroll-smooth relative h-full">
         <ProfileView onNavigate={onPushView} />
      </div>
    );
  }

  if (activeTab === 'settings') {
    return (
      <div className="flex-1 overflow-y-auto overflow-x-hidden scroll-smooth relative h-full bg-slate-50 dark:bg-slate-950">
        <div className="p-4 md:p-8">
           <h2 className="text-2xl font-bold mb-6 text-slate-900 dark:text-white">Settings</h2>
           <SettingsView isDark={sharedState.isDark} toggleTheme={sharedState.toggleTheme} onNavigate={onPushView} />
        </div>
      </div>
    );
  }

  if (activeTab === 'account-centre') {
    return (
        <div className="flex-1 overflow-y-auto overflow-x-hidden scroll-smooth relative h-full bg-slate-50 dark:bg-slate-950">
            <AccountCentreView />
        </div>
    );
  }

  if (activeTab === 'saved') {
    return (
        <div className="flex-1 overflow-y-auto overflow-x-hidden scroll-smooth relative h-full bg-slate-50 dark:bg-slate-950">
            <SavedView />
        </div>
    );
  }

  if (activeTab === 'liked') {
    return (
        <div className="flex-1 overflow-y-auto overflow-x-hidden scroll-smooth relative h-full bg-slate-50 dark:bg-slate-950">
            <LikedView />
        </div>
    );
  }

  if (activeTab === 'archive') {
    return (
        <div className="flex-1 overflow-y-auto overflow-x-hidden scroll-smooth relative h-full bg-slate-50 dark:bg-slate-950">
            <ArchiveView />
        </div>
    );
  }

  if (activeTab === 'time-spent') {
    return (
        <div className="flex-1 overflow-y-auto overflow-x-hidden scroll-smooth relative h-full bg-slate-50 dark:bg-slate-950">
            <TimeSpentView />
        </div>
    );
  }

  if (activeTab === 'activity-log') {
    return (
        <div className="flex-1 overflow-y-auto overflow-x-hidden scroll-smooth relative h-full bg-slate-50 dark:bg-slate-950">
            <ActivityLogView />
        </div>
    );
  }

  const page = [...NAV_ITEMS, ...EXTRA_PAGES].find(item => item.id === activeTab) || NAV_ITEMS[0];
  const Icon = page.icon;
  return (
    <div className="flex-1 overflow-y-auto overflow-x-hidden p-4 md:p-8 scroll-smooth relative h-full">
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-tr from-blue-100 to-purple-100 dark:from-blue-900/10 dark:to-purple-900/10 rounded-full blur-3xl -z-10 pointer-events-none"></div>
      <div className="flex flex-col items-center justify-center min-h-[60vh] p-8 animate-fade-in text-center">
        <div className="relative mb-8 group">
          <div className={`absolute inset-0 ${page.bg} opacity-20 blur-2xl rounded-full group-hover:opacity-30 transition-opacity duration-500`}></div>
          <div className="relative w-32 h-32 bg-white dark:bg-slate-800 rounded-3xl shadow-xl flex items-center justify-center border border-slate-100 dark:border-slate-700 transform transition-transform duration-500 hover:scale-105 hover:-rotate-3">
            <Icon className={`w-14 h-14 ${page.color}`} strokeWidth={1.5} />
            <div className="absolute -bottom-3 -right-3 bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-xs font-bold shadow-lg border-2 border-white dark:border-slate-800 flex items-center gap-1">
              <Construction size={12} /> BUILDING
            </div>
          </div>
        </div>
        <h2 className="text-4xl font-extrabold text-slate-900 dark:text-white mb-4 tracking-tight">{page.label}</h2>
        <p className="text-lg text-slate-500 dark:text-slate-400 max-w-md mx-auto leading-relaxed mb-6">
          We are crafting a premium experience for your <span className={`font-semibold ${page.color}`}>{page.label.toLowerCase()}</span>.
        </p>
        <button onClick={() => onPushView('post-detail')} className="px-6 py-2.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-xl font-bold text-sm hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
          Demo Detail View
        </button>
      </div>
      <div className="h-20 md:hidden"></div>
    </div>
  );
}

/* ==================================================================================================
 * MOBILE LAYOUT COMPONENT
 * ================================================================================================== */
const MobileLayout = ({ navStack, activeTab, handleBack, handleNavClick, handlePushView, sharedState }) => {
  const { isNotificationsOpen, setIsNotificationsOpen, notificationRef, handleViewAllNotifications } = sharedState;
  const [isCornerMenuOpen, setIsCornerMenuOpen] = useState(false);

  // Arc Menu Helper
  const ArcMenuItem = ({ item, onClick, angle, delay }) => {
    const radius = 105;
    const bottom = Math.cos(angle * (Math.PI / 180)) * radius;
    const right = Math.sin(angle * (Math.PI / 180)) * radius;
    return (
      <button
        onClick={() => { onClick(item.id); setIsCornerMenuOpen(false); }}
        style={{ bottom: `${bottom}px`, right: `${right}px`, transform: 'translate(50%, 50%)', animationDelay: `${delay}ms` }}
        className="absolute w-12 h-12 rounded-full shadow-xl flex items-center justify-center bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 text-slate-700 dark:text-slate-200 animate-pop-in hover:scale-110 hover:bg-blue-50 dark:hover:bg-slate-700 transition-transform z-50 will-change-transform"
      >
        <item.icon size={20} />
        <span className="absolute -bottom-6 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm text-slate-800 dark:text-slate-200 text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm whitespace-nowrap">
          {item.label}
        </span>
      </button>
    );
  };

  // Nav Item Helper
  const MobileNavItem = ({ item }) => {
    const isActive = navStack[0] === item.id;
    return (
      <button 
        onClick={() => { handleNavClick(item.id); setIsCornerMenuOpen(false); }}
        className={`flex flex-col items-center justify-center w-full h-full gap-1 transition-all duration-200 ${isActive ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400 dark:text-slate-500'} ${isCornerMenuOpen ? 'blur-sm opacity-40 pointer-events-none' : ''}`}
      >
        <item.icon size={24} strokeWidth={isActive ? 2.5 : 2} className={`transition-transform duration-200 ${isActive ? '-translate-y-1' : ''}`} />
        <span className="text-[9px] font-medium">{item.label}</span>
      </button>
    );
  };

  return (
    <div className="flex flex-col h-full w-full md:hidden">
      {/* 1. Mobile Header */}
      <header className="h-14 flex-none px-4 flex items-center justify-between border-b border-slate-200/50 dark:border-slate-800/50 bg-white/50 dark:bg-slate-950/50 backdrop-blur-md sticky top-0 z-30">
        <div className="flex items-center gap-3">
          {navStack.length > 1 ? (
            <button onClick={handleBack} className="p-1 -ml-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800">
              <ArrowLeft size={24} />
            </button>
          ) : (
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white"><span className="font-bold text-sm">S</span></div>
          )}
          <span className="font-bold text-lg">{navStack.length > 1 ? '' : 'SocialApp'}</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative" ref={notificationRef}>
            <button onClick={() => setIsNotificationsOpen(!isNotificationsOpen)} className={`relative p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors ${isNotificationsOpen ? 'bg-slate-100 dark:bg-slate-800 text-blue-500' : 'text-slate-600 dark:text-slate-300'}`}>
              <Bell size={20} /><span className="absolute top-1.5 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-950"></span>
            </button>
            <NotificationsPopup isOpen={isNotificationsOpen} onViewAll={handleViewAllNotifications} />
          </div>
          <button onClick={() => { handleNavClick('chats'); setIsCornerMenuOpen(false); }} className={`p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors ${activeTab === 'chats' ? 'text-blue-500' : 'text-slate-600 dark:text-slate-300'}`}>
            <MessageCircle size={20} />
          </button>
        </div>
      </header>

      {/* 2. Mobile Content */}
      <ContentArea activeTab={activeTab} onPushView={handlePushView} sharedState={sharedState} />

      {/* 3. Mobile Bottom Bar & Corner Menu */}
      {/* Backdrop */}
      {isCornerMenuOpen && <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 animate-fade-in" onClick={() => setIsCornerMenuOpen(false)} />}
      
      {/* Arc Items */}
      {isCornerMenuOpen && (
        <div className="fixed bottom-24 right-[10%] z-[60] pointer-events-none">
          <div className="relative pointer-events-auto">
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full border-[40px] border-slate-100/10 dark:border-slate-800/40 blur-2xl pointer-events-none animate-fade-in"></div>
             <ArcMenuItem item={NAV_ITEMS.find(n => n.id === 'calls')} onClick={handleNavClick} angle={0} delay={0} />
             <ArcMenuItem item={NAV_ITEMS.find(n => n.id === 'connections')} onClick={handleNavClick} angle={45} delay={50} />
             <ArcMenuItem item={NAV_ITEMS.find(n => n.id === 'profile')} onClick={handleNavClick} angle={90} delay={100} />
          </div>
        </div>
      )}

      {/* Actual Bar */}
      <div className={`fixed bottom-0 left-0 right-0 h-16 border-t flex items-center justify-around px-2 z-50 pb-safe transition-all duration-300 ${isCornerMenuOpen ? 'bg-transparent border-transparent pointer-events-none' : 'bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800'}`}>
        <div className="z-30 flex items-center justify-center w-full"><MobileNavItem item={NAV_ITEMS[0]} /></div>
        <div className="z-30 flex items-center justify-center w-full"><MobileNavItem item={NAV_ITEMS[1]} /></div>
        <div className="relative -top-6 z-30">
          <button onClick={() => setIsCornerMenuOpen(false)} className={`w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-lg shadow-blue-600/30 border-4 border-slate-50 dark:border-slate-950 active:scale-95 transition-all duration-200 ${isCornerMenuOpen ? 'blur-sm opacity-40 pointer-events-none' : ''}`}>
            <Plus size={28} strokeWidth={2.5} />
          </button>
        </div>
        <div className="z-30 flex items-center justify-center w-full"><MobileNavItem item={NAV_ITEMS[5]} /></div>
        <div className="z-50 flex items-center justify-center w-full pointer-events-auto">
          <button onClick={() => setIsCornerMenuOpen(!isCornerMenuOpen)} className={`flex flex-col items-center justify-center w-full h-full gap-1 ${isCornerMenuOpen ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400 dark:text-slate-500'}`}>
            <div className={`transition-transform duration-300 ${isCornerMenuOpen ? 'rotate-90' : ''}`}><LayoutGrid size={24} strokeWidth={2.5} /></div>
            <span className="text-[9px] font-medium">Menu</span>
          </button>
        </div>
      </div>
    </div>
  );
};

/* ==================================================================================================
 * DESKTOP LAYOUT COMPONENT
 * ================================================================================================== */
const DesktopLayout = ({ navStack, activeTab, handleBack, handleNavClick, handlePushView, sharedState }) => {
  const { isNotificationsOpen, setIsNotificationsOpen, notificationRef, handleViewAllNotifications, isUserMenuOpen, setIsUserMenuOpen, isDark, toggleTheme, handleSettingsClick } = sharedState;
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
  const sidebarMenuRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      setSidebarCollapsed(window.innerWidth < 1280);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    // Close user menu if clicking outside
    const handleClickOutside = (event) => {
      if (isUserMenuOpen && sidebarMenuRef.current && !sidebarMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isUserMenuOpen, setIsUserMenuOpen]);

  // Sidebar Link Component (Local to desktop to access collapse state easily)
  const DesktopSidebarLink = ({ item }) => (
    <button onClick={() => handleNavClick(item.id)} className={`flex items-center gap-4 px-4 py-3.5 rounded-xl w-full transition-all duration-300 group relative overflow-hidden ${navStack[0] === item.id ? 'bg-slate-900 text-white shadow-lg shadow-slate-900/20 dark:bg-white dark:text-slate-900' : 'text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'} ${isSidebarCollapsed ? 'justify-center' : 'justify-start'}`}>
      <item.icon size={22} className="transition-transform duration-300 group-hover:scale-110 flex-shrink-0" strokeWidth={navStack[0] === item.id ? 2.5 : 2} />
      <span className={`font-medium text-[15px] whitespace-nowrap transition-all duration-300 ${isSidebarCollapsed ? 'hidden' : 'block'}`}>{item.label}</span>
    </button>
  );

  return (
    <div className="hidden md:flex h-full w-full">
      {/* 1. Sidebar */}
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
          <button className={`flex items-center gap-4 px-4 py-3.5 rounded-xl w-full transition-all duration-300 group relative overflow-hidden bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/30 ${isSidebarCollapsed ? 'justify-center' : 'justify-start'}`}>
            <Plus size={24} className="transition-transform duration-300 group-hover:rotate-90 flex-shrink-0" strokeWidth={2.5} />
            <span className={`font-bold text-[15px] whitespace-nowrap transition-all duration-300 ${isSidebarCollapsed ? 'hidden' : 'block'}`}>Create Post</span>
          </button>
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

      {/* 2. Desktop Main Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 flex-none px-8 flex items-center justify-between border-b border-slate-200/50 dark:border-slate-800/50 bg-white/50 dark:bg-slate-950/50 backdrop-blur-md sticky top-0 z-20">
          <div className="flex items-center gap-4 w-full max-w-md">
            {navStack.length > 1 ? (
               <button onClick={handleBack} className="flex items-center gap-2 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"><ArrowLeft size={20} /></button>
            ) : (
              <h1 className="text-xl font-bold capitalize text-slate-900 dark:text-white mr-8">{activeTab.replace('-', ' ')}</h1>
            )}
          </div>
          <div className="flex items-center gap-5">
            <div className="relative" ref={notificationRef}>
              <button onClick={() => setIsNotificationsOpen(!isNotificationsOpen)} className={`relative p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors ${isNotificationsOpen ? 'bg-slate-100 dark:bg-slate-800 text-blue-500' : 'text-slate-600 dark:text-slate-300'}`}>
                <Bell size={20} /><span className="absolute top-1.5 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-950"></span>
              </button>
              <NotificationsPopup isOpen={isNotificationsOpen} onViewAll={handleViewAllNotifications} />
            </div>
          </div>
        </header>
        <ContentArea activeTab={activeTab} onPushView={handlePushView} sharedState={sharedState} />
      </div>
    </div>
  );
};

/* ==================================================================================================
 * MAIN APP CONTAINER
 * ================================================================================================== */
export default function SocialLayout() {
  // Global State
  const [activeTab, setActiveTab] = useState('feed');
  const [navStack, setNavStack] = useState(['feed']);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  const notificationRef = useRef(null);

  // Global Effects
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Click outside handler for shared Popups (Notification)
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isNotificationsOpen && notificationRef.current && !notificationRef.current.contains(event.target)) {
        setIsNotificationsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isNotificationsOpen]);

  // Navigation Helpers
  const handleNavClick = (id) => {
    if (id === activeTab && navStack.length === 1) return;
    setNavStack([id]);
    setActiveTab(id);
  };

  const handlePushView = (viewId) => {
    setNavStack(prev => [...prev, viewId]);
    setActiveTab(viewId);
  };

  const handleBack = () => {
    if (navStack.length > 1) {
      const newStack = [...navStack];
      newStack.pop();
      setNavStack(newStack);
      setActiveTab(newStack[newStack.length - 1]);
    }
  };

  const handleViewAllNotifications = () => {
    handlePushView('notifications');
    setIsNotificationsOpen(false);
  };

  const handleSettingsClick = (id) => {
      handlePushView(id);
      setIsUserMenuOpen(false);
  };

  // Shared state object to pass down
  const sharedState = {
    isNotificationsOpen, setIsNotificationsOpen, notificationRef, handleViewAllNotifications,
    isUserMenuOpen, setIsUserMenuOpen,
    isDark: isDarkMode, // Fixed property mapping
    toggleTheme: () => setIsDarkMode(!isDarkMode),
    handleSettingsClick
  };

  return (
    <div className="flex h-screen w-full bg-slate-50 dark:bg-slate-950 font-sans text-slate-900 dark:text-white overflow-hidden selection:bg-blue-100 selection:text-blue-900">
      <MobileLayout 
        navStack={navStack} 
        activeTab={activeTab} 
        handleBack={handleBack} 
        handleNavClick={handleNavClick} 
        handlePushView={handlePushView}
        sharedState={sharedState}
      />
      <DesktopLayout 
        navStack={navStack} 
        activeTab={activeTab} 
        handleBack={handleBack} 
        handleNavClick={handleNavClick} 
        handlePushView={handlePushView}
        sharedState={sharedState}
      />
      
      {/* Global Styles */}
      <style>{`
        @keyframes fade-in { 0% { opacity: 0; } 100% { opacity: 1; } }
        .animate-fade-in { animation: fade-in 0.2s ease-out forwards; }
        
        @keyframes pop-in-center {
          0% { transform: translate(50%, 50%) scale(0); opacity: 0; }
          80% { transform: translate(50%, 50%) scale(1.1); opacity: 1; }
          100% { transform: translate(50%, 50%) scale(1); opacity: 1; }
        }
        .animate-pop-in { animation: pop-in-center 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) both; }
        
        .pb-safe { padding-bottom: env(safe-area-inset-bottom); }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}
