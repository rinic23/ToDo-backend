import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import fs from 'fs';
import { JwtPayload } from 'jsonwebtoken';
import { AuthService } from './auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: fs.readFileSync('/app/jwtKey/jwtRS256.key.pub'),
      algorithms: ['RS256'],
      ignoreExpiration: true,
    });
  }

  validate = async ({ sessionId }: JwtPayload) => {
    console.log('jwtStrategy', sessionId);
    const user = await this.authService.authenticateUser(sessionId);

    return { user };
  };
}
