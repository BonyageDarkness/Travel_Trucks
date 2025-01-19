import { useNavigate } from 'react-router-dom';
import styles from './Home.module.css';

const backgroundImage = new URL(
    '../../images/home/24c0292d5f6fc639a2ab802af8888c21.jpg',
    import.meta.url,
).href;

function Home() {
    const navigate = useNavigate();

    const handleViewNow = () => {
        navigate('/catalog');
    };

    return (
        <div className={styles.home}>
            {/* Фоновое изображение */}
            <div
                className={styles.background}
                style={{
                    backgroundImage: `linear-gradient(
                        0deg,
                        rgba(0, 0, 0, 0.2) 0%,
                        rgba(0, 0, 0, 0.2) 100%
                    ), url(${backgroundImage})`,
                }}
            ></div>
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
