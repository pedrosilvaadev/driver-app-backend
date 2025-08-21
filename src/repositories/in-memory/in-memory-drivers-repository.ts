import { Prisma, Driver } from '@prisma/client'
import { randomInt } from 'node:crypto'
import { DriversRepository } from '../drivers-repository'

export class InMemoryDriversRepository implements DriversRepository {
  public items: Driver[] = []

  async create(data: Prisma.DriverCreateInput): Promise<Driver> {
    const driver: Driver = {
      id: randomInt(1, 1000000),
      name: data.name,
      email: data.email,
      password: data.password,
      status: data.status ?? 'offline',
      rating: data.rating ?? 4.5,
      total_trips: data.total_trips ?? 0,
      current_location: (data.current_location ?? { lat: 0, lng: 0 }) as unknown as Prisma.JsonValue
    }

    this.items.push(driver)

    return driver
  }

  async findByEmail(email: string): Promise<Driver | null> {
    const driver = this.items.find(item => item.email === email)
    return driver ?? null
  }

  async findById(id: number): Promise<Driver | null> {
    const driver = this.items.find(item => item.id === id)
    return driver ?? null
  }
}
