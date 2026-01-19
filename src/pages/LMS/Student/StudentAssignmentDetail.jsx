import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { lmsData } from '../../../data/lmsData';

const StudentAssignmentDetail = () => {
  const { assignmentId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const studentId = parseInt(searchParams.get('studentId')) || 10;

  const assignment = lmsData.assignments.find(a => a.id === parseInt(assignmentId));
  const course = lmsData.courses.find(c => c.id === assignment?.courseId);
  const student = lmsData.users.find(u => u.id === studentId);
  const existingSubmission = lmsData.submissions.find(s =>
    s.assignmentId === parseInt(assignmentId) && s.studentId === studentId
  );

  // Enhanced UI state with better form handling
  const [activeTab, setActiveTab] = useState('instructions');
  const [submissionData, setSubmissionData] = useState({
    textContent: '',
    images: [],
    videoUrl: '',
    notes: '',
    selectedAiTool: assignment?.allowedAITools?.[0] || ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  // Load existing submission data
  useEffect(() => {
    if (existingSubmission && existingSubmission.content) {
      const content = existingSubmission.content;
      setSubmissionData({
        textContent: content.text || content.notes || '',
        images: content.images || [],
        videoUrl: content.videoUrl || '',
        notes: content.notes || '',
        selectedAiTool: content.aiTool || assignment?.allowedAITools?.[0] || ''
      });
    }
  }, [existingSubmission, assignment]);

  const isOverdue = new Date(assignment?.dueDate) < new Date();
  const canSubmit = !existingSubmission || (existingSubmission.status === 'draft' && !isOverdue);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (event) => {
        setSubmissionData(prev => ({
          ...prev,
          images: [...prev.images, {
            id: Date.now() + Math.random(),
            url: event.target.result,
            filename: file.name,
            prompt: '',
            aiTool: prev.selectedAiTool
          }]
        }));
      };
      reader.readAsDataURL(file);
    });
  };

  const updateImagePrompt = (imageId, prompt) => {
    setSubmissionData(prev => ({
      ...prev,
      images: prev.images.map(img =>
        img.id === imageId ? { ...img, prompt } : img
      )
    }));
  };

  const removeImage = (imageId) => {
    setSubmissionData(prev => ({
      ...prev,
      images: prev.images.filter(img => img.id !== imageId)
    }));
  };

  const handleSubmit = async () => {
    if (!submissionData.textContent.trim() && submissionData.images.length === 0 && !submissionData.videoUrl.trim()) {
      alert('Vui lòng nhập nội dung bài làm!');
      return;
    }

    setIsSubmitting(true);

    // Mock submission
    setTimeout(() => {
      alert('Đã nộp bài thành công!');
      setIsSubmitting(false);
      navigate(`/lms/student/dashboard?studentId=${studentId}`);
    }, 2000);
  };

  const getAssignmentTypeIcon = (type) => {
    switch (type) {
      case 'ai-image': return '🎨';
      case 'ai-video': return '🎬';
      case 'text': return '📝';
      default: return '📋';
    }
  };

  const getStatusBadge = (submission) => {
    if (!submission) return null;

    if (submission.status === 'submitted' && submission.grade) {
      return (
        <div className="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-green-100 text-green-800 border border-green-200">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Đã chấm: {submission.grade}/100
        </div>
      );
    } else if (submission.status === 'submitted') {
      return (
        <div className="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-yellow-100 text-yellow-800 border border-yellow-200">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Chờ chấm điểm
        </div>
      );
    } else {
      return (
        <div className="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-blue-100 text-blue-800 border border-blue-200">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
          Bản nháp
        </div>
      );
    }
  };

  if (!assignment || !course || !student) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Đang tải bài tập...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Enhanced Header */}
      <div className="bg-white shadow-lg border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate(`/lms/student/dashboard?studentId=${studentId}`)}
                className="p-2 text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-all duration-200"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <div className="flex items-center space-x-4">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                  {getAssignmentTypeIcon(assignment.type)}
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-slate-800">{assignment.title}</h1>
                  <p className="text-slate-600 flex items-center space-x-2">
                    <span>{course.title}</span>
                    <span className="text-slate-400">•</span>
                    <span className="text-sm font-medium px-2 py-1 bg-slate-100 rounded-full">
                      {assignment.type === 'ai-image' ? 'Bài tập AI Hình ảnh' :
                        assignment.type === 'ai-video' ? 'Bài tập AI Video' :
                          'Bài tập Văn bản'}
                    </span>
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-6">
              <div className="text-right">
                <p className="text-sm text-slate-500 mb-1">Hạn nộp</p>
                <p className={`text-lg font-bold ${isOverdue ? 'text-red-600' : 'text-slate-800'}`}>
                  {new Date(assignment.dueDate).toLocaleDateString('vi-VN', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
                {isOverdue && (
                  <p className="text-sm text-red-500 font-medium">⚠️ Đã quá hạn</p>
                )}
              </div>
              {getStatusBadge(existingSubmission)}
            </div>
          </div>

          {/* Enhanced Tab Navigation */}
          <div className="mt-6 border-b border-slate-200">
            <nav className="flex space-x-8">
              {[
                { id: 'instructions', label: 'Yêu cầu bài tập', icon: '📋' },
                { id: 'submission', label: 'Nộp bài làm', icon: '📝' },
                { id: 'rubric', label: 'Tiêu chí chấm', icon: '📊' },
                { id: 'resources', label: 'Công cụ AI', icon: '🔧' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-3 px-1 border-b-2 font-medium text-sm transition-all duration-200 ${activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                    }`}
                >
                  <span>{tab.icon}</span>
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* Enhanced Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Instructions Tab */}
        {activeTab === 'instructions' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4">
                  <h2 className="text-xl font-bold text-white flex items-center">
                    <span className="mr-3">📋</span>
                    Mô tả bài tập
                  </h2>
                </div>
                <div className="p-8">
                  <div className="prose prose-slate max-w-none">
                    <p className="text-slate-700 leading-relaxed text-lg mb-8 font-medium">
                      {assignment.description}
                    </p>

                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-500 rounded-r-xl p-6 mb-8">
                      <h4 className="font-bold text-blue-900 mb-3 text-lg flex items-center">
                        <span className="mr-2">💡</span>
                        Hướng dẫn chi tiết
                      </h4>
                      <p className="text-blue-800 leading-relaxed text-base">
                        {assignment.instructions}
                      </p>
                    </div>

                    {assignment.requirements && (
                      <div>
                        <h4 className="font-bold text-slate-800 mb-6 text-lg flex items-center">
                          <span className="mr-2">✅</span>
                          Yêu cầu bài làm
                        </h4>
                        <div className="space-y-4">
                          {assignment.requirements.map((req, index) => (
                            <div key={index} className="flex items-start space-x-4 p-4 bg-green-50 rounded-xl border border-green-200">
                              <div className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                                {index + 1}
                              </div>
                              <span className="text-slate-700 font-medium leading-relaxed">{req}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-1 space-y-6">
              {/* Assignment Info Card */}
              <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
                <div className="bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-4">
                  <h3 className="font-bold text-white flex items-center">
                    <span className="mr-2">📊</span>
                    Thông tin bài tập
                  </h3>
                </div>
                <div className="p-6 space-y-5">
                  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <span className="text-sm font-medium text-slate-600">Loại bài tập</span>
                    <span className="text-sm font-bold text-slate-800 px-3 py-1 bg-white rounded-full border">
                      {assignment.type === 'ai-image' ? 'AI Hình ảnh' :
                        assignment.type === 'ai-video' ? 'AI Video' : 'Văn bản'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <span className="text-sm font-medium text-slate-600">Điểm tối đa</span>
                    <span className="text-lg font-bold text-blue-600">{assignment.maxScore}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <span className="text-sm font-medium text-slate-600">Học sinh tham gia</span>
                    <span className="text-sm font-bold text-slate-800">{assignment.totalStudents}</span>
                  </div>
                  {assignment.minImages && (
                    <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <span className="text-sm font-medium text-slate-600">Ảnh tối thiểu</span>
                      <span className="text-sm font-bold text-orange-600">{assignment.minImages} ảnh</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
                <div className="bg-gradient-to-r from-green-600 to-emerald-600 px-6 py-4">
                  <h3 className="font-bold text-white flex items-center">
                    <span className="mr-2">🚀</span>
                    Thao tác nhanh
                  </h3>
                </div>
                <div className="p-6 space-y-4">
                  <button
                    onClick={() => setActiveTab('submission')}
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-4 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 font-semibold flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    <span>Bắt đầu làm bài</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('resources')}
                    className="w-full bg-gradient-to-r from-purple-600 to-purple-700 text-white px-6 py-4 rounded-xl hover:from-purple-700 hover:to-purple-800 transition-all duration-200 font-semibold flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 7.172V5L8 4z" />
                    </svg>
                    <span>Xem công cụ AI</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Submission Tab with Enhanced Form */}
        {activeTab === 'submission' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
                <div className="bg-gradient-to-r from-green-600 to-emerald-600 px-6 py-4">
                  <h2 className="text-xl font-bold text-white flex items-center">
                    <span className="mr-3">📝</span>
                    Nộp bài làm
                  </h2>
                </div>
                <div className="p-8 space-y-8">
                  {/* Enhanced Text Input */}
                  {(assignment.type === 'text' || assignment.type === 'ai-image' || assignment.type === 'ai-video') && (
                    <div>
                      <label className="flex items-center text-lg font-bold text-slate-800 mb-4">
                        <span className="mr-2">📝</span>
                        Nội dung bài làm
                        <span className="ml-2 text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <textarea
                          value={submissionData.textContent}
                          onChange={(e) => setSubmissionData(prev => ({ ...prev, textContent: e.target.value }))}
                          className="w-full h-48 px-6 py-4 border-2 border-slate-300 rounded-2xl resize-none focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition-all duration-200 text-slate-700 leading-relaxed text-lg shadow-inner bg-slate-50 focus:bg-white"
                          placeholder="✍️ Nhập nội dung bài làm của bạn tại đây. Hãy viết một cách chi tiết và rõ ràng..."
                          disabled={!canSubmit}
                        />
                        <div className="absolute bottom-4 right-4 bg-white rounded-full px-3 py-1 shadow-md">
                          <span className="text-xs font-medium text-slate-500">
                            {submissionData.textContent.split(' ').filter(word => word.length > 0).length} từ
                          </span>
                        </div>
                      </div>
                      {(assignment.minWords || assignment.maxWords) && (
                        <div className="mt-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                          <p className="text-sm text-blue-700 font-medium">
                            💡 Yêu cầu độ dài:
                            {assignment.minWords && ` tối thiểu ${assignment.minWords} từ`}
                            {assignment.maxWords && ` - tối đa ${assignment.maxWords} từ`}
                          </p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Enhanced AI Image Upload */}
                  {assignment.type === 'ai-image' && (
                    <div>
                      <div className="flex items-center justify-between mb-6">
                        <label className="flex items-center text-lg font-bold text-slate-800">
                          <span className="mr-2">🎨</span>
                          Hình ảnh AI
                          <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-700 text-sm rounded-full font-medium">
                            {submissionData.images.length}/{assignment.minImages || 3}
                          </span>
                        </label>
                        <input
                          type="file"
                          accept="image/*"
                          multiple
                          onChange={handleImageUpload}
                          className="hidden"
                          id="image-upload"
                          disabled={!canSubmit}
                        />
                        <label
                          htmlFor="image-upload"
                          className={`px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl text-sm font-bold cursor-pointer hover:from-blue-700 hover:to-blue-800 transition-all duration-200 flex items-center space-x-2 shadow-lg hover:shadow-xl ${!canSubmit ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                          </svg>
                          <span>Thêm hình ảnh</span>
                        </label>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {submissionData.images.map((image) => (
                          <div key={image.id} className="border-2 border-slate-300 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-200">
                            <div className="relative">
                              <img
                                src={image.url}
                                alt={image.filename}
                                className="w-full h-56 object-cover"
                              />
                              <button
                                onClick={() => removeImage(image.id)}
                                className="absolute top-3 right-3 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors shadow-lg"
                                disabled={!canSubmit}
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                              </button>
                            </div>
                            <div className="p-6 space-y-4 bg-white">
                              <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">
                                  🤖 AI Prompt
                                </label>
                                <textarea
                                  placeholder="Mô tả prompt bạn đã sử dụng để tạo ra hình ảnh này..."
                                  value={image.prompt}
                                  onChange={(e) => updateImagePrompt(image.id, e.target.value)}
                                  className="w-full h-24 px-4 py-3 border-2 border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                                  disabled={!canSubmit}
                                />
                              </div>
                              <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                                <p className="text-xs text-slate-500 flex items-center">
                                  <span className="mr-1">📁</span>
                                  {image.filename}
                                </p>
                                <div className="text-xs text-slate-400">
                                  AI Tool: {image.aiTool}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      {submissionData.images.length === 0 && (
                        <div className="border-2 border-dashed border-slate-300 rounded-2xl p-12 text-center">
                          <div className="text-6xl mb-4">🎨</div>
                          <p className="text-slate-500 text-lg font-medium mb-2">Chưa có hình ảnh nào</p>
                          <p className="text-slate-400 text-sm">Nhấp vào nút "Thêm hình ảnh" để upload ảnh AI của bạn</p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Enhanced AI Video Input */}
                  {assignment.type === 'ai-video' && (
                    <div>
                      <label className="flex items-center text-lg font-bold text-slate-800 mb-4">
                        <span className="mr-2">🎬</span>
                        Link Video AI
                        <span className="ml-2 text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <input
                          type="url"
                          value={submissionData.videoUrl}
                          onChange={(e) => setSubmissionData(prev => ({ ...prev, videoUrl: e.target.value }))}
                          className="w-full px-6 py-4 border-2 border-slate-300 rounded-2xl focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition-all duration-200 text-lg shadow-inner bg-slate-50 focus:bg-white"
                          placeholder="🔗 https://youtube.com/watch?v=... hoặc link video AI khác"
                          disabled={!canSubmit}
                        />
                        <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                          {submissionData.videoUrl && (
                            <span className="text-green-500">
                              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Enhanced Notes Section */}
                  <div>
                    <label className="flex items-center text-lg font-bold text-slate-800 mb-4">
                      <span className="mr-2">📝</span>
                      Ghi chú thêm
                      <span className="ml-2 text-slate-500 text-sm font-normal">(tùy chọn)</span>
                    </label>
                    <textarea
                      value={submissionData.notes}
                      onChange={(e) => setSubmissionData(prev => ({ ...prev, notes: e.target.value }))}
                      className="w-full h-32 px-6 py-4 border-2 border-slate-300 rounded-2xl resize-none focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition-all duration-200 text-slate-700 leading-relaxed shadow-inner bg-slate-50 focus:bg-white"
                      placeholder="💭 Chia sẻ về quá trình làm bài, khó khăn gặp phải, hoặc những điều bạn học được..."
                      disabled={!canSubmit}
                    />
                  </div>

                  {/* Enhanced Submit Section */}
                  <div className="flex items-center justify-between pt-6 border-t-2 border-slate-200">
                    <button
                      onClick={() => setShowPreview(!showPreview)}
                      className="px-6 py-3 text-blue-600 hover:text-blue-700 font-semibold flex items-center space-x-2 hover:bg-blue-50 rounded-xl transition-all duration-200"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      <span>{showPreview ? 'Ẩn xem trước' : 'Xem trước bài làm'}</span>
                    </button>

                    <button
                      onClick={handleSubmit}
                      disabled={!canSubmit || isSubmitting}
                      className={`px-10 py-4 rounded-2xl font-bold text-lg flex items-center space-x-3 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 ${canSubmit && !isSubmitting
                          ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-700 hover:to-emerald-700'
                          : 'bg-slate-300 text-slate-500 cursor-not-allowed'
                        }`}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                          <span>Đang nộp bài...</span>
                        </>
                      ) : (
                        <>
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                          </svg>
                          <span>Nộp bài làm</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* Progress Card */}
              <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4">
                  <h3 className="font-bold text-white flex items-center">
                    <span className="mr-2">📊</span>
                    Tiến độ hoàn thành
                  </h3>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                      <span className="text-sm font-medium text-slate-600 flex items-center">
                        <span className="mr-2">📝</span>
                        Nội dung
                      </span>
                      <span className={`font-bold px-3 py-1 rounded-full text-xs ${submissionData.textContent.trim() ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500'
                        }`}>
                        {submissionData.textContent.trim() ? '✓ Hoàn thành' : 'Chưa hoàn thành'}
                      </span>
                    </div>
                    {assignment.type === 'ai-image' && (
                      <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                        <span className="text-sm font-medium text-slate-600 flex items-center">
                          <span className="mr-2">🎨</span>
                          Hình ảnh
                        </span>
                        <span className={`font-bold px-3 py-1 rounded-full text-xs ${submissionData.images.length >= (assignment.minImages || 3) ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                          }`}>
                          {submissionData.images.length}/{assignment.minImages || 3}
                        </span>
                      </div>
                    )}
                    {assignment.type === 'ai-video' && (
                      <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                        <span className="text-sm font-medium text-slate-600 flex items-center">
                          <span className="mr-2">🎬</span>
                          Video
                        </span>
                        <span className={`font-bold px-3 py-1 rounded-full text-xs ${submissionData.videoUrl.trim() ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500'
                          }`}>
                          {submissionData.videoUrl.trim() ? '✓ Có link' : 'Chưa có'}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Existing Submission Info */}
              {existingSubmission && (
                <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
                  <div className="bg-gradient-to-r from-yellow-500 to-orange-500 px-6 py-4">
                    <h3 className="font-bold text-white flex items-center">
                      <span className="mr-2">📋</span>
                      Bài đã nộp trước đó
                    </h3>
                  </div>
                  <div className="p-6 space-y-4">
                    <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <span className="text-sm font-medium text-slate-600">Ngày nộp</span>
                      <span className="font-bold text-slate-800">
                        {new Date(existingSubmission.submissionDate).toLocaleDateString('vi-VN')}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-slate-600">Trạng thái</span>
                      {getStatusBadge(existingSubmission)}
                    </div>
                    {existingSubmission.feedback && (
                      <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-xl">
                        <p className="text-sm font-bold text-blue-800 mb-2 flex items-center">
                          <span className="mr-2">💬</span>
                          Nhận xét của giáo viên
                        </p>
                        <p className="text-sm text-blue-700 leading-relaxed">{existingSubmission.feedback}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Enhanced Rubric Tab */}
        {activeTab === 'rubric' && (
          <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-4">
              <h2 className="text-xl font-bold text-white flex items-center">
                <span className="mr-3">📊</span>
                Tiêu chí chấm điểm
              </h2>
            </div>
            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {Object.entries(assignment.rubric || {}).map(([criterion, points]) => (
                  <div key={criterion} className="bg-gradient-to-br from-slate-50 to-white border-2 border-slate-200 rounded-2xl p-6 text-center hover:shadow-lg transition-all duration-200">
                    <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3">
                      {points}%
                    </div>
                    <div className="text-sm font-bold text-slate-800 mb-2">
                      {criterion === 'creativity' ? '🎨 Sáng tạo' :
                        criterion === 'accuracy' ? '🎯 Chính xác' :
                          criterion === 'technique' ? '⚡ Kỹ thuật' :
                            criterion === 'relevance' ? '🔗 Phù hợp' :
                              criterion === 'content' ? '📝 Nội dung' :
                                criterion === 'structure' ? '🏗️ Cấu trúc' :
                                  criterion === 'language' ? '🗣️ Ngôn ngữ' :
                                    criterion === 'research' ? '🔍 Nghiên cứu' :
                                      criterion === 'presentation' ? '🎭 Trình bày' :
                                        criterion === 'technical' ? '🔧 Kỹ thuật' : criterion}
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
                        style={{ width: `${points}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-500 rounded-r-2xl">
                <h4 className="font-bold text-blue-900 mb-3 text-lg flex items-center">
                  <span className="mr-2">💡</span>
                  Lưu ý quan trọng
                </h4>
                <p className="text-blue-800 leading-relaxed">
                  Bài làm sẽ được chấm điểm dựa trên các tiêu chí trên. Mỗi tiêu chí có tỷ trọng khác nhau.
                  Hãy chú ý đến từng khía cạnh để đạt được điểm số cao nhất có thể.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Enhanced Resources Tab */}
        {activeTab === 'resources' && (
          <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
            <div className="bg-gradient-to-r from-green-600 to-teal-600 px-6 py-4">
              <h2 className="text-xl font-bold text-white flex items-center">
                <span className="mr-3">🔧</span>
                Công cụ AI được phép sử dụng
              </h2>
            </div>
            <div className="p-8">
              {assignment.allowedAITools && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {assignment.allowedAITools.map((tool) => (
                    <div key={tool} className="border-2 border-slate-200 rounded-2xl p-6 hover:border-blue-300 hover:shadow-lg transition-all duration-200 bg-gradient-to-br from-white to-slate-50">
                      <div className="text-center">
                        <div className="text-5xl mb-4">
                          {tool === 'Midjourney' ? '🎨' :
                            tool === 'DALL-E 3' ? '🤖' :
                              tool === 'Stable Diffusion' ? '🎭' :
                                tool === 'Leonardo AI' ? '🦁' :
                                  tool === 'Runway ML' ? '🎬' :
                                    tool === 'Synthesia' ? '🎪' :
                                      tool === 'ElevenLabs' ? '🔊' : '⚡'}
                        </div>
                        <h4 className="font-bold text-slate-800 mb-2 text-lg">{tool}</h4>
                        <p className="text-sm text-slate-600 leading-relaxed">
                          {tool === 'Midjourney' ? 'AI tạo hình ảnh chất lượng cao với phong cách nghệ thuật' :
                            tool === 'DALL-E 3' ? 'AI tạo hình ảnh từ OpenAI với độ chính xác cao' :
                              tool === 'Stable Diffusion' ? 'AI tạo hình ảnh mã nguồn mở linh hoạt' :
                                tool === 'Leonardo AI' ? 'AI tạo hình ảnh và nghệ thuật chuyên nghiệp' :
                                  tool === 'Runway ML' ? 'AI tạo và chỉnh sửa video thông minh' :
                                    tool === 'Synthesia' ? 'AI tạo video với avatar ảo' :
                                      tool === 'ElevenLabs' ? 'AI tạo giọng nói tự nhiên' : 'Công cụ AI hỗ trợ'}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {assignment.aiPromptGuidelines && (
                <div className="mt-8 p-6 bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-300 rounded-2xl">
                  <h4 className="font-bold text-yellow-900 mb-4 text-lg flex items-center">
                    <span className="mr-2">📝</span>
                    Hướng dẫn viết Prompt AI
                  </h4>
                  <p className="text-yellow-800 leading-relaxed text-base">
                    {assignment.aiPromptGuidelines}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Enhanced Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl w-full max-w-5xl mx-4 max-h-[90vh] overflow-hidden shadow-2xl">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4 flex items-center justify-between">
              <h3 className="text-xl font-bold text-white flex items-center">
                <span className="mr-2">👁️</span>
                Xem trước bài làm
              </h3>
              <button
                onClick={() => setShowPreview(false)}
                className="text-white hover:bg-white hover:bg-opacity-20 rounded-full p-2 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
              <div className="space-y-6">
                {submissionData.textContent && (
                  <div>
                    <h4 className="font-bold text-slate-800 mb-3 flex items-center text-lg">
                      <span className="mr-2">📝</span>
                      Nội dung bài làm
                    </h4>
                    <div className="bg-slate-50 border-2 border-slate-200 rounded-xl p-6 text-slate-700 leading-relaxed">
                      {submissionData.textContent}
                    </div>
                  </div>
                )}

                {submissionData.images.length > 0 && (
                  <div>
                    <h4 className="font-bold text-slate-800 mb-3 flex items-center text-lg">
                      <span className="mr-2">🎨</span>
                      Hình ảnh AI ({submissionData.images.length})
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {submissionData.images.map((image) => (
                        <div key={image.id} className="border-2 border-slate-200 rounded-xl overflow-hidden shadow-lg">
                          <img src={image.url} alt={image.filename} className="w-full h-48 object-cover" />
                          <div className="p-4 bg-white">
                            {image.prompt && (
                              <p className="text-sm text-slate-600 mb-2">
                                <strong>Prompt:</strong> {image.prompt}
                              </p>
                            )}
                            <p className="text-xs text-slate-400">{image.filename}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {submissionData.videoUrl && (
                  <div>
                    <h4 className="font-bold text-slate-800 mb-3 flex items-center text-lg">
                      <span className="mr-2">🎬</span>
                      Video AI
                    </h4>
                    <div className="bg-slate-50 border-2 border-slate-200 rounded-xl p-6">
                      <a
                        href={submissionData.videoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline font-medium break-all"
                      >
                        {submissionData.videoUrl}
                      </a>
                    </div>
                  </div>
                )}

                {submissionData.notes && (
                  <div>
                    <h4 className="font-bold text-slate-800 mb-3 flex items-center text-lg">
                      <span className="mr-2">📝</span>
                      Ghi chú thêm
                    </h4>
                    <div className="bg-slate-50 border-2 border-slate-200 rounded-xl p-6 text-slate-700 leading-relaxed">
                      {submissionData.notes}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentAssignmentDetail;