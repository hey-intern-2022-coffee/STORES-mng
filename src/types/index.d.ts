import { pathNames } from '../modules/constant'
declare module 'qrcode'
export type pathNameUnion = typeof pathNames[keyof typeof pathNames]
