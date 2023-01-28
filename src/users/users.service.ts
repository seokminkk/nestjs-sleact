import { Users } from './../entities/Users';
import {
  BadRequestException,
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import bcrypt from 'bcrypt';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) {}

  getUser() {}

  async postUsers(email: string, nickname: string, password: string) {
    if (!email) {
      //이메일없다고에러
      throw new HttpException('이메일없다고에러', 400);
    }

    if (!nickname) {
      //닉네임없다고에러
      throw new HttpException('닉네임없다고에러', 400);
    }

    if (!password) {
      //비번없다고에러
      throw new BadRequestException('비번없다고에러');
    }
    // BadRequestException,UnauthorizedException 을 사용하면 뒤에 상태코드 안붙여도됨
    const user = await this.usersRepository.findOne({ where: { email } });
    if (user) {
      //이미존재하는유저라고 에러
      throw new UnauthorizedException('이미 존재하는 유저입니다.');
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    await this.usersRepository.save({
      email,
      nickname,
      password: hashedPassword,
    });
  }
}
