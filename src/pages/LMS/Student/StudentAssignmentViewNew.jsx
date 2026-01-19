import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { lmsData } from '../../../data/lmsData';

const StudentAssignmentView = () => {
  const { assignmentId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const studentId = parseInt(searchParams.get('studentId')) || 10;

  const assignment = lmsData.assignments.find(a => a.id === parseInt(assignmentId));
  const course = lmsData.courses.find(c => c.id === assignment?.courseId);

  const existingSubmission = lmsData.submissions.find(s =>
    s.assignmentId === parseInt(assignmentId) && s.studentId === studentId
  );

  // Enhanced form state
  const [activeTab, setActiveTab] = useState('instructions');
  const [submissionData, setSubmissionData] = useState({
    textContent: '',
    images: [],
    videoUrl: '',
    notes: '',
    selectedAiTool: assignment?.allowedAITools?.[0] || '',
    prompts: []
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    if (existingSubmission) {
      setSubmissionData({
        textContent: existingSubmission.content?.text || existingSubmission.content || '',
        images: existingSubmission.content?.images || [],
        videoUrl: existingSubmission.content?.videoUrl || '',
        notes: existingSubmission.content?.notes || '',
        selectedAiTool: existingSubmission.content?.aiTool || assignment?.allowedAITools?.[0] || '',
        prompts: existingSubmission.content?.prompts || []
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
            name: file.name,
            prompt: ''
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

  const handleSubmit = () => {
    if (!submissionData.textContent.trim() && submissionData.images.length === 0 && !submissionData.videoUrl.trim()) {
      alert('Vui lòng nhập nội dung bài làm');
      return;
    }

    setIsSubmitting(true);

    // Mock submission
    setTimeout(() => {
      alert('Đã nộp bài thành công!');
      setIsSubmitting(false);
      navigate(`/lms/student/dashboard?studentId=${studentId}`);
    }, 1500);
  };

  const getAssignmentTypeIcon = (type) => {
    switch (type) {
      case 'ai-image': return '🎨';
      case 'ai-video': return '🎬';
      case 'text': return '📝';
      default: return '📋';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'submitted': return 'text-green-600 bg-green-100';
      case 'graded': return 'text-blue-600 bg-blue-100';
      case 'draft': return 'text-orange-600 bg-orange-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  if (!assignment || !course) {
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
      {/* Header */}
      <div className="bg-white shadow-lg border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 py-6">
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
                <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                  {getAssignmentTypeIcon(assignment.type)}
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-slate-800">{assignment.title}</h1>
                  <p className="text-slate-600 flex items-center space-x-2">
                    <span>{course.title}</span>
                    <span className="text-slate-400">•</span>
                    <span className="text-sm font-medium px-2 py-1 bg-slate-100 rounded-full">
                      {assignment.type === 'ai-image' ? 'AI Hình ảnh' :
                        assignment.type === 'ai-video' ? 'AI Video' :
                          'Văn bản'}
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
                {isOverdue && <p className="text-xs text-red-500">Đã quá hạn</p>}
              </div>
              {existingSubmission && (
                <div className="text-right">
                  <p className="text-sm text-slate-500 mb-1">Trạng thái</p>
                  <p className={`text-sm font-bold px-3 py-1 rounded-full ${getStatusColor(existingSubmission.status)}`}>
                    {existingSubmission.status === 'submitted' && existingSubmission.grade
                      ? `Đã chấm: ${existingSubmission.grade}/100`
                      : existingSubmission.status === 'submitted'
                        ? 'Đã nộp'
                        : existingSubmission.status === 'graded'
                          ? `Điểm: ${existingSubmission.grade}/100`
                          : 'Bản nháp'}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="mt-6 border-b border-slate-200">
            <nav className="flex space-x-8">
              {[
                { id: 'instructions', label: 'Hướng dẫn', icon: '📋' },
                { id: 'submission', label: 'Nộp bài', icon: '📝' },
                { id: 'rubric', label: 'Tiêu chí', icon: '⭐' },
                { id: 'resources', label: 'Tài liệu', icon: '📚' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-3 px-1 border-b-2 font-medium text-sm transition-all duration-200 ${activeTab === tab.id
                      ? 'border-purple-500 text-purple-600'
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

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Instructions Tab */}
            {activeTab === 'instructions' && (
              <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
                <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-4">
                  <h2 className="text-xl font-bold text-white flex items-center">
                    <span className="mr-2">📋</span>
                    Hướng dẫn bài tập
                  </h2>
                </div>
                <div className="p-8">
                  <div className="prose prose-slate max-w-none">
                    <p className="text-slate-700 leading-relaxed text-lg mb-6">
                      {assignment.description}
                    </p>

                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-500 rounded-r-xl p-6 mb-6">
                      <h4 className="font-bold text-blue-900 mb-3">💡 Hướng dẫn chi tiết:</h4>
                      <p className="text-blue-800 leading-relaxed">
                        {assignment.instructions}
                      </p>
                    </div>

                    {assignment.requirements && (
                      <div>
                        <h4 className="font-bold text-slate-800 mb-4">✅ Yêu cầu:</h4>
                        <ul className="space-y-2">
                          {assignment.requirements.map((req, index) => (
                            <li key={index} className="flex items-start space-x-3">
                              <span className="flex-shrink-0 w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm font-semibold mt-0.5">
                                {index + 1}
                              </span>
                              <span className="text-slate-700">{req}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Submission Tab */}
            {activeTab === 'submission' && (
              <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
                <div className="bg-gradient-to-r from-green-600 to-emerald-600 px-6 py-4">
                  <h2 className="text-xl font-bold text-white flex items-center">
                    <span className="mr-2">📝</span>
                    Nộp bài làm
                  </h2>
                </div>
                <div className="p-8">
                  {canSubmit ? (
                    <div className="space-y-6">
                      {/* AI Tool Selection */}
                      {assignment.allowedAITools && assignment.allowedAITools.length > 0 && (
                        <div>
                          <label className="flex items-center text-lg font-bold text-slate-800 mb-3">
                            <span className="mr-2">🤖</span>
                            Công cụ AI
                          </label>
                          <select
                            value={submissionData.selectedAiTool}
                            onChange={(e) => setSubmissionData(prev => ({ ...prev, selectedAiTool: e.target.value }))}
                            className="w-full px-4 py-3 border-2 border-slate-300 rounded-xl focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition-all duration-200 text-lg"
                          >
                            {assignment.allowedAITools.map(tool => (
                              <option key={tool} value={tool}>{tool}</option>
                            ))}
                          </select>
                        </div>
                      )}

                      {/* Text Content */}
                      {(assignment.type === 'text' || assignment.type === 'ai-image' || assignment.type === 'ai-video') && (
                        <div>
                          <label className="flex items-center text-lg font-bold text-slate-800 mb-3">
                            <span className="mr-2">✏️</span>
                            Nội dung bài làm
                          </label>
                          <textarea
                            value={submissionData.textContent}
                            onChange={(e) => setSubmissionData(prev => ({ ...prev, textContent: e.target.value }))}
                            className="w-full h-40 px-4 py-3 border-2 border-slate-300 rounded-xl resize-none focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition-all duration-200 text-base leading-relaxed"
                            placeholder="Nhập nội dung bài làm của bạn..."
                          />
                        </div>
                      )}

                      {/* Image Upload for AI Image assignments */}
                      {assignment.type === 'ai-image' && (
                        <div>
                          <label className="flex items-center text-lg font-bold text-slate-800 mb-3">
                            <span className="mr-2">🖼️</span>
                            Hình ảnh AI ({submissionData.images.length}/{assignment.maxImages || 10})
                          </label>
                          <div className="border-2 border-dashed border-slate-300 rounded-xl p-6 text-center hover:border-blue-400 transition-colors">
                            <input
                              type="file"
                              multiple
                              accept="image/*"
                              onChange={handleImageUpload}
                              className="hidden"
                              id="imageUpload"
                            />
                            <label htmlFor="imageUpload" className="cursor-pointer">
                              <div className="text-slate-600">
                                <div className="text-4xl mb-2">📷</div>
                                <p className="text-lg font-medium">Tải lên hình ảnh</p>
                                <p className="text-sm text-slate-500">PNG, JPG, GIF tối đa 10MB</p>
                              </div>
                            </label>
                          </div>

                          {/* Image Preview */}
                          {submissionData.images.length > 0 && (
                            <div className="grid grid-cols-2 gap-4 mt-4">
                              {submissionData.images.map(image => (
                                <div key={image.id} className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                                  <img src={image.url} alt={image.name} className="w-full h-32 object-cover rounded-lg mb-3" />
                                  <input
                                    type="text"
                                    placeholder="Nhập prompt đã sử dụng..."
                                    value={image.prompt}
                                    onChange={(e) => updateImagePrompt(image.id, e.target.value)}
                                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-500 mb-2"
                                  />
                                  <button
                                    onClick={() => removeImage(image.id)}
                                    className="text-red-600 hover:text-red-800 text-sm font-medium"
                                  >
                                    🗑️ Xóa
                                  </button>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      )}

                      {/* Video URL for AI Video assignments */}
                      {assignment.type === 'ai-video' && (
                        <div>
                          <label className="flex items-center text-lg font-bold text-slate-800 mb-3">
                            <span className="mr-2">🎬</span>
                            Link video AI
                          </label>
                          <input
                            type="url"
                            value={submissionData.videoUrl}
                            onChange={(e) => setSubmissionData(prev => ({ ...prev, videoUrl: e.target.value }))}
                            className="w-full px-4 py-3 border-2 border-slate-300 rounded-xl focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition-all duration-200 text-lg"
                            placeholder="https://youtube.com/watch?v=..."
                          />
                        </div>
                      )}

                      {/* Notes */}
                      <div>
                        <label className="flex items-center text-lg font-bold text-slate-800 mb-3">
                          <span className="mr-2">💭</span>
                          Ghi chú thêm (tùy chọn)
                        </label>
                        <textarea
                          value={submissionData.notes}
                          onChange={(e) => setSubmissionData(prev => ({ ...prev, notes: e.target.value }))}
                          className="w-full h-24 px-4 py-3 border-2 border-slate-300 rounded-xl resize-none focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition-all duration-200 text-base leading-relaxed"
                          placeholder="Thêm ghi chú về quá trình làm bài..."
                        />
                      </div>

                      {/* Submit Button */}
                      <div className="flex justify-end space-x-4 pt-6 border-t border-slate-200">
                        <button
                          onClick={() => setShowPreview(true)}
                          className="px-6 py-3 text-slate-600 hover:text-slate-800 font-semibold transition-colors"
                        >
                          Xem trước
                        </button>
                        <button
                          onClick={handleSubmit}
                          disabled={isSubmitting}
                          className={`px-8 py-3 rounded-xl font-semibold flex items-center space-x-2 transition-all duration-200 ${isSubmitting
                              ? 'bg-slate-400 text-white cursor-not-allowed'
                              : 'bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-700 hover:to-emerald-700'
                            }`}
                        >
                          {isSubmitting ? (
                            <>
                              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                              <span>Đang nộp...</span>
                            </>
                          ) : (
                            <>
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                              </svg>
                              <span>Nộp bài</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <div className="text-6xl mb-4">🔒</div>
                      <h3 className="text-xl font-bold text-slate-800 mb-2">
                        {isOverdue ? 'Bài tập đã quá hạn' : 'Bài tập đã nộp'}
                      </h3>
                      <p className="text-slate-600">
                        {isOverdue
                          ? 'Bạn không thể nộp bài sau thời hạn quy định'
                          : 'Bạn đã nộp bài tập này rồi'
                        }
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Rubric Tab */}
            {activeTab === 'rubric' && (
              <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
                <div className="bg-gradient-to-r from-yellow-500 to-orange-500 px-6 py-4">
                  <h2 className="text-xl font-bold text-white flex items-center">
                    <span className="mr-2">⭐</span>
                    Tiêu chí chấm điểm
                  </h2>
                </div>
                <div className="p-8">
                  <div className="space-y-6">
                    {assignment.rubric && Array.isArray(assignment.rubric) && assignment.rubric.length > 0 ? (
                      assignment.rubric.map((criteria, index) => (
                        <div key={index} className="border border-slate-200 rounded-xl p-6">
                          <h4 className="font-bold text-slate-800 mb-3 flex items-center">
                            <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold mr-3">
                              {index + 1}
                            </span>
                            {criteria.name}
                          </h4>
                          <p className="text-slate-600 mb-4">{criteria.description}</p>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-slate-500">Trọng số:</span>
                            <span className="font-semibold text-blue-600">{criteria.weight}%</span>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8 text-slate-500">
                        <div className="text-4xl mb-2">📋</div>
                        <p>Chưa có tiêu chí chấm điểm</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Resources Tab */}
            {activeTab === 'resources' && (
              <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
                <div className="bg-gradient-to-r from-teal-600 to-cyan-600 px-6 py-4">
                  <h2 className="text-xl font-bold text-white flex items-center">
                    <span className="mr-2">📚</span>
                    Tài liệu tham khảo
                  </h2>
                </div>
                <div className="p-8">
                  <div className="space-y-4">
                    {assignment.resources && Array.isArray(assignment.resources) && assignment.resources.length > 0 ? (
                      assignment.resources.map((resource, index) => (
                        <div key={index} className="flex items-center space-x-4 p-4 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors">
                          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white text-xl">
                            📄
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-slate-800">{resource.name}</h4>
                            <p className="text-sm text-slate-600">{resource.description}</p>
                          </div>
                          <a
                            href={resource.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium hover:bg-blue-200 transition-colors"
                          >
                            Xem
                          </a>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8 text-slate-500">
                        <div className="text-4xl mb-2">📚</div>
                        <p>Chưa có tài liệu tham khảo</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden sticky top-8">
              <div className="bg-gradient-to-r from-slate-700 to-slate-800 px-6 py-4">
                <h3 className="font-bold text-white">Thông tin bài tập</h3>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <span className="text-sm font-medium text-slate-600">Điểm tối đa</span>
                  <span className="text-lg font-bold text-blue-600">{assignment.maxScore}</span>
                </div>

                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <span className="text-sm font-medium text-slate-600">Trạng thái</span>
                  <span className={`text-sm font-bold px-3 py-1 rounded-full ${assignment.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                    }`}>
                    {assignment.status === 'active' ? 'Đang mở' : 'Nháp'}
                  </span>
                </div>

                {assignment.allowedAITools && (
                  <div className="p-3 bg-slate-50 rounded-lg">
                    <span className="text-sm font-medium text-slate-600 block mb-2">Công cụ AI:</span>
                    <div className="flex flex-wrap gap-2">
                      {assignment.allowedAITools.map((tool) => (
                        <span key={tool} className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {existingSubmission && existingSubmission.grade && (
                  <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl">
                    <div className="text-center">
                      <p className="text-sm font-medium text-green-600 mb-2">Điểm của bạn</p>
                      <p className="text-3xl font-bold text-green-700">{existingSubmission.grade}/100</p>
                      <div className="w-full bg-green-200 rounded-full h-2 mt-3">
                        <div
                          className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${existingSubmission.grade}%` }}
                        ></div>
                      </div>
                    </div>
                    {existingSubmission.feedback && (
                      <div className="mt-4 p-3 bg-white rounded-lg border border-green-200">
                        <p className="text-sm font-medium text-green-800 mb-1">Nhận xét:</p>
                        <p className="text-sm text-green-700">{existingSubmission.feedback}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl w-full max-w-4xl mx-4 max-h-[90vh] overflow-hidden shadow-2xl">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4">
              <h3 className="text-xl font-bold text-white flex items-center">
                <span className="mr-2">👁️</span>
                Xem trước bài làm
              </h3>
            </div>

            <div className="p-6 max-h-[calc(90vh-80px)] overflow-y-auto">
              <div className="space-y-6">
                {submissionData.textContent && (
                  <div>
                    <h4 className="font-semibold text-slate-800 mb-2">Nội dung:</h4>
                    <p className="text-slate-700 whitespace-pre-wrap bg-slate-50 p-4 rounded-lg">
                      {submissionData.textContent}
                    </p>
                  </div>
                )}

                {submissionData.images.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-slate-800 mb-2">Hình ảnh ({submissionData.images.length}):</h4>
                    <div className="grid grid-cols-2 gap-4">
                      {submissionData.images.map((image, index) => (
                        <div key={index} className="bg-slate-50 rounded-lg p-3">
                          <img src={image.url} alt={`Preview ${index + 1}`} className="w-full h-32 object-cover rounded" />
                          {image.prompt && (
                            <p className="text-xs text-slate-600 mt-2 italic">"{image.prompt}"</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {submissionData.videoUrl && (
                  <div>
                    <h4 className="font-semibold text-slate-800 mb-2">Video:</h4>
                    <p className="text-blue-600 hover:text-blue-800 break-all">{submissionData.videoUrl}</p>
                  </div>
                )}

                {submissionData.notes && (
                  <div>
                    <h4 className="font-semibold text-slate-800 mb-2">Ghi chú:</h4>
                    <p className="text-slate-700 bg-slate-50 p-4 rounded-lg">{submissionData.notes}</p>
                  </div>
                )}
              </div>

              <div className="flex justify-end space-x-4 pt-6 border-t border-slate-200 mt-6">
                <button
                  onClick={() => setShowPreview(false)}
                  className="px-6 py-3 text-slate-600 hover:text-slate-800 font-semibold transition-colors"
                >
                  Đóng
                </button>
                <button
                  onClick={() => {
                    setShowPreview(false);
                    handleSubmit();
                  }}
                  className="px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all duration-200 font-semibold"
                >
                  Nộp bài
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentAssignmentView;