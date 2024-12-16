import { SocialMediaAccountBase } from '@influencer-management/shared/dist'

export interface CreateInfluencerData {
  firstName: string
  lastName: string
  socialMediaAccounts?: SocialMediaAccountBase[]
  managerId?: string | null
}

export interface InfluencerUpdateData {
  firstName?: string
  lastName?: string
  managerId?: string | null
}
