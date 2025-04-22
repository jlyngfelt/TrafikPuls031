import { useState, useEffect } from 'react'
import './App.css'
import './styles/styles.css'
import TraficCard from './components/TraficCard.jsx'
import TraficCardList from './components/TraficCardList.jsx'
import InfoBox from './components/InfoBox.jsx'

function App() {
  const [count, setCount] = useState(0)
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const url = 'https://api.sr.se/api/v2/traffic/messages?trafficareaids=13&sortdate=true&format=json'

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const response = await fetch(url)
        const json = await response.json()
        setData(json.messages)
        setError(null)
      } catch (error) {
        console.error('Error fetching data:', error)
        setError('Ett fel uppstod vid hämtning av trafikdata.')
      } finally {
        setLoading(false)
      }
    }
    
    fetchData()
  }, [])

  if (loading) {
    return <div className="app">Laddar trafikdata...</div>;
  }

  if (error) {
    return <div className="app">Fel: {error}</div>;
  }

  if (!data || data.length === 0) {
    return <div className="app">Laddar data...</div>;
  }

  return (
    <div className="app" style={{ padding: '20px' }}>
      {/* Visa förklarande tabell för prioritetsnivåer */}
      <InfoBox />

      {/* Visa trafikdata med färgkodning baserat på prioritet */}
      <TraficCardList heading="TrafikPuls031">
        {data.map(card => (
          <TraficCard
            key={card.id}
            description={card.description}
            title={card.title}
            location={card.exactlocation}
            category={card.subcategory}
            priority={card.priority}
            createddate={card.createddate}
          />
        ))}
      </TraficCardList>

      {/* För demonstration: Visa alla färger i en rad */}
      <div style={{ marginTop: '40px' }}>
        <h3>Färgdemo:</h3>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <div style={{ backgroundColor: "var(--prio-1)", width: "100px", height: "100px", borderRadius: "8px", boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}></div>
          <div style={{ backgroundColor: "var(--prio-2)", width: "100px", height: "100px", borderRadius: "8px", boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}></div>
          <div style={{ backgroundColor: "var(--prio-3)", width: "100px", height: "100px", borderRadius: "8px", boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}></div>
          <div style={{ backgroundColor: "var(--prio-4)", width: "100px", height: "100px", borderRadius: "8px", boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}></div>
          <div style={{ backgroundColor: "var(--prio-5)", width: "100px", height: "100px", borderRadius: "8px", boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}></div>
        </div>
      </div>
    </div>
  );
}

export default App