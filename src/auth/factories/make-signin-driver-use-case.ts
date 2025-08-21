// src/auth/factories/make-signin-driver-use-case.ts
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../prisma/prisma.service';
import { PrismaDriversRepository } from 'src/repositories/prisma/prisma-driver-repository';
import { SignInDriverUseCase } from '../use-cases/signin-driver-use-case';
import { ConfigService } from '@nestjs/config';

export function makeSignInDriverUseCase(configService: ConfigService) {
  const prismaService = new PrismaService();
  const driversRepository = new PrismaDriversRepository(prismaService);
  const jwtService = new JwtService({
    secret: configService.get<string>('JWT_SECRET'),
    signOptions: { expiresIn: '1h' },
  });


  return new SignInDriverUseCase(driversRepository, jwtService);
}
