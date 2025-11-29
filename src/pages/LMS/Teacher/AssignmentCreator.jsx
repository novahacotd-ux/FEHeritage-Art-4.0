import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { lmsData } from '../../../data/lmsData';

const AssignmentCreator = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const teacherId = parseInt(searchParams.get('teacherId')) || 1;
  const assignmentType = searchParams.get('type') || 'text';
  const courseId = parseInt(searchParams.get('courseId'));

  const teacher = lmsData.users.find(u => u.id === teacherId && u.role === 'teacher');
  const teacherCourses = lmsData.courses.filter(c => c.teacherId === teacherId);

  // Assignment creation states
  const [selectedCourse, setSelectedCourse] = useState(courseId || (teacherCourses[0]?.id || ''));
  const [assignmentTitle, setAssignmentTitle] = useState('');
  const [assignmentDescription, setAssignmentDescription] = useState('');
  const [instructions, setInstructions] = useState('');
  const [requirements, setRequirements] = useState(['']);
  const [dueDate, setDueDate] = useState('');
  const [maxScore, setMaxScore] = useState(100);

  // Type-specific states
  // For AI Image assignments
  const [aiPromptGuidelines, setAiPromptGuidelines] = useState('');
  const [allowedAITools, setAllowedAITools] = useState(['midjourney']);
  const [minImages, setMinImages] = useState(3);
  const [maxImages, setMaxImages] = useState(10);

  // For text assignments  
  const [minWords, setMinWords] = useState(500);
  const [maxWords, setMaxWords] = useState(2000);
  const [textAITools, setTextAITools] = useState(['grammarly']);

  // For video assignments
  const [minDuration, setMinDuration] = useState(120); // seconds
  const [maxDuration, setMaxDuration] = useState(300);
  const [videoAITools, setVideoAITools] = useState(['runway']);

  // Rubric states
  const [rubric, setRubric] = useState({
    creativity: 25,
    accuracy: 25,
    technique: 25,
    relevance: 25
  });

  const aiToolOptions = {
    image: [
      { id: 'midjourney', name: 'Midjourney', icon: '🎨' },
      { id: 'dalle3', name: 'DALL-E 3', icon: '🤖' },
      { id: 'stable-diffusion', name: 'Stable Diffusion', icon: '⚡' },
      { id: 'leonardo', name: 'Leonardo AI', icon: '🎭' },
      { id: 'firefly', name: 'Adobe Firefly', icon: '🔥' }
    ],
    text: [
      { id: 'grammarly', name: 'Grammarly', icon: '✏️' },
      { id: 'chatgpt', name: 'ChatGPT', icon: '💬' },
      { id: 'claude', name: 'Claude', icon: '🧠' },
      { id: 'jasper', name: 'Jasper AI', icon: '📝' }
    ],
    video: [
      { id: 'runway', name: 'Runway ML', icon: '🎬' },
      { id: 'synthesia', name: 'Synthesia', icon: '🎭' },
      { id: 'pictory', name: 'Pictory', icon: '📹' },
      { id: 'invideo', name: 'InVideo AI', icon: '🎥' }
    ]
  };

  const addRequirement = () => {
    setRequirements([...requirements, '']);
  };

  const updateRequirement = (index, value) => {
    const newRequirements = [...requirements];
    newRequirements[index] = value;
    setRequirements(newRequirements);
  };

  const removeRequirement = (index) => {
    if (requirements.length > 1) {
      setRequirements(requirements.filter((_, i) => i !== index));
    }
  };

  const updateRubric = (criterion, value) => {
    setRubric(prev => ({ ...prev, [criterion]: parseInt(value) }));
  };

  const getTotalRubricScore = () => {
    return Object.values(rubric).reduce((sum, value) => sum + value, 0);
  };

  const handleSubmit = () => {
    // Validate form
    if (!assignmentTitle.trim() || !selectedCourse || !dueDate) {
      alert('Vui lòng điền đầy đủ thông tin bắt buộc');
      return;
    }

    if (getTotalRubricScore() !== 100) {
      alert('Tổng điểm rubric phải bằng 100%');
      return;
    }

    const filteredRequirements = requirements.filter(req => req.trim() !== '');

    const newAssignment = {
      id: Math.max(...lmsData.assignments.map(a => a.id)) + 1,
      courseId: parseInt(selectedCourse),
      title: assignmentTitle,
      description: assignmentDescription,
      type: assignmentType,
      instructions: instructions,
      requirements: filteredRequirements,
      rubric: rubric,
      maxScore: maxScore,
      dueDate: dueDate,
      createdDate: new Date().toISOString(),
      status: 'active',
      submissions: [],
      totalStudents: lmsData.courses.find(c => c.id === parseInt(selectedCourse))?.students.length || 0
    };

    // Add type-specific fields
    if (assignmentType === 'ai-image') {
      newAssignment.aiPromptGuidelines = aiPromptGuidelines;
      newAssignment.allowedAITools = allowedAITools.map(id =>
        aiToolOptions.image.find(tool => tool.id === id)?.name
      ).filter(Boolean);
      newAssignment.minImages = minImages;
      newAssignment.maxImages = maxImages;
    } else if (assignmentType === 'text') {
      newAssignment.minWords = minWords;
      newAssignment.maxWords = maxWords;
      newAssignment.aiTools = textAITools.map(id =>
        aiToolOptions.text.find(tool => tool.id === id)?.name
      ).filter(Boolean);
    } else if (assignmentType === 'ai-video') {
      newAssignment.minDuration = minDuration;
      newAssignment.maxDuration = maxDuration;
      newAssignment.aiTools = videoAITools.map(id =>
        aiToolOptions.video.find(tool => tool.id === id)?.name
      ).filter(Boolean);
    }

    console.log('New Assignment Created:', newAssignment);
    alert('Bài tập đã được tạo thành công!');
    navigate(`/lms/teacher/dashboard?teacherId=${teacherId}`);
  };

  const getTypeIcon = () => {
    switch (assignmentType) {
      case 'ai-image': return '🎨';
      case 'text': return '📝';
      case 'ai-video': return '🎥';
      default: return '📋';
    }
  };

  const getTypeName = () => {
    switch (assignmentType) {
      case 'ai-image': return 'Bài tập AI Image Generation';
      case 'text': return 'Bài tập Viết';
      case 'ai-video': return 'Bài tập AI Video';
      default: return 'Bài tập';
    }
  };

  if (!teacher) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800">Không tìm thấy giáo viên</h1>
          <p className="text-gray-600 mt-2">Vui lòng kiểm tra lại thông tin đăng nhập</p>
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
                onClick={() => navigate(`/lms/teacher/dashboard?teacherId=${teacherId}`)}
                className="text-gray-500 hover:text-gray-700"
              >
                ← Quay lại
              </button>
              <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white text-xl">{getTypeIcon()}</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{getTypeName()}</h1>
                <p className="text-gray-600">Tạo bài tập mới cho học sinh</p>
              </div>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => alert('Lưu bản nháp')}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                💾 Lưu nháp
              </button>
              <button
                onClick={handleSubmit}
                className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                🚀 Tạo bài tập
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-6">📋 Thông tin cơ bản</h2>

              <div className="space-y-4">
                {/* Course Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Khóa học *</label>
                  <select
                    value={selectedCourse}
                    onChange={(e) => setSelectedCourse(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  >
                    <option value="">Chọn khóa học</option>
                    {teacherCourses.map(course => (
                      <option key={course.id} value={course.id}>
                        {course.title} ({course.students.length} học sinh)
                      </option>
                    ))}
                  </select>
                </div>

                {/* Title */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tiêu đề bài tập *</label>
                  <input
                    type="text"
                    value={assignmentTitle}
                    onChange={(e) => setAssignmentTitle(e.target.value)}
                    placeholder={
                      assignmentType === 'ai-image' ? 'VD: Tái tạo Tranh Dân gian Việt Nam bằng AI' :
                        assignmentType === 'text' ? 'VD: Viết Luận về Chế độ Phong kiến Việt Nam' :
                          assignmentType === 'ai-video' ? 'VD: Tạo Video Giới thiệu Lễ hội Truyền thống' :
                            'Nhập tiêu đề bài tập'
                    }
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Mô tả bài tập</label>
                  <textarea
                    value={assignmentDescription}
                    onChange={(e) => setAssignmentDescription(e.target.value)}
                    rows={3}
                    placeholder="Mô tả mục tiêu và ý nghĩa của bài tập..."
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>

                {/* Instructions */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Hướng dẫn chi tiết</label>
                  <textarea
                    value={instructions}
                    onChange={(e) => setInstructions(e.target.value)}
                    rows={4}
                    placeholder="Hướng dẫn cụ thể cách thực hiện bài tập..."
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>

                {/* Requirements */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Yêu cầu bài tập</label>
                  <div className="space-y-2">
                    {requirements.map((req, index) => (
                      <div key={index} className="flex space-x-2">
                        <input
                          type="text"
                          value={req}
                          onChange={(e) => updateRequirement(index, e.target.value)}
                          placeholder={`Yêu cầu ${index + 1}`}
                          className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        />
                        {requirements.length > 1 && (
                          <button
                            onClick={() => removeRequirement(index)}
                            className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg"
                          >
                            🗑️
                          </button>
                        )}
                      </div>
                    ))}
                    <button
                      onClick={addRequirement}
                      className="text-indigo-600 hover:text-indigo-700 text-sm font-medium"
                    >
                      + Thêm yêu cầu
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Type-specific Settings */}
            {assignmentType === 'ai-image' && (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-6">🎨 Cài đặt AI Image</h2>

                <div className="space-y-4">
                  {/* AI Prompt Guidelines */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Hướng dẫn viết AI Prompt</label>
                    <textarea
                      value={aiPromptGuidelines}
                      onChange={(e) => setAiPromptGuidelines(e.target.value)}
                      rows={3}
                      placeholder="VD: Prompt phải bao gồm style, subject, colors, mood, technical specs..."
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  </div>

                  {/* AI Tools */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Công cụ AI được phép</label>
                    <div className="grid grid-cols-2 gap-3">
                      {aiToolOptions.image.map(tool => (
                        <label key={tool.id} className="flex items-center space-x-2 p-3 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={allowedAITools.includes(tool.id)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setAllowedAITools(prev => [...prev, tool.id]);
                              } else {
                                setAllowedAITools(prev => prev.filter(t => t !== tool.id));
                              }
                            }}
                            className="text-indigo-600"
                          />
                          <span className="text-lg">{tool.icon}</span>
                          <span className="text-sm font-medium">{tool.name}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Image Count */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Số ảnh tối thiểu</label>
                      <input
                        type="number"
                        value={minImages}
                        onChange={(e) => setMinImages(parseInt(e.target.value))}
                        min="1"
                        max="20"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Số ảnh tối đa</label>
                      <input
                        type="number"
                        value={maxImages}
                        onChange={(e) => setMaxImages(parseInt(e.target.value))}
                        min="1"
                        max="50"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {assignmentType === 'text' && (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-6">📝 Cài đặt Bài Viết</h2>

                <div className="space-y-4">
                  {/* Word Count */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Số từ tối thiểu</label>
                      <input
                        type="number"
                        value={minWords}
                        onChange={(e) => setMinWords(parseInt(e.target.value))}
                        min="100"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Số từ tối đa</label>
                      <input
                        type="number"
                        value={maxWords}
                        onChange={(e) => setMaxWords(parseInt(e.target.value))}
                        min="100"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  {/* AI Tools for Writing */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Công cụ AI hỗ trợ viết</label>
                    <div className="grid grid-cols-2 gap-3">
                      {aiToolOptions.text.map(tool => (
                        <label key={tool.id} className="flex items-center space-x-2 p-3 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={textAITools.includes(tool.id)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setTextAITools(prev => [...prev, tool.id]);
                              } else {
                                setTextAITools(prev => prev.filter(t => t !== tool.id));
                              }
                            }}
                            className="text-indigo-600"
                          />
                          <span className="text-lg">{tool.icon}</span>
                          <span className="text-sm font-medium">{tool.name}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {assignmentType === 'ai-video' && (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-6">🎥 Cài đặt AI Video</h2>

                <div className="space-y-4">
                  {/* Duration */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Thời lượng tối thiểu (giây)</label>
                      <input
                        type="number"
                        value={minDuration}
                        onChange={(e) => setMinDuration(parseInt(e.target.value))}
                        min="30"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Thời lượng tối đa (giây)</label>
                      <input
                        type="number"
                        value={maxDuration}
                        onChange={(e) => setMaxDuration(parseInt(e.target.value))}
                        min="30"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  {/* AI Video Tools */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Công cụ AI Video</label>
                    <div className="grid grid-cols-2 gap-3">
                      {aiToolOptions.video.map(tool => (
                        <label key={tool.id} className="flex items-center space-x-2 p-3 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={videoAITools.includes(tool.id)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setVideoAITools(prev => [...prev, tool.id]);
                              } else {
                                setVideoAITools(prev => prev.filter(t => t !== tool.id));
                              }
                            }}
                            className="text-indigo-600"
                          />
                          <span className="text-lg">{tool.icon}</span>
                          <span className="text-sm font-medium">{tool.name}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Assignment Settings */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">⚙️ Cài đặt bài tập</h3>

              <div className="space-y-4">
                {/* Due Date */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Hạn nộp bài *</label>
                  <input
                    type="datetime-local"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>

                {/* Max Score */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Điểm tối đa</label>
                  <input
                    type="number"
                    value={maxScore}
                    onChange={(e) => setMaxScore(parseInt(e.target.value))}
                    min="1"
                    max="1000"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Rubric */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">📊 Tiêu chí chấm điểm</h3>

              <div className="space-y-4">
                {Object.entries(rubric).map(([criterion, weight]) => (
                  <div key={criterion} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <label className="text-sm font-medium text-gray-700">
                        {criterion === 'creativity' && '🎨 Tính sáng tạo'}
                        {criterion === 'accuracy' && '🎯 Độ chính xác'}
                        {criterion === 'technique' && '⚙️ Kỹ thuật'}
                        {criterion === 'relevance' && '📌 Liên quan chủ đề'}
                      </label>
                      <span className="text-indigo-600 font-semibold">{weight}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="50"
                      value={weight}
                      onChange={(e) => updateRubric(criterion, e.target.value)}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
                ))}

                <div className={`mt-4 p-3 rounded-lg ${getTotalRubricScore() === 100 ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
                  <p className="text-sm font-medium">
                    Tổng: {getTotalRubricScore()}%
                    {getTotalRubricScore() !== 100 && ' ⚠️ Phải bằng 100%'}
                  </p>
                </div>
              </div>
            </div>

            {/* Preview */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">👁️ Xem trước</h3>
              <div className="text-sm text-gray-600 space-y-2">
                <p><strong>Loại:</strong> {getTypeName()}</p>
                <p><strong>Khóa học:</strong> {teacherCourses.find(c => c.id === parseInt(selectedCourse))?.title || 'Chưa chọn'}</p>
                <p><strong>Học sinh:</strong> {teacherCourses.find(c => c.id === parseInt(selectedCourse))?.students.length || 0}</p>
                <p><strong>Hạn nộp:</strong> {dueDate ? new Date(dueDate).toLocaleString('vi-VN') : 'Chưa đặt'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignmentCreator;