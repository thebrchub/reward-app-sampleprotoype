import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X, ArrowUp, Mic, CheckCircle2, Plane } from 'lucide-react';

interface AiAssistantProps {
  isOpen: boolean;
  onClose: () => void;
  isIPad?: boolean;
}

export default function AiAssistant({ isOpen, onClose, isIPad }: AiAssistantProps) {
  const [messages, setMessages] = useState<{ id: number; text: string | React.ReactNode; sender: 'user' | 'ai' }[]>([]);
  const [isThinking, setIsThinking] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  // Smooth Auto-scroll
  useEffect(() => {
    if (scrollRef.current) {
      // Use a tiny timeout to let Framer Motion calculate the layout change first
      setTimeout(() => {
        scrollRef.current?.scrollTo({
          top: scrollRef.current.scrollHeight,
          behavior: 'smooth'
        });
      }, 50);
    }
  }, [messages, isThinking, inputValue]);

  // Automated Demo Sequence
  useEffect(() => {
    if (!isOpen) return;

    let isMounted = true; 
    setMessages([]);
    setInputValue("");
    setIsThinking(true);

    const runDemoSequence = async () => {
      const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
      
      const typeText = async (text: string, speed = 30) => {
        for (let i = 0; i <= text.length; i++) {
          if (!isMounted) return;
          setInputValue(text.slice(0, i));
          await sleep(speed + Math.random() * 15);
        }
      };

      // 1. Initial AI Message
      await sleep(800);
      if (!isMounted) return;
      setIsThinking(false);
      setMessages([
        { id: 1, sender: 'ai', text: "Hello Alex. I found approximately $1,200 in unused travel value across your rewards ecosystem. How would you like to optimize it today?" }
      ]);

      // 2. User typing first query
      await sleep(1500);
      if (!isMounted) return;
      await typeText("Can I use those points for my Tokyo flight?");
      await sleep(400);
      if (!isMounted) return;
      setInputValue("");
      setMessages(prev => [...prev, { id: 2, sender: 'user', text: "Can I use those points for my Tokyo flight?" }]);
      setIsThinking(true); 

      // 3. AI Initial Strategy Confirmation
      await sleep(1500);
      if (!isMounted) return;
      setMessages(prev => [...prev, { 
        id: 3, 
        sender: 'ai', 
        text: "Yes. I found an optimized redemption strategy using your Chase Sapphire and hotel loyalty balances." 
      }]);

      // 4. AI Strategy Card
      await sleep(1200);
      if (!isMounted) return;
      setMessages(prev => [...prev, { 
        id: 4, 
        sender: 'ai', 
        text: (
          <div className="flex flex-col gap-3 w-full min-w-[220px]">
            <div className="flex items-center gap-2 text-gray-900 font-semibold mb-1 pb-2 border-b border-gray-100">
              <div className="w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                <Plane size={14} />
              </div>
              <span>ANA Airlines Business</span>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-gray-500">Estimated Value</span><span className="font-medium text-gray-900">$2,400</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Required Transfer</span><span className="font-medium text-gray-900">115K Points</span></div>
              <div className="flex justify-between pt-2 border-t border-gray-100 mt-1">
                <span className="text-gray-900 font-medium">Estimated Savings</span>
                <span className="font-bold text-emerald-600">$1,100</span>
              </div>
            </div>
          </div>
        )
      }]);

      // 5. AI Next Steps
      await sleep(1000);
      if (!isMounted) return;
      setIsThinking(false);
      setMessages(prev => [...prev, { 
        id: 5, 
        sender: 'ai', 
        text: "I can guide you through the transfer process and prepare the redemption flow for you." 
      }]);

      // 6. User Confirmation
      await sleep(1800);
      if (!isMounted) return;
      await typeText("Continue");
      await sleep(400);
      if (!isMounted) return;
      setInputValue("");
      setMessages(prev => [...prev, { id: 6, sender: 'user', text: "Continue" }]);
      setIsThinking(true); 

      // 7. Final Success/Redirect
      await sleep(2000);
      if (!isMounted) return;
      setIsThinking(false);
      setMessages(prev => [...prev, { 
        id: 7, 
        sender: 'ai', 
        text: (
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-gray-900 font-medium">
              <CheckCircle2 size={18} className="text-emerald-500" />
              <span>Preparing Redirect</span>
            </div>
            <p className="text-gray-600 leading-relaxed mt-1">
              Great. I’m preparing the optimal transfer workflow and redirecting you to the official rewards partner portal for confirmation.
            </p>
          </div>
        )
      }]);
    };

    runDemoSequence();
    return () => { isMounted = false; };
  }, [isOpen]);

  const hasInput = inputValue.length > 0;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm z-40"
          />

          <motion.div 
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className={`absolute bottom-0 w-full bg-[#FCFCFD] rounded-t-[2.5rem] shadow-[0_-20px_40px_-15px_rgba(0,0,0,0.1)] z-50 flex flex-col ${
              isIPad ? 'h-[700px] w-5/6 left-1/2 -translate-x-1/2' : 'h-[85%]'
            }`}
          >
            {/* Header */}
            <div className="flex justify-between items-center px-8 py-6 border-b border-gray-100 bg-[#FCFCFD] rounded-t-[2.5rem] z-10 shrink-0">
              <div className="flex items-center gap-3">
                <div className="relative flex items-center justify-center w-8 h-8">
                  <motion.div 
                    animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
                    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                    className="absolute inset-0 bg-gray-200 rounded-full"
                  />
                  <Sparkles size={16} className="text-gray-900 relative z-10" />
                </div>
                <h3 className="font-semibold text-gray-900">Reward Concierge</h3>
              </div>
              <button 
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Chat Area */}
            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto px-6 py-6 space-y-5 scrollbar-hide flex flex-col pb-10"
            >
              <AnimatePresence mode="popLayout">
                {messages.map((msg) => (
                  <motion.div 
                    layout // <-- MAGIC: Smoothly adjusts position when other elements appear/resize
                    key={msg.id}
                    initial={{ opacity: 0, y: 15, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ type: "spring", bounce: 0.3, duration: 0.6 }} // Softer, premium spring
                    className={`max-w-[85%] p-4 rounded-3xl text-[15px] leading-relaxed shadow-sm origin-bottom ${
                      msg.sender === 'user' 
                        ? 'bg-gray-900 text-white self-end rounded-br-sm' 
                        : 'bg-white border border-gray-100 text-gray-800 self-start rounded-bl-sm'
                    }`}
                  >
                    {msg.text}
                  </motion.div>
                ))}

                {isThinking && (
                  <motion.div 
                    layout // <-- Moves smoothly with the flow
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                    className="self-start flex items-center gap-2 p-4 bg-white border border-gray-100 rounded-3xl rounded-bl-sm shadow-sm"
                  >
                    <motion.div animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0 }} className="w-1.5 h-1.5 rounded-full bg-gray-400" />
                    <motion.div animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} className="w-1.5 h-1.5 rounded-full bg-gray-400" />
                    <motion.div animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} className="w-1.5 h-1.5 rounded-full bg-gray-400" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Input Area */}
            <div className="px-6 py-6 pb-8 border-t border-gray-100 bg-white shrink-0">
              <div className="relative flex items-center">
                <button className="absolute left-4 text-gray-400 cursor-default z-10">
                  <Mic size={20} />
                </button>
                
                {/* Simulated Auto-Expanding Input with Layout Animation */}
                <motion.div 
                  layout // <-- MAGIC: Animates height changes smoothly when text wraps
                  transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                  className="w-full bg-gray-50 border border-gray-200 rounded-[1.5rem] py-3.5 pl-12 pr-14 text-[14px] text-gray-900 min-h-[50px] flex items-center cursor-default"
                >
                  {hasInput ? (
                    <span className="leading-relaxed whitespace-pre-wrap block w-full">{inputValue}</span>
                  ) : (
                    <span className="text-gray-400">Chat with your concierge...</span>
                  )}
                </motion.div>

                <motion.button 
                  animate={{ 
                    backgroundColor: hasInput ? '#111827' : '#E5E7EB',
                    color: hasInput ? '#FFFFFF' : '#9CA3AF'
                  }}
                  className="absolute right-2 bottom-1.5 w-10 h-10 rounded-full flex items-center justify-center transition-colors cursor-default z-10"
                >
                  <ArrowUp size={20} />
                </motion.button>
              </div>
              <p className="text-center text-[10px] text-gray-400 mt-4 font-medium">
                AI can make mistakes. Verify important reward details.
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}