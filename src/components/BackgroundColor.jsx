import React, { useState } from 'react';

const BackgroundColor = ({ priority = 0, children }) => {
  const [count, setCount] = useState(0);
  
  
  const getPriorityColor = (priority) => {
    const colors = {
      1: 'var(--prio-1)', 
      2: 'var(--prio-2)', 
      3: 'var(--prio-3)', 
      4: 'var(--prio-4)', 
      5: 'var(--prio-5)',
    };
    
    return colors[priority] || '#ffffff'; 
  };

  const containerStyle = {
    backgroundColor: getPriorityColor(priority),
    width: '100%',
    borderRadius: '8px',
    marginBottom: '15px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    transition: 'background-color 0.3s ease',
  };

  return (
    <div style={containerStyle}>
      {children}
    </div>
  );
};

export default BackgroundColor;