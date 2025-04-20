import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
  data: T;
  statusCode: number;
  timestamp: string;
  message: string;
}

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
    const httpContext = context.switchToHttp();
    const request = httpContext.getRequest();
    const method = request.method;
    const url = request.url;
    const statusCode = httpContext.getResponse().statusCode;
    
    return next.handle().pipe(
      map(data => ({
        data,
        statusCode,
        timestamp: new Date().toISOString(),
        message: this.getResponseMessage(method, url, statusCode),
      })),
    );
  }

  private getResponseMessage(method: string, url: string, statusCode: number): string {
    if (statusCode === 201) {
      return 'Resource created successfully';
    }
    if (method === 'GET') {
      return 'Resource retrieved successfully';
    }
    if (method === 'PUT' || method === 'PATCH') {
      return 'Resource updated successfully';
    }
    if (method === 'DELETE') {
      return 'Resource deleted successfully';
    }
    return 'Request processed successfully';
  }
} 