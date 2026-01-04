import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as XLSX from 'xlsx';
import mammoth from 'mammoth';

const UploadTaiLieu = () => {
  const [file, setFile] = useState(null);
  const [parsedData, setParsedData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  const [error, setError] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const navigate = useNavigate();

  // Handle file upload
  const handleFileUpload = (uploadedFile) => {
    if (!uploadedFile) return;

    const validTypes = [
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];

    if (!validTypes.includes(uploadedFile.type)) {
      setError('Chỉ hỗ trợ file .xlsx, .xls, .docx');
      return;
    }

    if (uploadedFile.size > 10 * 1024 * 1024) {
      setError('File không được vượt quá 10MB');
      return;
    }

    setFile(uploadedFile);
    setError(null);
  };

  // Drag and drop handlers
  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      handleFileUpload(droppedFile);
    }
  };

  // Map period name to period id
  const getPeriodId = (periodName) => {
    const periodMap = {
      'Bắc thuộc': 'bac-thuoc',
      'Lý - Trần': 'ly-tran',
      'Lý-Trần': 'ly-tran',
      'Tây Sơn': 'tay-son',
      'Nguyễn': 'nguyen',
      'Hiện đại': 'hien-dai'
    };
    return periodMap[periodName] || 'bac-thuoc';
  };

  // Parse Excel file
  const parseExcel = async (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (e) => {
        try {
          const data = new Uint8Array(e.target.result);
          const workbook = XLSX.read(data, { type: 'array' });
          const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
          const jsonData = XLSX.utils.sheet_to_json(firstSheet);

          // Map Excel columns to document format (đầy đủ như mock data)
          const mapped = jsonData.map((row, index) => {
            const baseId = Date.now() + index;
            const isLecture = row['Loại'] === 'Bài giảng';

            return {
              id: baseId,
              title: row['Tiêu đề'] || '',
              description: row['Mô tả'] || '',
              type: row['Loại'] || 'Tài liệu',
              level: row['Cấp độ'] || 'Cơ bản',
              views: row['Lượt xem'] || '0',
              rating: parseFloat(row['Đánh giá']) || 4.5,
              author: row['Tác giả'] || 'Không rõ',
              thumbnail: row['Thumbnail'] || 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=400&h=300&fit=crop',
              downloadCount: parseInt(row['Lượt tải']) || 0,
              createdDate: row['Ngày tạo'] || new Date().toISOString().split('T')[0],
              category: row['Danh mục'] || 'Lịch sử',
              period: row['Thời kỳ'] || 'Bắc thuộc',
              periodId: getPeriodId(row['Thời kỳ']),

              // Lecture specific fields
              ...(isLecture ? {
                duration: row['Thời lượng'] || '45 phút',
                durationSeconds: parseInt(row['Giây']) || 2700,
                hasSubtitles: row['Phụ đề'] === 'Có' || true,
                hasTranscript: row['Bản ghi'] === 'Có' || true,
                videoUrl: row['Video URL'] || 'https://www.youtube.com/watch?v=vqvXYvF4Yes'
              } : {}),

              // Document specific fields
              ...(!isLecture ? {
                pages: parseInt(row['Số trang']) || 0,
                fileSize: row['Kích thước'] || '2.5 MB',
                language: row['Ngôn ngữ'] || 'Tiếng Việt',
                publisher: row['Nhà xuất bản'] || 'NXB Giáo dục Việt Nam',
                format: row['Định dạng'] || 'PDF'
              } : {})
            };
          });

          resolve(mapped);
        } catch (err) {
          reject(err);
        }
      };

      reader.onerror = reject;
      reader.readAsArrayBuffer(file);
    });
  };

  // Parse Word file
  const parseWord = async (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = async (e) => {
        try {
          const arrayBuffer = e.target.result;
          const result = await mammoth.extractRawText({ arrayBuffer });
          const text = result.value;

          // Parse text based on template
          const lines = text.split('\n').filter(line => line.trim());
          const document = {
            id: Date.now(),
            title: '',
            description: '',
            type: 'Tài liệu',
            level: 'Cơ bản',
            views: '0',
            rating: 4.5,
            author: 'Không rõ',
            thumbnail: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=400&h=300&fit=crop',
            downloadCount: 0,
            createdDate: new Date().toISOString().split('T')[0],
            category: 'Lịch sử',
            period: 'Bắc thuộc',
            periodId: 'bac-thuoc',
            pages: 0,
            fileSize: '2.5 MB',
            language: 'Tiếng Việt',
            publisher: 'NXB Giáo dục Việt Nam',
            format: 'PDF'
          };

          // Extract fields from text
          lines.forEach(line => {
            const colonIndex = line.indexOf(':');
            if (colonIndex === -1) return;

            const key = line.substring(0, colonIndex).trim().replace(/\*\*/g, '');
            const value = line.substring(colonIndex + 1).trim();

            if (key.includes('Loại')) {
              document.type = value;
              if (value === 'Bài giảng') {
                document.duration = '45 phút';
                document.durationSeconds = 2700;
                document.hasSubtitles = true;
                document.hasTranscript = true;
                document.videoUrl = 'https://www.youtube.com/watch?v=vqvXYvF4Yes';
                delete document.pages;
                delete document.fileSize;
                delete document.publisher;
                delete document.format;
              }
            }
            if (key.includes('Tiêu đề')) document.title = value;
            if (key.includes('Mô tả')) document.description = value;
            if (key.includes('Tác giả')) document.author = value;
            if (key.includes('Thời kỳ')) {
              document.period = value;
              document.periodId = getPeriodId(value);
            }
            if (key.includes('Cấp độ')) document.level = value;
            if (key.includes('Lượt xem')) document.views = value;
            if (key.includes('Đánh giá')) document.rating = parseFloat(value);
            if (key.includes('Danh mục')) document.category = value;
            if (key.includes('Số trang')) document.pages = parseInt(value);
            if (key.includes('Thời lượng')) document.duration = value;
            if (key.includes('Video URL')) document.videoUrl = value;
            if (key.includes('Thumbnail')) document.thumbnail = value;
          });

          resolve([document]);
        } catch (err) {
          reject(err);
        }
      };

      reader.onerror = reject;
      reader.readAsArrayBuffer(file);
    });
  };

  // Process file
  const handleProcessFile = async () => {
    if (!file) return;

    setLoading(true);
    setError(null);

    try {
      let data;

      if (file.name.endsWith('.xlsx') || file.name.endsWith('.xls')) {
        data = await parseExcel(file);
      } else if (file.name.endsWith('.docx')) {
        data = await parseWord(file);
      }

      setParsedData(data);
      setPreviewMode(true);
    } catch (err) {
      setError('Lỗi khi xử lý file: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Save to localStorage and update educationData
  const handleSaveDocuments = () => {
    try {
      // Get existing uploaded documents
      const existingData = JSON.parse(localStorage.getItem('uploadedDocuments') || '[]');

      // Group by period
      const groupedByPeriod = {};
      parsedData.forEach(doc => {
        const periodId = doc.periodId;
        if (!groupedByPeriod[periodId]) {
          groupedByPeriod[periodId] = [];
        }
        groupedByPeriod[periodId].push(doc);
      });

      // Add new documents
      const updatedData = [...existingData, ...parsedData];

      // Save to localStorage
      localStorage.setItem('uploadedDocuments', JSON.stringify(updatedData));
      localStorage.setItem('uploadedDocumentsByPeriod', JSON.stringify(groupedByPeriod));

      alert(`✅ Đã lưu thành công ${parsedData.length} tài liệu/bài giảng!\n\nBạn có thể xem chúng tại trang Tài liệu & Bài giảng.`);

      // Navigate to document page
      setTimeout(() => {
        navigate('/tai-lieu-bai-giang');
      }, 1000);
    } catch (err) {
      setError('Lỗi khi lưu dữ liệu: ' + err.message);
    }
  };

  // Download Excel template
  const downloadExcelTemplate = () => {
    const template = [
      {
        'Loại': 'Tài liệu',
        'Tiêu đề': 'Khởi nghĩa Bà Triệu',
        'Mô tả': 'Cuộc khởi nghĩa chống ách đô hộ phương Bắc...',
        'Tác giả': 'PGS. Trần Thị Mai',
        'Thời kỳ': 'Bắc thuộc',
        'Số trang': 45,
        'Cấp độ': 'Cao cấp',
        'Lượt xem': '1,890',
        'Đánh giá': 4.6,
        'Lượt tải': 867,
        'Ngày tạo': '2024-08-22',
        'Danh mục': 'Lịch sử',
        'Kích thước': '2.3 MB',
        'Ngôn ngữ': 'Tiếng Việt',
        'Nhà xuất bản': 'NXB Giáo dục Việt Nam',
        'Định dạng': 'PDF',
        'Thumbnail': 'https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?w=400&h=300&fit=crop'
      },
      {
        'Loại': 'Bài giảng',
        'Tiêu đề': 'Hai Bà Trưng',
        'Mô tả': 'Video bài giảng về cuộc khởi nghĩa Hai Bà Trưng...',
        'Tác giả': 'GS. Nguyễn Văn Huyền',
        'Thời kỳ': 'Bắc thuộc',
        'Thời lượng': '45 phút',
        'Giây': 2700,
        'Cấp độ': 'Trung cấp',
        'Lượt xem': '2,340',
        'Đánh giá': 4.8,
        'Lượt tải': 1250,
        'Ngày tạo': '2024-09-15',
        'Danh mục': 'Lịch sử',
        'Phụ đề': 'Có',
        'Bản ghi': 'Có',
        'Video URL': 'https://www.youtube.com/watch?v=vqvXYvF4Yes',
        'Thumbnail': 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop'
      }
    ];

    const ws = XLSX.utils.json_to_sheet(template);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Template');
    XLSX.writeFile(wb, 'template-tai-lieu-bai-giang.xlsx');
  };

  // Download Word template
  const downloadWordTemplate = () => {
    const template = `TEMPLATE TÀI LIỆU/BÀI GIẢNG

Loại: Tài liệu
Tiêu đề: Khởi nghĩa Bà Triệu
Mô tả: Tìm hiểu về cuộc khởi nghĩa anh dũng của Bà Triệu chống lại sự đô hộ của nhà Ngô Đông
Tác giả: PGS. Trần Thị Mai
Thời kỳ: Bắc thuộc
Số trang: 45
Cấp độ: Cao cấp
Lượt xem: 1,890
Đánh giá: 4.6
Lượt tải: 867
Ngày tạo: 2024-08-22
Danh mục: Lịch sử
Thumbnail: https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?w=400&h=300&fit=crop

---

TEMPLATE BÀI GIẢNG

Loại: Bài giảng
Tiêu đề: Khởi nghĩa Hai Bà Trưng
Mô tả: Video bài giảng về cuộc khởi nghĩa Hai Bà Trưng chống ách đô hộ phương Bắc
Tác giả: GS. Nguyễn Văn Huyền
Thời kỳ: Bắc thuộc
Thời lượng: 45 phút
Cấp độ: Trung cấp
Lượt xem: 2,340
Đánh giá: 4.8
Lượt tải: 1250
Ngày tạo: 2024-09-15
Danh mục: Lịch sử
Video URL: https://www.youtube.com/watch?v=vqvXYvF4Yes
Thumbnail: https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop`;

    const blob = new Blob([template], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'template-tai-lieu-bai-giang.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-stone-800 mb-4">
            📤 Upload Tài liệu & Bài giảng
          </h1>
          <p className="text-lg text-stone-600 max-w-2xl mx-auto">
            Tải lên file Excel hoặc Word để tạo tài liệu và bài giảng tự động.<br />
            Không cần server, xử lý hoàn toàn trên trình duyệt!
          </p>
        </div>

        {/* Upload Area */}
        {!previewMode && (
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border-2 border-amber-200">
            <div
              className={`border-2 border-dashed rounded-xl p-12 text-center transition-all ${isDragging
                ? 'border-amber-500 bg-amber-50'
                : 'border-amber-300 hover:border-amber-500 hover:bg-amber-50/50'
                }`}
              onDragEnter={handleDragEnter}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <input
                type="file"
                accept=".xlsx,.xls,.docx"
                onChange={(e) => handleFileUpload(e.target.files[0])}
                className="hidden"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className="cursor-pointer flex flex-col items-center"
              >
                <svg className="w-20 h-20 text-amber-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                <span className="text-2xl font-bold text-stone-700 mb-2">
                  {file ? `📄 ${file.name}` : 'Kéo thả file hoặc nhấn để chọn'}
                </span>
                <span className="text-sm text-stone-500 mb-1">
                  Hỗ trợ: .xlsx, .xls, .docx (Tối đa 10MB)
                </span>
                {file && (
                  <span className="text-xs text-green-600 font-medium mt-2">
                    ✓ Kích thước: {(file.size / 1024 / 1024).toFixed(2)} MB
                  </span>
                )}
              </label>
            </div>

            {file && (
              <div className="mt-6 flex justify-center">
                <button
                  onClick={handleProcessFile}
                  disabled={loading}
                  className="px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl font-bold text-lg hover:from-amber-600 hover:to-orange-600 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <span className="flex items-center gap-3">
                      <svg className="animate-spin h-6 w-6" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Đang xử lý file...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      Xử lý file ngay
                    </span>
                  )}
                </button>
              </div>
            )}

            {error && (
              <div className="mt-6 p-4 bg-red-50 border-2 border-red-200 rounded-xl text-red-700 flex items-start gap-3">
                <svg className="w-6 h-6 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <div>
                  <strong className="font-bold">Lỗi:</strong> {error}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Preview Data */}
        {previewMode && parsedData.length > 0 && (
          <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-green-200">
            <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
              <h2 className="text-3xl font-serif font-bold text-stone-800">
                ✅ Xem trước ({parsedData.length} mục)
              </h2>
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setPreviewMode(false);
                    setFile(null);
                    setParsedData([]);
                  }}
                  className="px-6 py-3 border-2 border-stone-300 text-stone-700 rounded-xl font-bold hover:bg-stone-50 transition-colors"
                >
                  ← Hủy
                </button>
                <button
                  onClick={handleSaveDocuments}
                  className="px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-bold hover:from-green-600 hover:to-emerald-600 transition-all shadow-lg hover:shadow-xl"
                >
                  💾 Lưu tất cả
                </button>
              </div>
            </div>

            <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
              {parsedData.map((doc, index) => (
                <div key={doc.id} className="border-2 border-stone-200 rounded-xl p-6 hover:shadow-lg hover:border-amber-300 transition-all bg-gradient-to-r from-white to-amber-50/30">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl flex items-center justify-center text-2xl font-bold text-white shadow-lg">
                      #{index + 1}
                    </div>
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="col-span-3 border-b border-stone-200 pb-3 mb-2">
                        <div className="flex items-center gap-2 mb-2">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-bold ${doc.type === 'Bài giảng' ? 'bg-blue-500 text-white' : 'bg-green-500 text-white'
                            }`}>
                            {doc.type === 'Bài giảng' ? '🎥' : '📄'} {doc.type}
                          </span>
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-amber-100 text-amber-800">
                            {doc.level}
                          </span>
                        </div>
                        <h3 className="text-xl font-bold text-stone-800">{doc.title}</h3>
                      </div>

                      <div>
                        <span className="text-xs font-bold text-stone-500 uppercase block mb-1">👤 Tác giả</span>
                        <p className="text-sm font-medium text-stone-700">{doc.author}</p>
                      </div>
                      <div>
                        <span className="text-xs font-bold text-stone-500 uppercase block mb-1">🏛️ Thời kỳ</span>
                        <p className="text-sm font-medium text-stone-700">{doc.period}</p>
                      </div>
                      <div>
                        <span className="text-xs font-bold text-stone-500 uppercase block mb-1">📅 Ngày tạo</span>
                        <p className="text-sm text-stone-600">{doc.createdDate}</p>
                      </div>

                      <div>
                        <span className="text-xs font-bold text-stone-500 uppercase block mb-1">⭐ Đánh giá</span>
                        <p className="text-sm text-stone-600">{doc.rating}/5.0</p>
                      </div>
                      <div>
                        <span className="text-xs font-bold text-stone-500 uppercase block mb-1">👁️ Lượt xem</span>
                        <p className="text-sm text-stone-600">{doc.views}</p>
                      </div>
                      <div>
                        <span className="text-xs font-bold text-stone-500 uppercase block mb-1">📥 Lượt tải</span>
                        <p className="text-sm text-stone-600">{doc.downloadCount}</p>
                      </div>

                      {doc.type === 'Bài giảng' && (
                        <>
                          <div>
                            <span className="text-xs font-bold text-stone-500 uppercase block mb-1">⏱️ Thời lượng</span>
                            <p className="text-sm text-stone-600">{doc.duration}</p>
                          </div>
                          <div>
                            <span className="text-xs font-bold text-stone-500 uppercase block mb-1">🎬 Video URL</span>
                            <a href={doc.videoUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline truncate block">
                              {doc.videoUrl}
                            </a>
                          </div>
                        </>
                      )}

                      {doc.type === 'Tài liệu' && (
                        <>
                          <div>
                            <span className="text-xs font-bold text-stone-500 uppercase block mb-1">📄 Số trang</span>
                            <p className="text-sm text-stone-600">{doc.pages} trang</p>
                          </div>
                          <div>
                            <span className="text-xs font-bold text-stone-500 uppercase block mb-1">💾 Kích thước</span>
                            <p className="text-sm text-stone-600">{doc.fileSize}</p>
                          </div>
                          <div>
                            <span className="text-xs font-bold text-stone-500 uppercase block mb-1">📚 Nhà XB</span>
                            <p className="text-sm text-stone-600">{doc.publisher}</p>
                          </div>
                        </>
                      )}

                      <div className="col-span-3 mt-2">
                        <span className="text-xs font-bold text-stone-500 uppercase block mb-1">📝 Mô tả</span>
                        <p className="text-sm text-stone-600 leading-relaxed">{doc.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Format Guide */}
        <div className="mt-12 bg-white rounded-2xl shadow-xl p-8 border-2 border-blue-200">
          <h2 className="text-3xl font-serif font-bold text-stone-800 mb-6 flex items-center gap-3">
            <span className="text-4xl">📋</span>
            Hướng dẫn Format
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Excel Format */}
            <div className="border-2 border-green-200 rounded-xl p-6 bg-gradient-to-br from-green-50 to-emerald-50">
              <h3 className="font-bold text-xl text-green-700 mb-4 flex items-center gap-2">
                <span className="text-2xl">📊</span>
                Excel Format (.xlsx)
              </h3>
              <div className="bg-white rounded-lg p-4 text-sm font-mono mb-4 overflow-x-auto shadow-inner ">
                <table className="w-full text-xs border-collapse text-stone-900">
                  <thead>
                    <tr className="border-b-2 border-stone-300 bg-stone-100">
                      <th className="text-left p-2 font-bold">Loại</th>
                      <th className="text-left p-2 font-bold">Tiêu đề</th>
                      <th className="text-left p-2 font-bold">Tác giả</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-stone-200">
                      <td className="p-2">Tài liệu</td>
                      <td className="p-2">Bà Triệu</td>
                      <td className="p-2">PGS.TS...</td>
                    </tr>
                    <tr>
                      <td className="p-2">Bài giảng</td>
                      <td className="p-2">Hai Bà Trưng</td>
                      <td className="p-2">GS...</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="text-sm text-stone-700 space-y-1 bg-white p-4 rounded-lg">
                <p className="font-bold text-green-700 mb-2">Các cột bắt buộc:</p>
                <p>• <strong>Loại:</strong> Tài liệu / Bài giảng</p>
                <p>• <strong>Tiêu đề, Mô tả, Tác giả</strong></p>
                <p>• <strong>Thời kỳ:</strong> Bắc thuộc, Lý-Trần, Tây Sơn, Nguyễn, Hiện đại</p>
                <p>• <strong>Cấp độ:</strong> Cơ bản, Trung cấp, Cao cấp</p>
                <p className="font-bold text-green-700 mt-3 mb-2">Cho Tài liệu:</p>
                <p>• Số trang, Kích thước, Nhà xuất bản</p>
                <p className="font-bold text-green-700 mt-3 mb-2">Cho Bài giảng:</p>
                <p>• Thời lượng, Video URL</p>
              </div>
            </div>

            {/* Word Format */}
            <div className="border-2 border-blue-200 rounded-xl p-6 bg-gradient-to-br from-blue-50 to-indigo-50">
              <h3 className="font-bold text-xl text-blue-700 mb-4 flex items-center gap-2">
                <span className="text-2xl">📄</span>
                Word Format (.docx)
              </h3>
              <div className="bg-white rounded-lg p-4 text-sm mb-4 shadow-inner">
                <pre className="whitespace-pre-wrap text-xs font-mono leading-relaxed text-stone-900">
                  {`Loại: Tài liệu
Tiêu đề: Khởi nghĩa Bà Triệu
Mô tả: Phân tích chi tiết...
Tác giả: PGS.TS Nguyễn Văn A
Thời kỳ: Bắc thuộc
Số trang: 45
Cấp độ: Trung cấp
Lượt xem: 1,890
Đánh giá: 4.6
Danh mục: Lịch sử`}
                </pre>
              </div>
              <div className="text-sm text-stone-700 bg-white p-4 rounded-lg">
                <p className="font-bold text-blue-700 mb-2">Lưu ý:</p>
                <p>• Mỗi trường trên một dòng</p>
                <p>• Format: <code className="bg-stone-100 px-2 py-1 rounded">Tên trường: Giá trị</code></p>
                <p>• Có thể bỏ qua dòng trống</p>
                <p>• Hỗ trợ cả plain text (.txt)</p>
              </div>
            </div>
          </div>

          {/* Download Templates */}
          <div className="mt-8 flex gap-4 justify-center flex-wrap">
            <button
              onClick={downloadExcelTemplate}
              className="px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-bold text-lg hover:from-green-700 hover:to-emerald-700 transition-all shadow-lg hover:shadow-xl flex items-center gap-3"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
              📊 Tải template Excel
            </button>
            <button
              onClick={downloadWordTemplate}
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-bold text-lg hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl flex items-center gap-3"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
              📄 Tải template Word
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadTaiLieu;
