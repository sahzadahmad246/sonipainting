import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Nav from './Components/header/Nav'
import Home from './Components/pages/Home'
import {Outlet} from 'react-router-dom'
function App() {


  return (
    <>
      <Nav/>
<Outlet/>
    </>
  )
}

export default App
