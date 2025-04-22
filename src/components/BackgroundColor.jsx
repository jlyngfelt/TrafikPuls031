import React, { useState } from 'react';

const BackgroundColor = ({ priority = 0 }) => {
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
    height: '100%',
    padding: '20px',
    transition: 'background-color 0.3s ease',
    borderRadius: '8px',
  };

  return (
    <div style={containerStyle}>
      <div>Prioritet: {priority}</div>
      <div>Count: {count}</div>
    </div>
  );
};

export default BackgroundColor;