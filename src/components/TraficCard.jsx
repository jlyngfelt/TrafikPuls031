import React from 'react';


const TraficCard = ({ title, id, description, location, category, priority, date }) => {
  return (
    <div className={`card ${id}`}>
        <h1>{title}</h1>
      <div className="card-content">
        <p className="card-description">{description}</p>
          <h3 className="card-location">{location}</h3>
          <h3 className="card-location">{category}</h3>
        <div className="card-footer">
          <p className="card-location">{priority}</p>
          <p className="card-location">{date}</p>
        </div>
      </div>
    </div>
  );
};

export default TraficCard;