import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

//shad-ui generated, make possible to use cn
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
