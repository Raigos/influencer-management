import { Platform } from '../types/platform'
import { UUID } from '../types/common'

export type SocialMediaAccountUpdate = { field: 'platform'; value: Platform } | { field: 'username'; value: string }

export interface SocialMediaAccountBase {
  platform: Platform
  username: string
}

export interface SocialMediaAccount extends SocialMediaAccountBase {
  id: UUID
  createdAt: Date
  updatedAt: Date
  influencerId: UUID
}
