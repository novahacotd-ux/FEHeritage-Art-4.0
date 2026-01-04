import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

const SAMPLE_AVATARS = [
  `data:image/svg+xml;utf8,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300"><rect width="100%" height="100%" fill="#FDE68A"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-size="32" font-family="Arial">Tướng</text></svg>')}`,
  `data:image/svg+xml;utf8,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300"><rect width="100%" height="100%" fill="#BFDBFE"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-size="28" font-family="Arial">Quốc Sư</text></svg>')}`,
  `data:image/svg+xml;utf8,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300"><rect width="100%" height="100%" fill="#C7F9CC"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-size="28" font-family="Arial">Dân Làng</text></svg>')}`
];

const SCENES = [
  {
    id: 'start',
    title: 'Bước vào Hành Trình',
    text: 'Bạn bước qua cổng thời gian và thấy trước mặt ba con đường: chiến trận, triều đình, và làng quê. Chọn con đường để khởi đầu câu chuyện của bạn.',
    choices: [
      { text: 'Con đường tướng lĩnh', target: 'battle' },
      { text: 'Con đường triều chính', target: 'court' },
      { text: 'Con đường dân gian', target: 'village' }
    ]
  },
  {
    id: 'battle',
    title: 'Trận Mạc',
    text: 'Bạn dẫn quân tới một sườn đồi, đối diện căn cứ địch. Bạn chọn chiến lược.',
    choices: [
      { text: 'Tấn công ồ ạt', target: 'charge' },
      { text: 'Mai phục đêm', target: 'ambush' }
    ]
  },
  {
    id: 'court',
    title: 'Hoàng Cung',
    text: 'Bạn là cố vấn. Triều đình cần quyết định về thuế lương. Bạn sẽ khuyên gì?',
    choices: [
      { text: 'Giảm thuế để kích cầu', target: 'relief' },
      { text: 'Giữ nguyên để củng cố ngân khố', target: 'revenue' }
    ]
  },
  {
    id: 'village',
    title: 'Làng Quê',
    text: 'Mùa màng thất bát, dân làng lo lắng. Bạn quyết định giúp như thế nào?',
    choices: [
      { text: 'Tổ chức kho lương cứu đói', target: 'grain' },
      { text: 'Học kỹ thuật canh tác mới', target: 'teach' }
    ]
  },
  {
    id: 'charge',
    title: 'Chiến Thắng Mạnh Mẽ',
    text: 'Chiến thuật mạo hiểm mang lại chiến thắng nhưng tổn thất lớn. Bạn được tôn vinh—nhưng phải trả giá.',
    reward: { artId: 'victory', coupon: 'VIET-CHARGE-10' }
  },
  {
    id: 'ambush',
    title: 'Chiến Thuật Thông Minh',
    text: 'Mai phục thành công, tổn thất ít, danh vọng lan rộng. Bạn mở khóa tác phẩm nghệ thuật đặc biệt.',
    reward: { artId: 'ambush_art', coupon: 'VIET-AMBU-15' }
  },
  {
    id: 'relief',
    title: 'Cứu Dân',
    text: 'Sự thay đổi thuế giúp dân an cư. Triều đình ghi nhận công lao bạn.',
    reward: { artId: 'relief_art', coupon: 'VIET-RELIEF-12' }
  },
  {
    id: 'revenue',
    title: 'Ngân Khố Ổn Định',
    text: 'Quyết định thực dụng giữ vững ngân khố nhưng có tranh cãi. Bạn được ghi danh vào sách sử.',
    reward: { artId: 'revenue_art', coupon: 'VIET-REV-08' }
  },
  {
    id: 'grain',
    title: 'Đoàn Kết Làng',
    text: 'Làng hợp lực vượt khó, bạn được mọi người ca ngợi.',
    reward: { artId: 'grain_art', coupon: 'VIET-GRAIN-05' }
  },
  {
    id: 'teach',
    title: 'Tri Thức Lưu Truyền',
    text: 'Kỹ thuật mới giúp mùa màng bội thu cho nhiều thế hệ.',
    reward: { artId: 'teach_art', coupon: 'VIET-TEACH-20' }
  },
];

const ART_PLACEHOLDERS = {
  victory: SAMPLE_AVATARS[0],
  ambush_art: SAMPLE_AVATARS[1],
  relief_art: SAMPLE_AVATARS[2],
  revenue_art: SAMPLE_AVATARS[0],
  grain_art: SAMPLE_AVATARS[1],
  teach_art: SAMPLE_AVATARS[2]
};

const VirtualChronicle = () => {
  const [stage, setStage] = useState('intro');
  const [sceneId, setSceneId] = useState('start');
  const [role, setRole] = useState(null);
  const [avatar, setAvatar] = useState(SAMPLE_AVATARS[0]);
  const [inventory, setInventory] = useState([]);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('vc_state');
    if (saved) {
      try {
        const s = JSON.parse(saved);
        setStage(s.stage || 'intro');
        setSceneId(s.sceneId || 'start');
        setRole(s.role || null);
        // Không load avatar từ localStorage, để user upload lại
        // Khôi phục inventory nhưng set lại ảnh từ avatar hiện tại
        setInventory(s.inventory ? s.inventory.map(item => ({
          ...item,
          art: avatar, // Sử dụng avatar hiện tại
          userAvatar: avatar // Sử dụng avatar hiện tại
        })) : []);
        setHistory(s.history || []);
      } catch (error) {
        console.error('Error loading saved state:', error);
        // Nếu có lỗi, reset game
        localStorage.removeItem('vc_state');
      }
    }
  }, [avatar]); // Thêm dependency avatar để update khi avatar thay đổi

  useEffect(() => {
    // Chỉ lưu metadata, không lưu ảnh base64
    const stateToSave = {
      stage,
      sceneId,
      role,
      // Không lưu avatar (data URL lớn)
      inventory: inventory.map(item => ({
        ...item,
        art: null, // Không lưu data URL
        userAvatar: null // Không lưu data URL
      })),
      history
    };

    try {
      localStorage.setItem('vc_state', JSON.stringify(stateToSave));
    } catch (error) {
      console.error('Error saving game state:', error);
      // Nếu vượt quota, xóa localStorage và reset
      localStorage.removeItem('vc_state');
      alert('Không thể lưu trạng thái game. Đã reset để tiếp tục chơi.');
    }
  }, [stage, sceneId, role, inventory, history]);

  function startGame(selectedRole) {
    setRole(selectedRole);
    setStage('playing');
    setSceneId('start');
    setHistory([]);
    setInventory([]);
  }

  async function choose(target) {
    const next = SCENES.find(s => s.id === target);
    setHistory(prev => {
      const newHistory = [...prev, { from: sceneId, to: target }];
      // Giới hạn history tối đa 50 entries
      return newHistory.slice(-50);
    });
    if (!next) return;

    if (next.reward) {
      setLoading(true);
      try {
        // Mock API call - sử dụng ảnh user đã upload để demo AI gen
        await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API delay
        // Thay vì dùng ART_PLACEHOLDERS, sử dụng avatar của user
        setInventory(prev => {
          const newItem = {
            artId: next.reward.artId,
            art: avatar, // Sử dụng ảnh user đã upload
            coupon: next.reward.coupon,
            title: next.title,
            timestamp: new Date().toISOString(),
            userAvatar: avatar, // Lưu lại avatar gốc
            role: role // Lưu vai trò đã chọn
          };
          const newInventory = [...prev, newItem];
          // Giới hạn inventory tối đa 10 items
          return newInventory.slice(-10);
        });
      } catch (err) {
        console.error("Lỗi tạo ảnh AI:", err);
        // Fallback vẫn dùng avatar user
        setInventory(prev => {
          const newItem = {
            artId: next.reward.artId,
            art: avatar,
            coupon: next.reward.coupon,
            title: next.title,
            timestamp: new Date().toISOString(),
            userAvatar: avatar,
            role: role
          };
          const newInventory = [...prev, newItem];
          // Giới hạn inventory tối đa 10 items
          return newInventory.slice(-10);
        });
      }
      setLoading(false);
      setStage('reward');
    } else {
      setSceneId(next.id);
    }
  }

  function handleUpload(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => setAvatar(ev.target?.result);
    reader.readAsDataURL(file);
  }

  function downloadArt(item) {
    const link = document.createElement('a');
    link.href = item.art;
    link.download = `${item.artId}.png`;
    document.body.appendChild(link);
    link.click();
    link.remove();
  }

  function resetGame() {
    setStage('intro');
    setRole(null);
    setAvatar(SAMPLE_AVATARS[0]);
    setInventory([]);
    setHistory([]);
    setSceneId('start');
    localStorage.removeItem('vc_state');
  }

  function shareCoupon(coupon) {
    if (navigator.share) {
      navigator.share({
        title: 'Virtual Chronicle - Mã giảm giá',
        text: `Tôi vừa nhận được mã giảm giá: ${coupon}`,
        url: window.location.href
      });
    } else {
      navigator.clipboard?.writeText(coupon).then(() => {
        alert('Đã sao chép mã giảm giá!');
      });
    }
  }

  const currentScene = SCENES.find(s => s.id === sceneId);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-gray-100">
      {/* Header */}
      <header className="border-b border-gray-700 bg-gray-900/50 backdrop-blur-sm">
        <div className="mx-auto max-w-6xl px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/giaoduc" className="flex items-center space-x-2 text-purple-400 hover:text-purple-300">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                <span>Quay lại Giáo dục</span>
              </Link>
              <div className="h-6 w-px bg-gray-600" />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                Virtual Chronicle
              </h1>
            </div>
            <div className="text-sm text-gray-400">
              🎮 Interactive Story Game
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-6xl px-6 py-8">
        <AnimatePresence mode="wait">
          {/* Intro Stage */}
          {stage === 'intro' && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              <div className="text-center">
                <h2 className="mb-4 text-4xl font-bold text-white">
                  Chào mừng đến với Virtual Chronicle
                </h2>
                <p className="mx-auto max-w-2xl text-lg text-gray-300">
                  Khám phá lịch sử Việt Nam qua góc nhìn của bạn. Upload ảnh cá nhân để AI tạo ra tác phẩm nghệ thuật độc đáo từ hành trình của bạn.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                {/* Avatar Selection */}
                <div className="rounded-2xl border border-gray-700 bg-gray-800/50 p-6">
                  <h3 className="mb-4 text-xl font-semibold text-white">Tùy chỉnh Avatar</h3>
                  <div className="flex items-start gap-6">
                    <div className="w-32">
                      <motion.img
                        src={avatar}
                        alt="avatar"
                        className="w-full rounded-lg border border-gray-600"
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleUpload}
                        className="mt-2 w-full text-xs text-gray-400 file:mr-2 file:rounded file:border-0 file:bg-purple-600 file:px-2 file:py-1 file:text-xs file:text-white hover:file:bg-purple-700"
                      />
                    </div>

                    <div className="flex-1">
                      <div className="mb-3 text-sm text-gray-400">Hoặc chọn avatar có sẵn:</div>
                      <div className="grid grid-cols-3 gap-2">
                        {SAMPLE_AVATARS.map((a, i) => (
                          <button
                            key={i}
                            onClick={() => setAvatar(a)}
                            className="overflow-hidden rounded border border-gray-600 transition-all hover:border-purple-400"
                          >
                            <img src={a} alt={`avatar-${i}`} className="w-full" />
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Role Selection */}
                <div className="rounded-2xl border border-gray-700 bg-gray-800/50 p-6">
                  <h3 className="mb-4 text-xl font-semibold text-white">Chọn vai trò của bạn</h3>
                  <div className="space-y-3">
                    <motion.button
                      className="w-full rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 p-4 text-left text-gray-900 transition-all hover:from-amber-600 hover:to-orange-600"
                      onClick={() => startGame('Tướng Lĩnh')}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center">
                        <span className="mr-3 text-2xl">⚔️</span>
                        <div>
                          <div className="font-bold">Tướng Lĩnh</div>
                          <div className="text-sm opacity-80">Dẫn dắt quân đội, quyết định chiến thuật</div>
                        </div>
                      </div>
                    </motion.button>

                    <motion.button
                      className="w-full rounded-lg bg-gradient-to-r from-blue-500 to-indigo-500 p-4 text-left text-white transition-all hover:from-blue-600 hover:to-indigo-600"
                      onClick={() => startGame('Quốc Sư')}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center">
                        <span className="mr-3 text-2xl">📜</span>
                        <div>
                          <div className="font-bold">Quốc Sư</div>
                          <div className="text-sm opacity-80">Cố vấn triều đình, định hướng chính sách</div>
                        </div>
                      </div>
                    </motion.button>

                    <motion.button
                      className="w-full rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 p-4 text-left text-gray-900 transition-all hover:from-green-600 hover:to-emerald-600"
                      onClick={() => startGame('Dân Làng')}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center">
                        <span className="mr-3 text-2xl">🌾</span>
                        <div>
                          <div className="font-bold">Dân Làng</div>
                          <div className="text-sm opacity-80">Sống gần gũi đất, lo cho cộng đồng</div>
                        </div>
                      </div>
                    </motion.button>
                  </div>
                </div>
              </div>

              {/* Game Instructions */}
              <div className="rounded-2xl border border-gray-700 bg-gray-800/50 p-6">
                <h3 className="mb-4 text-xl font-semibold text-white">Hướng dẫn chơi</h3>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <h4 className="mb-2 font-medium text-purple-400">🎯 Mục tiêu</h4>
                    <ul className="space-y-1 text-sm text-gray-300">
                      <li>• Upload ảnh cá nhân để AI tạo tác phẩm nghệ thuật</li>
                      <li>• Đóng vai các nhân vật lịch sử qua các tình huống</li>
                      <li>• Nhận mã giảm giá để in thành sản phẩm thực tế</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="mb-2 font-medium text-blue-400">🎮 Cách chơi</h4>
                    <ul className="space-y-1 text-sm text-gray-300">
                      <li>• Upload ảnh cá nhân của bạn khi bắt đầu</li>
                      <li>• Chọn vai trò và trải qua các tình huống lịch sử</li>
                      <li>• AI sẽ tạo tác phẩm nghệ thuật từ ảnh và câu chuyện của bạn</li>
                    </ul>
                  </div>
                </div>

                <div className="mt-4 flex justify-center border-t border-gray-600 pt-4">
                  <button
                    onClick={() => {
                      localStorage.removeItem('vc_state');
                      setStage('intro');
                      setRole(null);
                      setAvatar(SAMPLE_AVATARS[0]);
                      setInventory([]);
                      setHistory([]);
                      setSceneId('start');
                      alert('Đã xóa dữ liệu game đã lưu!');
                    }}
                    className="text-sm text-gray-400 hover:text-gray-300 underline transition-colors"
                  >
                    🗑️ Xóa dữ liệu đã lưu (nếu gặp lỗi storage)
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* Playing Stage */}
          {stage === 'playing' && (
            <motion.div
              key="playing"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                {/* Character Info */}
                <div className="rounded-2xl border border-gray-700 bg-gray-800/50 p-6">
                  <div className="text-center">
                    <img src={avatar} alt="avatar" className="mx-auto w-24 rounded-lg border border-gray-600" />
                    <div className="mt-3">
                      <div className="font-semibold text-white">{role}</div>
                      <div className="text-sm text-gray-400">Hành trình: {history.length} bước</div>
                    </div>
                  </div>

                  <div className="mt-4 space-y-2">
                    <button
                      onClick={() => setStage('inventory')}
                      className="w-full rounded-lg bg-purple-600 px-4 py-2 text-sm text-white transition-all hover:bg-purple-700"
                    >
                      🎒 Kho phần thưởng ({inventory.length})
                    </button>
                    <button
                      onClick={resetGame}
                      className="w-full rounded-lg bg-gray-600 px-4 py-2 text-sm text-white transition-all hover:bg-gray-700"
                    >
                      🔄 Chơi lại
                    </button>
                  </div>
                </div>

                {/* Story Content */}
                <div className="lg:col-span-2">
                  <div className="rounded-2xl border border-gray-700 bg-gray-800/50 p-8">
                    <h2 className="mb-4 text-3xl font-bold text-white">
                      {currentScene?.title}
                    </h2>
                    <p className="mb-6 text-lg leading-relaxed text-gray-300">
                      {currentScene?.text}
                    </p>

                    {currentScene?.choices && (
                      <div className="space-y-3">
                        <div className="text-sm font-medium text-purple-400">Bạn sẽ chọn:</div>
                        {currentScene.choices.map((choice, idx) => (
                          <motion.button
                            key={idx}
                            onClick={() => choose(choice.target)}
                            className="w-full rounded-lg border border-gray-600 bg-gray-700/50 p-4 text-left text-white transition-all hover:border-purple-500 hover:bg-purple-600/20"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            {choice.text}
                          </motion.button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Reward Stage */}
          {stage === 'reward' && (
            <motion.div
              key="reward"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="space-y-6"
            >
              <div className="text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                >
                  <h2 className="mb-4 text-4xl font-bold text-yellow-400">🎉 Chúc mừng!</h2>
                  <p className="text-xl text-gray-300">Bạn đã mở khóa phần thưởng đặc biệt!</p>
                </motion.div>
              </div>

              <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                {/* Artwork Display */}
                <div className="text-center">
                  <motion.div
                    initial={{ rotateY: -90 }}
                    animate={{ rotateY: 0 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                    className="mx-auto w-80 max-w-full"
                  >
                    <div className="overflow-hidden rounded-2xl border-4 border-yellow-400 shadow-2xl">
                      <img
                        src={inventory[inventory.length - 1]?.art}
                        alt="artwork"
                        className="w-full"
                      />
                    </div>
                  </motion.div>
                </div>

                {/* Reward Info */}
                <div className="space-y-6">
                  <div className="rounded-2xl border border-gray-700 bg-gray-800/50 p-6">
                    <h3 className="mb-3 text-xl font-semibold text-white">
                      🎨 Tác phẩm nghệ thuật AI
                    </h3>
                    <p className="text-gray-300">
                      "{inventory[inventory.length - 1]?.title}" - Được tạo ra từ ảnh của bạn trong vai {role}.
                      AI đã biến đổi và nghệ thuật hóa hình ảnh gốc thành tác phẩm độc đáo.
                    </p>
                    <div className="mt-3 rounded-lg bg-purple-900/30 border border-purple-500/30 p-3">
                      <div className="text-sm text-purple-300">
                        💡 Tác phẩm này được tạo từ ảnh bạn đã upload, kết hợp với lựa chọn câu chuyện của bạn.
                      </div>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-gray-700 bg-gray-800/50 p-6">
                    <h3 className="mb-3 text-xl font-semibold text-white">
                      🎟️ Mã giảm giá
                    </h3>
                    <div className="rounded-lg bg-gray-700 p-4">
                      <div className="font-mono text-2xl text-yellow-400">
                        {inventory[inventory.length - 1]?.coupon}
                      </div>
                      <div className="mt-2 text-sm text-gray-400">
                        Sử dụng mã này để được giảm giá khi in tác phẩm thành sản phẩm thực tế
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3 sm:flex-row">
                    <motion.button
                      onClick={() => downloadArt(inventory[inventory.length - 1])}
                      className="flex-1 rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition-all hover:bg-blue-700"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      📥 Tải xuống tác phẩm
                    </motion.button>
                    <motion.button
                      onClick={() => shareCoupon(inventory[inventory.length - 1]?.coupon)}
                      className="flex-1 rounded-lg bg-green-600 px-6 py-3 font-semibold text-white transition-all hover:bg-green-700"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      📤 Chia sẻ mã
                    </motion.button>
                  </div>

                  <div className="flex flex-col gap-3 sm:flex-row">
                    <button
                      onClick={() => setStage('inventory')}
                      className="flex-1 rounded-lg border border-gray-600 bg-gray-700 px-6 py-3 font-semibold text-white transition-all hover:bg-gray-600"
                    >
                      🎒 Xem kho phần thưởng
                    </button>
                    <button
                      onClick={() => { setStage('playing'); setSceneId('start'); }}
                      className="flex-1 rounded-lg bg-purple-600 px-6 py-3 font-semibold text-white transition-all hover:bg-purple-700"
                    >
                      ➡️ Tiếp tục khám phá
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Inventory Stage */}
          {stage === 'inventory' && (
            <motion.div
              key="inventory"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold text-white">🎒 Kho phần thưởng</h2>
                <div className="text-gray-400">{inventory.length} vật phẩm</div>
              </div>

              {inventory.length === 0 ? (
                <div className="rounded-2xl border border-gray-700 bg-gray-800/50 p-12 text-center">
                  <div className="text-6xl">📭</div>
                  <div className="mt-4 text-xl text-gray-300">
                    Kho phần thưởng trống
                  </div>
                  <div className="mt-2 text-gray-400">
                    Hoàn thành các nhiệm vụ để mở khóa tác phẩm nghệ thuật và mã giảm giá
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {inventory.map((item, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="rounded-2xl border border-gray-700 bg-gray-800/50 p-6"
                    >
                      <div className="mb-4 overflow-hidden rounded-lg">
                        <img src={item.art} alt={item.artId} className="w-full" />
                      </div>

                      <div className="space-y-3">
                        <div>
                          <div className="font-semibold text-white">{item.title || item.artId}</div>
                          <div className="text-sm text-gray-400">
                            {new Date(item.timestamp).toLocaleDateString('vi-VN')} • Vai: {item.role}
                          </div>
                          <div className="text-xs text-purple-300 mt-1">
                            🎨 Tạo từ ảnh của bạn
                          </div>
                        </div>

                        <div className="rounded bg-gray-700 p-3">
                          <div className="text-xs text-gray-400">Mã giảm giá</div>
                          <div className="font-mono text-yellow-400">{item.coupon}</div>
                        </div>

                        <div className="flex gap-2">
                          <button
                            onClick={() => downloadArt(item)}
                            className="flex-1 rounded bg-blue-600 px-3 py-2 text-sm text-white transition-all hover:bg-blue-700"
                          >
                            📥 Tải
                          </button>
                          <button
                            onClick={() => shareCoupon(item.coupon)}
                            className="flex-1 rounded bg-green-600 px-3 py-2 text-sm text-white transition-all hover:bg-green-700"
                          >
                            📤 Chia sẻ
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}

              <div className="flex gap-4">
                <button
                  onClick={() => setStage('playing')}
                  className="rounded-lg bg-purple-600 px-6 py-3 font-semibold text-white transition-all hover:bg-purple-700"
                >
                  ⬅️ Quay lại game
                </button>
                <button
                  onClick={resetGame}
                  className="rounded-lg bg-red-600 px-6 py-3 font-semibold text-white transition-all hover:bg-red-700"
                >
                  🔄 Chơi lại từ đầu
                </button>
              </div>
            </motion.div>
          )}

          {/* Loading State */}
          {loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
            >
              <div className="rounded-2xl bg-gray-800 p-8 text-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="mx-auto mb-4 h-12 w-12 rounded-full border-4 border-purple-600 border-t-transparent"
                />
                <div className="text-xl font-semibold text-white">
                  🎨 Đang tạo tác phẩm nghệ thuật AI từ ảnh của bạn...
                </div>
                <div className="mt-2 text-gray-400">
                  AI đang xử lý và tạo ra phiên bản nghệ thuật độc đáo
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="border-t border-gray-700 bg-gray-900/50 p-6 text-center text-sm text-gray-400">
        <div>
          Virtual Chronicle - Game tương tác khám phá lịch sử Việt Nam với AI tạo ảnh |
          <span className="ml-2 text-purple-400">Upload ảnh cá nhân để tạo tác phẩm nghệ thuật độc đáo</span>
        </div>
      </footer>
    </div>
  );
};

export default VirtualChronicle;
