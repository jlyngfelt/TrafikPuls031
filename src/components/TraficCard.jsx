import React from 'react';

const formatDateTime = (dateString) => {
  if (!dateString) return '';
  
  const matches = dateString.match(/\/Date\((\d+)([+-]\d{4})?\)\//);
  if (!matches) return 'Ogiltigt datum';
  
  const timestamp = parseInt(matches[1], 10);
  const date = new Date(timestamp);
  
  if (isNaN(date.getTime())) return 'Ogiltigt datum';
  
  return date.toLocaleDateString('sv-SE', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

const TraficCard = ({ title, id, description, location, category, priority, createddate }) => {
  const getPriorityText = (priority) => {
    const texts = {
      1: 'Mycket allvarlig händelse',
      2: 'Stor händelse',
      3: 'Störning',
      4: 'Information',
      5: 'Mindre störning'
    };
    
    return texts[priority] || 'Okänd prioritet';
  };

 
  return (
    <div className={`card ${id}`}>
      <div className="card-content">
        <h2>{title}</h2>
        <p className="card-description">{description}</p>
        {location && <h3 className="card-location">📍 {location}</h3>}
        <h3 className="card-category">🏷️ {category}</h3>
      </div>
      <div className="card-footer">
        <span className="priority-badge">🚨 Prio {priority}</span>
        <span className="date-time">🕒 {formatDateTime(createddate)}</span>
      </div>
    </div>
  );
};

export default TraficCard;