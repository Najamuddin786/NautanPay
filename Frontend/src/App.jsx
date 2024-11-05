import { useState } from 'react'
import AllRouter from './Components/AllRouter'



function App() {
  const [count, setCount] = useState(0)

  return (
     <AllRouter/>
  )
}

export default App
