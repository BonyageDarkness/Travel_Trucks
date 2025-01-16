import { Link } from 'react-router-dom';
import styles from './CamperCard.module.css';

function CamperCard({ camper }) {
    return (
        <div className={styles.card}>
            {camper.gallery && camper.gallery[0]?.thumb && (
                <img
                    src={camper.gallery[0].thumb}
                    alt={camper.name}
                    className={styles.image}
                />
            )}
            <h3 className={styles.name}>{camper.name}</h3>
            <p className={styles.location}>{camper.location}</p>
            <p className={styles.price}>€{camper.price.toFixed(2)}</p>
            {/* Кнопка с ссылкой */}
            <Link to={`/catalog/${camper.id}`} className={styles.button}>
                Show More
            </Link>
        </div>
    );
}

export default CamperCard;
