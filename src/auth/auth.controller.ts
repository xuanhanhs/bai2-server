import { Controller, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LocalAuthGuard } from './guards/local.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor() {}

  @Post('sign-in')
  @UseGuards(LocalAuthGuard)
  signIn() {
    const admin = {
      fullname: 'Đinh Xuân Hạnh',
    };
    return admin;
  }
}
