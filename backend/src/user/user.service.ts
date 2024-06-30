import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entitites/user.entity';
import { SingupDTO } from '../dtos/signup.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { UserResponseDto } from 'src/dtos/user-response.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  /**
   * @param name nome do usuário
   * @param email email do usuário
   * @param password senha do usuário
   * @returns User
   * @description cria um novo usuário
   * @throws BadRequestException
   */
  async create({ name, email, password }: SingupDTO): Promise<User> {
    const findUser = await this.findOneByEmail(email);

    if (findUser) {
      throw new BadRequestException(`User with email ${email} already exists`);
    }

    const User = this.userRepository.create({ name, email, password });
    return this.userRepository.save(User);
  }

  /**
   * @param skip número de registros para ignorar
   * @param take número de registros para retornar
   * @returns User[]
   * @description retorna todos os usuários
   */
  async findAll(skip: number, take: number): Promise<User[]> {
    return this.userRepository.find({ skip, take });
  }

  /**
   * @param skip número de registros para ignorar
   * @param take número de registros para retornar
   * @returns UserResponseDto[]
   * @description retorna todos os usuários ativos
   */
  async findAllActive(skip: number, take: number): Promise<UserResponseDto[]> {
    return this.userRepository
      .find({
        where: { isActive: true },
        skip,
        take,
      })
      .then((users) => users.map(UserResponseDto.from));
  }
  /**
   * @param id id do usuário
   * @returns User
   * @description retorna um usuário
   * @throws NotFoundException
   */
  async findOneById(id: number): Promise<User | null> {
    return this.userRepository.findOne({ where: { id: id } }).catch(() => {
      throw new NotFoundException(`User with id ${id} not found`);
    });
  }

  /**
   * @param id id do usuário
   * @returns UserResponseDto
   * @description retorna um usuário ativo
   * @throws NotFoundException
   */
  async findOneByIdActive(id: number): Promise<UserResponseDto | null> {
    return this.userRepository
      .findOne({ where: { id: id, isActive: true } })
      .catch(() => {
        throw new NotFoundException(`User with id ${id} not found`);
      });
  }
  /**
   * @param email email do usuário
   * @returns User
   * @description retorna um usuário
   * @throws NotFoundException
   */
  async findOneByEmail(email: string): Promise<User | null> {
    return this.userRepository
      .findOne({ where: { email: email } })
      .catch(() => {
        throw new NotFoundException(`User with email ${email} not found`);
      });
  }
  /**
   * @param email email do usuário
   * @returns User
   * @description retorna um usuário ativo
   * @throws NotFoundException
   */
  async findOneByEmailActive(email: string): Promise<User | null> {
    return this.userRepository
      .findOne({ where: { email: email, isActive: true } })
      .catch(() => {
        throw new NotFoundException(`User with email ${email} not found`);
      });
  }
  /**
   * @param id id do usuário
   * @param name nome do usuário
   * @param email email do usuário
   * @param password senha do usuário
   * @param isActive status do usuário
   * @returns void
   * @description atualiza um usuário
   * @throws BadRequestException
   * @throws NotFoundException
   */
  async update(
    id: number,
    { name, email, password, isActive }: UpdateUserDto,
  ): Promise<void> {
    const findUser = await this.findOneById(id);

    if (findUser && findUser.email !== email) {
      throw new BadRequestException(`User with email ${email} already exists`);
    }

    await this.userRepository.update(id, { name, email, password, isActive });
  }
  /**
   * @param id id do usuário
   * @param name nome do usuário
   * @param email email do usuário
   * @param password senha do usuário
   * @param isActive status do usuário
   * @returns void
   * @description atualiza um usuário ativo
   * @throws BadRequestException
   * @throws NotFoundException
   */
  async updateActive(
    id: number,
    { name, email, password, isActive }: UpdateUserDto,
  ): Promise<void> {
    const findUser = await this.findOneByIdActive(id);

    if (findUser && findUser.email !== email) {
      throw new BadRequestException(`User with email ${email} already exists`);
    }

    await this.userRepository.update(id, { name, email, password, isActive });
  }
  /**
   * @param id id do usuário
   * @returns void
   * @description remove um usuário ativo
   * @throws NotFoundException
   */
  async removeActive(id: number): Promise<void> {
    await this.findOneByIdActive(id);
    await this.userRepository.update(id, { isActive: false });
  }
}
