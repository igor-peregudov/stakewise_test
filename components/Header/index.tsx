import React from 'react';
import Link from 'next/link';
import Logo from '../../public/logo.svg';
import AccountIcon from '../../public/account.svg';
import styles from './index.module.scss';

const Header = () => {
  return (
    <header className={styles.header}>
      <Link href={'/'}>
        <a>
          <img src={Logo.src} alt="/" />
        </a>
      </Link>
      <Link href={'#'}>
        <a>
          <img src={AccountIcon.src} alt="/" />
        </a>
      </Link>
    </header>
  );
};

export default Header;
