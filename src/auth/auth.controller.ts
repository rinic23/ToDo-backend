import { Body, Controller, Post, Headers } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { DtoRegistrationPayload } from './dto';
import { JWTService } from './jwt.service';

@Controller('auth')
export class AuthController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
    private jwtService: JWTService,
  ) {}

  @Post('registration')
  async userRegistration(
    @Body() userData: DtoRegistrationPayload,
    @Headers('user-agent') agent: string,
    @Headers('x-forwarded-for') address: string | undefined,
  ) {
    const user = await this.userService.registration(userData);
    const { id } = user;
    const { id: sessionId } = await this.authService.create({
      agent,
      address,
      userId: id,
    });

    return this.jwtService.generate(sessionId);
  }
}
