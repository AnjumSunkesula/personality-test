import Welcome from './components/welcome';
import QuestionPage from './components/QuestionPage';
import Results from './components/Results';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Welcome />}/>
          <Route path='/questions' element={<QuestionPage />}/> 
          <Route path='/results' element={<Results />}/> 
        </Routes>
      </Router>
    </>
  )
}
export default App