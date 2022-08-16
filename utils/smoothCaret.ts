function css(element: Element, property: string) {
  return window.getComputedStyle(element, null).getPropertyValue(property);
}

function getTextWidth(text: string, font: string) {
  let canvas = document.querySelector('#sc-canvas') as HTMLCanvasElement;
  let ctx = canvas.getContext('2d');
  ctx!.font = font;
  return ctx!.measureText(text).width;
}

class SmoothCaret {
  private font: string;
  private maxMargin: number;
  private caretMargin: number;
  private caretWidth: number;
  private caretElem: HTMLElement;
  private inputElem: HTMLElement;
  private textWidth: number | undefined;
  private index: number;

  constructor(caretElem: HTMLElement, inputElem: HTMLElement, index: number) {
    this.font = `${css(inputElem, 'font-size')} ${css(
      inputElem,
      'font-family'
    )}`;
    this.maxMargin = parseInt(css(inputElem.parentElement!, 'width'));
    this.caretMargin = parseInt(css(inputElem, 'padding-left')) + 2;
    this.caretWidth = parseInt(caretElem.style.width);
    this.caretElem = caretElem;
    this.inputElem = inputElem;
    this.textWidth = undefined;
    this.index = index;
  }

  init() {
    this.inputElem.dataset.sc = String(this.index);
    this.inputElem.addEventListener('blur', () => {
      this.caretElem.style.opacity = '';
      this.caretElem.style.marginLeft = '';
    });
  }

  update(text: string) {
    if (!text) {
      this.caretElem.style.marginLeft = '0px';
    }
    this.caretElem.style.opacity = '1';
    this.textWidth =
      getTextWidth(text, this.font) > 0
        ? getTextWidth(text, this.font) + this.caretMargin
        : this.caretMargin - this.caretWidth / 2;

    this.caretElem.style.marginLeft = `${
      this.textWidth > this.maxMargin ? this.maxMargin : this.textWidth
    }px`;
  }
}

function initsmoothCarets() {
  const style = document.createElement('style');
  const canvElem = document.createElement('canvas');

  document.head.append(style);
  canvElem.id = 'sc-canvas';
  canvElem.style.display = 'none';
  document.body.appendChild(canvElem);

  let smoothCarets:
    | SmoothCaret[]
    | { update: (arg0: any) => void; init: () => void }[] = [];
  let caretPosString;
  document.querySelectorAll('.sc-container').forEach((element, index) => {
    smoothCarets.push(
      // @ts-ignore
      new SmoothCaret(element.children[1], element.children[0], index)
    );
    smoothCarets[index]?.init();
  });

  const changeCarretPosition = () => {
    const activeElement = document.activeElement as HTMLElement;
    if (activeElement.getAttribute('data-sc')) {
      caretPosString = caretPosString = activeElement.innerText.slice(
        0,
        // @ts-ignore
        activeElement.selectionStart
      );
      smoothCarets[parseInt(activeElement.dataset.sc!)].update(caretPosString);
    }
  };
  return changeCarretPosition;
}

export default initsmoothCarets;
