import { Destination } from '@types-internal/destination/destination.type'

export const ticketsMock: Destination[] = [
  {
    name: 'Destination',
    seatsCount: 34,
    price: 1256,
    bookedCount: 22,
    seats: 'seats',
    availableCount: 5,
    pointStartId: 'string',
    pointEndId: 'string',
    start: {
      date: new Date(),
      city: 'Київ',
      aeroport: {
        name: 'Жуляни'
      },
      company: {
        name: 'name',
        rate: 5,
        description: 'description',
        owner: 'Dianna'
      }
    },
    end: {
      date: new Date(),
      city: 'Одеса',
      aeroport: {
        name: 'Одеса'
      },
      company: {
        name: 'name',
        rate: 3,
        description: 'description',
        owner: 'Vlad'
      }
    },
    createdAt: new Date(),
    updatedAt: new Date()
  }
]
