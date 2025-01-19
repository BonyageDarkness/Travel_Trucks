import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Lightbox from 'react-lightbox-component';
import 'react-lightbox-component/build/css/index.css';
import axios from 'axios';
import Loader from '../../components/Loader/Loader';
import styles from './CamperDetails.module.css';
import iconMap from '../../images/Icons/filter.svg';

function CamperDetails() {
    const { id } = useParams();
    const [camper, setCamper] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('features'); // 'features' or 'reviews'

    // Определяем `gallery` как пустой массив или данные из API
    const gallery = camper?.gallery || [];

    useEffect(() => {
        const applyStyles = () => {
            // Применяем стили для галереи
            const galleryContainer = document.querySelector(
                '.lightbox-container',
            );
            if (galleryContainer) {
                galleryContainer.style.display = 'flex';
                galleryContainer.style.gap = '48px';
                galleryContainer.style.marginBottom = '28px';
            }

            // Применяем стили для изображений
            const thumbnails = document.querySelectorAll(
                '.lightbox-img-thumbnail',
            );
            thumbnails.forEach((thumbnail, index) => {
                const image = gallery[index]?.thumb; // Получаем URL из данных API
                if (image) {
                    thumbnail.style.backgroundImage = `url(${image}) `;
                    thumbnail.style.backgroundColor = 'lightgray'; // Задает базовый цвет
                    thumbnail.style.backgroundPosition = '-57.393px -4.681px'; // Смещение изображения
                    thumbnail.style.backgroundSize = '195.679% 103.001%'; // Размер изображения
                    thumbnail.style.backgroundRepeat = 'no-repeat';
                    thumbnail.style.backgroundSize = 'cover';
                    thumbnail.style.backgroundPosition = 'center';
                    thumbnail.style.width = '292px';
                    thumbnail.style.height = '312px';
                    thumbnail.style.objectFit = 'cover';
                    thumbnail.style.borderRadius = '10px';
                    thumbnail.style.flexShrink = '0';
                    thumbnail.style.margin = '0px';
                    thumbnail.style.boxShadow = 'none';
                }
            });
        };

        applyStyles(); // Применяем стили сразу

        return () => {
            // Если потребуется очистка
        };
    }, [gallery]);

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

    const averageRating = (
        camper.reviews.reduce(
            (sum, review) => sum + review.reviewer_rating,
            0,
        ) / camper.reviews.length
    ).toFixed(1);

    return (
        <div className={styles.details}>
            <h2 className={styles.title}>{camper.name}</h2>
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
                        ? camper.location.split(', ').reverse().join(', ')
                        : 'Location not available'}
                </span>
            </div>
            <p className={styles.price}>€{camper.price.toFixed(2)}</p>
            <div className={styles.gallery}>
                {gallery.length > 0 ? (
                    <Lightbox
                        images={gallery.map((image) => ({
                            src: image.thumb,
                            title: camper.name || 'Image',
                            description:
                                camper.description ||
                                'No description available',
                        }))}
                        settings={{
                            overlayBackgroundColor: 'rgba(0, 0, 0, 0.8)',
                        }}
                        thumbnailStyle={{
                            width: '292px',
                            height: '312px',
                            objectFit: 'cover',
                            borderRadius: '10px',
                            margin: '10px',
                            boxShadow: 'none',
                        }}
                    />
                ) : (
                    <p>No images available.</p>
                )}
            </div>

            <p className={styles.description}>{camper.description}</p>

            <nav className={styles.tabs}>
                <a
                    href="#features"
                    className={`${styles.tab} ${
                        activeTab === 'features' ? styles.activeTab : ''
                    }`}
                    onClick={(e) => {
                        e.preventDefault();
                        setActiveTab('features');
                    }}
                >
                    Features
                    {activeTab === 'features' && (
                        <svg className={styles.activeLine}>
                            <use href={`${iconMap}#icon-line_more_red`} />
                        </svg>
                    )}
                </a>
                <a
                    href="#reviews"
                    className={`${styles.tab} ${
                        activeTab === 'reviews' ? styles.activeTab : ''
                    }`}
                    onClick={(e) => {
                        e.preventDefault();
                        setActiveTab('reviews');
                    }}
                >
                    Reviews
                    {activeTab === 'reviews' && (
                        <svg className={styles.activeLine}>
                            <use href={`${iconMap}#icon-line_more_red`} />
                        </svg>
                    )}
                </a>
                <svg className={styles.underline}>
                    <use href={`${iconMap}#icon-line_more`} />
                </svg>
            </nav>
            <div className={styles.container}>
                {activeTab === 'features' && (
                    <div className={styles.featuresSection}>
                        <div className={styles.icons}>
                            {camper.transmission && (
                                <div className={styles.icon}>
                                    <svg>
                                        <use href={`${iconMap}#icon-diagram`} />
                                    </svg>
                                    {camper.transmission
                                        .charAt(0)
                                        .toUpperCase() +
                                        camper.transmission.slice(1)}
                                </div>
                            )}
                            {camper.engine && (
                                <div className={styles.icon}>
                                    <svg>
                                        <use href={`${iconMap}#group`} />
                                    </svg>
                                    {camper.engine.charAt(0).toUpperCase() +
                                        camper.engine.slice(1)}
                                </div>
                            )}
                            {camper.AC && (
                                <div className={styles.icon}>
                                    <svg>
                                        <use href={`${iconMap}#icon-wind`} />
                                    </svg>
                                    AC
                                </div>
                            )}
                            {camper.kitchen && (
                                <div className={styles.icon}>
                                    <svg>
                                        <use href={`${iconMap}#icon-cup-hot`} />
                                    </svg>
                                    Kitchen
                                </div>
                            )}
                            {camper.radio && (
                                <div className={styles.icon}>
                                    <svg>
                                        <use
                                            href={`${iconMap}#icon-ui-radios`}
                                        />
                                    </svg>
                                    Radio
                                </div>
                            )}
                            {camper.refrigerator && (
                                <div className={styles.icon}>
                                    <svg>
                                        <use
                                            href={`${iconMap}#icon-solar_fridge-outline`}
                                        />
                                    </svg>
                                    Refrigerator
                                </div>
                            )}
                            {camper.microwave && (
                                <div className={styles.iconBlack}>
                                    <svg>
                                        <use
                                            href={`${iconMap}#icon-lucide_microwave`}
                                        />
                                    </svg>
                                    Microwave
                                </div>
                            )}
                            {camper.gas && (
                                <div className={styles.iconBlack}>
                                    <svg>
                                        <use
                                            href={`${iconMap}#icon-hugeicons_gas-stove`}
                                        />
                                    </svg>
                                    Gas
                                </div>
                            )}
                            {camper.water && (
                                <div className={styles.iconBlack}>
                                    <svg>
                                        <use
                                            href={`${iconMap}#icon-ion_water-outline`}
                                        />
                                    </svg>
                                    Water
                                </div>
                            )}
                        </div>

                        <div className={styles.detailsFeatures}>
                            <h3>Vehicle Details</h3>
                            <svg className={styles.iconDivider}>
                                <use
                                    href={`${iconMap}#icon-divider_vehicle`}
                                ></use>
                            </svg>
                            <ul>
                                {camper.form && (
                                    <li>
                                        <span className={styles.label}>
                                            Form:
                                        </span>
                                        <span className={styles.value}>
                                            {camper.form}
                                        </span>
                                    </li>
                                )}
                                {camper.length && (
                                    <li>
                                        <span className={styles.label}>
                                            Length:
                                        </span>
                                        <span className={styles.value}>
                                            {camper.length}
                                        </span>
                                    </li>
                                )}
                                {camper.width && (
                                    <li>
                                        <span className={styles.label}>
                                            Width:
                                        </span>
                                        <span className={styles.value}>
                                            {camper.width}
                                        </span>
                                    </li>
                                )}
                                {camper.height && (
                                    <li>
                                        <span className={styles.label}>
                                            Height:
                                        </span>
                                        <span className={styles.value}>
                                            {camper.height}
                                        </span>
                                    </li>
                                )}
                                {camper.tank && (
                                    <li>
                                        <span className={styles.label}>
                                            Tank:
                                        </span>
                                        <span className={styles.value}>
                                            {camper.tank}
                                        </span>
                                    </li>
                                )}
                                {camper.consumption && (
                                    <li>
                                        <span className={styles.label}>
                                            Consumption:
                                        </span>
                                        <span className={styles.value}>
                                            {camper.consumption}
                                        </span>
                                    </li>
                                )}
                            </ul>
                        </div>
                    </div>
                )}

                {activeTab === 'reviews' && (
                    <div className={styles.reviews}>
                        {camper?.reviews?.length > 0 ? (
                            camper.reviews.map((review, index) => (
                                <div key={index} className={styles.review}>
                                    <div className={styles.reviewHeader}>
                                        <div className={styles.reviewAvatar}>
                                            {review.reviewer_name
                                                ?.charAt(0)
                                                .toUpperCase() || 'A'}
                                        </div>
                                        <div className={styles.reviewContent}>
                                            <p className={styles.reviewerName}>
                                                {review.reviewer_name ||
                                                    'Anonymous'}
                                            </p>
                                            <div
                                                className={
                                                    styles.reviewerRating
                                                }
                                            >
                                                {[...Array(5)].map(
                                                    (_, index) => (
                                                        <svg key={index}>
                                                            <use
                                                                href={
                                                                    index <
                                                                    Math.round(
                                                                        review.reviewer_rating,
                                                                    )
                                                                        ? `${iconMap}#icon-star-yellow`
                                                                        : `${iconMap}#icon-star`
                                                                }
                                                            />
                                                        </svg>
                                                    ),
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <p className={styles.reviewText}>
                                        {review.comment ||
                                            'No comment provided.'}
                                    </p>
                                </div>
                            ))
                        ) : (
                            <p>No reviews yet.</p>
                        )}
                    </div>
                )}

                <div className={styles.bookingForm}>
                    <h3>Book your campervan now</h3>
                    <span className={styles.bookingDescription}>
                        Stay connected! We are always ready to help you.
                    </span>
                    <form>
                        <input type="text" placeholder="Name*" required />
                        <input type="email" placeholder="Email*" required />
                        <div className={styles.datePickerWrapper}>
                            <DatePicker
                                selected={selectedDate}
                                onChange={(date) => setSelectedDate(date)}
                                placeholderText="Booking Date*"
                                className={styles.dateInput} // Для стилизации input
                                calendarClassName={styles.calendar} // Для стилизации календаря
                            />
                        </div>
                        <textarea placeholder="Comment" />
                        <button type="submit" className={styles.bookButton}>
                            Send
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default CamperDetails;
