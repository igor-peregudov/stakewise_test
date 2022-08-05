import styles from './index.module.scss';
import React, { useState } from 'react';
import cn from 'classnames';
import Image from 'next/image';

export interface User {
  name: string;
  image: string;
  id: string;
}

type UserInfoProps = {
  user: User;
};

const UserInfo = (props: UserInfoProps) => {
  const { user } = props;
  const [isLoaded, setIsLoaded] = useState<Boolean>(false);

  const handleLoadedCompleted = () => setIsLoaded(true);
  const [name, surName] = user.name.split(' ');

  return (
    <div
      className={cn(styles.userInfo, {
        [styles.isLoaded]: isLoaded,
      })}
    >
      <div className={styles.imageWrap}>
        <Image
          src={user.image}
          width="168px"
          height="168px"
          onLoad={handleLoadedCompleted}
        />
      </div>
      <div>
        <span>
          {name} <br /> {surName}
        </span>
        <button className={styles.btn}>Add Buddy</button>
      </div>
    </div>
  );
};

export default UserInfo;
