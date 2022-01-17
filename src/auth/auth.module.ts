import { Session } from '../typeorm/entities/Session';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { JWTService } from './jwt.service';
import { JwtStrategy } from './jwt.strategy';
import { UserModule } from '../user/user.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Session]), UserModule],
  controllers: [AuthController],
  providers: [AuthService, JWTService, JwtStrategy],
  exports: [AuthService, JWTService, JwtStrategy],
})
export class AuthModule {}
