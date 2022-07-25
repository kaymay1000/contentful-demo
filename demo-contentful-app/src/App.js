import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import SingleProject from './components/SingleProject';
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
          element={<SingleProject/>}
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
