import React from 'react';
import Link from 'next/link';
import Logo from '../../public/logo.svg';
import AccountIcon from '../../public/account.svg';
import styles from './index.module.scss';
import Image from 'next/image';

const Header = () => {
  return (
    <header className={styles.header}>
      <Link href={'/'}>
        <a>
          <Image src={Logo.src} width="28px" height="18px" />
        </a>
      </Link>
      <Link href={'#'}>
        <a>
          <Image src={AccountIcon.src} width="18px" height="23px" />
        </a>
      </Link>
    </header>
  );
};

export default Header;
