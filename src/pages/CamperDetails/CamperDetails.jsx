import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Loader from '../../components/Loader/Loader';
import styles from './CamperDetails.module.css';

function CamperDetails() {
    const { id } = useParams();
    const [camper, setCamper] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('features'); // 'features' or 'reviews'

    useEffect(() => {
        const fetchCamperDetails = async () => {
            try {
                const response = await axios.get(
                    `https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/campers/${id}`,
                );
                console.log('Camper data:', response.data);
                setCamper(response.data);
            } catch (error) {
                console.error('Failed to fetch camper details:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchCamperDetails();
    }, [id]);

    if (isLoading) return <Loader />;
    if (!camper) return <p>Camper not found</p>;

    return (
        <div className={styles.details}>
            <h1 className={styles.title}>{camper.name}</h1>
            <div className={styles.gallery}>
                {camper?.gallery?.length > 0 ? (
                    camper.gallery.map((image, index) => (
                        <img
                            key={index}
                            src={image.thumb}
                            alt={camper.name}
                            className={styles.image}
                        />
                    ))
                ) : (
                    <p>No images available.</p>
                )}
            </div>

            <p className={styles.location}>{camper.location}</p>
            <p className={styles.price}>€{camper.price.toFixed(2)}</p>
            <p className={styles.description}>{camper.description}</p>

            <div className={styles.tabs}>
                <button
                    className={`${styles.tab} ${
                        activeTab === 'features' ? styles.activeTab : ''
                    }`}
                    onClick={() => setActiveTab('features')}
                >
                    Features
                </button>
                <button
                    className={`${styles.tab} ${
                        activeTab === 'reviews' ? styles.activeTab : ''
                    }`}
                    onClick={() => setActiveTab('reviews')}
                >
                    Reviews
                </button>
            </div>

            {activeTab === 'features' && (
                <div className={styles.features}>
                    <h3>Vehicle Details</h3>
                    <ul>
                        {camper.transmission && (
                            <li>Transmission: {camper.transmission}</li>
                        )}
                        {camper.engine && <li>Engine: {camper.engine}</li>}
                        {camper.AC && <li>AC: Yes</li>}
                        {camper.bathroom && <li>Bathroom: Yes</li>}
                        {camper.kitchen && <li>Kitchen: Yes</li>}
                        {camper.TV && <li>TV: Yes</li>}
                        {camper.radio && <li>Radio: Yes</li>}
                        {camper.refrigerator && <li>Refrigerator: Yes</li>}
                        {camper.microwave && <li>Microwave: Yes</li>}
                        {camper.gas && <li>Gas: Yes</li>}
                        {camper.water && <li>Water: Yes</li>}
                        {camper.length && <li>Length: {camper.length}</li>}
                        {camper.width && <li>Width: {camper.width}</li>}
                        {camper.height && <li>Height: {camper.height}</li>}
                        {camper.tank && <li>Tank: {camper.tank}</li>}
                        {camper.consumption && (
                            <li>Consumption: {camper.consumption}</li>
                        )}
                    </ul>
                </div>
            )}

            {activeTab === 'reviews' && (
                <div className={styles.reviews}>
                    <h3>Reviews</h3>
                    {camper?.reviews?.length > 0 ? (
                        camper.reviews.map((review, index) => (
                            <div key={index} className={styles.review}>
                                <p>
                                    <strong>
                                        {review.reviewer_name || 'Anonymous'}
                                    </strong>
                                </p>
                                <p>
                                    Rating:{' '}
                                    {review.reviewer_rating
                                        ? `${review.reviewer_rating} / 5`
                                        : 'Not rated'}
                                </p>
                                <p>{review.comment}</p>
                            </div>
                        ))
                    ) : (
                        <p>No reviews yet.</p>
                    )}
                </div>
            )}

            <div className={styles.bookingForm}>
                <h3>Book your campervan now</h3>
                <form>
                    <input type="text" placeholder="Name" required />
                    <input type="email" placeholder="Email" required />
                    <input type="date" placeholder="Booking Date" required />
                    <textarea placeholder="Comment" />
                    <button type="submit" className={styles.bookButton}>
                        Send
                    </button>
                </form>
            </div>
        </div>
    );
}

export default CamperDetails;
