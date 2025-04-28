import React from 'react';

const BackgroundColor = ({ priority = 0, children }) => {
 
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

 
  const style = {
    backgroundColor: getPriorityColor(priority)
  };

  return (
    <div style={style} className="grid-card">
      {children}
    </div>
  );
};

export default BackgroundColor;