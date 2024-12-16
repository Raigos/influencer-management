import { CreateInfluencerData, InfluencerUpdateData } from '../types'
import { InfluencerFilters } from '@influencer-management/shared'
import { prisma } from '../../../server'
import { Prisma } from '@prisma/client'

export async function createInfluencer(data: CreateInfluencerData) {
  // Use Transaction for multiple updates
  return prisma.$transaction(async (tx: Prisma.TransactionClient) => {
    const newInfluencer = await tx.influencer.create({
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        managerId: data.managerId,
        socialMediaAccounts: {
          create: data.socialMediaAccounts,
        },
      },
      include: {
        socialMediaAccounts: true,
        manager: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
      },
    })

    return newInfluencer
  })
}

export async function findInfluencers(filters: InfluencerFilters) {
  // If we have a name filter, split it into terms
  const nameTerms = filters.name?.trim().split(/\s+/).filter(Boolean) || []

  return prisma.influencer.findMany({
    where: {
      AND:
        nameTerms.length > 1
          ? // If we have multiple terms, create an AND condition for each term
            nameTerms.map(term => ({
              OR: [
                { firstName: { contains: term, mode: 'insensitive' } },
                {
                  lastName: {
                    contains: term,
                    mode: 'insensitive',
                  },
                },
              ],
            }))
          : // If we have 0 or 1 term, use the existing OR condition
            filters.name
            ? [
                {
                  OR: [
                    { firstName: { contains: filters.name, mode: 'insensitive' } },
                    { lastName: { contains: filters.name, mode: 'insensitive' } },
                  ],
                },
              ]
            : undefined,
      // Keep the existing manager filter exactly as is
      manager: filters.manager
        ? {
            OR: [
              { firstName: { contains: filters.manager, mode: 'insensitive' } },
              { lastName: { contains: filters.manager, mode: 'insensitive' } },
            ],
          }
        : undefined,
    },
    include: {
      socialMediaAccounts: true,
      manager: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
        },
      },
    },
    orderBy: [{ firstName: 'asc' }, { lastName: 'asc' }],
  })
}

export async function findInfluencerById(id: string) {
  return prisma.influencer.findUnique({
    where: { id },
    include: {
      socialMediaAccounts: true,
      manager: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
        },
      },
    },
  })
}

export async function updateInfluencer(id: string, data: InfluencerUpdateData) {
  return prisma.influencer.update({
    where: { id },
    data: {
      ...data,
    },
    include: {
      socialMediaAccounts: true,
      manager: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
        },
      },
    },
  })
}

export async function deleteInfluencer(id: string) {
  return prisma.influencer.delete({
    where: { id },
  })
}
