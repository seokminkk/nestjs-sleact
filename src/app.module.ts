import { UsersService } from './users/users.service';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoggerMiddleware } from './middlewares/logger.middlewares';
import { UsersModule } from './users/users.module';
import { WorkspacesModule } from './workspaces/workspaces.module';
import { ChannelsModule } from './channels/channels.module';
import { DmsModule } from './dms/dms.module';

// const getEnv = () => {
//   return {
//     SECRET: '석민',
//   };
// };
//async 함수로 만들수있어서

// ConfigModule.forRoot({ isGlobal: true, load: [getEnv] }),
// 이런식으로사용할수도있음
@Module({
  imports: [
    ConfigModule.forRoot(),
    UsersModule,
    WorkspacesModule,
    ChannelsModule,
    DmsModule,
  ],
  controllers: [AppController],
  providers: [AppService, ConfigService],
  //providers의 appService원형은
  //providers[{provide:AppService,useClass:AppService
  // 클래스말고 바로 값을 넣고싶으면useClass말고 useValue:'123'
  //함수를 넣고싶으면 useFactory:()=>{
  // return {a:'b'}
  // } }] 이다
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(LoggerMiddleware).forRoutes('*');
    //forRoutes(컨트롤러)forRoutes(주소)로 특정 주소나 컨트롤러에 미들웨어 적용가능
  }
}
