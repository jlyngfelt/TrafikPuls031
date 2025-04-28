import { useState, useEffect } from "react";
import "./App.css";
import "./styles/styles.css";
import "./styles/header.css"; // Importera header-stilarna
import "./styles/footer.css"; // Importera footer-stilarna
import Header from "./components/Header.jsx"; // Importera Header-komponenten
import Footer from "./components/Footer.jsx"; // Importera Footer-komponenten
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
    return (
      <div className="app">
        <Header />
        <div className="loading-container">Laddar trafikdata från hela regionen...</div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="app">
        <Header />
        <div className="error-container">Fel: {error}</div>
        <Footer />
      </div>
    );
  }

  if (!filteredMessages || filteredMessages.length === 0) {
    return (
      <div className="app">
        <Header />
        <div className="no-data-container">Inga trafikmeddelanden för Göteborgsområdet hittades.</div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="app">
      <Header />
      <div className="content-container">
        {/* Visa förklarande tabell för prioritetsnivåer */}
        <InfoBox />

        {/* Visa trafikdata med färgkodning baserat på prioritet */}
        <TraficCardList>
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
      <Footer />
    </div>
  );
}

export default App;