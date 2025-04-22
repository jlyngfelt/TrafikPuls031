import { useState, useEffect } from 'react'
import './App.css'
import './styles/styles.css'
import TraficCard from './components/TraficCard.jsx'
import BackgroundColor from './components/BackgroundColor.jsx'
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
          <BackgroundColor 
            key={card.id} 
            priority={card.priority}
          >
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

export default App