import { useState } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { 
  ChevronLeft, Lock, Eye, Settings, Utensils, Plane, ShoppingBag, CheckCircle2
} from 'lucide-react';

interface CardsProps {
  isOpen: boolean;
  onClose: () => void;
  isIPad?: boolean;
}

// Mock Data for the Cards
const mockCards = [
  {
    id: 1,
    name: 'Obsidian Reserve',
    last4: '8842',
    network: 'Visa Infinite',
    points: '320,450',
    value: '$4,800',
    gradient: 'from-[#111111] via-[#1a1a1c] to-[#2a2a2d]', // Matte Black
    textColor: 'text-white',
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
    gradient: 'from-[#E2E2E2] via-[#F5F5F5] to-[#FFFFFF]', // Frosted Titanium
    textColor: 'text-gray-900',
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
    gradient: 'from-[#0f172a] via-[#1e293b] to-[#334155]', // Midnight Blue
    textColor: 'text-white',
    multipliers: [
      { category: 'Travel', rate: '3x', icon: Plane },
      { category: 'Dining', rate: '2x', icon: Utensils },
    ],
  }
];

export default function Cards({ isOpen, onClose, isIPad }: CardsProps) {
  const [activeCardId, setActiveCardId] = useState(mockCards[0].id);

  const activeCard = mockCards.find(c => c.id === activeCardId) || mockCards[0];

  const pageVariants: Variants = {
    hidden: { x: '100%' },
    show: { x: 0, transition: { type: "spring", damping: 30, stiffness: 300 } },
    exit: { x: '100%', transition: { type: "spring", damping: 30, stiffness: 300 } }
  };

  const contentVariants: Variants = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { duration: 0.3 } },
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
          {/* Safe Area Top Spacing */}
          <div className={`w-full ${isIPad ? 'h-10' : 'h-[52px]'}`}></div>

          {/* Header */}
          <header className={`px-6 pt-4 pb-2 flex items-center justify-between sticky top-0 z-10 bg-[#FCFCFD] ${isIPad ? 'px-12 pt-8' : ''}`}>
            <button onClick={onClose} className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors -ml-2">
              <ChevronLeft size={24} />
            </button>
            <h1 className="text-lg font-semibold text-gray-900 tracking-tight">Card Vault</h1>
            <div className="w-10"></div> 
          </header>

          <div className="flex-1 overflow-y-auto scrollbar-hide pb-32">
            
            {/* Horizontal Card Carousel */}
            <div className={`w-full overflow-x-auto scrollbar-hide flex gap-4 px-6 pt-6 pb-8 snap-x snap-mandatory ${isIPad ? 'px-12' : ''}`}>
              {mockCards.map((card) => (
                <div 
                  key={card.id}
                  onClick={() => setActiveCardId(card.id)}
                  className={`relative shrink-0 w-[280px] h-[175px] rounded-[1.25rem] p-5 flex flex-col justify-between snap-center cursor-pointer transition-all duration-300 ${isIPad ? 'w-[320px] h-[200px]' : ''} ${
                    activeCardId === card.id 
                      ? 'scale-100 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.3)]' 
                      : 'scale-90 opacity-60 shadow-none'
                  }`}
                >
                  {/* Card Background Gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-tr ${card.gradient} rounded-[1.25rem] border border-white/10`} />
                  
                  {/* Glassmorphism Shine */}
                  <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent opacity-50 rounded-[1.25rem]" />

                  {/* Card Content */}
                  <div className={`relative z-10 flex justify-between items-start ${card.textColor}`}>
                    <span className="font-semibold tracking-wider text-sm opacity-90">{card.name}</span>
                    <span className="text-xs font-medium opacity-70">{card.network}</span>
                  </div>

                  <div className={`relative z-10 flex justify-between items-end ${card.textColor}`}>
                    <div className="flex gap-1.5 items-center">
                      <div className="flex gap-0.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-current opacity-70"></div>
                        <div className="w-1.5 h-1.5 rounded-full bg-current opacity-70"></div>
                        <div className="w-1.5 h-1.5 rounded-full bg-current opacity-70"></div>
                        <div className="w-1.5 h-1.5 rounded-full bg-current opacity-70"></div>
                      </div>
                      <span className="font-medium tracking-widest ml-1">{card.last4}</span>
                    </div>
                    <div className="w-8 h-5 rounded bg-white/20 flex items-center justify-center backdrop-blur-sm">
                      <div className="w-4 h-3 rounded-sm bg-white/40"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Dynamic Content Below Card */}
            <div className={`px-6 space-y-8 ${isIPad ? 'max-w-4xl mx-auto px-12' : ''}`}>
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