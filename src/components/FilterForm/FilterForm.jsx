import { useState } from 'react';
import styles from './FilterForm.module.css';
import iconMap from '../../images/Icons/filter.svg';

function FilterForm({ onApplyFilters }) {
    const [location, setLocation] = useState('');
    const [vehicleType, setVehicleType] = useState('');
    const [equipment, setEquipment] = useState({
        AC: false,
        kitchen: false,
        bathroom: false,
        TV: false,
        transmission: false,
    });

    const handleEquipmentChange = (e) => {
        const { name, checked } = e.target;
        setEquipment((prev) => ({
            ...prev,
            [name]: checked,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onApplyFilters({ location });

        const cleanedFilters = {
            location: location || undefined,
            vehicleType: vehicleType || undefined,
            equipment: Object.keys(equipment).reduce((acc, key) => {
                if (equipment[key]) {
                    acc[key] = equipment[key];
                }
                return acc;
            }, {}),
        };

        onApplyFilters(cleanedFilters);
    };
    console.log('Icon path:', iconMap);

    return (
        <form className={styles.filterForm} onSubmit={handleSubmit}>
            <div className={styles.field}>
                <label htmlFor="location">Location</label>
                <div className={styles.inputWrapper}>
                    {/* Иконка меняется в зависимости от состояния */}
                    <svg className={styles.icon}>
                        <use
                            href={`${iconMap}#${
                                location ? 'icon-map-1' : 'icon-map'
                            }`} // Меняем id символа
                        />
                    </svg>
                    <input
                        id="location"
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder="City"
                        className={styles.inputWithIcon}
                    />
                </div>
            </div>
            <div className={styles.filter}>
                <p>Filter</p>
            </div>

            <div className={styles.fieldVehicle}>
                <h3>Vehicle Equipment</h3>
                <svg className={styles.iconDivider}>
                    <use href={`${iconMap}#divider`}></use>
                </svg>
                <div className={styles.checkboxContainer}>
                    <div className={styles.checkboxGroup}>
                        <label
                            className={`${styles.checkboxLabel} ${
                                equipment.AC ? styles.active : ''
                            }`}
                        >
                            <input
                                type="checkbox"
                                name="AC"
                                checked={equipment.AC}
                                onChange={handleEquipmentChange}
                            />
                            <svg>
                                <use href={`${iconMap}#icon-wind`}></use>
                            </svg>
                            <span>AC</span>
                        </label>
                        <label
                            className={`${styles.checkboxLabel} ${
                                equipment.Automatic ? styles.active : ''
                            }`}
                        >
                            <input
                                type="checkbox"
                                name="Automatic"
                                checked={equipment.Automatic}
                                onChange={handleEquipmentChange}
                            />
                            <svg>
                                <use href={`${iconMap}#icon-diagram`}></use>
                            </svg>
                            <span>Automatic</span>
                        </label>
                        <label
                            className={`${styles.checkboxLabel} ${
                                equipment.kitchen ? styles.active : ''
                            }`}
                        >
                            <input
                                type="checkbox"
                                name="kitchen"
                                checked={equipment.kitchen}
                                onChange={handleEquipmentChange}
                            />
                            <svg>
                                <use href={`${iconMap}#icon-cup-hot`}></use>
                            </svg>
                            <span>Kitchen</span>
                        </label>
                        <label
                            className={`${styles.checkboxLabel} ${
                                equipment.TV ? styles.active : ''
                            }`}
                        >
                            <input
                                type="checkbox"
                                name="TV"
                                checked={equipment.TV}
                                onChange={handleEquipmentChange}
                            />
                            <svg>
                                <use href={`${iconMap}#icon-tv`}></use>
                            </svg>
                            <span>TV</span>
                        </label>
                        <label
                            className={`${styles.checkboxLabel} ${
                                equipment.bathroom ? styles.active : ''
                            }`}
                        >
                            <input
                                type="checkbox"
                                name="bathroom"
                                checked={equipment.bathroom}
                                onChange={handleEquipmentChange}
                            />
                            <svg>
                                <use href={`${iconMap}#icon-ph_shower`}></use>
                            </svg>
                            <span>Bathroom</span>
                        </label>
                    </div>
                </div>
            </div>

            <div className={styles.fieldVehicle}>
                <h3>Vehicle Type</h3>
                <svg className={styles.iconDivider}>
                    <use href={`${iconMap}#divider`}></use>
                </svg>
                <div className={styles.checkboxGroup}>
                    <label
                        className={`${styles.checkboxLabel} ${
                            vehicleType === 'Van' ? styles.active : ''
                        }`}
                        onClick={() =>
                            setVehicleType(vehicleType === 'Van' ? '' : 'Van')
                        } /* Снимаем выбор */
                    >
                        <svg>
                            <use href={`${iconMap}#icon-bi_grid-1x2`}></use>
                        </svg>
                        <span>Van</span>
                    </label>
                    <label
                        className={`${styles.checkboxLabel} ${
                            vehicleType === 'Fully Integrated'
                                ? styles.active
                                : ''
                        }`}
                        onClick={() =>
                            setVehicleType(
                                vehicleType === 'Fully Integrated'
                                    ? ''
                                    : 'Fully Integrated',
                            )
                        }
                    >
                        <svg>
                            <use href={`${iconMap}#icon-bi_grid`}></use>
                        </svg>
                        <span>Fully Integrated</span>
                    </label>
                    <label
                        className={`${styles.checkboxLabel} ${
                            vehicleType === 'Alcove' ? styles.active : ''
                        }`}
                        onClick={() =>
                            setVehicleType(
                                vehicleType === 'Alcove' ? '' : 'Alcove',
                            )
                        }
                    >
                        <svg>
                            <use href={`${iconMap}#icon-bi_grid-3x3-gap`}></use>
                        </svg>
                        <span>Alcove</span>
                    </label>
                </div>
            </div>

            <button type="submit" className={styles.applyButton}>
                Apply Filters
            </button>
        </form>
    );
}

export default FilterForm;
