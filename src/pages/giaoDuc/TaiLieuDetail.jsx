import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { periodsData } from '../../data/educationData';
import CitationModal from '../../components/common/CitationModal';
import ShareModal from '../../components/common/ShareModal';

const TaiLieuDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [document, setDocument] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [showNotes, setShowNotes] = useState(false);
  const [showTableOfContents, setShowTableOfContents] = useState(true);
  const [relatedDocuments, setRelatedDocuments] = useState([]);

  // Phase 2 new states
  const [zoomLevel, setZoomLevel] = useState(100);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showCitationModal, setShowCitationModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [notes, setNotes] = useState('');
  const documentViewerRef = useRef(null);

  useEffect(() => {
    // Tìm document từ periodsData
    let foundDocument = null;

    for (const period of periodsData) {
      const found = period.documents.find(doc => doc.id.toString() === id && doc.type === 'Tài liệu');
      if (found) {
        foundDocument = { ...found, period: period.name };
        break;
      }
    }

    if (foundDocument) {
      setDocument(foundDocument);

      // Tìm documents liên quan
      const related = [];
      periodsData.forEach(period => {
        period.documents.forEach(doc => {
          if (doc.type === 'Tài liệu' && doc.id !== foundDocument.id && related.length < 3) {
            related.push({ ...doc, period: period.name });
          }
        });
      });
      setRelatedDocuments(related);

      // Load saved data from localStorage
      const savedBookmarks = JSON.parse(localStorage.getItem('bookmarked_documents') || '[]');
      setIsBookmarked(savedBookmarks.includes(foundDocument.id));

      const savedNotes = localStorage.getItem(`notes_${foundDocument.id}`);
      if (savedNotes) setNotes(savedNotes);

      const savedProgress = localStorage.getItem(`progress_${foundDocument.id}`);
      if (savedProgress) setReadingProgress(parseInt(savedProgress));
    }
  }, [id]);

  // Track reading progress
  useEffect(() => {
    if (document) {
      const progress = Math.round((currentPage / document.pages) * 100);
      setReadingProgress(progress);
      localStorage.setItem(`progress_${document.id}`, progress.toString());
    }
  }, [currentPage, document]);

  // Save notes to localStorage
  useEffect(() => {
    if (document && notes) {
      localStorage.setItem(`notes_${document.id}`, notes);
    }
  }, [notes, document]);

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
      if (!document) return;

      // Don't trigger if typing in input/textarea
      if (e.target.matches('input, textarea')) return;

      switch (e.key) {
        case 'ArrowLeft':
          setCurrentPage(prev => Math.max(1, prev - 1));
          break;
        case 'ArrowRight':
          setCurrentPage(prev => Math.min(document.pages, prev + 1));
          break;
        case 'f':
        case 'F':
          if (e.ctrlKey || e.metaKey) {
            e.preventDefault();
            toggleFullscreen();
          }
          break;
        case '+':
        case '=':
          if (e.ctrlKey || e.metaKey) {
            e.preventDefault();
            setZoomLevel(prev => Math.min(200, prev + 10));
          }
          break;
        case '-':
        case '_':
          if (e.ctrlKey || e.metaKey) {
            e.preventDefault();
            setZoomLevel(prev => Math.max(50, prev - 10));
          }
          break;
        case '0':
          if (e.ctrlKey || e.metaKey) {
            e.preventDefault();
            setZoomLevel(100);
          }
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [document]);

  const toggleFullscreen = () => {
    if (!documentViewerRef.current) return;

    if (!window.document.fullscreenElement) {
      documentViewerRef.current.requestFullscreen();
    } else {
      window.document.exitFullscreen();
    }
  };

  const toggleBookmark = () => {
    if (!document) return;

    const savedBookmarks = JSON.parse(localStorage.getItem('bookmarked_documents') || '[]');
    let newBookmarks;

    if (isBookmarked) {
      newBookmarks = savedBookmarks.filter(id => id !== document.id);
    } else {
      newBookmarks = [...savedBookmarks, document.id];
    }

    localStorage.setItem('bookmarked_documents', JSON.stringify(newBookmarks));
    setIsBookmarked(!isBookmarked);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = (format = 'pdf') => {
    // Simulate download - in real app, this would call an API
    console.log(`Downloading as ${format}...`);
    alert(`Tải về tài liệu dạng ${format.toUpperCase()}. Tính năng sẽ được triển khai với backend.`);
  };

  const tableOfContents = [
    { page: 1, title: "Giới thiệu chung", level: 1 },
    { page: 3, title: "Bối cảnh lịch sử", level: 1 },
    { page: 3, title: "Tình hình chính trị", level: 2 },
    { page: 5, title: "Tình hình kinh tế - xã hội", level: 2 },
    { page: 8, title: "Diễn biến sự kiện", level: 1 },
    { page: 8, title: "Giai đoạn chuẩn bị", level: 2 },
    { page: 12, title: "Bùng nổ cuộc khởi nghĩa", level: 2 },
    { page: 18, title: "Phát triển và lan rộng", level: 2 },
    { page: 25, title: "Kết thúc và hậu quả", level: 2 },
    { page: 30, title: "Ý nghĩa lịch sử", level: 1 },
    { page: 35, title: "Tác động đến thời kỳ sau", level: 1 },
    { page: 40, title: "Kết luận", level: 1 },
    { page: 42, title: "Tài liệu tham khảo", level: 1 }
  ];

  if (!document) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-serif font-bold text-amber-900 mb-4">Không tìm thấy tài liệu</h2>
          <Link to="/tai-lieu-bai-giang" className="text-amber-600 hover:text-amber-800">
            ← Quay lại trang tài liệu
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          {/* Sidebar - Table of Contents */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              {/* Document Info */}
              <div className="rounded-2xl border border-amber-200 bg-white p-6 shadow-lg">
                <div className="mb-4 text-center">
                  <div className="mx-auto mb-3 h-16 w-12 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                    <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <h3 className="font-serif text-lg font-bold text-stone-800 mb-2">{document.title}</h3>
                  <div className="space-y-2 text-sm text-stone-600">
                    <div className="flex justify-between">
                      <span>Tổng số trang:</span>
                      <span className="font-medium">{document.pages}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Cấp độ:</span>
                      <span className="font-medium">{document.level}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Lượt xem:</span>
                      <span className="font-medium">{document.views}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Đánh giá:</span>
                      <div className="flex items-center space-x-1">
                        <span className="font-medium">{document.rating}</span>
                        <svg className="h-4 w-4 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Page Navigation */}
                <div className="border-t border-stone-200 pt-4">
                  <h4 className="font-medium text-stone-800 mb-3">Điều hướng trang</h4>
                  <div className="flex items-center justify-between mb-3">
                    <button
                      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                      className="rounded-lg border border-stone-300 bg-white px-3 py-1 text-sm font-medium text-stone-700 hover:bg-stone-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      ← Trước
                    </button>
                    <span className="text-sm font-medium text-stone-800">
                      Trang {currentPage} / {document.pages}
                    </span>
                    <button
                      onClick={() => setCurrentPage(Math.min(document.pages, currentPage + 1))}
                      disabled={currentPage === document.pages}
                      className="rounded-lg border border-stone-300 bg-white px-3 py-1 text-sm font-medium text-stone-700 hover:bg-stone-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Sau →
                    </button>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max={document.pages}
                    value={currentPage}
                    onChange={(e) => setCurrentPage(parseInt(e.target.value))}
                    className="w-full h-2 bg-amber-200 rounded-lg appearance-none cursor-pointer slider"
                  />
                </div>
              </div>

              {/* Table of Contents */}
              <div className="rounded-2xl border border-amber-200 bg-white p-6 shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-serif text-lg font-bold text-stone-800">Mục lục</h3>
                  <button
                    onClick={() => setShowTableOfContents(!showTableOfContents)}
                    className="text-amber-600 hover:text-amber-800"
                  >
                    {showTableOfContents ? '−' : '+'}
                  </button>
                </div>
                {showTableOfContents && (
                  <div className="space-y-2">
                    {tableOfContents.map((item, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentPage(item.page)}
                        className={`w-full text-left rounded-lg px-3 py-2 text-sm transition-all ${currentPage >= item.page && (index === tableOfContents.length - 1 || currentPage < tableOfContents[index + 1]?.page)
                          ? 'bg-amber-100 text-amber-800 font-medium'
                          : 'text-stone-600 hover:bg-amber-50 hover:text-amber-700'
                          } ${item.level === 2 ? 'ml-4' : ''}`}
                      >
                        <div className="flex justify-between items-center">
                          <span className={item.level === 2 ? 'text-xs' : ''}>{item.title}</span>
                          <span className="text-xs text-stone-400">{item.page}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  onClick={() => handleDownload('pdf')}
                  className="w-full flex items-center justify-center space-x-2 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 px-6 py-3 font-semibold text-white transition-all hover:from-green-600 hover:to-emerald-600 hover:scale-105"
                >
                  <span>📥</span>
                  <span>Tải về PDF</span>
                </button>

                {/* New Download Options Dropdown */}
                <div className="relative group">
                  <button className="w-full flex items-center justify-center space-x-2 rounded-full border-2 border-green-500 bg-white px-6 py-3 font-semibold text-green-600 transition-all hover:bg-green-50 hover:scale-105">
                    <span>📄</span>
                    <span>Định dạng khác</span>
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-stone-200 rounded-xl shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10">
                    <button onClick={() => handleDownload('docx')} className="w-full px-4 py-3 text-left hover:bg-stone-50 rounded-t-xl transition-colors">
                      <span className="font-medium">📝 Word (.docx)</span>
                    </button>
                    <button onClick={() => handleDownload('txt')} className="w-full px-4 py-3 text-left hover:bg-stone-50 transition-colors">
                      <span className="font-medium">📄 Text (.txt)</span>
                    </button>
                    <button onClick={() => handleDownload('epub')} className="w-full px-4 py-3 text-left hover:bg-stone-50 rounded-b-xl transition-colors">
                      <span className="font-medium">📚 eBook (.epub)</span>
                    </button>
                  </div>
                </div>

                <button
                  onClick={() => setShowNotes(!showNotes)}
                  className={`w-full flex items-center justify-center space-x-2 rounded-full border-2 px-6 py-3 font-semibold transition-all hover:scale-105 ${showNotes
                    ? 'border-amber-500 bg-amber-500 text-white'
                    : 'border-amber-500 bg-white text-amber-600 hover:bg-amber-50'
                    }`}
                  aria-pressed={showNotes}
                >
                  <span>📝</span>
                  <span>Ghi chú</span>
                </button>

                <button
                  onClick={toggleBookmark}
                  className={`w-full flex items-center justify-center space-x-2 rounded-full border-2 px-6 py-3 font-semibold transition-all hover:scale-105 ${isBookmarked
                    ? 'border-red-500 bg-red-500 text-white'
                    : 'border-stone-300 bg-white text-stone-700 hover:bg-stone-50'
                    }`}
                  aria-pressed={isBookmarked}
                >
                  <span>{isBookmarked ? '❤️' : '🔖'}</span>
                  <span>{isBookmarked ? 'Đã lưu' : 'Đánh dấu'}</span>
                </button>

                <button
                  onClick={() => setShowCitationModal(true)}
                  className="w-full flex items-center justify-center space-x-2 rounded-full border-2 border-stone-300 bg-white px-6 py-3 font-semibold text-stone-700 transition-all hover:bg-stone-50 hover:scale-105"
                >
                  <span>�</span>
                  <span>Trích dẫn</span>
                </button>

                <button
                  onClick={() => setShowShareModal(true)}
                  className="w-full flex items-center justify-center space-x-2 rounded-full border-2 border-stone-300 bg-white px-6 py-3 font-semibold text-stone-700 transition-all hover:bg-stone-50 hover:scale-105"
                >
                  <span>📤</span>
                  <span>Chia sẻ</span>
                </button>
              </div>

              {/* Reading Progress */}
              <div className="rounded-2xl border border-amber-200 bg-white p-6 shadow-lg">
                <h3 className="font-serif text-lg font-bold text-stone-800 mb-4">Tiến độ đọc</h3>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm text-stone-600 mb-2">
                    <span>Đã đọc:</span>
                    <span className="font-bold text-amber-600">{readingProgress}%</span>
                  </div>
                  <div className="h-3 bg-stone-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-amber-500 to-orange-500 transition-all duration-500 ease-out"
                      style={{ width: `${readingProgress}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-stone-500 text-center">
                    Trang {currentPage} / {document.pages}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Document Header */}
            <div className="mb-8 rounded-3xl border border-amber-200 bg-white p-8 shadow-lg">
              <div className="mb-4 flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800">
                  📄 Tài liệu
                </span>
                <span className="inline-flex items-center rounded-full bg-amber-100 px-3 py-1 text-sm font-medium text-amber-800">
                  {document.level}
                </span>
                {document.period && (
                  <span className="inline-flex items-center rounded-full bg-stone-100 px-3 py-1 text-sm font-medium text-stone-800">
                    {document.period}
                  </span>
                )}
              </div>

              <h1 className="mb-4 text-3xl font-serif font-bold text-stone-800 sm:text-4xl">
                {document.title}
              </h1>

              <p className="mb-6 text-lg text-stone-600 leading-relaxed">
                {document.description}
              </p>

              <div className="flex flex-wrap items-center gap-6 border-t border-stone-200 pt-6">
                <div className="flex items-center space-x-3">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center">
                    <span className="text-white font-bold text-lg">
                      {document.author.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-stone-800">{document.author}</p>
                    <p className="text-sm text-stone-600">Tác giả</p>
                  </div>
                </div>

                <div className="flex items-center space-x-6 text-sm text-stone-600">
                  <span className="flex items-center space-x-1">
                    <span>📄</span>
                    <span>{document.pages} trang</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <span>👁</span>
                    <span>{document.views} lượt xem</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <span>⭐</span>
                    <span>{document.rating}/5</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <span>📅</span>
                    <span>{document.createdDate}</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Document Viewer */}
            <div ref={documentViewerRef} className="mb-8 rounded-3xl border border-amber-200 bg-white shadow-lg overflow-hidden">
              {/* Viewer Controls Bar */}
              <div className="bg-stone-100 border-b border-stone-200 px-6 py-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-stone-700">Zoom:</span>
                    <button
                      onClick={() => setZoomLevel(prev => Math.max(50, prev - 10))}
                      className="p-2 rounded-lg hover:bg-stone-200 transition-colors"
                      aria-label="Thu nhỏ"
                    >
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                      </svg>
                    </button>
                    <span className="min-w-[60px] text-center text-sm font-medium text-stone-700">
                      {zoomLevel}%
                    </span>
                    <button
                      onClick={() => setZoomLevel(prev => Math.min(200, prev + 10))}
                      className="p-2 rounded-lg hover:bg-stone-200 transition-colors"
                      aria-label="Phóng to"
                    >
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                    </button>
                    <button
                      onClick={() => setZoomLevel(100)}
                      className="px-3 py-1 text-xs bg-stone-200 hover:bg-stone-300 rounded-lg font-medium transition-colors"
                    >
                      Reset
                    </button>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={handlePrint}
                      className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-stone-200 transition-colors"
                      aria-label="In tài liệu"
                    >
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                      </svg>
                      <span className="text-sm font-medium">In</span>
                    </button>
                    <button
                      onClick={toggleFullscreen}
                      className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-stone-200 transition-colors"
                      aria-label={isFullscreen ? "Thoát toàn màn hình" : "Toàn màn hình"}
                    >
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        {isFullscreen ? (
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        ) : (
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                        )}
                      </svg>
                      <span className="text-sm font-medium">{isFullscreen ? 'Thu nhỏ' : 'Toàn màn hình'}</span>
                    </button>
                  </div>
                </div>

                {/* Keyboard Shortcuts Hint */}
                <div className="mt-2 text-xs text-stone-500 text-center">
                  💡 Phím tắt: <kbd className="px-2 py-1 bg-white rounded border">←</kbd> <kbd className="px-2 py-1 bg-white rounded border">→</kbd> di chuyển trang,
                  <kbd className="px-2 py-1 bg-white rounded border">Ctrl</kbd> + <kbd className="px-2 py-1 bg-white rounded border">+/-</kbd> zoom,
                  <kbd className="px-2 py-1 bg-white rounded border">Ctrl</kbd> + <kbd className="px-2 py-1 bg-white rounded border">F</kbd> toàn màn hình
                </div>
              </div>

              {/* Document Page */}
              <div className="aspect-[8.5/11] bg-white border-b border-stone-200 relative overflow-auto">
                <div
                  className="p-8 h-full transition-transform duration-200"
                  style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'top center' }}
                >
                  {/* Mock Document Content */}
                  <div className="space-y-6 text-stone-800">
                    <div className="text-center mb-8">
                      <h2 className="text-2xl font-serif font-bold mb-2">
                        {tableOfContents.find(item => currentPage >= item.page && (tableOfContents.find((_, i) => i > tableOfContents.indexOf(item))?.page > currentPage || !tableOfContents.find((_, i) => i > tableOfContents.indexOf(item))))?.title || 'Nội dung tài liệu'}
                      </h2>
                      <div className="w-16 h-1 bg-amber-500 mx-auto"></div>
                    </div>

                    {currentPage === 1 && (
                      <div className="space-y-4">
                        <h3 className="text-xl font-bold mb-4">Giới thiệu chung</h3>
                        <p className="leading-relaxed">
                          {document.title} là một trong những sự kiện quan trọng nhất trong lịch sử dân tộc Việt Nam.
                          Sự kiện này đánh dấu một bước ngoặt quan trọng trong cuộc đấu tranh giành độc lập của dân tộc ta.
                        </p>
                        <p className="leading-relaxed">
                          Trong tài liệu này, chúng ta sẽ tìm hiểu về bối cảnh lịch sử, diễn biến sự kiện,
                          và ý nghĩa lịch sử của sự kiện quan trọng này. Đây là một nghiên cứu tổng hợp
                          dựa trên nhiều tài liệu sử liệu đáng tin cậy.
                        </p>
                        <div className="bg-amber-50 border-l-4 border-amber-400 p-4">
                          <p className="text-amber-800">
                            <strong>Lưu ý:</strong> Tài liệu này được biên soạn dành cho mục đích học tập và nghiên cứu.
                            Vui lòng tham khảo thêm các nguồn tài liệu khác để có cái nhìn toàn diện hơn.
                          </p>
                        </div>
                      </div>
                    )}

                    {currentPage > 1 && currentPage <= 10 && (
                      <div className="space-y-4">
                        <h3 className="text-xl font-bold mb-4">Bối cảnh lịch sử</h3>
                        <p className="leading-relaxed">
                          Vào thời kỳ này, đất nước ta đang chịu sự đô hộ của phương Bắc.
                          Tình hình chính trị, kinh tế, xã hội diễn biến phức tạp với nhiều mâu thuẫn sâu sắc.
                        </p>
                        <p className="leading-relaxed">
                          Nhân dân Việt Nam phải chịu đựng sự áp bức nặng nề về chính trị và kinh tế.
                          Chính quyền đô hộ áp đặt nhiều chính sách bóc lột, làm cho cuộc sống của người dân trở nên khó khăn.
                        </p>
                        <ul className="list-disc list-inside space-y-2 ml-4">
                          <li>Chế độ cống nạp nặng nề</li>
                          <li>Áp đặt văn hóa, phong tục của nước ngoài</li>
                          <li>Đàn áp những người có tinh thần yêu nước</li>
                          <li>Bóc lột tài nguyên thiên nhiên</li>
                        </ul>
                      </div>
                    )}

                    {currentPage > 10 && currentPage <= 30 && (
                      <div className="space-y-4">
                        <h3 className="text-xl font-bold mb-4">Diễn biến sự kiện</h3>
                        <p className="leading-relaxed">
                          Cuộc khởi nghĩa bùng nổ trong bối cảnh mâu thuẫn xã hội ngày càng gay gắt.
                          Sự lãnh đạo tài ba và lòng yêu nước nồng nàn đã tập hợp được lực lượng đông đảo.
                        </p>
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                          <h4 className="font-bold text-blue-800 mb-2">Các giai đoạn chính:</h4>
                          <ol className="list-decimal list-inside space-y-1 text-blue-700">
                            <li>Giai đoạn chuẩn bị và tập hợp lực lượng</li>
                            <li>Bùng nổ cuộc khởi nghĩa</li>
                            <li>Mở rộng phạm vi hoạt động</li>
                            <li>Đối mặt với sự đàn áp quyết liệt</li>
                            <li>Kết thúc và những hậu quả</li>
                          </ol>
                        </div>
                      </div>
                    )}

                    {currentPage > 30 && (
                      <div className="space-y-4">
                        <h3 className="text-xl font-bold mb-4">Ý nghĩa và tác động lịch sử</h3>
                        <p className="leading-relaxed">
                          Sự kiện này có ý nghĩa to lớn trong lịch sử dân tộc Việt Nam.
                          Nó không chỉ thể hiện tinh thần yêu nước, ý chí đấu tranh bất khuất của dân tộc
                          mà còn để lại những bài học quý báu cho các thế hệ sau.
                        </p>
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                          <h4 className="font-bold text-green-800 mb-2">Tác động tích cực:</h4>
                          <ul className="list-disc list-inside space-y-1 text-green-700">
                            <li>Khơi dậy tinh thần yêu nước trong nhân dân</li>
                            <li>Truyền cảm hứng cho các cuộc đấu tranh sau này</li>
                            <li>Góp phần vào truyền thống đấu tranh của dân tộc</li>
                            <li>Để lại bài học về tổ chức và lãnh đạo</li>
                          </ul>
                        </div>
                      </div>
                    )}

                    {/* Page number */}
                    <div className="absolute bottom-4 right-4 text-sm text-stone-500">
                      Trang {currentPage}
                    </div>
                  </div>
                </div>
              </div>

              {/* Document Controls */}
              <div className="bg-stone-50 px-6 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                      className="flex items-center space-x-2 rounded-lg border border-stone-300 bg-white px-4 py-2 text-sm font-medium text-stone-700 hover:bg-stone-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <span>←</span>
                      <span>Trang trước</span>
                    </button>
                    <span className="text-sm text-stone-600">
                      Trang {currentPage} / {document.pages}
                    </span>
                    <button
                      onClick={() => setCurrentPage(Math.min(document.pages, currentPage + 1))}
                      disabled={currentPage === document.pages}
                      className="flex items-center space-x-2 rounded-lg border border-stone-300 bg-white px-4 py-2 text-sm font-medium text-stone-700 hover:bg-stone-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <span>Trang sau</span>
                      <span>→</span>
                    </button>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button className="rounded-lg border border-stone-300 bg-white px-3 py-2 text-sm text-stone-700 hover:bg-stone-50">
                      🔍 Phóng to
                    </button>
                    <button className="rounded-lg border border-stone-300 bg-white px-3 py-2 text-sm text-stone-700 hover:bg-stone-50">
                      🖨️ In
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Notes Section */}
            {showNotes && (
              <div className="mb-8 rounded-3xl border border-amber-200 bg-white p-8 shadow-lg">
                <h2 className="mb-6 text-2xl font-serif font-bold text-stone-800">Ghi chú của bạn</h2>
                <div className="space-y-4">
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Viết ghi chú cho tài liệu này... Ghi chú sẽ được tự động lưu."
                    className="w-full h-40 rounded-xl border border-stone-300 p-4 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20 resize-none"
                  ></textarea>
                  <div className="flex items-center justify-between text-xs text-stone-500">
                    <span>
                      {notes.length > 0
                        ? `${notes.length} ký tự • Tự động lưu vào thiết bị`
                        : 'Ghi chú của bạn sẽ được lưu tự động'}
                    </span>
                    {notes.length > 0 && (
                      <span className="text-green-600 flex items-center gap-1">
                        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        Đã lưu
                      </span>
                    )}
                  </div>
                </div>
                <div className="mt-4 flex justify-end space-x-4">
                  <button
                    onClick={() => {
                      if (window.confirm('Bạn có chắc muốn xóa tất cả ghi chú?')) {
                        setNotes('');
                        localStorage.removeItem(`notes_${document.id}`);
                      }
                    }}
                    className="rounded-full border-2 border-red-300 bg-white px-6 py-2 font-semibold text-red-600 transition-all hover:bg-red-50"
                    disabled={!notes}
                  >
                    Xóa ghi chú
                  </button>
                  <button
                    onClick={() => setShowNotes(false)}
                    className="rounded-full bg-gradient-to-r from-amber-500 to-orange-500 px-6 py-2 font-semibold text-white transition-all hover:from-amber-600 hover:to-orange-600"
                  >
                    Đóng
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              {/* Author Info */}
              <div className="rounded-2xl border border-amber-200 bg-white p-6 shadow-lg">
                <h3 className="mb-4 text-lg font-serif font-bold text-stone-800">Về tác giả</h3>
                <div className="text-center">
                  <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center">
                    <span className="text-white text-xl font-bold">
                      {document.author.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <h4 className="font-semibold text-stone-800 mb-2">{document.author}</h4>
                  <p className="text-sm text-stone-600 mb-4 leading-relaxed">
                    Chuyên gia nghiên cứu lịch sử Việt Nam với nhiều công trình nghiên cứu về các thời kỳ lịch sử.
                  </p>
                  <div className="flex items-center justify-center space-x-6 text-sm text-stone-600">
                    <div className="text-center">
                      <div className="font-bold text-green-600">23</div>
                      <div>Tài liệu</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-blue-600">8.5K</div>
                      <div>Độc giả</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-amber-600">4.7</div>
                      <div>Đánh giá</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Related Documents */}
              <div className="rounded-2xl border border-amber-200 bg-white p-6 shadow-lg">
                <h3 className="mb-4 text-lg font-serif font-bold text-stone-800">Tài liệu liên quan</h3>
                <div className="space-y-4">
                  {relatedDocuments.map((related) => (
                    <div
                      key={related.id}
                      onClick={() => navigate(`/tai-lieu/${related.id}`)}
                      className="group cursor-pointer rounded-xl border border-stone-200 p-4 transition-all hover:border-amber-300 hover:bg-amber-50"
                    >
                      <div className="flex space-x-3">
                        <div className="h-16 w-12 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center flex-shrink-0">
                          <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-stone-800 group-hover:text-amber-700 line-clamp-2 mb-1">
                            {related.title}
                          </h4>
                          <p className="text-sm text-stone-600 mb-2 truncate">
                            {related.author}
                          </p>
                          <div className="flex items-center space-x-3 text-xs text-stone-500">
                            <span>📄 {related.pages} trang</span>
                            <span>⭐ {related.rating}</span>
                            <span>{related.period}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Download Stats */}
              <div className="rounded-2xl border border-amber-200 bg-white p-6 shadow-lg">
                <h3 className="mb-4 text-lg font-serif font-bold text-stone-800">Thống kê</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-stone-600">Lượt tải về:</span>
                    <span className="font-bold text-green-600">{document.downloadCount}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-stone-600">Lượt xem:</span>
                    <span className="font-bold text-blue-600">{document.views}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-stone-600">Đánh giá:</span>
                    <span className="font-bold text-amber-600">{document.rating}/5</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-stone-600">Ngày xuất bản:</span>
                    <span className="font-bold text-stone-800">{document.createdDate}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      {showCitationModal && document && (
        <CitationModal
          title={document.title}
          author={document.author}
          date={document.createdDate}
          period={document.period}
          url={window.location.href}
          onClose={() => setShowCitationModal(false)}
        />
      )}

      {showShareModal && document && (
        <ShareModal
          title={document.title}
          description={document.description}
          url={window.location.href}
          onClose={() => setShowShareModal(false)}
        />
      )}
    </div>
  );
};

export default TaiLieuDetail;