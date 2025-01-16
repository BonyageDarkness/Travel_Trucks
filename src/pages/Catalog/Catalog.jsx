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

    const fetchCampers = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(
                `https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/campers`,
                {
                    params: {
                        page,
                        limit: 4,
                        ...filters,
                    },
                },
            );
            console.log('API Response:', response.data); // Проверяем данные
            if (response.data.items.length > 0) {
                // Изменено на response.data.items
                setCampers(
                    (prevCampers) =>
                        page === 1
                            ? response.data.items // Обновляем весь список
                            : [...prevCampers, ...response.data.items], // Добавляем к существующему
                );
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
            <h1 className={styles.title}>Our Campers</h1>
            <FilterForm onApplyFilters={handleApplyFilters} />
            <div className={styles.grid}>
                {campers.length > 0 ? (
                    campers.map((camper) => (
                        <CamperCard key={camper.id} camper={camper} />
                    ))
                ) : (
                    <p>No campers available</p>
                )}
            </div>
            {isLoading && <Loader />}
            {hasMore && !isLoading && (
                <button className={styles.loadMore} onClick={handleLoadMore}>
                    Load More
                </button>
            )}
        </div>
    );
}

export default Catalog;
