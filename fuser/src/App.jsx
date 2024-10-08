import React from 'react'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import About from '../src/components/About'
import Contact from '../src/components/Contact'
import Home from '../src/components/Home'
import Scratch from '../src/components/Scratch'

import './App.css'

import { Header } from './components/Header'
import Fortunewheel from './components/Fortunewheel'

import Footer from './components/Footer'
import Scard from './components/Scard'
import Celebration from './components/Celebration'

function App() {
  

  return (
    <>
    <BrowserRouter>
    <Header/>
    
    <Routes>
    <Route path='/' element={<Home/>}></Route>
    <Route path='/contact' element={<Contact/>}></Route>
    <Route path='/about' element={<About/>}></Route>
    <Route path='/Form' element={<Scratch/>}></Route>
    <Route path='/celebration' element={<Celebration/>}></Route>
    <Route path='/card' element={<Scard/>}></Route>
    </Routes>
    </BrowserRouter>
    <Footer/>
  </>
    
  )
}

export default App
