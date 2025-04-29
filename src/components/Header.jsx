import React from 'react';

const Header = () => {
  return (
    <header className="site-header">
      <div className="header-container">
        <div className="logo-container">
          <svg className="traffic-icon" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            
            <path d="M100 10 L10 180 L190 180 Z" fill="#e74c3c" />
            
           
            <path d="M100 40 L35 160 L165 160 Z" fill="#e67e22" />
            
           
            <path d="M100 70 L60 140 L140 140 Z" fill="white" />
            
          
            <path d="M42 100 L158 100 L152 130 L48 130 Z" fill="black" />
            
           
            <text x="100" y="115" fill="white" fontFamily="Arial, sans-serif" fontWeight="bold" fontSize="18" textAnchor="middle">Trafik</text>
            
          
            <text x="100" y="128" fill="white" fontFamily="Arial, sans-serif" fontWeight="bold" fontSize="18" textAnchor="middle">Puls031</text>
          </svg>
        </div>
        <div className="title-container">
          <h1>TrafikPuls031</h1>
        </div>
      </div>
    </header>
  );
};

export default Header;
