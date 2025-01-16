import { useState } from 'react';
import styles from './FilterForm.module.css';

function FilterForm({ onApplyFilters }) {
    const [location, setLocation] = useState('');
    const [vehicleType, setVehicleType] = useState('');
    const [equipment, setEquipment] = useState({
        AC: false,
        kitchen: false,
        bathroom: false,
        TV: false,
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
        onApplyFilters({ location, vehicleType, equipment });
    };

    return (
        <form className={styles.filterForm} onSubmit={handleSubmit}>
            <div className={styles.field}>
                <label htmlFor="location">Location</label>
                <input
                    id="location"
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Enter location"
                />
            </div>
            <div className={styles.field}>
                <label htmlFor="vehicleType">Vehicle Type</label>
                <select
                    id="vehicleType"
                    value={vehicleType}
                    onChange={(e) => setVehicleType(e.target.value)}
                >
                    <option value="">All</option>
                    <option value="Van">Van</option>
                    <option value="Fully Integrated">Fully Integrated</option>
                    <option value="Alcove">Alcove</option>
                </select>
            </div>
            <div className={styles.field}>
                <span>Vehicle Equipment</span>
                <div className={styles.checkboxGroup}>
                    <label>
                        <input
                            type="checkbox"
                            name="AC"
                            checked={equipment.AC}
                            onChange={handleEquipmentChange}
                        />
                        AC
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="kitchen"
                            checked={equipment.kitchen}
                            onChange={handleEquipmentChange}
                        />
                        Kitchen
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="bathroom"
                            checked={equipment.bathroom}
                            onChange={handleEquipmentChange}
                        />
                        Bathroom
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="TV"
                            checked={equipment.TV}
                            onChange={handleEquipmentChange}
                        />
                        TV
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
