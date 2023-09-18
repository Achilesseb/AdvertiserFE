type KeyPressCallbackFunction = () => void;

export const detectKeyPress = (
  keyName: string,
  callback: KeyPressCallbackFunction,
): void => {
  const eventListener = (event: KeyboardEvent): void => {
    if (event.key === keyName) {
      callback();
      document.removeEventListener('keydown', eventListener);
    }
  };

  document.addEventListener('keydown', eventListener);
};
