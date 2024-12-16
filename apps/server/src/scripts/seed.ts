import { Platform } from '@prisma/client'
import { createInfluencer } from '../features/influencers/services/influencerService'
import { createEmployee } from '../features/employee/services/employeeService'

async function seed() {
  try {
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

    // An influencer without a manager
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
  }
}

seed().catch(error => {
  console.error(error)
  process.exit(1)
})
