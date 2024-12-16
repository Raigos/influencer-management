import { SocialMediaAccount, SocialMediaAccountBase } from './socialMediaAccount'
import { UUID } from '../types/common'

export interface InfluencerBase {
  firstName: string
  lastName: string
  socialMediaAccounts: SocialMediaAccountBase[]
  managerId?: string | null
}

export interface CreateInfluencerRequest extends InfluencerBase {}

export interface Influencer extends InfluencerBase {
  id: UUID
  createdAt: Date
  updatedAt: Date
  socialMediaAccounts: SocialMediaAccount[]
}

export interface InfluencerFilters {
  name?: string
  manager?: string
}
