import React, { useState } from 'react';
import { 
  ArrowLeft, ChevronRight, Megaphone, CreditCard, 
  CheckCircle2, Plus, X, Trash2, Clock, 
  ShoppingBag, Star, LayoutGrid, Monitor, 
  Smartphone, Shield, Bell, Moon, LogOut,
  HelpCircle, Info, FileText, Loader2,
  AlertCircle, Wallet, Globe, Briefcase, GraduationCap, Heart,
  Building, MapPin, User, Tag, Lock, Truck, Mail, Receipt,
  Download, AlertTriangle, Fingerprint, RefreshCw, DollarSign, Home
} from 'lucide-react';

/* ==================================================================================================
 * SHARED COMPONENTS
 * ================================================================================================== */

const Section = ({ title, children, className = "" }) => (
  <div className={`mb-6 animate-fade-in ${className}`}>
    {title && <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 px-4">{title}</h3>}
    <div className="bg-white dark:bg-slate-900 border-y md:border border-slate-200 dark:border-slate-800 md:rounded-2xl overflow-hidden">
      {children}
    </div>
  </div>
);

const Item = ({ icon: Icon, label, onClick, isToggle, detail, isDestructive, subText, rightElement, badge }) => {
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
          <div className="flex items-center gap-2">
            <span className={`text-sm font-medium ${isDestructive ? 'text-red-600 dark:text-red-400' : 'text-slate-700 dark:text-slate-200'}`}>{label}</span>
            {badge && (
                <span className="text-[10px] font-bold px-1.5 py-0.5 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-md">
                    {badge}
                </span>
            )}
          </div>
          {subText && <span className="text-[10px] text-slate-400">{subText}</span>}
        </div>
      </div>
      <div className="flex items-center gap-2">
        {detail !== undefined && typeof detail !== 'boolean' && <span className="text-xs text-slate-400 font-medium">{detail}</span>}
        
        {rightElement ? rightElement : (
          isToggle ? (
              <div className={`w-11 h-6 rounded-full transition-colors flex items-center px-1 ${detail ? 'bg-blue-600' : 'bg-slate-300 dark:bg-slate-600'}`}>
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

const Toast = ({ message }) => (
  <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-slate-900 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg z-50 flex items-center gap-2 animate-fade-in-up">
    <CheckCircle2 size={16} className="text-green-400" />
    {message}
  </div>
);

const Header = ({ title, onBack, rightAction }) => (
    <header className="sticky top-0 z-10 bg-slate-50/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-4 h-14 flex items-center justify-between">
        <div className="flex items-center">
            {onBack && (
                <button onClick={onBack} className="p-2 -ml-2 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-full transition-colors">
                    <ArrowLeft size={20} className="text-slate-700 dark:text-slate-200" />
                </button>
            )}
            <h1 className={`text-lg font-bold ${onBack ? 'ml-2' : ''}`}>{title}</h1>
        </div>
        {rightAction}
    </header>
);

/* ==================================================================================================
 * AD PREFERENCES SCREENS
 * ================================================================================================== */

const AdTopicsScreen = ({ onBack, topics, toggleTopic }) => (
    <div className="animate-slide-in">
        <Header title="Ad Topics" onBack={onBack} />
        <main className="max-w-2xl mx-auto w-full p-4 md:p-6">
            <div className="px-4 mb-6">
                <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Manage your interests</h2>
                <p className="text-sm text-slate-500">
                    These topics are based on your recent activity. Toggling them off will show you fewer ads related to that topic.
                </p>
            </div>
            <Section title="Your Interests">
                {topics.map(topic => (
                    <Item 
                        key={topic.id}
                        icon={topic.icon}
                        label={topic.name}
                        subText={topic.enabled ? 'Seeing ads about this' : 'Seeing fewer ads'}
                        isToggle
                        detail={topic.enabled}
                        onClick={() => toggleTopic(topic.id)}
                    />
                ))}
            </Section>
        </main>
    </div>
);

const AdActivityScreen = ({ onBack, ads }) => (
    <div className="animate-slide-in">
        <Header title="Ad Activity" onBack={onBack} />
        <main className="max-w-2xl mx-auto w-full p-4 md:p-6">
            <div className="px-4 mb-4">
                <p className="text-sm text-slate-500">
                    Review ads you've recently interacted with. This helps us understand what you like.
                </p>
            </div>
            <div className="flex gap-2 px-4 mb-6 overflow-x-auto pb-2 scrollbar-hide">
                <button className="px-4 py-1.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-sm font-bold rounded-full whitespace-nowrap">Recently Viewed</button>
                <button className="px-4 py-1.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-sm font-medium rounded-full whitespace-nowrap">Saved</button>
            </div>

            <Section title="Recent Ads">
                {ads.map((ad) => (
                    <div key={ad.id} className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-start gap-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                        <div className="w-12 h-12 bg-slate-200 dark:bg-slate-800 rounded-lg flex items-center justify-center shrink-0">
                            <ShoppingBag size={20} className="text-slate-400" />
                        </div>
                        <div className="flex-1">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 block">Sponsored</span>
                            <h3 className="font-bold text-sm text-slate-900 dark:text-white mb-0.5">{ad.advertiser}</h3>
                            <p className="text-xs text-slate-500 mb-2">{ad.title}</p>
                            <span className="text-[10px] text-slate-400">{ad.time}</span>
                        </div>
                        <button className="text-blue-600 font-semibold text-xs bg-blue-50 dark:bg-blue-900/20 px-3 py-1.5 rounded-lg whitespace-nowrap">
                            {ad.action}
                        </button>
                    </div>
                ))}
            </Section>
        </main>
    </div>
);

const DataPartnersScreen = ({ onBack, enabled, setEnabled }) => (
    <div className="animate-slide-in">
        <Header title="Data from Partners" onBack={onBack} />
        <main className="max-w-2xl mx-auto w-full p-4 md:p-6">
            <div className="px-4 mb-6">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-4 mx-auto text-blue-600">
                    <Globe size={32} />
                </div>
                <h2 className="text-xl font-bold text-center text-slate-900 dark:text-white mb-2">Use data from partners?</h2>
                <p className="text-sm text-center text-slate-500">
                    Advertisers and other partners send us data about your activity on their websites and apps. We use this data to show you more relevant ads.
                </p>
            </div>

            <Section>
                <Item 
                    label="Use data from partners" 
                    subText="Allow us to use activity data from partners to personalize ads"
                    isToggle 
                    detail={enabled} 
                    onClick={() => setEnabled(!enabled)}
                />
            </Section>

            <div className="px-4">
                 <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Recent Partners</h3>
                 <p className="text-xs text-slate-500 mb-4">These businesses have shared data with us in the last 30 days.</p>
            </div>
            
            <Section>
                 <Item icon={ShoppingBag} label="Nike Store" detail="3 events" />
                 <Item icon={Monitor} label="TechCrunch" detail="12 events" />
                 <Item icon={Globe} label="Booking.com" detail="1 event" />
            </Section>
        </main>
    </div>
);

const AddCategoryScreen = ({ onBack, onSave }) => {
    const [inputValue, setInputValue] = useState('');

    const handleSave = () => {
        if (!inputValue.trim()) return;
        onSave(inputValue);
    };

    return (
        <div className="animate-slide-in">
            <Header 
                title="Add Category" 
                onBack={onBack}
                rightAction={
                    <button 
                        onClick={handleSave}
                        disabled={!inputValue.trim()}
                        className="text-blue-600 font-semibold text-sm hover:bg-blue-50 dark:hover:bg-blue-900/20 px-3 py-1.5 rounded-lg transition-colors disabled:opacity-50"
                    >
                        Save
                    </button>
                }
            />
            <main className="max-w-2xl mx-auto w-full p-4 md:p-6">
                 <div className="px-4 mb-6">
                    <p className="text-sm text-slate-500">
                        Add a new category that you believe represents you. Advertisers will be able to reach you based on this information.
                    </p>
                </div>
                <Section>
                    <div className="p-4">
                        <label className="text-xs font-bold text-slate-500 uppercase mb-2 block">Category Name</label>
                        <input 
                            type="text" 
                            placeholder="e.g. Hobby: Cycling"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            className="w-full bg-transparent text-lg text-slate-900 dark:text-white outline-none font-medium placeholder:text-slate-400" 
                            autoFocus
                        />
                    </div>
                </Section>
            </main>
        </div>
    );
};

const CategoriesScreen = ({ onBack, navigate, categories, removeCategory }) => (
    <div className="animate-slide-in">
        <Header title="Profile Categories" onBack={onBack} />
        <main className="max-w-2xl mx-auto w-full p-4 md:p-6">
            <div className="px-4 mb-6">
                <p className="text-sm text-slate-500">
                    Advertisers can reach you based on these categories, which are derived from your profile information and activity.
                </p>
            </div>

            <Section title="Your Categories">
                {categories.length === 0 ? (
                     <div className="p-8 flex flex-col items-center justify-center text-slate-400">
                        <User size={32} className="mb-2 opacity-50" />
                        <p className="text-sm font-medium">No categories found</p>
                    </div>
                ) : (
                    categories.map(cat => (
                        <Item 
                            key={cat.id}
                            icon={cat.icon}
                            label={cat.label}
                            rightElement={
                                <button onClick={() => removeCategory(cat.id)} className="p-2 text-slate-400 hover:text-red-500 transition-colors">
                                    <Trash2 size={18} />
                                </button>
                            }
                        />
                    ))
                )}
                {/* Add Category Button inside the list */}
                <Item 
                    icon={Plus} 
                    label="Add Category" 
                    onClick={() => navigate('add_category')}
                />
            </Section>

             <p className="text-xs text-slate-400 px-4 mt-4">
                Removing a category means advertisers won't be able to target you based on this specific information.
            </p>
        </main>
    </div>
);

const AdPreferencesScreen = ({ onBack, navigate }) => (
    <div className="animate-slide-in">
        <Header title="Ad Preferences" onBack={onBack} />
        <main className="max-w-2xl mx-auto w-full p-4 md:p-6">
            <div className="px-4 mb-8">
                 <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Review your ad preferences</h2>
                 <p className="text-sm text-slate-500 leading-relaxed">
                    To show you better ads, we use data from advertisers and other partners about your activity. You control how we use this data to personalize your experience.
                 </p>
            </div>

            <Section title="Ad Settings">
                <Item 
                    icon={LayoutGrid} 
                    label="Ad Topics" 
                    subText="Review and manage topics you're interested in"
                    onClick={() => navigate('ad_topics')}
                />
                <Item 
                    icon={Clock} 
                    label="Ad Activity" 
                    subText="See ads you recently interacted with"
                    onClick={() => navigate('ad_activity')}
                />
            </Section>

            <Section title="Data & Privacy">
                <Item 
                    icon={Monitor} 
                    label="Data about your activity from partners" 
                    subText="Control how we use data from other websites"
                    onClick={() => navigate('data_partners')}
                />
                <Item 
                    icon={User} 
                    label="Categories used to reach you" 
                    subText="Profile information advertisers use"
                    onClick={() => navigate('categories')}
                />
            </Section>
        </main>
    </div>
);

/* ==================================================================================================
 * PAYMENT & FINANCIAL SCREENS
 * ================================================================================================== */

const AddFundsScreen = ({ onBack, onAddFunds }) => {
    const [amount, setAmount] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleAdd = () => {
        if (!amount || isNaN(amount) || amount <= 0) return;
        setIsLoading(true);
        setTimeout(() => {
            onAddFunds(parseFloat(amount));
            setIsLoading(false);
        }, 1500);
    };

    const presets = [10, 25, 50, 100];

    return (
        <div className="animate-slide-in">
            <Header title="Add Funds" onBack={onBack} />
            <main className="max-w-2xl mx-auto w-full p-4 md:p-6">
                <div className="flex flex-col items-center mb-8 mt-4">
                    <span className="text-slate-500 mb-2">Current Balance</span>
                    <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-8">$24.00</h2>

                    <div className="w-full max-w-xs relative mb-8">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl font-bold text-slate-400">$</span>
                        <input 
                            type="number" 
                            value={amount}
                            onChange={e => setAmount(e.target.value)}
                            placeholder="0.00"
                            className="w-full bg-slate-100 dark:bg-slate-800 rounded-2xl py-6 pl-10 pr-6 text-3xl font-bold text-center outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                            autoFocus
                        />
                    </div>

                    <div className="grid grid-cols-4 gap-3 w-full max-w-sm mb-8">
                        {presets.map(val => (
                            <button 
                                key={val}
                                onClick={() => setAmount(val.toString())}
                                className="py-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-semibold text-sm hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                            >
                                +${val}
                            </button>
                        ))}
                    </div>

                    <button 
                        onClick={handleAdd}
                        disabled={!amount || isLoading}
                        className="w-full max-w-sm bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl transition-colors shadow-lg shadow-blue-500/30 disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                        {isLoading && <Loader2 size={20} className="animate-spin" />}
                        {isLoading ? 'Processing...' : 'Add Funds'}
                    </button>
                </div>
            </main>
        </div>
    );
};

const AutoReloadScreen = ({ onBack, settings, onSave }) => {
    const [enabled, setEnabled] = useState(settings.enabled);
    const [threshold, setThreshold] = useState(settings.threshold);
    const [amount, setAmount] = useState(settings.amount);

    const handleSave = () => {
        onSave({ enabled, threshold, amount });
    };

    return (
        <div className="animate-slide-in">
            <Header title="Auto-reload" onBack={onBack} rightAction={
                <button onClick={handleSave} className="text-blue-600 font-semibold text-sm hover:bg-blue-50 dark:hover:bg-blue-900/20 px-3 py-1.5 rounded-lg">Save</button>
            }/>
            <main className="max-w-2xl mx-auto w-full p-4 md:p-6">
                <Section>
                    <Item 
                        label="Auto-reload" 
                        subText="Automatically add funds when your balance runs low"
                        isToggle 
                        detail={enabled} 
                        onClick={() => setEnabled(!enabled)}
                    />
                </Section>

                {enabled && (
                    <div className="animate-fade-in">
                        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 px-4">Configuration</h3>
                        <Section>
                            <div className="p-4 border-b border-slate-100 dark:border-slate-800">
                                <div className="flex justify-between items-center mb-2">
                                    <label className="font-medium text-sm">When balance falls below</label>
                                    <span className="font-bold text-slate-900 dark:text-white">${threshold}</span>
                                </div>
                                <input 
                                    type="range" 
                                    min="5" 
                                    max="50" 
                                    step="5" 
                                    value={threshold}
                                    onChange={e => setThreshold(Number(e.target.value))}
                                    className="w-full accent-blue-600"
                                />
                            </div>
                            <div className="p-4">
                                <div className="flex justify-between items-center mb-2">
                                    <label className="font-medium text-sm">Add amount</label>
                                    <span className="font-bold text-slate-900 dark:text-white">${amount}</span>
                                </div>
                                <input 
                                    type="range" 
                                    min="10" 
                                    max="100" 
                                    step="10" 
                                    value={amount}
                                    onChange={e => setAmount(Number(e.target.value))}
                                    className="w-full accent-blue-600"
                                />
                            </div>
                        </Section>
                    </div>
                )}
            </main>
        </div>
    );
};

const AddAddressScreen = ({ onBack, onSave }) => {
    const [form, setForm] = useState({ street: '', city: '', state: '', zip: '' });
    
    const isValid = form.street && form.city && form.state && form.zip;

    return (
        <div className="animate-slide-in">
            <Header title="Add Address" onBack={onBack} rightAction={
                <button 
                    onClick={() => isValid && onSave(form)} 
                    disabled={!isValid}
                    className="text-blue-600 font-semibold text-sm hover:bg-blue-50 dark:hover:bg-blue-900/20 px-3 py-1.5 rounded-lg disabled:opacity-50"
                >
                    Save
                </button>
            }/>
            <main className="max-w-2xl mx-auto w-full p-4 md:p-6">
                <Section>
                    <div className="p-4 border-b border-slate-100 dark:border-slate-800">
                        <label className="text-xs font-bold text-slate-500 uppercase mb-1 block">Street Address</label>
                        <input 
                            type="text" 
                            placeholder="e.g. 123 Main St"
                            value={form.street}
                            onChange={e => setForm({...form, street: e.target.value})}
                            className="w-full bg-transparent outline-none font-medium"
                        />
                    </div>
                    <div className="p-4 border-b border-slate-100 dark:border-slate-800">
                        <label className="text-xs font-bold text-slate-500 uppercase mb-1 block">City</label>
                        <input 
                            type="text" 
                            placeholder="e.g. San Francisco"
                            value={form.city}
                            onChange={e => setForm({...form, city: e.target.value})}
                            className="w-full bg-transparent outline-none font-medium"
                        />
                    </div>
                    <div className="flex">
                        <div className="flex-1 p-4 border-r border-slate-100 dark:border-slate-800">
                            <label className="text-xs font-bold text-slate-500 uppercase mb-1 block">State</label>
                            <input 
                                type="text" 
                                placeholder="CA"
                                value={form.state}
                                onChange={e => setForm({...form, state: e.target.value})}
                                className="w-full bg-transparent outline-none font-medium"
                            />
                        </div>
                        <div className="flex-1 p-4">
                            <label className="text-xs font-bold text-slate-500 uppercase mb-1 block">ZIP</label>
                            <input 
                                type="text" 
                                placeholder="94105"
                                value={form.zip}
                                onChange={e => setForm({...form, zip: e.target.value})}
                                className="w-full bg-transparent outline-none font-medium"
                            />
                        </div>
                    </div>
                </Section>
            </main>
        </div>
    );
};

const AllTransactionsScreen = ({ onBack, transactions, onSelect }) => (
    <div className="animate-slide-in">
        <Header title="All Transactions" onBack={onBack} />
        <main className="max-w-2xl mx-auto w-full p-4 md:p-6">
             <div className="relative mb-6 px-4 md:px-0">
                <input 
                    type="text" 
                    placeholder="Search transactions..." 
                    className="w-full bg-slate-100 dark:bg-slate-800 rounded-xl py-3 px-4 pl-10 outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                />
                <div className="absolute left-7 md:left-3 top-1/2 -translate-y-1/2 text-slate-400">
                    <Receipt size={18} />
                </div>
             </div>

             <Section title="History">
                {transactions.map(tx => (
                    <button 
                        key={tx.id} 
                        onClick={() => onSelect(tx)}
                        className="w-full p-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors text-left"
                    >
                        <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${tx.amount < 0 ? 'bg-slate-100 dark:bg-slate-800 text-slate-500' : 'bg-green-50 dark:bg-green-900/20 text-green-600'}`}>
                                {tx.amount < 0 ? <ShoppingBag size={18} /> : <Wallet size={18} />}
                            </div>
                            <div className="flex flex-col">
                                <span className="text-sm font-bold text-slate-900 dark:text-white">{tx.desc}</span>
                                <span className="text-[10px] text-slate-400">{tx.date}</span>
                            </div>
                        </div>
                        <div className="flex flex-col items-end">
                            <span className={`text-sm font-bold ${tx.amount > 0 ? 'text-green-600' : 'text-slate-900 dark:text-white'}`}>
                                {tx.amount > 0 ? '+' : ''}{tx.amount.toFixed(2)}
                            </span>
                            <span className="text-[10px] font-medium text-slate-400">Completed</span>
                        </div>
                    </button>
                ))}
             </Section>
        </main>
    </div>
);

const TransactionDetailScreen = ({ onBack, transaction }) => (
    <div className="animate-slide-in">
        <Header title="Transaction Details" onBack={onBack} />
        <main className="max-w-2xl mx-auto w-full p-4 md:p-6">
            <div className="flex flex-col items-center mb-8 mt-4">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${transaction.amount < 0 ? 'bg-slate-100 dark:bg-slate-800' : 'bg-green-100 dark:bg-green-900/30'}`}>
                    {transaction.amount < 0 ? <ShoppingBag size={24} className="text-slate-500" /> : <Wallet size={24} className="text-green-600" />}
                </div>
                <h2 className={`text-3xl font-bold mb-1 ${transaction.amount > 0 ? 'text-green-600' : 'text-slate-900 dark:text-white'}`}>
                    {transaction.amount > 0 ? '+' : ''}{transaction.amount.toFixed(2)} USD
                </h2>
                <span className="text-sm font-medium text-slate-500">{transaction.desc}</span>
                <span className="text-xs text-slate-400 mt-1">{transaction.date} • {transaction.time || '14:30'}</span>
            </div>

            <Section title="Summary">
                <Item 
                    label="Status" 
                    rightElement={<span className="text-xs font-bold bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-2 py-1 rounded">Completed</span>} 
                />
                <Item label="Transaction ID" detail={`TXN-8842-${transaction.id}`} />
                <Item label="Payment Method" detail="Mastercard •••• 4242" icon={CreditCard} />
                <Item label="Merchant" detail="SocialApp Ads LLC" />
            </Section>

            <Section title="Actions">
                <Item icon={Download} label="Download Invoice" onClick={() => {}} />
                <Item icon={AlertTriangle} label="Report a problem" onClick={() => {}} />
            </Section>
        </main>
    </div>
);

const PaymentSecurityScreen = ({ onBack, security, toggleSecurity }) => (
    <div className="animate-slide-in">
        <Header title="Payment Security" onBack={onBack} />
        <main className="max-w-2xl mx-auto w-full p-4 md:p-6">
            <div className="px-4 mb-6">
                <p className="text-sm text-slate-500">Manage how you access your saved payment methods.</p>
            </div>
            <Section>
                <Item 
                    icon={Lock} 
                    label="Require PIN" 
                    subText="Require a PIN for every purchase"
                    isToggle
                    detail={security.pin}
                    onClick={() => toggleSecurity('pin')}
                />
                <Item 
                    icon={Fingerprint} 
                    label="Biometric Authentication" 
                    subText="Use FaceID or TouchID to confirm payments"
                    isToggle
                    detail={security.biometric}
                    onClick={() => toggleSecurity('biometric')}
                />
            </Section>
        </main>
    </div>
);

const ShippingInfoScreen = ({ onBack, addresses, navigate }) => (
     <div className="animate-slide-in">
        <Header title="Shipping & Contact" onBack={onBack} />
        <main className="max-w-2xl mx-auto w-full p-4 md:p-6">
            <Section title="Shipping Address">
                {addresses.map(addr => (
                    <Item 
                        key={addr.id}
                        icon={MapPin} 
                        label={addr.label}
                        subText={`${addr.street}, ${addr.city}, ${addr.state} ${addr.zip}`}
                        rightElement={addr.default ? <span className="text-xs text-blue-600 font-bold">Default</span> : null}
                    />
                ))}
                <Item icon={Plus} label="Add New Address" onClick={() => navigate('add_address')} />
            </Section>
             <Section title="Contact Info">
                <Item icon={Mail} label="Receipt Email" subText="john.doe@example.com" />
                <Item icon={Smartphone} label="Phone Number" subText="+1 (555) 123-4567" />
            </Section>
        </main>
    </div>
);

const AddCardScreen = ({ onBack, onSave }) => {
    const [card, setCard] = useState({ number: '', expiry: '', cvc: '', zip: '' });
    const [loading, setLoading] = useState(false);

    const handleSave = () => {
        setLoading(true);
        setTimeout(() => {
            onSave({ 
                id: Date.now(), 
                type: 'Visa', 
                last4: card.number.slice(-4) || '8888', 
                expiry: card.expiry || '12/25' 
            });
            setLoading(false);
        }, 1500);
    };

    const isFormValid = card.number.length >= 16;

    return (
        <div className="animate-slide-in">
             <Header 
                title="Add Card" 
                onBack={onBack} 
                rightAction={
                    <button 
                        onClick={handleSave}
                        disabled={!isFormValid || loading}
                        className="text-blue-600 font-semibold text-sm hover:bg-blue-50 dark:hover:bg-blue-900/20 px-3 py-1.5 rounded-lg transition-colors disabled:opacity-50"
                    >
                        {loading ? <Loader2 size={16} className="animate-spin" /> : 'Save'}
                    </button>
                }
            />
             <main className="max-w-2xl mx-auto w-full p-4 md:p-6">
                <div className="bg-gradient-to-r from-slate-800 to-slate-900 text-white p-6 rounded-2xl shadow-xl mb-8 mx-4 h-48 flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                        <CreditCard className="text-white/80" />
                        <span className="font-mono text-white/50">DEBIT</span>
                    </div>
                    <div>
                        <div className="font-mono text-xl tracking-widest mb-4">
                            {card.number ? card.number.match(/.{1,4}/g).join(' ') : '•••• •••• •••• ••••'}
                        </div>
                        <div className="flex justify-between items-end">
                            <div className="text-xs text-white/70">
                                <p className="text-[10px] uppercase">Card Holder</p>
                                <p className="font-medium tracking-wide">YOUR NAME</p>
                            </div>
                            <div className="text-xs text-white/70">
                                <p className="text-[10px] uppercase">Expires</p>
                                <p className="font-medium tracking-wide">{card.expiry || 'MM/YY'}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <Section title="Card Details">
                    <div className="p-4 border-b border-slate-100 dark:border-slate-800">
                        <input 
                            type="text" 
                            placeholder="Card Number"
                            maxLength={16}
                            value={card.number}
                            onChange={e => setCard({...card, number: e.target.value.replace(/\D/g,'')})}
                            className="w-full bg-transparent outline-none text-slate-900 dark:text-white placeholder:text-slate-400 font-mono" 
                        />
                    </div>
                    <div className="flex">
                        <div className="flex-1 p-4 border-r border-slate-100 dark:border-slate-800">
                            <input 
                                type="text" 
                                placeholder="MM/YY"
                                maxLength={5}
                                value={card.expiry}
                                onChange={e => setCard({...card, expiry: e.target.value})}
                                className="w-full bg-transparent outline-none text-slate-900 dark:text-white placeholder:text-slate-400 text-center" 
                            />
                        </div>
                        <div className="flex-1 p-4">
                            <input 
                                type="text" 
                                placeholder="CVC"
                                maxLength={3}
                                value={card.cvc}
                                onChange={e => setCard({...card, cvc: e.target.value})}
                                className="w-full bg-transparent outline-none text-slate-900 dark:text-white placeholder:text-slate-400 text-center" 
                            />
                        </div>
                    </div>
                </Section>
                <Section title="Billing Address">
                     <div className="p-4">
                        <input 
                            type="text" 
                            placeholder="ZIP / Postal Code"
                            value={card.zip}
                            onChange={e => setCard({...card, zip: e.target.value})}
                            className="w-full bg-transparent outline-none text-slate-900 dark:text-white placeholder:text-slate-400" 
                        />
                    </div>
                </Section>
             </main>
        </div>
    )
}

const PaymentsScreen = ({ onBack, navigate, methods, history, removeMethod, selectTransaction, balance }) => (
    <div className="animate-slide-in">
        <Header title="Payments" onBack={onBack} />
        <main className="max-w-2xl mx-auto w-full p-4 md:p-6">
            
            {/* Balance Card */}
            <div className="px-4 mb-6">
                <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-6 text-white shadow-lg shadow-blue-500/20 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-20">
                        <Wallet size={100} />
                    </div>
                    <span className="text-blue-200 text-sm font-medium relative z-10">Available Credits</span>
                    <h2 className="text-3xl font-bold mt-1 relative z-10">${balance.toFixed(2)}</h2>
                    <div className="mt-6 flex gap-3 relative z-10">
                        <button 
                            onClick={() => navigate('add_funds')}
                            className="px-4 py-2 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-lg text-sm font-semibold transition-colors"
                        >
                            Add Funds
                        </button>
                        <button 
                            onClick={() => navigate('auto_reload')}
                            className="px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-lg text-sm font-semibold transition-colors"
                        >
                            Auto-reload
                        </button>
                    </div>
                </div>
            </div>

            {/* Quick Actions / Settings */}
            <Section title="Settings & Support">
                <Item 
                    icon={Lock} 
                    label="Payment Security" 
                    subText="PIN, Biometrics" 
                    onClick={() => navigate('payment_security')}
                />
                <Item 
                    icon={Truck} 
                    label="Shipping & Contact" 
                    subText="Addresses, receipt email"
                    onClick={() => navigate('shipping_info')}
                />
            </Section>

            <Section title="Payment Methods">
                {methods.map(method => (
                    <Item 
                        key={method.id}
                        icon={CreditCard}
                        label={`${method.type} •••• ${method.last4}`}
                        subText={`Expires ${method.expiry}`}
                        rightElement={
                            <button onClick={() => removeMethod(method.id)} className="p-2 text-slate-400 hover:text-red-500 transition-colors">
                                <Trash2 size={16} />
                            </button>
                        }
                    />
                ))}
                <Item 
                    icon={Plus} 
                    label="Add Payment Method" 
                    onClick={() => navigate('add_payment')}
                />
            </Section>

            <Section title="Transaction History">
                {history.slice(0, 3).map(tx => (
                    <button 
                        key={tx.id} 
                        onClick={() => selectTransaction(tx)}
                        className="w-full p-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors text-left"
                    >
                        <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${tx.amount < 0 ? 'bg-slate-100 dark:bg-slate-800 text-slate-500' : 'bg-green-50 dark:bg-green-900/20 text-green-600'}`}>
                                {tx.amount < 0 ? <ShoppingBag size={18} /> : <Wallet size={18} />}
                            </div>
                            <div className="flex flex-col">
                                <span className="text-sm font-bold text-slate-900 dark:text-white">{tx.desc}</span>
                                <span className="text-[10px] text-slate-400">{tx.date}</span>
                            </div>
                        </div>
                        <div className="flex flex-col items-end">
                            <span className={`text-sm font-bold ${tx.amount > 0 ? 'text-green-600' : 'text-slate-900 dark:text-white'}`}>
                                {tx.amount > 0 ? '+' : ''}{tx.amount.toFixed(2)}
                            </span>
                            <span className="text-[10px] font-medium text-slate-400">Completed</span>
                        </div>
                    </button>
                ))}
                <Item label="See all transactions" onClick={() => navigate('all_transactions')} />
            </Section>
        </main>
    </div>
);

/* ==================================================================================================
 * SCREEN: ACCOUNT CENTRE (HUB)
 * ================================================================================================== */

const AccountCentre = ({ onBack, navigate }) => {
  return (
    <div className="animate-slide-in">
      <Header title="Account Centre" onBack={onBack} />
      <main className="max-w-2xl mx-auto w-full pb-20 pt-6 px-0 md:px-4">
        
        {/* Profile Summary (Static) */}
        <div className="px-4 md:px-0 mb-8 animate-fade-in">
          <div className="w-full text-left relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 text-white shadow-xl shadow-blue-500/20">
             <div className="absolute -top-10 -right-10 w-40 h-40 bg-white rounded-full blur-3xl opacity-10"></div>
             <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-400 rounded-full blur-3xl opacity-20"></div>

              <div className="relative p-6 flex items-center gap-5 z-10">
                  <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center font-bold text-2xl">
                    JD
                  </div>
                  <div className="flex flex-col">
                    <h2 className="text-xl font-bold tracking-tight text-white leading-tight drop-shadow-sm">John Doe</h2>
                    <span className="text-blue-100 text-sm font-medium tracking-wide">@johndoe</span>
                  </div>
              </div>
          </div>
          <p className="text-xs text-slate-500 text-center mt-4 px-4">
            Manage your connected experiences and preferences across technologies.
          </p>
        </div>

        {/* Preferences Section */}
        <Section title="Preferences">
           <Item 
                icon={Megaphone} 
                label="Ad Preferences" 
                subText="Topics, activity, and data settings" 
                onClick={() => navigate('ad_preferences')}
            />
           <Item 
                icon={CreditCard} 
                label="Payments" 
                subText="Payment methods and transaction history"
                onClick={() => navigate('payments')}
            />
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

  // --- DATA STATE ---
  const [balance, setBalance] = useState(24.00);
  
  const [autoReload, setAutoReload] = useState({
      enabled: false,
      threshold: 10,
      amount: 20
  });

  const [addresses, setAddresses] = useState([
      { id: 1, label: 'Home', street: '123 Main St', city: 'San Francisco', state: 'CA', zip: '94105', default: true }
  ]);

  const [adTopics, setAdTopics] = useState([
      { id: 1, name: 'Technology', icon: Monitor, enabled: true },
      { id: 2, name: 'Fashion & Style', icon: ShoppingBag, enabled: true },
      { id: 3, name: 'Food & Drink', icon: Star, enabled: false },
      { id: 4, name: 'Travel', icon: LayoutGrid, enabled: true },
  ]);

  const [partnerDataEnabled, setPartnerDataEnabled] = useState(true);

  const [categories, setCategories] = useState([
      { id: 1, label: 'Employer: Tech Corp', icon: Briefcase },
      { id: 2, label: 'Education: University of Technology', icon: GraduationCap },
      { id: 3, label: 'Relationship status: Single', icon: Heart },
      { id: 4, label: 'Location: San Francisco, CA', icon: MapPin },
      { id: 5, label: 'Industry: Software', icon: Building },
  ]);

  const [paymentMethods, setPaymentMethods] = useState([
      { id: 101, type: 'Mastercard', last4: '4242', expiry: '09/26' }
  ]);

  const [transactions, setTransactions] = useState([
      { id: 1, desc: 'Ad Credits', amount: 25.00, date: 'Oct 24, 2023' },
      { id: 2, desc: 'Premium Sub', amount: -9.99, date: 'Oct 01, 2023' },
      { id: 3, desc: 'Boost Post', amount: -5.00, date: 'Sep 28, 2023' },
      { id: 4, desc: 'Ad Campaign #22', amount: -12.50, date: 'Sep 20, 2023' },
      { id: 5, desc: 'Refund', amount: 5.00, date: 'Sep 15, 2023' },
  ]);

  const [selectedTransaction, setSelectedTransaction] = useState(null);
  
  const [paymentSecurity, setPaymentSecurity] = useState({
      pin: true,
      biometric: false
  });

  // --- ACTIONS ---
  
  const toggleTheme = () => {
    setIsDark(!isDark);
    if (!isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const showToast = (msg) => {
      setToastMessage(msg);
      setTimeout(() => setToastMessage(''), 3000);
  };

  const toggleAdTopic = (id) => {
      setAdTopics(prev => prev.map(t => t.id === id ? { ...t, enabled: !t.enabled } : t));
  };

  const removeCategory = (id) => {
      setCategories(prev => prev.filter(c => c.id !== id));
      showToast('Category removed');
  };

  const addCategory = (label) => {
      setCategories(prev => [...prev, { id: Date.now(), label, icon: Tag }]);
      setCurrentScreen('categories');
      showToast('Category added');
  };

  const addPaymentMethod = (newMethod) => {
      setPaymentMethods([...paymentMethods, newMethod]);
      setCurrentScreen('payments');
      showToast('Payment method added');
  };

  const removePaymentMethod = (id) => {
      setPaymentMethods(prev => prev.filter(m => m.id !== id));
      showToast('Payment method removed');
  };

  const togglePaymentSecurity = (key) => {
      setPaymentSecurity(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleTransactionSelect = (tx) => {
      setSelectedTransaction(tx);
      setCurrentScreen('transaction_detail');
  };

  const handleAddFunds = (amount) => {
      setBalance(prev => prev + amount);
      const newTx = {
          id: Date.now(),
          desc: 'Added Funds',
          amount: amount,
          date: 'Just now'
      };
      setTransactions(prev => [newTx, ...prev]);
      setCurrentScreen('payments');
      showToast(`$${amount} added successfully`);
  };

  const handleAutoReloadSave = (settings) => {
      setAutoReload(settings);
      setCurrentScreen('payments');
      showToast('Auto-reload settings updated');
  };

  const handleAddAddress = (addr) => {
      const newAddr = {
          id: Date.now(),
          label: 'Custom',
          ...addr
      };
      setAddresses(prev => [...prev, newAddr]);
      setCurrentScreen('shipping_info');
      showToast('Address added');
  };

  // --- RENDER LOGIC ---

  const renderScreen = () => {
      switch(currentScreen) {
          // ACCOUNT CENTRE HUB
          case 'account_centre':
              return <AccountCentre onBack={() => setCurrentScreen('main')} navigate={setCurrentScreen} />;
          
          // AD PREFERENCES WORKFLOW
          case 'ad_preferences':
              return <AdPreferencesScreen onBack={() => setCurrentScreen('account_centre')} navigate={setCurrentScreen} />;
          case 'ad_topics':
              return <AdTopicsScreen onBack={() => setCurrentScreen('ad_preferences')} topics={adTopics} toggleTopic={toggleAdTopic} />;
          case 'ad_activity':
              return <AdActivityScreen onBack={() => setCurrentScreen('ad_preferences')} ads={[
                { id: 1, advertiser: 'TechStart', title: 'Boost your startup', action: 'Learn More', time: '1h ago' },
                { id: 2, advertiser: 'GreenLife', title: 'Sustainable living tips', action: 'Shop Now', time: '5h ago' },
                { id: 3, advertiser: 'TravelGo', title: 'Flight discounts', action: 'Book Now', time: '1d ago' }
              ]} />;
          case 'data_partners':
              return <DataPartnersScreen onBack={() => setCurrentScreen('ad_preferences')} enabled={partnerDataEnabled} setEnabled={setPartnerDataEnabled} />;
          case 'categories':
              return <CategoriesScreen onBack={() => setCurrentScreen('ad_preferences')} navigate={setCurrentScreen} categories={categories} removeCategory={removeCategory} />;
          case 'add_category':
              return <AddCategoryScreen onBack={() => setCurrentScreen('categories')} onSave={addCategory} />;

          // PAYMENTS WORKFLOW
          case 'payments':
              return <PaymentsScreen 
                        onBack={() => setCurrentScreen('account_centre')} 
                        navigate={setCurrentScreen} 
                        methods={paymentMethods} 
                        history={transactions}
                        removeMethod={removePaymentMethod}
                        selectTransaction={handleTransactionSelect}
                        balance={balance}
                     />;
          case 'add_payment':
              return <AddCardScreen onBack={() => setCurrentScreen('payments')} onSave={addPaymentMethod} />;
          case 'add_funds':
              return <AddFundsScreen onBack={() => setCurrentScreen('payments')} onAddFunds={handleAddFunds} />;
          case 'auto_reload':
              return <AutoReloadScreen onBack={() => setCurrentScreen('payments')} settings={autoReload} onSave={handleAutoReloadSave} />;
          case 'all_transactions':
              return <AllTransactionsScreen onBack={() => setCurrentScreen('payments')} transactions={transactions} onSelect={handleTransactionSelect} />;
          case 'transaction_detail':
              return <TransactionDetailScreen onBack={() => setCurrentScreen('payments')} transaction={selectedTransaction} />;
          case 'payment_security':
              return <PaymentSecurityScreen onBack={() => setCurrentScreen('payments')} security={paymentSecurity} toggleSecurity={togglePaymentSecurity} />;
          case 'shipping_info':
              return <ShippingInfoScreen onBack={() => setCurrentScreen('payments')} addresses={addresses} navigate={setCurrentScreen} />;
          case 'add_address':
              return <AddAddressScreen onBack={() => setCurrentScreen('shipping_info')} onSave={handleAddAddress} />;

          // MAIN SETTINGS (Entry)
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
                                <p className="text-blue-100 text-xs">Ad preferences and payments</p>
                            </div>
                            <ChevronRight className="ml-auto text-white/50 group-hover:translate-x-1 transition-transform" />
                          </div>
                      </button>
                    </div>

                    <Section title="App Settings">
                        <Item icon={Moon} label="Dark Mode" isToggle detail={isDark} onClick={toggleTheme} />
                        <Item icon={Bell} label="Notifications" detail="On" />
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
                        <p className="text-xs font-bold text-slate-500">SocialApp v5.1.0</p>
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
            
            .scrollbar-hide::-webkit-scrollbar { display: none; }
            .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        `}</style>
    </div>
  );
}
