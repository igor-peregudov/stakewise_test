import styles from './index.module.scss';
import SearchPanel from '../../components/SearchPanel';
import UsersBlock from '../../components/UsersBlock';
import React, { useState } from 'react';
import cn from 'classnames';
import { User } from '../../components/UserInfo';

export type HomePageProps = {
  buddies: User[];
};

const Home = (props: HomePageProps) => {
  const { buddies } = props;
  const [inputValue, setInputValue] = useState<string>('');
  return (
    <>
      <SearchPanel
        inputValue={inputValue}
        setInputValue={setInputValue}
        users={buddies}
      />
      <div
        className={cn(styles.userBlock, { [styles.transparency]: inputValue })}
      >
        <h2>Fresh cryptobuddies</h2>
        <UsersBlock users={buddies.slice(0, 10)} />
      </div>
    </>
  );
};

export default Home;
