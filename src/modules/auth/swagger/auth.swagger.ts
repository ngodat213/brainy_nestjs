import { LoginDto, RegisterDto } from '@/core/application/dtos/auth.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

export const AuthSwagger = {
  register: () => {
    return function (
      target: any,
      propertyKey: string,
      descriptor: PropertyDescriptor,
    ) {
      ApiTags('Authentication')(target, propertyKey, descriptor);
      ApiOperation({ summary: 'Register a new user' })(target, propertyKey, descriptor);
      ApiBody({ type: RegisterDto })(target, propertyKey, descriptor);
      ApiResponse({
        status: 201,
        description: 'User successfully registered',
        schema: {
          example: {
            id: '507f1f77bcf86cd799439011',
            email: 'user@example.com',
            username: 'username',
            fullName: 'John Doe',
            role: 'user',
            isActive: true,
            createdAt: '2024-03-20T10:00:00.000Z',
            updatedAt: '2024-03-20T10:00:00.000Z'
          }
        }
      })(target, propertyKey, descriptor);
      ApiResponse({
        status: 400,
        description: 'Bad Request - Invalid input data',
        schema: {
          example: {
            statusCode: 400,
            message: ['email must be a valid email', 'password must be at least 6 characters'],
            error: 'Bad Request'
          }
        }
      })(target, propertyKey, descriptor);
      ApiResponse({
        status: 409,
        description: 'Conflict - Email or username already exists',
        schema: {
          example: {
            statusCode: 409,
            message: 'Email already exists',
            error: 'Conflict'
          }
        }
      })(target, propertyKey, descriptor);
    };
  },

  login: () => {
    return function (
      target: any,
      propertyKey: string,
      descriptor: PropertyDescriptor,
    ) {
      ApiTags('Authentication')(target, propertyKey, descriptor);
      ApiOperation({ summary: 'Login with email and password' })(target, propertyKey, descriptor);
      ApiBody({ type: LoginDto })(target, propertyKey, descriptor);
      ApiResponse({
        status: 200,
        description: 'Login successful',
        schema: {
          example: {
            accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
            refreshToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
            user: {
              id: '507f1f77bcf86cd799439011',
              email: 'user@example.com',
              username: 'username',
              fullName: 'John Doe',
              role: 'user'
            }
          }
        }
      })(target, propertyKey, descriptor);
      ApiResponse({
        status: 400,
        description: 'Bad Request - Invalid input data',
        schema: {
          example: {
            statusCode: 400,
            message: ['email must be a valid email', 'password must not be empty'],
            error: 'Bad Request'
          }
        }
      })(target, propertyKey, descriptor);
      ApiResponse({
        status: 401,
        description: 'Unauthorized - Invalid credentials',
        schema: {
          example: {
            statusCode: 401,
            message: 'Invalid email or password',
            error: 'Unauthorized'
          }
        }
      })(target, propertyKey, descriptor);
    };
  },

  refreshToken: () => {
    return function (
      target: any,
      propertyKey: string,
      descriptor: PropertyDescriptor,
    ) {
      ApiTags('Authentication')(target, propertyKey, descriptor);
      ApiOperation({ summary: 'Refresh access token' })(target, propertyKey, descriptor);
      ApiResponse({
        status: 200,
        description: 'Token refreshed successfully',
        schema: {
          example: {
            accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
            refreshToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
          }
        }
      })(target, propertyKey, descriptor);
      ApiResponse({
        status: 401,
        description: 'Unauthorized - Invalid refresh token',
        schema: {
          example: {
            statusCode: 401,
            message: 'Invalid refresh token',
            error: 'Unauthorized'
          }
        }
      })(target, propertyKey, descriptor);
    };
  },

  logout: () => {
    return function (
      target: any,
      propertyKey: string,
      descriptor: PropertyDescriptor,
    ) {
      ApiTags('Authentication')(target, propertyKey, descriptor);
      ApiOperation({ summary: 'Logout user' })(target, propertyKey, descriptor);
      ApiResponse({
        status: 200,
        description: 'Logout successful',
        schema: {
          example: {
            message: 'Logged out successfully'
          }
        }
      })(target, propertyKey, descriptor);
      ApiResponse({
        status: 401,
        description: 'Unauthorized - No valid token',
        schema: {
          example: {
            statusCode: 401,
            message: 'Unauthorized',
            error: 'Unauthorized'
          }
        }
      })(target, propertyKey, descriptor);
    };
  }
}; 