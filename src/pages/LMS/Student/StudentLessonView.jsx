import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { lmsData } from '../../../data/lmsData';

const StudentLessonView = () => {
  const { courseId, lessonId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const studentId = searchParams.get('studentId');

  const [lesson, setLesson] = useState(null);
  const [course, setCourse] = useState(null);
  const [student, setStudent] = useState(null);
  const [completedSections, setCompletedSections] = useState(new Set());
  const [currentSection, setCurrentSection] = useState(0);
  const [showNotes, setShowNotes] = useState(false);
  const [notes, setNotes] = useState('');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Load lesson data
    const foundLesson = lmsData.lessons.find(l => l.id === parseInt(lessonId));
    const foundCourse = lmsData.courses.find(c => c.id === parseInt(courseId));
    const foundStudent = lmsData.users.find(u => u.id === parseInt(studentId));

    if (foundLesson && foundCourse && foundStudent) {
      setLesson(foundLesson);
      setCourse(foundCourse);
      setStudent(foundStudent);

      // Load saved progress (mock data)
      const savedProgress = localStorage.getItem(`lesson_progress_${studentId}_${lessonId}`);
      if (savedProgress) {
        const progressData = JSON.parse(savedProgress);
        setCompletedSections(new Set(progressData.completedSections));
        setCurrentSection(progressData.currentSection || 0);
        setNotes(progressData.notes || '');
        setProgress(progressData.progress || 0);
      }
    }
  }, [courseId, lessonId, studentId]);

  const handleSectionComplete = (sectionIndex) => {
    const newCompleted = new Set(completedSections);
    newCompleted.add(sectionIndex);
    setCompletedSections(newCompleted);

    const newProgress = (newCompleted.size / lesson.contentSections.length) * 100;
    setProgress(newProgress);

    // Save progress
    const progressData = {
      completedSections: Array.from(newCompleted),
      currentSection: currentSection,
      notes: notes,
      progress: newProgress,
      lastAccessed: new Date().toISOString()
    };
    localStorage.setItem(`lesson_progress_${studentId}_${lessonId}`, JSON.stringify(progressData));
  };

  const handleNextSection = () => {
    if (currentSection < lesson.contentSections.length - 1) {
      const nextSection = currentSection + 1;
      setCurrentSection(nextSection);

      // Auto-mark current section as complete
      handleSectionComplete(currentSection);
    }
  };

  const handlePrevSection = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
    }
  };

  const saveNotes = () => {
    const progressData = JSON.parse(localStorage.getItem(`lesson_progress_${studentId}_${lessonId}`) || '{}');
    progressData.notes = notes;
    localStorage.setItem(`lesson_progress_${studentId}_${lessonId}`, JSON.stringify(progressData));
    setShowNotes(false);
  };

  const renderContentSection = (section) => {
    switch (section.type) {
      case 'text':
        return (
          <div className="prose prose-lg max-w-none">
            <h3 className="text-2xl font-bold text-slate-800 mb-4">{section.title}</h3>
            <div className="text-slate-700 leading-relaxed whitespace-pre-line">
              {section.content}
            </div>
          </div>
        );

      case 'video':
        return (
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-slate-800">{section.title}</h3>
            <div className="aspect-video bg-slate-900 rounded-lg overflow-hidden">
              <iframe
                src={section.content.replace('youtube.com/watch?v=', 'youtube.com/embed/')}
                className="w-full h-full"
                allowFullScreen
                title={section.title}
              />
            </div>
          </div>
        );

      case 'image':
        return (
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-slate-800">{section.title}</h3>
            <img
              src={section.content}
              alt={section.title}
              className="w-full max-w-2xl mx-auto rounded-lg shadow-lg"
            />
            {section.caption && (
              <p className="text-slate-600 text-center italic">{section.caption}</p>
            )}
          </div>
        );

      case 'quiz':
        return (
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-slate-800">{section.title}</h3>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <p className="text-blue-800 mb-4">{section.content}</p>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Bắt đầu Quiz
              </button>
            </div>
          </div>
        );

      default:
        return (
          <div className="text-slate-600">
            <p>Loại nội dung không được hỗ trợ: {section.type}</p>
          </div>
        );
    }
  };

  if (!lesson || !course || !student) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Đang tải bài học...</p>
        </div>
      </div>
    );
  }

  const currentSectionData = lesson.contentSections[currentSection];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate(`/lms/student/courses/${courseId}?studentId=${studentId}`)}
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

            <div className="flex items-center space-x-4">
              {/* Progress */}
              <div className="flex items-center space-x-2">
                <span className="text-sm text-slate-600">Tiến độ:</span>
                <div className="w-32 bg-slate-200 rounded-full h-2">
                  <div
                    className="bg-green-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                <span className="text-sm font-medium text-slate-700">{Math.round(progress)}%</span>
              </div>

              {/* Notes Button */}
              <button
                onClick={() => setShowNotes(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                <span>Ghi chú</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar - Lesson Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border p-6 sticky top-24">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">Nội dung bài học</h3>
              <div className="space-y-2">
                {lesson.contentSections.map((section, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSection(index)}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors flex items-center space-x-3 ${currentSection === index
                        ? 'bg-blue-100 text-blue-700 border border-blue-200'
                        : 'hover:bg-slate-50 text-slate-700'
                      }`}
                  >
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${completedSections.has(index)
                        ? 'bg-green-600 text-white'
                        : currentSection === index
                          ? 'bg-blue-600 text-white'
                          : 'bg-slate-300 text-slate-600'
                      }`}>
                      {completedSections.has(index) ? '✓' : index + 1}
                    </div>
                    <span className="text-sm">{section.title}</span>
                  </button>
                ))}
              </div>

              {/* Learning Objectives */}
              <div className="mt-6 pt-6 border-t border-slate-200">
                <h4 className="font-medium text-slate-800 mb-3">Mục tiêu học tập</h4>
                <ul className="space-y-2">
                  {lesson.learningObjectives.map((objective, index) => (
                    <li key={index} className="text-sm text-slate-600 flex items-start space-x-2">
                      <span className="text-blue-600 mt-1">•</span>
                      <span>{objective}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Materials */}
              {lesson.materials && lesson.materials.length > 0 && (
                <div className="mt-6 pt-6 border-t border-slate-200">
                  <h4 className="font-medium text-slate-800 mb-3">Tài liệu tham khảo</h4>
                  <div className="space-y-2">
                    {lesson.materials.map((material) => (
                      <a
                        key={material.id}
                        href={material.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-sm text-blue-600 hover:text-blue-800 hover:underline"
                      >
                        📄 {material.title}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-sm border p-8">
              {/* Section Content */}
              <div className="mb-8">
                {renderContentSection(currentSectionData)}
              </div>

              {/* Section Actions */}
              <div className="flex items-center justify-between pt-6 border-t border-slate-200">
                <button
                  onClick={handlePrevSection}
                  disabled={currentSection === 0}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${currentSection === 0
                      ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                      : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                    }`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  <span>Trước đó</span>
                </button>

                <div className="flex items-center space-x-4">
                  {!completedSections.has(currentSection) && (
                    <button
                      onClick={() => handleSectionComplete(currentSection)}
                      className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Hoàn thành</span>
                    </button>
                  )}

                  <button
                    onClick={handleNextSection}
                    disabled={currentSection === lesson.contentSections.length - 1}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${currentSection === lesson.contentSections.length - 1
                        ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                      }`}
                  >
                    <span>Tiếp theo</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Notes Modal */}
      {showNotes && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-slate-800">Ghi chú của tôi</h3>
              <button
                onClick={() => setShowNotes(false)}
                className="text-slate-400 hover:text-slate-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Ghi chú của bạn về bài học này..."
              className="w-full h-32 p-3 border border-slate-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />

            <div className="flex justify-end mt-4 space-x-3">
              <button
                onClick={() => setShowNotes(false)}
                className="px-4 py-2 text-slate-600 hover:text-slate-800 transition-colors"
              >
                Hủy
              </button>
              <button
                onClick={saveNotes}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Lưu ghi chú
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentLessonView;