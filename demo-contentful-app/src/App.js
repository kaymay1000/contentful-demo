import './App.scss';
import Header from './components/Header';
import Footer from './components/Footer';
import SingleProjectPage from './pages/SingleProjectPage/SingleProjectPage';
import PortfolioPage from './pages/PortfolioPage/PortfolioPage';
import ServicesPage from './pages/ServicesPage/ServicesPage';
import ContactPage from './pages/ContactPage/ContactPage';
import HomePage from './pages/HomePage/HomePage';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';

const App = () => {
  return ( 
    <Router>
      <Header/>
      <Routes>
        <Route 
          path="/"
          element={<HomePage/>}
        />
        <Route 
          path="portfolio/:slug"
          element={<SingleProjectPage/>}
        />
        <Route 
          path="portfolio"
          element={<PortfolioPage/>}
        />
        <Route 
          path="services"
          element={<ServicesPage/>}
        />
        <Route 
          path="contact"
          element={<ContactPage/>}
        />
        <Route 
          path="*"
          element={<HomePage/>}
        />
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
