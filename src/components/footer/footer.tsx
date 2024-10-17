import React, { FC } from 'react';
import styles from './footer.module.scss';

export const Footer: FC = () => {
  return (
    <footer className={styles.container_footer}>
      <p>&copy; 2024 My Company</p>
    </footer>
  );
};
