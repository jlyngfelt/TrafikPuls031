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

  const cardStyle = {
    padding: '15px',
    color: '#000',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    overflow: 'hidden', // Förhindrar att innehåll sträcker sig utanför kortet
  };

  const titleStyle = {
    fontSize: '18px',
    margin: '0 0 10px 0',
    lineHeight: '1.3',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden'
  };

  const descriptionStyle = {
    fontSize: '14px',
    lineHeight: '1.5',
    display: '-webkit-box',
    WebkitLineClamp: 3,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    marginBottom: '10px'
  };

  const locationStyle = {
    fontSize: '14px',
    fontWeight: '500',
    margin: '5px 0',
    display: '-webkit-box',
    WebkitLineClamp: 1,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden'
  };

  const categoryStyle = {
    fontSize: '14px',
    fontWeight: '500',
    margin: '5px 0',
    display: '-webkit-box',
    WebkitLineClamp: 1,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden'
  };

  const cardContentStyle = {
    flex: '1 1 auto'
  };

  const cardFooterStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 'auto',
    paddingTop: '10px',
    borderTop: '1px solid rgba(0,0,0,0.1)',
    fontSize: '12px'
  };

  return (
    <div style={cardStyle} className={`card ${id}`}>
      <div style={cardContentStyle}>
        <h2 style={titleStyle}>{title}</h2>
        <p style={descriptionStyle}>{description}</p>
        <h3 style={locationStyle}>{location && `📍 ${location}`}</h3>
        <h3 style={categoryStyle}>🏷️ {category}</h3>
      </div>
      <div style={cardFooterStyle}>
        <span style={{ fontWeight: '600' }}>
          🚨 P{priority}
        </span>
        <span style={{ opacity: '0.9' }}>
          🕒 {formatDateTime(createddate)}
        </span>
      </div>
    </div>
  );
};

export default TraficCard;