import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function BaiGiangMinhHoa() {
  const navigate = useNavigate();
  const [selectedSidebar, setSelectedSidebar] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [completedLessons, setCompletedLessons] = useState(new Set([1, 3]));

  // Survey Modal States
  const [showSurveyModal, setShowSurveyModal] = useState(false);
  const [currentSurveyType, setCurrentSurveyType] = useState(null);
  const [currentLessonId, setCurrentLessonId] = useState(null);
  const [surveyStep, setSurveyStep] = useState(0);

  const sidebarItems = [
    { id: 'all', label: 'Tất cả nội dung', count: '245', filter: 'all' },
    { id: 'ai', label: 'AI cơ bản', count: '67', filter: 'AI' },
    { id: 'history', label: 'Lịch sử Việt Nam', count: '89', filter: 'Lịch sử' },
    { id: 'culture', label: 'Văn hóa số', count: '89', filter: 'Chuyên đề' },
    { id: 'research', label: 'Nghiên cứu', count: '34', filter: 'Nghiên cứu' }
  ];

  const progressData = [
    { label: 'AI Cơ bản', progress: 75 },
    { label: 'Lịch sử Việt Nam', progress: 45 },
    { label: 'Văn hóa Số', progress: 90 }
  ];

  const allLessons = [
    {
      id: 1,
      title: 'Hệ thống AI với tiếng Việt - Nghệ thuật dân gian',
      description: 'Tìm hiểu về ứng dụng AI trong việc phân tích và tái tạo nghệ thuật dân gian Việt Nam qua các thuật toán machine learning hiện đại.',
      type: 'AI',
      difficulty: 'Cơ bản',
      duration: '45 phút',
      shortCode: 'AI',
      bgColor: 'from-blue-500 to-indigo-600',
      students: 1234,
      rating: 4.8,
      category: 'AI',
      isCompleted: true,
      progress: 100
    },
    {
      id: 2,
      title: 'Quizz - Kiểm thử năng lực tư duy sáng tạo',
      description: 'Bài kiểm tra tương tác đánh giá khả năng tư duy sáng tạo và hiểu biết về văn hóa truyền thống qua các câu hỏi thực tế.',
      type: 'Quizz',
      difficulty: 'Trung bình',
      duration: '30 phút',
      shortCode: 'Q',
      bgColor: 'from-purple-500 to-pink-600',
      students: 876,
      rating: 4.6,
      category: 'Quiz',
      isCompleted: false,
      progress: 60
    },
    {
      id: 3,
      title: 'Nghiên cứu - Lịch sử Việt Nam thời kỳ phong kiến',
      description: 'Nghiên cứu sâu về thời kỳ phong kiến Việt Nam từ thế kỷ X đến thế kỷ XIX, phân tích các triều đại, chính sách cai trị và ảnh hưởng văn hóa.',
      type: 'Nghiên cứu',
      difficulty: 'Nâng cao',
      duration: '90 phút',
      shortCode: 'HS',
      bgColor: 'from-amber-500 to-orange-600',
      students: 543,
      rating: 4.9,
      category: 'Lịch sử',
      isCompleted: true,
      progress: 100
    },
    {
      id: 4,
      title: 'Thực hành - Tạo nội dung số cho di sản',
      description: 'Hướng dẫn thực hành tạo ra các sản phẩm số hóa di sản văn hóa sử dụng các công cụ AI và VR tiên tiến.',
      type: 'Thực hành',
      difficulty: 'Nâng cao',
      duration: '120 phút',
      shortCode: 'SP',
      bgColor: 'from-orange-500 to-red-600',
      students: 234,
      rating: 4.7,
      category: 'Thực hành',
      isCompleted: false,
      progress: 25
    },
    {
      id: 5,
      title: 'Chuyên đề - AI trong âm nhạc dân tộc',
      description: 'Khám phá ứng dụng trí tuệ nhân tạo trong phân tích, sáng tác và bảo tồn âm nhạc dân tộc Việt Nam.',
      type: 'Chuyên đề',
      difficulty: 'Trung bình',
      duration: '60 phút',
      shortCode: 'MU',
      bgColor: 'from-indigo-500 to-blue-600',
      students: 789,
      rating: 4.5,
      category: 'Chuyên đề',
      isCompleted: false,
      progress: 0
    },
    {
      id: 6,
      title: 'Workshop - Nghiên cứu lịch sử địa phương',
      description: 'Workshop thực hành thu thập và phân tích tài liệu lịch sử địa phương, học cách bảo tồn và phát huy giá trị di sản văn hóa cộng đồng.',
      type: 'Workshop',
      difficulty: 'Nâng cao',
      duration: '180 phút',
      shortCode: 'LH',
      bgColor: 'from-blue-500 to-indigo-600',
      students: 156,
      rating: 4.8,
      category: 'Lịch sử',
      isCompleted: false,
      progress: 15
    },
    {
      id: 7,
      title: 'AI Painting - Tái tạo tranh cổ Huế',
      description: 'Sử dụng AI để phân tích và tái tạo các tác phẩm hội họa cổ Huế, học cách ứng dụng GAN và style transfer.',
      type: 'AI',
      difficulty: 'Cơ bản',
      duration: '50 phút',
      shortCode: 'AP',
      bgColor: 'from-rose-500 to-orange-500',
      students: 2134,
      rating: 4.9,
      category: 'AI',
      isCompleted: false,
      progress: 0
    },
    {
      id: 8,
      title: 'Khám phá - Các di tích lịch sử Việt Nam',
      description: 'Khám phá các di tích lịch sử quan trọng của Việt Nam từ Kinh đô Huế, Hoàng thành Thăng Long đến các đền đài lịch sử, hiểu giá trị văn hóa và ý nghĩa lịch sử.',
      type: 'Khám phá',
      difficulty: 'Cơ bản',
      duration: '40 phút',
      shortCode: 'DT',
      bgColor: 'from-emerald-500 to-teal-500',
      students: 987,
      rating: 4.7,
      category: 'Lịch sử',
      isCompleted: false,
      progress: 80
    }
  ];

  // Survey Questions Database
  const surveyQuestions = {
    pre: {
      title: "Khảo sát Cá nhân hóa Ban đầu",
      subtitle: "Giúp chúng tôi hiểu phong cách học và tâm lý học tập của bạn",
      icon: "🎯",
      color: "from-purple-500 to-purple-600",
      questions: [
        {
          id: "learning_style",
          type: "multiple",
          question: "Bạn học tốt nhất khi:",
          options: [
            { value: "visual", label: "Nhìn hình ảnh, sơ đồ, video", icon: "👁️" },
            { value: "auditory", label: "Nghe giảng, thảo luận", icon: "👂" },
            { value: "kinesthetic", label: "Thực hành, vận động", icon: "✋" },
            { value: "reading", label: "Đọc văn bản, ghi chú", icon: "📚" }
          ]
        },
        {
          id: "personality",
          type: "scale",
          question: "Mức độ tự tin khi học bài mới:",
          min: 1, max: 5,
          labels: { 1: "Rất lo lắng", 5: "Rất tự tin" }
        },
        {
          id: "motivation",
          type: "multiple",
          question: "Động lực học tập chính của bạn:",
          options: [
            { value: "career", label: "Phát triển sự nghiệp", icon: "💼" },
            { value: "interest", label: "Đam mê cá nhân", icon: "❤️" },
            { value: "requirement", label: "Yêu cầu công việc", icon: "📋" },
            { value: "curiosity", label: "Tò mò khám phá", icon: "🔍" }
          ]
        },
        {
          id: "pace",
          type: "multiple",
          question: "Tốc độ học tập ưa thích:",
          options: [
            { value: "slow", label: "Từ từ, kỹ càng", icon: "🐌" },
            { value: "moderate", label: "Vừa phải", icon: "🚶" },
            { value: "fast", label: "Nhanh, hiệu quả", icon: "🏃" }
          ]
        },
        {
          id: "stress_level",
          type: "scale",
          question: "Mức độ căng thẳng khi học:",
          min: 1, max: 5,
          labels: { 1: "Rất thư giãn", 5: "Rất căng thẳng" }
        }
      ]
    },
    mid: {
      title: "Khảo sát Tiến độ Giữa kỳ",
      subtitle: "Đánh giá quá trình học và điều chỉnh phương pháp",
      icon: "📊",
      color: "from-orange-500 to-orange-600",
      questions: [
        {
          id: "difficulty_areas",
          type: "checkbox",
          question: "Những phần bạn thấy khó nhất:",
          options: [
            { value: "concepts", label: "Hiểu khái niệm", icon: "🧠" },
            { value: "practice", label: "Làm bài tập", icon: "✍️" },
            { value: "memory", label: "Ghi nhớ thông tin", icon: "🧩" },
            { value: "application", label: "Ứng dụng thực tế", icon: "⚡" }
          ]
        },
        {
          id: "progress_satisfaction",
          type: "scale",
          question: "Mức độ hài lòng với tiến độ học tập:",
          min: 1, max: 5,
          labels: { 1: "Rất không hài lòng", 5: "Rất hài lòng" }
        },
        {
          id: "method_effectiveness",
          type: "scale",
          question: "Phương pháp hiện tại có hiệu quả không:",
          min: 1, max: 5,
          labels: { 1: "Không hiệu quả", 5: "Rất hiệu quả" }
        },
        {
          id: "support_needed",
          type: "checkbox",
          question: "Bạn cần hỗ trợ thêm về:",
          options: [
            { value: "explanation", label: "Giải thích chi tiết hơn", icon: "💡" },
            { value: "examples", label: "Thêm ví dụ thực tế", icon: "📝" },
            { value: "practice", label: "Bài tập luyện tập", icon: "🎯" },
            { value: "interaction", label: "Tương tác trực tiếp", icon: "🤝" }
          ]
        }
      ]
    },
    post: {
      title: "Khảo sát Đánh giá Cuối khóa",
      subtitle: "Đánh giá cải thiện và hiệu quả học tập tổng thể",
      icon: "🎉",
      color: "from-green-500 to-green-600",
      questions: [
        {
          id: "knowledge_improvement",
          type: "scale",
          question: "Mức độ cải thiện kiến thức sau khóa học:",
          min: 1, max: 5,
          labels: { 1: "Không cải thiện", 5: "Cải thiện rất nhiều" }
        },
        {
          id: "confidence_change",
          type: "scale",
          question: "Sự tự tin của bạn đã thay đổi thế nào:",
          min: 1, max: 5,
          labels: { 1: "Giảm đáng kể", 5: "Tăng đáng kể" }
        },
        {
          id: "method_satisfaction",
          type: "scale",
          question: "Mức độ hài lòng với phương pháp cá nhân hóa:",
          min: 1, max: 5,
          labels: { 1: "Rất không hài lòng", 5: "Rất hài lòng" }
        },
        {
          id: "recommendation",
          type: "scale",
          question: "Khả năng giới thiệu cho bạn bè:",
          min: 1, max: 5,
          labels: { 1: "Chắc chắn không", 5: "Chắc chắn có" }
        },
        {
          id: "future_goals",
          type: "checkbox",
          question: "Mục tiêu tiếp theo của bạn:",
          options: [
            { value: "advanced", label: "Học nâng cao hơn", icon: "🚀" },
            { value: "practice", label: "Thực hành nhiều hơn", icon: "💪" },
            { value: "apply", label: "Ứng dụng vào công việc", icon: "💼" },
            { value: "teach", label: "Chia sẻ cho người khác", icon: "🎓" }
          ]
        }
      ]
    }
  };

  // 3-Phase Personalized Learning Survey System (Raw Data Demo)
  const [surveyData] = useState({
    lessons: [
      {
        id: 1,
        progress: 100,
        studyTimeToday: 45,
        totalStudyTime: 180,
        quizAttempts: 3,
        performance: 88,
        enrollmentDate: Date.now() - 7 * 24 * 60 * 60 * 1000, // 7 days ago

        // 3-Phase Survey Status
        surveyPhases: {
          pre: {
            completed: true,
            completedAt: Date.now() - 6 * 24 * 60 * 60 * 1000,
            learningStyle: "Visual", // Học qua hình ảnh
            personality: "Methodical", // Có phương pháp
            motivation: "Career Growth", // Động lực phát triển nghề nghiệp
            preferredPace: "Medium", // Tốc độ học vừa phải
            psychologyProfile: "Confident but needs structure" // Tâm lý học tập
          },
          mid: {
            completed: true,
            completedAt: Date.now() - 3 * 24 * 60 * 60 * 1000,
            knowledgeGaps: ["Advanced Concepts"], // Khoảng trống kiến thức
            strugglingAreas: [], // Khu vực khó khăn
            strongAreas: ["Basics", "Practical Application"], // Điểm mạnh
            adjustmentsMade: "Added more visual examples", // Điều chỉnh đã thực hiện
            psychologyUpdate: "More confident, requires less guidance" // Cập nhật tâm lý
          },
          post: {
            completed: false,
            shouldTrigger: true, // Sẵn sàng cho khảo sát cuối
            targetAssessments: {
              psychologyImprovement: null, // Cải thiện tâm lý
              learningMethodEffectiveness: null, // Hiệu quả phương pháp học
              skillMastery: null, // Mức độ thành thạo
              personalGrowth: null, // Phát triển cá nhân
              overallSatisfaction: null
            }
          }
        },

        // AI Personalization Results from Surveys
        personalizedMethod: {
          current: "Visual + Interactive + Historical Analysis",
          effectiveness: 92, // Hiệu quả 92%
          adaptations: ["More historical maps", "Timeline visualizations", "Primary source analysis"]
        },

        aiStatus: "Ready for Final Assessment",
        shouldTriggerSurvey: true,
        nextSurveyType: "post",
        lastActivity: Date.now() - 30 * 60000
      },
      {
        id: 2,
        progress: 55,
        studyTimeToday: 35,
        totalStudyTime: 120,
        quizAttempts: 2,
        performance: 75,
        enrollmentDate: Date.now() - 4 * 24 * 60 * 60 * 1000, // 4 days ago

        surveyPhases: {
          pre: {
            completed: true,
            completedAt: Date.now() - 4 * 24 * 60 * 60 * 1000,
            learningStyle: "Kinesthetic", // Học qua thực hành
            personality: "Exploratory", // Thích khám phá
            motivation: "Personal Interest", // Sở thích cá nhân
            preferredPace: "Fast", // Tốc độ nhanh
            psychologyProfile: "Eager but impatient, needs engagement"
          },
          mid: {
            completed: false,
            shouldTrigger: true, // Sẵn sàng khảo sát giữa kỳ
            targetAssessments: {
              knowledgeGaps: null, // Sẽ đánh giá khoảng trống kiến thức
              strugglingAreas: null, // Sẽ xác định khu vực khó khăn  
              learningPaceAdjustment: null, // Điều chỉnh tốc độ học
              engagementLevel: null, // Mức độ tương tác
              psychologyChanges: null // Thay đổi tâm lý
            }
          },
          post: { completed: false, shouldTrigger: false }
        },

        personalizedMethod: {
          current: "Hands-on + Fast-paced + Historical Research",
          effectiveness: 78, // Đang điều chỉnh
          adaptations: ["More historical field work", "Archival research", "Oral history interviews"]
        },

        aiStatus: "Mid-Progress Assessment Due",
        shouldTriggerSurvey: true,
        nextSurveyType: "mid",
        lastActivity: Date.now() - 10 * 60000
      },
      {
        id: 3,
        progress: 100,
        studyTimeToday: 90,
        totalStudyTime: 320,
        quizAttempts: 4,
        performance: 95,
        enrollmentDate: Date.now() - 14 * 24 * 60 * 60 * 1000, // 2 weeks ago

        surveyPhases: {
          pre: {
            completed: true,
            completedAt: Date.now() - 14 * 24 * 60 * 60 * 1000,
            learningStyle: "Auditory + Reading", // Học qua nghe và đọc
            personality: "Analytical", // Có tính phân tích
            motivation: "Academic Excellence", // Xuất sắc về học thuật
            preferredPace: "Slow & Thorough", // Chậm và kỹ lưỡng
            psychologyProfile: "Perfectionist, high standards, needs detailed feedback"
          },
          mid: {
            completed: true,
            completedAt: Date.now() - 7 * 24 * 60 * 60 * 1000,
            knowledgeGaps: [], // Không có khoảng trống
            strugglingAreas: [], // Không có khó khăn
            strongAreas: ["All Areas"], // Giỏi tất cả
            adjustmentsMade: "Provided advanced materials and detailed explanations",
            psychologyUpdate: "Extremely confident, ready for leadership roles"
          },
          post: {
            completed: true,
            completedAt: Date.now() - 1 * 24 * 60 * 60 * 1000,
            assessmentResults: {
              psychologyImprovement: "Outstanding - From perfectionist anxiety to confident mastery",
              learningMethodEffectiveness: "Perfect match - 98% satisfaction",
              skillMastery: "Expert Level - Ready to teach others",
              personalGrowth: "Exceptional leadership potential developed",
              overallSatisfaction: 9.8
            }
          }
        },

        personalizedMethod: {
          current: "Deep Reading + Audio Lectures + Historical Analysis",
          effectiveness: 98, // Hoàn hảo
          adaptations: ["Advanced historical texts", "Primary source documents", "Historical research projects"]
        },

        aiStatus: "Mastered - Exceptional Results",
        shouldTriggerSurvey: false,
        nextSurveyType: "completed",
        lastActivity: Date.now() - 60 * 60000
      },
      {
        id: 4,
        progress: 15,
        studyTimeToday: 25,
        totalStudyTime: 45,
        quizAttempts: 1,
        performance: 68,
        enrollmentDate: Date.now() - 2 * 24 * 60 * 60 * 1000, // 2 days ago

        surveyPhases: {
          pre: {
            completed: true,
            completedAt: Date.now() - 2 * 24 * 60 * 60 * 1000,
            learningStyle: "Visual + Interactive", // Trực quan và tương tác
            personality: "Creative", // Sáng tạo
            motivation: "Skill Building", // Xây dựng kỹ năng
            preferredPace: "Variable", // Tốc độ thay đổi
            psychologyProfile: "Creative but easily distracted, needs variety"
          },
          mid: {
            completed: false,
            shouldTrigger: false, // Chưa đủ tiến độ
            willTriggerAt: "50% progress" // Sẽ kích hoạt ở 50%
          },
          post: { completed: false, shouldTrigger: false }
        },

        personalizedMethod: {
          current: "Visual Diagrams + Interactive Demos + Historical Projects",
          effectiveness: 72, // Đang tối ưu hóa
          adaptations: ["More historical timelines", "Interactive maps", "Historical reenactment activities"]
        },

        aiStatus: "Learning - Method Optimizing",
        shouldTriggerSurvey: false,
        nextSurveyType: "mid", // Sẽ kích hoạt khi đạt 50%
        lastActivity: Date.now() - 45 * 60000
      },
      {
        id: 5,
        progress: 0,
        studyTimeToday: 0,
        totalStudyTime: 0,
        quizAttempts: 0,
        performance: 0,
        enrollmentDate: Date.now() - 1 * 60 * 60 * 1000, // 1 hour ago

        surveyPhases: {
          pre: {
            completed: false,
            shouldTrigger: true, // Cần khảo sát ban đầu ngay
            targetAssessments: {
              learningStyle: null, // Xác định phong cách học
              personality: null, // Đánh giá tính cách
              motivation: null, // Tìm hiểu động lực
              preferredPace: null, // Tốc độ học ưa thích
              psychologyProfile: null, // Profile tâm lý học tập
              learningConcerns: null, // Những lo lắng về học tập
              previousExperience: null // Kinh nghiệm trước đó
            }
          },
          mid: { completed: false, shouldTrigger: false },
          post: { completed: false, shouldTrigger: false }
        },

        personalizedMethod: {
          current: "Default - Awaiting Personalization",
          effectiveness: null,
          adaptations: ["Complete pre-learning survey for personalization"]
        },

        aiStatus: "Pre-Learning Survey Required",
        shouldTriggerSurvey: true,
        nextSurveyType: "pre",
        lastActivity: null
      }
    ]
  });

  // Handle 3-Phase Survey System
  const handlePhasesSurvey = (lessonId, surveyType, phaseType) => {
    const lesson = surveyData.lessons.find(l => l.id === lessonId);
    const lessonContent = allLessons.find(l => l.id === lessonId);

    // If user wants to take survey, open modal
    if (surveyType === 'trigger') {
      setCurrentLessonId(lessonId);
      setCurrentSurveyType(phaseType);
      setSurveyStep(0);
      setShowSurveyModal(true);
      return;
    }

    const phaseDescriptions = {
      pre: "Khảo sát Cá nhân hóa Ban đầu - Đánh giá phong cách học, tính cách, tâm lý và động lực",
      mid: "Khảo sát Giữa kỳ - Đánh giá tiến độ, khoảng trống kiến thức, điều chỉnh phương pháp",
      post: "Khảo sát Cuối khóa - Đánh giá cải thiện tâm lý, hiệu quả học tập và sự hài lòng"
    };

    console.log('📋 3-Phase Personalized Learning Survey:', {
      lessonId,
      lessonTitle: lessonContent.title,
      surveyType,
      phaseType,
      currentPhase: lesson.surveyPhases[phaseType],
      personalizedMethod: lesson.personalizedMethod,
      phaseDescription: phaseDescriptions[phaseType],
      studentProgress: {
        overall: lesson.progress,
        studyTime: lesson.totalStudyTime,
        performance: lesson.performance,
        daysSinceEnrollment: Math.floor((Date.now() - lesson.enrollmentDate) / (24 * 60 * 60 * 1000))
      },
      aiPersonalization: {
        currentEffectiveness: lesson.personalizedMethod.effectiveness,
        adaptationsMade: lesson.personalizedMethod.adaptations
      },
      timestamp: new Date().toISOString()
    });

    alert(`📋 ${phaseDescriptions[phaseType]}\n\n` +
      `Bài học: ${lessonContent.title}\n` +
      `Giai đoạn: ${phaseType.toUpperCase()}\n` +
      `Hiệu quả hiện tại: ${lesson.personalizedMethod.effectiveness || 'Chưa xác định'}%\n` +
      `Phương pháp: ${lesson.personalizedMethod.current}\n\n` +
      `Kiểm tra console để xem chi tiết dữ liệu khảo sát!`);
  };

  // Filter lessons based on selected category
  const lessons = selectedCategory === 'all'
    ? allLessons
    : allLessons.filter(lesson => {
      const item = sidebarItems.find(item => item.id === selectedCategory);
      return item ? lesson.type.includes(item.filter) || lesson.category === item.filter : true;
    });

  // Survey Modal Component
  const SurveyModal = () => {
    if (!showSurveyModal || !currentSurveyType) return null;

    const currentSurvey = surveyQuestions[currentSurveyType];
    const currentQuestion = currentSurvey.questions[surveyStep];
    const totalQuestions = currentSurvey.questions.length;
    const progress = ((surveyStep + 1) / totalQuestions) * 100;

    const handleAnswer = (answer) => {
      console.log('Survey Answer:', {
        lessonId: currentLessonId,
        surveyType: currentSurveyType,
        questionId: currentQuestion.id,
        answer: answer,
        step: surveyStep + 1,
        total: totalQuestions
      });

      // Move to next question or finish survey
      if (surveyStep < totalQuestions - 1) {
        setSurveyStep(surveyStep + 1);
      } else {
        // Survey completed
        alert(`🎉 Hoàn thành ${currentSurvey.title}!\n\nCảm ơn bạn đã tham gia khảo sát. Hệ thống AI sẽ cá nhân hóa phương pháp học phù hợp với bạn.`);
        setShowSurveyModal(false);
        setCurrentSurveyType(null);
        setCurrentLessonId(null);
        setSurveyStep(0);
      }
    };

    const handleClose = () => {
      setShowSurveyModal(false);
      setCurrentSurveyType(null);
      setCurrentLessonId(null);
      setSurveyStep(0);
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
          {/* Header */}
          <div className={`bg-gradient-to-r ${currentSurvey.color} p-6 text-white`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <span className="text-3xl">{currentSurvey.icon}</span>
                <div>
                  <h2 className="text-xl font-bold">{currentSurvey.title}</h2>
                  <p className="text-sm opacity-90">{currentSurvey.subtitle}</p>
                </div>
              </div>
              <button
                onClick={handleClose}
                className="text-white hover:bg-white hover:bg-opacity-20 rounded-full p-2"
              >
                <span className="text-xl">×</span>
              </button>
            </div>

            {/* Progress Bar */}
            <div className="mt-4">
              <div className="flex items-center justify-between text-sm mb-2">
                <span>Câu hỏi {surveyStep + 1} / {totalQuestions}</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <div className="h-2 bg-white bg-opacity-30 rounded-full">
                <div
                  className="h-2 bg-white rounded-full"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>

          {/* Question Content */}
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-6">
              {currentQuestion.question}
            </h3>

            {/* Multiple Choice Questions */}
            {currentQuestion.type === 'multiple' && (
              <div className="space-y-3">
                {currentQuestion.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswer(option.value)}
                    className="w-full p-4 text-left border-2 border-gray-200 rounded-xl hover:border-purple-300 hover:bg-purple-50 group"
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{option.icon}</span>
                      <span className="font-medium group-hover:text-purple-700">{option.label}</span>
                    </div>
                  </button>
                ))}
              </div>
            )}

            {/* Scale Questions */}
            {currentQuestion.type === 'scale' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">{currentQuestion.labels[currentQuestion.min]}</span>
                  <span className="text-sm text-gray-500">{currentQuestion.labels[currentQuestion.max]}</span>
                </div>
                <div className="flex justify-between space-x-2">
                  {Array.from({ length: currentQuestion.max }, (_, i) => (
                    <button
                      key={i + 1}
                      onClick={() => handleAnswer(i + 1)}
                      className={`flex-1 py-3 px-2 rounded-xl border-2 font-semibold ${i + 1 <= 2 ? 'border-red-200 hover:border-red-400 hover:bg-red-50 hover:text-red-700' :
                        i + 1 === 3 ? 'border-yellow-200 hover:border-yellow-400 hover:bg-yellow-50 hover:text-yellow-700' :
                          'border-green-200 hover:border-green-400 hover:bg-green-50 hover:text-green-700'
                        }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Checkbox Questions */}
            {currentQuestion.type === 'checkbox' && (
              <div className="space-y-3">
                {currentQuestion.options.map((option, index) => (
                  <label
                    key={index}
                    className="flex items-center space-x-3 p-4 border-2 border-gray-200 rounded-xl hover:border-purple-300 hover:bg-purple-50 cursor-pointer group"
                  >
                    <input
                      type="checkbox"
                      className="w-5 h-5 text-purple-600 rounded focus:ring-purple-500"
                      onChange={(e) => {
                        // Handle multiple selections for checkbox
                        console.log('Checkbox changed:', option.value, e.target.checked);
                      }}
                    />
                    <span className="text-2xl">{option.icon}</span>
                    <span className="font-medium group-hover:text-purple-700">{option.label}</span>
                  </label>
                ))}
                <button
                  onClick={() => handleAnswer('multiple_selections')}
                  className="w-full mt-4 py-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl font-semibold hover:from-purple-600 hover:to-purple-700"
                >
                  Tiếp tục
                </button>
              </div>
            )}
          </div>

          {/* Navigation Footer */}
          <div className="bg-gray-50 px-6 py-4 flex justify-between items-center">
            <button
              onClick={() => surveyStep > 0 && setSurveyStep(surveyStep - 1)}
              disabled={surveyStep === 0}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 disabled:text-gray-400 font-medium"
            >
              ← Trước
            </button>

            <div className="text-sm text-gray-500">
              Khảo sát giúp AI cá nhân hóa trải nghiệm học tập
            </div>

            <button
              onClick={() => handleAnswer('skip')}
              className="px-4 py-2 text-purple-600 hover:text-purple-800 font-medium"
            >
              Bỏ qua →
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: '#2a1810' }}>
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 p-6 text-white sticky top-0 h-screen overflow-y-auto">
        <div className="mb-8">
          <h2 className="text-xl font-bold text-yellow-400">Giáo dục & Cộng đồng</h2>
          <p className="text-sm text-gray-400 mt-2">
            Sự mệnh: Bảo tồn kỹ sư văn hóa dân tộc qua AI, tạo trải nghiệm nghệ thuật và truyền cảm hứng cho thế hệ trẻ.
          </p>
        </div>

        {/* Sidebar Stats */}
        <div className="mb-8 space-y-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-white">156</div>
            <div className="text-xs text-gray-400">Học viên</div>
          </div>
          <div className="text-center">
            <div className="text-xl text-yellow-400">1M sao</div>
            <div className="text-xs text-gray-400">Tổ sáng tạo</div>
          </div>
        </div>

        {/* Sidebar Navigation */}
        <div className="space-y-2">
          {sidebarItems.map(item => (
            <button
              key={item.id}
              onClick={() => {
                setSelectedSidebar(item.id);
                setSelectedCategory(item.id);
              }}
              className={`w-full text-left p-3 rounded-lg transition-colors ${selectedSidebar === item.id
                ? 'bg-yellow-600 text-white'
                : 'text-gray-300 hover:bg-gray-800'
                }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm">{item.label}</span>
                <span className="text-xs bg-gray-700 px-2 py-1 rounded">{item.count}</span>
              </div>
            </button>
          ))}
        </div>

        {/* Progress Section */}
        <div className="mt-8">
          <h3 className="text-sm font-semibold text-gray-400 mb-4">Tiến độ học tập</h3>
          <div className="space-y-3">
            {progressData.map((item, index) => (
              <div key={index}>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-300">{item.label}</span>
                  <span className="text-yellow-400">{item.progress}%</span>
                </div>
                <div className="h-1 bg-gray-700 rounded-full mt-1">
                  <div
                    className="h-1 bg-yellow-500 rounded-full transition-all"
                    style={{ width: `${item.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Links */}
        <div className="mt-8">
          <h3 className="text-sm font-semibold text-gray-400 mb-4">Chuyển đến</h3>
          <div className="space-y-2">
            <Link
              to="/giaoduc"
              className="block w-full text-left p-3 text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg transition-colors text-sm"
            >
              📚 Trang Giáo dục
            </Link>
            <Link
              to="/"
              className="block w-full text-left p-3 text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg transition-colors text-sm"
            >
              🏠 Trang chủ
            </Link>
            <Link
              to="/phantichgocnhin"
              className="block w-full text-left p-3 text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg transition-colors text-sm"
            >
              🔍 Phân tích góc nhìn
            </Link>
          </div>
        </div>

        {/* Mini Tools */}
        <div className="mt-8">
          <h3 className="text-sm font-semibold text-gray-400 mb-4">Thư viện nhanh</h3>
          <div className="grid grid-cols-3 gap-2">
            <button className="p-2 bg-purple-600 rounded text-xs hover:bg-purple-700 transition-colors">Audio</button>
            <button className="p-2 bg-blue-600 rounded text-xs hover:bg-blue-700 transition-colors">VR</button>
            <button className="p-2 bg-green-600 rounded text-xs hover:bg-green-700 transition-colors">Tìm hiểu</button>
            <button className="p-2 bg-orange-600 rounded text-xs hover:bg-orange-700 transition-colors">Quiz</button>
            <button className="p-2 bg-pink-600 rounded text-xs hover:bg-pink-700 transition-colors">Sản phẩm</button>
            <button
              onClick={() => navigate('/survey/general')}
              className="p-2 bg-indigo-600 rounded text-xs hover:bg-indigo-700 transition-colors"
            >
              Survey
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1" style={{ backgroundColor: '#f6eadf' }}>
        <div className="p-8">
          {/* Breadcrumb Navigation */}
          <nav className="mb-6">
            <div className="flex items-center space-x-2 text-sm text-stone-500">
              <Link
                to="/"
                className="hover:text-stone-700 transition-colors"
              >
                Trang chủ
              </Link>
              <span>/</span>
              <Link
                to="/giaoduc"
                className="hover:text-stone-700 transition-colors"
              >
                Giáo dục
              </Link>
              <span>/</span>
              <span className="text-stone-800 font-medium">Bài học minh họa</span>
            </div>
          </nav>

          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold text-stone-800 mb-2">
                  Bài học Minh họa
                </h1>
                <p className="text-stone-600">
                  {sidebarItems.find(item => item.id === selectedCategory)?.label || 'Tất cả nội dung'} -
                  Khám phá và học tập qua các bài học tương tác với công nghệ AI và VR
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Tìm kiếm bài học..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8 pr-4 py-2 text-sm bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                  <svg className="absolute left-2 top-2.5 w-4 h-4 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <div className="text-sm text-stone-600">
                  {lessons.length} bài học
                </div>
              </div>
            </div>

            {/* Filter Stats */}
            <div className="flex items-center space-x-6 text-sm text-stone-600">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span>{lessons.filter(l => l.isCompleted).length} Hoàn thành</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span>{lessons.filter(l => l.progress > 0 && !l.isCompleted).length} Đang học</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                <span>{lessons.filter(l => l.progress === 0).length} Chưa bắt đầu</span>
              </div>
            </div>
          </div>

          {/* Lessons Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {lessons.map(lesson => (
              <div
                key={lesson.id}
                onClick={() => navigate(`/bai-hoc-minh-hoa/${lesson.id}`)}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group cursor-pointer"
              >
                {/* Lesson Header with Gradient */}
                <div className={`h-20 bg-gradient-to-r ${lesson.bgColor} flex items-center justify-between px-6 group-hover:scale-105 transition-transform duration-300`}>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold">{lesson.shortCode}</span>
                    </div>
                    <div>
                      <div className="text-white font-semibold">{lesson.type}</div>
                      <div className="text-white/80 text-sm">{lesson.difficulty}</div>
                    </div>
                  </div>
                  <div className="text-white/80 text-sm">{lesson.duration}</div>
                </div>

                {/* Lesson Content */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-stone-800 text-lg leading-tight flex-1">
                      {lesson.title}
                    </h3>
                    {lesson.isCompleted && (
                      <div className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                  </div>

                  <p className="text-stone-600 text-sm mb-4 leading-relaxed">
                    {lesson.description}
                  </p>

                  {/* Stats */}
                  <div className="flex items-center space-x-4 mb-4 text-xs text-stone-500">
                    <div className="flex items-center space-x-1">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>{lesson.students} học viên</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <svg className="w-3 h-3 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span>{lesson.rating}</span>
                    </div>
                  </div>

                  {/* Progress Bar with Survey Phases */}
                  {lesson.progress > 0 && (
                    <div className="mb-4">
                      <div className="flex items-center justify-between text-xs text-stone-500 mb-1">
                        <span>Tiến độ & Giai đoạn Khảo sát</span>
                        <span>{lesson.progress}%</span>
                      </div>
                      <div className="h-2 bg-stone-200 rounded-full relative">
                        <div
                          className={`h-2 rounded-full ${lesson.progress >= 80 ? 'bg-gradient-to-r from-green-400 to-green-600' :
                            lesson.progress >= 50 ? 'bg-gradient-to-r from-blue-400 to-blue-600' :
                              'bg-gradient-to-r from-orange-400 to-orange-600'
                            }`}
                          style={{ width: `${lesson.progress}%` }}
                        />
                        {/* Survey phase markers */}
                        <div className="absolute top-0 left-0 w-1 h-2 bg-purple-500" title="Pre-Survey"></div>
                        <div className="absolute top-0 left-1/2 w-1 h-2 bg-blue-500" title="Mid-Survey"></div>
                        <div className="absolute top-0 right-0 w-1 h-2 bg-green-500" title="Post-Survey"></div>
                      </div>
                      <div className="flex justify-between mt-1 text-xs text-stone-400">
                        <span>Pre</span>
                        <span>Mid</span>
                        <span>Post</span>
                      </div>
                    </div>
                  )}

                  {/* 3-Phase Survey System */}
                  {(() => {
                    const lessonSurvey = surveyData.lessons.find(l => l.id === lesson.id);
                    if (!lessonSurvey) return null;

                    return (
                      <div className="mb-4 bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-lg p-3">
                        <h4 className="text-xs font-semibold text-purple-700 mb-2">📋 Hệ thống Khảo sát 3 Giai đoạn</h4>

                        {/* Survey Phases Status */}
                        <div className="grid grid-cols-3 gap-1 mb-3 text-xs">
                          <div className={`p-2 rounded text-center ${lessonSurvey.surveyPhases.pre.completed ? 'bg-green-100 text-green-700' :
                            lessonSurvey.surveyPhases.pre.shouldTrigger ? 'bg-red-100 text-red-700' :
                              'bg-gray-100 text-gray-500'
                            }`}>
                            <div className="font-semibold">PRE</div>
                            <div>{lessonSurvey.surveyPhases.pre.completed ? '✅' : lessonSurvey.surveyPhases.pre.shouldTrigger ? '🔔' : '⏳'}</div>
                          </div>
                          <div className={`p-2 rounded text-center ${lessonSurvey.surveyPhases.mid.completed ? 'bg-green-100 text-green-700' :
                            lessonSurvey.surveyPhases.mid.shouldTrigger ? 'bg-orange-100 text-orange-700' :
                              'bg-gray-100 text-gray-500'
                            }`}>
                            <div className="font-semibold">MID</div>
                            <div>{lessonSurvey.surveyPhases.mid.completed ? '✅' : lessonSurvey.surveyPhases.mid.shouldTrigger ? '📊' : '⏳'}</div>
                          </div>
                          <div className={`p-2 rounded text-center ${lessonSurvey.surveyPhases.post.completed ? 'bg-green-100 text-green-700' :
                            lessonSurvey.surveyPhases.post.shouldTrigger ? 'bg-blue-100 text-blue-700' :
                              'bg-gray-100 text-gray-500'
                            }`}>
                            <div className="font-semibold">POST</div>
                            <div>{lessonSurvey.surveyPhases.post.completed ? '✅' : lessonSurvey.surveyPhases.post.shouldTrigger ? '🎯' : '⏳'}</div>
                          </div>
                        </div>

                        {/* Personalized Method Display */}
                        <div className="mb-3 p-2 bg-white rounded border">
                          <div className="text-xs text-gray-600 mb-1">Phương pháp Cá nhân hóa:</div>
                          <div className="text-xs font-semibold text-indigo-700">{lessonSurvey.personalizedMethod.current}</div>
                          {lessonSurvey.personalizedMethod.effectiveness && (
                            <div className="text-xs text-green-600">Hiệu quả: {lessonSurvey.personalizedMethod.effectiveness}%</div>
                          )}
                        </div>

                        {/* Active Survey Trigger */}
                        {lessonSurvey.shouldTriggerSurvey && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handlePhasesSurvey(lesson.id, 'trigger', lessonSurvey.nextSurveyType);
                            }}
                            className={`w-full py-2 px-3 text-white rounded-lg text-xs font-medium ${lessonSurvey.nextSurveyType === 'pre' ? 'bg-gradient-to-r from-purple-500 to-purple-600' :
                              lessonSurvey.nextSurveyType === 'mid' ? 'bg-gradient-to-r from-orange-500 to-orange-600' :
                                'bg-gradient-to-r from-blue-500 to-blue-600'
                              }`}
                          >
                            {lessonSurvey.nextSurveyType === 'pre' ? '🔔 Khảo sát Ban đầu - Cá nhân hóa Học tập' :
                              lessonSurvey.nextSurveyType === 'mid' ? '📊 Khảo sát Giữa kỳ - Đánh giá Tiến độ' :
                                '🎯 Khảo sát Cuối kỳ - Đánh giá Kết quả'}
                          </button>
                        )}

                        {/* Survey Action Buttons */}
                        <div className="flex space-x-1 mt-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handlePhasesSurvey(lesson.id, 'view-profile', 'all');
                            }}
                            className="flex-1 py-1 px-2 bg-indigo-100 text-indigo-700 rounded text-xs hover:bg-indigo-200"
                          >
                            👤 Profile
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handlePhasesSurvey(lesson.id, 'view-method', 'current');
                            }}
                            className="flex-1 py-1 px-2 bg-purple-100 text-purple-700 rounded text-xs hover:bg-purple-200"
                          >
                            🎯 Method
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handlePhasesSurvey(lesson.id, 'view-analytics', 'data');
                            }}
                            className="flex-1 py-1 px-2 bg-green-100 text-green-700 rounded text-xs hover:bg-green-200"
                          >
                            📈 Data
                          </button>
                        </div>
                      </div>
                    );
                  })()}

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-stone-500">
                        {lesson.isCompleted ? 'Hoàn thành' : lesson.progress > 0 ? 'Đang học' : 'Chưa bắt đầu'}
                      </span>
                      <button
                        className="text-orange-500 hover:text-orange-600"
                        onClick={() => setCompletedLessons(prev => {
                          const newSet = new Set(prev);
                          if (newSet.has(lesson.id)) {
                            newSet.delete(lesson.id);
                          } else {
                            newSet.add(lesson.id);
                          }
                          return newSet;
                        })}
                      >
                        <svg className={`w-4 h-4 ${completedLessons.has(lesson.id) ? 'text-red-500' : 'text-gray-400'}`} fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                        </svg>
                      </button>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/bai-hoc-minh-hoa/${lesson.id}`);
                      }}
                      className={`px-4 py-2 rounded-lg text-sm font-medium ${lesson.isCompleted
                        ? 'bg-green-500 hover:bg-green-600 text-white'
                        : lesson.progress > 0
                          ? 'bg-blue-500 hover:bg-blue-600 text-white'
                          : 'bg-orange-500 hover:bg-orange-600 text-white'
                        }`}
                    >
                      {lesson.isCompleted ? 'Xem lại' : lesson.progress > 0 ? 'Tiếp tục' : 'Bắt đầu'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Mini-Quiz Section */}
          <div className="mt-12 bg-white rounded-2xl p-8 shadow-lg">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-stone-800 mb-2">Mini-Quiz</h2>
              <p className="text-stone-600">
                Kiểm tra hiểu biết về nghệ thuật AI theo thời gian thực — Kiểm thử để nhận số học bổng
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: 'AI cơ bản',
                  desc: 'Đáp ứi câu hỏi • Chọn câu trả lời đúng',
                  color: 'from-purple-400 to-pink-400',
                  btn: 'Bắt đầu',
                  questions: 15,
                  time: '10 phút',
                  completed: 89
                },
                {
                  title: 'VR Tours',
                  desc: 'Tìm hiểu không gian • Sáng tạo là phần',
                  color: 'from-blue-400 to-indigo-400',
                  btn: 'Thử nghiệm',
                  questions: 12,
                  time: '8 phút',
                  completed: 67
                },
                {
                  title: 'Văn hóa',
                  desc: 'Tìm hiểu về sáng tạo • Văn hóa nghệ thuật',
                  color: 'from-green-400 to-emerald-400',
                  btn: 'Khám phá',
                  questions: 20,
                  time: '15 phút',
                  completed: 134
                }
              ].map((quiz, index) => (
                <div key={index} className="text-center p-6 border border-stone-200 rounded-xl hover:shadow-lg transition-shadow cursor-pointer">
                  <div className={`w-16 h-16 bg-gradient-to-r ${quiz.color} rounded-full mx-auto mb-4 flex items-center justify-center text-white font-bold text-xl`}>
                    {quiz.title[0]}
                  </div>
                  <h3 className="font-bold text-stone-800 mb-2">{quiz.title}</h3>
                  <p className="text-stone-600 text-sm mb-3">{quiz.desc}</p>

                  <div className="flex justify-center space-x-4 text-xs text-stone-500 mb-4">
                    <span>{quiz.questions} câu hỏi</span>
                    <span>•</span>
                    <span>{quiz.time}</span>
                  </div>

                  <div className="text-xs text-stone-400 mb-4">
                    {quiz.completed} người đã hoàn thành
                  </div>

                  <button
                    className={`bg-gradient-to-r ${quiz.color} text-white px-6 py-2 rounded-full text-sm font-medium hover:shadow-md transition-all`}
                    onClick={() => alert(`Bắt đầu ${quiz.title} quiz!`)}
                  >
                    {quiz.btn}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Discussion Section */}
          <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Forum */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="font-bold text-stone-800 text-xl mb-4">Diễn đàn & Bình luận</h3>
              <div className="space-y-3">
                {[
                  { topic: 'Việt ký lịch sử dân tộc qua AI', replies: 23, time: '2 giờ trước', author: 'Nguyễn An', isHot: true },
                  { topic: 'AI trong nghệ thuật truyền thống', replies: 15, time: '4 giờ trước', author: 'Trần Minh', isHot: false },
                  { topic: 'VR tour di sản Huế có gì hay?', replies: 31, time: '6 giờ trước', author: 'Lê Hoa', isHot: true },
                  { topic: 'Học AI painting cần gì?', replies: 8, time: '1 ngày trước', author: 'Phạm Đức', isHot: false }
                ].map((item, index) => (
                  <div key={index} className="p-3 bg-stone-50 rounded-lg hover:bg-stone-100 transition-colors cursor-pointer">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <div className="font-medium text-stone-800 text-sm">{item.topic}</div>
                          {item.isHot && (
                            <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full">Hot</span>
                          )}
                        </div>
                        <div className="text-xs text-stone-500 mt-1">
                          {item.replies} phản hồi • bởi {item.author} • {item.time}
                        </div>
                      </div>
                      <svg className="w-4 h-4 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                ))}

                <button className="w-full mt-4 py-2 text-sm text-orange-600 border border-orange-200 rounded-lg hover:bg-orange-50 transition-colors">
                  Xem tất cả thảo luận →
                </button>
              </div>
            </div>

            {/* Achievements */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="font-bold text-stone-800 text-xl mb-4">Chứng nhận & Chia sẻ</h3>
              <p className="text-stone-600 text-sm mb-4">
                Hoàn thành khóa học để nhận chứng nhận miễn phí và chia sẻ — bạn có thể có quá trình tự học cho cha mẹ
              </p>

              {/* Overall Progress */}
              <div className="mb-4 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-stone-800">Tổng tiến độ</span>
                  <span className="text-sm text-stone-600">
                    {Math.round((lessons.filter(l => l.isCompleted).length / lessons.length) * 100)}%
                  </span>
                </div>
                <div className="h-2 bg-stone-200 rounded-full">
                  <div
                    className="h-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full transition-all"
                    style={{ width: `${(lessons.filter(l => l.isCompleted).length / lessons.length) * 100}%` }}
                  />
                </div>
              </div>

              {/* Certificates Available */}
              <div className="space-y-3 mb-4">
                <div className="text-xs font-medium text-stone-600 mb-2">Chứng nhận có sẵn:</div>
                {[
                  { name: 'AI Cơ bản', progress: 75, available: false, icon: '🤖' },
                  { name: 'VR Expert', progress: 100, available: true, icon: '🥽' },
                  { name: 'Văn hóa AI', progress: 45, available: false, icon: '🎭' }
                ].map((cert, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-stone-50 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg">{cert.icon}</span>
                      <span className="text-sm font-medium text-stone-700">{cert.name}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-stone-500">{cert.progress}%</span>
                      {cert.available ? (
                        <button className="text-xs bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 transition-colors">
                          Tải xuống
                        </button>
                      ) : (
                        <span className="text-xs text-stone-400">Chưa đủ điều kiện</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Share Options */}
              <div className="border-t pt-4">
                <div className="text-xs font-medium text-stone-600 mb-3">Chia sẻ thành tích:</div>
                <div className="grid grid-cols-3 gap-2">
                  <button className="p-2 bg-blue-500 text-white rounded text-xs hover:bg-blue-600 transition-colors">
                    Facebook
                  </button>
                  <button className="p-2 bg-green-500 text-white rounded text-xs hover:bg-green-600 transition-colors">
                    WhatsApp
                  </button>
                  <button className="p-2 bg-gray-600 text-white rounded text-xs hover:bg-gray-700 transition-colors">
                    Copy Link
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Page Navigation Footer */}
        <div className="mt-16 bg-white rounded-2xl p-8 shadow-lg">
          <div className="text-center mb-6">
            <h2 className="text-xl font-bold text-stone-800 mb-2">Tiếp tục khám phá</h2>
            <p className="text-stone-600">Khám phá thêm các trang khác trong hệ thống giáo dục</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link
              to="/giaoduc"
              className="group p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl hover:shadow-lg transition-all"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center text-white text-xl">
                  📚
                </div>
                <div>
                  <h3 className="font-semibold text-stone-800 group-hover:text-blue-700">Trang Giáo dục</h3>
                  <p className="text-sm text-stone-600">Tổng quan về hệ thống</p>
                </div>
              </div>
            </Link>

            <Link
              to="/phantichgocnhin"
              className="group p-6 bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-xl hover:shadow-lg transition-all"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center text-white text-xl">
                  🔍
                </div>
                <div>
                  <h3 className="font-semibold text-stone-800 group-hover:text-purple-700">Phân tích góc nhìn</h3>
                  <p className="text-sm text-stone-600">Nghiên cứu chuyên sâu</p>
                </div>
              </div>
            </Link>

            <Link
              to="/vanhoalichsu"
              className="group p-6 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl hover:shadow-lg transition-all"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center text-white text-xl">
                  🏛️
                </div>
                <div>
                  <h3 className="font-semibold text-stone-800 group-hover:text-green-700">Văn hóa lịch sử</h3>
                  <p className="text-sm text-stone-600">Khám phá di sản</p>
                </div>
              </div>
            </Link>
          </div>

          <div className="text-center mt-6">
            <Link
              to="/"
              className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg hover:from-orange-600 hover:to-red-600 transition-all font-medium"
            >
              <span>🏠</span>
              <span>Về trang chủ</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Survey Modal */}
      <SurveyModal />
    </div>
  );
}

export default BaiGiangMinhHoa;