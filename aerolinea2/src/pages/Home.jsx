// src/pages/Home.jsx
import React from 'react';
import imagen from '../assets/noviembre2024.webp';
import '../style/Home.css'; 


const Home = () => {
  return (
    <div>
      
      <h1>Bienvenido a la página Home</h1>
      
      <img src={imagen} alt="imagen" width="1340" />
    </div>
  );
};

export default Home;
