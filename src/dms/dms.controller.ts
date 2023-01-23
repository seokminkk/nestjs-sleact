import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';

@Controller('api/workspaces/:url/dms')
export class DmsController {
  @Get(':id/chats')
  getChat(@Query() query, @Param() param) {
    //이렇게하면 쿼리통째로 다불러옴
    //@param 으로 라우터 파라미터를 받아옴
    console.log(query.perPage, query.page);
    console.log(param.id, param.url);
  }

  // getChat(@Query('perPage') perPage, @Query('page') page) {
  //   //이렇게하면 페이지 퍼페이지 이렇게 따로 쿼리에서 불러올수있다
  //   console.log(perPage, page);
  // }

  @Post(':id/chats')
  postChat(@Body() body) {}
}
