import React from 'react';

const TraficGrid = ({ children }) => {
  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)', 
    gap: '15px', 
    width: '100%',
    marginTop: '20px'
  };

  
  const mediaQuery = window.matchMedia('(max-width: 768px)');
  if (mediaQuery.matches) {
    gridStyle.gridTemplateColumns = 'repeat(2, 1fr)'; 
  }

  const smallMediaQuery = window.matchMedia('(max-width: 480px)');
  if (smallMediaQuery.matches) {
    gridStyle.gridTemplateColumns = '1fr'; 
  }

  return (
    <div style={gridStyle}>
      {children}
    </div>
  );
};

export default TraficGrid;