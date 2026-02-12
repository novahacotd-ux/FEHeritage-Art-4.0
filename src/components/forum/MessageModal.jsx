import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, PencilLine } from "lucide-react";

export default function MessageModal({ recipient, onClose, onSend }) {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (message.trim()) {
      onSend(message);
      setMessage("");
    }
  };

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80"
        onClick={onClose}
      >
        <motion.div
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.2 }}
          className="bg-white rounded-2xl shadow-2xl w-full max-w-lg"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-orange-400 to-amber-500 p-6 text-white rounded-t-2xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={recipient.avatar}
                  alt={recipient.name}
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-white"
                />
                <div>
                  <h2 className="text-xl font-bold">Gửi tin nhắn</h2>
                  <p className="text-sm opacity-90">đến {recipient.name}</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/40 rounded-full transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 space-y-4">
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-amber-900 mb-2">
                <PencilLine className="w-4 h-4" />
                Nội dung tin nhắn
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Nhập tin nhắn của bạn..."
                rows={6}
                className="w-full px-4 py-3 border-2 border-amber-200 rounded-lg focus:border-orange-400 focus:outline-none transition-colors resize-none"
              />
            </div>

            {/* Footer */}
            <div className="flex gap-3 justify-end">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onClose}
                className="px-6 py-3 border border-amber-300 text-amber-700 rounded-lg hover:bg-amber-50 transition-colors font-medium"
              >
                Hủy
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSend}
                disabled={!message.trim()}
                className="px-6 py-3 bg-amber-500 text-zinc-100 rounded-lg hover:from-orange-600 hover:to-amber-600 transition-all shadow-lg font-medium flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-5 h-5" />
                Gửi tin nhắn
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
