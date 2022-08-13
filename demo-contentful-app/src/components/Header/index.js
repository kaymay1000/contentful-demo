import { useEffect } from 'react';
import { contentfulDeliveryClient } from '../../contentfulClients';
import { Link } from 'react-router-dom';
import './header.scss';
import '../../App.scss';

const Header = () => {
  // useEffect(() => {
  //   let logoImage = contentfulDeliveryClient.getEntries({content_type: 'logo'})
  //   .then(response => {
  //     console.log('response: ', response.items[0]);
  //     console.log('response...: ', response.items[0].fields.logoImage.fields.file.url)
  //     return response.items[0].fields.logoImage.fields.file.url
  //   })
  //   .catch(error => console.log('Error getting logo image: ', error));
  // }, []);

  // TODO: try using images API
  let logoImage = contentfulDeliveryClient.getEntries({content_type: 'logo'})
  .then(response => response.items[0].fields.logoImage.fields.file.url)
  .catch(error => console.log('Error getting logo image: ', error));

  return (
    <header className="app-header flex flex-between">
      <div className="header-logo">
        <img alt="logo" src={logoImage}></img>
      </div>
      <nav className="header-nav">
        <Link to="/">Home</Link>
        <Link to="/all-projects">All Projects</Link>
      </nav>
    </header>
  )
}

export default Header;
