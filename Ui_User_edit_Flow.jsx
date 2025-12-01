import React, { useState, useEffect, useRef } from 'react';
import { 
  Home, Compass, MessageCircle, Film, User, Construction, Bell, 
  Plus, Settings, LogOut, Moon, Sun, Phone, LayoutGrid, Heart, 
  MessageSquare, UserPlus, ArrowLeft, MapPin, Link2, Calendar, 
  Grid3X3, Tag, MoreHorizontal, Image as ImageIcon, Share2, Archive,
  Camera, Check, X
} from 'lucide-react';

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
  { id: 'post-detail', label: 'Post Detail', icon: MessageSquare, color: 'text-slate-500', bg: 'bg-slate-500' },
  { id: 'edit-profile', label: 'Edit Profile', icon: User, color: 'text-slate-500', bg: 'bg-slate-500' },
];

const NOTIFICATIONS = [
  { id: 1, type: 'like', user: 'Sarah Wilson', text: 'liked your post.', time: '2m ago', read: false },
  { id: 2, type: 'comment', user: 'Mike Chen', text: 'commented: "Amazing shot! 📸"', time: '15m ago', read: false },
  { id: 3, type: 'follow', user: 'Alex Morgan', text: 'started following you.', time: '1h ago', read: true },
];

// Initial Data for Profile
const INITIAL_PROFILE_DATA = {
  name: 'Jane Doe',
  handle: '@jane_design',
  bio: 'Digital Designer & Photographer 📸 capturing life one pixel at a time. Based in NYC 🗽. Creating UI/UX magic ✨',
  location: 'New York, USA',
  website: 'janedoe.design',
  joined: 'September 2021',
  followers: '12.5k',
  following: '842',
  posts_count: '148',
  cover_image: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80',
  avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
  posts: Array(12).fill(null).map((_, i) => ({
    id: i,
    image: `https://images.unsplash.com/photo-${[
      '1554080353-a576cf803bda', '1508739773445-be4ff4218fb0', '1497215728101-856f4ea42174',
      '1515378791036-0648a3ef77b2', '1534528741775-53994a69daeb', '1504932414104-b79d2dbc04f6',
      '1488161628813-99bbb51325eb', '1611024843401-463cd44093c3', '1529156069898-49953e39b3ac'
    ][i % 9]}?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80`,
    likes: Math.floor(Math.random() * 500) + 50,
    comments: Math.floor(Math.random() * 50) + 5
  }))
};


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

const UserMenuPopup = ({ isOpen, isDark, toggleTheme, positionClass, onNavigate, user }) => {
  if (!isOpen) return null;
  return (
    <div className={`absolute z-50 w-64 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 p-2 animate-fade-in ${positionClass}`}>
      <div className="px-3 py-2 mb-1">
        <p className="text-sm font-bold text-slate-900 dark:text-white">{user.name}</p>
        <p className="text-xs text-slate-500 truncate">{user.handle}</p>
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

/* ==================================================================================================
 * NEW: DEDICATED EDIT PROFILE PAGE
 * ================================================================================================== */

const EditProfileView = ({ sharedState, onBack }) => {
  const { profile, updateProfile } = sharedState;
  const [formData, setFormData] = useState(profile);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setIsLoading(true);
    // Simulate network request
    setTimeout(() => {
      updateProfile(formData);
      setIsLoading(false);
      onBack();
    }, 1000);
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-4 md:p-8 animate-fade-in pb-24">
       
       {/* Header */}
       <div className="flex items-center justify-between mb-8">
          <div>
             <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Edit Profile</h2>
             <p className="text-slate-500 dark:text-slate-400 mt-1">Update your personal details and public profile information.</p>
          </div>
          <button onClick={onBack} className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-500 transition-colors">
             <X size={24} />
          </button>
       </div>

       {/* Main Card */}
       <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-12 divide-y md:divide-y-0 md:divide-x divide-slate-100 dark:divide-slate-800">
             
             {/* Left Column: Identity */}
             <div className="md:col-span-4 p-8 flex flex-col items-center bg-slate-50/50 dark:bg-slate-950/30">
                <div className="w-48 h-48 rounded-full border-4 border-white dark:border-slate-800 overflow-hidden bg-slate-200 dark:bg-slate-800 shadow-xl mb-8">
                   <img src={formData.avatar} alt="Avatar" className="w-full h-full object-cover" />
                </div>
                
                <div className="w-full space-y-6">
                   <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-400 ml-1">Display Name</label>
                      <input 
                        type="text" 
                        name="name" 
                        value={formData.name} 
                        onChange={handleInputChange} 
                        className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 font-bold text-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-center"
                        placeholder="Your Name"
                      />
                   </div>
                   <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-400 ml-1 text-center block">Handle</label>
                      <div className="relative">
                         <span className="absolute left-0 top-0 bottom-0 w-10 flex items-center justify-center text-slate-400 font-bold border-r border-slate-100 dark:border-slate-800">@</span>
                         <input 
                           type="text" 
                           name="handle" 
                           value={formData.handle.replace('@', '')} 
                           onChange={(e) => setFormData({...formData, handle: '@' + e.target.value})} 
                           className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl pl-12 pr-4 py-3 font-medium text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                           placeholder="username"
                         />
                      </div>
                   </div>
                </div>
             </div>

             {/* Right Column: Details */}
             <div className="md:col-span-8 p-8 flex flex-col justify-between">
                <div className="space-y-8">
                   <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-400 ml-1">Bio</label>
                      <textarea 
                        name="bio" 
                        value={formData.bio} 
                        onChange={handleInputChange} 
                        rows={6}
                        className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-5 py-4 text-slate-700 dark:text-slate-300 leading-relaxed focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all resize-none text-base"
                        placeholder="Tell the world about yourself..."
                      />
                   </div>

                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                         <label className="text-xs font-bold uppercase tracking-wider text-slate-400 ml-1">Location</label>
                         <div className="relative">
                            <MapPin className="absolute left-4 top-3.5 text-slate-400" size={18} />
                            <input 
                              type="text" 
                              name="location" 
                              value={formData.location} 
                              onChange={handleInputChange} 
                              className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl pl-11 pr-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium"
                              placeholder="City, Country"
                            />
                         </div>
                      </div>
                      <div className="space-y-2">
                         <label className="text-xs font-bold uppercase tracking-wider text-slate-400 ml-1">Website</label>
                         <div className="relative">
                            <Link2 className="absolute left-4 top-3.5 text-slate-400" size={18} />
                            <input 
                              type="text" 
                              name="website" 
                              value={formData.website} 
                              onChange={handleInputChange} 
                              className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl pl-11 pr-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium"
                              placeholder="yourwebsite.com"
                            />
                         </div>
                      </div>
                   </div>
                </div>

                <div className="flex items-center justify-end gap-4 pt-10 mt-2 border-t border-slate-100 dark:border-slate-800/50">
                   <button 
                     onClick={onBack} 
                     disabled={isLoading}
                     className="px-6 py-3 rounded-xl font-bold text-slate-500 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800 transition-colors text-sm disabled:opacity-50"
                   >
                      Cancel
                   </button>
                   <button 
                     onClick={handleSave} 
                     disabled={isLoading}
                     className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold text-sm hover:bg-blue-700 transition-all shadow-xl shadow-blue-500/20 active:scale-95 flex items-center gap-2 disabled:opacity-80 disabled:cursor-not-allowed disabled:active:scale-100"
                   >
                      {isLoading ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          <span>Saving...</span>
                        </>
                      ) : (
                        <>
                          <Check size={18} /> Save Changes
                        </>
                      )}
                   </button>
                </div>
             </div>
          </div>
       </div>
    </div>
  );
};

/* ==================================================================================================
 * MODIFIED: PROFILE PAGE COMPONENT (READ ONLY WITH EDIT BUTTON)
 * ================================================================================================== */

const ProfileView = ({ sharedState, onEdit }) => {
  const { profile } = sharedState;
  const [activeTab, setActiveTab] = useState('posts');

  // Tab Component Helper
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
      {/* 1. Header Section */}
      <div className="relative mb-4 md:mb-8 pt-4 md:pt-8">
        {/* Profile Info Container */}
        <div className="px-4 md:px-8">
          <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-4 md:gap-8 items-start relative z-10">
            
            {/* Avatar */}
            <div className="relative group flex-shrink-0 md:row-span-3">
              <div className="w-24 h-24 md:w-36 md:h-36 rounded-full border-4 border-white dark:border-slate-950 overflow-hidden bg-white dark:bg-slate-900 shadow-lg relative">
                <img src={profile.avatar} alt="Profile" className="w-full h-full object-cover" />
              </div>
              
              <button className="absolute bottom-1 right-1 md:bottom-2 md:right-2 bg-blue-500 text-white p-1.5 md:p-2 rounded-full border-2 border-white dark:border-slate-950 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity">
                <Plus size={16} strokeWidth={3} />
              </button>
            </div>

            {/* Actions & Names */}
            <div className="min-w-0 md:mt-2">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-3 md:gap-4">
                <div className="flex-1 min-w-0">
                  <h2 className="text-xl md:text-3xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    {profile.name}
                    <span className="text-blue-500"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg></span>
                  </h2>
                  <p className="text-xs md:text-base text-slate-500 dark:text-slate-400 font-medium">{profile.handle}</p>
                </div>
                
                {/* User Account Buttons */}
                <div className="flex items-center gap-2 md:gap-3">
                  <button onClick={onEdit} className="px-3 md:px-6 py-1.5 md:py-2 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white rounded-lg md:rounded-xl font-bold text-xs md:text-sm hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors border border-slate-200 dark:border-slate-700">
                    Edit
                  </button>
                  <button className="px-3 md:px-6 py-1.5 md:py-2 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white rounded-lg md:rounded-xl font-bold text-xs md:text-sm hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors border border-slate-200 dark:border-slate-700">
                    Share
                  </button>
                  <button className="p-1.5 md:p-2 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white rounded-lg md:rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors border border-slate-200 dark:border-slate-700">
                      <Settings size={18} className="md:w-5 md:h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Stats Row */}
            <div className="col-span-2 md:col-span-1 flex items-center gap-6 md:gap-10">
              <div className="flex items-baseline gap-1">
                <span className="font-bold text-slate-900 dark:text-white text-lg">{profile.posts_count}</span>
                <span className="text-slate-500 text-sm">posts</span>
              </div>
              <div className="flex items-baseline gap-1 cursor-pointer hover:opacity-70">
                <span className="font-bold text-slate-900 dark:text-white text-lg">{profile.followers}</span>
                <span className="text-slate-500 text-sm">followers</span>
              </div>
              <div className="flex items-baseline gap-1 cursor-pointer hover:opacity-70">
                <span className="font-bold text-slate-900 dark:text-white text-lg">{profile.following}</span>
                <span className="text-slate-500 text-sm">following</span>
              </div>
            </div>

            {/* Bio & Details */}
            <div className="col-span-2 md:col-span-1 max-w-2xl">
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm md:text-base whitespace-pre-wrap">
                {profile.bio}
              </p>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-4 text-xs md:text-sm text-slate-500 dark:text-slate-400">
                <div className="flex items-center gap-1.5">
                  <MapPin size={16} /> {profile.location}
                </div>
                {profile.website && (
                  <div className="flex items-center gap-1.5 hover:text-blue-500 cursor-pointer transition-colors">
                    <Link2 size={16} /> {profile.website}
                  </div>
                )}
                <div className="flex items-center gap-1.5">
                  <Calendar size={16} /> Joined {profile.joined}
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* 2. Navigation Tabs */}
      <div className="sticky top-0 bg-slate-50/95 dark:bg-slate-950/95 backdrop-blur-sm z-20 border-b border-slate-200 dark:border-slate-800 px-4 md:px-8 mb-4">
        <div className="flex items-center max-w-md">
          <TabButton id="posts" label="Posts" icon={Grid3X3} />
          <TabButton id="media" label="Media" icon={ImageIcon} />
          <TabButton id="tagged" label="Tagged" icon={Tag} />
        </div>
      </div>

      {/* 3. Content Grid */}
      <div className="px-1 md:px-8">
        {activeTab === 'posts' ? (
          <div className="grid grid-cols-3 gap-0.5 md:gap-4 lg:gap-6">
            {profile.posts.map((post) => (
              <div key={post.id} className="relative group aspect-square bg-slate-200 dark:bg-slate-800 overflow-hidden md:rounded-xl cursor-pointer">
                <img 
                  src={post.image} 
                  alt="Post" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="flex items-center gap-6 text-white font-bold">
                    <div className="flex items-center gap-2">
                      <Heart className="fill-white" size={20} /> {post.likes}
                    </div>
                    <div className="flex items-center gap-2">
                      <MessageSquare className="fill-white" size={20} /> {post.comments}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-slate-400">
            <div className="w-20 h-20 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-4">
              {activeTab === 'media' ? <ImageIcon size={32} /> : <Tag size={32} />}
            </div>
            <h3 className="font-bold text-lg text-slate-900 dark:text-white">No {activeTab} yet</h3>
            <p className="text-sm">Posts you {activeTab === 'media' ? 'upload' : 'are tagged in'} will appear here.</p>
          </div>
        )}
      </div>
    </div>
  );
};

/* ==================================================================================================
 * MODIFIED CONTENT AREA (Wraps Views)
 * ================================================================================================== */

const ContentArea = ({ activeTab, onPushView, onBack, sharedState }) => {
  if (activeTab === 'edit-profile') {
    return (
      <div className="flex-1 overflow-y-auto overflow-x-hidden scroll-smooth relative h-full">
         <EditProfileView sharedState={sharedState} onBack={onBack} />
      </div>
    );
  }

  // If active tab is Profile, render profile
  if (activeTab === 'profile') {
    return (
      <div className="flex-1 overflow-y-auto overflow-x-hidden scroll-smooth relative h-full">
        <ProfileView sharedState={sharedState} onEdit={() => onPushView('edit-profile')} />
      </div>
    );
  }

  // Otherwise, render existing placeholder
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
      <ContentArea activeTab={activeTab} onPushView={handlePushView} onBack={handleBack} sharedState={sharedState} />

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
  const { isNotificationsOpen, setIsNotificationsOpen, notificationRef, handleViewAllNotifications, isUserMenuOpen, setIsUserMenuOpen, isDark, toggleTheme, handleSettingsClick, profile } = sharedState;
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
                <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-700 flex-shrink-0 overflow-hidden">
                   <img src={profile.avatar} alt="User" className="w-full h-full object-cover" />
                </div>
                <div className={`overflow-hidden text-left transition-all duration-300 ${isSidebarCollapsed ? 'hidden' : 'block'}`}>
                  <p className="font-bold text-sm truncate">{profile.name}</p>
                  <p className="text-xs text-slate-500 truncate">{profile.handle}</p>
                </div>
              </div>
            </button>
            <UserMenuPopup isOpen={isUserMenuOpen} isDark={isDark} toggleTheme={toggleTheme} positionClass="bottom-full left-0 mb-4" onNavigate={handleSettingsClick} user={profile} />
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
              <h1 className="text-xl font-bold capitalize text-slate-900 dark:text-white mr-8">{activeTab}</h1>
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
        <ContentArea activeTab={activeTab} onPushView={handlePushView} onBack={handleBack} sharedState={sharedState} />
      </div>
    </div>
  );
};

/* ==================================================================================================
 * MAIN APP CONTAINER
 * ================================================================================================== */
export default function SocialLayout() {
  // Global State
  const [activeTab, setActiveTab] = useState('profile'); // Default to profile for demo
  const [navStack, setNavStack] = useState(['profile']); // Default to profile stack
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  // Lifted Profile State
  const [profile, setProfile] = useState(INITIAL_PROFILE_DATA);
  const updateProfile = (newProfile) => setProfile(newProfile);
  
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
    handleSettingsClick,
    profile, updateProfile // New profile props
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
