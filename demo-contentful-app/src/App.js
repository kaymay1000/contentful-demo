import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
// import AllProjectsPage from './pages/AllProjectsPage';
// import ProjectDetailPage from './pages/ProjectDetailPage';
import ProjectCard from './components/ProjectCard';
import AllProjects from './components/AllProjects';
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
          element={<h1>Home Page</h1>}
        />
        <Route 
          path="/all-projects/:slug"
          element={<ProjectCard />}
        />
        <Route 
          path="all-projects"
          element={<AllProjects/>}
        />
        <Route 
          path="*"
          element={<h1>Home Page</h1>}
        />
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
