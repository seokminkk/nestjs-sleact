import { NotLoggedInGuard } from './../auth/not-logged-in.guard';
import { LoggedInGuard } from './../auth/logged-in.guard';
import { LocalAuthGuard } from './../auth/local-auth.guard';
import { UndefinedToNullInterceptor } from './../common/interceptors/undefinedToNull.interceptor';
import { User } from './../common/decorators/user.decorator';
import { UserDto } from './../common/dto/user.dto';
import { JoinRequestDto } from './dto/join.request.dto';
import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import {
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
@UseInterceptors(UndefinedToNullInterceptor)
@ApiTags('USER')
@Controller('api/users')
export class UsersController {
  constructor(private usersService: UsersService) {}
  @ApiResponse({ type: UserDto })
  @ApiOperation({ summary: '내정보조회' })
  @Get()
  getUsers(@User() user) {
    return user || false;
  }

  @UseGuards(new NotLoggedInGuard())
  @ApiOperation({ summary: '회원가입' })
  @Post()
  async postUsers(@Body() data: JoinRequestDto) {
    await this.usersService.postUsers(data.email, data.nickname, data.password);
  }

  @ApiOkResponse({
    description: '성공',
    type: UserDto,
  })
  @ApiOperation({ summary: '로그인' })
  @UseGuards(LocalAuthGuard) //권한있는지 확인할수잇다로그인여부 인터셉터보다 먼저실행됨
  @Post('login')
  logIn(@User() user) {
    return user;
  }

  @UseGuards(new LoggedInGuard())
  @ApiOperation({ summary: '로그아웃' })
  @Post('logout')
  logOut(@Req() req, @Res() res) {
    req.logOut();
    res.clearCookie('connect.sid', { httpOnly: true });
    res.send('ok');
  }
}
