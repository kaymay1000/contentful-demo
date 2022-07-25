import './header.scss';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="app-header">
      <nav>
        <Link to="/">Home</Link>
        <Link to="/all-projects">All Projects</Link>
      </nav>
    </header>
  )
}

export default Header;
