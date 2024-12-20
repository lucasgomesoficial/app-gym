import { PrismaUsersRepository } from "../../repositories/prisma/prisma-users.repository";
import { GetUserProfileService } from "../get-user-profile.service";

export function makeGetUserProfileService() {
  const usersRepository = new PrismaUsersRepository();
  const getUserProfileService = new GetUserProfileService(usersRepository);

  return getUserProfileService;
}
