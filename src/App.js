import Home from './pages/home/Home';
import { Routes, Route } from "react-router-dom";
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';
import Activity from './pages/activity/Activity';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route index element={<Home />} />
        <Route path='/etkinlik/:id' element={<Activity />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
