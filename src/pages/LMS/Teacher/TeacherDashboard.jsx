import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { lmsData } from '../../../data/lmsData';
import StatCard from '../../../components/lms/StatCard';
import LoadingSpinner from '../../../components/lms/LoadingSpinner';
import EmptyState from '../../../components/lms/EmptyState';
import './TeacherDashboard.css';

const TeacherDashboard = () => {
  const [searchParams] = useSearchParams();
  const teacherId = parseInt(searchParams.get('teacherId')) || 1;
  const [loading, setLoading] = useState(false);

  const teacher = lmsData.users.find(u => u.id === teacherId && u.role === 'teacher');
  const teacherCourses = lmsData.courses.filter(c => c.teacherId === teacherId);
  const totalStudents = teacherCourses.reduce((sum, course) => sum + course.students.length, 0);
  const totalAssignments = lmsData.assignments.filter(a =>
    teacherCourses.some(c => c.id === a.courseId)
  ).length;

  // Calculate recent activity
  const recentSubmissions = lmsData.submissions
    .filter(s => {
      const assignment = lmsData.assignments.find(a => a.id === s.assignmentId);
      return assignment && teacherCourses.some(c => c.id === assignment.courseId);
    })
    .sort((a, b) => new Date(b.submissionDate) - new Date(a.submissionDate))
    .slice(0, 5);

  const pendingGrading = recentSubmissions.filter(s => s.status === 'submitted').length;
  
  // Calculate completion rate
  const allSubmissions = lmsData.submissions.filter(s => {
    const assignment = lmsData.assignments.find(a => a.id === s.assignmentId);
    return assignment && teacherCourses.some(c => c.id === assignment.courseId);
  });
  const completedSubmissions = allSubmissions.filter(s => s.status === 'graded').length;
  const completionRate = allSubmissions.length > 0 
    ? Math.round((completedSubmissions / allSubmissions.length) * 100) 
    : 0;

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
    <div className="teacher-dashboard">
      {/* Header */}
      <div className="dashboard-header">
        <div className="header-container">
          <div className="header-content">
            <Link
              to="/giaoduc"
              className="back-link"
            >
              <span>←</span>
              <span>Quay lại Giáo dục</span>
            </Link>
            <div className="teacher-info">
              <div className="teacher-avatar">
                <span>{teacher.name.split(' ').pop().charAt(0)}</span>
              </div>
              <div>
                <h1 className="teacher-name">
                  Chào mừng, {teacher.name}
                </h1>
                <p className="teacher-subject">Giáo viên {teacher.subject}</p>
              </div>
            </div>
          </div>
          <div className="header-actions">
            <button className="btn-primary">
              <span>➕</span>
              <span>Tạo bài tập mới</span>
            </button>
            <Link to="/lms/teacher/profile" className="btn-icon">
              ⚙️
            </Link>
          </div>
        </div>
      </div>

      <div className="dashboard-container">
        {/* Stats Overview */}
        <div className="stats-grid">
          <StatCard
            icon="📚"
            title="Khóa học"
            value={teacherCourses.length}
            subtitle="Đang giảng dạy"
            color="primary"
            trend={{
              direction: 'up',
              value: '+2',
              label: 'từ tháng trước'
            }}
          />
          <StatCard
            icon="👥"
            title="Học sinh"
            value={totalStudents}
            subtitle="Tổng số học viên"
            color="success"
            trend={{
              direction: 'up',
              value: '+12',
              label: 'tuần này'
            }}
          />
          <StatCard
            icon="📝"
            title="Bài tập"
            value={totalAssignments}
            subtitle="Đã tạo"
            color="info"
            trend={{
              direction: 'neutral',
              value: '0',
              label: 'tuần này'
            }}
          />
          <StatCard
            icon="⏳"
            title="Chờ chấm"
            value={pendingGrading}
            subtitle="Bài nộp mới"
            color="warning"
            trend={{
              direction: 'down',
              value: '-5',
              label: 'từ hôm qua'
            }}
          />
        </div>

        {/* Charts Section */}
        <div className="charts-section">
          <div className="chart-card">
            <h3 className="card-title">📊 Điểm trung bình theo khóa học</h3>
            <div className="bar-chart">
              {teacherCourses.map(course => {
                const courseAssignments = lmsData.assignments.filter(a => a.courseId === course.id);
                const courseSubmissions = lmsData.submissions.filter(s => 
                  courseAssignments.some(a => a.id === s.assignmentId) && s.grade !== null
                );
                const avgGrade = courseSubmissions.length > 0
                  ? Math.round(courseSubmissions.reduce((sum, s) => sum + s.grade, 0) / courseSubmissions.length)
                  : 0;
                
                return (
                  <div key={course.id} className="bar-item">
                    <div className="bar-label">{course.title}</div>
                    <div className="bar-wrapper">
                      <div 
                        className="bar-fill" 
                        style={{ width: `${avgGrade}%` }}
                        data-value={avgGrade}
                      ></div>
                    </div>
                    <div className="bar-value">{avgGrade}/100</div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="chart-card">
            <h3 className="card-title">🎯 Tỷ lệ hoàn thành bài tập</h3>
            <div className="donut-chart">
              <svg viewBox="0 0 200 200">
                <circle
                  cx="100"
                  cy="100"
                  r="70"
                  fill="none"
                  stroke="#e8d3c0"
                  strokeWidth="30"
                />
                <circle
                  cx="100"
                  cy="100"
                  r="70"
                  fill="none"
                  stroke="url(#gradient)"
                  strokeWidth="30"
                  strokeDasharray={`${completionRate * 4.4} ${(100 - completionRate) * 4.4}`}
                  strokeDashoffset="0"
                  transform="rotate(-90 100 100)"
                  strokeLinecap="round"
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#3b2412" />
                    <stop offset="100%" stopColor="#b8906f" />
                  </linearGradient>
                </defs>
                <text
                  x="100"
                  y="95"
                  textAnchor="middle"
                  fontSize="36"
                  fontWeight="800"
                  fill="#3b2412"
                >
                  {completionRate}%
                </text>
                <text
                  x="100"
                  y="115"
                  textAnchor="middle"
                  fontSize="14"
                  fill="#7a5a42"
                >
                  Hoàn thành
                </text>
              </svg>
            </div>
            <div className="donut-stats">
              <div className="donut-stat">
                <div className="stat-dot completed"></div>
                <span>Đã chấm: {completedSubmissions}</span>
              </div>
              <div className="donut-stat">
                <div className="stat-dot pending"></div>
                <span>Chờ chấm: {allSubmissions.length - completedSubmissions}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="content-grid">
          {/* My Courses */}
          <div className="content-main">
            <div className="course-list-card">
              <div className="course-list-header">
                <h2 className="course-list-title">Khóa học của tôi</h2>
                <Link
                  to="/lms/teacher/courses/new"
                  className="link-add"
                >
                  + Tạo khóa học mới
                </Link>
              </div>
              <div className="course-list-content">
                {teacherCourses.length === 0 ? (
                  <EmptyState
                    icon="📚"
                    title="Chưa có khóa học nào"
                    description="Bắt đầu bằng cách tạo khóa học đầu tiên của bạn"
                    action={() => window.location.href = '/lms/teacher/courses/new'}
                    actionLabel="Tạo khóa học"
                  />
                ) : (
                  teacherCourses.map(course => {
                    const assignments = lmsData.assignments.filter(a => a.courseId === course.id);
                    const activeAssignments = assignments.filter(a => a.status === 'active').length;

                    return (
                      <div key={course.id} className="course-item">
                        <div className="course-item-content">
                          <div className="course-info">
                            <h3 className="course-title">{course.title}</h3>
                            <p className="course-description">{course.description}</p>
                            <div className="course-meta">
                              <span>👥 {course.students.length} học sinh</span>
                              <span>📝 {assignments.length} bài tập</span>
                              <span>🟢 {activeAssignments} đang hoạt động</span>
                            </div>
                          </div>
                          <div className="course-actions">
                            <Link
                              to={`/lms/teacher/courses/${course.id}?teacherId=${teacherId}`}
                              className="btn-action btn-detail"
                            >
                              Xem chi tiết
                            </Link>
                            <Link
                              to={`/lms/teacher/assignments/new?courseId=${course.id}&teacherId=${teacherId}`}
                              className="btn-action btn-assignment"
                            >
                              + Bài tập
                            </Link>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="content-sidebar">
            {/* Quick Actions */}
            <div className="quick-actions-card">
              <h3 className="quick-actions-title">Thao tác nhanh</h3>
              <div className="quick-actions-list">
                <Link
                  to={`/lms/teacher/assignments/new?type=ai-image&teacherId=${teacherId}`}
                  className="quick-action-item"
                  style={{ background: 'linear-gradient(135deg, #fdf4ff 0%, #fae8ff 100%)', borderColor: '#f0abfc' }}
                >
                  <span className="action-icon">🎨</span>
                  <div className="action-content">
                    <p className="action-title">Bài tập AI Image</p>
                    <p className="action-subtitle">Tạo ảnh bằng AI</p>
                  </div>
                </Link>

                <Link
                  to={`/lms/teacher/assignments/new?type=text&teacherId=${teacherId}`}
                  className="quick-action-item"
                  style={{ background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)', borderColor: '#93c5fd' }}
                >
                  <span className="action-icon">📝</span>
                  <div className="action-content">
                    <p className="action-title">Bài tập Viết</p>
                    <p className="action-subtitle">Luận văn, essay</p>
                  </div>
                </Link>

                <Link
                  to={`/lms/teacher/assignments/new?type=ai-video&teacherId=${teacherId}`}
                  className="quick-action-item"
                  style={{ background: 'linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)', borderColor: '#6ee7b7' }}
                >
                  <span className="action-icon">🎥</span>
                  <div className="action-content">
                    <p className="action-title">Bài tập AI Video</p>
                    <p className="action-subtitle">Tạo video bằng AI</p>
                  </div>
                </Link>

                <Link
                  to={`/lms/teacher/courses/new?teacherId=${teacherId}`}
                  className="quick-action-item"
                  style={{ background: 'linear-gradient(135deg, #f0fdfa 0%, #ccfbf1 100%)', borderColor: '#5eead4' }}
                >
                  <span className="action-icon">📚</span>
                  <div className="action-content">
                    <p className="action-title">Tạo Khóa học</p>
                    <p className="action-subtitle">Khóa học mới</p>
                  </div>
                </Link>

                <Link
                  to="/lms/teacher/quiz/new"
                  className="quick-action-item"
                  style={{ background: 'linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)', borderColor: '#fde68a' }}
                >
                  <span className="action-icon">❓</span>
                  <div className="action-content">
                    <p className="action-title">Tạo Quiz</p>
                    <p className="action-subtitle">Kiểm tra nhanh</p>
                  </div>
                </Link>
              </div>
            </div>

            {/* Recent Submissions */}
            <div className="activity-card">
              <h3 className="activity-title">Bài nộp gần đây</h3>
              <div className="activity-list">
                {recentSubmissions.length === 0 ? (
                  <p className="empty-message">Chưa có bài nộp nào</p>
                ) : (
                  recentSubmissions.map(submission => {
                    const student = lmsData.users.find(u => u.id === submission.studentId);
                    const assignment = lmsData.assignments.find(a => a.id === submission.assignmentId);

                    return (
                      <div key={submission.id} className="activity-item">
                        <div className="activity-avatar">
                          {student?.name.split(' ').pop().charAt(0)}
                        </div>
                        <div className="activity-content">
                          <p className="activity-name">
                            {student?.name}
                          </p>
                          <p className="activity-description">
                            {assignment?.title}
                          </p>
                        </div>
                        <div className="activity-meta">
                          {submission.status === 'submitted' && (
                            <span className="status-indicator submitted"></span>
                          )}
                          {submission.status === 'graded' && submission.grade !== null && (
                            <span className="grade-badge">
                              {submission.grade}/100
                            </span>
                          )}
                          <Link
                            to={`/lms/teacher/assignments/${assignment?.id}?teacherId=${teacherId}`}
                            className="btn-small"
                          >
                            Chi tiết
                          </Link>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
              {pendingGrading > 0 && (
                <Link
                  to="/lms/teacher/grading"
                  className="btn-grading"
                >
                  Chấm {pendingGrading} bài đang chờ
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;