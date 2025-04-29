import { useState, useEffect } from "react";
import "./App.css";
import "./styles/styles.css";
import "./styles/header.css"; 
import "./styles/footer.css"; 
import Header from "./components/Header.jsx"; 
import Footer from "./components/Footer.jsx"; 
import TraficCard from "./components/TraficCard.jsx";
import BackgroundColor from "./components/BackgroundColor.jsx";
import TraficCardList from "./components/TraficCardList.jsx";
import InfoBox from "./components/InfoBox.jsx";
import RefreshButton from "./components/RefreshButton.jsx"; 

function App() {
  const [filteredMessages, setFilteredMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  const gbgKeywords = ["göteborg", "hisingen", "mölndal", "landvetter", "partille", "kungälv", "lerum"];

  const isGbgRelated = (message) => {
    const combinedText = `${message.title} ${message.description} ${message.exactlocation}`.toLowerCase();
    
    return gbgKeywords.some(keyword => combinedText.includes(keyword));
  };

 
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
          hasMore = json.pagination.totalpages > page;
        } else {
          hasMore = false;
        }

        const gbgRelatedMessages = allData.filter(isGbgRelated);
        if (gbgRelatedMessages.length >= 50) {
          break;
        }
      }
      
      const gbgMessages = allData
        .filter(isGbgRelated)
        .sort((a, b) => new Date(b.createddate) - new Date(a.createddate))
        .slice(0, 9);
      
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
        <InfoBox />

        <div className="refresh-button-container">
          <RefreshButton onRefresh={fetchAllData} />
        </div>

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