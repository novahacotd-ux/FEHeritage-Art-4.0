import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { periodsData } from '../../data/educationData';
import CitationModal from '../../components/common/CitationModal';
import ShareModal from '../../components/common/ShareModal';
import { getYouTubeVideoId, getYouTubeEmbedUrl, isYouTubeUrl, formatTime } from '../../utils/videoUtils';

const BaiGiangDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [lecture, setLecture] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [showNotes, setShowNotes] = useState(false);
  const [showTranscript, setShowTranscript] = useState(false);
  const [relatedLectures, setRelatedLectures] = useState([]);

  // Phase 2 new states
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [volume, setVolume] = useState(100);
  const [isMuted, setIsMuted] = useState(false);
  const [showSubtitles, setShowSubtitles] = useState(true);
  const [quality, setQuality] = useState('1080p');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showCitationModal, setShowCitationModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [watchProgress, setWatchProgress] = useState(0);
  const [notes, setNotes] = useState('');
  const videoContainerRef = useRef(null);

  useEffect(() => {
    // Tìm lecture từ periodsData
    let foundLecture = null;

    for (const period of periodsData) {
      const found = period.documents.find(doc => doc.id.toString() === id && doc.type === 'Bài giảng');
      if (found) {
        foundLecture = { ...found, period: period.name };
        break;
      }
    }

    if (foundLecture) {
      setLecture(foundLecture);

      // Tìm lectures liên quan
      const related = [];
      periodsData.forEach(period => {
        period.documents.forEach(doc => {
          if (doc.type === 'Bài giảng' && doc.id !== foundLecture.id && related.length < 3) {
            related.push({ ...doc, period: period.name });
          }
        });
      });
      setRelatedLectures(related);

      // Load saved data from localStorage
      const savedBookmarks = JSON.parse(localStorage.getItem('bookmarked_lectures') || '[]');
      setIsBookmarked(savedBookmarks.includes(foundLecture.id));

      const savedNotes = localStorage.getItem(`lecture_notes_${foundLecture.id}`);
      if (savedNotes) setNotes(savedNotes);

      const savedProgress = localStorage.getItem(`lecture_progress_${foundLecture.id}`);
      if (savedProgress) {
        const progress = JSON.parse(savedProgress);
        setCurrentTime(progress.currentTime || 0);
        setWatchProgress(progress.percentage || 0);
      }

      const savedSpeed = localStorage.getItem('playback_speed');
      if (savedSpeed) setPlaybackSpeed(parseFloat(savedSpeed));

      const savedVolume = localStorage.getItem('volume');
      if (savedVolume) setVolume(parseInt(savedVolume));

      const savedSubtitles = localStorage.getItem('show_subtitles');
      if (savedSubtitles) setShowSubtitles(savedSubtitles === 'true');
    }
  }, [id]);

  // Track watch progress
  useEffect(() => {
    if (lecture && isPlaying) {
      const interval = setInterval(() => {
        setCurrentTime(prev => {
          const newTime = prev + 1;
          const totalSeconds = lecture.durationSeconds || 2700;
          const percentage = Math.round((newTime / totalSeconds) * 100);

          setWatchProgress(percentage);

          // Save progress every 5 seconds
          if (newTime % 5 === 0) {
            localStorage.setItem(`lecture_progress_${lecture.id}`, JSON.stringify({
              currentTime: newTime,
              percentage: percentage
            }));
          }

          return newTime >= totalSeconds ? totalSeconds : newTime;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [isPlaying, lecture]);

  // Save notes
  useEffect(() => {
    if (lecture && notes) {
      localStorage.setItem(`lecture_notes_${lecture.id}`, notes);
    }
  }, [notes, lecture]);

  // Save preferences
  useEffect(() => {
    localStorage.setItem('playback_speed', playbackSpeed.toString());
  }, [playbackSpeed]);

  useEffect(() => {
    localStorage.setItem('volume', volume.toString());
  }, [volume]);

  useEffect(() => {
    localStorage.setItem('show_subtitles', showSubtitles.toString());
  }, [showSubtitles]);

  // Fullscreen handling
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!window.document.fullscreenElement);
    };

    window.document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => window.document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (!lecture) return;
      if (e.target.matches('input, textarea')) return;

      const totalSeconds = lecture.durationSeconds || 2700;

      switch (e.key) {
        case ' ':
          e.preventDefault();
          setIsPlaying(!isPlaying);
          break;
        case 'ArrowLeft':
          setCurrentTime(prev => Math.max(0, prev - 10));
          break;
        case 'ArrowRight':
          setCurrentTime(prev => Math.min(totalSeconds, prev + 10));
          break;
        case 'ArrowUp':
          e.preventDefault();
          setVolume(prev => Math.min(100, prev + 10));
          break;
        case 'ArrowDown':
          e.preventDefault();
          setVolume(prev => Math.max(0, prev - 10));
          break;
        case 'm':
        case 'M':
          setIsMuted(!isMuted);
          break;
        case 'f':
        case 'F':
          toggleFullscreen();
          break;
        case 'c':
        case 'C':
          setShowSubtitles(!showSubtitles);
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [lecture, isPlaying, isMuted, showSubtitles]);

  const toggleFullscreen = () => {
    if (!videoContainerRef.current) return;

    if (!window.document.fullscreenElement) {
      videoContainerRef.current.requestFullscreen();
    } else {
      window.document.exitFullscreen();
    }
  };

  const toggleBookmark = () => {
    if (!lecture) return;

    const savedBookmarks = JSON.parse(localStorage.getItem('bookmarked_lectures') || '[]');
    let newBookmarks;

    if (isBookmarked) {
      newBookmarks = savedBookmarks.filter(id => id !== lecture.id);
    } else {
      newBookmarks = [...savedBookmarks, lecture.id];
    }

    localStorage.setItem('bookmarked_lectures', JSON.stringify(newBookmarks));
    setIsBookmarked(!isBookmarked);
  };

  const handleDownload = () => {
    alert('Tải về bài giảng. Tính năng sẽ được triển khai với backend.');
  };

  const lectureOutline = [
    { time: 0, title: "Giới thiệu chung", duration: "5 phút" },
    { time: 300, title: "Bối cảnh lịch sử", duration: "8 phút" },
    { time: 780, title: "Diễn biến sự kiện", duration: "12 phút" },
    { time: 1500, title: "Ý nghĩa và tác động", duration: "10 phút" },
    { time: 2100, title: "Kết luận", duration: "5 phút" }
  ];

  if (!lecture) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-serif font-bold text-amber-900 mb-4">Không tìm thấy bài giảng</h2>
          <Link to="/bai-giang-minh-hoa" className="text-amber-600 hover:text-amber-800">
            ← Quay lại danh sách bài giảng
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Video Player */}
            <div
              ref={videoContainerRef}
              className={`relative rounded-3xl overflow-hidden shadow-2xl ${isFullscreen ? 'fixed inset-0 z-50 rounded-none' : 'mb-8 border border-amber-200'}`}
              role="region"
              aria-label="Video player"
            >
              {/* Video Display */}
              <div className="relative aspect-video bg-black">
                {/* Check if videoUrl is YouTube */}
                {lecture.videoUrl && isYouTubeUrl(lecture.videoUrl) ? (
                  /* YouTube Embed */
                  <iframe
                    src={getYouTubeEmbedUrl(getYouTubeVideoId(lecture.videoUrl), {
                      autoplay: isPlaying ? 1 : 0,
                      controls: 1,
                      modestbranding: 1,
                      rel: 0
                    })}
                    title={lecture.title}
                    className="w-full h-full"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  /* Fallback to thumbnail with play button */
                  <>
                    <img
                      src={lecture.thumbnail}
                      alt={lecture.title}
                      className={`w-full h-full object-cover ${isPlaying ? 'opacity-50' : 'opacity-100'}`}
                    />

                    {/* Play Button Overlay */}
                    <button
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="absolute inset-0 flex items-center justify-center group"
                      aria-label="Play video"
                    >
                      <div className="bg-black/50 backdrop-blur-sm rounded-full p-6 group-hover:bg-black/70 transition-all group-hover:scale-110">
                        <svg className="w-20 h-20 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </button>
                  </>
                )}
              </div>

              {/* Professional Video Controls */}
              
            </div>

            {/* Lecture Info */}
            <div className="mb-8 rounded-3xl border border-amber-200 bg-white p-8 shadow-lg">
              <div className="mb-4 flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800">
                  📹 Bài giảng
                </span>
                <span className="inline-flex items-center rounded-full bg-amber-100 px-3 py-1 text-sm font-medium text-amber-800">
                  {lecture.level}
                </span>
                {lecture.period && (
                  <span className="inline-flex items-center rounded-full bg-stone-100 px-3 py-1 text-sm font-medium text-stone-800">
                    {lecture.period}
                  </span>
                )}
              </div>

              <h1 className="mb-4 text-3xl font-serif font-bold text-stone-800 sm:text-4xl">
                {lecture.title}
              </h1>

              <p className="mb-6 text-lg text-stone-600 leading-relaxed">
                {lecture.description}
              </p>

              <div className="flex flex-wrap items-center gap-6 border-t border-stone-200 pt-6">
                <div className="flex items-center space-x-3">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 flex items-center justify-center">
                    <span className="text-white font-bold text-lg">
                      {lecture.author.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-stone-800">{lecture.author}</p>
                    <p className="text-sm text-stone-600">Chuyên gia</p>
                  </div>
                </div>

                <div className="flex items-center space-x-6 text-sm text-stone-600">
                  <span className="flex items-center space-x-1">
                    <span>👁</span>
                    <span>{lecture.views} lượt xem</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <span>⭐</span>
                    <span>{lecture.rating}/5</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <span>📅</span>
                    <span>{lecture.createdDate}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <span>📥</span>
                    <span>{lecture.downloadCount} tải về</span>
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  onClick={handleDownload}
                  className="flex items-center space-x-2 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 px-6 py-3 font-semibold text-white transition-all hover:from-amber-600 hover:to-orange-600 hover:scale-105 shadow-lg"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                  <span>Tải về</span>
                </button>

                <button
                  onClick={toggleBookmark}
                  className={`flex items-center space-x-2 rounded-full px-6 py-3 font-semibold transition-all hover:scale-105 shadow ${isBookmarked
                    ? 'bg-blue-500 text-white hover:bg-blue-600'
                    : 'bg-white border-2 border-blue-500 text-blue-500 hover:bg-blue-50'
                    }`}
                  aria-pressed={isBookmarked}
                >
                  <svg className="w-5 h-5" fill={isBookmarked ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                  </svg>
                  <span>{isBookmarked ? 'Đã lưu' : 'Lưu bài giảng'}</span>
                </button>

                <button
                  onClick={() => setShowNotes(!showNotes)}
                  className={`flex items-center space-x-2 rounded-full border-2 px-6 py-3 font-semibold transition-all hover:scale-105 shadow ${showNotes
                    ? 'border-amber-500 bg-amber-500 text-white'
                    : 'border-amber-500 bg-white text-amber-600 hover:bg-amber-50'
                    }`}
                  aria-pressed={showNotes}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                  </svg>
                  <span>Ghi chú</span>
                </button>

                <button
                  onClick={() => setShowCitationModal(true)}
                  className="flex items-center space-x-2 rounded-full bg-white border-2 border-purple-500 text-purple-500 px-6 py-3 font-semibold transition-all hover:bg-purple-50 hover:scale-105 shadow"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  <span>Trích dẫn</span>
                </button>

                <button
                  onClick={() => setShowShareModal(true)}
                  className="flex items-center space-x-2 rounded-full bg-white border-2 border-green-500 text-green-500 px-6 py-3 font-semibold transition-all hover:bg-green-50 hover:scale-105 shadow"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
                  </svg>
                  <span>Chia sẻ</span>
                </button>

                <button
                  onClick={() => setShowTranscript(!showTranscript)}
                  className={`flex items-center space-x-2 rounded-full border-2 px-6 py-3 font-semibold transition-all hover:scale-105 shadow ${showTranscript
                    ? 'border-blue-500 bg-blue-500 text-white'
                    : 'border-blue-500 bg-white text-blue-600 hover:bg-blue-50'
                    }`}
                  aria-pressed={showTranscript}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 2a2 2 0 00-2 2v8a2 2 0 002 2h6a2 2 0 002-2V6.414A2 2 0 0016.414 5L14 2.586A2 2 0 0012.586 2H9z" />
                    <path d="M3 8a2 2 0 012-2v10h8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" />
                  </svg>
                  <span>Phiên bản</span>
                </button>
              </div>
            </div>

            {/* Watch Progress Card */}
            {watchProgress > 0 && (
              <div className="mb-8 rounded-3xl border border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50 p-6 shadow-lg">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-bold text-blue-900 flex items-center">
                    <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                    Tiến trình học
                  </h3>
                  <span className="text-2xl font-bold text-blue-600">{watchProgress}%</span>
                </div>
                <div className="relative h-4 bg-blue-200 rounded-full overflow-hidden">
                  <div
                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full transition-all duration-500"
                    style={{ width: `${watchProgress}%` }}
                  ></div>
                </div>
                <p className="text-sm text-blue-700 mt-2">
                  Đã xem {formatTime(currentTime)} / {lecture.duration || formatTime(lecture.durationSeconds || 2700)}
                </p>
              </div>
            )}

            {/* Notes Section */}
            {showNotes && (
              <div className="mb-8 rounded-3xl border border-amber-200 bg-white p-6 shadow-lg">
                <h3 className="text-xl font-bold text-stone-800 mb-4 flex items-center">
                  <svg className="w-6 h-6 mr-2 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                  </svg>
                  Ghi chú của bạn
                </h3>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Ghi chú các điểm quan trọng trong bài giảng..."
                  className="w-full h-32 px-4 py-3 border-2 border-stone-200 rounded-xl focus:border-amber-500 focus:ring-2 focus:ring-amber-200 focus:outline-none resize-none transition-colors"
                  aria-label="Lecture notes"
                />
                <p className="text-xs text-stone-500 mt-2 flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                  Ghi chú tự động lưu khi bạn nhập
                </p>
              </div>
            )}

            {/* Lecture Outline */}
            <div className="mb-8 rounded-3xl border border-amber-200 bg-white p-8 shadow-lg">
              <h2 className="mb-6 text-2xl font-serif font-bold text-stone-800">Nội dung bài giảng</h2>
              <div className="space-y-4">
                {lectureOutline.map((section, index) => (
                  <div
                    key={index}
                    onClick={() => setCurrentTime(section.time)}
                    className="flex cursor-pointer items-center justify-between rounded-xl border border-stone-200 p-4 transition-all hover:border-amber-300 hover:bg-amber-50"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100 text-sm font-bold text-amber-800">
                        {index + 1}
                      </div>
                      <div>
                        <h3 className="font-semibold text-stone-800">{section.title}</h3>
                        <p className="text-sm text-stone-600">{section.duration}</p>
                      </div>
                    </div>
                    <div className="text-sm text-stone-500">
                      {formatTime(section.time)}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Notes Section */}
            {showNotes && (
              <div className="mb-8 rounded-3xl border border-amber-200 bg-white p-8 shadow-lg">
                <h2 className="mb-6 text-2xl font-serif font-bold text-stone-800">Ghi chú của bạn</h2>
                <textarea
                  placeholder="Viết ghi chú cho bài giảng này..."
                  className="w-full h-40 rounded-xl border border-stone-300 p-4 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                ></textarea>
                <div className="mt-4 flex justify-end space-x-4">
                  <button
                    onClick={() => setShowNotes(false)}
                    className="rounded-full border-2 border-stone-300 bg-white px-6 py-2 font-semibold text-stone-700 transition-all hover:bg-stone-50"
                  >
                    Hủy
                  </button>
                  <button className="rounded-full bg-gradient-to-r from-amber-500 to-orange-500 px-6 py-2 font-semibold text-white transition-all hover:from-amber-600 hover:to-orange-600">
                    Lưu ghi chú
                  </button>
                </div>
              </div>
            )}

            {/* Transcript Section */}
            {showTranscript && (
              <div className="mb-8 rounded-3xl border border-amber-200 bg-white p-8 shadow-lg">
                <h2 className="mb-6 text-2xl font-serif font-bold text-stone-800">Phiên bản văn bản</h2>
                <div className="space-y-4 text-stone-700">
                  <div className="p-4 border-l-4 border-amber-300 bg-amber-50">
                    <p className="text-sm text-amber-800 font-medium mb-2">[00:00 - 05:00] Giới thiệu chung</p>
                    <p>Chào mừng các bạn đến với bài giảng về {lecture.title}. Trong bài học hôm nay, chúng ta sẽ cùng nhau tìm hiểu về một trong những sự kiện quan trọng nhất trong lịch sử dân tộc Việt Nam...</p>
                  </div>
                  <div className="p-4 border-l-4 border-blue-300 bg-blue-50">
                    <p className="text-sm text-blue-800 font-medium mb-2">[05:00 - 13:00] Bối cảnh lịch sử</p>
                    <p>Để hiểu rõ về sự kiện này, chúng ta cần nhìn lại bối cảnh lịch sử của thời kỳ. Vào thế kỷ này, đất nước ta đang phải chịu sự đô hộ của...</p>
                  </div>
                  <div className="p-4 border-l-4 border-green-300 bg-green-50">
                    <p className="text-sm text-green-800 font-medium mb-2">[13:00 - 25:00] Diễn biến sự kiện</p>
                    <p>Cuộc khởi nghĩa diễn ra với nhiều giai đoạn khác nhau. Giai đoạn đầu tiên bắt đầu từ...</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="rounded-3xl border border-amber-200 bg-white p-6 shadow-lg">
              <h3 className="mb-4 text-lg font-serif font-bold text-stone-800">Thông tin</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-stone-600">Thời lượng:</span>
                  <span className="font-semibold text-stone-800">{lecture.duration}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-stone-600">Cấp độ:</span>
                  <span className="font-semibold text-stone-800">{lecture.level}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-stone-600">Lượt xem:</span>
                  <span className="font-semibold text-stone-800">{lecture.views}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-stone-600">Đánh giá:</span>
                  <div className="flex items-center space-x-1">
                    <span className="font-semibold text-stone-800">{lecture.rating}</span>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className={`h-4 w-4 ${i < Math.floor(lecture.rating) ? 'text-yellow-400' : 'text-stone-300'}`} fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-stone-600">Ngày tạo:</span>
                  <span className="font-semibold text-stone-800">{lecture.createdDate}</span>
                </div>
              </div>
            </div>

            {/* Related Lectures */}
            <div className="rounded-3xl border border-amber-200 bg-white p-6 shadow-lg">
              <h3 className="mb-4 text-lg font-serif font-bold text-stone-800">Bài giảng liên quan</h3>
              <div className="space-y-4">
                {relatedLectures.map((related) => (
                  <div
                    key={related.id}
                    onClick={() => navigate(`/bai-giang/${related.id}`)}
                    className="group cursor-pointer rounded-xl border border-stone-200 p-4 transition-all hover:border-amber-300 hover:bg-amber-50"
                  >
                    <div className="flex space-x-3">
                      <img
                        src={related.thumbnail}
                        alt={related.title}
                        className="h-16 w-16 rounded-lg object-cover flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-stone-800 group-hover:text-amber-700 line-clamp-2 mb-1">
                          {related.title}
                        </h4>
                        <p className="text-sm text-stone-600 mb-2 truncate">
                          {related.author}
                        </p>
                        <div className="flex items-center space-x-3 text-xs text-stone-500">
                          <span>⏱ {related.duration}</span>
                          <span>⭐ {related.rating}</span>
                          <span>{related.period}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Author Info */}
            <div className="rounded-3xl border border-amber-200 bg-white p-6 shadow-lg">
              <h3 className="mb-4 text-lg font-serif font-bold text-stone-800">Về tác giả</h3>
              <div className="text-center">
                <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 flex items-center justify-center">
                  <span className="text-white text-xl font-bold">
                    {lecture.author.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <h4 className="font-semibold text-stone-800 mb-2">{lecture.author}</h4>
                <p className="text-sm text-stone-600 mb-4 leading-relaxed">
                  Chuyên gia nghiên cứu lịch sử Việt Nam với hơn 20 năm kinh nghiệm giảng dạy và nghiên cứu tại các trường đại học hàng đầu.
                </p>
                <div className="flex items-center justify-center space-x-6 text-sm text-stone-600">
                  <div className="text-center">
                    <div className="font-bold text-amber-600">45</div>
                    <div>Bài giảng</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-blue-600">12K</div>
                    <div>Học viên</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-green-600">4.8</div>
                    <div>Đánh giá</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Citation Modal */}
      {showCitationModal && lecture && (
        <CitationModal
          title={lecture.title}
          author={lecture.author}
          date={lecture.createdDate}
          period={lecture.period}
          url={window.location.href}
          onClose={() => setShowCitationModal(false)}
        />
      )}

      {/* Share Modal */}
      {showShareModal && lecture && (
        <ShareModal
          title={lecture.title}
          description={lecture.description}
          url={window.location.href}
          onClose={() => setShowShareModal(false)}
        />
      )}
    </div>
  );
};

export default BaiGiangDetail;