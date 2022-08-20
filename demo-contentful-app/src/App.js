import './App.scss';
import Header from './components/Header';
import Footer from './components/Footer';
import SingleProjectPage from './pages/SingleProjectPage/SingleProjectPage';
import AllProjectsPage from './pages/AllProjectsPage/AllProjectsPage';
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
          path="/all-projects/:slug"
          element={<SingleProjectPage/>}
        />
        <Route 
          path="all-projects"
          element={<AllProjectsPage/>}
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
