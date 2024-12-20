import { PrismaUsersRepository } from "../../repositories/prisma/prisma-users.repository";
import { CheckInService } from "../check-in.service";

export function makeCheckInService() {
  const usersRepository = new PrismaUsersRepository();
  const checkInService = new CheckInService(usersRepository);

  return checkInService;
}
