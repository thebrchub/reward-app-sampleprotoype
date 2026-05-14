import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X, ArrowUp, Mic, CheckCircle2 } from 'lucide-react';

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

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth'
      });
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
      
      const typeText = async (text: string, speed = 35) => {
        for (let i = 0; i <= text.length; i++) {
          if (!isMounted) return;
          setInputValue(text.slice(0, i));
          await sleep(speed + Math.random() * 20);
        }
      };

      // 1. Initial AI Message
      await sleep(1000);
      if (!isMounted) return;
      setIsThinking(false);
      setMessages([
        { id: 1, sender: 'ai', text: "Hello Alex. I've analyzed your recent spend. You have $1,200 in untapped travel value. How can I optimize it for you today?" }
      ]);

      // 2. User typing
      await sleep(1800);
      if (!isMounted) return;
      await typeText("Can I use those points for my flight to Tokyo?");
      await sleep(600);
      if (!isMounted) return;
      setInputValue("");
      setMessages(prev => [...prev, { id: 2, sender: 'user', text: "Can I use those points for my flight to Tokyo?" }]);
      setIsThinking(true); 

      // 3. AI Suggestion
      await sleep(2000);
      if (!isMounted) return;
      setIsThinking(false);
      setMessages(prev => [...prev, { 
        id: 3, 
        sender: 'ai', 
        text: "Yes. Transferring your 115K Hotel Loyalty points to the Chase Sapphire Reserve partner program will cover a business class upgrade on ANA Airlines. Would you like me to initiate the transfer?" 
      }]);

      // 4. User confirmation
      await sleep(2200);
      if (!isMounted) return;
      await typeText("Yes, please initiate the transfer.");
      await sleep(500);
      if (!isMounted) return;
      setInputValue("");
      setMessages(prev => [...prev, { id: 4, sender: 'user', text: "Yes, please initiate the transfer." }]);
      setIsThinking(true); 

      // 5. Final Success
      await sleep(2500);
      if (!isMounted) return;
      setIsThinking(false);
      setMessages(prev => [...prev, { 
        id: 5, 
        sender: 'ai', 
        text: (
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2 text-gray-900 font-medium">
              <CheckCircle2 size={18} className="text-gray-900" />
              <span>Transfer Complete</span>
            </div>
            <p className="text-gray-600 leading-relaxed">
              115K points have been successfully converted to Chase Ultimate Rewards and applied to your ANA flight to Tokyo. Your itinerary has been updated.
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
            /* FIXED: bottom-0 and wider w-5/6 for iPad to remove the gap and fill the screen better */
            className={`absolute bottom-0 w-full bg-[#FCFCFD] rounded-t-[2.5rem] shadow-[0_-20px_40px_-15px_rgba(0,0,0,0.1)] z-50 flex flex-col ${
              isIPad ? 'h-[700px] w-5/6 left-1/2 -translate-x-1/2' : 'h-[85%]'
            }`}
          >
            {/* Header */}
            <div className="flex justify-between items-center px-8 py-6 border-b border-gray-100 bg-[#FCFCFD] rounded-t-[2.5rem] z-10">
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
              className="flex-1 overflow-y-auto px-6 py-6 space-y-6 scrollbar-hide flex flex-col pb-10"
            >
              <AnimatePresence>
                {messages.map((msg) => (
                  <motion.div 
                    key={msg.id}
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    className={`max-w-[85%] p-4 rounded-3xl text-[15px] leading-relaxed shadow-sm ${
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
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="self-start flex items-center gap-2 p-4 bg-white border border-gray-100 rounded-3xl rounded-bl-sm shadow-sm"
                  >
                    <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0 }} className="w-2 h-2 rounded-full bg-gray-400" />
                    <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} className="w-2 h-2 rounded-full bg-gray-400" />
                    <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} className="w-2 h-2 rounded-full bg-gray-400" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Input Area */}
            <div className="px-6 py-6 pb-8 border-t border-gray-100 bg-white">
              <div className="relative flex items-center">
                <button className="absolute left-4 text-gray-400 cursor-default">
                  <Mic size={20} />
                </button>
                <input 
                  type="text" 
                  readOnly
                  value={inputValue}
                  placeholder="Ask about flights, upgrades, or points..." 
                  className="w-full bg-gray-50 border border-gray-200 rounded-full py-4 pl-12 pr-14 text-[14px] text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900/10 transition-all placeholder:text-gray-400 cursor-default"
                />
                <motion.button 
                  animate={{ 
                    backgroundColor: hasInput ? '#111827' : '#E5E7EB',
                    color: hasInput ? '#FFFFFF' : '#9CA3AF'
                  }}
                  className="absolute right-2 w-10 h-10 rounded-full flex items-center justify-center transition-colors cursor-default"
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