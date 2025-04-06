import Welcome from './components/welcome';
import QuestionPage from './components/QuestionPage';
// import React,{ useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';



function App() {

  

  return (
    <>
      <Router>
        <Routes>
          <Route exact path='/' Component={Welcome}/>
          <Route path='/questions' Component={QuestionPage}/> 



        </Routes>
      </Router>
    

        
    </>
  )
}

export default App
