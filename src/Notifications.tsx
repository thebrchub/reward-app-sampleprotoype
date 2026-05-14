import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, 
  Check, 
  ArrowDownLeft, 
  Sparkles, 
  Plane, 
  CreditCard,
  MoreHorizontal
} from 'lucide-react';
import { useState } from 'react';

interface NotificationsProps {
  isOpen: boolean;
  onClose: () => void;
  isIPad?: boolean;
}

const mockNotifications = [
  {
    id: 1,
    type: 'ai',
    title: 'Optimization Opportunity',
    message: 'Transfer 50K points to Star Alliance partners for a 20% bonus until Friday.',
    time: '2m ago',
    unread: true,
    icon: Sparkles,
    color: 'bg-gray-900 text-white'
  },
  {
    id: 2,
    type: 'deposit',
    title: 'Payment Received',
    message: 'Your invoice to TechFlow Inc for $4,500.00 has cleared and is available.',
    time: '1h ago',
    unread: true,
    icon: ArrowDownLeft,
    color: 'bg-green-100 text-green-700'
  },
  {
    id: 3,
    type: 'travel',
    title: 'Flight Upgrade Available',
    message: 'Your upcoming flight to JFK is eligible for a business class upgrade using 15K points.',
    time: 'Yesterday',
    unread: false,
    icon: Plane,
    color: 'bg-blue-100 text-blue-700'
  },
  {
    id: 4,
    type: 'card',
    title: 'New Card Pre-Approved',
    message: 'Based on your spend, you are pre-approved for the Obsidian Reserve Card.',
    time: 'Yesterday',
    unread: false,
    icon: CreditCard,
    color: 'bg-gray-100 text-gray-700'
  }
];

export default function Notifications({ isOpen, onClose, isIPad }: NotificationsProps) {
  const [notifications, setNotifications] = useState(mockNotifications);

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, unread: false })));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop for iPad side-panel */}
          {isIPad && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="absolute inset-0 bg-gray-900/20 backdrop-blur-sm z-40"
            />
          )}

          {/* Main Notification Panel */}
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className={`absolute top-0 right-0 h-full bg-[#FCFCFD] z-50 flex flex-col shadow-2xl ${
              isIPad ? 'w-[420px] rounded-r-[2rem] border-l border-gray-100' : 'w-full rounded-[2.5rem] md:rounded-[3rem]'
            }`}
          >
            {/* Safe Area Top Spacing */}
            <div className={`w-full ${isIPad ? 'h-16' : 'h-14'}`}></div>

            {/* Header */}
            <div className="px-6 py-4 flex items-center justify-between border-b border-gray-100 bg-[#FCFCFD] sticky top-0 z-10">
              <div className="flex items-center gap-4">
                <button 
                  onClick={onClose}
                  className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors -ml-2"
                >
                  <ChevronLeft size={24} />
                </button>
                <h2 className="text-xl font-semibold text-gray-900 tracking-tight">Notifications</h2>
              </div>
              
              <button 
                onClick={markAllAsRead}
                className="w-10 h-10 rounded-full flex items-center justify-center text-gray-500 hover:text-gray-900 hover:bg-gray-50 transition-colors"
                title="Mark all as read"
              >
                <Check size={20} />
              </button>
            </div>

            {/* Scrollable List */}
            <div className="flex-1 overflow-y-auto scrollbar-hide p-6 space-y-8 pb-24">
              
              {/* Category: Recent */}
              <div>
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4 px-2">Recent</h3>
                <div className="space-y-2">
                  <AnimatePresence>
                    {notifications.filter(n => n.unread).map((notif, i) => (
                      <motion.div 
                        key={notif.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="p-4 rounded-3xl bg-white border border-gray-100 shadow-sm flex gap-4 cursor-pointer hover:shadow-md transition-shadow relative overflow-hidden group"
                      >
                        {/* Unread Indicator */}
                        <div className="absolute top-1/2 -translate-y-1/2 left-2 w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                        
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ml-2 ${notif.color}`}>
                          <notif.icon size={20} />
                        </div>
                        
                        <div className="flex-1 min-w-0 pr-4">
                          <div className="flex justify-between items-start mb-1">
                            <h4 className="font-semibold text-sm text-gray-900 truncate pr-2">{notif.title}</h4>
                            <span className="text-[10px] text-gray-400 whitespace-nowrap pt-0.5">{notif.time}</span>
                          </div>
                          <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">
                            {notif.message}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>

              {/* Category: Earlier */}
              <div>
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4 px-2">Earlier</h3>
                <div className="space-y-1">
                  {notifications.filter(n => !n.unread).map((notif, i) => (
                    <motion.div 
                      key={notif.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: (i + 2) * 0.1 }}
                      className="p-4 rounded-3xl flex gap-4 cursor-pointer hover:bg-gray-50 transition-colors group"
                    >
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ml-3 opacity-60 grayscale group-hover:grayscale-0 transition-all ${notif.color}`}>
                        <notif.icon size={18} />
                      </div>
                      
                      <div className="flex-1 min-w-0 pr-2">
                        <div className="flex justify-between items-start mb-0.5">
                          <h4 className="font-medium text-sm text-gray-700">{notif.title}</h4>
                          <span className="text-[10px] text-gray-400 whitespace-nowrap pt-0.5">{notif.time}</span>
                        </div>
                        <p className="text-xs text-gray-500 leading-relaxed line-clamp-1">
                          {notif.message}
                        </p>
                      </div>
                      <button className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-gray-900 transition-opacity">
                        <MoreHorizontal size={16} />
                      </button>
                    </motion.div>
                  ))}
                </div>
              </div>

            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}