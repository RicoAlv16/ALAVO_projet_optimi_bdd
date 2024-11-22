import { SignUpDto } from './../../shared/dto/signUpDto.dto';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/shared/entities/user.entity';
import { Repository } from 'typeorm';
import bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly signupRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async Signup(signUpDto: SignUpDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(signUpDto.password, 10);

    const user = this.signupRepository.create({
      ...signUpDto,
      password: hashedPassword,
    });
    return this.signupRepository.save(user);
  }

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.signupRepository.findOne({ where: { email } });
    if (user && (await bcrypt.compare(pass, user.password))) {
      const { ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id, roles: user.roles };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
