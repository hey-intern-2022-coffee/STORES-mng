// FIXME: 型修正
export const getBaseUri = (fullPath: string) =>
  document.baseURI.replaceAll(fullPath, '')
