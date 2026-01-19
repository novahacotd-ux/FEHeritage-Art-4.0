import React from 'react';
import { useLocation, useNavigate } from "react-router-dom"; // Thêm useNavigate
import {
    CSidebar,
    CSidebarBrand,
    CSidebarHeader,
    CSidebarNav,
    CSidebarToggler,
    CNavItem,
    CNavTitle,
    CNavLink,
} from '@coreui/react';

import { cilFace, cilHistory, cilBasket, cibProbot, cilNewspaper, cilCalendar, cibGoogleAnalytics, cilChatBubble, cilBriefcase, cilMoney, cilHeart, cilUser } from '@coreui/icons';
import logo from '../../assets/logo.png';
import CIcon from '@coreui/icons-react';

export const SideBar = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const handleClick = (path) => (e) => {
        e.preventDefault(); // Ngăn reload nếu có href
        navigate(path);
    };

    return (
        <CSidebar className="border-end">
            <CSidebarHeader className="border-bottom">
                <CSidebarBrand>
                    <img src={logo} alt="Logo" className="me-2" height={40} />
                    <h1 className="h4 mb-0">Admin Panel</h1>
                </CSidebarBrand>
            </CSidebarHeader>

            <CSidebarNav>
                <CNavTitle>Khám Phá</CNavTitle>

                <CNavItem>
                    <CNavLink
                        href="#" // Dùng href giả để CoreUI render <a>
                        onClick={handleClick('/admin/trainghiem')}
                        active={location.pathname === '/admin/trainghiem' || location.pathname === '/admin'}
                    >
                        <CIcon customClassName="nav-icon" icon={cilHistory} />
                        Trải Nghiệm
                    </CNavLink>
                </CNavItem>

                <CNavItem>
                    <CNavLink
                        href="#"
                        onClick={handleClick('/admin/congngheai')}
                        active={location.pathname === '/admin/congngheai'}
                    >
                        <CIcon customClassName="nav-icon" icon={cibProbot} />
                        Công Nghệ AI
                    </CNavLink>
                </CNavItem>

                <CNavTitle>Cộng Đồng</CNavTitle>

                <CNavItem>
                    <CNavLink
                        href="#"
                        onClick={handleClick('/admin/tintuc')}
                        active={location.pathname === '/admin/tintuc'}
                    >
                        <CIcon customClassName="nav-icon" icon={cilNewspaper} />
                        Tin Tức
                    </CNavLink>
                </CNavItem>

                <CNavItem>
                    <CNavLink
                        href="#"
                        onClick={handleClick('/admin/sukien')}
                        active={location.pathname === '/admin/sukien'}
                    >
                        <CIcon customClassName="nav-icon" icon={cilCalendar} />
                        Sự Kiện
                    </CNavLink>
                </CNavItem>

                <CNavItem>
                    <CNavLink
                        href="#"
                        onClick={handleClick('/admin/phantich')}
                        active={location.pathname === '/admin/phantich'}
                    >
                        <CIcon customClassName="nav-icon" icon={cibGoogleAnalytics} />
                        Phân Tích
                    </CNavLink>
                </CNavItem>

                <CNavItem>
                    <CNavLink
                        href="#"
                        onClick={handleClick('/admin/gocnhin')}
                        active={location.pathname === '/admin/gocnhin'}
                    >
                        <CIcon customClassName="nav-icon" icon={cilFace} />
                        Góc Nhìn
                    </CNavLink>
                </CNavItem>

                <CNavItem>
                    <CNavLink
                        href="#"
                        onClick={handleClick('/admin/forum')}
                        active={location.pathname === '/admin/forum'}
                    >
                        <CIcon customClassName="nav-icon" icon={cilChatBubble} />
                        Forum
                    </CNavLink>
                </CNavItem>

                <CNavTitle>Cửa Hàng</CNavTitle>

                <CNavItem>
                    <CNavLink
                        href="#"
                        onClick={handleClick('/admin/sanpham')}
                        active={location.pathname === '/admin/sanpham'}
                    >
                        <CIcon customClassName="nav-icon" icon={cilBriefcase} />
                        Sản Phẩm
                    </CNavLink>
                </CNavItem>

                <CNavItem>
                    <CNavLink
                        href="#"
                        onClick={handleClick('/admin/order')}
                        active={location.pathname === '/admin/order'}
                    >
                        <CIcon customClassName="nav-icon" icon={cilBasket} />
                        Order
                    </CNavLink>
                </CNavItem>

                <CNavItem>
                    <CNavLink
                        href="#"
                        onClick={handleClick('/admin/donate')}
                        active={location.pathname === '/admin/donate'}
                    >
                        <CIcon customClassName="nav-icon" icon={cilHeart} />
                        Donate
                    </CNavLink>
                </CNavItem>

                <CNavTitle>Quản Lý</CNavTitle>

                <CNavItem>
                    <CNavLink
                        href="#"
                        onClick={handleClick('/admin/thanhtoan')}
                        active={location.pathname === '/admin/thanhtoan'}
                    >
                        <CIcon customClassName="nav-icon" icon={cilMoney} />
                        Thanh Toán
                    </CNavLink>
                </CNavItem>

                <CNavItem>
                    <CNavLink
                        href="#"
                        onClick={handleClick('/admin/nguoidung')}
                        active={location.pathname === '/admin/nguoidung'}
                    >
                        <CIcon customClassName="nav-icon" icon={cilUser} />
                        Người Dùng
                    </CNavLink>
                </CNavItem>
            </CSidebarNav>

            <CSidebarHeader className="border-top">
                <CSidebarToggler />
            </CSidebarHeader>
        </CSidebar>
    );
};

export default SideBar;