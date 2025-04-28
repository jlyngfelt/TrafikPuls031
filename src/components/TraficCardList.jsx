import TraficGrid from "./TraficGrid";

const TraficCardList = ({ heading, children }) => {
  return (
    <div className="card-list">
      {heading && <h2 className="card-list-title">{heading}</h2>}
      <TraficGrid>
        {children}
      </TraficGrid>
    </div>
  );
};

export default TraficCardList;