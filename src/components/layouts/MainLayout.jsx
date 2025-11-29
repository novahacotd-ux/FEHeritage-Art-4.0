import { Outlet } from 'react-router-dom'
import NavBar from './navigation/NavBar'
import Footer from './footer/Footer'

import ScrollToTop from '../common/ScrollToTop'

const MainLayout = () => {
  return (
    <>
      <ScrollToTop />
      <NavBar />
      <Outlet />
      <Footer />
    </>
  )
}

export default MainLayout