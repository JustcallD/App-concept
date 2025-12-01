import React, { useState, useEffect } from 'react';
import { 
  Moon, Sun, ChevronRight, Shield, 
  Bell, Languages, Accessibility, Volume2, 
  Archive, Bookmark, Heart, Clock, Activity, 
  Download, Lock, UserCheck, EyeOff, UserX, 
  Eye, HelpCircle, Smartphone, FileText, 
  Plus, LogOut, Megaphone, Info, UserPlus, 
  BarChart2, Zap, Trash2, Link, Sparkles,
  MapPin, ShoppingBag, Users, AlertTriangle, 
  Keyboard, Monitor, Globe, MessageCircle, 
  AtSign, Share, Hash, BellOff, BadgeCheck, 
  Baby, Save, Star, Slash, ZapOff, Award, 
  DollarSign, Image as ImageIcon, Share2, Repeat,
  ArrowLeft, User, Key, CreditCard, ShieldCheck,
  FileKey, Layers, LayoutGrid, Camera, Check,
  Mail, Phone, Calendar, FileDown, ArrowRightLeft,
  Smartphone as MobileIcon, X, Loader2, CheckCircle2, History,
  AlertCircle, Radio, ExternalLink, Search, Server, Cloud, 
  Laptop, ShieldAlert
} from 'lucide-react';

/* ==================================================================================================
 * SHARED COMPONENTS
 * ================================================================================================== */

// Shared Component: Section Container
const Section = ({ title, children }) => (
  <div className="mb-6 animate-fade-in">
    {title && <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 px-4">{title}</h3>}
    <div className="bg-white dark:bg-slate-900 border-y md:border border-slate-200 dark:border-slate-800 md:rounded-2xl overflow-hidden">
      {children}
    </div>
  </div>
);

// Shared Component: List Item
const Item = ({ icon: Icon, label, onClick, isToggle, detail, isDestructive, subText, rightElement }) => {
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
        {detail !== undefined && typeof detail !== 'boolean' && <span className="text-xs text-slate-400 font-medium">{detail}</span>}
        
        {rightElement ? rightElement : (
          isToggle ? (
              <div className={`w-11 h-6 rounded-full transition-colors flex items-center px-1 ${detail ? 'bg-blue-500' : 'bg-slate-300 dark:bg-slate-600'}`}>
              <div className={`w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${detail ? 'translate-x-5' : 'translate-x-0'}`} />
              </div>
          ) : (
             onClick && <ChevronRight size={18} className="text-slate-400" />
          )
        )}
      </div>
    </Component>
  );
};

// Toast Component
const Toast = ({ message, onClose }) => (
  <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-slate-900 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg z-50 flex items-center gap-2 animate-fade-in-up">
    <CheckCircle2 size={16} className="text-green-400" />
    {message}
  </div>
);

/* ==================================================================================================
 * SUB-SCREENS FOR ACCOUNT SETTINGS
 * ================================================================================================== */

/* --- 1. PASSWORD & SECURITY --- */

const ChangePasswordScreen = ({ onBack, onSave }) => {
    const [current, setCurrent] = useState('');
    const [newPass, setNewPass] = useState('');
    const [confirm, setConfirm] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = () => {
        setError('');
        if (!current || !newPass || !confirm) {
            setError('All fields are required.');
            return;
        }
        if (newPass !== confirm) {
            setError('New passwords do not match.');
            return;
        }
        if (newPass.length < 8) {
            setError('Password must be at least 8 characters.');
            return;
        }

        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            onSave();
        }, 1500);
    };

    return (
        <div className="animate-slide-in">
             <header className="sticky top-0 z-10 bg-slate-50/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-4 h-14 flex items-center justify-between">
                <div className="flex items-center">
                    <button onClick={onBack} className="p-2 -ml-2 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-full transition-colors">
                        <ArrowLeft size={20} className="text-slate-700 dark:text-slate-200" />
                    </button>
                    <h1 className="text-lg font-bold ml-2">Change Password</h1>
                </div>
                <button 
                    onClick={handleSubmit} 
                    disabled={isLoading}
                    className="text-blue-600 font-semibold text-sm hover:bg-blue-50 dark:hover:bg-blue-900/20 px-3 py-1.5 rounded-lg transition-colors disabled:opacity-50"
                >
                   {isLoading ? <Loader2 size={16} className="animate-spin" /> : 'Save'}
                </button>
            </header>
            <main className="max-w-2xl mx-auto w-full p-4 md:p-6">
                <Section title="Create new password">
                    <div className="p-4 border-b border-slate-100 dark:border-slate-800">
                        <input 
                            type="password" 
                            placeholder="Current password" 
                            value={current}
                            onChange={e => setCurrent(e.target.value)}
                            className="w-full bg-transparent outline-none text-slate-900 dark:text-white placeholder:text-slate-400"
                        />
                    </div>
                    <div className="p-4 border-b border-slate-100 dark:border-slate-800">
                        <input 
                            type="password" 
                            placeholder="New password" 
                            value={newPass}
                            onChange={e => setNewPass(e.target.value)}
                            className="w-full bg-transparent outline-none text-slate-900 dark:text-white placeholder:text-slate-400"
                        />
                    </div>
                     <div className="p-4">
                        <input 
                            type="password" 
                            placeholder="Re-type new password" 
                            value={confirm}
                            onChange={e => setConfirm(e.target.value)}
                            className="w-full bg-transparent outline-none text-slate-900 dark:text-white placeholder:text-slate-400"
                        />
                    </div>
                </Section>
                {error && (
                    <div className="flex items-center gap-2 text-red-500 text-xs px-4 animate-fade-in">
                        <AlertTriangle size={14} />
                        <span>{error}</span>
                    </div>
                )}
                <p className="text-xs text-slate-500 px-4 mt-4">
                    Your password must be at least 8 characters long and should include a combination of numbers, letters, and special characters.
                </p>
            </main>
        </div>
    )
}

const LoginAlertsScreen = ({ onBack, security, setSecurity }) => {
    const toggleAlert = (type) => {
        setSecurity(prev => ({
            ...prev,
            [type]: !prev[type]
        }));
    };

    return (
        <div className="animate-slide-in">
            <header className="sticky top-0 z-10 bg-slate-50/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-4 h-14 flex items-center">
                <button onClick={onBack} className="p-2 -ml-2 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-full transition-colors">
                    <ArrowLeft size={20} className="text-slate-700 dark:text-slate-200" />
                </button>
                <h1 className="text-lg font-bold ml-2">Login Alerts</h1>
            </header>
            <main className="max-w-2xl mx-auto w-full p-4 md:p-6">
                <p className="text-sm text-slate-500 mb-6 px-4">
                    We'll send you a notification if we notice a login from an unrecognized device or browser.
                </p>
                <Section>
                    <Item 
                        icon={Bell} 
                        label="In-app notifications" 
                        isToggle 
                        detail={security.loginAlertsInApp} 
                        onClick={() => toggleAlert('loginAlertsInApp')}
                    />
                    <Item 
                        icon={Mail} 
                        label="Email" 
                        isToggle 
                        detail={security.loginAlertsEmail} 
                        subText="john@example.com"
                        onClick={() => toggleAlert('loginAlertsEmail')}
                    />
                </Section>
            </main>
        </div>
    );
};

const RecentEmailsScreen = ({ onBack }) => {
    const emails = [
        { id: 1, subject: 'New login on Windows', time: '2 hours ago', type: 'security' },
        { id: 2, subject: 'Did you just reset your password?', time: '3 months ago', type: 'security' },
        { id: 3, subject: 'Welcome to SocialApp Creators', time: '1 year ago', type: 'other' },
    ];

    return (
        <div className="animate-slide-in">
            <header className="sticky top-0 z-10 bg-slate-50/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-4 h-14 flex items-center">
                <button onClick={onBack} className="p-2 -ml-2 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-full transition-colors">
                    <ArrowLeft size={20} className="text-slate-700 dark:text-slate-200" />
                </button>
                <h1 className="text-lg font-bold ml-2">Recent Emails</h1>
            </header>
            <main className="max-w-2xl mx-auto w-full p-4 md:p-6">
                <p className="text-sm text-slate-500 mb-6 px-4">
                    Security emails we've sent you in the last 14 days.
                </p>
                <Section title="Security">
                    {emails.filter(e => e.type === 'security').map(e => (
                        <div key={e.id} className="p-4 border-b border-slate-100 dark:border-slate-800">
                            <h3 className="font-bold text-sm text-slate-900 dark:text-white mb-1">{e.subject}</h3>
                            <span className="text-xs text-slate-500">Sent to john@example.com • {e.time}</span>
                        </div>
                    ))}
                </Section>
                <Section title="Other">
                    {emails.filter(e => e.type === 'other').map(e => (
                        <div key={e.id} className="p-4 border-b border-slate-100 dark:border-slate-800 last:border-0">
                            <h3 className="font-bold text-sm text-slate-900 dark:text-white mb-1">{e.subject}</h3>
                            <span className="text-xs text-slate-500">Sent to john@example.com • {e.time}</span>
                        </div>
                    ))}
                </Section>
            </main>
        </div>
    );
};

const SecurityCheckupScreen = ({ onBack, security }) => {
    // Determine overall status based on security settings
    const issues = [];
    if (!security.twoFactor) issues.push({ id: 1, label: 'Turn on Two-Factor Authentication', icon: ShieldAlert });
    if (!security.loginAlertsEmail && !security.loginAlertsInApp) issues.push({ id: 2, label: 'Turn on Login Alerts', icon: Bell });
    
    const isSecure = issues.length === 0;

    return (
        <div className="animate-slide-in">
            <header className="sticky top-0 z-10 bg-slate-50/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-4 h-14 flex items-center">
                <button onClick={onBack} className="p-2 -ml-2 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-full transition-colors">
                    <ArrowLeft size={20} className="text-slate-700 dark:text-slate-200" />
                </button>
                <h1 className="text-lg font-bold ml-2">Security Checkup</h1>
            </header>
            <main className="max-w-2xl mx-auto w-full p-6 flex flex-col items-center">
                <div className={`w-24 h-24 rounded-full flex items-center justify-center mb-6 transition-colors ${isSecure ? 'bg-green-50 dark:bg-green-900/20 text-green-600' : 'bg-orange-50 dark:bg-orange-900/20 text-orange-600'}`}>
                    <ShieldCheck size={48} />
                </div>
                <h2 className="text-xl font-bold text-center text-slate-900 dark:text-white mb-2">
                    {isSecure ? 'No issues found' : 'Security issues found'}
                </h2>
                <p className="text-center text-slate-500 text-sm mb-8">
                    {isSecure 
                        ? 'Good job! Your password is strong and login alerts are on.' 
                        : 'We found some actions you can take to strengthen your account security.'
                    }
                </p>

                <Section className="w-full">
                    <Item 
                        icon={Key} 
                        label="Your password is OK" 
                        rightElement={<CheckCircle2 size={20} className="text-green-500" />}
                    />
                    <Item 
                        icon={Shield} 
                        label={security.twoFactor ? "Two-factor authentication is on" : "Two-factor authentication is off"} 
                        rightElement={security.twoFactor ? <CheckCircle2 size={20} className="text-green-500" /> : <AlertTriangle size={20} className="text-orange-500" />}
                        subText={!security.twoFactor && "Recommended"}
                    />
                    <Item 
                        icon={Bell} 
                        label={security.loginAlertsInApp || security.loginAlertsEmail ? "Login alerts are on" : "Login alerts are off"}
                        rightElement={security.loginAlertsInApp || security.loginAlertsEmail ? <CheckCircle2 size={20} className="text-green-500" /> : <AlertTriangle size={20} className="text-orange-500" />}
                    />
                </Section>
                
                {!isSecure && (
                    <div className="w-full mt-4">
                        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 px-2">Recommended Actions</h3>
                        {issues.map(issue => (
                            <button key={issue.id} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-colors shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2 mb-3">
                                <issue.icon size={18} />
                                {issue.label}
                            </button>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
};

const SecurityScreen = ({ onBack, security, setSecurity, showToast, navigate }) => {
    
    const toggleSetting = (key, label) => {
        setSecurity(prev => {
            const newState = { ...prev, [key]: !prev[key] };
            showToast(`${label} ${newState[key] ? 'Enabled' : 'Disabled'}`);
            return newState;
        });
    };

    return (
        <div className="animate-slide-in">
            <header className="sticky top-0 z-10 bg-slate-50/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-4 h-14 flex items-center">
                <button onClick={onBack} className="p-2 -ml-2 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-full transition-colors">
                    <ArrowLeft size={20} className="text-slate-700 dark:text-slate-200" />
                </button>
                <h1 className="text-lg font-bold ml-2">Password and Security</h1>
            </header>
            <main className="max-w-2xl mx-auto w-full p-4 md:p-6">
                <Section title="Login">
                    <Item 
                        icon={Key} 
                        label="Change Password" 
                        subText={`Last changed ${security.lastPasswordChange}`}
                        onClick={() => navigate('change_password')} 
                    />
                    <Item 
                        icon={ShieldCheck} 
                        label="Two-Factor Authentication" 
                        isToggle 
                        detail={security.twoFactor} 
                        onClick={() => toggleSetting('twoFactor', 'Two-Factor Authentication')}
                    />
                    <Item 
                        icon={Save} 
                        label="Saved Login" 
                        isToggle
                        detail={security.savedLogin} 
                        subText="Remember account on this device" 
                        onClick={() => toggleSetting('savedLogin', 'Saved Login')}
                    />
                </Section>

                <Section title="Security Checks">
                    <Item 
                        icon={AlertTriangle} 
                        label="Login Alerts" 
                        detail={security.loginAlertsInApp || security.loginAlertsEmail ? "On" : "Off"}
                        subText="Get notified of new logins" 
                        onClick={() => navigate('login_alerts')}
                    />
                    <Item 
                        icon={Mail} 
                        label="Recent Emails" 
                        subText="Security emails from SocialApp" 
                        onClick={() => navigate('recent_emails')} 
                    />
                    <Item 
                        icon={Check} 
                        label="Security Checkup" 
                        subText="Review security issues" 
                        onClick={() => navigate('security_checkup')} 
                    />
                </Section>
            </main>
        </div>
    );
};

/* --- 2. PERSONAL DETAILS --- */

const EditFieldScreen = ({ onBack, label, value, onSave, type = "text" }) => {
    const [val, setVal] = useState(value);
    
    return (
        <div className="animate-slide-in">
             <header className="sticky top-0 z-10 bg-slate-50/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-4 h-14 flex items-center justify-between">
                <div className="flex items-center">
                    <button onClick={onBack} className="p-2 -ml-2 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-full transition-colors">
                        <ArrowLeft size={20} className="text-slate-700 dark:text-slate-200" />
                    </button>
                    <h1 className="text-lg font-bold ml-2">Edit {label}</h1>
                </div>
                <button 
                    onClick={() => onSave(val)}
                    className="text-blue-600 font-semibold text-sm hover:bg-blue-50 dark:hover:bg-blue-900/20 px-3 py-1.5 rounded-lg transition-colors"
                >
                    Done
                </button>
            </header>
            <main className="max-w-2xl mx-auto w-full p-4 md:p-6">
                <Section>
                    <div className="p-4">
                        <label className="text-xs font-bold text-slate-500 uppercase mb-2 block">{label}</label>
                        <input 
                            type={type} 
                            value={val}
                            onChange={(e) => setVal(e.target.value)}
                            className="w-full bg-transparent text-lg text-slate-900 dark:text-white outline-none placeholder:text-slate-400 font-medium" 
                            autoFocus
                        />
                    </div>
                </Section>
                <p className="text-xs text-slate-500 px-4">
                    This information is private and not visible on your public profile.
                </p>
            </main>
        </div>
    )
}

const IdentityConfirmationScreen = ({ onBack, onConfirm, status }) => {
    const [isLoading, setIsLoading] = useState(false);

    const handleConfirm = () => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            onConfirm();
        }, 2000);
    };

    return (
        <div className="animate-slide-in">
            <header className="sticky top-0 z-10 bg-slate-50/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-4 h-14 flex items-center">
                <button onClick={onBack} className="p-2 -ml-2 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-full transition-colors">
                    <ArrowLeft size={20} className="text-slate-700 dark:text-slate-200" />
                </button>
                <h1 className="text-lg font-bold ml-2">Identity Confirmation</h1>
            </header>
            <main className="max-w-2xl mx-auto w-full p-6 flex flex-col items-center">
                <div className="w-24 h-24 bg-blue-50 dark:bg-blue-900/20 rounded-full flex items-center justify-center mb-6 text-blue-600">
                    <BadgeCheck size={48} />
                </div>
                <h2 className="text-xl font-bold text-center text-slate-900 dark:text-white mb-2">Confirm your identity</h2>
                <p className="text-center text-slate-500 text-sm mb-8">
                    To run ads about social issues, elections or politics, you need to confirm your identity. This helps us ensure that ads on SocialApp are transparent and authentic.
                </p>

                {status === 'confirmed' ? (
                     <div className="flex flex-col items-center p-6 bg-green-50 dark:bg-green-900/10 rounded-2xl w-full border border-green-100 dark:border-green-900/30">
                        <CheckCircle2 size={32} className="text-green-600 mb-2" />
                        <h3 className="font-bold text-green-700 dark:text-green-400">Identity Confirmed</h3>
                        <p className="text-xs text-green-600/80 dark:text-green-400/70 mt-1">You are authorized to run ads.</p>
                     </div>
                ) : (
                    <div className="w-full">
                         <Section>
                            <div className="p-4 flex items-center gap-3">
                                <AlertCircle size={20} className="text-slate-400" />
                                <div className="flex flex-col">
                                    <span className="font-medium text-sm text-slate-700 dark:text-slate-200">Upload ID</span>
                                    <span className="text-xs text-slate-400">Passport, Driver's License, or National ID</span>
                                </div>
                            </div>
                        </Section>
                        <button 
                            onClick={handleConfirm}
                            disabled={isLoading}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-colors shadow-lg shadow-blue-500/30 disabled:opacity-70 flex items-center justify-center gap-2"
                        >
                            {isLoading && <Loader2 size={18} className="animate-spin" />}
                            {isLoading ? 'Processing...' : 'Get Started'}
                        </button>
                    </div>
                )}
            </main>
        </div>
    )
}

const AccountOwnershipScreen = ({ onBack, navigate }) => (
    <div className="animate-slide-in">
        <header className="sticky top-0 z-10 bg-slate-50/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-4 h-14 flex items-center">
            <button onClick={onBack} className="p-2 -ml-2 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-full transition-colors">
                <ArrowLeft size={20} className="text-slate-700 dark:text-slate-200" />
            </button>
            <h1 className="text-lg font-bold ml-2">Account Ownership and Control</h1>
        </header>
        <main className="max-w-2xl mx-auto w-full p-4 md:p-6">
            <Section>
                <Item 
                    icon={UserX} 
                    label="Deactivation or deletion" 
                    subText="Temporarily deactivate or permanently delete your accounts and profiles." 
                    onClick={() => navigate('deactivation_deletion')}
                />
            </Section>
        </main>
    </div>
);

const DeactivationDeletionScreen = ({ onBack, navigate }) => {
    const [selection, setSelection] = useState('deactivate');

    return (
        <div className="animate-slide-in">
            <header className="sticky top-0 z-10 bg-slate-50/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-4 h-14 flex items-center">
                <button onClick={onBack} className="p-2 -ml-2 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-full transition-colors">
                    <ArrowLeft size={20} className="text-slate-700 dark:text-slate-200" />
                </button>
                <h1 className="text-lg font-bold ml-2">Deactivation or deletion</h1>
            </header>
            <main className="max-w-2xl mx-auto w-full p-4 md:p-6">
                 <div className="mb-6 px-1">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center overflow-hidden">
                             <User size={20} className="text-slate-500" />
                        </div>
                        <span className="font-bold text-lg text-slate-900 dark:text-white">John Doe</span>
                    </div>
                </div>

                <Section>
                    <button 
                        onClick={() => setSelection('deactivate')}
                        className="w-full flex items-start gap-4 p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors border-b border-slate-100 dark:border-slate-800 text-left"
                    >
                        <div className={`mt-1 w-5 h-5 rounded-full border-2 flex items-center justify-center ${selection === 'deactivate' ? 'border-blue-600' : 'border-slate-300 dark:border-slate-600'}`}>
                            {selection === 'deactivate' && <div className="w-2.5 h-2.5 bg-blue-600 rounded-full" />}
                        </div>
                        <div className="flex-1">
                            <span className="font-bold text-sm text-slate-900 dark:text-white block mb-1">Deactivate account</span>
                            <span className="text-xs text-slate-500 leading-relaxed">
                                Deactivating your account is temporary. Your profile will be hidden on SocialApp until you reactivate it by logging back in.
                            </span>
                        </div>
                    </button>
                    <button 
                        onClick={() => setSelection('delete')}
                        className="w-full flex items-start gap-4 p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors text-left"
                    >
                        <div className={`mt-1 w-5 h-5 rounded-full border-2 flex items-center justify-center ${selection === 'delete' ? 'border-blue-600' : 'border-slate-300 dark:border-slate-600'}`}>
                            {selection === 'delete' && <div className="w-2.5 h-2.5 bg-blue-600 rounded-full" />}
                        </div>
                        <div className="flex-1">
                            <span className="font-bold text-sm text-slate-900 dark:text-white block mb-1">Delete account</span>
                            <span className="text-xs text-slate-500 leading-relaxed">
                                Deleting your account is permanent. When you delete your SocialApp account, you won't be able to retrieve the content or information you've shared.
                            </span>
                        </div>
                    </button>
                </Section>

                <div className="px-1 mt-6">
                    <button 
                        onClick={() => navigate('confirm_deactivation', selection)}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-colors shadow-lg shadow-blue-500/30"
                    >
                        Continue
                    </button>
                </div>
            </main>
        </div>
    )
}

const ConfirmDeactivationScreen = ({ onBack, actionType, onConfirm }) => {
    const [password, setPassword] = useState('');
    
    return (
        <div className="animate-slide-in">
             <header className="sticky top-0 z-10 bg-slate-50/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-4 h-14 flex items-center">
                <button onClick={onBack} className="p-2 -ml-2 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-full transition-colors">
                    <ArrowLeft size={20} className="text-slate-700 dark:text-slate-200" />
                </button>
                <h1 className="text-lg font-bold ml-2">Confirm {actionType === 'delete' ? 'Deletion' : 'Deactivation'}</h1>
            </header>
            <main className="max-w-2xl mx-auto w-full p-4 md:p-6">
                <p className="text-sm text-slate-600 dark:text-slate-300 mb-6 px-1">
                    For your security, please re-enter your password to continue.
                </p>
                <Section>
                    <div className="p-4">
                        <input 
                            type="password" 
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-transparent outline-none text-slate-900 dark:text-white placeholder:text-slate-400 font-medium" 
                            autoFocus
                        />
                    </div>
                </Section>
                <div className="px-1 mt-4">
                    <button 
                        onClick={() => onConfirm(actionType)}
                        disabled={!password}
                        className={`w-full font-bold py-3 rounded-xl transition-colors shadow-lg ${!password ? 'bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/30'}`}
                    >
                        Continue
                    </button>
                </div>
            </main>
        </div>
    )
}


const PersonalDetailsScreen = ({ onBack, personal, setPersonal, showToast, navigate }) => {
    const handleEdit = (field) => {
        navigate(`edit_personal_${field}`);
    }

    return (
        <div className="animate-slide-in">
            <header className="sticky top-0 z-10 bg-slate-50/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-4 h-14 flex items-center">
                <button onClick={onBack} className="p-2 -ml-2 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-full transition-colors">
                    <ArrowLeft size={20} className="text-slate-700 dark:text-slate-200" />
                </button>
                <h1 className="text-lg font-bold ml-2">Personal Details</h1>
            </header>
            <main className="max-w-2xl mx-auto w-full p-4 md:p-6">
                <p className="text-xs text-slate-500 mb-6 px-4">
                    SocialApp uses this information to verify your identity and to keep our community safe. You decide what personal details you make visible to others.
                </p>
                <Section title="Contact Info">
                    <Item 
                        icon={Mail} 
                        label="Email Address" 
                        detail={personal.email} 
                        onClick={() => handleEdit('email')}
                    />
                    <Item 
                        icon={Phone} 
                        label="Phone Number" 
                        detail={personal.phone} 
                        onClick={() => handleEdit('phone')}
                    />
                </Section>
                <Section title="Identity">
                    <Item 
                        icon={Calendar} 
                        label="Birthday" 
                        detail={personal.birthday} 
                        onClick={() => handleEdit('birthday')}
                    />
                    <Item 
                        icon={BadgeCheck} 
                        label="Identity Confirmation" 
                        subText="Confirm your identity to run ads" 
                        detail={personal.identityStatus === 'confirmed' ? 'Confirmed' : ''}
                        onClick={() => navigate('identity_confirmation')} 
                    />
                    <Item 
                        icon={User} 
                        label="Account Ownership and Control" 
                        subText="Deactivation or deletion" 
                        onClick={() => navigate('account_ownership')} 
                    />
                </Section>
            </main>
        </div>
    );
};

/* --- 3. YOUR INFORMATION --- */

const AccessInfoScreen = ({ onBack, showToast }) => (
    <div className="animate-slide-in">
        <header className="sticky top-0 z-10 bg-slate-50/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-4 h-14 flex items-center">
            <button onClick={onBack} className="p-2 -ml-2 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-full transition-colors">
                <ArrowLeft size={20} className="text-slate-700 dark:text-slate-200" />
            </button>
            <h1 className="text-lg font-bold ml-2">Access Your Information</h1>
        </header>
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
                <Item icon={Activity} label="Your Activity Across SocialApp" onClick={() => showToast('Opening activity log...')} />
                <Item icon={MessageCircle} label="Messages" onClick={() => showToast('Opening messages...')} />
                <Item icon={MapPin} label="Location History" onClick={() => showToast('Opening location history...')} />
            </Section>

            <Section title="Personal Information">
                <Item icon={User} label="Profile Information" onClick={() => showToast('Opening profile info...')} />
                <Item icon={Users} label="Friends and Followers" onClick={() => showToast('Opening connections...')} />
            </Section>

            <Section title="Logged Information">
                <Item icon={Shield} label="Security and Login Information" onClick={() => showToast('Opening security logs...')} />
                <Item icon={Globe} label="Apps and Websites" onClick={() => showToast('Opening connected apps...')} />
                <Item icon={Megaphone} label="Ads Information" onClick={() => showToast('Opening ad info...')} />
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
            }, 2500);
        }
    };

    return (
        <div className="animate-slide-in">
             <header className="sticky top-0 z-10 bg-slate-50/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-4 h-14 flex items-center">
                <button onClick={onBack} className="p-2 -ml-2 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-full transition-colors">
                    <ArrowLeft size={20} className="text-slate-700 dark:text-slate-200" />
                </button>
                <h1 className="text-lg font-bold ml-2">Transfer Information</h1>
            </header>
            <main className="max-w-2xl mx-auto w-full p-4 md:p-6">
                
                {step === 1 && (
                    <>
                         <p className="text-sm text-slate-500 mb-6 px-4">
                            Choose a destination to transfer a copy of your photos, videos, or posts.
                        </p>
                        <Section title="Choose Destination">
                            <button 
                                onClick={() => setDestination('google_photos')}
                                className={`w-full flex items-center justify-between p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors border-b border-slate-100 dark:border-slate-800 ${destination === 'google_photos' ? 'bg-blue-50 dark:bg-blue-900/10' : ''}`}
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                                        <ImageIcon size={18} className="text-slate-500" />
                                    </div>
                                    <span className="font-medium text-sm text-slate-900 dark:text-white">Google Photos</span>
                                </div>
                                {destination === 'google_photos' && <CheckCircle2 size={20} className="text-blue-600" />}
                            </button>
                            <button 
                                onClick={() => setDestination('dropbox')}
                                className={`w-full flex items-center justify-between p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors border-b border-slate-100 dark:border-slate-800 ${destination === 'dropbox' ? 'bg-blue-50 dark:bg-blue-900/10' : ''}`}
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                                        <Cloud size={18} className="text-slate-500" />
                                    </div>
                                    <span className="font-medium text-sm text-slate-900 dark:text-white">Dropbox</span>
                                </div>
                                {destination === 'dropbox' && <CheckCircle2 size={20} className="text-blue-600" />}
                            </button>
                            <button 
                                onClick={() => setDestination('koofr')}
                                className={`w-full flex items-center justify-between p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors ${destination === 'koofr' ? 'bg-blue-50 dark:bg-blue-900/10' : ''}`}
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                                        <Server size={18} className="text-slate-500" />
                                    </div>
                                    <span className="font-medium text-sm text-slate-900 dark:text-white">Koofr</span>
                                </div>
                                {destination === 'koofr' && <CheckCircle2 size={20} className="text-blue-600" />}
                            </button>
                        </Section>
                    </>
                )}

                {step === 2 && (
                    <>
                        <div className="px-4 mb-6">
                            <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Confirm Transfer</h2>
                            <p className="text-sm text-slate-500">
                                You are about to transfer your photos and videos to <strong>{destination === 'google_photos' ? 'Google Photos' : destination === 'dropbox' ? 'Dropbox' : 'Koofr'}</strong>.
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
                            We've started transferring your copy. This may take some time depending on the amount of data. We'll verify the transfer completion via email.
                        </p>
                        <button 
                            onClick={onBack}
                            className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-6 py-3 rounded-xl text-sm font-bold shadow-lg"
                        >
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
    const clearAll = () => setHistory([]);
    const deleteItem = (idx) => {
        setHistory(prev => prev.filter((_, i) => i !== idx));
    };

    return (
        <div className="animate-slide-in">
            <header className="sticky top-0 z-10 bg-slate-50/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-4 h-14 flex items-center justify-between">
                <div className="flex items-center">
                    <button onClick={onBack} className="p-2 -ml-2 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-full transition-colors">
                        <ArrowLeft size={20} className="text-slate-700 dark:text-slate-200" />
                    </button>
                    <h1 className="text-lg font-bold ml-2">Search History</h1>
                </div>
                {history.length > 0 && (
                    <button 
                        onClick={clearAll}
                        className="text-red-600 font-semibold text-sm hover:bg-red-50 dark:hover:bg-red-900/20 px-3 py-1.5 rounded-lg transition-colors"
                    >
                        Clear All
                    </button>
                )}
            </header>
            <main className="max-w-2xl mx-auto w-full p-4 md:p-6">
                {history.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 text-slate-400">
                        <History size={48} className="mb-4 opacity-50" />
                        <p className="text-sm font-medium">No search history</p>
                    </div>
                ) : (
                    <Section>
                        {history.map((term, i) => (
                            <Item 
                                key={i}
                                icon={Clock}
                                label={term}
                                rightElement={
                                    <button onClick={() => deleteItem(i)} className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
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
        <header className="sticky top-0 z-10 bg-slate-50/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-4 h-14 flex items-center">
            <button onClick={onBack} className="p-2 -ml-2 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-full transition-colors">
                <ArrowLeft size={20} className="text-slate-700 dark:text-slate-200" />
            </button>
            <h1 className="text-lg font-bold ml-2">Ad Activity</h1>
        </header>
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
        showToast("Download requested. We'll notify you when it's ready.");
        
        // Simulate processing
        setTimeout(() => {
            setInfo(prev => ({ ...prev, downloadStatus: 'ready' }));
            showToast("Your information is ready to download.");
        }, 3000);
    };

    return (
        <div className="animate-slide-in">
             <header className="sticky top-0 z-10 bg-slate-50/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-4 h-14 flex items-center">
                <button onClick={onBack} className="p-2 -ml-2 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-full transition-colors">
                    <ArrowLeft size={20} className="text-slate-700 dark:text-slate-200" />
                </button>
                <h1 className="text-lg font-bold ml-2">Download Information</h1>
            </header>
            <main className="max-w-2xl mx-auto w-full p-4 md:p-6">
                <div className="flex flex-col items-center text-center mb-8 px-4">
                    <div className="w-20 h-20 bg-blue-50 dark:bg-blue-900/20 rounded-full flex items-center justify-center mb-4 text-blue-600">
                        <FileDown size={40} />
                    </div>
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Request a copy of your information</h2>
                    <p className="text-sm text-slate-500">
                        You can request a copy of your information at any time. When your file is ready, you'll have 4 days to download your information from this page.
                    </p>
                </div>

                {info.downloadStatus === 'idle' && (
                     <div className="px-4">
                        <button 
                            onClick={handleRequest}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-colors shadow-lg shadow-blue-500/30"
                        >
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
                                <span className="font-bold text-slate-900 dark:text-white">socialapp_data_johndoe.zip</span>
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

const InfoScreen = ({ onBack, info, setInfo, history, setHistory, navigate, showToast }) => (
  <div className="animate-slide-in">
    <header className="sticky top-0 z-10 bg-slate-50/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-4 h-14 flex items-center">
      <button onClick={onBack} className="p-2 -ml-2 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-full transition-colors">
        <ArrowLeft size={20} className="text-slate-700 dark:text-slate-200" />
      </button>
      <h1 className="text-lg font-bold ml-2">Your Information</h1>
    </header>
    <main className="max-w-2xl mx-auto w-full p-4 md:p-6">
      <Section>
        <Item 
            icon={FileText} 
            label="Access your information" 
            subText="View your information by category" 
            onClick={() => navigate('access_info')}
        />
        <Item 
            icon={FileDown} 
            label="Download your information" 
            subText={info.downloadStatus === 'ready' ? "File ready to download" : "Download a copy of your information to keep"}
            detail={info.downloadStatus === 'ready' ? "1 File" : null}
            onClick={() => navigate('download_data')}
        />
        <Item 
            icon={ArrowRightLeft} 
            label="Transfer a copy of your information" 
            subText="Transfer your photos, videos, or posts to another service" 
            onClick={() => navigate('transfer_data')}
        />
      </Section>
      <Section title="History">
        <Item 
            icon={Clock} 
            label="Search History" 
            subText="View and clear recent searches" 
            detail={history.length > 0 ? `${history.length} items` : 'Empty'}
            onClick={() => navigate('search_history')} 
        />
        <Item 
            icon={Megaphone} 
            label="Ad Activity" 
            subText="See ads you've interacted with" 
            onClick={() => navigate('ad_activity')}
        />
      </Section>
    </main>
  </div>
);

/* ==================================================================================================
 * ADD LINK SCREEN
 * ================================================================================================== */

const AddLinkScreen = ({ onBack, onSave }) => {
  const [url, setUrl] = useState('');
  const [title, setTitle] = useState('');
  const [error, setError] = useState('');

  const handleSave = () => {
    if (!url) {
        setError('URL is required');
        return;
    }
    onSave({ url, title: title || 'External Link' });
  };

  return (
    <div className="animate-slide-in">
       <header className="sticky top-0 z-10 bg-slate-50/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-4 h-14 flex items-center justify-between">
        <div className="flex items-center">
          <button onClick={onBack} className="p-2 -ml-2 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-full transition-colors">
            <ArrowLeft size={20} className="text-slate-700 dark:text-slate-200" />
          </button>
          <h1 className="text-lg font-bold ml-2">Add Link</h1>
        </div>
        <button 
            onClick={handleSave}
            className={`font-semibold text-sm px-3 py-1.5 rounded-lg transition-colors ${!url ? 'text-slate-400 cursor-not-allowed' : 'text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20'}`}
        >
          Done
        </button>
      </header>

      <main className="max-w-2xl mx-auto w-full p-4 md:p-6">
        <Section title="Link Details">
            <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex flex-col">
                <label className="text-xs font-bold text-slate-500 uppercase mb-1">URL</label>
                <input 
                    type="text" 
                    placeholder="https://example.com"
                    value={url}
                    onChange={(e) => { setUrl(e.target.value); setError(''); }}
                    className="w-full bg-transparent text-slate-900 dark:text-white outline-none font-medium placeholder:text-slate-400" 
                    autoFocus
                />
            </div>
             <div className="p-4 flex flex-col">
                <label className="text-xs font-bold text-slate-500 uppercase mb-1">Title</label>
                <input 
                    type="text" 
                    placeholder="e.g. My Portfolio" 
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full bg-transparent text-slate-900 dark:text-white outline-none font-medium placeholder:text-slate-400" 
                />
            </div>
        </Section>
        
        {error && (
            <div className="flex items-center gap-2 text-red-500 text-xs px-4 animate-fade-in">
                <AlertTriangle size={14} />
                <span>{error}</span>
            </div>
        )}

        <div className="px-4 mt-6">
            <p className="text-xs text-slate-400">
                Links are public and can be seen by anyone on your profile.
            </p>
        </div>
      </main>
    </div>
  );
};

/* ==================================================================================================
 * EDIT PROFILE SCREEN
 * ================================================================================================== */

const EditProfile = ({ onBack, profile, setProfile, navigate }) => {
  const handleChange = (field, value) => {
      setProfile(prev => ({ ...prev, [field]: value }));
  };

  const handleDeleteLink = (indexToDelete) => {
      setProfile(prev => ({
          ...prev,
          links: prev.links.filter((_, index) => index !== indexToDelete)
      }));
  };

  return (
    <div className="animate-slide-in">
      <header className="sticky top-0 z-10 bg-slate-50/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-4 h-14 flex items-center justify-between">
        <div className="flex items-center">
          <button onClick={onBack} className="p-2 -ml-2 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-full transition-colors">
            <ArrowLeft size={20} className="text-slate-700 dark:text-slate-200" />
          </button>
          <h1 className="text-lg font-bold ml-2">Edit Profile</h1>
        </div>
        <button onClick={onBack} className="text-blue-600 font-semibold text-sm hover:bg-blue-50 dark:hover:bg-blue-900/20 px-3 py-1.5 rounded-lg transition-colors">
          Save
        </button>
      </header>

      <main className="max-w-2xl mx-auto w-full p-4 md:p-6">
        <div className="flex flex-col items-center mb-8 animate-fade-in">
          <div className="relative group cursor-pointer">
             <div className="w-24 h-24 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center overflow-hidden border-4 border-white dark:border-slate-950 shadow-lg">
                <User size={40} className="text-slate-400" />
             </div>
             <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-black/40 backdrop-blur-[2px] p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                    <Camera size={20} className="text-white" />
                </div>
             </div>
             <div className="absolute bottom-0 right-0 bg-blue-500 p-1.5 rounded-full border-2 border-white dark:border-slate-950 text-white shadow-sm">
                <ImageIcon size={12} />
             </div>
          </div>
          <button className="mt-3 text-blue-600 dark:text-blue-400 font-semibold text-sm hover:underline">Change photo</button>
        </div>

        <div className="space-y-6 animate-fade-in">
          <Section>
             <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex flex-col">
                <label className="text-xs font-bold text-slate-500 uppercase mb-1">Display Name</label>
                <input 
                    type="text" 
                    value={profile.name} 
                    onChange={(e) => handleChange('name', e.target.value)}
                    className="w-full bg-transparent text-slate-900 dark:text-white outline-none font-medium placeholder:text-slate-400" 
                />
             </div>
             <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex flex-col">
                <label className="text-xs font-bold text-slate-500 uppercase mb-1">Username</label>
                <input 
                    type="text" 
                    value={profile.username}
                    onChange={(e) => handleChange('username', e.target.value)}
                    className="w-full bg-transparent text-slate-900 dark:text-white outline-none font-medium placeholder:text-slate-400" 
                />
             </div>
             <div className="p-4 flex flex-col">
                <label className="text-xs font-bold text-slate-500 uppercase mb-1">Bio</label>
                <textarea 
                    rows="3" 
                    value={profile.bio}
                    onChange={(e) => handleChange('bio', e.target.value)}
                    className="w-full bg-transparent text-slate-900 dark:text-white outline-none resize-none font-medium placeholder:text-slate-400 leading-relaxed" 
                />
                <div className="text-right mt-1">
                   <span className="text-[10px] text-slate-400">{profile.bio.length} / 150</span>
                </div>
             </div>
          </Section>
          
          <Section title="Links">
             {profile.links.map((link, index) => (
                 <Item 
                    key={index} 
                    icon={Link} 
                    label={link.title} 
                    subText={link.url} 
                    // No onClick here, so it renders as 'div', allowing nested buttons
                    rightElement={
                        <button 
                            onClick={(e) => { e.stopPropagation(); handleDeleteLink(index); }}
                            className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 text-slate-400 hover:text-red-500 rounded-full transition-colors"
                        >
                            <Trash2 size={16} />
                        </button>
                    }
                 />
             ))}
             <Item icon={Plus} label="Add Link" onClick={() => navigate('add_link')} />
          </Section>
        </div>
      </main>
    </div>
  );
};

/* ==================================================================================================
 * ACCOUNT CENTRE SUB-SCREEN
 * ================================================================================================== */

const AccountCentre = ({ onBack, onProfileClick, navigate, profile }) => {
  return (
    <div className="animate-slide-in">
      <header className="sticky top-0 z-10 bg-slate-50/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-4 h-14 flex items-center">
        <button onClick={onBack} className="p-2 -ml-2 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-full transition-colors">
          <ArrowLeft size={20} className="text-slate-700 dark:text-slate-200" />
        </button>
        <h1 className="text-lg font-bold ml-2">Account Centre</h1>
      </header>

      <main className="max-w-2xl mx-auto w-full pb-20 pt-6 px-0 md:px-4">
        
        {/* Hero Card */}
        <div className="px-4 md:px-0 mb-8 animate-fade-in">
          <button 
            onClick={onProfileClick}
            className="w-full text-left relative group overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 text-white shadow-xl shadow-blue-500/20 transition-all hover:shadow-blue-500/40 hover:scale-[1.01]"
          >
            {/* Abstract Background Shapes */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-white rounded-full blur-3xl opacity-10 group-hover:opacity-20 transition-opacity"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-400 rounded-full blur-3xl opacity-20 group-hover:opacity-30 transition-opacity"></div>

              <div className="relative p-6 flex items-center justify-between z-10">
                <div className="flex items-center gap-5">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center overflow-hidden">
                        <User size={32} className="text-white" />
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <h2 className="text-xl font-bold tracking-tight text-white leading-tight drop-shadow-sm">{profile.name}</h2>
                    <span className="text-blue-100 text-sm font-medium tracking-wide">@{profile.username}</span>
                    
                    <div className="flex items-center gap-2 mt-2">
                      <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider bg-white/20 text-white px-2 py-0.5 rounded-md border border-white/20 backdrop-blur-sm">
                        SocialApp
                      </span>
                    </div>
                  </div>
                </div>
                <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center border border-white/10 backdrop-blur-sm shadow-sm hover:bg-white/30 transition-colors">
                   <ChevronRight size={20} className="text-white" />
                </div>
              </div>
          </button>
          
          <p className="text-xs text-slate-500 text-center mt-4 px-4">
            Manage your connected experiences and account settings across SocialApp technologies.
          </p>
        </div>

        {/* 1. Account Settings */}
        <Section title="Account Settings">
           <Item 
                icon={ShieldCheck} 
                label="Password and Security" 
                subText="2FA, Change Password" 
                onClick={() => navigate('security')}
            />
           <Item 
                icon={FileText} 
                label="Personal Details" 
                subText="Contact info, birthday" 
                onClick={() => navigate('personal')}
            />
           <Item 
                icon={FileKey} 
                label="Your Information" 
                subText="Download your data" 
                onClick={() => navigate('info')}
            />
        </Section>

        {/* 2. Preferences */}
        <Section title="Preferences">
           <Item icon={Megaphone} label="Ad Preferences" />
           <Item icon={CreditCard} label="Payments" />
        </Section>

      </main>
    </div>
  );
};

/* ==================================================================================================
 * MAIN SETTINGS COMPONENT
 * ================================================================================================== */

export default function SettingsScreen() {
  const [isDark, setIsDark] = useState(false);
  const [currentScreen, setCurrentScreen] = useState('main'); 
  const [toastMessage, setToastMessage] = useState('');
  const [selectedAction, setSelectedAction] = useState(null); 

  // --- STATE FOR DUMMY DATA ---
  
  const [profile, setProfile] = useState({
      name: 'John Doe',
      username: 'johndoe',
      bio: 'Digital enthusiast. Traveler.',
      links: []
  });

  const [security, setSecurity] = useState({
      twoFactor: false,
      savedLogin: true,
      // loginAlerts: true, // Replaced with granular settings
      loginAlertsInApp: true,
      loginAlertsEmail: true,
      lastPasswordChange: '3 months ago'
  });

  const [personal, setPersonal] = useState({
      email: 'john@example.com',
      phone: '+1 234 *** **89',
      birthday: '1995-01-01',
      identityStatus: 'not_started' 
  });

  const [info, setInfo] = useState({
      downloadStatus: 'idle' 
  });
  
  const [history, setHistory] = useState([
      'react tutorials', 'ui design', 'lucide icons', 'tailwind css', 'nextjs 13'
  ]);
  
  const [adActivity, setAdActivity] = useState([
      { id: 1, advertiser: 'TechStart', title: 'Boost your startup', action: 'Learn More', time: '1h ago' },
      { id: 2, advertiser: 'GreenLife', title: 'Sustainable living tips', action: 'Shop Now', time: '5h ago' },
      { id: 3, advertiser: 'TravelGo', title: 'Flight discounts', action: 'Book Now', time: '1d ago' }
  ]);


  // Helper Functions
  const toggleTheme = () => {
    setIsDark(!isDark);
    if (!isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const handleAddLink = (newLink) => {
      setProfile(prev => ({ ...prev, links: [...prev.links, newLink] }));
      setCurrentScreen('edit_profile');
  };

  const showToast = (msg) => {
      setToastMessage(msg);
      setTimeout(() => setToastMessage(''), 3000);
  };

  const handleUpdatePersonal = (field, value) => {
      setPersonal(prev => ({ ...prev, [field]: value }));
      setCurrentScreen('personal');
      showToast(`${field.charAt(0).toUpperCase() + field.slice(1)} updated`);
  };

  const handlePasswordChange = () => {
      setSecurity(prev => ({ ...prev, lastPasswordChange: 'Just now' }));
      setCurrentScreen('security');
      showToast('Password changed successfully');
  };

  const handleIdentityConfirm = () => {
      setPersonal(prev => ({ ...prev, identityStatus: 'confirmed' }));
      showToast('Identity verification initiated');
  };
  
  const handleAccountAction = (action) => {
      showToast(`Account ${action === 'delete' ? 'deleted' : 'deactivated'} successfully`);
      setCurrentScreen('main'); 
  };

  // Render Logic
  const renderScreen = () => {
      switch(currentScreen) {
          case 'edit_profile':
              return <EditProfile 
                        onBack={() => setCurrentScreen('account_centre')} 
                        profile={profile}
                        setProfile={setProfile}
                        navigate={setCurrentScreen}
                     />;
          case 'add_link':
              return <AddLinkScreen 
                        onBack={() => setCurrentScreen('edit_profile')}
                        onSave={handleAddLink}
                     />;
          
          /* Security Flow */
          case 'security':
              return <SecurityScreen 
                        onBack={() => setCurrentScreen('account_centre')} 
                        security={security}
                        setSecurity={setSecurity}
                        showToast={showToast}
                        navigate={setCurrentScreen}
                     />;
          case 'change_password':
              return <ChangePasswordScreen 
                        onBack={() => setCurrentScreen('security')}
                        onSave={handlePasswordChange}
                     />;
          case 'login_alerts':
              return <LoginAlertsScreen 
                        onBack={() => setCurrentScreen('security')}
                        security={security}
                        setSecurity={setSecurity}
                     />;
          case 'recent_emails':
              return <RecentEmailsScreen 
                        onBack={() => setCurrentScreen('security')}
                     />;
          case 'security_checkup':
              return <SecurityCheckupScreen 
                        onBack={() => setCurrentScreen('security')}
                        security={security}
                     />;

          /* Personal Details Flow */
          case 'personal':
              return <PersonalDetailsScreen 
                        onBack={() => setCurrentScreen('account_centre')} 
                        personal={personal}
                        setPersonal={setPersonal}
                        showToast={showToast}
                        navigate={setCurrentScreen}
                     />;
          case 'edit_personal_email':
              return <EditFieldScreen 
                        onBack={() => setCurrentScreen('personal')}
                        label="Email"
                        value={personal.email}
                        onSave={(val) => handleUpdatePersonal('email', val)}
                        type="email"
                     />;
          case 'edit_personal_phone':
              return <EditFieldScreen 
                        onBack={() => setCurrentScreen('personal')}
                        label="Phone"
                        value={personal.phone}
                        onSave={(val) => handleUpdatePersonal('phone', val)}
                        type="tel"
                     />;
          case 'edit_personal_birthday':
              return <EditFieldScreen 
                        onBack={() => setCurrentScreen('personal')}
                        label="Birthday"
                        value={personal.birthday}
                        onSave={(val) => handleUpdatePersonal('birthday', val)}
                        type="date"
                     />;
          case 'identity_confirmation':
              return <IdentityConfirmationScreen 
                        onBack={() => setCurrentScreen('personal')}
                        status={personal.identityStatus}
                        onConfirm={handleIdentityConfirm}
                     />;
          case 'account_ownership':
              return <AccountOwnershipScreen 
                        onBack={() => setCurrentScreen('personal')}
                        navigate={setCurrentScreen}
                     />;
          case 'deactivation_deletion':
              return <DeactivationDeletionScreen 
                        onBack={() => setCurrentScreen('account_ownership')}
                        navigate={(scr, action) => {
                            setSelectedAction(action);
                            setCurrentScreen(scr);
                        }}
                     />;
          case 'confirm_deactivation':
              return <ConfirmDeactivationScreen 
                        onBack={() => setCurrentScreen('deactivation_deletion')}
                        actionType={selectedAction}
                        onConfirm={handleAccountAction}
                     />;


          /* Info Flow */
          case 'info':
              return <InfoScreen 
                        onBack={() => setCurrentScreen('account_centre')} 
                        info={info}
                        setInfo={setInfo}
                        history={history}
                        setHistory={setHistory}
                        navigate={setCurrentScreen}
                        showToast={showToast}
                     />;
          case 'access_info':
              return <AccessInfoScreen 
                        onBack={() => setCurrentScreen('info')}
                        showToast={showToast}
                     />;
          case 'transfer_data':
              return <TransferDataScreen 
                        onBack={() => setCurrentScreen('info')}
                        showToast={showToast}
                     />;
          case 'ad_activity':
              return <AdActivityScreen 
                        onBack={() => setCurrentScreen('info')}
                        ads={adActivity}
                     />;
          case 'search_history':
              return <SearchHistoryScreen 
                        onBack={() => setCurrentScreen('info')}
                        history={history}
                        setHistory={setHistory}
                     />;
          case 'download_data':
              return <DownloadDataScreen 
                        onBack={() => setCurrentScreen('info')}
                        info={info}
                        setInfo={setInfo}
                        showToast={showToast}
                     />;

          case 'account_centre':
              return (
                <AccountCentre 
                    onBack={() => setCurrentScreen('main')} 
                    onProfileClick={() => setCurrentScreen('edit_profile')}
                    navigate={setCurrentScreen}
                    profile={profile}
                />
              );
          default:
              return (
                <>
                <header className="sticky top-0 z-10 bg-slate-50/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-4 h-14 flex items-center justify-center">
                    <h1 className="text-lg font-bold">Settings</h1>
                </header>

                <main className="max-w-2xl mx-auto w-full pb-20 pt-6 px-0 md:px-4 animate-slide-in-reverse">
                    
                    <div className="px-4 md:px-0 mb-6 animate-fade-in">
                      <button 
                        onClick={() => setCurrentScreen('account_centre')}
                        className="w-full text-left p-4 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl text-white shadow-lg transform transition-transform active:scale-[0.98] group"
                      >
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-md group-hover:bg-white/30 transition-colors">
                                <Shield size={24} className="text-white" />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg text-white">Account Centre</h3>
                                <p className="text-blue-100 text-xs">Manage your password, security, and personal details.</p>
                            </div>
                            <ChevronRight className="ml-auto text-white/50 group-hover:translate-x-1 transition-transform" />
                          </div>
                      </button>
                    </div>

                    <Section title="App Settings">
                    <Item icon={Moon} label="Dark Mode" isToggle detail={isDark} onClick={toggleTheme} />
                    <Item icon={Bell} label="Notifications" detail="On" />
                    <Item icon={Languages} label="Language" detail="English (UK)" />
                    <Item icon={Accessibility} label="Accessibility" />
                    </Section>

                    <Section title="Privacy & Content">
                    <Item icon={Lock} label="Privacy" detail="Private" />
                    <Item icon={UserCheck} label="Close Friends" />
                    <Item icon={UserX} label="Blocked" />
                    <Item icon={MessageCircle} label="Messages" />
                    <Item icon={Hash} label="Comments" />
                    </Section>

                    <Section title="Your Activity">
                    <Item icon={Clock} label="Time Spent" />
                    <Item icon={Heart} label="Likes" />
                    <Item icon={Bookmark} label="Saved" />
                    <Item icon={Archive} label="Archive" />
                    </Section>

                    <Section title="Support">
                    <Item icon={HelpCircle} label="Help Centre" />
                    <Item icon={Info} label="About" />
                    <Item icon={FileText} label="Terms & Policies" />
                    </Section>

                    <Section title="Login">
                    <Item icon={Plus} label="Add Account" />
                    <Item icon={LogOut} label="Log Out" isDestructive />
                    </Section>
                    
                    <div className="text-center mt-8 mb-12">
                    <p className="text-xs font-bold text-slate-500">SocialApp Web</p>
                    <p className="text-[10px] text-slate-400 mt-1">v5.0.0</p>
                    </div>

                </main>
                </>
              );
      }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans text-slate-900 dark:text-white transition-colors duration-200 relative">
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
