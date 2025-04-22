import React from 'react';
import BackgroundColor from './BackgroundColor';

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
    <BackgroundColor priority={priority}>
      <div className="card-content">
        <h1>{title}</h1>
        <p className="card-description">{description}</p>
        <h3 className="card-location">{location}</h3>
        <h3 className="card-category">{category}</h3>
        <div className="card-footer">
          <p className="date-time">{formatDateTime(createddate)}</p>
        </div>
      </div>
    </BackgroundColor>
  );
};

export default TraficCard;