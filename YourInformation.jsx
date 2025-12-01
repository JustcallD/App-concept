import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, Search, Activity, MessageCircle, MapPin, 
  User, Users, Shield, Globe, Megaphone, FileText, 
  FileDown, ArrowRightLeft, Clock, ImageIcon, Cloud, 
  Server, CheckCircle2, Loader2, X, ChevronRight,
  Moon, Sun, Database, Lock
} from 'lucide-react';

/* ==================================================================================================
 * SHARED COMPONENTS
 * ================================================================================================== */

const Section = ({ title, children }) => (
  <div className="mb-6 animate-fade-in">
    {title && <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 px-4">{title}</h3>}
    <div className="bg-white dark:bg-slate-900 border-y md:border border-slate-200 dark:border-slate-800 md:rounded-2xl overflow-hidden">
      {children}
    </div>
  </div>
);

const Item = ({ icon: Icon, label, onClick, subText, detail, rightElement, isDestructive }) => {
  const Component = onClick ? 'button' : 'div';
  
  return (
    <Component 
      onClick={onClick} 
      className={`w-full flex items-center justify-between p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors border-b last:border-0 border-slate-100 dark:border-slate-800 text-left ${onClick ? 'active:bg-slate-100 dark:active:bg-slate-800 cursor-pointer' : ''}`}
    >
      <div className="flex items-center gap-3">
        {Icon && (
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isDestructive ? 'bg-red-50 text-red-500 dark:bg-red-900/20' : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'}`}>
            <Icon size={18} />
            </div>
        )}
        <div className="flex flex-col">
          <span className={`text-sm font-medium ${isDestructive ? 'text-red-600 dark:text-red-400' : 'text-slate-700 dark:text-slate-200'}`}>{label}</span>
          {subText && <span className="text-[10px] text-slate-400">{subText}</span>}
        </div>
      </div>
      <div className="flex items-center gap-2">
        {detail && <span className="text-xs text-slate-400 font-medium">{detail}</span>}
        {rightElement ? rightElement : (onClick && <ChevronRight size={18} className="text-slate-400" />)}
      </div>
    </Component>
  );
};

const Toast = ({ message }) => (
  <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-slate-900 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg z-50 flex items-center gap-2 animate-fade-in-up">
    <CheckCircle2 size={16} className="text-green-400" />
    {message}
  </div>
);

const Header = ({ title, onBack, rightAction }) => (
    <header className="sticky top-0 z-10 bg-slate-50/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-4 h-14 flex items-center justify-between">
        <div className="flex items-center">
            <button onClick={onBack} className="p-2 -ml-2 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-full transition-colors">
                <ArrowLeft size={20} className="text-slate-700 dark:text-slate-200" />
            </button>
            <h1 className="text-lg font-bold ml-2">{title}</h1>
        </div>
        {rightAction}
    </header>
);

/* ==================================================================================================
 * SUB-SCREENS: ACCESS INFORMATION DETAILS (Newly created to make it workable)
 * ================================================================================================== */

// A generic screen to display lists of data for categories like "Location History", "Messages", etc.
const GenericDataCategoryScreen = ({ onBack, categoryTitle, dataItems, icon: Icon }) => {
    return (
        <div className="animate-slide-in">
            <Header title={categoryTitle} onBack={onBack} />
            <main className="max-w-2xl mx-auto w-full p-4 md:p-6">
                <div className="flex flex-col items-center justify-center mb-6">
                    <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-3">
                        <Icon size={32} className="text-slate-500" />
                    </div>
                    <p className="text-sm text-slate-500 text-center px-4">
                        This is a record of your {categoryTitle.toLowerCase()} stored on SocialApp.
                    </p>
                </div>

                <Section title="Recent Activity">
                    {dataItems.map((item, idx) => (
                        <div key={idx} className="p-4 border-b last:border-0 border-slate-100 dark:border-slate-800">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">{item.title}</h4>
                                    <p className="text-xs text-slate-500 mt-1">{item.desc}</p>
                                </div>
                                <span className="text-[10px] text-slate-400 whitespace-nowrap ml-2">{item.date}</span>
                            </div>
                        </div>
                    ))}
                    {dataItems.length === 0 && (
                        <div className="p-8 text-center text-slate-400 text-sm">No records found.</div>
                    )}
                </Section>
            </main>
        </div>
    );
};

/* ==================================================================================================
 * SUB-SCREENS: MAIN INFORMATION FLOWS
 * ================================================================================================== */

const AccessInfoScreen = ({ onBack, navigateToCategory }) => (
    <div className="animate-slide-in">
        <Header title="Access Your Information" onBack={onBack} />
        <main className="max-w-2xl mx-auto w-full p-4 md:p-6">
            <div className="px-4 mb-4">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                    <input 
                        type="text" 
                        placeholder="Search information..." 
                        className="w-full bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white pl-10 pr-4 py-2 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                    />
                </div>
            </div>

            <Section title="Your Activity">
                <Item icon={Activity} label="Activity Log" onClick={() => navigateToCategory('activity_log')} />
                <Item icon={MessageCircle} label="Messages" onClick={() => navigateToCategory('messages')} />
                <Item icon={MapPin} label="Location History" onClick={() => navigateToCategory('location')} />
            </Section>

            <Section title="Personal Information">
                <Item icon={User} label="Profile Information" onClick={() => navigateToCategory('profile_info')} />
                <Item icon={Users} label="Friends and Followers" onClick={() => navigateToCategory('connections')} />
            </Section>

            <Section title="Logged Information">
                <Item icon={Shield} label="Security and Login" onClick={() => navigateToCategory('security_logs')} />
                <Item icon={Globe} label="Apps and Websites" onClick={() => navigateToCategory('apps')} />
                <Item icon={Megaphone} label="Ads Information" onClick={() => navigateToCategory('ads_info')} />
            </Section>
        </main>
    </div>
);

const TransferDataScreen = ({ onBack, showToast }) => {
    const [step, setStep] = useState(1);
    const [destination, setDestination] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleNext = () => {
        if (step === 1 && destination) {
            setStep(2);
        } else if (step === 2) {
            setIsLoading(true);
            setTimeout(() => {
                setIsLoading(false);
                setStep(3);
                showToast('Transfer started successfully');
            }, 2000);
        }
    };

    return (
        <div className="animate-slide-in">
            <Header title="Transfer Information" onBack={onBack} />
            <main className="max-w-2xl mx-auto w-full p-4 md:p-6">
                {step === 1 && (
                    <>
                         <p className="text-sm text-slate-500 mb-6 px-4">
                            Choose a destination to transfer a copy of your photos, videos, or posts.
                        </p>
                        <Section title="Choose Destination">
                            {[
                                { id: 'google_photos', label: 'Google Photos', icon: ImageIcon },
                                { id: 'dropbox', label: 'Dropbox', icon: Cloud },
                                { id: 'koofr', label: 'Koofr', icon: Server }
                            ].map(opt => (
                                <button key={opt.id} onClick={() => setDestination(opt.id)} className={`w-full flex items-center justify-between p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors border-b last:border-0 border-slate-100 dark:border-slate-800 ${destination === opt.id ? 'bg-blue-50 dark:bg-blue-900/10' : ''}`}>
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                                            <opt.icon size={18} className="text-slate-500" />
                                        </div>
                                        <span className="font-medium text-sm text-slate-900 dark:text-white">{opt.label}</span>
                                    </div>
                                    {destination === opt.id && <CheckCircle2 size={20} className="text-blue-600" />}
                                </button>
                            ))}
                        </Section>
                    </>
                )}

                {step === 2 && (
                    <>
                        <div className="px-4 mb-6">
                            <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Confirm Transfer</h2>
                            <p className="text-sm text-slate-500">
                                You are about to transfer your photos and videos to <strong>{destination.replace('_', ' ').toUpperCase()}</strong>.
                            </p>
                        </div>
                        <Section>
                            <div className="p-4 flex items-center gap-3">
                                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-full flex items-center justify-center">
                                    <ImageIcon size={20} />
                                </div>
                                <div className="flex flex-col">
                                    <span className="font-bold text-sm text-slate-900 dark:text-white">All Photos and Videos</span>
                                    <span className="text-xs text-slate-500">1,240 items • 4.2 GB</span>
                                </div>
                            </div>
                        </Section>
                    </>
                )}

                {step === 3 && (
                     <div className="flex flex-col items-center justify-center py-10 px-4 text-center">
                        <div className="w-20 h-20 bg-green-50 dark:bg-green-900/20 rounded-full flex items-center justify-center mb-6 text-green-600">
                            <CheckCircle2 size={40} />
                        </div>
                        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Transfer Started</h2>
                        <p className="text-sm text-slate-500 mb-8">
                            We've started transferring your copy. We'll notify you when complete.
                        </p>
                        <button onClick={onBack} className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-6 py-3 rounded-xl text-sm font-bold shadow-lg">
                            Done
                        </button>
                     </div>
                )}

                {step < 3 && (
                    <div className="px-4 mt-6">
                        <button 
                            onClick={handleNext} 
                            disabled={!destination || isLoading}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-colors shadow-lg shadow-blue-500/30 disabled:opacity-50 flex items-center justify-center gap-2"
                        >
                            {isLoading && <Loader2 size={18} className="animate-spin" />}
                            {isLoading ? 'Connecting...' : (step === 1 ? 'Next' : 'Start Transfer')}
                        </button>
                    </div>
                )}
            </main>
        </div>
    );
};

const SearchHistoryScreen = ({ onBack, history, setHistory }) => {
    return (
        <div className="animate-slide-in">
            <Header 
                title="Search History" 
                onBack={onBack}
                rightAction={history.length > 0 && (
                    <button onClick={() => setHistory([])} className="text-red-600 font-semibold text-sm hover:bg-red-50 dark:hover:bg-red-900/20 px-3 py-1.5 rounded-lg transition-colors">
                        Clear All
                    </button>
                )}
            />
            <main className="max-w-2xl mx-auto w-full p-4 md:p-6">
                {history.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 text-slate-400">
                        <Clock size={48} className="mb-4 opacity-50" />
                        <p className="text-sm font-medium">No search history</p>
                    </div>
                ) : (
                    <Section>
                        {history.map((term, i) => (
                            <Item 
                                key={i} icon={Clock} label={term}
                                rightElement={
                                    <button onClick={() => setHistory(h => h.filter((_, idx) => idx !== i))} className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
                                        <X size={16} />
                                    </button>
                                }
                            />
                        ))}
                    </Section>
                )}
            </main>
        </div>
    );
};

const AdActivityScreen = ({ onBack, ads }) => (
    <div className="animate-slide-in">
        <Header title="Ad Activity" onBack={onBack} />
        <main className="max-w-2xl mx-auto w-full p-4 md:p-6">
            <div className="flex gap-2 px-4 mb-6 overflow-x-auto pb-2">
                <button className="px-4 py-1.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-sm font-bold rounded-full whitespace-nowrap">Recently Viewed</button>
                <button className="px-4 py-1.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-sm font-medium rounded-full whitespace-nowrap">Saved</button>
            </div>

            <Section title="Recent Ads">
                {ads.map((ad) => (
                    <div key={ad.id} className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-start gap-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                        <div className="w-16 h-16 bg-slate-200 dark:bg-slate-800 rounded-lg flex items-center justify-center shrink-0">
                            <ImageIcon size={24} className="text-slate-400" />
                        </div>
                        <div className="flex-1">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 block">Sponsored</span>
                            <h3 className="font-bold text-sm text-slate-900 dark:text-white mb-0.5">{ad.advertiser}</h3>
                            <p className="text-xs text-slate-500 mb-2">{ad.title}</p>
                            <span className="text-[10px] text-slate-400">{ad.time}</span>
                        </div>
                        <button className="text-blue-600 font-semibold text-xs bg-blue-50 dark:bg-blue-900/20 px-3 py-1.5 rounded-lg">
                            {ad.action}
                        </button>
                    </div>
                ))}
            </Section>
        </main>
    </div>
);

const DownloadDataScreen = ({ onBack, info, setInfo, showToast }) => {
    const handleRequest = () => {
        setInfo(prev => ({ ...prev, downloadStatus: 'requested' }));
        showToast("Download requested. Notification sent.");
        setTimeout(() => {
            setInfo(prev => ({ ...prev, downloadStatus: 'ready' }));
            showToast("Your information is ready.");
        }, 2500);
    };

    return (
        <div className="animate-slide-in">
            <Header title="Download Information" onBack={onBack} />
            <main className="max-w-2xl mx-auto w-full p-4 md:p-6">
                <div className="flex flex-col items-center text-center mb-8 px-4">
                    <div className="w-20 h-20 bg-blue-50 dark:bg-blue-900/20 rounded-full flex items-center justify-center mb-4 text-blue-600">
                        <FileDown size={40} />
                    </div>
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Request a copy</h2>
                    <p className="text-sm text-slate-500">
                        You can request a copy of your information at any time. When your file is ready, you'll have 4 days to download it.
                    </p>
                </div>

                {info.downloadStatus === 'idle' && (
                     <div className="px-4">
                        <button onClick={handleRequest} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-colors shadow-lg shadow-blue-500/30">
                            Request Download
                        </button>
                     </div>
                )}

                {info.downloadStatus === 'requested' && (
                    <Section>
                         <div className="p-6 flex flex-col items-center justify-center">
                            <Loader2 size={32} className="text-blue-600 animate-spin mb-4" />
                            <h3 className="font-bold text-slate-900 dark:text-white">Creating file...</h3>
                            <p className="text-xs text-slate-500 mt-2">This may take a few minutes.</p>
                         </div>
                    </Section>
                )}

                {info.downloadStatus === 'ready' && (
                     <Section>
                         <div className="p-4 flex items-center justify-between">
                            <div className="flex flex-col">
                                <span className="font-bold text-slate-900 dark:text-white">socialapp_data.zip</span>
                                <span className="text-xs text-slate-500">45MB • Expires in 4 days</span>
                            </div>
                            <button className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-4 py-2 rounded-lg text-sm font-bold">
                                Download
                            </button>
                         </div>
                    </Section>
                )}
            </main>
        </div>
    )
}

/* ==================================================================================================
 * SCREEN: INFO HUB (THE NEW MAIN SCREEN FOR THIS MODULE)
 * ================================================================================================== */

const InfoScreen = ({ onBack, info, setInfo, history, setHistory, navigate, adActivity }) => (
  <div className="animate-slide-in">
    <Header title="Your Information" onBack={onBack} />
    <main className="max-w-2xl mx-auto w-full p-4 md:p-6">
      <Section title="Management">
        <Item 
            icon={FileText} label="Access your information" 
            subText="View your information by category" 
            onClick={() => navigate('access_info')}
        />
        <Item 
            icon={FileDown} label="Download your information" 
            subText={info.downloadStatus === 'ready' ? "File ready to download" : "Download a copy of your information"}
            detail={info.downloadStatus === 'ready' ? "1 File" : null}
            onClick={() => navigate('download_data')}
        />
        <Item 
            icon={ArrowRightLeft} label="Transfer a copy of your information" 
            subText="Transfer your photos, videos, or posts" 
            onClick={() => navigate('transfer_data')}
        />
      </Section>
      <Section title="History">
        <Item 
            icon={Clock} label="Search History" 
            subText="View and clear recent searches" 
            detail={history.length > 0 ? `${history.length} items` : 'Empty'}
            onClick={() => navigate('search_history')} 
        />
        <Item 
            icon={Megaphone} label="Ad Activity" 
            subText="See ads you've interacted with" 
            detail={adActivity.length > 0 ? `${adActivity.length} items` : null}
            onClick={() => navigate('ad_activity')}
        />
      </Section>
    </main>
  </div>
);

/* ==================================================================================================
 * MAIN APP COMPONENT
 * ================================================================================================== */

export default function SettingsScreen() {
  const [isDark, setIsDark] = useState(false);
  const [currentScreen, setCurrentScreen] = useState('main'); 
  const [toastMessage, setToastMessage] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);

  // --- STATE ---
  const [info, setInfo] = useState({ downloadStatus: 'idle' });
  const [history, setHistory] = useState(['react tutorials', 'ui design', 'lucide icons', 'tailwind css']);
  const [adActivity, setAdActivity] = useState([
      { id: 1, advertiser: 'TechStart', title: 'Boost your startup', action: 'Learn More', time: '1h ago' },
      { id: 2, advertiser: 'GreenLife', title: 'Sustainable living tips', action: 'Shop Now', time: '5h ago' },
      { id: 3, advertiser: 'TravelGo', title: 'Flight discounts', action: 'Book Now', time: '1d ago' }
  ]);

  // Mock data generator for the generic "Access Category" screens
  const getCategoryData = (cat) => {
      const today = new Date().toLocaleDateString();
      switch(cat) {
          case 'activity_log': return { title: 'Activity Log', icon: Activity, data: [ {title: 'Liked a post', desc: 'You liked @johndoe\'s photo', date: 'Just now'}, {title: 'Commented', desc: 'You commented on "Travel Pics"', date: '2h ago'} ] };
          case 'messages': return { title: 'Messages', icon: MessageCircle, data: [ {title: 'Chat with Sarah', desc: 'Exchanged 5 messages', date: '10:30 AM'}, {title: 'Group: Weekend Plans', desc: 'You sent a photo', date: 'Yesterday'} ] };
          case 'location': return { title: 'Location History', icon: MapPin, data: [ {title: 'New Login', desc: 'San Francisco, CA', date: today}, {title: 'Tagged Location', desc: 'Central Park, NY', date: '2 days ago'} ] };
          case 'profile_info': return { title: 'Profile Information', icon: User, data: [ {title: 'Bio Updated', desc: 'Changed bio text', date: '1 week ago'}, {title: 'Profile Photo', desc: 'Updated profile picture', date: '1 month ago'} ] };
          case 'connections': return { title: 'Friends & Followers', icon: Users, data: [ {title: 'New Follower', desc: '@design_guru followed you', date: '5h ago'}, {title: 'Friend Request', desc: 'Sent to @mike_smith', date: 'Yesterday'} ] };
          case 'security_logs': return { title: 'Security Logs', icon: Shield, data: [ {title: 'Password Changed', desc: 'via Web', date: '3 months ago'}, {title: '2FA Enabled', desc: 'SMS Authentication', date: '1 year ago'} ] };
          case 'apps': return { title: 'Apps & Websites', icon: Globe, data: [ {title: 'Spotify', desc: 'Active access', date: 'Active'}, {title: 'Pinterest', desc: 'Expired access', date: 'Expired'} ] };
          case 'ads_info': return { title: 'Ads Information', icon: Megaphone, data: [ {title: 'Ad Topic', desc: 'Technology & Computing', date: 'Added'}, {title: 'Ad Topic', desc: 'Travel', date: 'Added'} ] };
          default: return { title: 'Information', icon: Database, data: [] };
      }
  };

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  const showToast = (msg) => {
      setToastMessage(msg);
      setTimeout(() => setToastMessage(''), 3000);
  };

  const handleNavigateToCategory = (catId) => {
      setSelectedCategory(catId);
      setCurrentScreen('generic_category_detail');
  };

  const renderScreen = () => {
      switch(currentScreen) {
          case 'info':
              return <InfoScreen 
                        onBack={() => setCurrentScreen('main')} 
                        info={info} setInfo={setInfo}
                        history={history} setHistory={setHistory}
                        adActivity={adActivity}
                        navigate={setCurrentScreen}
                     />;
          case 'access_info':
              return <AccessInfoScreen 
                        onBack={() => setCurrentScreen('info')} 
                        navigateToCategory={handleNavigateToCategory}
                     />;
          case 'generic_category_detail':
              const catData = getCategoryData(selectedCategory);
              return <GenericDataCategoryScreen 
                        onBack={() => setCurrentScreen('access_info')}
                        categoryTitle={catData.title}
                        dataItems={catData.data}
                        icon={catData.icon}
                     />;
          case 'download_data':
              return <DownloadDataScreen 
                        onBack={() => setCurrentScreen('info')}
                        info={info} setInfo={setInfo} showToast={showToast}
                     />;
          case 'transfer_data':
              return <TransferDataScreen 
                        onBack={() => setCurrentScreen('info')} showToast={showToast}
                     />;
          case 'search_history':
              return <SearchHistoryScreen 
                        onBack={() => setCurrentScreen('info')}
                        history={history} setHistory={setHistory}
                     />;
          case 'ad_activity':
              return <AdActivityScreen 
                        onBack={() => setCurrentScreen('info')} ads={adActivity}
                     />;
          default:
              return (
                <div className="animate-slide-in-reverse">
                    <header className="sticky top-0 z-10 bg-slate-50/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-4 h-14 flex items-center justify-between">
                        <h1 className="text-lg font-bold">Settings</h1>
                        <button onClick={toggleTheme} className="p-2 bg-slate-200 dark:bg-slate-800 rounded-full text-slate-600 dark:text-slate-300">
                             {isDark ? <Sun size={18}/> : <Moon size={18}/>}
                        </button>
                    </header>
                    <main className="max-w-2xl mx-auto w-full pt-6 px-4">
                        <Section title="Account">
                             <Item 
                                icon={Database} 
                                label="Your Information" 
                                subText="Access logs, history, download data" 
                                onClick={() => setCurrentScreen('info')} 
                             />
                        </Section>
                        <Section title="Preferences">
                             <Item icon={Lock} label="Privacy" detail="Private" />
                             <Item icon={Shield} label="Security" subText="Password managed externally" />
                        </Section>
                    </main>
                </div>
              );
      }
  };

  return (
    <div className={`min-h-screen bg-slate-50 dark:bg-slate-950 font-sans text-slate-900 dark:text-white transition-colors duration-200 relative ${isDark ? 'dark' : ''}`}>
        {renderScreen()}
        {toastMessage && <Toast message={toastMessage} />}
        <style>{`
            @keyframes fade-in { 0% { opacity: 0; transform: translateY(10px); } 100% { opacity: 1; transform: translateY(0); } }
            .animate-fade-in { animation: fade-in 0.3s ease-out forwards; }
            @keyframes slide-in { 0% { opacity: 0; transform: translateX(20px); } 100% { opacity: 1; transform: translateX(0); } }
            .animate-slide-in { animation: slide-in 0.3s ease-out forwards; }
            @keyframes slide-in-reverse { 0% { opacity: 0; transform: translateX(-20px); } 100% { opacity: 1; transform: translateX(0); } }
            .animate-slide-in-reverse { animation: slide-in-reverse 0.3s ease-out forwards; }
            @keyframes fade-in-up { 0% { opacity: 0; transform: translate(-50%, 20px); } 100% { opacity: 1; transform: translate(-50%, 0); } }
            .animate-fade-in-up { animation: fade-in-up 0.3s ease-out forwards; }
        `}</style>
    </div>
  );
}
