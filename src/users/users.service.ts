import { Users } from './../entities/Users';
import { HttpException, Injectable } from '@nestjs/common';
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
      throw new HttpException('비번없다고에러', 400);
    }

    const user = await this.usersRepository.findOne({ where: { email } });
    if (user) {
      //이미존재하는유저라고 에러
      return;
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    await this.usersRepository.save({
      email,
      nickname,
      password: hashedPassword,
    });
  }
}
