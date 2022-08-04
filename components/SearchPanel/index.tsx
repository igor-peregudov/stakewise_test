import React, { ChangeEvent, useEffect, useRef } from 'react';
import styles from './index.module.scss';
import SearchIcon from '../../public/search.svg';
import ClearIcon from '../../public/clear.svg';
import UsersBlock from '../UsersBlock';
import cn from 'classnames';
import { User } from '../UserInfo';

type SearchPanelProps = {
  inputValue?: string;
  users?: User[];
  setInputValue: (value: string) => void;
};

const SearchPanel = (props: SearchPanelProps) => {
  const { inputValue = '', setInputValue, users = [] } = props;
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    inputRef?.current?.focus();
  }, [inputRef]);

  const handleChangeInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    let newValue = e.target.value.replace(/\s/g, '\n');
    const regExp = /^[a-zA-Z\n]*$/g;

    const newValueArr = newValue.split('\n');
    if (newValueArr.length > 2) {
      return;
    }

    if (regExp.test(newValue)) {
      setInputValue(newValue);
    }
  };

  const getFilteredUsers = () => {
    const [fieldName, fieldSurname] = inputValue.split('\n');

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
    inputRef?.current?.focus();
  };

  const filteredUsers = getFilteredUsers();
  const countOfRows = inputValue.split('\n').length;

  return (
    <>
      <div className={styles.inputWrapper}>
        <img src={SearchIcon.src} alt="" />
        <textarea
          ref={inputRef}
          value={inputValue}
          className={cn(styles.textarea, {
            [styles.fullHeight]: countOfRows > 1,
          })}
          placeholder="Crypto buddies"
          onInput={handleChangeInput}
        ></textarea>
        {inputValue && (
          <img
            src={ClearIcon.src}
            alt="clear"
            className={styles.clearBtn}
            onClick={handleClearTextarea}
          />
        )}
      </div>
      {inputValue && (
        <UsersBlock users={filteredUsers} className={cn(styles.searchResult)} />
      )}
    </>
  );
};

export default SearchPanel;
