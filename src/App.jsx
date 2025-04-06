import Welcome from './components/welcome';
import QuestionPage from './components/QuestionPage';
import Results from './components/Results';
// import React,{ useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';



function App() {

  

  return (
    <>
      <Router>
        <Routes>
          <Route exact path='/' Component={Welcome}/>
          <Route path='/questions' Component={QuestionPage}/> 
          <Route path='/results' Component={Results}/> 




        </Routes>
      </Router>
    

        
    </>
  )
}

export default App
