import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, useParams }
    from 'react-router-dom';
import ArchivePage from './pages/archivepage';
import PageInfo from './pages/pageinfo';
import RawPage from './pages/rawpage'
import Navbar from './components/Navbar';
const App = () => {

    return (
        <Router>
            <Routes>
                <Route exact path='/' element={<ArchivePage />} />
                <Route path='/:hash/:code' element={<PageInfo />} />
                <Route path='/:hash/raw' element={<RawPage />} />    
            </Routes>
        </Router>
    );
}


export default App;
