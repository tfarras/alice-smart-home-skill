import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';

export interface Response<T> {
  request_id: string;
  payload: T & { user_id: string };
}

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler<T>,
  ): Observable<Response<T>> {
    const req = context.switchToHttp().getRequest();
    const requestId = req.header('X-Request-Id');

    return next.handle().pipe(
      map((data) => ({
        request_id: requestId,
        payload: {
          ...data,
          user_id: 'google-oauth2|111849282591110689266',
        },
      })),
    );
  }
}
