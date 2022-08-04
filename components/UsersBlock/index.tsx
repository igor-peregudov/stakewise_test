import React from 'react';
import styles from './index.module.scss';
import Link from 'next/link';
import cn from 'classnames';
import { User } from '../UserInfo';

type UsersBlock = {
  users: User[];
  className?: string;
};

const UsersBlock = (props: UsersBlock) => {
  const { users, className = '' } = props;
  if (!users?.length) return null;
  return (
    <div className={cn(styles.userWrapper, className)}>
      {users.map((user) => (
        <Link href={`/details/${user.id}`} key={user.id}>
          <div className={styles.user}>
            <img src={user.image} alt="" />
            <span>{user.name}</span>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default UsersBlock;