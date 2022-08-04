import React from 'react';
import HeartIcon from '../../public/heart.svg';
import styles from './index.module.scss';
import Image from 'next/image';

const Footer = () => {
  return (
    <div className={styles.footer}>
      Made with <Image src={HeartIcon.src} width="18px" height="16px" />
    </div>
  );
};

export default Footer;
