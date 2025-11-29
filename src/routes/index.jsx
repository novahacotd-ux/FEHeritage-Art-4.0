import { createBrowserRouter, Navigate } from 'react-router-dom';

import { Home, HomeEvent, Events, News, EventDetail, NewsDetail, EventRegistration, VanHoaLichSu, PhanTichGocNhin, Forum, TraiNghiem, TaoTranh, CongNghe, GiaoDuc, BaiGiangMinhHoa, BaiGiangDetail, TaiLieuBaiGiang, TaiLieuDetail, BaiHocMinhHoaDetail, VirtualChronicle, ProfilePage, InfoPage, FriendsPage, ContactPage, Settings, Guides, Contact, LoginPage, RegisterPage } from '../pages'
import AppLayout from '../components/layouts/AppLayout.jsx';
import MainLayout from '../components/layouts/MainLayout.jsx';
import Cart from '../components/Cart.jsx';
import Checkout from '../pages/Store/Checkout.jsx';
import HeroesList from '../pages/Events-News/HeroesList.jsx';
import SurveyPage from '../pages/SurveyPage';
import TrangChu from '../pages/Home/Home.jsx';
import GioiThieu from '../pages/GioiThieu/GioiThieu.jsx';

// LMS Components
import TeacherDashboard from '../pages/LMS/Teacher/TeacherDashboard';
import AssignmentCreator from '../pages/LMS/Teacher/AssignmentCreator';
import CourseCreator from '../pages/LMS/Teacher/CourseCreator';
import CourseDetail from '../pages/LMS/Teacher/CourseDetail';
import LessonCreator from '../pages/LMS/Teacher/LessonCreator';
import StudentDashboard from '../pages/LMS/Student/StudentDashboard';
import StudentAssignmentView from '../pages/LMS/Student/StudentAssignmentViewNew';
import StudentCourseView from '../pages/LMS/Student/StudentCourseView';
import StudentLessonView from '../pages/LMS/Student/StudentLessonView';
import StudentAssignmentDetail from '../pages/LMS/Student/StudentAssignmentDetail';
import TeacherLessonDetail from '../pages/LMS/Teacher/TeacherLessonDetail';
import TeacherAssignmentDetail from '../pages/LMS/Teacher/TeacherAssignmentDetail';
import UploadTaiLieu from '../pages/UploadTaiLieu';

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        element: <MainLayout />,
        children: [
          {
            index: true,
            element: <TrangChu />,
          },
          {
            path: 'events-news',
            element: <HomeEvent />,
          },
          {
            path: 'gioithieu',
            element: <GioiThieu />,
          },
          {
            path: 'events/:eventId',
            element: <EventDetail />,
          },
          {
            path: 'events/:eventId/register',
            element: <EventRegistration />,
          },
          {
            path: 'news',
            element: <News />,
          },
          {
            path: 'news/:newsId',
            element: <NewsDetail />,
          },
          {
            path: 'vanhoalichsu',
            element: <VanHoaLichSu />,
          },
          {
            path: 'heroes',
            element: <HeroesList />,
          },
          {
            path: 'phantichgocnhin',
            element: <PhanTichGocNhin />,
          },
          {
            path: 'forum',
            element: <Forum />,
          },
          {
            path: 'giaoduc',
            element: <GiaoDuc />,
          },
          {
            path: 'bai-giang-minh-hoa',
            element: <BaiGiangMinhHoa />,
          },
          {
            path: 'tai-lieu-bai-giang',
            element: <TaiLieuBaiGiang />,
          },
          {
            path: 'bai-giang/:id',
            element: <BaiGiangDetail />,
          },
          {
            path: 'tai-lieu/:id',
            element: <TaiLieuDetail />,
          },
          {
            path: 'bai-hoc-minh-hoa/:id',
            element: <BaiHocMinhHoaDetail />,
          },
          {
            path: 'virtual-chronicle',
            element: <VirtualChronicle />,
          },
          // LMS Routes - Teacher
          {
            path: 'lms/teacher/dashboard',
            element: <TeacherDashboard />,
          },
          {
            path: 'lms/teacher/assignments/new',
            element: <AssignmentCreator />,
          },
          {
            path: 'lms/teacher/courses/new',
            element: <CourseCreator />,
          },
          {
            path: 'lms/teacher/courses/:courseId',
            element: <CourseDetail />,
          },
          {
            path: 'lms/teacher/courses/:courseId/lessons/new',
            element: <LessonCreator />,
          },
          {
            path: 'lms/teacher/courses/:courseId/lessons/:lessonId',
            element: <TeacherLessonDetail />,
          },
          {
            path: 'lms/teacher/assignments/:assignmentId',
            element: <TeacherAssignmentDetail />,
          },
          // LMS Routes - Student
          {
            path: 'lms/student/dashboard',
            element: <StudentDashboard />,
          },
          {
            path: 'lms/student/assignments/:assignmentId/detail',
            element: <StudentAssignmentDetail />,
          },
          {
            path: 'lms/student/assignments/:assignmentId',
            element: <StudentAssignmentView />,
          },
          {
            path: 'lms/student/courses/:courseId',
            element: <StudentCourseView />,
          },
          {
            path: 'lms/student/courses/:courseId/lessons/:lessonId',
            element: <StudentLessonView />,
          },
          {
            path: 'survey/:courseId',
            element: <SurveyPage />,
          },
          {
            path: 'upload-tai-lieu',
            element: <UploadTaiLieu />,
          },
          {
            path: 'trainghiem',
            element: <TraiNghiem />,
          },
          {
            path: 'taotranh',
            element: <TaoTranh />,
          },
          {
            path: 'congngheai',
            element: <CongNghe />,
          },
          // Account & Support Pages
      
          {
            path: 'info',
            element: <InfoPage />,
          },
          {
            path: 'friends',
            element: <FriendsPage />,
          },
          {
            path: 'contact-page',
            element: <ContactPage />,
          },
          {
            path: 'settings',
            element: <Settings />,
          },
          {
            path: 'guides',
            element: <Guides />,
          },
          {
            path: 'contact',
            element: <Contact />,
          },
          {
            path: 'login',
            element: <LoginPage />,
          },
          {
            path: 'register',
            element: <RegisterPage />,
          },
        ],
      },
      {
        path: '*',
        element: (
          <div className="mx-auto max-w-6xl px-4 py-24 text-center">
            <h1 className="text-4xl font-serif font-semibold text-brand-brown-900">404 - Không tìm thấy trang</h1>
            <p className="mt-4 text-brand-brown-600">Trang bạn đang tìm kiếm không tồn tại.</p>
          </div>
        ),
      },
    ],
  },
]);

export default router;