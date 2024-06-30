import {
  Controller,
  Get,
  Body,
  Param,
  Put,
  Delete,
  UseGuards,
  Req,
  ParseIntPipe,
  Query,
  DefaultValuePipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Request } from 'express';
import { JwtGuard } from '../auth/guard/jwt.guard';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { ProductPaymentService } from '../product-payment/product-payment.service';
import { User } from '../entitites/user.entity';
import { ApiTags } from '@nestjs/swagger';
import { UserResponseDto } from '../dtos/user-response.dto';

@Controller('users')
@UseGuards(JwtGuard)
@ApiTags('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly productPaymentService: ProductPaymentService,
  ) {}

  @Get()
  findAll(
    @Query('skip', new DefaultValuePipe(0), ParseIntPipe) skip: number,
    @Query('take', new DefaultValuePipe(10), ParseIntPipe) take: number,
  ) {
    return this.userService.findAllActive(skip, take);
  }

  @Get('me')
  me(@Req() req: Request): UserResponseDto {
    return UserResponseDto.from(req.user as User);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findOneByIdActive(id);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.updateActive(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.userService.removeActive(id);
  }

  @Get('product-payment')
  findAllByUserId(
    @Req() req: Request,
    @Query('skip', new DefaultValuePipe(0), ParseIntPipe) skip: number,
    @Query('take', new DefaultValuePipe(10), ParseIntPipe) take: number,
  ) {
    return this.productPaymentService.findAllByUserId(
      (req.user as User).id,
      skip,
      take,
    );
  }
}
