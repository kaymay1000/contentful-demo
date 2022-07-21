import '../../App.css';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="App-header">
      <nav>
        <Link to="/">Home</Link>
        <Link to="/all-projects">All Projects</Link>
        {/* <Link to="/project/:id">Project Detail Page</Link> */}
      </nav>
    </header>
  )
}

export default Header;
