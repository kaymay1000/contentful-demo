import { useEffect, useState } from 'react';
import { contentfulDeliveryClient } from '../../contentfulClients';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import './header.scss';

const Header = () => {

  const [logoImage, setLogoImage] = useState(null);

  useEffect(() => {
    let getLogoImage = async () => {
      await contentfulDeliveryClient.getEntries({content_type: 'logo'})
      .then(response => setLogoImage(response.items[0].fields.logoImage.fields.file.url))
      .catch(error => console.log('Error getting logo image: ', error));
    };

    getLogoImage();
  }, []);

  // TODO: implement mobile side nav
  const toggleMobileNav = () => {
    console.log('clicked!')
  }

  // TODO: figure out how to implement active state
  const toggleActive = (event) => {
    if (event.target.classList.includes('active')) {
      event.target.classList.remove('active');
    } else {
      event.target.classList.add('active');
    }
  }

  return (
    <header className="app-header flex justify-between align-center">
      <div className="header-logo">
        <Link to="/" onClick={toggleActive}><img alt="logo" src={logoImage}/></Link>
      </div>
      <nav className="header-nav">
        <button onClick={toggleMobileNav} className="hamburger-button"><FontAwesomeIcon icon={faBars}></FontAwesomeIcon></button> 
        <Link to="/" onClick={toggleActive}>Home</Link>
        <Link to="/all-projects" onClick={toggleActive}>All Projects</Link>
      </nav>
    </header>
  )
}

export default Header;
