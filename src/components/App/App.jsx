import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux'; // Импортируем Provider
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import store from '../../redux/store'; // Импортируем ваш store
import Header from '../Header/Header';
import Home from '../../pages/Home/Home';
import Catalog from '../../pages/Catalog/Catalog';
import CamperDetails from '../../pages/CamperDetails/CamperDetails';

function App() {
    return (
        <Provider store={store}>
            {' '}
            {/* Оборачиваем в Provider */}
            <Router>
                <div className="App">
                    <Header />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/catalog" element={<Catalog />} />
                        <Route
                            path="/catalog/:id"
                            element={<CamperDetails />}
                        />
                    </Routes>
                    <ToastContainer />
                </div>
            </Router>
        </Provider>
    );
}

export default App;
