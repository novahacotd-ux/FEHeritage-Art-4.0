import React, { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { lmsData } from '../../../data/lmsData';

const StudentDashboard = () => {
  const [searchParams] = useSearchParams();
  const studentId = parseInt(searchParams.get('studentId')) || 10;

  const student = lmsData.users.find(u => u.id === studentId && u.role === 'student');
  const enrolledCourses = lmsData.courses.filter(c => student?.enrolledCourses?.includes(c.id)) || [];
  const studentAssignments = lmsData.assignments.filter(a =>
    enrolledCourses.some(c => c.id === a.courseId)
  );

  // Student submissions
  const studentSubmissions = lmsData.submissions.filter(s => s.studentId === studentId);

  // Calculate statistics
  const stats = {
    totalCourses: enrolledCourses.length,
    activeAssignments: studentAssignments.filter(a => a.status === 'active').length,
    completedAssignments: studentSubmissions.length,
    averageGrade: studentSubmissions.length > 0
      ? Math.round(studentSubmissions.reduce((sum, s) => sum + (s.grade || 0), 0) / studentSubmissions.length)
      : 0
  };

  const [activeTab, setActiveTab] = useState('overview');

  const getAssignmentStatus = (assignmentId) => {
    const submission = studentSubmissions.find(s => s.assignmentId === assignmentId);
    if (!submission) return 'not-started';
    if (submission.status === 'submitted' && !submission.grade) return 'pending';
    if (submission.grade) return 'graded';
    return 'draft';
  };

  const getSubmissionForAssignment = (assignmentId) => {
    return studentSubmissions.find(s => s.assignmentId === assignmentId);
  };

  if (!student) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800">Không tìm thấy học sinh</h1>
          <p className="text-gray-600 mt-2">ID học sinh không hợp lệ</p>
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
              <Link
                to="/giaoduc"
                className="text-gray-500 hover:text-gray-700 flex items-center space-x-1"
              >
                <span>←</span>
                <span>Quay lại Giáo dục</span>
              </Link>
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
                <span className="text-white text-xl">🎓</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Xin chào, {student.name}</h1>
                <p className="text-gray-600">Lớp: {student.grade} • ID: {student.studentId}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-gray-500">Điểm trung bình</p>
                <p className="text-2xl font-bold text-green-600">{student.gpa}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-blue-100">
                <span className="text-2xl">📚</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Khóa học</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalCourses}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-orange-100">
                <span className="text-2xl">📝</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Bài tập đang làm</p>
                <p className="text-2xl font-bold text-gray-900">{stats.activeAssignments}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-green-100">
                <span className="text-2xl">✅</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Đã hoàn thành</p>
                <p className="text-2xl font-bold text-gray-900">{stats.completedAssignments}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-purple-100">
                <span className="text-2xl">⭐</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Điểm TB bài tập</p>
                <p className="text-2xl font-bold text-gray-900">{stats.averageGrade}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-xl shadow-sm mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8 px-6">
              {[
                { id: 'overview', name: 'Tổng quan', icon: '📊' },
                { id: 'courses', name: 'Khóa học', icon: '📚' },
                { id: 'assignments', name: 'Bài tập', icon: '📝' },
                { id: 'grades', name: 'Điểm số', icon: '📈' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`${activeTab === tab.id
                      ? 'border-green-500 text-green-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2`}
                >
                  <span>{tab.icon}</span>
                  <span>{tab.name}</span>
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Recent Assignments */}
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Bài tập gần đây</h3>
                    <div className="space-y-3">
                      {studentAssignments.slice(0, 3).map(assignment => {
                        const status = getAssignmentStatus(assignment.id);
                        const submission = getSubmissionForAssignment(assignment.id);

                        return (
                          <Link
                            key={assignment.id}
                            to={`/lms/student/assignments/${assignment.id}?studentId=${studentId}`}
                            className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                          >
                            <div className="flex-1">
                              <h4 className="font-medium text-gray-900">{assignment.title}</h4>
                              <p className="text-sm text-gray-500">
                                Hạn nộp: {new Date(assignment.dueDate).toLocaleDateString('vi-VN')}
                              </p>
                            </div>
                            <div className="text-right">
                              <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${status === 'graded' ? 'bg-green-100 text-green-800' :
                                  status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                    status === 'draft' ? 'bg-blue-100 text-blue-800' :
                                      'bg-gray-100 text-gray-600'
                                }`}>
                                {status === 'graded' ? `${submission?.grade}/100` :
                                  status === 'pending' ? 'Chờ chấm' :
                                    status === 'draft' ? 'Đang làm' : 'Chưa bắt đầu'}
                              </span>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </div>

                  {/* Course Progress */}
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Tiến độ khóa học</h3>
                    <div className="space-y-3">
                      {enrolledCourses.map(course => {
                        const courseAssignments = studentAssignments.filter(a => a.courseId === course.id);
                        const completedAssignments = courseAssignments.filter(a => getAssignmentStatus(a.id) === 'graded');
                        const progress = courseAssignments.length > 0
                          ? Math.round((completedAssignments.length / courseAssignments.length) * 100)
                          : 0;

                        return (
                          <Link
                            key={course.id}
                            to={`/lms/student/courses/${course.id}?studentId=${studentId}`}
                            className="block p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                          >
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-medium text-gray-900">{course.title}</h4>
                              <span className="text-sm text-gray-500">{progress}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-green-600 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${progress}%` }}
                              />
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Courses Tab */}
            {activeTab === 'courses' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-gray-900">Khóa học của tôi ({enrolledCourses.length})</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {enrolledCourses.map(course => {
                    const teacher = lmsData.users.find(u => u.id === course.teacherId);
                    const courseAssignments = studentAssignments.filter(a => a.courseId === course.id);
                    const completedAssignments = courseAssignments.filter(a => getAssignmentStatus(a.id) === 'graded');
                    const progress = courseAssignments.length > 0
                      ? Math.round((completedAssignments.length / courseAssignments.length) * 100)
                      : 0;

                    return (
                      <Link
                        key={course.id}
                        to={`/lms/student/courses/${course.id}?studentId=${studentId}`}
                        className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-200 hover:border-green-300"
                      >
                        <div className="flex items-center mb-4">
                          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                            <span className="text-white text-xl">📖</span>
                          </div>
                          <div className="ml-3">
                            <h4 className="font-semibold text-gray-900">{course.title}</h4>
                            <p className="text-sm text-gray-500">{teacher?.name}</p>
                          </div>
                        </div>

                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{course.description}</p>

                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-500">Tiến độ</span>
                            <span className="text-sm font-medium text-gray-900">{progress}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${progress}%` }}
                            />
                          </div>

                          <div className="flex justify-between text-xs text-gray-500">
                            <span>{completedAssignments.length}/{courseAssignments.length} bài tập</span>
                            <span>{course.lessons?.length || 0} bài giảng</span>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Assignments Tab */}
            {activeTab === 'assignments' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-gray-900">Tất cả bài tập ({studentAssignments.length})</h3>
                  <div className="flex space-x-2">
                    <select className="border border-gray-300 rounded-lg px-3 py-1 text-sm">
                      <option>Tất cả trạng thái</option>
                      <option>Chưa bắt đầu</option>
                      <option>Đang làm</option>
                      <option>Chờ chấm</option>
                      <option>Đã chấm</option>
                    </select>
                    <select className="border border-gray-300 rounded-lg px-3 py-1 text-sm">
                      <option>Tất cả khóa học</option>
                      {enrolledCourses.map(course => (
                        <option key={course.id} value={course.id}>{course.title}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-4">
                  {studentAssignments.map(assignment => {
                    const course = lmsData.courses.find(c => c.id === assignment.courseId);
                    const status = getAssignmentStatus(assignment.id);
                    const submission = getSubmissionForAssignment(assignment.id);
                    const isOverdue = new Date(assignment.dueDate) < new Date() && status === 'not-started';

                    return (
                      <Link
                        key={assignment.id}
                        to={`/lms/student/assignments/${assignment.id}?studentId=${studentId}`}
                        className="block border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <h4 className="font-medium text-gray-900">{assignment.title}</h4>
                              <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                                {assignment.type === 'ai-image' ? 'AI Hình ảnh' :
                                  assignment.type === 'ai-video' ? 'AI Video' :
                                    assignment.type === 'text' ? 'Văn bản' : assignment.type}
                              </span>
                              {isOverdue && (
                                <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded">
                                  Quá hạn
                                </span>
                              )}
                            </div>
                            <p className="text-gray-600 text-sm mb-2">{course?.title}</p>
                            <p className="text-gray-500 text-xs">
                              Hạn nộp: {new Date(assignment.dueDate).toLocaleDateString('vi-VN', {
                                weekday: 'long',
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </p>
                          </div>

                          <div className="text-right">
                            <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${status === 'graded' ? 'bg-green-100 text-green-800' :
                                status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                  status === 'draft' ? 'bg-blue-100 text-blue-800' :
                                    'bg-gray-100 text-gray-600'
                              }`}>
                              {status === 'graded' ? `${submission?.grade}/100` :
                                status === 'pending' ? 'Chờ chấm điểm' :
                                  status === 'draft' ? 'Đang làm' : 'Chưa bắt đầu'}
                            </span>
                            {status === 'graded' && submission?.grade && (
                              <p className="text-xs text-gray-500 mt-1">
                                Chấm: {new Date(submission.gradedDate).toLocaleDateString('vi-VN')}
                              </p>
                            )}
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Grades Tab */}
            {activeTab === 'grades' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-gray-900">Bảng điểm</h3>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Điểm trung bình tổng</p>
                    <p className="text-2xl font-bold text-green-600">{student.gpa}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {enrolledCourses.map(course => {
                    const courseSubmissions = studentSubmissions.filter(s => {
                      const assignment = lmsData.assignments.find(a => a.id === s.assignmentId);
                      return assignment?.courseId === course.id;
                    });
                    const gradedSubmissions = courseSubmissions.filter(s => s.grade);
                    const courseAverage = gradedSubmissions.length > 0
                      ? Math.round(gradedSubmissions.reduce((sum, s) => sum + s.grade, 0) / gradedSubmissions.length)
                      : 0;

                    return (
                      <div key={course.id} className="bg-white border border-gray-200 rounded-xl p-6">
                        <h4 className="font-semibold text-gray-900 mb-4">{course.title}</h4>

                        <div className="mb-4">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-500">Điểm trung bình môn</span>
                            <span className="font-bold text-lg text-green-600">{courseAverage}</span>
                          </div>
                        </div>

                        <div className="space-y-3">
                          {gradedSubmissions.map(submission => {
                            const assignment = lmsData.assignments.find(a => a.id === submission.assignmentId);

                            return (
                              <div key={submission.id} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                                <div>
                                  <p className="font-medium text-sm text-gray-900">{assignment?.title}</p>
                                  <p className="text-xs text-gray-500">
                                    {new Date(submission.gradedDate).toLocaleDateString('vi-VN')}
                                  </p>
                                </div>
                                <span className={`font-bold ${submission.grade >= 90 ? 'text-green-600' :
                                    submission.grade >= 80 ? 'text-blue-600' :
                                      submission.grade >= 70 ? 'text-yellow-600' : 'text-red-600'
                                  }`}>
                                  {submission.grade}/100
                                </span>
                              </div>
                            );
                          })}

                          {gradedSubmissions.length === 0 && (
                            <p className="text-center text-gray-500 text-sm py-4">Chưa có điểm nào</p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;