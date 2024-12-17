import { Platform, PrismaClient } from '@prisma/client'
import { createInfluencer } from '../features/influencers/services/influencerService'
import { createEmployee } from '../features/employee/services/employeeService'

const prisma = new PrismaClient()

async function cleanDatabase() {
  console.log('Cleaning existing data...')
  await prisma.socialMediaAccount.deleteMany()
  await prisma.influencer.deleteMany()
  await prisma.employee.deleteMany()
  console.log('Database cleaned successfully')
}

async function seed() {
  try {
    await prisma.$connect()
    await cleanDatabase()

    console.log('Creating employees...')
    const employee1 = await createEmployee({
      firstName: 'Evelin',
      lastName: 'Lembinen',
      email: 'evelin.lembinen@adcash.com',
    })

    const employee2 = await createEmployee({
      firstName: 'Sarah',
      lastName: 'Johnson',
      email: 'sarah.johnson@company.com',
    })

    console.log('Creating influencers...')
    const influencer1 = await createInfluencer({
      firstName: 'Taan',
      lastName: 'Wilson',
      managerId: employee1.id,
      socialMediaAccounts: [
        { platform: Platform.INSTAGRAM, username: 'Taan' },
        { platform: Platform.TIKTOK, username: 'taan_official' },
      ],
    })

    const influencer2 = await createInfluencer({
      firstName: 'Alex',
      lastName: 'Chen',
      managerId: employee2.id,
      socialMediaAccounts: [{ platform: Platform.INSTAGRAM, username: 'alexchenphoto' }],
    })

    const influencer3 = await createInfluencer({
      firstName: 'Hanna',
      lastName: 'Garcia',
      socialMediaAccounts: [{ platform: Platform.TIKTOK, username: 'mariagarcia_dance' }],
    })

    console.log('✨ Database seeded successfully!')
    console.log('Created:')
    console.log('- Employees:', [employee1, employee2].map(e => `${e.firstName} ${e.lastName}`).join(', '))
    console.log('- Influencers:', [influencer1, influencer2, influencer3].map(i => `${i.firstName} ${i.lastName}`).join(', '))
  } catch (error) {
    console.error('❌ Seeding failed:', error)
    throw error
  } finally {
    await prisma.$disconnect()
    process.exit(0)
  }
}

seed().catch(error => {
  console.error(error)
  process.exit(1)
})
