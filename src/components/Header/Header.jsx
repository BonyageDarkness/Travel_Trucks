import { NavLink } from 'react-router-dom';
import icons from '../../images/Icons/logo.svg';
import styles from './Header.module.css';

function Header() {
    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <NavLink to="/" className={styles.logoLink}>
                    <svg className={styles.logo}>
                        <use href={`${icons}#icon-logo`}></use>
                    </svg>
                </NavLink>
                <nav className={styles.nav}>
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            isActive ? styles.activeLink : styles.link
                        }
                    >
                        Home
                    </NavLink>
                    <NavLink
                        to="/catalog"
                        className={({ isActive }) =>
                            isActive ? styles.activeLink : styles.link
                        }
                    >
                        Catalog
                    </NavLink>
                </nav>
            </div>
        </header>
    );
}

export default Header;
