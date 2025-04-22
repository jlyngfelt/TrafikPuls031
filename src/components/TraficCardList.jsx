import TraficCard from './TraficCard.jsx'

const TraficCardList = ({ heading, children }) => {
    return (
      <div className="card-list">
        {heading && <h2 className="card-list-title">{heading}</h2>}
          {children}
        </div>
    );
  };
  
  export default TraficCardList;