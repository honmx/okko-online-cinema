export const getFirstSentence = (text: string) => {

  const dotIndex = text.indexOf(".") === -1 ? text.length : text.indexOf(".");

  return text.slice(0, dotIndex);
}