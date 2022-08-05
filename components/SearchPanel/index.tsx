import React, { ChangeEvent, useEffect, useRef } from 'react';
import styles from './index.module.scss';
import SearchIcon from '../../public/search.svg';
import ClearIcon from '../../public/clear.svg';
import UsersBlock from '../UsersBlock';
import cn from 'classnames';
import { User } from '../UserInfo';
import Image from 'next/image';
import initsmoothCarets from '../../utils/smoothCaret';

type SearchPanelProps = {
  inputValue?: string;
  users?: User[];
  setInputValue: (value: string) => void;
};

const SearchPanel = (props: SearchPanelProps) => {
  const { inputValue = '', setInputValue, users = [] } = props;
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    // initsmoothCarets();
  }, []);
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
      <div className={cn('sc-container', styles.inputWrapper)}>
        <div className={styles.searchImage}>
          <Image src={SearchIcon.src} width="40px" height="40px" />
        </div>
        <textarea
          data-sc=""
          ref={inputRef}
          value={inputValue}
          className={cn('smoothCaretInput', styles.textarea, {
            [styles.fullHeight]: countOfRows > 1,
          })}
          placeholder="Crypto buddies"
          onInput={handleChangeInput}
        ></textarea>
        <div
          className="caret"
          style={{ width: '2px', height: '60%', backgroundColor: '#00a6ff' }}
        />
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
