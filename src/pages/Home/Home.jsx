import { useNavigate } from 'react-router-dom';
import styles from './Home.module.css';

function Home() {
    const navigate = useNavigate();

    const handleViewNow = () => {
        navigate('/catalog');
    };

    return (
        <div className={styles.home}>
            {/* Фоновое изображение */}
            <div className={styles.background}></div>
            {/* Контент баннера */}
            <div className={styles.banner}>
                <h1 className={styles.b}>Campers of your dreams</h1>
                <h2 className={styles.subtitle}>
                    You can find everything you want in our catalog
                </h2>
                <button className={styles.button} onClick={handleViewNow}>
                    View Now
                </button>
            </div>
        </div>
    );
}

export default Home;
