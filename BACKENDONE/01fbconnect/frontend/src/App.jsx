import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import axios from 'axios'

function App() {
  const [lines, setPoem] = useState([])

  useEffect(() => {
    axios.get('/api/jaun')
      .then((response) => {
        setPoem(response.data);
      })
      .catch((error) => {
        console.log(error)
      })
  })

  return (
    <>
      <h1>radhe radhe</h1>
      <p>POETRY: {lines.length}</p>

      {lines.map((poem) => (
        <div key={poem.id}>
          <h3>title: {poem.title}</h3>
          <h5>Poetry: {poem.poetry}</h5>
        </div>
      ))}
    </>
  )
}

export default App
