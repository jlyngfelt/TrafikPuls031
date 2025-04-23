import { useState, useEffect } from "react";
import "./App.css";
import "./styles/styles.css";
import TraficCard from "./components/TraficCard.jsx";
import BackgroundColor from "./components/BackgroundColor.jsx";
import TraficCardList from "./components/TraficCardList.jsx";
import InfoBox from "./components/InfoBox.jsx";

function App() {
  const [filteredMessages, setFilteredMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Lista med relevanta sökord för Göteborgsområdet
  const gbgKeywords = ["göteborg", "hisingen", "mölndal", "landvetter", "partille", "kungälv", "lerum"];

  // Funktion för att kontrollera om ett meddelande nämner Göteborgsområdet
  const isGbgRelated = (message) => {
    // Skapa en samlad text från titel, beskrivning och plats
    const combinedText = `${message.title} ${message.description} ${message.exactlocation}`.toLowerCase();
    
    // Kontrollera om någon av nyckelorden finns i den samlade texten
    return gbgKeywords.some(keyword => combinedText.includes(keyword));
  };

  // Huvudfunktion för att hämta och filtrera data från flera sidor
  const fetchAllData = async () => {
    try {
      setLoading(true);
      let allData = [];
      let page = 1;
      let hasMore = true;
      
      while (hasMore && page <= 18) {
        const response = await fetch(
          `https://api.sr.se/api/v2/traffic/messages?sortdate=true&format=json&page=${page}`
        );
        const json = await response.json();
        
        if (json.messages && json.messages.length > 0) {
          allData = [...allData, ...json.messages];
          page++;
          // Kolla om det finns fler sidor
          hasMore = json.pagination.totalpages > page;
        } else {
          hasMore = false;
        }
        
        // Om vi har samlat tillräckligt många meddelanden för Göteborgsområdet, kan vi avbryta
        const gbgRelatedMessages = allData.filter(isGbgRelated);
        if (gbgRelatedMessages.length >= 50) {
          break;
        }
      }
      
      // Filtrera, sortera och begränsa direkt utan mellanlagring
      const gbgMessages = allData
        .filter(isGbgRelated)
        .sort((a, b) => new Date(b.createddate) - new Date(a.createddate))
        .slice(0, 12);
      
      setFilteredMessages(gbgMessages);
      setError(null);
    } catch (error) {
      console.error("Error fetching all data:", error);
      setError("Ett fel uppstod vid hämtning av trafikdata.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  console.log("Filtrerade meddelanden:", filteredMessages);

  if (loading) {
    return <div className="app">Laddar trafikdata från hela regionen...</div>;
  }

  if (error) {
    return <div className="app">Fel: {error}</div>;
  }

  if (!filteredMessages || filteredMessages.length === 0) {
    return <div className="app">Inga trafikmeddelanden för Göteborgsområdet hittades.</div>;
  }

  return (
    <div className="app" style={{ padding: "20px" }}>
      {/* Visa förklarande tabell för prioritetsnivåer */}
      <InfoBox />

      {/* Visa trafikdata med färgkodning baserat på prioritet */}
      <TraficCardList heading="TrafikPuls031">
        {filteredMessages.map((card) => (
          <BackgroundColor key={card.id} priority={card.priority}>
            <TraficCard
              id={card.id}
              description={card.description}
              title={card.title}
              location={card.exactlocation}
              category={card.subcategory}
              priority={card.priority}
              createddate={card.createddate}
            />
          </BackgroundColor>
        ))}
      </TraficCardList>
    </div>
  );
}

export default App;