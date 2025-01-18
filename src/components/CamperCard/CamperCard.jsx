import { Link } from 'react-router-dom';
import styles from './CamperCard.module.css';
import iconMap from '../../images/Icons/filter.svg';

function CamperCard({ camper }) {
    const averageRating = (
        camper.reviews.reduce(
            (sum, review) => sum + review.reviewer_rating,
            0,
        ) / camper.reviews.length
    ).toFixed(1);

    return (
        <div className={styles.card}>
            <img
                src={camper.gallery && camper.gallery[0]?.thumb}
                alt={camper.name}
                className={styles.image}
            />
            <div className={styles.details}>
                <div>
                    <div className={styles.header}>
                        <h2 className={styles.name}>{camper.name}</h2>
                        <div className={styles.priceAndHeart}>
                            <p className={styles.price}>
                                €{camper.price.toFixed(2)}
                            </p>
                            <svg className={styles.heartIcon}>
                                <use href={`${iconMap}#heart`} />
                            </svg>
                        </div>
                    </div>
                    <div className={styles.ratingAndLocation}>
                        <span className={styles.rating}>
                            <svg className={styles.starIcon}>
                                <use href={`${iconMap}#icon-star-yellow`} />
                            </svg>
                            {averageRating} ({camper.reviews.length} Reviews)
                        </span>
                        <span className={styles.location}>
                            <svg className={styles.locationIcon}>
                                <use href={`${iconMap}#icon-map`} />
                            </svg>
                            {camper.location
                                ? camper.location
                                      .split(', ')
                                      .reverse()
                                      .join(', ')
                                : 'Location not available'}
                        </span>
                    </div>

                    <p className={styles.description}>
                        {camper.description.length > 80
                            ? `${camper.description.substring(0, 80)}...`
                            : camper.description}
                    </p>
                    <div className={styles.features}>
                        {camper.transmission && (
                            <span className={styles.feature}>
                                <svg className={styles.featureIcon}>
                                    <use href={`${iconMap}#icon-diagram`} />
                                </svg>
                                {camper.transmission.charAt(0).toUpperCase() +
                                    camper.transmission.slice(1)}
                            </span>
                        )}
                        {camper.engine && (
                            <span className={styles.feature}>
                                <svg className={styles.featureIcon}>
                                    <use href={`${iconMap}#group`} />
                                </svg>
                                {camper.engine.charAt(0).toUpperCase() +
                                    camper.engine.slice(1)}
                            </span>
                        )}
                        {camper.TV && (
                            <span className={styles.feature}>
                                <svg className={styles.featureIcon}>
                                    <use href={`${iconMap}#icon-tv`} />
                                </svg>
                                TV
                            </span>
                        )}
                        {camper.AC && (
                            <span className={styles.feature}>
                                <svg className={styles.featureIcon}>
                                    <use href={`${iconMap}#icon-wind`} />
                                </svg>
                                AC
                            </span>
                        )}
                        {camper.kitchen && (
                            <span className={styles.feature}>
                                <svg className={styles.featureIcon}>
                                    <use href={`${iconMap}#icon-cup-hot`} />
                                </svg>
                                Kitchen
                            </span>
                        )}
                        {camper.bathroom && (
                            <span className={styles.feature}>
                                <svg className={styles.featureIcon}>
                                    <use href={`${iconMap}#icon-ph_shower`} />
                                </svg>
                                Bathroom
                            </span>
                        )}
                    </div>
                </div>
                <div className={styles.footer}>
                    <Link
                        to={`/catalog/${camper.id}`}
                        className={styles.button}
                    >
                        Show More
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default CamperCard;
