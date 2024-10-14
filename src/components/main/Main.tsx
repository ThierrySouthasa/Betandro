import { Routes, Route } from 'react-router-dom';
import DailyBet from '../daily-bet/DailyBet';
import Paris from '../daily-bet/paris/Paris';
import About from '../about/About';
import Description from '../description/Description';

const Main = () => {
  return (
    <>
        <Routes>
            <Route path="/daily-bet" element={<DailyBet />} />
            <Route path="/paris" element={<Paris />} />
            <Route path="/about" element={<About />} />
            <Route path="/" element={<Description />} />
        </Routes>
    </>
  )
}

export default Main
