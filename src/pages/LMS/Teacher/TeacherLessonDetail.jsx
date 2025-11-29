import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { lmsData } from '../../../data/lmsData';

const TeacherLessonDetail = () => {
  const { courseId, lessonId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const teacherId = searchParams.get('teacherId');

  const [lesson, setLesson] = useState(null);
  const [course, setCourse] = useState(null);
  const [teacher, setTeacher] = useState(null);
  const [activeTab, setActiveTab] = useState('content');
  const [editMode, setEditMode] = useState(false);
  const [lessonData, setLessonData] = useState({});
  const [analytics, setAnalytics] = useState({});

  useEffect(() => {
    // Load lesson data
    const foundLesson = lmsData.lessons.find(l => l.id === parseInt(lessonId));
    const foundCourse = lmsData.courses.find(c => c.id === parseInt(courseId));
    const foundTeacher = lmsData.users.find(u => u.id === parseInt(teacherId));

    if (foundLesson && foundCourse && foundTeacher) {
      setLesson(foundLesson);
      setCourse(foundCourse);
      setTeacher(foundTeacher);
      setLessonData(foundLesson);

      // Mock analytics data
      setAnalytics({
        totalViews: foundLesson.views || 0,
        completions: foundLesson.completions || 0,
        averageTime: '15 phút',
        engagementRate: 87,
        studentProgress: [
          { studentId: 10, name: 'Nguyễn Minh An', progress: 100, lastAccess: '2024-11-08', timeSpent: 18 },
          { studentId: 11, name: 'Lê Thị Bảo', progress: 75, lastAccess: '2024-11-07', timeSpent: 12 },
          { studentId: 12, name: 'Trần Văn Cường', progress: 50, lastAccess: '2024-11-06', timeSpent: 8 },
          { studentId: 13, name: 'Phạm Thị Dung', progress: 25, lastAccess: '2024-11-05', timeSpent: 5 },
          { studentId: 14, name: 'Hoàng Minh Đức', progress: 0, lastAccess: null, timeSpent: 0 }
        ]
      });
    }
  }, [courseId, lessonId, teacherId]);

  const handleSave = () => {
    // Mock save functionality
    setLesson({ ...lessonData });
    setEditMode(false);
    alert('Bài học đã được cập nhật thành công!');
  };

  const handleAddSection = () => {
    const newSection = {
      id: Date.now(),
      type: 'text',
      title: 'Phần mới',
      content: 'Nội dung mới...',
      order: lessonData.contentSections.length + 1
    };

    setLessonData({
      ...lessonData,
      contentSections: [...lessonData.contentSections, newSection]
    });
  };

  const handleDeleteSection = (sectionIndex) => {
    if (confirm('Bạn có chắc chắn muốn xóa phần này?')) {
      const updatedSections = lessonData.contentSections.filter((_, index) => index !== sectionIndex);
      setLessonData({
        ...lessonData,
        contentSections: updatedSections
      });
    }
  };

  const updateSection = (sectionIndex, field, value) => {
    const updatedSections = [...lessonData.contentSections];
    updatedSections[sectionIndex] = {
      ...updatedSections[sectionIndex],
      [field]: value
    };
    setLessonData({
      ...lessonData,
      contentSections: updatedSections
    });
  };

  const renderContentEditor = (section, sectionIndex) => {
    return (
      <div className="border border-slate-200 rounded-lg p-4 mb-4">
        <div className="flex items-center justify-between mb-3">
          <select
            value={section.type}
            onChange={(e) => updateSection(sectionIndex, 'type', e.target.value)}
            className="bg-white border border-slate-300 rounded px-3 py-1 text-sm"
            disabled={!editMode}
          >
            <option value="text">Văn bản</option>
            <option value="video">Video</option>
            <option value="image">Hình ảnh</option>
            <option value="quiz">Quiz</option>
          </select>

          {editMode && (
            <button
              onClick={() => handleDeleteSection(sectionIndex)}
              className="text-red-600 hover:text-red-800 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          )}
        </div>

        <input
          type="text"
          value={section.title}
          onChange={(e) => updateSection(sectionIndex, 'title', e.target.value)}
          className="w-full mb-3 px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Tiêu đề phần"
          disabled={!editMode}
        />

        <textarea
          value={section.content}
          onChange={(e) => updateSection(sectionIndex, 'content', e.target.value)}
          className="w-full h-32 px-3 py-2 border border-slate-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Nội dung phần..."
          disabled={!editMode}
        />
      </div>
    );
  };

  const renderAnalytics = () => (
    <div className="space-y-6">
      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-blue-50 rounded-lg p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-blue-600">Lượt xem</p>
              <p className="text-2xl font-bold text-blue-900">{analytics.totalViews}</p>
            </div>
          </div>
        </div>

        <div className="bg-green-50 rounded-lg p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-green-600">Hoàn thành</p>
              <p className="text-2xl font-bold text-green-900">{analytics.completions}</p>
            </div>
          </div>
        </div>

        <div className="bg-purple-50 rounded-lg p-6">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-purple-600">Thời gian TB</p>
              <p className="text-2xl font-bold text-purple-900">{analytics.averageTime}</p>
            </div>
          </div>
        </div>

        <div className="bg-orange-50 rounded-lg p-6">
          <div className="flex items-center">
            <div className="p-2 bg-orange-100 rounded-lg">
              <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-orange-600">Tương tác</p>
              <p className="text-2xl font-bold text-orange-900">{analytics.engagementRate}%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Student Progress Table */}
      <div className="bg-white rounded-lg border border-slate-200">
        <div className="px-6 py-4 border-b border-slate-200">
          <h3 className="text-lg font-semibold text-slate-800">Tiến độ học sinh</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Học sinh
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Tiến độ
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Lần truy cập cuối
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Thời gian học
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              {analytics.studentProgress.map((student) => (
                <tr key={student.studentId} className="hover:bg-slate-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-slate-900">{student.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-1 bg-slate-200 rounded-full h-2 mr-3">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${student.progress}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-slate-600">{student.progress}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-slate-600">
                      {student.lastAccess || 'Chưa truy cập'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-slate-600">{student.timeSpent} phút</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  if (!lesson || !course || !teacher) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Đang tải bài học...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate(`/lms/teacher/courses/${courseId}?teacherId=${teacherId}`)}
                className="text-slate-600 hover:text-slate-800 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <div>
                <h1 className="text-xl font-bold text-slate-800">{lesson.title}</h1>
                <p className="text-sm text-slate-600">{course.title}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              {editMode ? (
                <>
                  <button
                    onClick={() => setEditMode(false)}
                    className="px-4 py-2 text-slate-600 hover:text-slate-800 transition-colors"
                  >
                    Hủy
                  </button>
                  <button
                    onClick={handleSave}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Lưu thay đổi
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setEditMode(true)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  <span>Chỉnh sửa</span>
                </button>
              )}
            </div>
          </div>

          {/* Tabs */}
          <div className="mt-4 border-b border-slate-200">
            <nav className="flex space-x-8">
              <button
                onClick={() => setActiveTab('content')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${activeTab === 'content'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                  }`}
              >
                Nội dung
              </button>
              <button
                onClick={() => setActiveTab('analytics')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${activeTab === 'analytics'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                  }`}
              >
                Thống kê
              </button>
              <button
                onClick={() => setActiveTab('settings')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${activeTab === 'settings'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                  }`}
              >
                Cài đặt
              </button>
            </nav>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {activeTab === 'content' && (
          <div className="space-y-6">
            {/* Lesson Info */}
            {editMode && (
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h3 className="text-lg font-semibold text-slate-800 mb-4">Thông tin bài học</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Tiêu đề bài học
                    </label>
                    <input
                      type="text"
                      value={lessonData.title}
                      onChange={(e) => setLessonData({ ...lessonData, title: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Thời lượng (phút)
                    </label>
                    <input
                      type="number"
                      value={lessonData.duration}
                      onChange={(e) => setLessonData({ ...lessonData, duration: parseInt(e.target.value) })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Mô tả
                    </label>
                    <textarea
                      value={lessonData.description}
                      onChange={(e) => setLessonData({ ...lessonData, description: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg resize-none h-24 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Content Sections */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-slate-800">Nội dung bài học</h3>
                {editMode && (
                  <button
                    onClick={handleAddSection}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    <span>Thêm phần</span>
                  </button>
                )}
              </div>

              <div className="space-y-4">
                {lessonData.contentSections?.map((section, index) => (
                  <div key={section.id || index}>
                    {editMode ? (
                      renderContentEditor(section, index)
                    ) : (
                      <div className="border border-slate-200 rounded-lg p-4">
                        <div className="flex items-center space-x-3 mb-2">
                          <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded">
                            {section.type}
                          </span>
                          <h4 className="font-medium text-slate-800">{section.title}</h4>
                        </div>
                        <p className="text-slate-600 text-sm">{section.content}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Learning Objectives */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">Mục tiêu học tập</h3>
              <ul className="space-y-2">
                {lesson.learningObjectives.map((objective, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span className="text-slate-700">{objective}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'analytics' && renderAnalytics()}

        {activeTab === 'settings' && (
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Cài đặt bài học</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-slate-800">Cho phép bình luận</h4>
                  <p className="text-sm text-slate-600">Học sinh có thể để lại bình luận trong bài học</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-slate-800">Theo dõi tiến độ</h4>
                  <p className="text-sm text-slate-600">Ghi lại tiến độ học tập của học sinh</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-slate-800">Hiển thị công khai</h4>
                  <p className="text-sm text-slate-600">Bài học có thể được truy cập bởi tất cả học sinh</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeacherLessonDetail;