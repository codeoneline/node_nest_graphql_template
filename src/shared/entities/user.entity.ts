import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
} from 'typeorm';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { UserRO } from '../dtos/user.dto';

@Entity('User')
export class UserEntity {
  @PrimaryGeneratedColumn()
  userKey: number;

  @Column({
    type: 'text',
    unique: true,
  })
  email: string;

  @Column('text')
  password: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  firstNme: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  lastNme: string;

  @CreateDateColumn()
  createdDte: Date;

  @UpdateDateColumn()
  updatedDte: Date;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  async comparePassword(attempt: string): Promise<boolean> {
    return await bcrypt.compare(attempt, this.password);
  }

  toResponseObject(showToken: boolean = true): UserRO {
    const { userKey, createdDte, token, email } = this;
    const responseObject: UserRO = {
      userKey,
      email,
      createdDte,
    };

    if (showToken) {
      responseObject.token = token;
    }

    return responseObject;
  }

  private get token(): string {
    const { userKey, email } = this;

    return jwt.sign(
      {
        userKey,
        email,
      },
      process.env.SECRET,
      { expiresIn: '7d' },
    );
  }
}
