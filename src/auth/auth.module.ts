import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaDriversRepository } from 'src/repositories/prisma/prisma-driver-repository';
import { RegisterDriverUseCase } from './use-cases/register-driver-use-case';
import { SignInDriverUseCase } from './use-cases/signin-driver-use-case';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1h' },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    RegisterDriverUseCase,
    SignInDriverUseCase,
    PrismaDriversRepository,
    PrismaService,
    JwtService,
  ],
})
export class AuthModule { }
