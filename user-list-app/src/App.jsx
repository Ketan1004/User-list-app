import React from 'react'
import UserList from './components/Userlist'
import './App.css'

function App() {
  
  return (
    <div className="container mx-auto p-4">
    <h1 className="text-3xl font-bold mb-4">Employees</h1>
    <UserList />
    </div>
  )
}

export default App
