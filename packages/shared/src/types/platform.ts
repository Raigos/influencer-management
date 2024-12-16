import { PLATFORMS } from '../constants/platform'

export type Platform = (typeof PLATFORMS)[keyof typeof PLATFORMS]
