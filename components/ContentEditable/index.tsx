import React, { useEffect, useRef } from 'react';
import styles from './index.module.scss';
import initsmoothCarets from '../../utils/smoothCaret';
import cn from 'classnames';

type ContentEditable = {
  handleChangeInput: (value: string) => void;
};

const ContentEditable = (props: ContentEditable) => {
  const { handleChangeInput } = props;
  const inputRef = useRef<HTMLDivElement>(null);
  const handleChangeCaretPosRef = useRef<Function>(() => {});

  useEffect(() => {
    inputRef?.current?.focus();
    handleChangeCaretPosRef.current();
  }, [inputRef]);

  useEffect(() => {
    handleChangeCaretPosRef.current = initsmoothCarets();
  }, []);

  let text = '';

  const setCaretPosToEnd = (elem: HTMLElement) => {
    const selection: Selection | null = window.getSelection();
    const range = document.createRange();
    selection?.removeAllRanges();
    range.selectNodeContents(elem);
    range.collapse(false);
    selection?.addRange(range);
    elem.focus();
    handleChangeCaretPosRef.current();
  };

  const handleChange = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const currentInnerText = e.currentTarget.innerText;
    const letters = currentInnerText.split('');
    const regExp = /[^a-zA-Z]/g;

    const nextField = document.querySelectorAll(
      '.smoothCaretInput'
    )[1] as HTMLElement;

    e.currentTarget.innerHTML = letters
      .map((l, i) => {
        //If it's a break line, move the caret to a new line.
        if (/\n/.test(l) && text) {
          setTimeout(() => {
            nextField.focus();
            handleChangeCaretPosRef.current();
          }, 0);
          return '';
        }
        //If it's a space, move the caret to a new line.
        if (/\s/.test(l) && currentInnerText.trim()) {
          setTimeout(() => {
            nextField.focus();
            handleChangeCaretPosRef.current();
          }, 0);
          return '';
        }
        //Prohibit typing anything but characters
        if (regExp.test(l)) return null;
        if (i === letters.length - 1 && text.length < currentInnerText.length) {
          return `<span>${l}</span>`;
        }
        return `<span class=${styles.open}>${l}</span>`;
      })
      .join('');

    text = currentInnerText;

    setCaretPosToEnd(e.target);
    setTimeout(() => {
      const spans = e.target.querySelectorAll('span');
      spans[spans.length - 1]?.classList.add(styles.open);
    }, 1);

    const fields = document.querySelectorAll<HTMLElement>('.smoothCaretInput');
    const name = fields[0].innerText || '';
    const surname = fields[1].innerText || '';
    const fieldWrap = document.querySelector('.sc-wrap') as HTMLElement;

    if (name || surname) {
      fieldWrap.classList.remove('isEmpty');
      handleChangeInput(`${name} ${surname}`);
    } else {
      fieldWrap.classList.add('isEmpty');
      handleChangeInput('');
    }
  };

  /**
   * Set focus to previous div after clearing current one
   * @param e
   */
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const key = e.keyCode || e.charCode;
    const prevField = document.querySelectorAll(
      '.smoothCaretInput'
    )[0] as HTMLElement;
    const letters = e.currentTarget.innerText.trim().length;
    if ((key == 8 || key == 46) && !letters) {
      setTimeout(() => {
        prevField.focus();
        setCaretPosToEnd(prevField);
      }, 0);
    }
  };

  return (
    <div className={cn('sc-wrap', 'isEmpty', styles.wrap)}>
      <div className={'sc-container'}>
        <div
          data-sc={''}
          ref={inputRef}
          onInput={handleChange}
          contentEditable="true"
          className={cn('smoothCaretInput', styles.textarea)}
          placeholder="Crypto"
          onKeyDown={handleKeyDown}
        ></div>
        <div className={styles.caret} />
      </div>

      <div className={'sc-container'}>
        <div
          data-sc={''}
          onInput={handleChange}
          contentEditable="true"
          className={cn('smoothCaretInput', styles.textarea)}
          onKeyDown={handleKeyDown}
          placeholder="buddies"
        ></div>
        <div className={styles.caret} />
      </div>
    </div>
  );
};

export default React.memo(ContentEditable);
