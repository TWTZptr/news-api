import { Injectable } from '@nestjs/common';
import { compare, genSalt, hash } from 'bcrypt';

@Injectable()
export class PasswordsService {
  async hash(password: string): Promise<string> {
    const salt = await genSalt();
    return hash(password, salt);
  }

  compare(password: string, hash: string): Promise<boolean> {
    return compare(password, hash);
  }
}
