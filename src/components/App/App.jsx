import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from '../Header/Header';
import Home from '../../pages/Home/Home';
import Catalog from '../../pages/Catalog/Catalog';
import CamperDetails from '../../pages/CamperDetails/CamperDetails';

function App() {
    return (
        <Router>
            <div className="App">
                <Header />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/catalog" element={<Catalog />} />
                    <Route path="/catalog/:id" element={<CamperDetails />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
