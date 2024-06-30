import { User } from '../entitites/user.entity';

export class UserResponseDto {
  id: number;
  name: string;
  email: string;
  isActive: boolean;
  /**
   * @param user
   * @returns UserResponseDto
   * @description retorna um usuário filtrado pelo DTO
   */
  public static from(user: User): UserResponseDto {
    const userResponseDto = new UserResponseDto();
    userResponseDto.id = user.id;
    userResponseDto.name = user.name;
    userResponseDto.email = user.email;
    userResponseDto.isActive = user.isActive;

    return userResponseDto;
  }
}
