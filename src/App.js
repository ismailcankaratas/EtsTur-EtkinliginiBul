import Home from './pages/home/Home';
import { Routes, Route } from "react-router-dom";
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';
import Activity from './pages/activity/Activity';
import Search from './pages/search/Search';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

export const successNotification = (msg) => toast.success(msg);
export const errorNotification = (msg) => toast.error(msg);

function App() {
  return (
    <>
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route path={process.env.PUBLIC_URL} element={<Home />} />
        <Route path={process.env.PUBLIC_URL + '/etkinlik/:id'} element={<Activity />} />
        <Route path={process.env.PUBLIC_URL + '/search'} element={<Search />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
