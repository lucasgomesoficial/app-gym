import { Gym, Prisma } from "@prisma/client";
import { FindManyNearbyParams, GymsRepository } from "../gyms.repository";
import { randomUUID } from "node:crypto";
import { getDistanceBetweenCoordinates } from "../../utils/get-distance-between-coordinates.utils";

export class InMemoryGymsRepository implements GymsRepository {
  public items: Gym[] = [];

  async findById(id: string) {
    const gym = this.items.find((item) => item.id === id);

    if (!gym) {
      return null;
    }

    return gym;
  }

  async findManyNearby({ latitude, longitude }: FindManyNearbyParams) {
    return this.items.filter(
      ({ latitude: gymLatitude, longitude: gymLongitude }) => {
        const userLocation = {
          latitude,
          longitude,
        };

        const gymLocation = {
          latitude: gymLatitude.toNumber(),
          longitude: gymLongitude.toNumber(),
        };

        const distance = getDistanceBetweenCoordinates(
          userLocation,
          gymLocation
        );

        const NUMBER_IN_KILOMETERS = 10;

        return distance < NUMBER_IN_KILOMETERS;
      }
    );
  }

  async searchMany(query: string, page: number) {
    return this.items
      .filter((item) => item.title.includes(query))
      .slice((page - 1) * 20, page * 20);
  }

  async create({
    id,
    title,
    description,
    phone,
    latitude,
    longitude,
  }: Prisma.GymCreateInput) {
    const gym = {
      id: id ?? randomUUID(),
      title,
      description: description ?? null,
      phone: phone ?? null,
      latitude: new Prisma.Decimal(latitude.toString()),
      longitude: new Prisma.Decimal(longitude.toString()),
    };

    this.items.push(gym);

    return gym;
  }
}
