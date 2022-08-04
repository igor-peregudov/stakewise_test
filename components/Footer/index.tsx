import React from 'react';
import HeartIcon from '../../public/heart.svg';
import styles from './index.module.scss';

const Footer = () => {
  return (
    <div className={styles.footer}>
      Made with <img src={HeartIcon.src} alt="Love" />
    </div>
  );
};

export default Footer;
