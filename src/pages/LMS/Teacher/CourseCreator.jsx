import React, { useState } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { lmsData } from '../../../data/lmsData';

const CourseCreator = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const teacherId = parseInt(searchParams.get('teacherId')) || 1;

  const teacher = lmsData.users.find(u => u.id === teacherId && u.role === 'teacher');

  // Course creation states
  const [courseTitle, setCourseTitle] = useState('');
  const [courseDescription, setCourseDescription] = useState('');
  const [subject, setSubject] = useState('');
  const [grade, setGrade] = useState('');
  const [semester, setSemester] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [coverImage, setCoverImage] = useState('');

  // Course settings
  const [maxStudents, setMaxStudents] = useState(30);
  const [isPublic, setIsPublic] = useState(true);
  const [allowSelfEnroll, setAllowSelfEnroll] = useState(true);
  const [requireApproval, setRequireApproval] = useState(false);

  // Learning objectives
  const [learningObjectives, setLearningObjectives] = useState(['']);
  const [prerequisites, setPrerequisites] = useState(['']);

  const subjects = [
    'Lịch sử Việt Nam',
    'Văn học Việt Nam',
    'Địa lý Việt Nam',
    'Công nghệ AI',
    'Nghệ thuật',
    'Văn hóa dân gian',
    'Khảo cổ học',
    'Di sản văn hóa'
  ];

  const grades = ['10', '11', '12', 'Đại học', 'Sau đại học'];
  const semesters = ['HK1 2024-2025', 'HK2 2024-2025', 'Hè 2025'];

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

  const addPrerequisite = () => {
    setPrerequisites([...prerequisites, '']);
  };

  const updatePrerequisite = (index, value) => {
    const newPrerequisites = [...prerequisites];
    newPrerequisites[index] = value;
    setPrerequisites(newPrerequisites);
  };

  const removePrerequisite = (index) => {
    if (prerequisites.length > 1) {
      setPrerequisites(prerequisites.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = () => {
    // Validate form
    if (!courseTitle.trim() || !subject || !grade || !startDate || !endDate) {
      alert('Vui lòng điền đầy đủ thông tin bắt buộc');
      return;
    }

    if (new Date(startDate) >= new Date(endDate)) {
      alert('Ngày kết thúc phải sau ngày bắt đầu');
      return;
    }

    const filteredObjectives = learningObjectives.filter(obj => obj.trim() !== '');
    const filteredPrerequisites = prerequisites.filter(pre => pre.trim() !== '');

    const newCourse = {
      id: Math.max(...lmsData.courses.map(c => c.id)) + 1,
      title: courseTitle,
      description: courseDescription,
      teacherId: teacherId,
      subject: subject,
      grade: grade,
      semester: semester,
      students: [],
      lessons: [],
      assignments: [],
      quizzes: [],
      startDate: startDate,
      endDate: endDate,
      status: 'active',
      coverImage: coverImage || '/courses/default.jpg',
      maxStudents: maxStudents,
      isPublic: isPublic,
      allowSelfEnroll: allowSelfEnroll,
      requireApproval: requireApproval,
      learningObjectives: filteredObjectives,
      prerequisites: filteredPrerequisites,
      createdDate: new Date().toISOString(),
      enrollmentCount: 0
    };

    console.log('New Course Created:', newCourse);
    alert('Khóa học đã được tạo thành công!');
    navigate(`/lms/teacher/dashboard?teacherId=${teacherId}`);
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
                ← Quay lại Dashboard
              </button>
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
                <span className="text-white text-xl">📚</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Tạo Khóa học Mới</h1>
                <p className="text-gray-600">Thiết lập khóa học cho học sinh</p>
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
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                🚀 Tạo khóa học
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
                {/* Course Title */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tên khóa học *</label>
                  <input
                    type="text"
                    value={courseTitle}
                    onChange={(e) => setCourseTitle(e.target.value)}
                    placeholder="VD: Lịch sử Việt Nam thời kỳ phong kiến"
                    className="lms-input"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Mô tả khóa học</label>
                  <textarea
                    value={courseDescription}
                    onChange={(e) => setCourseDescription(e.target.value)}
                    rows={4}
                    placeholder="Mô tả nội dung, mục tiêu và phương pháp giảng dạy của khóa học..."
                    className="lms-input"
                  />
                </div>

                {/* Subject, Grade, Semester */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Môn học *</label>
                    <select
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    >
                      <option value="">Chọn môn học</option>
                      {subjects.map(subj => (
                        <option key={subj} value={subj}>{subj}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Khối lớp *</label>
                    <select
                      value={grade}
                      onChange={(e) => setGrade(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    >
                      <option value="">Chọn khối</option>
                      {grades.map(gr => (
                        <option key={gr} value={gr}>{gr}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Học kỳ</label>
                    <select
                      value={semester}
                      onChange={(e) => setSemester(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    >
                      <option value="">Chọn học kỳ</option>
                      {semesters.map(sem => (
                        <option key={sem} value={sem}>{sem}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Start Date, End Date */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Ngày bắt đầu *</label>
                    <input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Ngày kết thúc *</label>
                    <input
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Cover Image */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Ảnh bìa khóa học</label>
                  <input
                    type="url"
                    value={coverImage}
                    onChange={(e) => setCoverImage(e.target.value)}
                    placeholder="https://example.com/course-cover.jpg"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                  <p className="text-xs text-gray-500 mt-1">URL của ảnh bìa khóa học (tùy chọn)</p>
                </div>
              </div>
            </div>

            {/* Learning Objectives */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-6">🎯 Mục tiêu học tập</h2>

              <div className="space-y-2">
                {learningObjectives.map((objective, index) => (
                  <div key={index} className="flex space-x-2">
                    <input
                      type="text"
                      value={objective}
                      onChange={(e) => updateObjective(index, e.target.value)}
                      placeholder={`Mục tiêu ${index + 1}: VD: Hiểu được đặc điểm chế độ phong kiến Việt Nam`}
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

            {/* Prerequisites */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-6">📚 Kiến thức tiên quyết</h2>

              <div className="space-y-2">
                {prerequisites.map((prerequisite, index) => (
                  <div key={index} className="flex space-x-2">
                    <input
                      type="text"
                      value={prerequisite}
                      onChange={(e) => updatePrerequisite(index, e.target.value)}
                      placeholder={`Tiên quyết ${index + 1}: VD: Kiến thức cơ bản về Lịch sử Việt Nam`}
                      className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                    {prerequisites.length > 1 && (
                      <button
                        onClick={() => removePrerequisite(index)}
                        className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg"
                      >
                        🗑️
                      </button>
                    )}
                  </div>
                ))}
                <button
                  onClick={addPrerequisite}
                  className="text-green-600 hover:text-green-700 text-sm font-medium"
                >
                  + Thêm tiên quyết
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar Settings */}
          <div className="space-y-6">
            {/* Course Settings */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">⚙️ Cài đặt khóa học</h3>

              <div className="space-y-4">
                {/* Max Students */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Số học sinh tối đa</label>
                  <input
                    type="number"
                    value={maxStudents}
                    onChange={(e) => setMaxStudents(parseInt(e.target.value))}
                    min="1"
                    max="100"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                {/* Visibility */}
                <div>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={isPublic}
                      onChange={(e) => setIsPublic(e.target.checked)}
                      className="text-green-600"
                    />
                    <span className="text-sm font-medium text-gray-700">Khóa học công khai</span>
                  </label>
                  <p className="text-xs text-gray-500 mt-1">Cho phép mọi người xem khóa học</p>
                </div>

                {/* Self Enrollment */}
                <div>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={allowSelfEnroll}
                      onChange={(e) => setAllowSelfEnroll(e.target.checked)}
                      className="text-green-600"
                    />
                    <span className="text-sm font-medium text-gray-700">Cho phép tự đăng ký</span>
                  </label>
                  <p className="text-xs text-gray-500 mt-1">Học sinh có thể tự đăng ký khóa học</p>
                </div>

                {/* Approval Required */}
                <div>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={requireApproval}
                      onChange={(e) => setRequireApproval(e.target.checked)}
                      className="text-green-600"
                    />
                    <span className="text-sm font-medium text-gray-700">Yêu cầu duyệt đăng ký</span>
                  </label>
                  <p className="text-xs text-gray-500 mt-1">Giáo viên phải duyệt đơn đăng ký</p>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">🚀 Tạo nhanh sau khi tạo khóa học</h3>

              <div className="space-y-3">
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <span className="text-blue-600 text-lg">📖</span>
                    <span className="text-sm font-medium text-blue-800">Tạo bài giảng đầu tiên</span>
                  </div>
                </div>

                <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <span className="text-purple-600 text-lg">📝</span>
                    <span className="text-sm font-medium text-purple-800">Tạo bài tập AI</span>
                  </div>
                </div>

                <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <span className="text-orange-600 text-lg">👥</span>
                    <span className="text-sm font-medium text-orange-800">Mời học sinh tham gia</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Preview */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">👁️ Xem trước</h3>
              <div className="text-sm text-gray-600 space-y-2">
                <p><strong>Tên:</strong> {courseTitle || 'Chưa nhập'}</p>
                <p><strong>Môn:</strong> {subject || 'Chưa chọn'}</p>
                <p><strong>Khối:</strong> {grade || 'Chưa chọn'}</p>
                <p><strong>Thời gian:</strong> {startDate && endDate ?
                  `${new Date(startDate).toLocaleDateString('vi-VN')} - ${new Date(endDate).toLocaleDateString('vi-VN')}`
                  : 'Chưa đặt'}</p>
                <p><strong>Học sinh tối đa:</strong> {maxStudents}</p>
                <p><strong>Trạng thái:</strong> {isPublic ? '🌐 Công khai' : '🔒 Riêng tư'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCreator;