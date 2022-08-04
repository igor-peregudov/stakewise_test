import React, { ReactNode } from 'react';
import Footer from '../Footer';
import styles from './index.module.scss';
import Header from '../Header';

type AppLayoutProps = {
  children: ReactNode;
};

const AppLayout = (props: AppLayoutProps) => {
  const { children } = props;

  return (
    <div className={styles.container}>
      <Header />
      <div>{children}</div>
      <Footer />
    </div>
  );
};

export default AppLayout;
