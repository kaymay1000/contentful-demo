import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import AllProjectsPage from './pages/AllProjectsPage';
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
          path="all-projects"
          element={<AllProjectsPage/>}
        />
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
