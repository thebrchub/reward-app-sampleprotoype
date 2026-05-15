import { useState } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { 
  ChevronLeft, Lock, Eye, Settings, Utensils, Plane, ShoppingBag, CheckCircle2, Wifi
} from 'lucide-react';

interface CardsProps {
  isOpen: boolean;
  onClose: () => void;
  isIPad?: boolean;
}

// FIXED: Using standard Tailwind colors guarantees the gradients will compile perfectly
const mockCards = [
  {
    id: 1,
    name: 'Obsidian Reserve',
    last4: '8842',
    network: 'Visa Infinite',
    points: '320,450',
    value: '$4,800',
    gradient: 'from-slate-900 via-gray-900 to-black', 
    textColor: 'text-white',
    ring: 'ring-1 ring-white/10 shadow-2xl shadow-black/40',
    multipliers: [
      { category: 'Travel', rate: '5x', icon: Plane },
      { category: 'Dining', rate: '3x', icon: Utensils },
    ],
  },
  {
    id: 2,
    name: 'Lumina Platinum',
    last4: '4091',
    network: 'Mastercard',
    points: '185,000',
    value: '$1,850',
    gradient: 'from-gray-100 via-white to-gray-200', 
    textColor: 'text-gray-900',
    ring: 'ring-1 ring-black/5 shadow-xl shadow-gray-300/50',
    multipliers: [
      { category: 'Shopping', rate: '4x', icon: ShoppingBag },
      { category: 'Everything', rate: '1.5x', icon: CheckCircle2 },
    ],
  },
  {
    id: 3,
    name: 'Velocity Preferred',
    last4: '1102',
    network: 'Visa Signature',
    points: '64,200',
    value: '$642',
    gradient: 'from-slate-800 via-indigo-950 to-slate-900', 
    textColor: 'text-white',
    ring: 'ring-1 ring-white/10 shadow-xl shadow-indigo-900/20',
    multipliers: [
      { category: 'Travel', rate: '3x', icon: Plane },
      { category: 'Dining', rate: '2x', icon: Utensils },
    ],
  }
];

export default function Cards({ isOpen, onClose, isIPad }: CardsProps) {
  const [activeCardId, setActiveCardId] = useState(mockCards[0].id);

  const activeCard = mockCards.find(c => c.id === activeCardId) || mockCards[0];
  const inactiveCards = mockCards.filter(c => c.id !== activeCardId);

  const pageVariants: Variants = {
    hidden: { x: '100%' },
    show: { x: 0, transition: { type: "spring", damping: 30, stiffness: 300 } },
    exit: { x: '100%', transition: { type: "spring", damping: 30, stiffness: 300 } }
  };

  const contentVariants: Variants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
    exit: { opacity: 0, y: -10, transition: { duration: 0.2 } }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          variants={pageVariants}
          initial="hidden"
          animate="show"
          exit="exit"
          className="absolute inset-0 z-[45] bg-[#FCFCFD] flex flex-col"
        >
          <div className={`w-full ${isIPad ? 'h-10' : 'h-[52px]'}`}></div>

          <header className={`px-6 pt-4 pb-4 flex items-center justify-between sticky top-0 z-20 bg-[#FCFCFD]/90 backdrop-blur-md ${isIPad ? 'px-12 pt-8' : ''}`}>
            <button onClick={onClose} className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors -ml-2">
              <ChevronLeft size={24} />
            </button>
            <h1 className="text-lg font-semibold text-gray-900 tracking-tight">Card Vault</h1>
            <div className="w-10"></div> 
          </header>

          <div className="flex-1 overflow-y-auto scrollbar-hide pb-32">
            
            {/* HERO CARD SLOT */}
            <div className={`px-6 pt-2 pb-8 ${isIPad ? 'px-12 max-w-4xl mx-auto' : ''}`}>
              <motion.div
                layoutId={`card-container-${activeCard.id}`}
                className={`relative w-full aspect-[1.58/1] rounded-[1.5rem] p-6 flex flex-col justify-between bg-gradient-to-tr ${activeCard.gradient} ${activeCard.ring}`}
              >
                {/* Shiny overlay for realistic plastic/metal feel */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-50 rounded-[1.5rem] pointer-events-none" />
                
                <div className={`relative z-10 flex justify-between items-start ${activeCard.textColor}`}>
                  <span className="font-bold tracking-wider text-lg opacity-90">{activeCard.name}</span>
                  <Wifi size={24} className="opacity-70 rotate-90" />
                </div>

                <div className={`relative z-10 flex justify-between items-end ${activeCard.textColor}`}>
                  <div className="flex flex-col">
                     <span className="text-[10px] font-medium opacity-60 mb-1 uppercase tracking-widest">Card Number</span>
                     <div className="flex gap-3 items-center">
                       <span className="tracking-widest text-lg opacity-80">••••</span>
                       <span className="tracking-widest text-lg opacity-80">••••</span>
                       <span className="font-medium tracking-widest text-lg">{activeCard.last4}</span>
                     </div>
                  </div>
                  <span className="font-bold italic opacity-90">{activeCard.network}</span>
                </div>
              </motion.div>
            </div>

            {/* INACTIVE WALLET ROW */}
            <div className={`px-6 mb-8 ${isIPad ? 'px-12 max-w-4xl mx-auto' : ''}`}>
              <h3 className="text-xs font-bold text-gray-400 mb-4 uppercase tracking-widest">Other Cards</h3>
              <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-4">
                {inactiveCards.map((card) => (
                  <motion.div
                    key={card.id}
                    layoutId={`card-container-${card.id}`}
                    onClick={() => setActiveCardId(card.id)}
                    className={`relative shrink-0 w-[200px] aspect-[1.58/1] rounded-xl p-4 flex flex-col justify-between bg-gradient-to-tr ${card.gradient} shadow-md cursor-pointer hover:-translate-y-1 transition-transform`}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-50 rounded-xl pointer-events-none" />
                    
                    <div className={`relative z-10 ${card.textColor}`}>
                      <span className="font-semibold text-sm opacity-90">{card.name}</span>
                    </div>
                    <div className={`relative z-10 flex justify-between items-end ${card.textColor}`}>
                      <span className="font-medium tracking-widest text-xs opacity-80">•••• {card.last4}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* DYNAMIC CARD DATA */}
            <div className={`px-6 space-y-8 border-t border-gray-100 pt-8 ${isIPad ? 'max-w-4xl mx-auto px-12' : ''}`}>
              <AnimatePresence mode="wait">
                <motion.div 
                  key={activeCard.id}
                  variants={contentVariants}
                  initial="hidden"
                  animate="show"
                  exit="exit"
                  className="space-y-8"
                >
                  {/* Points Balance */}
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-500 font-medium text-sm mb-1">Available Points</p>
                      <h2 className="text-3xl font-bold text-gray-900 tracking-tight">{activeCard.points}</h2>
                    </div>
                    <div className="text-right">
                      <p className="text-gray-500 font-medium text-sm mb-1">Est. Value</p>
                      <h2 className="text-xl font-semibold text-emerald-600">{activeCard.value}</h2>
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="flex gap-4">
                    <button className="flex-1 py-3 bg-gray-50 hover:bg-gray-100 transition-colors border border-gray-100 rounded-2xl flex flex-col items-center justify-center gap-1.5 text-gray-600">
                      <Lock size={18} />
                      <span className="text-xs font-semibold">Freeze</span>
                    </button>
                    <button className="flex-1 py-3 bg-gray-50 hover:bg-gray-100 transition-colors border border-gray-100 rounded-2xl flex flex-col items-center justify-center gap-1.5 text-gray-600">
                      <Eye size={18} />
                      <span className="text-xs font-semibold">Details</span>
                    </button>
                    <button className="flex-1 py-3 bg-gray-50 hover:bg-gray-100 transition-colors border border-gray-100 rounded-2xl flex flex-col items-center justify-center gap-1.5 text-gray-600">
                      <Settings size={18} />
                      <span className="text-xs font-semibold">Manage</span>
                    </button>
                  </div>

                  {/* Earning Multipliers */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-4">Earning Multipliers</h3>
                    <div className="grid grid-cols-2 gap-3">
                      {activeCard.multipliers.map((mult, idx) => (
                        <div key={idx} className="p-4 rounded-2xl bg-white border border-gray-100 shadow-sm flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-gray-50 text-gray-600 flex items-center justify-center">
                              <mult.icon size={16} />
                            </div>
                            <span className="font-medium text-gray-900 text-sm">{mult.category}</span>
                          </div>
                          <span className="font-bold text-gray-900">{mult.rate}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                </motion.div>
              </AnimatePresence>
            </div>
            
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}