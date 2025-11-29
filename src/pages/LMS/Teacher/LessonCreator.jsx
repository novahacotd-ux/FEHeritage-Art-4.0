import React, { useState } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { lmsData } from '../../../data/lmsData';

const LessonCreator = () => {
  const { courseId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const teacherId = parseInt(searchParams.get('teacherId')) || 1;

  const course = lmsData.courses.find(c => c.id === parseInt(courseId));

  // Lesson creation states
  const [lessonTitle, setLessonTitle] = useState('');
  const [lessonDescription, setLessonDescription] = useState('');
  const [duration, setDuration] = useState(45);
  const [videoUrl, setVideoUrl] = useState('');
  const [videoFile, setVideoFile] = useState(null);
  const [status, setStatus] = useState('draft');

  // Content sections
  const [contentSections, setContentSections] = useState([
    { id: 1, type: 'text', title: '', content: '' }
  ]);

  // Materials
  const [materials, setMaterials] = useState([]);

  // Learning objectives for this lesson
  const [learningObjectives, setLearningObjectives] = useState(['']);

  // AI Features
  const [useAIGeneration, setUseAIGeneration] = useState(false);
  const [aiPrompt, setAiPrompt] = useState('');

  const contentTypes = [
    { id: 'text', name: 'Văn bản', icon: '📝' },
    { id: 'video', name: 'Video', icon: '🎥' },
    { id: 'image', name: 'Hình ảnh', icon: '🖼️' },
    { id: 'audio', name: 'Audio', icon: '🎵' },
    { id: 'quiz', name: 'Câu hỏi', icon: '❓' },
    { id: 'ai-content', name: 'Nội dung AI', icon: '🤖' }
  ];

  const addContentSection = (type) => {
    const newSection = {
      id: Date.now(),
      type: type,
      title: '',
      content: '',
      order: contentSections.length + 1
    };
    setContentSections([...contentSections, newSection]);
  };

  const updateContentSection = (id, field, value) => {
    setContentSections(prev => prev.map(section =>
      section.id === id ? { ...section, [field]: value } : section
    ));
  };

  const removeContentSection = (id) => {
    if (contentSections.length > 1) {
      setContentSections(prev => prev.filter(section => section.id !== id));
    }
  };

  const addMaterial = () => {
    setMaterials([...materials, { id: Date.now(), type: 'pdf', title: '', url: '', description: '' }]);
  };

  const updateMaterial = (id, field, value) => {
    setMaterials(prev => prev.map(material =>
      material.id === id ? { ...material, [field]: value } : material
    ));
  };

  const removeMaterial = (id) => {
    setMaterials(prev => prev.filter(material => material.id !== id));
  };

  const addObjective = () => {
    setLearningObjectives([...learningObjectives, '']);
  };

  const updateObjective = (index, value) => {
    const newObjectives = [...learningObjectives];
    newObjectives[index] = value;
    setLearningObjectives(newObjectives);
  };

  const removeObjective = (index) => {
    if (learningObjectives.length > 1) {
      setLearningObjectives(learningObjectives.filter((_, i) => i !== index));
    }
  };

  const generateAIContent = async () => {
    if (!aiPrompt.trim()) {
      alert('Vui lòng nhập prompt cho AI');
      return;
    }

    // Simulate AI content generation
    const aiContent = `
# ${lessonTitle || 'Bài giảng mới'}

## Mục tiêu bài học
- Hiểu được khái niệm cơ bản về chủ đề được học
- Áp dụng kiến thức vào thực tế
- Phát triển tư duy phản biện

## Nội dung chính

### 1. Giới thiệu
${aiPrompt} là một chủ đề quan trọng trong chương trình học...

### 2. Kiến thức cơ bản
- Định nghĩa và khái niệm
- Đặc điểm và tính chất
- Ứng dụng thực tế

### 3. Ví dụ minh họa
Các ví dụ cụ thể giúp học sinh hiểu rõ hơn về chủ đề...

### 4. Bài tập thực hành
1. Câu hỏi trắc nghiệm
2. Bài tập tự luận
3. Dự án nhóm

## Tổng kết
Tóm tắt những kiến thức chính đã học...
    `;

    const newSection = {
      id: Date.now(),
      type: 'ai-content',
      title: 'Nội dung được tạo bởi AI',
      content: aiContent,
      order: contentSections.length + 1
    };

    setContentSections([...contentSections, newSection]);
    alert('Đã tạo nội dung bằng AI thành công!');
  };

  const handleSubmit = () => {
    // Validate form
    if (!lessonTitle.trim() || !lessonDescription.trim()) {
      alert('Vui lòng điền đầy đủ thông tin bắt buộc');
      return;
    }

    const filteredObjectives = learningObjectives.filter(obj => obj.trim() !== '');
    const filteredSections = contentSections.filter(section =>
      section.title.trim() !== '' || section.content.trim() !== ''
    );

    const newLesson = {
      id: Math.max(...(lmsData.lessons || []).map(l => l.id), 0) + 1,
      courseId: parseInt(courseId),
      title: lessonTitle,
      description: lessonDescription,
      orderIndex: (lmsData.lessons?.filter(l => l.courseId === parseInt(courseId)).length || 0) + 1,
      duration: duration,
      videoUrl: videoUrl,
      videoFile: videoFile?.name || null,
      status: status,
      contentSections: filteredSections,
      materials: materials.filter(m => m.title.trim() !== ''),
      learningObjectives: filteredObjectives,
      createdDate: new Date().toISOString(),
      updatedDate: new Date().toISOString(),
      views: 0,
      completions: 0
    };

    console.log('New Lesson Created:', newLesson);
    alert('Bài giảng đã được tạo thành công!');
    navigate(`/lms/teacher/courses/${courseId}?teacherId=${teacherId}`);
  };

  if (!course || course.teacherId !== teacherId) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800">Không tìm thấy khóa học</h1>
          <p className="text-gray-600 mt-2">Bạn không có quyền tạo bài giảng cho khóa học này</p>
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
                onClick={() => navigate(`/lms/teacher/courses/${courseId}?teacherId=${teacherId}`)}
                className="text-gray-500 hover:text-gray-700"
              >
                ← Quay lại khóa học
              </button>
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
                <span className="text-white text-xl">📖</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Tạo Bài giảng Mới</h1>
                <p className="text-gray-600">Khóa học: {course.title}</p>
              </div>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => setStatus('draft')}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                💾 Lưu nháp
              </button>
              <button
                onClick={handleSubmit}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                🚀 Tạo bài giảng
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-6">📋 Thông tin cơ bản</h2>

              <div className="space-y-4">
                {/* Lesson Title */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tiêu đề bài giảng *</label>
                  <input
                    type="text"
                    value={lessonTitle}
                    onChange={(e) => setLessonTitle(e.target.value)}
                    placeholder="VD: Khái quát về Chế độ Phong kiến Việt Nam"
                    className="lms-input"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Mô tả bài giảng *</label>
                  <textarea
                    value={lessonDescription}
                    onChange={(e) => setLessonDescription(e.target.value)}
                    rows={3}
                    placeholder="Tìm hiểu về đặc điểm chung của chế độ phong kiến và quá trình hình thành tại Việt Nam..."
                    className="lms-input"
                  />
                </div>

                {/* Duration and Status */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Thời lượng (phút)</label>
                    <input
                      type="number"
                      value={duration}
                      onChange={(e) => setDuration(parseInt(e.target.value))}
                      min="5"
                      max="300"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Trạng thái</label>
                    <select
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    >
                      <option value="draft">Nháp</option>
                      <option value="published">Xuất bản</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Video Section */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-6">🎥 Video bài giảng</h2>

              <div className="space-y-4">
                {/* Video URL */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">URL Video (YouTube, Vimeo, v.v.)</label>
                  <input
                    type="url"
                    value={videoUrl}
                    onChange={(e) => setVideoUrl(e.target.value)}
                    placeholder="https://www.youtube.com/watch?v=..."
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                {/* File Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Hoặc tải lên video</label>
                  <input
                    type="file"
                    accept="video/*"
                    onChange={(e) => setVideoFile(e.target.files[0])}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                  <p className="text-xs text-gray-500 mt-1">Chấp nhận: MP4, AVI, MOV (tối đa 500MB)</p>
                </div>
              </div>
            </div>

            {/* AI Content Generation */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-6">🤖 Tạo nội dung bằng AI</h2>

              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="useAI"
                    checked={useAIGeneration}
                    onChange={(e) => setUseAIGeneration(e.target.checked)}
                    className="text-green-600"
                  />
                  <label htmlFor="useAI" className="text-sm font-medium text-gray-700">
                    Sử dụng AI để tạo nội dung bài giảng
                  </label>
                </div>

                {useAIGeneration && (
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Prompt cho AI</label>
                      <textarea
                        value={aiPrompt}
                        onChange={(e) => setAiPrompt(e.target.value)}
                        rows={3}
                        placeholder="VD: Tạo nội dung bài giảng về lịch sử Việt Nam thời kỳ phong kiến, bao gồm đặc điểm chính, các triều đại quan trọng, và ảnh hưởng đến xã hội..."
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                    </div>
                    <button
                      onClick={generateAIContent}
                      className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                    >
                      ✨ Tạo nội dung bằng AI
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Content Sections */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-gray-900">📄 Nội dung bài giảng</h2>
                <div className="flex space-x-2">
                  {contentTypes.map(type => (
                    <button
                      key={type.id}
                      onClick={() => addContentSection(type.id)}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm"
                      title={`Thêm ${type.name}`}
                    >
                      {type.icon}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                {contentSections.map((section, index) => (
                  <div key={section.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <span className="text-lg">
                          {contentTypes.find(t => t.id === section.type)?.icon || '📝'}
                        </span>
                        <span className="text-sm font-medium text-gray-600">
                          Phần {index + 1}: {contentTypes.find(t => t.id === section.type)?.name}
                        </span>
                      </div>
                      {contentSections.length > 1 && (
                        <button
                          onClick={() => removeContentSection(section.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          🗑️
                        </button>
                      )}
                    </div>

                    <div className="space-y-3">
                      <input
                        type="text"
                        value={section.title}
                        onChange={(e) => updateContentSection(section.id, 'title', e.target.value)}
                        placeholder="Tiêu đề phần này"
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />

                      {section.type === 'text' && (
                        <textarea
                          value={section.content}
                          onChange={(e) => updateContentSection(section.id, 'content', e.target.value)}
                          rows={6}
                          placeholder="Nội dung văn bản..."
                          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        />
                      )}

                      {section.type === 'ai-content' && (
                        <div className="bg-purple-50 border border-purple-200 rounded-lg p-3">
                          <div className="text-sm text-purple-800 mb-2">✨ Nội dung được tạo bởi AI</div>
                          <textarea
                            value={section.content}
                            onChange={(e) => updateContentSection(section.id, 'content', e.target.value)}
                            rows={8}
                            className="w-full p-2 border border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white"
                          />
                        </div>
                      )}

                      {(section.type === 'video' || section.type === 'image' || section.type === 'audio') && (
                        <div className="space-y-2">
                          <input
                            type="url"
                            value={section.content}
                            onChange={(e) => updateContentSection(section.id, 'content', e.target.value)}
                            placeholder={`URL ${section.type}...`}
                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          />
                          <input
                            type="file"
                            accept={section.type === 'video' ? 'video/*' : section.type === 'image' ? 'image/*' : 'audio/*'}
                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          />
                        </div>
                      )}

                      {section.type === 'quiz' && (
                        <textarea
                          value={section.content}
                          onChange={(e) => updateContentSection(section.id, 'content', e.target.value)}
                          rows={4}
                          placeholder="Câu hỏi và đáp án (JSON format hoặc văn bản)..."
                          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Learning Objectives */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-6">🎯 Mục tiêu bài học</h2>

              <div className="space-y-2">
                {learningObjectives.map((objective, index) => (
                  <div key={index} className="flex space-x-2">
                    <input
                      type="text"
                      value={objective}
                      onChange={(e) => updateObjective(index, e.target.value)}
                      placeholder={`Mục tiêu ${index + 1}: VD: Học sinh hiểu được đặc điểm của chế độ phong kiến`}
                      className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                    {learningObjectives.length > 1 && (
                      <button
                        onClick={() => removeObjective(index)}
                        className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg"
                      >
                        🗑️
                      </button>
                    )}
                  </div>
                ))}
                <button
                  onClick={addObjective}
                  className="text-green-600 hover:text-green-700 text-sm font-medium"
                >
                  + Thêm mục tiêu
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Materials */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900">📎 Tài liệu đính kèm</h3>
                <button
                  onClick={addMaterial}
                  className="text-green-600 hover:text-green-700 text-sm font-medium"
                >
                  + Thêm
                </button>
              </div>

              <div className="space-y-3">
                {materials.length === 0 ? (
                  <p className="text-gray-500 text-sm text-center py-4">Chưa có tài liệu nào</p>
                ) : (
                  materials.map(material => (
                    <div key={material.id} className="border border-gray-200 rounded-lg p-3">
                      <div className="space-y-2">
                        <select
                          value={material.type}
                          onChange={(e) => updateMaterial(material.id, 'type', e.target.value)}
                          className="w-full p-2 border border-gray-300 rounded text-sm"
                        >
                          <option value="pdf">📄 PDF</option>
                          <option value="doc">📝 Document</option>
                          <option value="presentation">📊 Presentation</option>
                          <option value="link">🔗 Link</option>
                        </select>

                        <input
                          type="text"
                          value={material.title}
                          onChange={(e) => updateMaterial(material.id, 'title', e.target.value)}
                          placeholder="Tên tài liệu"
                          className="w-full p-2 border border-gray-300 rounded text-sm"
                        />

                        <input
                          type="url"
                          value={material.url}
                          onChange={(e) => updateMaterial(material.id, 'url', e.target.value)}
                          placeholder="URL tài liệu"
                          className="w-full p-2 border border-gray-300 rounded text-sm"
                        />

                        <button
                          onClick={() => removeMaterial(material.id)}
                          className="text-red-600 hover:text-red-700 text-xs"
                        >
                          🗑️ Xóa
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Preview */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">👁️ Xem trước</h3>
              <div className="text-sm text-gray-600 space-y-2">
                <p><strong>Tiêu đề:</strong> {lessonTitle || 'Chưa nhập'}</p>
                <p><strong>Thời lượng:</strong> {duration} phút</p>
                <p><strong>Nội dung:</strong> {contentSections.length} phần</p>
                <p><strong>Tài liệu:</strong> {materials.length} tài liệu</p>
                <p><strong>Trạng thái:</strong> {status === 'published' ? '🟢 Xuất bản' : '🟡 Nháp'}</p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">⚡ Thao tác nhanh</h3>
              <div className="space-y-2">
                <button
                  onClick={() => setStatus('published')}
                  className="w-full px-3 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors text-sm"
                >
                  📢 Xuất bản ngay
                </button>
                <button
                  onClick={() => alert('Preview lesson')}
                  className="w-full px-3 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors text-sm"
                >
                  👁️ Xem trước bài giảng
                </button>
                <button
                  onClick={() => alert('Create quiz from lesson')}
                  className="w-full px-3 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors text-sm"
                >
                  ❓ Tạo quiz từ bài giảng
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonCreator;