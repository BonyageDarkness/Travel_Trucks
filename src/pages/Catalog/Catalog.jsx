import { useEffect, useState } from 'react';
import axios from 'axios';
import CamperCard from '../../components/CamperCard/CamperCard';
import FilterForm from '../../components/FilterForm/FilterForm';
import Loader from '../../components/Loader/Loader';
import styles from './Catalog.module.css';

function Catalog() {
    const [campers, setCampers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [filters, setFilters] = useState({});

    useEffect(() => {
        fetchCampers();
    }, [page, filters]);
    const vehicleTypeMapping = {
        Van: 'panelTruck',
        'Fully Integrated': 'fullyIntegrated',
        Alcove: 'alcove',
    };

    const fetchCampers = async () => {
        setIsLoading(true);
        try {
            const params = {
                page,
                limit: 4,
                location: filters.location || undefined,
                form: vehicleTypeMapping[filters.vehicleType] || undefined,
                transmission: filters.equipment?.Automatic
                    ? 'automatic'
                    : undefined, // Если выбран Automatic
                ...Object.keys(filters.equipment || {}).reduce((acc, key) => {
                    if (filters.equipment[key] && key !== 'Automatic') {
                        acc[key] = true;
                    }
                    return acc;
                }, {}),
            };

            const response = await axios.get(
                `https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/campers`,
                { params },
            );

            if (response.data.items.length > 0) {
                setCampers((prevCampers) =>
                    page === 1
                        ? response.data.items
                        : [...prevCampers, ...response.data.items],
                );
                setHasMore(response.data.items.length === 4);
            } else {
                setHasMore(false);
            }
        } catch (error) {
            console.error('Failed to fetch campers:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleApplyFilters = (newFilters) => {
        console.log('Filters applied:', newFilters); // Отладка фильтров
        setPage(1);
        setFilters(newFilters);
    };

    const handleLoadMore = () => {
        if (hasMore) {
            setPage((prevPage) => prevPage + 1);
        }
    };

    console.log('Campers for rendering:', campers); // Проверка списка перед рендером

    return (
        <div className={styles.catalog}>
            <div className={styles.filter}>
                <FilterForm onApplyFilters={handleApplyFilters} />
            </div>
            <div className={styles.content}>
                <div className={styles.list}>
                    {campers.length > 0 ? (
                        campers.map((camper) => (
                            <CamperCard key={camper.id} camper={camper} />
                        ))
                    ) : (
                        <p>No campers available</p>
                    )}
                    {isLoading && <Loader />}
                </div>
                <div className={styles.loadMoreWrapper}>
                    <button
                        className={`${styles.loadMore} ${
                            hasMore ? styles.active : styles.inactive
                        }`}
                        onClick={hasMore ? handleLoadMore : undefined} // Только если есть что загружать
                        disabled={!hasMore || isLoading} // Неактивная кнопка, если нечего загружать
                    >
                        {hasMore ? 'Load More' : 'No More Trucks'}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Catalog;
