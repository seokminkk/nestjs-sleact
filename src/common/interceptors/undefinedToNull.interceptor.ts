import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';

@Injectable()
export class UndefinedToNullInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    // 전 부분

    //후부분 return 뒤에
    return next
      .handle()
      .pipe(map((data) => (data === undefined ? null : data)));
  }
}
//마지막에 데이터를 한번더 가공해줄수있음
