import React, { useState, useEffect } from 'react';
import PsychologicalSurvey from './PsychologicalSurvey';
import SurveyResultsModal from './SurveyResultsModal';

const SurveyManager = ({ courseId, courseName }) => {
  const [surveys, setSurveys] = useState({});
  const [activeSurvey, setActiveSurvey] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [selectedResult, setSelectedResult] = useState(null);

  useEffect(() => {
    // Load existing surveys from localStorage
    const savedSurveys = localStorage.getItem(`surveys_${courseId}`);
    if (savedSurveys) {
      setSurveys(JSON.parse(savedSurveys));
    }
  }, [courseId]);

  const saveSurveys = (newSurveys) => {
    setSurveys(newSurveys);
    localStorage.setItem(`surveys_${courseId}`, JSON.stringify(newSurveys));
  };

  const handleSurveyComplete = (result) => {
    const newSurveys = {
      ...surveys,
      [result.phase]: result
    };
    saveSurveys(newSurveys);
    setActiveSurvey(null);
    setSelectedResult(result);
    setShowResults(true);
  };

  const openSurvey = (phase) => {
    setActiveSurvey(phase);
  };

  const viewResults = (phase) => {
    const result = surveys[phase];
    if (result) {
      setSelectedResult(result);
      setShowResults(true);
    }
  };

  const getSurveyStatus = (phase) => {
    return surveys[phase] ? 'completed' : 'pending';
  };

  const getPhaseInfo = (phase) => {
    const info = {
      pre: {
        title: 'Khảo sát đầu khóa học',
        description: 'Đánh giá tâm lý và sự chuẩn bị trước khi bắt đầu',
        icon: '🎯',
        color: 'blue',
        timing: 'Thực hiện trước khi bắt đầu học'
      },
      mid: {
        title: 'Khảo sát giữa khóa học',
        description: 'Theo dõi tiến độ và khó khăn trong quá trình học',
        icon: '📈',
        color: 'yellow',
        timing: 'Thực hiện ở giữa khóa học (50% tiến độ)'
      },
      post: {
        title: 'Khảo sát cuối khóa học',
        description: 'Đánh giá kết quả và phản hồi sau khi hoàn thành',
        icon: '🎉',
        color: 'green',
        timing: 'Thực hiện sau khi hoàn thành khóa học'
      }
    };
    return info[phase];
  };

  const renderSurveyCard = (phase) => {
    const status = getSurveyStatus(phase);
    const phaseInfo = getPhaseInfo(phase);
    const result = surveys[phase];

    return (
      <div
        key={phase}
        className={`border-2 rounded-xl p-6 transition-all duration-300 ${
          status === 'completed' 
            ? `border-${phaseInfo.color}-300 bg-${phaseInfo.color}-50` 
            : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'
        }`}
      >
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl ${
              status === 'completed' 
                ? `bg-${phaseInfo.color}-500 text-white` 
                : 'bg-gray-100'
            }`}>
              {status === 'completed' ? '✓' : phaseInfo.icon}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                {phaseInfo.title}
              </h3>
              <p className="text-sm text-gray-600">{phaseInfo.description}</p>
            </div>
          </div>

          {status === 'completed' && (
            <div className={`px-3 py-1 rounded-full text-xs font-medium bg-${phaseInfo.color}-100 text-${phaseInfo.color}-800`}>
              Hoàn thành
            </div>
          )}
        </div>

        <div className="mb-4">
          <p className="text-sm text-gray-500 mb-2">
            <span className="font-medium">Thời điểm:</span> {phaseInfo.timing}
          </p>
          {result && (
            <p className="text-sm text-gray-500">
              <span className="font-medium">Hoàn thành lúc:</span> {' '}
              {new Date(result.timestamp).toLocaleString('vi-VN')}
            </p>
          )}
        </div>

        <div className="flex space-x-3">
          {status === 'pending' ? (
            <button
              onClick={() => openSurvey(phase)}
              className={`flex-1 py-2 px-4 bg-${phaseInfo.color}-500 text-white rounded-lg hover:bg-${phaseInfo.color}-600 transition-colors font-medium`}
            >
              Bắt đầu khảo sát
            </button>
          ) : (
            <>
              <button
                onClick={() => viewResults(phase)}
                className={`flex-1 py-2 px-4 bg-${phaseInfo.color}-500 text-white rounded-lg hover:bg-${phaseInfo.color}-600 transition-colors font-medium`}
              >
                Xem kết quả
              </button>
              <button
                onClick={() => openSurvey(phase)}
                className="py-2 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Làm lại
              </button>
            </>
          )}
        </div>
      </div>
    );
  };

  const getOverallProgress = () => {
    const completed = Object.keys(surveys).length;
    const total = 3;
    return Math.round((completed / total) * 100);
  };

  const generateProgressReport = () => {
    const completedSurveys = Object.values(surveys);
    if (completedSurveys.length === 0) return null;

    return {
      totalSurveys: completedSurveys.length,
      averageMotivation: 75, // Mock data - tính từ kết quả thực tế
      riskLevel: 'Thấp',
      recommendations: [
        'Duy trì phương pháp học tập hiện tại',
        'Tăng cường thực hành',
        'Tham gia thảo luận nhóm nhiều hơn'
      ]
    };
  };

  const progressReport = generateProgressReport();

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          Khảo sát tâm lý học tập
        </h2>
        <p className="text-gray-600 mb-4">
          Khóa học: <span className="font-medium">{courseName}</span>
        </p>

        {/* Overall Progress */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Tiến độ tổng thể</h3>
            <span className="text-2xl font-bold text-blue-600">{getOverallProgress()}%</span>
          </div>

          <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
            <div
              className="bg-gradient-to-r from-blue-500 to-green-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${getOverallProgress()}%` }}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="text-center">
              <div className="font-semibold text-gray-800">Khảo sát hoàn thành</div>
              <div className="text-2xl font-bold text-blue-600">{Object.keys(surveys).length}/3</div>
            </div>
            {progressReport && (
              <>
                <div className="text-center">
                  <div className="font-semibold text-gray-800">Mức độ động lực</div>
                  <div className="text-2xl font-bold text-green-600">{progressReport.averageMotivation}%</div>
                </div>
                <div className="text-center">
                  <div className="font-semibold text-gray-800">Mức độ rủi ro</div>
                  <div className={`text-2xl font-bold ${
                    progressReport.riskLevel === 'Thấp' ? 'text-green-600' : 
                    progressReport.riskLevel === 'Trung bình' ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    {progressReport.riskLevel}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* AI Insights Panel */}
      {progressReport && (
        <div className="mb-8 bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-xl p-6">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center mr-3">
              <span className="text-white text-lg">🤖</span>
            </div>
            <h3 className="text-lg font-semibold text-purple-800">Thông tin từ AI</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-purple-700 mb-2">Khuyến nghị học tập:</h4>
              <ul className="space-y-1">
                {progressReport.recommendations.map((rec, index) => (
                  <li key={index} className="text-sm text-purple-600 flex items-start">
                    <span className="mr-2">•</span>
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-medium text-purple-700 mb-2">Dự đoán xu hướng:</h4>
              <div className="text-sm text-purple-600">
                <p>Dựa trên dữ liệu hiện tại, bạn có khả năng cao hoàn thành khóa học thành công với mức độ hài lòng tốt.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Survey Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {['pre', 'mid', 'post'].map(renderSurveyCard)}
      </div>

      {/* Additional Actions */}
      <div className="bg-gray-50 rounded-xl p-6 text-center">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          Cần hỗ trợ thêm?
        </h3>
        <p className="text-gray-600 mb-4">
          Liên hệ với giảng viên hoặc tư vấn viên học tập để được hỗ trợ cá nhân hóa
        </p>
        <div className="flex justify-center space-x-4">
          <button className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
            Liên hệ giảng viên
          </button>
          <button className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
            Tư vấn học tập
          </button>
        </div>
      </div>

      {/* Survey Modal */}
      <PsychologicalSurvey
        courseId={courseId}
        phase={activeSurvey}
        onComplete={handleSurveyComplete}
        isOpen={!!activeSurvey}
        onClose={() => setActiveSurvey(null)}
      />

      {/* Results Modal */}
      <SurveyResultsModal
        isOpen={showResults}
        onClose={() => setShowResults(false)}
        surveyResult={selectedResult}
        phase={selectedResult?.phase}
      />
    </div>
  );
};

export default SurveyManager;
