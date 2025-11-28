import React, { useState, useEffect, useRef } from 'react';
import { 
  Home, Compass, MessageCircle, Film, User, 
  Plus, Settings, LogOut, Moon, Sun, Phone, LayoutGrid, Heart, 
  MessageSquare, UserPlus, ArrowLeft, MapPin, Link2, Calendar, 
  Grid3X3, Tag, Image as ImageIcon, Search, UserCheck, Lock, MoreHorizontal, Send, Bookmark,
  ChevronLeft, ChevronRight, Smile, ChevronUp, ChevronDown, Share, Copy, Flag, AlertCircle, Trash2, CornerDownRight
} from 'lucide-react';

/* ==================================================================================================
 * 1. CONFIGURATION & DATA
 * ================================================================================================== */

const NAV_ITEMS = [
  { id: 'feed', label: 'Feed', icon: Home },
  { id: 'explore', label: 'Explore', icon: Compass },
  { id: 'profile', label: 'Profile', icon: User },
];

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
    caption: i % 2 === 0 ? "Enjoying the little things in life! 🌟 #lifestyle #photography" : "Throwback to this amazing day! 🌊☀️",
    timestamp: `${i + 1} days ago`
  }));
};

const USERS_LIST = [
  { id: 1, name: 'Sarah Wilson', handle: '@sarah_w', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80', isFollowing: true, isFollower: true, isPrivate: false, bio: 'Nature lover 🌿 | Photography 📷' },
  { id: 2, name: 'Mike Chen', handle: '@mike_c', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80', isFollowing: false, isFollower: true, isPrivate: true, bio: 'Tech enthusiast. Private account.' },
  { id: 3, name: 'Alex Morgan', handle: '@alex_m', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80', isFollowing: false, isFollower: false, isPrivate: false, bio: 'Just living life one day at a time.' },
  { id: 4, name: 'Emily Rose', handle: '@emily_r', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80', isFollowing: true, isFollower: false, isPrivate: false, bio: 'Artist & Designer 🎨' },
  { id: 5, name: 'David Kim', handle: '@david_k', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&q=80', isFollowing: true, isFollower: false, isPrivate: true, bio: 'Musician 🎸' },
  { id: 6, name: 'Jessica Lee', handle: '@jess_lee', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80', isFollowing: false, isFollower: true, isPrivate: true, bio: 'Private life.' },
];

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
  posts: generateMockPosts('me', 12)
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

/* ==================================================================================================
 * 3. STATS VIEW COMPONENT
 * ================================================================================================== */

const StatsView = ({ initialTab = 'followers', onUserClick }) => {
  const [activeTab, setActiveTab] = useState(initialTab);
  useEffect(() => { setActiveTab(initialTab); }, [initialTab]);

  const getFilteredUsers = () => {
    switch (activeTab) {
      case 'followers': return USERS_LIST.filter(user => user.isFollower);
      case 'following': return USERS_LIST.filter(user => user.isFollowing);
      case 'suggestions': return USERS_LIST.filter(user => !user.isFollowing);
      default: return USERS_LIST;
    }
  };
  const filteredUsers = getFilteredUsers();

  return (
    <div className="flex flex-col h-full bg-white dark:bg-slate-950 animate-fade-in">
      <div className="flex border-b border-slate-100 dark:border-slate-800 px-4 mt-2">
        {['followers', 'following', 'suggestions'].map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)} className={`flex-1 py-3 text-sm font-bold border-b-2 transition-colors capitalize ${activeTab === tab ? 'border-slate-900 dark:border-white text-slate-900 dark:text-white' : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}>{tab}</button>
        ))}
      </div>
      <div className="p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input type="text" placeholder={`Search ${activeTab}...`} className="w-full pl-9 pr-4 py-2.5 bg-slate-100 dark:bg-slate-900 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500/20 text-slate-900 dark:text-white placeholder-slate-500" />
        </div>
      </div>
      <div className="flex-1 overflow-y-auto px-4 pb-4">
          {filteredUsers.map((user) => (
            <div key={user.id} onClick={() => onUserClick(user.id)} className="flex items-center justify-between p-3 mb-1 hover:bg-slate-50 dark:hover:bg-slate-900 rounded-xl transition-colors cursor-pointer group">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden"><img src={user.avatar} alt={user.name} className="w-full h-full object-cover" /></div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm leading-tight flex items-center gap-1">{user.name} {user.isPrivate && <Lock size={12} className="text-slate-400" />}</h4>
                  <p className="text-slate-500 text-xs">{user.handle}</p>
                </div>
              </div>
              <button onClick={(e) => e.stopPropagation()} className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${user.isFollowing ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700' : 'bg-blue-500 text-white hover:bg-blue-600'}`}>{user.isFollowing ? 'Following' : 'Follow'}</button>
            </div>
          ))}
          {filteredUsers.length === 0 && <div className="flex flex-col items-center justify-center py-12 text-center text-slate-500"><UserCheck size={48} className="mb-4 opacity-20" /><p>No users found.</p></div>}
      </div>
    </div>
  );
};

/* ==================================================================================================
 * 4. POST DETAIL VIEW (Immersive & Functional)
 * ================================================================================================== */

// Extracted CommentItem to prevent re-renders and focus loss
const CommentItem = ({ comment, isReply = false, parentId = null, onReply, onLike, onDelete, onViewMoreReplies }) => {
  // Calculate visible replies based on state
  const totalReplies = comment.replies ? comment.replies.length : 0;
  const visibleCount = comment.visibleRepliesCount || 3; // Default show last 3
  const startIndex = Math.max(0, totalReplies - visibleCount);
  const visibleReplies = comment.replies ? comment.replies.slice(startIndex) : [];
  const hiddenRepliesCount = startIndex;

  return (
    <div className={`flex items-start gap-3 group animate-fade-in ${isReply ? 'mt-4' : ''}`}>
      <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-800 flex-shrink-0 mt-0.5 border border-slate-100 dark:border-slate-800 flex items-center justify-center text-xs font-bold text-slate-500">
        {comment.username.charAt(0)}
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-sm text-slate-900 dark:text-white leading-snug">
          <span className="font-bold mr-2">{comment.username}</span>
          <span className="font-light opacity-90">{comment.text}</span>
        </div>
        <div className="flex items-center gap-4 mt-1.5 text-[11px] text-slate-500 dark:text-slate-400 font-medium">
          <span>{comment.time}</span>
          {comment.likes > 0 && <span>{comment.likes} likes</span>}
          
          {/* Only allow replying to main comments (not replies) */}
          {!isReply && (
            <button onClick={() => onReply(comment.id, comment.username)} className="hover:text-slate-900 dark:hover:text-white transition-colors">Reply</button>
          )}
          
          {comment.isOwn && (
            <button onClick={() => onDelete(comment.id, parentId)} className="hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100">
              <Trash2 size={12} />
            </button>
          )}
        </div>

        {/* Nested Replies Render Logic */}
        {!isReply && totalReplies > 0 && (
          <div className="mt-3 relative">
            {/* View More Replies Button */}
            {hiddenRepliesCount > 0 && (
              <button 
                onClick={() => onViewMoreReplies(comment.id)}
                className="flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-slate-900 dark:hover:text-slate-300 mb-3 pl-2 relative z-10"
              >
                <div className="w-6 h-[1px] bg-slate-300 dark:bg-slate-700 mr-1"></div>
                View {hiddenRepliesCount} previous replies
              </button>
            )}

            {/* Render Visible Replies */}
            {visibleReplies.map(reply => (
               <CommentItem 
                  key={reply.id} 
                  comment={reply} 
                  isReply={true} 
                  parentId={comment.id} 
                  onReply={onReply}
                  onLike={onLike}
                  onDelete={onDelete}
               />
            ))}
          </div>
        )}
      </div>
      <button onClick={() => onLike(comment.id)} className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-red-500 transition-opacity pt-1">
        <Heart size={12} className={`${comment.isLiked ? 'fill-red-500 text-red-500' : ''}`} />
      </button>
    </div>
  );
};

const PostDetailView = ({ initialPost, user }) => {
  const validUser = user && user.posts ? user : { posts: [] };
  const validInitialPost = initialPost || { id: null };

  const initialIndex = validUser.posts.findIndex(p => p.id === validInitialPost.id);
  const [currentIndex, setCurrentIndex] = useState(initialIndex >= 0 ? initialIndex : 0);
  
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [replyingTo, setReplyingTo] = useState(null); 
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);
  const [isShareMenuOpen, setIsShareMenuOpen] = useState(false);
  
  const imageContainerRef = useRef(null);
  const scrollTimeoutRef = useRef(null);
  const inputRef = useRef(null);
  const commentsEndRef = useRef(null);

  useEffect(() => {
    if (validUser.posts.length > 0) {
      const newIndex = validUser.posts.findIndex(p => p.id === validInitialPost.id);
      if (newIndex >= 0) setCurrentIndex(newIndex);
    }
  }, [validInitialPost.id, validUser.posts]);

  useEffect(() => {
    const currentPost = validUser.posts[currentIndex];
    if (!currentPost) return;

    setLikes(currentPost.likes || 0);
    setIsLiked(false);
    setIsSaved(false);
    setInputValue('');
    setReplyingTo(null);
    setIsMoreMenuOpen(false);
    setIsShareMenuOpen(false);
    
    // Mock comments with nested replies for testing "View More"
    const mockComments = Array(8).fill(null).map((_, i) => ({
      id: `root-${i}`,
      username: `user_${i + 1}`,
      text: i % 2 === 0 ? "This aesthetics are unreal! 😍✨" : "Sending good vibes your way 🔥",
      time: `${i + 1}h`,
      likes: (i + 1) * 5,
      isLiked: false,
      visibleRepliesCount: 3, // Default to showing last 3
      // Add tons of replies to the first comment to test pagination
      replies: i === 0 ? Array(15).fill(null).map((_, ri) => ({
         id: `reply-${i}-${ri}`,
         username: `replier_${ri}`,
         text: `This is reply number ${ri + 1}`,
         time: '10m',
         likes: 0,
         isLiked: false,
         isOwn: false
      })) : []
    }));
    setComments(mockComments);
  }, [currentIndex, validUser.posts]);

  const post = validUser.posts[currentIndex];
  
  if (!post || !user) {
      return (
        <div className="flex flex-col items-center justify-center h-full text-slate-500 p-8">
            <AlertCircle size={48} className="mb-2 opacity-20" />
            <p>Post not found</p>
        </div>
      );
  }

  const hasNext = currentIndex < validUser.posts.length - 1;
  const hasPrev = currentIndex > 0;

  // --- ACTIONS ---

  const handleLikePost = () => {
    setIsLiked(!isLiked);
    setLikes(prev => isLiked ? prev - 1 : prev + 1);
  };

  const handleSavePost = () => {
    setIsSaved(!isSaved);
  };

  const handleCommentSubmit = () => {
    if (!inputValue.trim()) return;
    
    const newComment = {
      id: Date.now(),
      username: 'You',
      text: inputValue,
      time: 'Just now',
      likes: 0,
      isLiked: false,
      isOwn: true,
      replies: []
    };

    if (replyingTo) {
      setComments(prev => prev.map(c => {
        if (c.id === replyingTo.id) {
          // When adding a reply, update replies array AND increment visible count so it shows
          return { 
            ...c, 
            replies: [...c.replies, newComment],
            visibleRepliesCount: (c.visibleRepliesCount || 3) + 1 
          };
        }
        return c;
      }));
      setReplyingTo(null);
    } else {
      setComments(prev => [...prev, newComment]);
    }

    setInputValue('');
    // Small delay to allow render
    setTimeout(() => {
       if(replyingTo) {
         // For replies, we don't scroll to bottom, maybe just ensure parent is visible (complex)
         // Keeping simple for now
       } else {
         commentsEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
       }
    }, 100);
  };

  const handleReply = (commentId, username) => {
    setReplyingTo({ id: commentId, username });
    setInputValue(`@${username} `);
    inputRef.current?.focus();
  };

  const handleLikeComment = (commentId) => {
    setComments(prev => prev.map(c => {
      if (c.id === commentId) return { ...c, isLiked: !c.isLiked, likes: c.isLiked ? c.likes - 1 : c.likes + 1 };
      if (c.replies && c.replies.length > 0) {
          return { ...c, replies: c.replies.map(r => r.id === commentId ? { ...r, isLiked: !r.isLiked } : r) };
      }
      return c;
    }));
  };

  const handleDeleteComment = (commentId, parentId = null) => {
    if (parentId) {
      setComments(prev => prev.map(c => {
        if (c.id === parentId) return { ...c, replies: c.replies.filter(r => r.id !== commentId) };
        return c;
      }));
    } else {
      setComments(prev => prev.filter(c => c.id !== commentId));
    }
  };

  const handleViewMoreReplies = (commentId) => {
    setComments(prev => prev.map(c => {
      if (c.id === commentId) {
        // Show 10 more previous replies
        return { ...c, visibleRepliesCount: (c.visibleRepliesCount || 3) + 10 };
      }
      return c;
    }));
  };

  const handlePrev = (e) => {
    e?.stopPropagation();
    if (hasPrev) setCurrentIndex(prev => prev - 1);
  };

  const handleNext = (e) => {
    e?.stopPropagation();
    if (hasNext) setCurrentIndex(prev => prev + 1);
  };

  useEffect(() => {
    const container = imageContainerRef.current;
    if (!container) return;

    const handleWheel = (e) => {
      e.preventDefault();
      if (scrollTimeoutRef.current) return;

      const direction = e.deltaY > 0 ? 1 : -1;
      setCurrentIndex(prevIndex => {
        const nextIndex = prevIndex + direction;
        if (nextIndex >= 0 && nextIndex < validUser.posts.length) {
           scrollTimeoutRef.current = setTimeout(() => { scrollTimeoutRef.current = null; }, 300);
           return nextIndex;
        }
        return prevIndex;
      });
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      container.removeEventListener('wheel', handleWheel);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, [validUser.posts.length]);

  return (
    <div className="relative w-full h-full bg-slate-50 dark:bg-slate-950 flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-center transition-all duration-700 ease-in-out opacity-20 blur-3xl scale-125 z-0" style={{ backgroundImage: `url(${post.image})` }}></div>
      <div className="absolute inset-0 bg-slate-50/50 dark:bg-slate-950/70 z-0"></div>

      <div className="relative z-10 w-full h-full md:h-[92%] md:w-[95%] md:max-w-7xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl md:rounded-3xl overflow-hidden shadow-2xl border border-slate-200/50 dark:border-slate-800/50 flex flex-col md:flex-row transition-all duration-300">
        
        {/* LEFT */}
        <div ref={imageContainerRef} className="relative flex-1 bg-slate-100/50 dark:bg-black/30 flex items-center justify-center group overflow-hidden select-none">
          <img src={post.image} alt="Post" className="w-full h-full object-contain pointer-events-none drop-shadow-md transition-transform duration-500" />
          
          <div className="absolute bottom-6 right-6 z-20 flex flex-col gap-1 p-1 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md rounded-full border border-slate-200 dark:border-slate-700 shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
            <button onClick={handlePrev} disabled={!hasPrev} className={`p-2.5 rounded-full text-slate-700 dark:text-slate-200 transition-all ${hasPrev ? 'hover:bg-slate-100 dark:hover:bg-slate-800 active:scale-95' : 'opacity-30 cursor-not-allowed'}`}><ChevronUp size={20} strokeWidth={2.5} /></button>
            <div className="h-px w-6 bg-slate-200 dark:bg-slate-700 mx-auto"></div>
            <button onClick={handleNext} disabled={!hasNext} className={`p-2.5 rounded-full text-slate-700 dark:text-slate-200 transition-all ${hasNext ? 'hover:bg-slate-100 dark:hover:bg-slate-800 active:scale-95' : 'opacity-30 cursor-not-allowed'}`}><ChevronDown size={20} strokeWidth={2.5} /></button>
          </div>
        </div>

        {/* RIGHT */}
        <div className="w-full md:w-[420px] flex flex-col h-[50vh] md:h-full bg-white dark:bg-slate-900 md:border-l border-slate-200 dark:border-slate-800 relative">
          
          <div className="p-4 md:p-5 flex items-center justify-between border-b border-slate-100 dark:border-slate-800 flex-shrink-0 z-20 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full p-[2px] bg-gradient-to-tr from-pink-500 to-orange-500">
                <div className="w-full h-full rounded-full overflow-hidden border-2 border-white dark:border-slate-900"><img src={user.avatar} alt={user.name} className="w-full h-full object-cover" /></div>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-sm text-slate-900 dark:text-white leading-none hover:opacity-70 cursor-pointer">{user.name}</span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-1">{user.location || 'Original Audio'} • <span className="text-slate-400 font-normal">Following</span></span>
              </div>
            </div>
            <div className="relative">
              <button onClick={() => setIsMoreMenuOpen(!isMoreMenuOpen)} className="text-slate-500 hover:text-slate-900 dark:hover:text-white p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"><MoreHorizontal size={20} /></button>
              {isMoreMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden animate-pop-in z-30">
                  <button className="w-full text-left px-4 py-3 text-sm text-red-500 font-bold hover:bg-slate-50 dark:hover:bg-slate-700 flex items-center gap-2"><AlertCircle size={16} /> Report</button>
                  <div className="h-px bg-slate-100 dark:bg-slate-700"></div>
                  <button onClick={() => setIsMoreMenuOpen(false)} className="w-full text-left px-4 py-3 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700">Cancel</button>
                </div>
              )}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-slate-700">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full overflow-hidden bg-slate-200 dark:bg-slate-800 flex-shrink-0 mt-1"><img src={user.avatar} alt={user.name} className="w-full h-full object-cover" /></div>
              <div className="flex-1">
                <p className="text-sm text-slate-900 dark:text-white leading-relaxed"><span className="font-bold mr-2">{user.handle}</span>{post.caption}</p>
                <p className="text-[10px] text-slate-400 mt-2 uppercase tracking-wide font-medium">{post.timestamp}</p>
              </div>
            </div>
            <div className="h-px w-full bg-slate-100 dark:bg-slate-800"></div>
            
            <div className="space-y-6 pb-4">
              {comments.map((comment) => (
                <CommentItem 
                  key={comment.id} 
                  comment={comment} 
                  onReply={handleReply}
                  onLike={handleLikeComment}
                  onDelete={handleDeleteComment}
                  onViewMoreReplies={handleViewMoreReplies}
                />
              ))}
              <div ref={commentsEndRef} />
            </div>
          </div>

          <div className="flex-shrink-0 border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 relative z-20">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-5">
                <button onClick={handleLikePost} className="group transition-transform active:scale-90"><Heart size={26} className={`${isLiked ? 'fill-red-500 text-red-500' : 'text-slate-900 dark:text-white group-hover:text-slate-600 dark:group-hover:text-slate-300'} transition-colors`} /></button>
                <button onClick={() => inputRef.current?.focus()} className="group hover:opacity-70 transition-opacity"><MessageSquare size={26} className="text-slate-900 dark:text-white" /></button>
                <div className="relative">
                  <button onClick={() => setIsShareMenuOpen(!isShareMenuOpen)} className="group hover:opacity-70 transition-opacity"><Send size={26} className="text-slate-900 dark:text-white" /></button>
                  {isShareMenuOpen && (
                    <div className="absolute bottom-full left-0 mb-2 w-48 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden animate-pop-in">
                      <button className="w-full text-left px-4 py-2.5 text-sm hover:bg-slate-50 dark:hover:bg-slate-700 flex items-center gap-2"><Link2 size={14} /> Copy Link</button>
                    </div>
                  )}
                </div>
              </div>
              <button onClick={handleSavePost} className="group transition-transform active:scale-90"><Bookmark size={26} className={`${isSaved ? 'fill-yellow-500 text-yellow-500' : 'text-slate-900 dark:text-white group-hover:text-slate-600'} transition-colors`} /></button>
            </div>
            
            <div className="flex items-baseline gap-2 mb-4">
              <p className="font-bold text-sm text-slate-900 dark:text-white">{likes.toLocaleString()} likes</p>
              <span className="text-xs text-slate-500">• {post.timestamp}</span>
            </div>

            {replyingTo && (
              <div className="flex items-center justify-between bg-slate-50 dark:bg-slate-800/50 px-3 py-1.5 rounded-t-lg mb-1 text-xs text-slate-500">
                <span>Replying to <span className="font-bold text-slate-900 dark:text-white">@{replyingTo.username}</span></span>
                <button onClick={() => { setReplyingTo(null); setInputValue(''); }} className="hover:text-red-500"><X size={14} /></button>
              </div>
            )}

            <div className="flex items-center gap-3 bg-slate-100 dark:bg-slate-800 rounded-full px-4 py-2.5 transition-colors focus-within:bg-white dark:focus-within:bg-black/20 focus-within:ring-2 focus-within:ring-blue-500/20 shadow-inner">
              <button className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"><Smile size={20} /></button>
              <input 
                ref={inputRef}
                type="text" 
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleCommentSubmit()}
                placeholder={replyingTo ? `Reply to ${replyingTo.username}...` : "Add a comment..."} 
                className="flex-1 bg-transparent text-sm text-slate-900 dark:text-white outline-none placeholder-slate-500 dark:placeholder-slate-400"
              />
              <button onClick={handleCommentSubmit} disabled={!inputValue.trim()} className="text-blue-500 font-bold text-xs hover:text-blue-600 disabled:opacity-50 uppercase tracking-wide transition-opacity">Post</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ==================================================================================================
 * 5. PROFILE VIEW COMPONENT
 * ================================================================================================== */

const ProfileView = ({ onOpenStats, onPostClick, userId }) => {
  const [activeTab, setActiveTab] = useState('posts');
  
  let profileData = MY_PROFILE_DATA;
  if (userId && userId !== 'me') {
    const foundUser = USERS_LIST.find(u => u.id === parseInt(userId) || u.id === userId);
    if (foundUser) {
      profileData = {
        ...foundUser,
        isCurrentUser: false,
        posts_count: 87, followers: 1204, following: 450,
        cover_image: 'https://images.unsplash.com/photo-1557683316-973673baf926?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80',
        location: 'San Francisco, CA', website: 'example.com', joined: '2023',
        posts: generateMockPosts(userId, 12)
      };
    }
  }
  
  const isPrivateRestricted = profileData.isPrivate && !profileData.isFollowing && !profileData.isCurrentUser;

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
            
            <div className="relative group flex-shrink-0 md:row-span-3">
              <div className="w-24 h-24 md:w-36 md:h-36 rounded-full border-4 border-white dark:border-slate-950 overflow-hidden bg-white dark:bg-slate-900 shadow-lg">
                <img src={profileData.avatar} alt="Profile" className="w-full h-full object-cover" />
              </div>
              {profileData.isCurrentUser && (
                <button className="absolute bottom-1 right-1 md:bottom-2 md:right-2 bg-blue-500 text-white p-1.5 md:p-2 rounded-full border-2 border-white dark:border-slate-950 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity">
                  <Plus size={16} strokeWidth={3} />
                </button>
              )}
            </div>

            <div className="min-w-0 md:mt-2">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 md:gap-4">
                <div>
                  <h2 className="text-xl md:text-3xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    {profileData.name}
                    {profileData.isPrivate && <Lock size={18} className="text-slate-400" />}
                    {profileData.isCurrentUser && <span className="text-blue-500"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg></span>}
                  </h2>
                  <p className="text-xs md:text-base text-slate-500 dark:text-slate-400 font-medium">{profileData.handle}</p>
                </div>
                
                <div className="flex items-center gap-2 md:gap-3">
                  {profileData.isCurrentUser ? (
                    <>
                      <button className="px-3 md:px-6 py-1.5 md:py-2 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white rounded-lg md:rounded-xl font-bold text-xs md:text-sm hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors border border-slate-200 dark:border-slate-700">Edit</button>
                      <button className="px-3 md:px-6 py-1.5 md:py-2 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white rounded-lg md:rounded-xl font-bold text-xs md:text-sm hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors border border-slate-200 dark:border-slate-700">Share</button>
                      <button className="p-1.5 md:p-2 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white rounded-lg md:rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors border border-slate-200 dark:border-slate-700"><Settings size={18} className="md:w-5 md:h-5" /></button>
                    </>
                  ) : (
                    <>
                      <button className={`px-6 py-1.5 md:py-2 rounded-lg md:rounded-xl font-bold text-xs md:text-sm transition-colors shadow-sm ${
                        profileData.isFollowing 
                          ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700' 
                          : 'bg-blue-600 text-white hover:bg-blue-700'
                      }`}>
                        {profileData.isFollowing ? 'Following' : (profileData.isPrivate ? 'Requested' : 'Follow')}
                      </button>
                      <button className="px-6 py-1.5 md:py-2 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white rounded-lg md:rounded-xl font-bold text-xs md:text-sm hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors border border-slate-200 dark:border-slate-700">Message</button>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="col-span-2 md:col-span-1 flex items-center gap-6 md:gap-10">
              <div className="flex items-baseline gap-1"><span className="font-bold text-slate-900 dark:text-white text-lg">{profileData.posts_count}</span><span className="text-slate-500 text-sm">posts</span></div>
              <button onClick={() => !isPrivateRestricted && onOpenStats('followers')} disabled={isPrivateRestricted} className={`flex items-baseline gap-1 group transition-opacity text-left ${isPrivateRestricted ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:opacity-70'}`}><span className={`font-bold text-slate-900 dark:text-white text-lg transition-colors ${!isPrivateRestricted && 'group-hover:text-blue-500'}`}>{profileData.followers}</span><span className="text-slate-500 text-sm">followers</span></button>
              <button onClick={() => !isPrivateRestricted && onOpenStats('following')} disabled={isPrivateRestricted} className={`flex items-baseline gap-1 group transition-opacity text-left ${isPrivateRestricted ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:opacity-70'}`}><span className={`font-bold text-slate-900 dark:text-white text-lg transition-colors ${!isPrivateRestricted && 'group-hover:text-blue-500'}`}>{profileData.following}</span><span className="text-slate-500 text-sm">following</span></button>
            </div>

            <div className="col-span-2 md:col-span-1 max-w-2xl">
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm md:text-base">{profileData.bio}</p>
              {!isPrivateRestricted && (
                <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-4 text-xs md:text-sm text-slate-500 dark:text-slate-400">
                  <div className="flex items-center gap-1.5"><MapPin size={16} /> {profileData.location}</div>
                  <div className="flex items-center gap-1.5 hover:text-blue-500 cursor-pointer transition-colors"><Link2 size={16} /> {profileData.website}</div>
                  <div className="flex items-center gap-1.5"><Calendar size={16} /> Joined {profileData.joined}</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {isPrivateRestricted ? (
        <div className="flex flex-col items-center justify-center py-20 px-4 text-center border-t border-slate-100 dark:border-slate-800 animate-fade-in">
          <div className="w-20 h-20 rounded-full border-2 border-slate-300 dark:border-slate-700 flex items-center justify-center mb-4 text-slate-400 dark:text-slate-600"><Lock size={32} /></div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">This Account is Private</h3>
          <p className="text-slate-500 max-w-xs text-sm">Follow this account to see their photos and videos.</p>
        </div>
      ) : (
        <>
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

          <div className="px-1 md:px-8">
            {activeTab === 'posts' ? (
              <div className="grid grid-cols-3 gap-0.5 md:gap-4 lg:gap-6">
                {profileData.posts.map((post) => (
                  <div key={post.id} onClick={() => onPostClick(post, profileData)} className="relative group aspect-square bg-slate-200 dark:bg-slate-800 overflow-hidden md:rounded-xl cursor-pointer">
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
        </>
      )}
    </div>
  );
};

/* ==================================================================================================
 * 6. CONTENT AREA
 * ================================================================================================== */

const ContentArea = ({ activeTab, onPushView, statsTab, viewParams }) => {
  if (activeTab === 'profile') {
    return (
      <div className="flex-1 overflow-y-auto overflow-x-hidden scroll-smooth relative h-full">
        <ProfileView userId="me" onOpenStats={(tab) => onPushView('stats', { initialTab: tab })} onPostClick={(post, user) => onPushView('post-detail', { post, user })} />
      </div>
    );
  }

  if (activeTab === 'user-profile') {
    const userId = viewParams?.['user-profile']?.userId;
    return (
      <div className="flex-1 overflow-y-auto overflow-x-hidden scroll-smooth relative h-full">
        <ProfileView userId={userId} onOpenStats={(tab) => onPushView('stats', { initialTab: tab })} onPostClick={(post, user) => onPushView('post-detail', { post, user })} />
      </div>
    );
  }

  if (activeTab === 'stats') {
    const initialTab = viewParams?.['stats']?.initialTab || statsTab;
    return (
      <div className="flex-1 overflow-y-auto overflow-x-hidden scroll-smooth relative h-full">
        <StatsView initialTab={initialTab} onUserClick={(id) => onPushView('user-profile', { userId: id })} />
      </div>
    );
  }

  if (activeTab === 'post-detail') {
    const { post, user } = viewParams?.['post-detail'] || {};
    return (
      <div className="flex-1 overflow-hidden relative h-full">
        <PostDetailView initialPost={post} user={user} />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
      <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2 capitalize">{activeTab}</h2>
      <p className="text-slate-500">This section is under construction.</p>
    </div>
  );
}

/* ==================================================================================================
 * 7. LAYOUT COMPONENTS & MAIN
 * ================================================================================================== */
const MobileLayout = ({ navStack, activeTab, handleBack, handleNavClick, handlePushView, sharedState, statsTab }) => {
  const { isUserMenuOpen, setIsUserMenuOpen, notificationRef } = sharedState; // removed undefined isNotificationsOpen props
  const [isCornerMenuOpen, setIsCornerMenuOpen] = useState(false);

  const ArcMenuItem = ({ item, onClick, angle, delay }) => {
    if (!item) return null; // Guard clause for undefined items
    const radius = 105;
    const bottom = Math.cos(angle * (Math.PI / 180)) * radius;
    const right = Math.sin(angle * (Math.PI / 180)) * radius;
    return (
      <button onClick={() => { onClick(item.id); setIsCornerMenuOpen(false); }} style={{ bottom: `${bottom}px`, right: `${right}px`, transform: 'translate(50%, 50%)', animationDelay: `${delay}ms` }} className="absolute w-12 h-12 rounded-full shadow-xl flex items-center justify-center bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 text-slate-700 dark:text-slate-200 animate-pop-in hover:scale-110 hover:bg-blue-50 dark:hover:bg-slate-700 transition-transform z-50 will-change-transform">
        <item.icon size={20} />
      </button>
    );
  };

  const MobileNavItem = ({ item }) => {
    if (!item) return null; // Guard clause
    const isActive = navStack[0] === item.id;
    return (
      <button onClick={() => { handleNavClick(item.id); setIsCornerMenuOpen(false); }} className={`flex flex-col items-center justify-center w-full h-full gap-1 transition-all duration-200 ${isActive ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400 dark:text-slate-500'} ${isCornerMenuOpen ? 'blur-sm opacity-40 pointer-events-none' : ''}`}>
        <item.icon size={24} strokeWidth={isActive ? 2.5 : 2} className={`transition-transform duration-200 ${isActive ? '-translate-y-1' : ''}`} />
        <span className="text-[9px] font-medium">{item.label}</span>
      </button>
    );
  };

  return (
    <div className="flex flex-col h-full w-full md:hidden">
      <header className="h-14 flex-none px-4 flex items-center justify-between border-b border-slate-200/50 dark:border-slate-800/50 bg-white/50 dark:bg-slate-950/50 backdrop-blur-md sticky top-0 z-30">
        <div className="flex items-center gap-3">
          {navStack.length > 1 ? (
            <button onClick={handleBack} className="p-1 -ml-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800"><ArrowLeft size={24} /></button>
          ) : (
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white"><span className="font-bold text-sm">S</span></div>
          )}
          <span className="font-bold text-lg">{activeTab === 'post-detail' ? 'Post' : (navStack.length > 1 ? '' : 'SocialApp')}</span>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => { handleNavClick('chats'); setIsCornerMenuOpen(false); }} className={`p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors ${activeTab === 'chats' ? 'text-blue-500' : 'text-slate-600 dark:text-slate-300'}`}><MessageCircle size={20} /></button>
        </div>
      </header>
      <ContentArea activeTab={activeTab} onPushView={handlePushView} statsTab={statsTab} viewParams={sharedState.viewParams} />
      {isCornerMenuOpen && <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 animate-fade-in" onClick={() => setIsCornerMenuOpen(false)} />}
      {isCornerMenuOpen && (
        <div className="fixed bottom-24 right-[10%] z-[60] pointer-events-none">
          <div className="relative pointer-events-auto">
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full border-[40px] border-slate-100/10 dark:border-slate-800/40 blur-2xl pointer-events-none animate-fade-in"></div>
             {/* Only render arc items for existing nav items or remove completely if irrelevant */}
             <ArcMenuItem item={NAV_ITEMS.find(n => n.id === 'profile')} onClick={handleNavClick} angle={90} delay={100} />
          </div>
        </div>
      )}
      <div className={`fixed bottom-0 left-0 right-0 h-16 border-t flex items-center justify-around px-2 z-50 pb-safe transition-all duration-300 ${isCornerMenuOpen ? 'bg-transparent border-transparent pointer-events-none' : 'bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800'}`}>
        <div className="z-30 flex items-center justify-center w-full"><MobileNavItem item={NAV_ITEMS[0]} /></div>
        <div className="z-30 flex items-center justify-center w-full"><MobileNavItem item={NAV_ITEMS[1]} /></div>
        <div className="relative -top-6 z-30"><button onClick={() => setIsCornerMenuOpen(false)} className={`w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-lg shadow-blue-600/30 border-4 border-slate-50 dark:border-slate-950 active:scale-95 transition-all duration-200 ${isCornerMenuOpen ? 'blur-sm opacity-40 pointer-events-none' : ''}`}><Plus size={28} strokeWidth={2.5} /></button></div>
        <div className="z-30 flex items-center justify-center w-full"><MobileNavItem item={NAV_ITEMS[2]} /></div>
        <div className="z-50 flex items-center justify-center w-full pointer-events-auto"><button onClick={() => setIsCornerMenuOpen(!isCornerMenuOpen)} className={`flex flex-col items-center justify-center w-full h-full gap-1 ${isCornerMenuOpen ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400 dark:text-slate-500'}`}><div className={`transition-transform duration-300 ${isCornerMenuOpen ? 'rotate-90' : ''}`}><LayoutGrid size={24} strokeWidth={2.5} /></div><span className="text-[9px] font-medium">Menu</span></button></div>
      </div>
    </div>
  );
};

const DesktopLayout = ({ navStack, activeTab, handleBack, handleNavClick, handlePushView, sharedState, statsTab }) => {
  const { isUserMenuOpen, setIsUserMenuOpen, isDark, toggleTheme, handleSettingsClick } = sharedState; // Cleaned props
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

      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 flex-none px-8 flex items-center justify-between border-b border-slate-200/50 dark:border-slate-800/50 bg-white/50 dark:bg-slate-950/50 backdrop-blur-md sticky top-0 z-20">
          <div className="flex items-center gap-4 w-full max-w-md">
            {navStack.length > 1 ? (
               <button onClick={handleBack} className="flex items-center gap-2 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"><ArrowLeft size={20} /></button>
            ) : (
              <h1 className="text-xl font-bold capitalize text-slate-900 dark:text-white mr-8">{activeTab === 'user-profile' ? 'Profile' : activeTab === 'post-detail' ? 'Post' : activeTab}</h1>
            )}
          </div>
          <div className="flex items-center gap-5">
            {/* Notifications Removed */}
          </div>
        </header>
        <ContentArea activeTab={activeTab} onPushView={handlePushView} statsTab={statsTab} viewParams={sharedState.viewParams} />
      </div>
    </div>
  );
};

export default function SocialLayout() {
  const [activeTab, setActiveTab] = useState('profile');
  const [navStack, setNavStack] = useState(['profile']);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [statsTab, setStatsTab] = useState('followers'); 
  const [viewParams, setViewParams] = useState({});
  const notificationRef = useRef(null);

  useEffect(() => {
    if (isDarkMode) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [isDarkMode]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isNotificationsOpen && notificationRef.current && !notificationRef.current.contains(event.target)) setIsNotificationsOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isNotificationsOpen]);

  const handleNavClick = (id) => {
    if (id === activeTab && navStack.length === 1) return;
    setNavStack([id]);
    setActiveTab(id);
  };

  const handlePushView = (viewId, extraData = {}) => {
    if (viewId === 'stats' && extraData.initialTab) setStatsTab(extraData.initialTab);
    setViewParams(prev => ({ ...prev, [viewId]: extraData }));
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

  const sharedState = {
    isNotificationsOpen, setIsNotificationsOpen, notificationRef, handleViewAllNotifications,
    isUserMenuOpen, setIsUserMenuOpen, isDark: isDarkMode, toggleTheme: () => setIsDarkMode(!isDarkMode),
    handleSettingsClick, viewParams
  };

  return (
    <div className="flex h-screen w-full bg-slate-50 dark:bg-slate-950 font-sans text-slate-900 dark:text-white overflow-hidden selection:bg-blue-100 selection:text-blue-900">
      <MobileLayout navStack={navStack} activeTab={activeTab} handleBack={handleBack} handleNavClick={handleNavClick} handlePushView={handlePushView} sharedState={sharedState} statsTab={statsTab} />
      <DesktopLayout navStack={navStack} activeTab={activeTab} handleBack={handleBack} handleNavClick={handleNavClick} handlePushView={handlePushView} sharedState={sharedState} statsTab={statsTab} />
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
