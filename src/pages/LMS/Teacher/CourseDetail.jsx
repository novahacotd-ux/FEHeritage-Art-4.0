import React, { useState } from 'react';
import { useParams, useSearchParams, useNavigate, Link } from 'react-router-dom';
import { lmsData } from '../../../data/lmsData';

const CourseDetail = () => {
  const { courseId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const teacherId = parseInt(searchParams.get('teacherId')) || 1;

  const [activeTab, setActiveTab] = useState('overview');

  const course = lmsData.courses.find(c => c.id === parseInt(courseId));
  const teacher = lmsData.users.find(u => u.id === teacherId && u.role === 'teacher');
  const students = lmsData.users.filter(u => course?.students.includes(u.id));
  const lessons = lmsData.lessons?.filter(l => course?.lessons?.includes(l.id)) || [];
  const assignments = lmsData.assignments.filter(a => course?.assignments?.includes(a.id));

  // Calculate stats
  const totalSubmissions = lmsData.submissions.filter(s =>
    assignments.some(a => a.id === s.assignmentId)
  );
  const pendingGrading = totalSubmissions.filter(s => s.status === 'submitted').length;
  const averageGrade = totalSubmissions.filter(s => s.grade !== null).length > 0
    ? totalSubmissions.filter(s => s.grade !== null).reduce((sum, s) => sum + s.grade, 0) / totalSubmissions.filter(s => s.grade !== null).length
    : 0;

  if (!course || course.teacherId !== teacherId) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800">Không tìm thấy khóa học</h1>
          <p className="text-gray-600 mt-2">Bạn không có quyền truy cập khóa học này</p>
          <Link
            to={`/lms/teacher/dashboard?teacherId=${teacherId}`}
            className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Quay lại Dashboard
          </Link>
        </div>
      </div>
    );
  }

  const TabButton = ({ id, label, icon, count = null }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${activeTab === id
        ? 'bg-blue-600 text-white'
        : 'text-gray-600 hover:bg-gray-100'
        }`}
    >
      <span>{icon}</span>
      <span>{label}</span>
      {count !== null && (
        <span className={`px-2 py-1 rounded-full text-xs ${activeTab === id ? 'bg-blue-500' : 'bg-gray-200'
          }`}>
          {count}
        </span>
      )}
    </button>
  );

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
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                <span className="text-white text-xl">📚</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{course.title}</h1>
                <p className="text-gray-600">{course.subject} - Lớp {course.grade}</p>
              </div>
            </div>
            <div className="flex space-x-3">
              <Link
                to={`/lms/teacher/courses/${courseId}/lessons/new?teacherId=${teacherId}`}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                📖 Tạo bài giảng
              </Link>
              <Link
                to={`/lms/teacher/assignments/new?courseId=${courseId}&teacherId=${teacherId}`}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                📝 Tạo bài tập
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Course Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <span className="text-blue-600 text-xl">👥</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Học sinh</p>
                <p className="text-2xl font-bold text-gray-900">{students.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <span className="text-green-600 text-xl">📖</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Bài giảng</p>
                <p className="text-2xl font-bold text-gray-900">{lessons.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <span className="text-purple-600 text-xl">📝</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Bài tập</p>
                <p className="text-2xl font-bold text-gray-900">{assignments.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <span className="text-orange-600 text-xl">📊</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Điểm TB</p>
                <p className="text-2xl font-bold text-gray-900">{averageGrade.toFixed(1)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm mb-6">
          <div className="border-b border-gray-200 px-6">
            <div className="flex space-x-2 py-4">
              <TabButton id="overview" label="Tổng quan" icon="📊" />
              <TabButton id="lessons" label="Bài giảng" icon="📖" count={lessons.length} />
              <TabButton id="assignments" label="Bài tập" icon="📝" count={assignments.length} />
              <TabButton id="students" label="Học sinh" icon="👥" count={students.length} />
              <TabButton id="analytics" label="Phân tích" icon="📈" />
            </div>
          </div>

          <div className="p-6">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Thông tin khóa học</h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-gray-700 mb-4">{course.description}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-600">Thời gian</p>
                        <p className="font-medium">
                          {new Date(course.startDate).toLocaleDateString('vi-VN')} -
                          {new Date(course.endDate).toLocaleDateString('vi-VN')}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Học kỳ</p>
                        <p className="font-medium">{course.semester}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Trạng thái</p>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${course.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                          }`}>
                          {course.status === 'active' ? 'Đang hoạt động' : 'Không hoạt động'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Hoạt động gần đây</h3>
                  <div className="space-y-3">
                    {totalSubmissions.slice(0, 5).map(submission => {
                      const student = students.find(s => s.id === submission.studentId);
                      const assignment = assignments.find(a => a.id === submission.assignmentId);
                      return (
                        <div key={submission.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="text-xs font-medium text-blue-600">
                              {student?.name.split(' ').pop().charAt(0)}
                            </span>
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900">
                              {student?.name} nộp bài "{assignment?.title}"
                            </p>
                            <p className="text-xs text-gray-500">
                              {new Date(submission.submissionDate).toLocaleString('vi-VN')}
                            </p>
                          </div>
                          {submission.status === 'graded' && (
                            <span className="text-sm font-medium text-green-600">
                              {submission.grade}/100
                            </span>
                          )}
                          {submission.status === 'submitted' && (
                            <span className="text-sm text-orange-600">Chờ chấm</span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* Lessons Tab */}
            {activeTab === 'lessons' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-gray-900">Bài giảng ({lessons.length})</h3>
                  <Link
                    to={`/lms/teacher/courses/${courseId}/lessons/new?teacherId=${teacherId}`}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    📖 Tạo bài giảng mới
                  </Link>
                </div>

                {lessons.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-gray-400 text-3xl">📖</span>
                    </div>
                    <p className="text-gray-500 text-lg font-medium">Chưa có bài giảng nào</p>
                    <p className="text-gray-400 mb-4">Tạo bài giảng đầu tiên cho khóa học của bạn</p>
                    <Link
                      to={`/lms/teacher/courses/${courseId}/lessons/new?teacherId=${teacherId}`}
                      className="inline-block px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      🚀 Tạo bài giảng đầu tiên
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {lessons.map(lesson => (
                      <div key={lesson.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900 mb-2">{lesson.title}</h4>
                            <p className="text-gray-600 text-sm mb-3">{lesson.description}</p>
                            <div className="flex items-center space-x-4 text-xs text-gray-500">
                              <span>⏱️ {lesson.duration} phút</span>
                              <span>📹 {lesson.videoUrl ? 'Có video' : 'Chưa có video'}</span>
                              <span>📄 {lesson.materials?.length || 0} tài liệu</span>
                              <span className={`px-2 py-1 rounded-full ${lesson.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
                                }`}>
                                {lesson.status === 'published' ? 'Đã xuất bản' : 'Nháp'}
                              </span>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <button
                              onClick={() => navigate(`/lms/teacher/courses/${courseId}/lessons/${lesson.id}?teacherId=${teacherId}`)}
                              className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-sm hover:bg-blue-200 transition-colors"
                            >
                              ✏️ Chỉnh sửa
                            </button>
                            <button
                              onClick={() => navigate(`/lms/teacher/courses/${courseId}/lessons/${lesson.id}?teacherId=${teacherId}`)}
                              className="px-3 py-1 bg-green-100 text-green-700 rounded-lg text-sm hover:bg-green-200 transition-colors"
                            >
                              👁️ Xem chi tiết
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Assignments Tab */}
            {activeTab === 'assignments' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-gray-900">Bài tập ({assignments.length})</h3>
                  <Link
                    to={`/lms/teacher/assignments/new?courseId=${courseId}&teacherId=${teacherId}`}
                    className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    📝 Tạo bài tập mới
                  </Link>
                </div>

                {assignments.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-gray-400 text-3xl">📝</span>
                    </div>
                    <p className="text-gray-500 text-lg font-medium">Chưa có bài tập nào</p>
                    <p className="text-gray-400 mb-4">Tạo bài tập để học sinh thực hành</p>
                    <Link
                      to={`/lms/teacher/assignments/new?courseId=${courseId}&teacherId=${teacherId}`}
                      className="inline-block px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                    >
                      🚀 Tạo bài tập đầu tiên
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {assignments.map(assignment => {
                      const submissionCount = totalSubmissions.filter(s => s.assignmentId === assignment.id).length;
                      const gradedCount = totalSubmissions.filter(s => s.assignmentId === assignment.id && s.grade !== null).length;

                      return (
                        <div key={assignment.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-2">
                                <h4 className="font-semibold text-gray-900">{assignment.title}</h4>
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${assignment.type === 'ai-image' ? 'bg-purple-100 text-purple-800' :
                                  assignment.type === 'text' ? 'bg-blue-100 text-blue-800' :
                                    assignment.type === 'ai-video' ? 'bg-green-100 text-green-800' :
                                      'bg-gray-100 text-gray-800'
                                  }`}>
                                  {assignment.type === 'ai-image' && '🎨 AI Image'}
                                  {assignment.type === 'text' && '📝 Text'}
                                  {assignment.type === 'ai-video' && '🎥 AI Video'}
                                </span>
                              </div>
                              <p className="text-gray-600 text-sm mb-3">{assignment.description}</p>
                              <div className="flex items-center space-x-4 text-xs text-gray-500">
                                <span>📅 Hạn: {new Date(assignment.dueDate).toLocaleDateString('vi-VN')}</span>
                                <span>📊 {submissionCount}/{students.length} nộp bài</span>
                                <span>✅ {gradedCount} đã chấm</span>
                                <span className={`px-2 py-1 rounded-full ${assignment.status === 'active' ? 'bg-green-100 text-green-800' :
                                  assignment.status === 'draft' ? 'bg-gray-100 text-gray-600' :
                                    'bg-red-100 text-red-800'
                                  }`}>
                                  {assignment.status === 'active' && 'Đang hoạt động'}
                                  {assignment.status === 'draft' && 'Nháp'}
                                  {assignment.status === 'closed' && 'Đã đóng'}
                                </span>
                              </div>
                            </div>
                            <div className="flex space-x-2">
                              <button className="px-3 py-1 bg-orange-100 text-orange-700 rounded-lg text-sm hover:bg-orange-200 transition-colors">
                                📊 Xem bài nộp
                              </button>
                              <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-sm hover:bg-blue-200 transition-colors">
                                ✏️ Chỉnh sửa
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {/* Students Tab */}
            {activeTab === 'students' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-gray-900">Học sinh ({students.length})</h3>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    👥 Mời học sinh
                  </button>
                </div>

                {students.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-gray-400 text-3xl">👥</span>
                    </div>
                    <p className="text-gray-500 text-lg font-medium">Chưa có học sinh nào</p>
                    <p className="text-gray-400 mb-4">Mời học sinh tham gia khóa học của bạn</p>
                    <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                      📧 Gửi lời mời
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {students.map(student => {
                      const studentSubmissions = totalSubmissions.filter(s => s.studentId === student.id);
                      const studentAverage = studentSubmissions.filter(s => s.grade !== null).length > 0
                        ? studentSubmissions.filter(s => s.grade !== null).reduce((sum, s) => sum + s.grade, 0) / studentSubmissions.filter(s => s.grade !== null).length
                        : 0;

                      return (
                        <div key={student.id} className="border border-gray-200 rounded-lg p-4">
                          <div className="flex items-center space-x-3 mb-3">
                            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                              <span className="text-white font-medium">
                                {student.name.split(' ').pop().charAt(0)}
                              </span>
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">{student.name}</p>
                              <p className="text-xs text-gray-500">Lớp {student.grade}</p>
                            </div>
                          </div>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-600">Điểm trung bình:</span>
                              <span className={`font-medium ${studentAverage >= 8 ? 'text-green-600' :
                                studentAverage >= 6.5 ? 'text-yellow-600' : 'text-red-600'
                                }`}>
                                {studentAverage.toFixed(1)}/10
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Bài nộp:</span>
                              <span>{studentSubmissions.length}/{assignments.length}</span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {/* Analytics Tab */}
            {activeTab === 'analytics' && (
              <div className="space-y-6">
                <h3 className="text-lg font-bold text-gray-900">Phân tích khóa học</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6">
                    <h4 className="font-semibold text-gray-900 mb-4">📊 Thống kê bài tập</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span>Tổng bài tập:</span>
                        <span className="font-medium">{assignments.length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Đang hoạt động:</span>
                        <span className="font-medium">{assignments.filter(a => a.status === 'active').length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Tổng bài nộp:</span>
                        <span className="font-medium">{totalSubmissions.length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Chờ chấm điểm:</span>
                        <span className="font-medium text-orange-600">{pendingGrading}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-6">
                    <h4 className="font-semibold text-gray-900 mb-4">🎯 Hiệu suất học tập</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span>Điểm trung bình:</span>
                        <span className="font-medium">{averageGrade.toFixed(1)}/100</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Tỷ lệ nộp bài:</span>
                        <span className="font-medium">
                          {assignments.length > 0 ? Math.round((totalSubmissions.length / (assignments.length * students.length)) * 100) : 0}%
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Học sinh tích cực:</span>
                        <span className="font-medium">
                          {students.filter(s =>
                            totalSubmissions.filter(sub => sub.studentId === s.id).length > 0
                          ).length}/{students.length}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h4 className="font-semibold text-gray-900 mb-4">📈 Xu hướng hoạt động</h4>
                  <div className="text-center py-8 text-gray-500">
                    <p>Biểu đồ hoạt động sẽ hiển thị ở đây</p>
                    <p className="text-sm">(Cần tích hợp thư viện chart)</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;