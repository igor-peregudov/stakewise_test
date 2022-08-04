import styles from './index.module.scss';
import React, { useEffect, useState } from 'react';
import cn from 'classnames';

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

  useEffect(() => {
    getImage();
  });

  const getImage = () => {
    let img: HTMLImageElement = new Image();
    img.onload = function () {
      setIsLoaded(true);
    };
    img.src = user.image;
  };

  const [name, surName] = user.name.split(' ');

  return (
    <div
      className={cn(styles.userInfo, {
        [styles.isLoaded]: isLoaded,
      })}
    >
      <img src={user.image} alt="" />
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
