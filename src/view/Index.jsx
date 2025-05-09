import React from 'react'
import { useNavigate } from 'react-router-dom'

const Index = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h1>Index</h1>
      <button onClick={()=>navigate('/login')}>login</button>
    </div>
  )
}

export default Index
