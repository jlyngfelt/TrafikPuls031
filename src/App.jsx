import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [data, setData] = useState(null)

  const url = 'https://api.sr.se/api/v2/traffic/messages?trafficareaids=13&sortdate=true&format=json'


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url)
        const json = await response.json()
       
        // console.log(json);
        setData(json.messages)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
    
    fetchData()
  }, [])

console.log(data)

  return (
    <>
     <h1>hej</h1>
    </>
  )
}

export default App
