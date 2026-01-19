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
  const student = lmsData.users.find(u => u.id === studentId);
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
  const canSubmit = !submission || (submission.status === 'draft' && !isOverdue);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (event) => {
        setSubmissionImages(prev => [...prev, {
          id: Date.now() + Math.random(),
          url: event.target.result,
          filename: file.name,
          prompt: ''
        }]);
      };
      reader.readAsDataURL(file);
    });
  };

  const updateImagePrompt = (imageId, prompt) => {
    setSubmissionImages(prev => prev.map(img =>
      img.id === imageId ? { ...img, prompt } : img
    ));
  };

  const removeImage = (imageId) => {
    setSubmissionImages(prev => prev.filter(img => img.id !== imageId));
  };

  const handleSubmit = async () => {
    if (!submissionContent.trim() && submissionImages.length === 0 && !submissionVideo.trim()) {
      alert('Vui lòng điền nội dung bài tập');
      return;
    }

    setIsSubmitting(true);

    // Simulate submission
    setTimeout(() => {
      setIsSubmitting(false);
      alert('Bài tập đã được nộp thành công!');
      navigate(`/lms/student/dashboard?studentId=${studentId}`);
    }, 2000);
  };

  const saveAsDraft = () => {
    alert('Đã lưu bản nháp');
  };

  if (!assignment || !student) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800">Không tìm thấy bài tập</h1>
          <p className="text-gray-600 mt-2">Bài tập không tồn tại hoặc bạn không có quyền truy cập</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-6">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate(`/lms/student/dashboard?studentId=${studentId}`)}
                className="text-gray-500 hover:text-gray-700"
              >
                ← Quay lại dashboard
              </button>
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center">
                <span className="text-white text-xl">
                  {assignment.type === 'ai-image' ? '🎨' :
                    assignment.type === 'ai-video' ? '🎬' : '📝'}
                </span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{assignment.title}</h1>
                <p className="text-gray-600">{course?.title}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-gray-500">Hạn nộp</p>
                <p className={`text-lg font-medium ${isOverdue ? 'text-red-600' : 'text-gray-900'}`}>
                  {new Date(assignment.dueDate).toLocaleDateString('vi-VN', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>
              {submission && (
                <div className="text-right">
                  <p className="text-sm text-gray-500">Trạng thái</p>
                  <p className={`text-lg font-medium ${submission.status === 'submitted' && submission.grade
                    ? 'text-green-600'
                    : submission.status === 'submitted'
                      ? 'text-yellow-600'
                      : 'text-blue-600'
                    }`}>
                    {submission.status === 'submitted' && submission.grade
                      ? `Đã chấm: ${submission.grade}/100`
                      : submission.status === 'submitted'
                        ? 'Chờ chấm điểm'
                        : 'Bản nháp'
                    }
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Assignment Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Assignment Info */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">📋 Mô tả bài tập</h2>
              <p className="text-gray-700 mb-4">{assignment.description}</p>

              <div className="space-y-3">
                <h3 className="font-semibold text-gray-900">📌 Yêu cầu:</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  {assignment.requirements?.map((req, index) => (
                    <li key={index}>{req}</li>
                  ))}
                </ul>

                {assignment.type === 'ai-image' && (
                  <div className="mt-4">
                    <h4 className="font-semibold text-gray-900 mb-2">🤖 Hướng dẫn AI Prompt:</h4>
                    <p className="text-gray-600 text-sm bg-purple-50 p-3 rounded-lg">
                      {assignment.aiPromptGuidelines}
                    </p>
                    <div className="mt-2">
                      <h5 className="font-medium text-gray-900">Công cụ được phép sử dụng:</h5>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {assignment.allowedAITools?.map(tool => (
                          <span key={tool} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Submission Form */}
            {canSubmit && (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-6">✏️ Nộp bài tập</h2>

                {assignment.type === 'text' && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nội dung bài làm *
                      </label>
                      <textarea
                        value={submissionContent}
                        onChange={(e) => setSubmissionContent(e.target.value)}
                        rows={10}
                        placeholder="Nhập nội dung bài làm của bạn..."
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                )}

                {assignment.type === 'ai-image' && (
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Giải thích và phân tích
                      </label>
                      <textarea
                        value={submissionContent}
                        onChange={(e) => setSubmissionContent(e.target.value)}
                        rows={4}
                        placeholder="Giải thích về ý tưởng, quá trình tạo và ý nghĩa của các hình ảnh..."
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <label className="block text-sm font-medium text-gray-700">
                          Hình ảnh AI ({submissionImages.length}/{assignment.maxImages || 10})
                        </label>
                        <input
                          type="file"
                          multiple
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                          id="image-upload"
                        />
                        <label
                          htmlFor="image-upload"
                          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 cursor-pointer transition-colors"
                        >
                          📷 Thêm hình ảnh
                        </label>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {submissionImages.map(image => (
                          <div key={image.id} className="border border-gray-200 rounded-lg p-3">
                            <img
                              src={image.url}
                              alt="Submission"
                              className="w-full h-40 object-cover rounded-lg mb-3"
                            />
                            <input
                              type="text"
                              value={image.prompt}
                              onChange={(e) => updateImagePrompt(image.id, e.target.value)}
                              placeholder="Prompt đã sử dụng để tạo hình ảnh này..."
                              className="w-full p-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            />
                            <button
                              onClick={() => removeImage(image.id)}
                              className="mt-2 text-red-600 hover:text-red-700 text-sm"
                            >
                              🗑️ Xóa
                            </button>
                          </div>
                        ))}
                      </div>

                      {submissionImages.length === 0 && (
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center text-gray-500">
                          Chưa có hình ảnh nào. Nhấp "Thêm hình ảnh" để tải lên.
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {assignment.type === 'ai-video' && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Link Video AI
                      </label>
                      <input
                        type="url"
                        value={submissionVideo}
                        onChange={(e) => setSubmissionVideo(e.target.value)}
                        placeholder="https://youtube.com/watch?v=... hoặc link video khác"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Mô tả quy trình tạo video
                      </label>
                      <textarea
                        value={submissionContent}
                        onChange={(e) => setSubmissionContent(e.target.value)}
                        rows={6}
                        placeholder="Mô tả chi tiết về cách bạn tạo ra video này, các công cụ AI đã sử dụng, prompt, và quá trình chỉnh sửa..."
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                )}

                <div className="flex space-x-4 pt-6 border-t">
                  <button
                    onClick={saveAsDraft}
                    className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    💾 Lưu nháp
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 transition-colors"
                  >
                    {isSubmitting ? '⏳ Đang nộp...' : '🚀 Nộp bài tập'}
                  </button>
                </div>
              </div>
            )}

            {/* Submitted Work */}
            {submission && submission.status === 'submitted' && (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-6">📤 Bài đã nộp</h2>

                {submission.content && (
                  <div className="mb-4">
                    <h3 className="font-medium text-gray-900 mb-2">Nội dung:</h3>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-gray-700 whitespace-pre-wrap">{submission.content}</p>
                    </div>
                  </div>
                )}

                {submission.images && submission.images.length > 0 && (
                  <div className="mb-4">
                    <h3 className="font-medium text-gray-900 mb-2">Hình ảnh ({submission.images.length}):</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {submission.images.map((image, index) => (
                        <div key={index} className="border border-gray-200 rounded-lg p-3">
                          <img
                            src={image.url}
                            alt={`Submission ${index + 1}`}
                            className="w-full h-40 object-cover rounded-lg mb-2"
                          />
                          {image.prompt && (
                            <p className="text-sm text-gray-600 italic">"{image.prompt}"</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {submission.videoUrl && (
                  <div className="mb-4">
                    <h3 className="font-medium text-gray-900 mb-2">Video:</h3>
                    <a
                      href={submission.videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-purple-600 hover:text-purple-700 underline"
                    >
                      🎬 Xem video đã nộp
                    </a>
                  </div>
                )}

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-blue-800 text-sm">
                    ✅ Bài tập đã được nộp lúc: {new Date(submission.submittedDate).toLocaleString('vi-VN')}
                  </p>
                </div>

                {submission.grade && (
                  <div className="mt-4 bg-green-50 border border-green-200 rounded-lg p-4">
                    <h3 className="font-medium text-green-900 mb-2">📊 Kết quả chấm điểm</h3>
                    <div className="flex items-center space-x-4">
                      <span className="text-2xl font-bold text-green-600">{submission.grade}/100</span>
                      <div className="flex-1">
                        <div className="w-full bg-green-200 rounded-full h-2">
                          <div
                            className="bg-green-600 h-2 rounded-full"
                            style={{ width: `${submission.grade}%` }}
                          />
                        </div>
                      </div>
                    </div>
                    {submission.feedback && (
                      <div className="mt-3">
                        <h4 className="font-medium text-green-900 mb-1">Nhận xét từ giáo viên:</h4>
                        <p className="text-green-800">{submission.feedback}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Assignment Info */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">ℹ️ Thông tin bài tập</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Loại bài tập:</span>
                  <span className="font-medium">
                    {assignment.type === 'ai-image' ? 'AI Hình ảnh' :
                      assignment.type === 'ai-video' ? 'AI Video' :
                        assignment.type === 'text' ? 'Văn bản' : assignment.type}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Điểm tối đa:</span>
                  <span className="font-medium">{assignment.maxScore}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Đã nộp:</span>
                  <span className="font-medium">{assignment.submissions?.length || 0}/{assignment.totalStudents}</span>
                </div>
                {assignment.type === 'ai-image' && (
                  <>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Số ảnh yêu cầu:</span>
                      <span className="font-medium">{assignment.minImages}-{assignment.maxImages}</span>
                    </div>
                  </>
                )}
                <div className="pt-2 border-t">
                  <span className="text-gray-500">Tạo lúc:</span>
                  <p className="font-medium">{new Date(assignment.createdDate).toLocaleString('vi-VN')}</p>
                </div>
              </div>
            </div>

            {/* Rubric */}
            {assignment.rubric && (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">📊 Tiêu chí chấm điểm</h3>
                <div className="space-y-2">
                  {Object.entries(assignment.rubric).map(([criteria, points]) => (
                    <div key={criteria} className="flex justify-between items-center">
                      <span className="text-gray-700 capitalize">{criteria}</span>
                      <span className="font-medium text-gray-900">{points} điểm</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">⚡ Thao tác nhanh</h3>
              <div className="space-y-2">
                <button
                  onClick={() => navigate(`/lms/student/courses/${course?.id}?studentId=${studentId}`)}
                  className="w-full px-3 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors text-sm"
                >
                  📚 Xem khóa học
                </button>
                <button
                  onClick={() => window.print()}
                  className="w-full px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm"
                >
                  🖨️ In bài tập
                </button>
                <button
                  onClick={() => navigator.share?.({ title: assignment.title, url: window.location.href })}
                  className="w-full px-3 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors text-sm"
                >
                  📤 Chia sẻ
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentAssignmentView;