import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { lmsData } from '../../../data/lmsData';

const TeacherAssignmentDetail = () => {
  const { assignmentId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const teacherId = parseInt(searchParams.get('teacherId')) || 1;

  const assignment = lmsData.assignments.find(a => a.id === parseInt(assignmentId));
  const course = lmsData.courses.find(c => c.id === assignment?.courseId);
  const submissions = lmsData.submissions.filter(s => s.assignmentId === parseInt(assignmentId));

  const [activeTab, setActiveTab] = useState('overview');
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [gradeModalOpen, setGradeModalOpen] = useState(false);
  const [gradeData, setGradeData] = useState({ grade: '', feedback: '' });

  useEffect(() => {
    if (selectedSubmission) {
      setGradeData({
        grade: selectedSubmission.grade || '',
        feedback: selectedSubmission.feedback || ''
      });
    }
  }, [selectedSubmission]);

  const handleGradeSubmit = () => {
    // Mock grading functionality
    alert(`Đã chấm điểm thành công! Điểm: ${gradeData.grade}/100`);
    setGradeModalOpen(false);
    setSelectedSubmission(null);
  };

  const getSubmissionStatusBadge = (submission) => {
    if (submission.status === 'submitted' && submission.grade !== null) {
      return (
        <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-green-100 text-green-800 border border-green-200">
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Đã chấm: {submission.grade}/100
        </div>
      );
    } else if (submission.status === 'submitted') {
      return (
        <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-yellow-100 text-yellow-800 border border-yellow-200">
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Chờ chấm điểm
        </div>
      );
    } else {
      return (
        <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-blue-100 text-blue-800 border border-blue-200">
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
          Bản nháp
        </div>
      );
    }
  };

  const getAssignmentTypeIcon = (type) => {
    switch (type) {
      case 'ai-image': return '🎨';
      case 'ai-video': return '🎬';
      case 'text': return '📝';
      default: return '📋';
    }
  };

  const calculateStats = () => {
    const total = assignment?.totalStudents || 0;
    const submitted = submissions.filter(s => s.status === 'submitted').length;
    const graded = submissions.filter(s => s.grade !== null).length;
    const avgGrade = submissions
      .filter(s => s.grade !== null)
      .reduce((sum, s) => sum + s.grade, 0) / graded || 0;

    return { total, submitted, graded, avgGrade };
  };

  const stats = calculateStats();

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
      {/* Enhanced Header */}
      <div className="bg-white shadow-lg border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate(`/lms/teacher/dashboard?teacherId=${teacherId}`)}
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
                <p className="text-lg font-bold text-slate-800">
                  {new Date(assignment.dueDate).toLocaleDateString('vi-VN', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-slate-500 mb-1">Trạng thái</p>
                <p className={`text-lg font-bold ${assignment.status === 'active' ? 'text-green-600' : 'text-orange-600'}`}>
                  {assignment.status === 'active' ? '🟢 Đang mở' : '🟡 Nháp'}
                </p>
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="mt-6 border-b border-slate-200">
            <nav className="flex space-x-8">
              {[
                { id: 'overview', label: 'Tổng quan', icon: '📊' },
                { id: 'submissions', label: 'Bài nộp', icon: '📝' },
                { id: 'grading', label: 'Chấm điểm', icon: '✅' },
                { id: 'analytics', label: 'Thống kê', icon: '📈' }
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
      <div className="max-w-7xl mx-auto px-4 py-8">

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-4">
                  <div className="flex items-center justify-between text-white">
                    <div>
                      <p className="text-blue-100 text-sm font-medium">Tổng học sinh</p>
                      <p className="text-3xl font-bold">{stats.total}</p>
                    </div>
                    <div className="p-3 bg-blue-400 rounded-full">
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
                <div className="bg-gradient-to-r from-green-500 to-green-600 px-6 py-4">
                  <div className="flex items-center justify-between text-white">
                    <div>
                      <p className="text-green-100 text-sm font-medium">Đã nộp</p>
                      <p className="text-3xl font-bold">{stats.submitted}</p>
                    </div>
                    <div className="p-3 bg-green-400 rounded-full">
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
                <div className="bg-gradient-to-r from-yellow-500 to-orange-500 px-6 py-4">
                  <div className="flex items-center justify-between text-white">
                    <div>
                      <p className="text-yellow-100 text-sm font-medium">Đã chấm</p>
                      <p className="text-3xl font-bold">{stats.graded}</p>
                    </div>
                    <div className="p-3 bg-yellow-400 rounded-full">
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
                <div className="bg-gradient-to-r from-purple-500 to-purple-600 px-6 py-4">
                  <div className="flex items-center justify-between text-white">
                    <div>
                      <p className="text-purple-100 text-sm font-medium">Điểm TB</p>
                      <p className="text-3xl font-bold">{stats.avgGrade.toFixed(1)}</p>
                    </div>
                    <div className="p-3 bg-purple-400 rounded-full">
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Assignment Details */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
                  <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-4">
                    <h2 className="text-xl font-bold text-white flex items-center">
                      <span className="mr-2">📋</span>
                      Chi tiết bài tập
                    </h2>
                  </div>
                  <div className="p-8">
                    <div className="prose prose-slate max-w-none">
                      <p className="text-slate-700 leading-relaxed text-lg mb-6">
                        {assignment.description}
                      </p>

                      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-500 rounded-r-xl p-6 mb-6">
                        <h4 className="font-bold text-blue-900 mb-3">💡 Hướng dẫn:</h4>
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
              </div>

              <div className="lg:col-span-1">
                <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
                  <div className="bg-gradient-to-r from-green-600 to-emerald-600 px-6 py-4">
                    <h3 className="font-bold text-white">🔧 Cài đặt bài tập</h3>
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
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Submissions Tab */}
        {activeTab === 'submissions' && (
          <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4">
              <h2 className="text-xl font-bold text-white flex items-center">
                <span className="mr-2">📝</span>
                Bài nộp của học sinh ({submissions.length})
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Học sinh</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Ngày nộp</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Trạng thái</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Điểm</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Thao tác</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {submissions.map((submission) => {
                    const student = lmsData.users.find(u => u.id === submission.studentId);
                    return (
                      <tr key={submission.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                              {student?.name?.charAt(0) || 'S'}
                            </div>
                            <div>
                              <p className="font-semibold text-slate-800">{student?.name || 'Unknown Student'}</p>
                              <p className="text-sm text-slate-500">{student?.studentId || 'N/A'}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-slate-700">
                          {new Date(submission.submissionDate).toLocaleDateString('vi-VN')}
                        </td>
                        <td className="px-6 py-4">
                          {getSubmissionStatusBadge(submission)}
                        </td>
                        <td className="px-6 py-4">
                          {submission.grade !== null ? (
                            <span className="text-lg font-bold text-green-600">{submission.grade}/100</span>
                          ) : (
                            <span className="text-slate-400">Chưa chấm</span>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => {
                                setSelectedSubmission(submission);
                                setGradeModalOpen(true);
                              }}
                              className="px-3 py-2 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium hover:bg-blue-200 transition-colors"
                            >
                              {submission.grade !== null ? 'Sửa điểm' : 'Chấm điểm'}
                            </button>
                            <button className="px-3 py-2 bg-green-100 text-green-700 rounded-lg text-sm font-medium hover:bg-green-200 transition-colors">
                              Xem chi tiết
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Grading Tab */}
        {activeTab === 'grading' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
              <div className="bg-gradient-to-r from-yellow-500 to-orange-500 px-6 py-4">
                <h2 className="text-xl font-bold text-white flex items-center">
                  <span className="mr-2">✅</span>
                  Chấm điểm nhanh
                </h2>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {submissions.filter(s => s.grade === null).map((submission) => {
                    const student = lmsData.users.find(u => u.id === submission.studentId);
                    return (
                      <div key={submission.id} className="border-2 border-slate-200 rounded-xl p-6 hover:border-blue-300 transition-colors">
                        <div className="flex items-center space-x-3 mb-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                            {student?.name?.charAt(0) || 'S'}
                          </div>
                          <div>
                            <p className="font-semibold text-slate-800">{student?.name || 'Unknown Student'}</p>
                            <p className="text-sm text-slate-500">{student?.studentId || 'N/A'}</p>
                          </div>
                        </div>
                        <p className="text-sm text-slate-600 mb-4">
                          Nộp: {new Date(submission.submissionDate).toLocaleDateString('vi-VN')}
                        </p>
                        <button
                          onClick={() => {
                            setSelectedSubmission(submission);
                            setGradeModalOpen(true);
                          }}
                          className="w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 font-semibold"
                        >
                          Chấm điểm
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            {/* Progress Chart */}
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
              <div className="bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-4">
                <h2 className="text-xl font-bold text-white flex items-center">
                  <span className="mr-2">📈</span>
                  Phân tích thống kê
                </h2>
              </div>
              <div className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-800 mb-4">Tỷ lệ hoàn thành</h3>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="text-sm text-slate-600">Đã nộp</span>
                          <span className="text-sm font-medium">{stats.submitted}/{stats.total}</span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-3">
                          <div
                            className="bg-gradient-to-r from-green-500 to-emerald-500 h-3 rounded-full"
                            style={{ width: `${(stats.submitted / stats.total) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="text-sm text-slate-600">Đã chấm</span>
                          <span className="text-sm font-medium">{stats.graded}/{stats.submitted}</span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-3">
                          <div
                            className="bg-gradient-to-r from-blue-500 to-indigo-500 h-3 rounded-full"
                            style={{ width: `${stats.submitted > 0 ? (stats.graded / stats.submitted) * 100 : 0}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-800 mb-4">Phân bố điểm</h3>
                    <div className="space-y-3">
                      {['A (90-100)', 'B (80-89)', 'C (70-79)', 'D (60-69)', 'F (<60)'].map((grade, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                          <span className="text-sm font-medium text-slate-700">{grade}</span>
                          <span className="text-sm text-slate-600">
                            {submissions.filter(s => {
                              if (s.grade === null) return false;
                              switch (index) {
                                case 0: return s.grade >= 90;
                                case 1: return s.grade >= 80 && s.grade < 90;
                                case 2: return s.grade >= 70 && s.grade < 80;
                                case 3: return s.grade >= 60 && s.grade < 70;
                                case 4: return s.grade < 60;
                                default: return false;
                              }
                            }).length} học sinh
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Grading Modal */}
      {gradeModalOpen && selectedSubmission && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-hidden shadow-2xl">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4">
              <h3 className="text-xl font-bold text-white flex items-center">
                <span className="mr-2">✅</span>
                Chấm điểm bài làm
              </h3>
            </div>

            <div className="p-6 max-h-[calc(90vh-80px)] overflow-y-auto">
              <div className="space-y-6">
                {/* Student Info */}
                <div className="bg-slate-50 rounded-xl p-4">
                  <h4 className="font-semibold text-slate-800 mb-2">Thông tin học sinh</h4>
                  <p className="text-slate-700">
                    {lmsData.users.find(u => u.id === selectedSubmission.studentId)?.name || 'Unknown Student'}
                  </p>
                </div>

                {/* Submission Content Preview */}
                <div className="bg-slate-50 rounded-xl p-4">
                  <h4 className="font-semibold text-slate-800 mb-2">Nội dung bài làm</h4>
                  {selectedSubmission.content?.images && selectedSubmission.content.images.length > 0 && (
                    <div className="mb-4">
                      <p className="text-sm text-slate-600 mb-2">Hình ảnh ({selectedSubmission.content.images.length}):</p>
                      <div className="grid grid-cols-2 gap-2">
                        {selectedSubmission.content.images.slice(0, 2).map((img, index) => (
                          <img key={index} src={img.url} alt={`Image ${index + 1}`} className="w-full h-20 object-cover rounded" />
                        ))}
                      </div>
                    </div>
                  )}
                  {selectedSubmission.content?.notes && (
                    <p className="text-slate-700 text-sm">{selectedSubmission.content.notes}</p>
                  )}
                </div>

                {/* Grading Form */}
                <div className="space-y-4">
                  <div>
                    <label className="flex items-center text-lg font-bold text-slate-800 mb-3">
                      <span className="mr-2">🎯</span>
                      Điểm số (0-100)
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={gradeData.grade}
                      onChange={(e) => setGradeData(prev => ({ ...prev, grade: e.target.value }))}
                      className="w-full px-4 py-3 border-2 border-slate-300 rounded-xl focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition-all duration-200 text-lg font-semibold"
                      placeholder="Nhập điểm số..."
                    />
                  </div>

                  <div>
                    <label className="flex items-center text-lg font-bold text-slate-800 mb-3">
                      <span className="mr-2">💬</span>
                      Nhận xét
                    </label>
                    <textarea
                      value={gradeData.feedback}
                      onChange={(e) => setGradeData(prev => ({ ...prev, feedback: e.target.value }))}
                      className="w-full h-32 px-4 py-3 border-2 border-slate-300 rounded-xl resize-none focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition-all duration-200"
                      placeholder="Nhập nhận xét về bài làm..."
                    />
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end space-x-4 pt-4 border-t border-slate-200">
                  <button
                    onClick={() => setGradeModalOpen(false)}
                    className="px-6 py-3 text-slate-600 hover:text-slate-800 font-semibold transition-colors"
                  >
                    Hủy
                  </button>
                  <button
                    onClick={handleGradeSubmit}
                    className="px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all duration-200 font-semibold flex items-center space-x-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Lưu điểm</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherAssignmentDetail;