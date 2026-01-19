import React, { useState } from 'react';
import { useParams, useSearchParams, Link, useNavigate } from 'react-router-dom';
import { lmsData } from '../../../data/lmsData';

const StudentCourseView = () => {
  const { courseId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const studentId = parseInt(searchParams.get('studentId')) || 10;

  const course = lmsData.courses.find(c => c.id === parseInt(courseId));
  const teacher = lmsData.users.find(u => u.id === course?.teacherId);
  const student = lmsData.users.find(u => u.id === studentId);

  // Get lessons and assignments for this course
  const lessons = lmsData.lessons?.filter(l => l.courseId === parseInt(courseId)) || [];
  const assignments = lmsData.assignments.filter(a => a.courseId === parseInt(courseId));
  const studentSubmissions = lmsData.submissions.filter(s => s.studentId === studentId);

  const [activeTab, setActiveTab] = useState('lessons');
  const [expandedLesson, setExpandedLesson] = useState(null);

  // Calculate progress
  const completedAssignments = assignments.filter(a => {
    const submission = studentSubmissions.find(s => s.assignmentId === a.id);
    return submission && submission.status === 'submitted';
  });
  const progress = assignments.length > 0 ? Math.round((completedAssignments.length / assignments.length) * 100) : 0;

  const getAssignmentStatus = (assignmentId) => {
    const submission = studentSubmissions.find(s => s.assignmentId === assignmentId);
    if (!submission) return 'not-started';
    if (submission.status === 'submitted' && !submission.grade) return 'pending';
    if (submission.grade) return 'graded';
    return 'draft';
  };

  if (!course) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800">Không tìm thấy khóa học</h1>
          <p className="text-gray-600 mt-2">Khóa học không tồn tại hoặc bạn không có quyền truy cập</p>
        </div>
      </div>
    );
  }

  // Check if student is enrolled
  if (!student?.enrolledCourses?.includes(course.id)) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800">Chưa đăng ký khóa học</h1>
          <p className="text-gray-600 mt-2">Bạn chưa đăng ký khóa học này</p>
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
                to={`/lms/student/dashboard?studentId=${studentId}`}
                className="text-gray-500 hover:text-gray-700"
              >
                ← Quay lại dashboard
              </Link>
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white text-xl">📖</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{course.title}</h1>
                <p className="text-gray-600">Giảng viên: {teacher?.name}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-gray-500">Tiến độ hoàn thành</p>
                <div className="flex items-center space-x-2">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <span className="text-lg font-bold text-green-600">{progress}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Course Info */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <h2 className="text-lg font-bold text-gray-900 mb-3">📋 Mô tả khóa học</h2>
              <p className="text-gray-700 mb-4">{course.description}</p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div className="bg-blue-50 p-3 rounded-lg">
                  <div className="text-2xl mb-1">📚</div>
                  <div className="text-sm text-gray-500">Bài giảng</div>
                  <div className="text-xl font-bold text-blue-600">{lessons.length}</div>
                </div>
                <div className="bg-purple-50 p-3 rounded-lg">
                  <div className="text-2xl mb-1">📝</div>
                  <div className="text-sm text-gray-500">Bài tập</div>
                  <div className="text-xl font-bold text-purple-600">{assignments.length}</div>
                </div>
                <div className="bg-green-50 p-3 rounded-lg">
                  <div className="text-2xl mb-1">✅</div>
                  <div className="text-sm text-gray-500">Đã hoàn thành</div>
                  <div className="text-xl font-bold text-green-600">{completedAssignments.length}</div>
                </div>
                <div className="bg-orange-50 p-3 rounded-lg">
                  <div className="text-2xl mb-1">👥</div>
                  <div className="text-sm text-gray-500">Học sinh</div>
                  <div className="text-xl font-bold text-orange-600">{course.enrolledStudents?.length || 0}</div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">👨‍🏫 Giảng viên</h3>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                  <span className="text-gray-600">👨‍🏫</span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">{teacher?.name}</p>
                  <p className="text-sm text-gray-500">{teacher?.subject}</p>
                </div>
              </div>

              <div className="text-sm text-gray-600 space-y-1">
                <p><span className="font-medium">Email:</span> {teacher?.email}</p>
                <p><span className="font-medium">Khoa:</span> {course.subject}</p>
                <p><span className="font-medium">Năm học:</span> {course.academicYear}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-xl shadow-sm mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8 px-6">
              {[
                { id: 'lessons', name: 'Bài giảng', icon: '📖', count: lessons.length },
                { id: 'assignments', name: 'Bài tập', icon: '📝', count: assignments.length },
                { id: 'materials', name: 'Tài liệu', icon: '📎', count: 0 },
                { id: 'grades', name: 'Điểm số', icon: '📊', count: completedAssignments.length }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`${activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2`}
                >
                  <span>{tab.icon}</span>
                  <span>{tab.name}</span>
                  <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
                    {tab.count}
                  </span>
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {/* Lessons Tab */}
            {activeTab === 'lessons' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-gray-900">📖 Bài giảng ({lessons.length})</h3>
                </div>

                {lessons.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-gray-400 text-3xl">📖</span>
                    </div>
                    <p className="text-gray-500 text-lg font-medium">Chưa có bài giảng nào</p>
                    <p className="text-gray-400">Giảng viên chưa đăng tải bài giảng</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {lessons.map((lesson, index) => (
                      <div key={lesson.id} className="border border-gray-200 rounded-lg overflow-hidden">
                        <div
                          className="p-4 hover:bg-gray-50 cursor-pointer transition-colors"
                          onClick={() => setExpandedLesson(expandedLesson === lesson.id ? null : lesson.id)}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                <span className="text-blue-600 font-semibold text-sm">{index + 1}</span>
                              </div>
                              <div>
                                <h4 className="font-semibold text-gray-900">{lesson.title}</h4>
                                <p className="text-sm text-gray-500">{lesson.description}</p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-4 text-sm text-gray-500">
                              <span>⏱️ {lesson.duration} phút</span>
                              <span>👀 {lesson.views || 0} lượt xem</span>
                              <span className={`px-2 py-1 rounded-full text-xs ${lesson.status === 'published' ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'
                                }`}>
                                {lesson.status === 'published' ? 'Đã xuất bản' : 'Nháp'}
                              </span>
                              <span className="text-gray-400">
                                {expandedLesson === lesson.id ? '🔽' : '▶️'}
                              </span>
                            </div>
                          </div>
                        </div>

                        {expandedLesson === lesson.id && (
                          <div className="border-t border-gray-200 p-4 bg-gray-50">
                            <div className="mb-4">
                              <button
                                onClick={() => navigate(`/lms/student/courses/${courseId}/lessons/${lesson.id}?studentId=${studentId}`)}
                                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2 font-medium"
                              >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h1m4 0h1m6-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span>Vào học</span>
                              </button>
                            </div>

                            {lesson.videoUrl && (
                              <div className="mb-4">
                                <h5 className="font-medium text-gray-900 mb-2">🎥 Video bài giảng</h5>
                                <div className="bg-gray-800 rounded-lg p-4 text-center text-white">
                                  <p>Video Player</p>
                                  <p className="text-sm opacity-75">{lesson.videoUrl}</p>
                                </div>
                              </div>
                            )}

                            {lesson.contentSections && lesson.contentSections.length > 0 && (
                              <div className="mb-4">
                                <h5 className="font-medium text-gray-900 mb-2">📄 Nội dung bài giảng</h5>
                                <div className="space-y-3">
                                  {lesson.contentSections.map(section => (
                                    <div key={section.id} className="bg-white p-3 rounded border">
                                      <h6 className="font-medium text-gray-800 mb-1">{section.title}</h6>
                                      <p className="text-gray-600 text-sm">{section.content}</p>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                            {lesson.learningObjectives && lesson.learningObjectives.length > 0 && (
                              <div className="mb-4">
                                <h5 className="font-medium text-gray-900 mb-2">🎯 Mục tiêu bài học</h5>
                                <ul className="list-disc list-inside text-gray-600 text-sm space-y-1">
                                  {lesson.learningObjectives.map((objective, idx) => (
                                    <li key={idx}>{objective}</li>
                                  ))}
                                </ul>
                              </div>
                            )}

                            {lesson.materials && lesson.materials.length > 0 && (
                              <div className="mb-4">
                                <h5 className="font-medium text-gray-900 mb-2">📎 Tài liệu đính kèm</h5>
                                <div className="space-y-2">
                                  {lesson.materials.map(material => (
                                    <a
                                      key={material.id}
                                      href={material.url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 text-sm"
                                    >
                                      <span>
                                        {material.type === 'pdf' ? '📄' :
                                          material.type === 'doc' ? '📝' :
                                            material.type === 'presentation' ? '📊' : '🔗'}
                                      </span>
                                      <span>{material.title}</span>
                                      <span className="text-gray-400">↗️</span>
                                    </a>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Assignments Tab */}
            {activeTab === 'assignments' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-gray-900">📝 Bài tập ({assignments.length})</h3>
                  <div className="flex space-x-2">
                    <select className="border border-gray-300 rounded-lg px-3 py-1 text-sm">
                      <option>Tất cả trạng thái</option>
                      <option>Chưa bắt đầu</option>
                      <option>Đã hoàn thành</option>
                      <option>Quá hạn</option>
                    </select>
                  </div>
                </div>

                {assignments.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-gray-400 text-3xl">📝</span>
                    </div>
                    <p className="text-gray-500 text-lg font-medium">Chưa có bài tập nào</p>
                    <p className="text-gray-400">Giảng viên chưa giao bài tập</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {assignments.map(assignment => {
                      const status = getAssignmentStatus(assignment.id);
                      const submission = studentSubmissions.find(s => s.assignmentId === assignment.id);
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
                                <span className="text-xs bg-purple-100 text-purple-600 px-2 py-1 rounded">
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
                              <p className="text-gray-600 text-sm mb-2">{assignment.description}</p>
                              <div className="flex items-center space-x-4 text-xs text-gray-500">
                                <span>📅 Hạn nộp: {new Date(assignment.dueDate).toLocaleDateString('vi-VN')}</span>
                                <span>💯 {assignment.maxScore} điểm</span>
                                <span>👥 {assignment.submissions?.length || 0}/{assignment.totalStudents} đã nộp</span>
                              </div>
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
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {/* Materials Tab */}
            {activeTab === 'materials' && (
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-gray-900">📎 Tài liệu khóa học</h3>

                <div className="text-center py-12">
                  <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-gray-400 text-3xl">📎</span>
                  </div>
                  <p className="text-gray-500 text-lg font-medium">Chưa có tài liệu nào</p>
                  <p className="text-gray-400">Tài liệu sẽ được cập nhật trong các bài giảng</p>
                </div>
              </div>
            )}

            {/* Grades Tab */}
            {activeTab === 'grades' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-gray-900">📊 Điểm số</h3>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Điểm trung bình khóa học</p>
                    <p className="text-2xl font-bold text-green-600">
                      {completedAssignments.length > 0
                        ? Math.round(completedAssignments.reduce((sum, a) => {
                          const submission = studentSubmissions.find(s => s.assignmentId === a.id);
                          return sum + (submission?.grade || 0);
                        }, 0) / completedAssignments.length)
                        : 0
                      }
                    </p>
                  </div>
                </div>

                {completedAssignments.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-gray-400 text-3xl">📊</span>
                    </div>
                    <p className="text-gray-500 text-lg font-medium">Chưa có điểm nào</p>
                    <p className="text-gray-400">Hoàn thành bài tập để xem điểm</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {assignments.filter(a => getAssignmentStatus(a.id) === 'graded').map(assignment => {
                      const submission = studentSubmissions.find(s => s.assignmentId === assignment.id);

                      return (
                        <div key={assignment.id} className="border border-gray-200 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-3">
                            <div>
                              <h4 className="font-medium text-gray-900">{assignment.title}</h4>
                              <p className="text-sm text-gray-500">
                                Chấm điểm: {new Date(submission?.gradedDate).toLocaleDateString('vi-VN')}
                              </p>
                            </div>
                            <div className="text-right">
                              <span className={`text-2xl font-bold ${submission?.grade >= 90 ? 'text-green-600' :
                                submission?.grade >= 80 ? 'text-blue-600' :
                                  submission?.grade >= 70 ? 'text-yellow-600' : 'text-red-600'
                                }`}>
                                {submission?.grade}/100
                              </span>
                              <div className="w-32 bg-gray-200 rounded-full h-2 mt-1">
                                <div
                                  className={`h-2 rounded-full ${submission?.grade >= 90 ? 'bg-green-600' :
                                    submission?.grade >= 80 ? 'bg-blue-600' :
                                      submission?.grade >= 70 ? 'bg-yellow-600' : 'bg-red-600'
                                    }`}
                                  style={{ width: `${submission?.grade}%` }}
                                />
                              </div>
                            </div>
                          </div>

                          {submission?.feedback && (
                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                              <h5 className="font-medium text-blue-900 mb-1">💬 Nhận xét từ giáo viên:</h5>
                              <p className="text-blue-800 text-sm">{submission.feedback}</p>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentCourseView;