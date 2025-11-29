// src/components/ImageModal.jsx

import React, { useState, useEffect } from 'react';

// Dữ liệu người dùng giả (Giữ nguyên)
const authorData = {
    name: "Nghệ Sĩ AI",
    avatar: "https://cdn-icons-png.flaticon.com/512/1995/1995515.png",
    followLink: "#"
};

// Dữ liệu giả cho "More like this" (Giữ nguyên)
const mockRelatedTags = ['Lịch sử', 'Văn hóa', 'Hà Nội', 'Kiến trúc', 'Ban đêm', 'Hồ Gươm', 'Du lịch'];
const mockRelatedImages = [
    { id: 1, src: 'https://images.pexels.com/photos/1683989/pexels-photo-1683989.jpeg?auto=compress&cs=tinysrgb&w=400', alt: 'Đền Ngọc Sơn' },
    { id: 2, src: 'https://images.pexels.com/photos/3584437/pexels-photo-3584437.jpeg?auto=compress&cs=tinysrgb&w=400', alt: 'Phố cổ Hà Nội' },
    { id: 3, src: 'https://images.pexels.com/photos/10795557/pexels-photo-10795557.jpeg?auto=compress&cs=tinysrgb&w=400', alt: 'Hoàng thành Thăng Long' },
    { id: 4, src: 'https://images.pexels.com/photos/10795557/pexels-photo-10795557.jpeg?auto=compress&cs=tinysrgb&w=400', alt: 'Hoàng thành Thăng Long' },
];

const ImageModal = ({ imageData, onClose, onNext, onPrev }) => {
    const [likeStatus, setLikeStatus] = useState('none');
    const [downloading, setDownloading] = useState(false);

    // Xử lý sự kiện nhấn phím (Giữ nguyên)
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') onClose();
            if (e.key === 'ArrowRight') onNext();
            if (e.key === 'ArrowLeft') onPrev();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onClose, onNext, onPrev]);

    // Hàm xử lý tải ảnh (Giữ nguyên)
    const handleDownload = async () => {
        setDownloading(true);
        try {
            const response = await fetch(imageData.src);
            const blob = await response.blob();
            const url = window.URL.createObjectURL(new Blob([blob]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `${imageData.alt || 'image'}.jpg`);
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Error downloading image:', error);
        } finally {
            setDownloading(false);
        }
    };

    if (!imageData) return null;

    return (
        // Lớp phủ nền (Giữ nguyên)
        <div 
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
            onClick={onClose} 
        >
            {/* Nút đóng (Giữ nguyên) */}
            <button onClick={onClose} className="absolute top-4 left-4 z-[60] text-white/70 hover:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
            
            {/* Nút điều hướng TRÁI (Giữ nguyên) */}
            <button onClick={(e) => { e.stopPropagation(); onPrev(); }} className="absolute left-4 top-1/2 -translate-y-1/2 z-[55] p-3 bg-white/20 rounded-full text-white hover:bg-white/30 transition-all hidden md:block">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
            </button>

            {/* Nút điều hướng PHẢI (Giữ nguyên) */}
            <button onClick={(e) => { e.stopPropagation(); onNext(); }} className="absolute right-4 top-1/2 -translate-y-1/2 z-[55] p-3 bg-white/20 rounded-full text-white hover:bg-white/30 transition-all hidden md:block">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
            </button>

            {/* Khung Modal Chính (Giữ nguyên) */}
            <div 
                className="relative bg-white rounded-lg shadow-2xl overflow-hidden max-w-7xl w-full max-h-[90vh] flex flex-col"
                onClick={(e) => e.stopPropagation()} 
            >
                {/* Header (Giữ nguyên) */}
                <div className="flex items-center justify-between p-4 border-b border-gray-200">
                    <div className="flex items-center gap-3">
                        <img src={authorData.avatar} alt={authorData.name} className="h-8 w-8 rounded-full" />
                        <div className="flex flex-col">
                            <span className="font-semibold text-gray-800 text-sm md:text-base">{authorData.name}</span>
                            <a href={authorData.followLink} className="text-blue-600 text-xs md:text-sm hover:underline">Follow</a>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                    {/* Nút Like (Giữ nguyên) */}
                        <button 
                            onClick={() => setLikeStatus(prev => prev === 'liked' ? 'none' : 'liked')}
                            className={`flex items-center gap-1.5 p-2 rounded-lg text-sm md:text-base transition-colors duration-200 
                                        ${likeStatus === 'liked' ? 'bg-green-100 text-green-700' : 'text-gray-600 hover:bg-gray-100'}`}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                {likeStatus === 'liked' ? (
                                    <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.562 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                                ) : (
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                )}
                            </svg>
                            <span className="hidden md:inline">Like</span>
                        </button>

                        {/* Nút Dislike (Giữ nguyên) */}
                        <button 
                            onClick={() => setLikeStatus(prev => prev === 'disliked' ? 'none' : 'disliked')}
                            className={`flex items-center gap-1.5 p-2 rounded-lg transition-colors 
                                        ${likeStatus === 'disliked' ? 'bg-red-100 text-red-700' : 'text-gray-600 hover:bg-gray-100'}`}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                {likeStatus === 'disliked' ? (
                                    <path d="M18 9.5a1.5 1.5 0 11-3 0v-6a1.5 1.5 0 013 0v6zM14 9.667v-5.43a2 2 0 00-1.106-1.79l-.05-.025A4 4 0 0011.057 2H5.642a2 2 0 00-1.962 1.608l-1.2 6A2 2 0 004.438 12H8v4a2 2 0 002 2 1 1 0 001-1v-.667a4 4 0 01.8-2.4l1.2-2.4a4 4 0 00.8-2.4z" />
                                ) : (
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                                )}
                            </svg>
                            <span className="hidden md:inline">Dislike</span>
                        </button>

                        {/* Nút Download (Giữ nguyên) */}
                        <button onClick={handleDownload} 
                                className={`flex items-center gap-1 px-4 py-2 rounded-lg text-white text-sm md:text-base transition-colors duration-200 
                                        ${downloading ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600'}`}>
                            {downloading ? (
                                <>
                                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    <span>Đang tải...</span>
                                </>
                            ) : (
                                <>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                    </svg>
                                    <span className="hidden md:inline">Tải xuống</span>
                                </>
                            )}
                        </button>
                    </div>
                </div>

                {/* Vùng nội dung có thể cuộn (Giữ nguyên) */}
                <div className="flex-1 overflow-y-auto">
                
                    {/* Phần chứa ảnh (Giữ nguyên) */}
                    <div className="flex items-center justify-center p-4 bg-gray-50">
                        <img 
                            src={imageData.src} 
                            alt={imageData.alt} 
                            className="max-w-full max-h-[70vh] object-contain rounded-lg shadow-md" 
                        />
                    </div>

                    {/* Footer (caption) (Giữ nguyên) */}
                    <div className="p-4 pt-3 text-gray-800 text-lg text-center">
                        <p>{imageData.caption}</p>
                    </div>

                    {/* Phần "More Like This" (Giữ nguyên) */}
                    <div className="p-4 border-t border-gray-200">
                        <h3 className="text-xl font-semibold text-gray-900 mb-4">More like this</h3>
                        
                        {/* Related Tags (Giữ nguyên) */}
                        <div className="flex flex-wrap gap-2 mb-4">
                            {mockRelatedTags.map(tag => (
                                <button key={tag} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors">
                                    {tag}
                                </button>
                            ))}
                        </div>
                        
                        {/* === THAY ĐỔI: Grid ảnh to hơn === */}
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4"> {/* <-- THAY ĐỔI TỪ md:grid-cols-4 */}
                            {mockRelatedImages.map(img => (
                                <div key={img.id} className="group relative rounded-lg overflow-hidden cursor-pointer" 
                                     onClick={() => alert('Chuyển đến ảnh ' + img.alt)} 
                                >
                                    <img 
                                        src={img.src} 
                                        alt={img.alt} 
                                        className="w-full h-[400px] object-cover transition-transform duration-300 group-hover:scale-110" // <-- THAY ĐỔI TỪ h-32
                                    />
                                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div> 
            </div> 
        </div> 
    );
};

export default ImageModal;