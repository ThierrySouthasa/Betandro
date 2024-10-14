import './App.css'
import Header from './components/header/Header'
import Main from './components/main/Main';
import { BrowserRouter as Router } from 'react-router-dom';

function App() {

  return (
    <>
    <Router>
      <Header />
      <Main />
    </Router>
    </>
  )
}

export default App
