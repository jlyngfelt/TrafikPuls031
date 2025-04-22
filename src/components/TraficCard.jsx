import React from 'react';

// Funktion för att formatera Microsoft JSON-datum: /Date(timestamp+offset)/
const formatDateTime = (dateString) => {
    if (!dateString) return '';
    
    // Extraherar timestamp från Microsoft JSON-datum
    const matches = dateString.match(/\/Date\((\d+)([+-]\d{4})?\)\//);
    if (!matches) return 'Ogiltigt datum';
    
    // Konvertera timestamp (millisekunder) till Date-objekt
    const timestamp = parseInt(matches[1], 10);
    const date = new Date(timestamp);
    
    // Kontrollera om datumet är giltigt
    if (isNaN(date.getTime())) return 'Ogiltigt datum';
    
    // Formatera till svenska datum
    return date.toLocaleDateString('sv-SE', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

const TraficCard = ({ title, id, description, location, category, priority, createddate }) => {
  return (
    <div className={`card ${id}`}>
        <h1>{title}</h1>
      <div className="card-content">
        <p className="card-description">{description}</p>
          <h3 className="card-location">{location}</h3>
          <h3 className="card-category">{category}</h3>
        <div className="card-footer">
          <p className="card-priority">{priority}</p>
          <p className="date-time">{formatDateTime(createddate)}</p>
        </div>
      </div>
    </div>
  );
};

export default TraficCard;