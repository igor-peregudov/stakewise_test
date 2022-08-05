import React from 'react';
import styles from './index.module.scss';
import SearchIcon from '../../public/search.svg';
import ClearIcon from '../../public/clear.svg';
import UsersBlock from '../UsersBlock';
import cn from 'classnames';
import { User } from '../UserInfo';
import Image from 'next/image';
import ContentEditable from '../ContentEditable';

type SearchPanelProps = {
  inputValue?: string;
  users?: User[];
  setInputValue: (value: string) => void;
};

const SearchPanel = (props: SearchPanelProps) => {
  const { inputValue = '', setInputValue, users = [] } = props;

  const handleChangeInput = (text: string) => {
    setInputValue(text);
  };

  const getFilteredUsers = () => {
    const [fieldName, fieldSurname] = inputValue.split(' ');

    return users.filter((user) => {
      const [userName, userSurname] = user.name.split(' ');

      const isMatchFirstName = userName
        ?.toLowerCase()
        .includes(fieldName?.toLowerCase());
      const isMatchSurname = userSurname
        ?.toLowerCase()
        .includes(fieldSurname?.toLowerCase());

      if (fieldSurname) {
        return isMatchFirstName && isMatchSurname;
      }
      return isMatchFirstName;
    });
  };

  const handleClearTextarea = () => {
    setInputValue('');

    const fields = document.querySelectorAll<HTMLElement>('.smoothCaretInput');
    fields[0].innerText = '';
    fields[1].innerText = '';
    const fieldWrap = document.querySelector('.sc-wrap') as HTMLElement;
    fieldWrap.classList.add('isEmpty');
  };

  const filteredUsers = getFilteredUsers();

  return (
    <>
      <div className={cn(styles.inputWrapper)}>
        <div className={styles.searchImage}>
          <Image src={SearchIcon.src} width="40px" height="40px" />
        </div>
        <ContentEditable handleChangeInput={handleChangeInput} />
        {inputValue && (
          <div className={styles.clearBtn}>
            <Image
              src={ClearIcon.src}
              width="24px"
              height="24px"
              onClick={handleClearTextarea}
              alt="clear"
            />
          </div>
        )}
      </div>
      {inputValue && (
        <UsersBlock users={filteredUsers} className={cn(styles.searchResult)} />
      )}
    </>
  );
};

export default SearchPanel;
