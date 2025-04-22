import { useState, useEffect } from 'react'
import './App.css'
import TraficCard from './components/TraficCard.jsx'
import TraficCardList from './components/TraficCardList.jsx'

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
       
        // console.log(json + "hej");
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
    <div className="app">
    <TraficCardList title="TrafikPuls031">
      {data.map(card => (
        <TraficCard
          key={card.id}
          description={card.description}
          location={card.location}
        />
      ))}
    </TraficCardList>
  </div>
);
};

export default App
