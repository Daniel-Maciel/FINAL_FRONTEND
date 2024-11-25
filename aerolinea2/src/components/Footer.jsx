//Footer.jsx
import React from 'react';
import '../style/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="contact-info">
          <h3>Contáctanos</h3>
          <p>Dirección: Calle Falsa 123, Buenos Aires, Argentina</p>
          <p>Teléfono: +54 11 1234-5678</p>
          <p>Email: contacto@airlines.com</p>
        </div>
        <div className="social-icons">
          <h3>Síguenos</h3>
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-facebook"></i>
          </a>
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-youtube"></i>
          </a>
        </div>
        <div className="map">
          <h3>Ubicación</h3>
          <iframe
            title="map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d26245.711888923366!2d-58.417308550000006!3d-34.6117798!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bccacf61444d55%3A0x35f77a4bbfb21289!2sBuenos+Aires!5e0!3m2!1sen!2sar!4v1698527396243!5m2!1sen!2sar"
            width="100%"
            height="200"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
