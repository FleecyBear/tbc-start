import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Content/Header/Header';
import Footer from './Content/Footer/Footer';
import Main from './Content/Main/Main';
import About from './Content/About/About';
import Contact from './Content/Contact/Contact';
import Assignment3 from './Content/Assignment-3/Assignment3';
import Blog from './Content/Blog/Blog';
import Profile from './Content/Profile/Profile';

function App() {
  return (
    <div className="App">
      <Router basename="/tbc-start">
        <Header />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/assignment-3" element={<Assignment3 />} />
          <Route path="/blog" element={<Blog />}/>
          <Route path="/profile" element={<Profile />}/>
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}
export default App;
