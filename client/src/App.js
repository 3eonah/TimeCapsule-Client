import './App.css';
import { Route, Routes } from 'react-router-dom';
import KaKao from './api/KaKao';
import Home from './pages/Home';
import OnBoarding from './pages/OnBoarding';
import AddCard from './pages/AddCard';
import AddedCardList from './pages/AddedCardList';
import InsertMusic from './pages/InsertMusic';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<OnBoarding />} />
        <Route path="/oauth/callback/kakao" element={<KaKao />} />
        <Route path="/home" element={<Home />} />
        <Route path="/create/add" element={<AddCard />} />
        <Route path="/create/addedlist" element={<AddedCardList />} />
        <Route path="/create/music" element={<InsertMusic />} />
      </Routes>
    </div>
  );
}

export default App;
