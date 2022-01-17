import { join } from 'path';
import { Injectable } from '@nestjs/common';
import { sign } from 'jsonwebtoken';
import fs, { readdir } from 'fs';
@Injectable()
export class JWTService {
  generate = async (sessionId: number) => {
    const privateKey = fs.readFileSync('/app/jwtKey/jwtRS256.key');
    return sign({ sessionId }, privateKey, { algorithm: 'RS256' });
  };
}
