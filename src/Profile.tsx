import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { 
  ChevronLeft, 
  User, 
  Shield, 
  CreditCard, 
  Link as LinkIcon, 
  Bell, 
  Moon, 
  HelpCircle, 
  LogOut, 
  ChevronRight, 
  Star,
  Settings
} from 'lucide-react';

interface ProfileProps {
  isOpen: boolean;
  onClose: () => void;
  isIPad?: boolean;
}

export default function Profile({ isOpen, onClose, isIPad }: ProfileProps) {
  // Page slide transition
  const pageVariants: Variants = {
    hidden: { x: '100%' },
    show: { 
      x: 0, 
      transition: { type: "spring", damping: 30, stiffness: 300, staggerChildren: 0.1, delayChildren: 0.1 } 
    },
    exit: { 
      x: '100%', 
      transition: { type: "spring", damping: 30, stiffness: 300 } 
    }
  };

  // Staggered list items
  const itemVariants: Variants = {
    hidden: { opacity: 0, x: 20 },
    show: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  const menuSections = [
    {
      title: "Account",
      items: [
        { icon: User, label: "Personal Information" },
        { icon: Shield, label: "Security & Face ID" },
        { icon: CreditCard, label: "Payment Methods" },
        { icon: LinkIcon, label: "Connected Accounts" },
      ]
    },
    {
      title: "Preferences",
      items: [
        { icon: Bell, label: "Push Notifications" },
        { icon: Moon, label: "Dark Mode", value: "Off" },
        { icon: Settings, label: "App Settings" },
      ]
    },
    {
      title: "Support",
      items: [
        { icon: HelpCircle, label: "Help Center" },
      ]
    }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          variants={pageVariants}
          initial="hidden"
          animate="show"
          exit="exit"
          // z-[45] sits right below the notifications (z-50) and status bar (z-60)
          className="absolute inset-0 z-[45] bg-[#FCFCFD] flex flex-col"
        >
          {/* Safe Area Top Spacing to clear the Status Bar */}
          <div className={`w-full ${isIPad ? 'h-10' : 'h-[52px]'}`}></div>

          {/* Header */}
          <header className={`px-6 pt-4 pb-4 flex items-center justify-between bg-[#FCFCFD]/90 backdrop-blur-md sticky top-0 z-10 ${isIPad ? 'px-12 pt-8' : ''}`}>
            <button 
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors -ml-2"
            >
              <ChevronLeft size={24} />
            </button>
            <h1 className="text-lg font-semibold text-gray-900 tracking-tight">Profile</h1>
            <div className="w-10"></div> {/* Spacer for centering */}
          </header>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto scrollbar-hide pb-12">
            <div className={`px-6 space-y-8 ${isIPad ? 'max-w-4xl mx-auto px-12 pt-8' : 'pt-4'}`}>
              
              {/* Profile Card */}
              <motion.div variants={itemVariants} className="flex flex-col items-center">
                <div className={`rounded-full bg-gradient-to-tr from-gray-200 to-gray-100 border-4 border-white shadow-xl overflow-hidden mb-4 ${isIPad ? 'w-32 h-32' : 'w-24 h-24'}`}>
                  <img src="/avatar.svg" alt="Alex Carter" className="w-full h-full object-cover opacity-80" />
                </div>
                <h2 className={`font-bold text-gray-900 tracking-tight ${isIPad ? 'text-3xl' : 'text-2xl'}`}>Alex Carter</h2>
                <p className={`text-gray-500 font-medium mt-1 ${isIPad ? 'text-base' : 'text-sm'}`}>alex.carter@example.com</p>
                
                {/* Premium Tier Badge */}
                <div className="mt-4 inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-gray-900 text-white shadow-md">
                  <Star size={14} className="fill-white" />
                  <span className="text-xs font-semibold tracking-wide uppercase">Obsidian Member</span>
                </div>
              </motion.div>

              {/* Menu Sections */}
              <div className="space-y-6">
                {menuSections.map((section, idx) => (
                  <motion.div key={idx} variants={itemVariants}>
                    <h3 className={`font-semibold text-gray-400 uppercase tracking-wider mb-3 px-4 ${isIPad ? 'text-sm' : 'text-xs'}`}>
                      {section.title}
                    </h3>
                    <div className="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-sm">
                      {section.items.map((item, i) => (
                        <div 
                          key={i}
                          className={`flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 transition-colors group ${
                            i !== section.items.length - 1 ? 'border-b border-gray-50' : ''
                          } ${isIPad ? 'p-6' : ''}`}
                        >
                          <div className="flex items-center gap-4">
                            <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-500 group-hover:text-gray-900 group-hover:bg-gray-100 transition-colors">
                              <item.icon size={18} />
                            </div>
                            <span className={`font-medium text-gray-700 group-hover:text-gray-900 transition-colors ${isIPad ? 'text-lg' : 'text-[15px]'}`}>
                              {item.label}
                            </span>
                          </div>
                          <div className="flex items-center gap-3">
                            {item.value && (
                              <span className="text-sm font-medium text-gray-400">{item.value}</span>
                            )}
                            <ChevronRight size={18} className="text-gray-300 group-hover:text-gray-600 transition-colors" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Log Out Button */}
              <motion.div variants={itemVariants} className="pt-4">
                <button className={`w-full py-4 rounded-2xl border border-red-100 bg-red-50 text-red-600 font-semibold flex items-center justify-center gap-2 hover:bg-red-100 hover:border-red-200 transition-colors ${isIPad ? 'text-lg' : 'text-[15px]'}`}>
                  <LogOut size={18} />
                  Log Out
                </button>
              </motion.div>

              <div className="text-center pt-4 pb-4">
                <p className="text-xs text-gray-400 font-medium tracking-wide">Version 2.4.0 (Build 842)</p>
                </div>

            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}