import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  use(req: Request, res: Response, next: NextFunction) {
    const { ip, method, originalUrl } = req;
    const userAgent = req.get('user-agent') || '';

    // Ghi log trước khi xử lý request
    this.logger.log(`${method} ${originalUrl} - ${ip} - ${userAgent}`);

    // Lưu thời điểm bắt đầu để tính thời gian xử lý
    const startTime = Date.now();

    // Khi response hoàn tất
    res.on('finish', () => {
      const { statusCode } = res;
      const contentLength = res.get('content-length');
      const responseTime = Date.now() - startTime;

      // Ghi log sau khi xử lý request
      this.logger.log(
        `${method} ${originalUrl} ${statusCode} ${contentLength} - ${responseTime}ms`,
      );
    });

    next();
  }
} 