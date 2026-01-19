import React, { useState } from 'react';
import { motion } from 'framer-motion';

const SurveyResultsModal = ({ isOpen, onClose, surveyResult, phase }) => {
  const [activeTab, setActiveTab] = useState('analysis');

  if (!isOpen || !surveyResult) return null;

  const getPhaseInfo = () => {
    switch (phase) {
      case 'pre':
        return {
          title: 'Phân tích trước khóa học',
          description: 'Đánh giá tâm lý và chuẩn bị của học sinh',
          color: 'blue'
        };
      case 'mid':
        return {
          title: 'Phân tích giữa khóa học',
          description: 'Theo dõi tiến độ và khó khăn trong học tập',
          color: 'yellow'
        };
      case 'post':
        return {
          title: 'Phân tích sau khóa học',
          description: 'Đánh giá kết quả và hiệu quả học tập',
          color: 'green'
        };
      default:
        return {
          title: 'Kết quả khảo sát',
          description: 'Phân tích tâm lý học tập',
          color: 'gray'
        };
    }
  };

  const phaseInfo = getPhaseInfo();

  const renderAnalysisChart = () => {
    // Mock data cho biểu đồ phân tích
    const metrics = [
      { label: 'Động lực học tập', value: 75, color: 'bg-blue-500' },
      { label: 'Mức độ tự tin', value: 60, color: 'bg-green-500' },
      { label: 'Hiểu bài', value: 80, color: 'bg-purple-500' },
      { label: 'Tham gia tích cực', value: 70, color: 'bg-orange-500' },
      { label: 'Mức độ căng thẳng', value: 40, color: 'bg-red-500' }
    ];

    return (
      <div className="space-y-4">
        {metrics.map((metric, index) => (
          <div key={index} className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-700">{metric.label}</span>
              <span className="text-sm text-gray-600">{metric.value}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${metric.value}%` }}
                transition={{ duration: 1, delay: index * 0.1 }}
                className={`h-3 rounded-full ${metric.color}`}
              />
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderRecommendations = () => {
    const { aiAnalysis } = surveyResult;
    return (
      <div className="space-y-4">
        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
          <h4 className="font-semibold text-blue-800 mb-2">Tóm tắt phân tích AI</h4>
          <p className="text-blue-700 text-sm">{aiAnalysis?.summary}</p>
        </div>

        <div className="space-y-3">
          <h4 className="font-semibold text-gray-800">Khuyến nghị cụ thể:</h4>
          {aiAnalysis?.recommendations?.map((rec, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg border border-green-200"
            >
              <div className="flex-shrink-0 w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                {index + 1}
              </div>
              <p className="text-green-800 text-sm">{rec}</p>
            </motion.div>
          ))}
        </div>

        {aiAnalysis?.riskFactors?.length > 0 && (
          <div className="space-y-3">
            <h4 className="font-semibold text-gray-800">Yếu tố cần chú ý:</h4>
            {aiAnalysis.riskFactors.map((risk, index) => (
              <div
                key={index}
                className="flex items-start space-x-3 p-3 bg-yellow-50 rounded-lg border border-yellow-200"
              >
                <div className="flex-shrink-0">
                  <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="text-yellow-800 text-sm">{risk}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  const renderRawData = () => {
    return (
      <div className="space-y-4">
        <h4 className="font-semibold text-gray-800">Dữ liệu khảo sát thô:</h4>
        <div className="bg-gray-50 rounded-lg p-4 max-h-96 overflow-y-auto">
          <pre className="text-sm text-gray-700">
            {JSON.stringify(surveyResult.answers, null, 2)}
          </pre>
        </div>

        <div className="text-xs text-gray-500">
          <p>Thời gian: {new Date(surveyResult.timestamp).toLocaleString('vi-VN')}</p>
          <p>ID khảo sát: {surveyResult.id}</p>
          <p>Giai đoạn: {phase}</p>
        </div>
      </div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className={`p-6 bg-gradient-to-r from-${phaseInfo.color}-500 to-${phaseInfo.color}-600 text-white`}>
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">{phaseInfo.title}</h2>
              <p className="opacity-90">{phaseInfo.description}</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'analysis', label: 'Phân tích AI', icon: '🤖' },
              { id: 'chart', label: 'Biểu đồ', icon: '📊' },
              { id: 'data', label: 'Dữ liệu thô', icon: '📋' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? `border-${phaseInfo.color}-500 text-${phaseInfo.color}-600`
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {activeTab === 'analysis' && renderRecommendations()}
          {activeTab === 'chart' && renderAnalysisChart()}
          {activeTab === 'data' && renderRawData()}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 bg-gray-50">
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-600">
              <p>Phân tích được tạo bởi AI dựa trên dữ liệu khảo sát tâm lý học tập</p>
            </div>
            <div className="flex gap-3">
              <button className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors">
                Xuất báo cáo
              </button>
              <button
                onClick={onClose}
                className={`px-6 py-2 bg-${phaseInfo.color}-500 text-white rounded-lg hover:bg-${phaseInfo.color}-600 transition-colors`}
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default SurveyResultsModal;
