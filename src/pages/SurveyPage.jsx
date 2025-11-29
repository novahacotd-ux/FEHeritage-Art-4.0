import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import SurveyManager from '../components/survey/SurveyManager';

const SurveyPage = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();

  // Mock data - trong thực tế sẽ lấy từ API
  const courseData = {
    'khoa-hoc-1': {
      name: 'AI và Di sản Văn hóa Việt Nam',
      description: 'Khám phá ứng dụng AI trong bảo tồn và phát triển di sản văn hóa',
      instructor: 'TS. Nguyễn Văn A',
      duration: '8 tuần',
      progress: 45
    },
    'khoa-hoc-2': {
      name: 'Lịch sử Kiến trúc Cổ đại',
      description: 'Tìm hiểu về kiến trúc cổ đại Việt Nam qua các thời kỳ',
      instructor: 'ThS. Trần Thị B',
      duration: '6 tuần',
      progress: 70
    },
    'khoa-hoc-3': {
      name: 'Nghệ thuật Truyền thống',
      description: 'Khám phá các loại hình nghệ thuật truyền thống của Việt Nam',
      instructor: 'GS. Lê Văn C',
      duration: '10 tuần',
      progress: 20
    }
  };

  const course = courseData[courseId];

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Không tìm thấy khóa học</h2>
          <button
            onClick={() => navigate('/giaoduc')}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Quay lại trang giáo dục
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/giaoduc')}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">{course.name}</h1>
                <p className="text-gray-600 mt-1">{course.description}</p>
              </div>
            </div>

            <div className="text-right">
              <div className="text-sm text-gray-600">Tiến độ khóa học</div>
              <div className="flex items-center space-x-2 mt-1">
                <div className="w-32 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full transition-all"
                    style={{ width: `${course.progress}%` }}
                  />
                </div>
                <span className="text-sm font-medium text-gray-700">{course.progress}%</span>
              </div>
            </div>
          </div>

          {/* Course Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 text-sm">
            <div className="flex items-center space-x-2">
              <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span className="text-gray-600">Giảng viên: <span className="font-medium">{course.instructor}</span></span>
            </div>
            <div className="flex items-center space-x-2">
              <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-gray-600">Thời lượng: <span className="font-medium">{course.duration}</span></span>
            </div>
            <div className="flex items-center space-x-2">
              <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-gray-600">Trạng thái: <span className="font-medium text-green-600">Đang học</span></span>
            </div>
          </div>
        </div>
      </div>

      {/* Survey Manager */}
      <SurveyManager
        courseId={courseId}
        courseName={course.name}
      />
    </div>
  );
};

export default SurveyPage;
