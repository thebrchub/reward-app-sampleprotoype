import { useRef, useState } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { toPng } from 'html-to-image';
import { 
  Bell, CreditCard, Plane, Building2, Sparkles, Home, Compass, User, Download,
  ChevronRight, Smartphone, Tablet, Signal, Wifi, Battery, Loader2,
  Coffee, ShoppingBag
} from 'lucide-react';
import AiAssistant from './AiAssistant';
import Notifications from './Notifications';
import Profile from './Profile';


type DeviceType = 'iphone' | 'android' | 'ipad';

export default function App() {
  const appRef = useRef<HTMLDivElement>(null);
  const [activeDevice, setActiveDevice] = useState<DeviceType>('iphone');
  const [isExporting, setIsExporting] = useState(false);
  
  // Overlay States
  const [isAiChatOpen, setIsAiChatOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const deviceFileNames = {
    iphone: 'iPhone-Prototype',
    android: 'Android-Prototype',
    ipad: 'iPad-Prototype'
  };

  const handleDownload = async () => {
    if (!appRef.current) return;
    try {
      setIsExporting(true);
      await new Promise(resolve => setTimeout(resolve, 150));
      const dataUrl = await toPng(appRef.current, {
        pixelRatio: 3, 
        quality: 1.0,
        backgroundColor: 'transparent',
      });
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = `${deviceFileNames[activeDevice]}.png`;
      link.click();
    } catch (error) {
      console.error("Error generating image:", error);
    } finally {
      setIsExporting(false);
    }
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  const isIPad = activeDevice === 'ipad';


  const deviceStyles = {
    iphone: 'w-[393px] h-[852px] rounded-[3rem] border-[6px] border-[#1a1a1c]',
    android: 'w-[412px] h-[892px] rounded-[2.5rem] border-[6px] border-[#1a1a1c]',
    ipad: 'w-[834px] h-[1194px] rounded-[2rem] border-[10px] border-[#1a1a1c]'
  };

  return (
    <div className="min-h-screen bg-gray-200 flex items-center justify-center p-8 font-sans overflow-hidden relative">
      
      {/* NEW: Increased Size Client Reference Image (Moodboard Style) */}
      <AnimatePresence>
        {!isIPad && (
          <motion.div
            initial={{ opacity: 0, x: -80, rotate: -6 }}
            animate={{ opacity: 1, x: 0, rotate: -3 }}
            whileHover={{ rotate: -1, scale: 1.02 }}
            exit={{ opacity: 0, x: -80, rotate: -6 }}
            transition={{ type: "spring", stiffness: 150, damping: 20 }}
            className="fixed left-8 top-1/2 -translate-y-1/2 z-40 hidden 2xl:block"
          >
            <div className="bg-white p-6 pb-20 rounded-xl shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] border border-gray-200 w-[480px] relative transition-shadow duration-500 hover:shadow-[0_45px_70px_-10px_rgba(0,0,0,0.4)]">
              {/* Visual "tape" effect at the top */}
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-24 h-8 bg-white/40 backdrop-blur-md border border-white/80 rotate-2 shadow-sm rounded-sm"></div>
              
              <img 
                src="/refer.jpeg" 
                alt="Client Reference Wireframe" 
                className="w-full h-auto rounded-md border border-gray-100 opacity-90 mix-blend-multiply" 
              />
              
              <div className="absolute bottom-6 left-0 w-full px-8 flex justify-between items-center">
                <p className="text-gray-400 font-bold text-xs uppercase tracking-[0.2em]">
                  Original Concept
                </p>
                <div className="h-px bg-gray-100 flex-1 mx-4"></div>
                <p className="text-gray-300 font-medium text-xs italic">
                  Draft v1.0
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      

      {/* Floating Action Bar */}
      <div className="fixed top-8 right-8 flex flex-col items-end gap-4 z-[100]">
        <button 
          onClick={handleDownload}
          disabled={isExporting}
          className="flex items-center gap-2 bg-gray-900 text-white px-5 py-2.5 rounded-full shadow-lg hover:bg-gray-800 transition-colors disabled:bg-gray-600 disabled:cursor-not-allowed"
        >
          {isExporting ? <Loader2 size={18} className="animate-spin" /> : <Download size={18} />}
          <span className="text-sm font-medium">{isExporting ? 'Exporting...' : 'Export PNG'}</span>
        </button>

        <div className="flex flex-col gap-1.5 bg-white/90 backdrop-blur-md p-1.5 rounded-2xl shadow-xl border border-gray-100">
          <button onClick={() => setActiveDevice('iphone')} className={`flex items-center justify-center w-12 h-12 rounded-xl transition-all ${activeDevice === 'iphone' ? 'bg-gray-900 text-white shadow-md' : 'text-gray-500 hover:bg-gray-100 hover:text-gray-900'}`}><Smartphone size={20} /></button>
          <button onClick={() => setActiveDevice('android')} className={`flex items-center justify-center w-12 h-12 rounded-xl transition-all ${activeDevice === 'android' ? 'bg-gray-900 text-white shadow-md' : 'text-gray-500 hover:bg-gray-100 hover:text-gray-900'}`}><Smartphone size={22} className="scale-110" /></button>
          <button onClick={() => setActiveDevice('ipad')} className={`flex items-center justify-center w-12 h-12 rounded-xl transition-all ${activeDevice === 'ipad' ? 'bg-gray-900 text-white shadow-md' : 'text-gray-500 hover:bg-gray-100 hover:text-gray-900'}`}><Tablet size={24} /></button>
        </div>
      </div>

      {/* Main Device Container */}
      <div ref={appRef} className={`${deviceStyles[activeDevice]} bg-white shadow-2xl relative flex flex-col transition-all duration-500 ease-in-out overflow-hidden`}>
        
        {/* Overlays */}
        <AiAssistant isOpen={isAiChatOpen} onClose={() => setIsAiChatOpen(false)} isIPad={isIPad} />
        <Notifications isOpen={isNotificationsOpen} onClose={() => setIsNotificationsOpen(false)} isIPad={isIPad} />
        <Profile isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} isIPad={isIPad} />

        {/* Status Bar */}
        <div className={`absolute top-0 w-full flex justify-between items-center z-[60] pointer-events-none px-7 bg-[#FCFCFD] ${isIPad ? 'h-10' : 'h-[52px]'}`}>
          <span className={`font-semibold text-gray-900 tracking-tight ${isIPad ? 'text-[13px]' : 'text-[14px] mt-1'}`}>8:01</span>
          <div className={`flex items-center gap-1.5 text-gray-900 ${isIPad ? '' : 'mt-1'}`}>
            <Signal size={16} strokeWidth={2.5} />
            <Wifi size={16} strokeWidth={2.5} />
            <Battery size={18} strokeWidth={2} />
          </div>
        </div>

        {/* Hardware Cutouts */}
        {activeDevice === 'iphone' && <div className="absolute top-3 left-1/2 -translate-x-1/2 w-[110px] h-[30px] bg-[#1a1a1c] rounded-full z-[60] shadow-sm"></div>}
        {activeDevice === 'android' && <div className="absolute top-4 left-1/2 -translate-x-1/2 w-4 h-4 bg-[#1a1a1c] rounded-full z-[60]"></div>}
        
        {/* Scrollable Area */}
        <div className={`flex-1 overflow-y-auto bg-[#FCFCFD] scrollbar-hide ${isIPad ? 'pb-32' : 'pb-24'} pt-[40px]`}>
          
          <header className={`px-6 pt-6 pb-4 flex justify-between items-center bg-[#FCFCFD]/90 backdrop-blur-md sticky top-0 z-20 ${isIPad ? 'px-12' : ''}`}>
            <div className="flex items-center gap-3">
              <div className={`rounded-full bg-gradient-to-tr from-gray-200 to-gray-100 border border-gray-200 shadow-sm overflow-hidden ${isIPad ? 'w-12 h-12' : 'w-10 h-10'}`}>
                <img src="/avatar.svg" alt="Profile" className="w-full h-full object-cover opacity-80" />
              </div>
              <div>
                <p className={`text-gray-500 font-medium ${isIPad ? 'text-sm' : 'text-xs'}`}>Good Morning</p>
                <h1 className={`font-semibold text-gray-900 ${isIPad ? 'text-xl' : 'text-base'}`}>Alex Carter</h1>
              </div>
            </div>
            
            <button 
              onClick={() => setIsNotificationsOpen(true)}
              className={`relative rounded-full border border-gray-100 flex items-center justify-center text-gray-600 bg-white shadow-sm hover:bg-gray-50 transition-colors ${isIPad ? 'w-12 h-12' : 'w-10 h-10'}`}
            >
              <Bell size={isIPad ? 22 : 18} />
              <div className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></div>
            </button>
          </header>

          <motion.main variants={containerVariants} initial="hidden" animate="show" className={`px-6 py-4 space-y-6 ${isIPad ? 'px-12 space-y-8 max-w-5xl mx-auto' : ''}`}>
            
            <div className={`grid gap-4 ${isIPad ? 'grid-cols-2 gap-8' : 'grid-cols-2'}`}>
              <motion.div variants={itemVariants} className={`p-5 rounded-3xl bg-gradient-to-b from-gray-900 to-gray-800 text-white shadow-lg shadow-gray-200/50 ${isIPad ? 'p-8 rounded-[2rem]' : ''}`}>
                <p className={`font-medium text-gray-300 mb-1 ${isIPad ? 'text-base' : 'text-xs'}`}>Estimated Value</p>
                <h2 className={`font-semibold tracking-tight ${isIPad ? 'text-4xl' : 'text-2xl'}`}>$12,450</h2>
              </motion.div>
              <motion.div variants={itemVariants} className={`p-5 rounded-3xl bg-white border border-gray-100 shadow-sm flex flex-col justify-between ${isIPad ? 'p-8 rounded-[2rem]' : ''}`}>
                <p className={`font-medium text-gray-500 mb-1 ${isIPad ? 'text-base' : 'text-xs'}`}>Total Points</p>
                <h2 className={`font-semibold tracking-tight text-gray-900 ${isIPad ? 'text-4xl' : 'text-2xl'}`}>845.2K</h2>
              </motion.div>
            </div>

            <motion.div 
              variants={itemVariants} 
              onClick={() => setIsAiChatOpen(true)}
              className={`p-4 rounded-2xl bg-[#F4F4F5] border border-gray-200/60 flex items-center justify-between group cursor-pointer ${isIPad ? 'p-6 rounded-3xl' : ''}`}
            >
              <div className="flex items-center gap-3">
                <div className={`rounded-full bg-white shadow-sm flex items-center justify-center text-gray-900 ${isIPad ? 'w-12 h-12' : 'w-8 h-8'}`}>
                  <Sparkles size={isIPad ? 20 : 16} className="text-gray-900 group-hover:scale-110 transition-transform" />
                </div>
                <p className={`font-medium text-gray-700 ${isIPad ? 'text-lg' : 'text-sm'}`}>Ask AI how to maximize rewards</p>
              </div>
              <ChevronRight size={isIPad ? 24 : 16} className="text-gray-400 group-hover:text-gray-900 transition-colors" />
            </motion.div>

            <div className={`grid gap-4 ${isIPad ? 'grid-cols-3 gap-6' : 'grid-cols-2'}`}>
              <motion.div variants={itemVariants} className={`p-5 rounded-3xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow ${isIPad ? 'p-8 rounded-[2rem]' : ''}`}>
                <div className={`rounded-full bg-gray-50 flex items-center justify-center mb-6 ${isIPad ? 'w-12 h-12 mb-8' : 'w-8 h-8'}`}><CreditCard size={isIPad ? 20 : 16} className="text-gray-600" /></div>
                <div>
                  <h3 className={`font-semibold text-gray-900 mb-3 ${isIPad ? 'text-lg' : 'text-sm'}`}>Credit Cards</h3>
                  <div className="space-y-1.5">
                    <div className={`flex justify-between ${isIPad ? 'text-sm' : 'text-xs'}`}><span className="text-gray-500">Points</span><span className="font-medium text-gray-900">320K</span></div>
                    <div className={`flex justify-between ${isIPad ? 'text-sm' : 'text-xs'}`}><span className="text-gray-500">Value</span><span className="font-medium text-gray-900">$4,800</span></div>
                  </div>
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className={`p-5 rounded-3xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow ${isIPad ? 'p-8 rounded-[2rem]' : ''}`}>
                <div className={`rounded-full bg-gray-50 flex items-center justify-center mb-6 ${isIPad ? 'w-12 h-12 mb-8' : 'w-8 h-8'}`}><Plane size={isIPad ? 20 : 16} className="text-gray-600" /></div>
                <div>
                  <h3 className={`font-semibold text-gray-900 mb-3 ${isIPad ? 'text-lg' : 'text-sm'}`}>Travel Miles</h3>
                  <div className="space-y-1.5">
                    <div className={`flex justify-between ${isIPad ? 'text-sm' : 'text-xs'}`}><span className="text-gray-500">Points</span><span className="font-medium text-gray-900">410K</span></div>
                    <div className={`flex justify-between ${isIPad ? 'text-sm' : 'text-xs'}`}><span className="text-gray-500">Value</span><span className="font-medium text-gray-900">$6,150</span></div>
                  </div>
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className={`p-5 rounded-3xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow ${isIPad ? 'p-8 rounded-[2rem]' : ''}`}>
                <div className={`rounded-full bg-gray-50 flex items-center justify-center mb-6 ${isIPad ? 'w-12 h-12 mb-8' : 'w-8 h-8'}`}><Building2 size={isIPad ? 20 : 16} className="text-gray-600" /></div>
                <div>
                  <h3 className={`font-semibold text-gray-900 mb-3 ${isIPad ? 'text-lg' : 'text-sm'}`}>Hotel Loyalty</h3>
                  <div className="space-y-1.5">
                    <div className={`flex justify-between ${isIPad ? 'text-sm' : 'text-xs'}`}><span className="text-gray-500">Points</span><span className="font-medium text-gray-900">115K</span></div>
                    <div className={`flex justify-between ${isIPad ? 'text-sm' : 'text-xs'}`}><span className="text-gray-500">Value</span><span className="font-medium text-gray-900">$1,500</span></div>
                  </div>
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className={`p-5 rounded-3xl bg-gray-50 border border-gray-100 flex group cursor-pointer hover:bg-gray-100 transition-colors ${isIPad ? 'col-span-3 flex-row items-center justify-between p-8 rounded-[2rem] mt-2' : 'flex-col justify-between'}`}>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className={`font-semibold text-gray-900 ${isIPad ? 'text-lg' : 'text-sm'}`}>Discovery</h3>
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                  </div>
                  <p className={`text-gray-500 leading-relaxed ${isIPad ? 'text-base' : 'text-xs'}`}>Latest card offers & travel upgrades.</p>
                </div>
                <div className={`flex items-center font-medium text-gray-900 group-hover:underline ${isIPad ? 'text-base bg-white px-6 py-3 rounded-full shadow-sm' : 'mt-4 text-xs'}`}>
                  Explore offers <ChevronRight size={isIPad ? 18 : 12} className="ml-1" />
                </div>
              </motion.div>
            </div>

            <motion.div variants={itemVariants} className={`pt-2 w-full ${isIPad ? 'mt-8' : 'mt-4'}`}>
              <div className="flex justify-between items-end mb-6">
                <div>
                  <h3 className={`font-semibold text-gray-900 ${isIPad ? 'text-2xl' : 'text-lg'}`}>Recent Activity</h3>
                  <p className={`text-gray-500 mt-1 ${isIPad ? 'text-base' : 'text-xs'}`}>Your latest point transactions.</p>
                </div>
                <button className={`font-medium text-gray-400 hover:text-gray-900 transition-colors ${isIPad ? 'text-base' : 'text-xs'}`}>
                  View all
                </button>
              </div>

              <div className="space-y-4">
                <div className={`p-4 rounded-3xl bg-white border border-gray-100 flex items-center justify-between hover:shadow-md transition-shadow cursor-pointer ${isIPad ? 'p-6' : ''}`}>
                  <div className="flex items-center gap-4">
                    <div className={`rounded-full bg-blue-50 text-blue-600 flex items-center justify-center ${isIPad ? 'w-14 h-14' : 'w-10 h-10'}`}><Plane size={isIPad ? 24 : 18} /></div>
                    <div>
                      <h4 className={`font-semibold text-gray-900 ${isIPad ? 'text-lg' : 'text-sm'}`}>ANA Airlines</h4>
                      <p className={`text-gray-500 ${isIPad ? 'text-sm mt-1' : 'text-xs'}`}>Business Upgrade</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <h4 className={`font-semibold text-gray-900 ${isIPad ? 'text-lg' : 'text-sm'}`}>-115,000</h4>
                    <p className={`text-gray-500 ${isIPad ? 'text-sm mt-1' : 'text-xs'}`}>Today</p>
                  </div>
                </div>

                <div className={`p-4 rounded-3xl bg-white border border-gray-100 flex items-center justify-between hover:shadow-md transition-shadow cursor-pointer ${isIPad ? 'p-6' : ''}`}>
                  <div className="flex items-center gap-4">
                    <div className={`rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center ${isIPad ? 'w-14 h-14' : 'w-10 h-10'}`}><ShoppingBag size={isIPad ? 24 : 18} /></div>
                    <div>
                      <h4 className={`font-semibold text-gray-900 ${isIPad ? 'text-lg' : 'text-sm'}`}>Equinox</h4>
                      <p className={`text-gray-500 ${isIPad ? 'text-sm mt-1' : 'text-xs'}`}>Membership</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <h4 className={`font-semibold text-emerald-600 ${isIPad ? 'text-lg' : 'text-sm'}`}>+3,200</h4>
                    <p className={`text-gray-500 ${isIPad ? 'text-sm mt-1' : 'text-xs'}`}>Yesterday</p>
                  </div>
                </div>

                <div className={`p-4 rounded-3xl bg-white border border-gray-100 flex items-center justify-between hover:shadow-md transition-shadow cursor-pointer ${isIPad ? 'p-6' : ''}`}>
                  <div className="flex items-center gap-4">
                    <div className={`rounded-full bg-amber-50 text-amber-600 flex items-center justify-center ${isIPad ? 'w-14 h-14' : 'w-10 h-10'}`}><Coffee size={isIPad ? 24 : 18} /></div>
                    <div>
                      <h4 className={`font-semibold text-gray-900 ${isIPad ? 'text-lg' : 'text-sm'}`}>Starbucks</h4>
                      <p className={`text-gray-500 ${isIPad ? 'text-sm mt-1' : 'text-xs'}`}>Food & Dining</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <h4 className={`font-semibold text-amber-600 ${isIPad ? 'text-lg' : 'text-sm'}`}>+120</h4>
                    <p className={`text-gray-500 ${isIPad ? 'text-sm mt-1' : 'text-xs'}`}>May 12</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.main>
        </div>

        {/* Bottom Nav */}
        {isIPad ? (
           <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-max bg-white/90 backdrop-blur-2xl border border-gray-200/60 rounded-full px-8 py-4 flex gap-12 shadow-2xl z-20 items-center">
             <button className="text-gray-900 hover:scale-110 transition-transform"><Home size={24} className="fill-gray-900" /></button>
             <button className="text-gray-400 hover:text-gray-900 hover:scale-110 transition-all"><CreditCard size={24} /></button>
             <button onClick={() => setIsAiChatOpen(true)} className="w-14 h-14 rounded-full bg-gray-900 text-white flex items-center justify-center shadow-lg hover:scale-105 transition-transform"><Sparkles size={24} /></button>
             <button className="text-gray-400 hover:text-gray-900 hover:scale-110 transition-all"><Compass size={24} /></button>
             <button onClick={() => setIsProfileOpen(true)} className="text-gray-400 hover:text-gray-900 hover:scale-110 transition-all"><User size={24} /></button>
           </div>
        ) : (
          <div className="absolute bottom-0 w-full bg-white/90 backdrop-blur-lg border-t border-gray-100 px-6 py-5 pb-8 flex justify-between items-center z-20">
            <button className="flex flex-col items-center gap-1 text-gray-900"><Home size={20} className="fill-gray-900" /><span className="text-[10px] font-medium">Home</span></button>
            <button className="flex flex-col items-center gap-1 text-gray-400 hover:text-gray-900 transition-colors"><CreditCard size={20} /><span className="text-[10px] font-medium">Cards</span></button>
            <div className="relative -top-5">
              <button onClick={() => setIsAiChatOpen(true)} className="w-14 h-14 rounded-full bg-gray-900 text-white flex items-center justify-center shadow-xl shadow-gray-300 hover:scale-105 transition-transform"><Sparkles size={24} /></button>
            </div>
            <button className="flex flex-col items-center gap-1 text-gray-400 hover:text-gray-900 transition-colors"><Compass size={20} /><span className="text-[10px] font-medium">Travel</span></button>
            <button onClick={() => setIsProfileOpen(true)} className="flex flex-col items-center gap-1 text-gray-400 hover:text-gray-900 transition-colors"><User size={20} /><span className="text-[10px] font-medium">Profile</span></button>
          </div>
        )}
      </div>
    </div>
  );
}