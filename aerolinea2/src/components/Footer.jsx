//Footer.jsx
import React from 'react';
import '../style/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Primera columna: Categorías */}
        <div className="footer-column">
          <h3>CATEGORÍAS</h3>
          <ul>
            <li>Reservar Vuelo</li>
            <li>Estado del Vuelo</li>
            <li>Aplicación Móvil</li>
            <li>Mantener el Precio</li>
            <li>Entretenimiento a Bordo</li>
            <li>Ofertas Especiales</li>
          </ul>
        </div>

        {/* Segunda columna: Información */}
        <div className="footer-column">
          <h3>INFORMACIÓN</h3>
          <ul>
            <li>Franquicia de Equipaje Adicional</li>
            <li>Seguro de Viaje</li>
            <li>Viajar con Mascotas</li>
            <li>Aviso Legal</li>
            <li>Términos y Condiciones</li>        
            
          </ul>
        </div>

        {/* Tercera columna: Nuestra Empresa */}
        <div className="footer-column">
          <h3>NUESTRA EMPRESA</h3>
          <p>Turkish Airlines</p>
          <p>Carlos Pellegrini 635 piso 7 </p>
          <p>Capital Federal, Buenos Aires</p>
          <p>Tel: +54 11 5032 8794</p>
          <p>Call Center: +54 11 3991 5950</p>
          <p>Email: airlines@airlines.com</p>
        </div>

        {/* Cuarta columna: Ubicación y redes sociales */}
        <div className="footer-column">
          <h3>ESTAMOS AQUÍ</h3>
          <div className="map-container">
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
          <div className="social-icons">
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
        </div>
      </div>
    </footer>
  );
};

export default Footer;
