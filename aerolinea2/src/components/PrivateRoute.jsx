// src/components/PrivateRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, isAuthenticated }) => {
 
   // Si el usuario no está autenticado, redirige al home
    if (!isAuthenticated) {
         return <Navigate to="/" replace />;
      
    }
    // Si el usuario está autenticado, muestra el contenido protegido
    return children;
      
};


export default PrivateRoute;
