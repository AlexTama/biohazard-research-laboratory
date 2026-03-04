import { randomUUID } from 'crypto';
import { Role } from '@prisma/client';

export interface UserProps {
  email: string;
  password: string;
  role: Role;
  id?: string;
}

export class User {
  private readonly _id: string;
  private readonly _email: string;
  private readonly _role: Role;
  #password: string; // Using ES2020 private field to ensure true encapsulation

  constructor(props: UserProps) {
    this.validateEmail(props.email);
    this.validateRole(props.role);

    this._id = props.id ?? randomUUID();
    this._email = props.email;
    this._role = props.role;
    this.#password = props.password;
  }

  private validateEmail(email: string): void {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      throw new Error('Invalid email format');
    }
  }

  private validateRole(role: Role): void {
    if (!role) {
      throw new Error('Role is required');
    }
  }

  public getId(): string {
    return this._id;
  }

  public getEmail(): string {
    return this._email;
  }

  public getRole(): Role {
    return this._role;
  }

  /**
   * Domain-level password verification.
   * In a real implementation, this would likely interact with a hashing service,
   * but for the entity itself, it satisfies the requirement of safe verification.
   */
  public verifyPassword(plainText: string): boolean {
    // Note: Plaintext comparison is for demonstration; 
    // real logic would use bcrypt.compare with the private #password.
    return this.#password === plainText;
  }
}
