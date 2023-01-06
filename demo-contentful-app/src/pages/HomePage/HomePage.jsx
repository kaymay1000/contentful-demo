import ContactForm from '../../components/ContactForm';
import './home-page.scss';

const HomePage = () => {
  return (
    <div className="container home-page-wrapper">
      <section className="hero-section">
        <div className="hero-image">
          <div className="hero-content">
            <h1 className="headline">Grayscale Creative</h1>
            <p>Some catchy tagline here</p>
          </div>
        </div>
      </section>
      <section className="about-section padded-section">
        <div className="about-inner">
          <div className="about-text">
            <h2 className="headline">Hey! I'm Crystal.</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam, ut ex totam voluptates rerum similique quas iste porro eveniet debitis inventore ipsa atque repudiandae distinctio cumque mollitia nesciunt! Corrupti, molestias.
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam, ut ex totam voluptates rerum similique quas iste porro eveniet debitis inventore ipsa atque repudiandae distinctio cumque mollitia nesciunt! Corrupti, molestias.
            </p>
            <button className="cta">Contact Me</button>
          </div>
          <div className="about-image">
            <img src={require('../../assets/hero.png')} alt="Headshot of Crystal Estacio"/>
          </div>
        </div>
      </section>
      <section className="portfolio-section padded-section">
        <div className="portfolio-inner">
          <h2 className="headline">Portfolio</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam, ut ex totam voluptates rerum similique quas iste porro eveniet debitis inventore ipsa atque repudiandae distinctio cumque mollitia nesciunt! Corrupti, molestias.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam, ut ex totam voluptates rerum similique quas iste porro eveniet debitis inventore ipsa atque repudiandae distinctio cumque mollitia nesciunt! Corrupti, molestias.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam, ut ex totam voluptates rerum similique quas iste porro eveniet debitis inventore ipsa atque repudiandae distinctio cumque mollitia nesciunt! Corrupti, molestias.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam, ut ex totam voluptates rerum similique quas iste porro eveniet debitis inventore ipsa atque repudiandae distinctio cumque mollitia nesciunt! Corrupti, molestias.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam, ut ex totam voluptates rerum similique quas iste porro eveniet debitis inventore ipsa atque repudiandae distinctio cumque mollitia nesciunt! Corrupti, molestias.
          </p>
        </div>
        
      </section>
      <section className="services-section padded-section">
        <h2 className="headline">Services</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam, ut ex totam voluptates rerum similique quas iste porro eveniet debitis inventore ipsa atque repudiandae distinctio cumque mollitia nesciunt! Corrupti, molestias.
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam, ut ex totam voluptates rerum similique quas iste porro eveniet debitis inventore ipsa atque repudiandae distinctio cumque mollitia nesciunt! Corrupti, molestias.
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam, ut ex totam voluptates rerum similique quas iste porro eveniet debitis inventore ipsa atque repudiandae distinctio cumque mollitia nesciunt! Corrupti, molestias.
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam, ut ex totam voluptates rerum similique quas iste porro eveniet debitis inventore ipsa atque repudiandae distinctio cumque mollitia nesciunt! Corrupti, molestias.
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam, ut ex totam voluptates rerum similique quas iste porro eveniet debitis inventore ipsa atque repudiandae distinctio cumque mollitia nesciunt! Corrupti, molestias.
        </p>
      </section>
      <section className="contact-form-section padded-section">
        <ContactForm></ContactForm>
      </section>
    </div>
  )
}

export default HomePage;
