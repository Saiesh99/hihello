import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';

const Navbar: React.FC = () => {
  return (
    <nav className={styles.navbar}>
      <div>
        <Link className={styles.navLink} to="/">Home</Link>
        <Link className={styles.navLink} to="/hourly">Hourly</Link>
        <Link className={styles.navLink} to="/daily">Daily</Link>
        <Link className={styles.navLink} to="/search">Search</Link>
      </div>
    </nav>
  );
};

export default Navbar;
