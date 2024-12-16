import { PLATFORMS } from '../constants/platform'
import { Platform } from '../types/platform'

export const validPlatformsList = Object.values(PLATFORMS)

export function isPlatformValid(platform: string): platform is Platform {
  return validPlatformsList.includes(platform as Platform)
}
