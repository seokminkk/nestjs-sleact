import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
//모듈을 직접만들떄

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  use(request: Request, response: Response, next: NextFunction): void {
    const { ip, method, originalUrl } = request;
    const userAgent = request.get('user-agent') || '';

    response.on('finish', () => {
      //response.on인이유 미들웨어 자체가 라우터보다 먼저실행됨
      const { statusCode } = response;
      const contentLength = response.get('content-length');
      this.logger.log(
        `${method} ${originalUrl} ${statusCode} ${contentLength}- ${userAgent} ${ip}`,
      );
    });

    next();
  }
}
