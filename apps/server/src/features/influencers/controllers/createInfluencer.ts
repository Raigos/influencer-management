import { RequestHandler } from 'express'
import { createInfluencer } from '../services/influencerService'
import { isPlatformValid, validPlatformsList } from '@influencer-management/shared'

export const createInfluencerHandler: RequestHandler = async (req, res): Promise<void> => {
  try {
    const { firstName, lastName, socialMediaAccounts } = req.body

    // Validate name fields
    if (!firstName || !lastName) {
      res.status(400).json({
        error: 'First name and last name are required',
      })
      return
    }

    // Validate name length
    if (firstName.length > 50 || lastName.length > 50) {
      res.status(400).json({
        error: 'First name and last name must not exceed 50 characters',
      })
      return
    }

    // Validate social media accounts if they exist
    if (socialMediaAccounts) {
      // Validate that socialMediaAccounts is an array
      if (!Array.isArray(socialMediaAccounts)) {
        res.status(400).json({
          error: 'Social media accounts must be provided as an array',
        })
        return
      }

      for (const account of socialMediaAccounts) {
        // Check each account has required fields
        if (!account || typeof account !== 'object') {
          res.status(400).json({
            error: 'Each social media account must be an object with platform and username',
          })
          return
        }

        // Validate platform
        if (!isPlatformValid(account.platform)) {
          res.status(400).json({
            error: 'Invalid social media platform',
            validPlatforms: validPlatformsList,
          })
          return
        }

        // Validate username
        if (
          !account.username ||
          typeof account.username !== 'string' ||
          account.username.trim().length === 0 ||
          account.username.length > 50
        ) {
          res.status(400).json({
            error: 'Each social media username is required and must not exceed 50 characters',
          })
          return
        }
      }

      // Check for duplicate accounts
      const accountMap = new Map()
      for (const account of socialMediaAccounts) {
        const key = `${account.platform}-${account.username.toLowerCase().trim()}`
        if (accountMap.has(key)) {
          res.status(400).json({
            error: 'Duplicate social media accounts are not allowed',
          })
          return
        }
        accountMap.set(key, true)
      }
    }
    // If all validations pass, create the influencer
    const newInfluencer = await createInfluencer(req.body)
    res.status(201).json(newInfluencer)
  } catch (error) {
    console.error('Failed to create influencer:', error)
    res.status(500).json({ error: 'Failed to create influencer' })
  }
}
