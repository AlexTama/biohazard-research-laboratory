import { Role } from '@prisma/client';
import { User } from './user';

describe('User Domain Entity', () => {
  const validUserData = {
    email: 'researcher@umbrella.local',
    password: 'secure-hashed-password',
    role: Role.SCIENTIST,
  };

  it('should create a valid user with valid email and role', () => {
    const user = new User(validUserData);
    
    expect(user.getEmail()).toBe(validUserData.email);
    expect(user.getRole()).toBe(validUserData.role);
    expect(user.getId()).toBeDefined();
  });

  it('should throw an error if email is invalid', () => {
    const invalidUserData = {
      ...validUserData,
      email: 'invalid-email-format',
    };

    expect(() => new User(invalidUserData)).toThrow('Invalid email format');
  });

  it('should not allow undefined role', () => {
    const missingRoleData = {
      ...validUserData,
      role: undefined as any,
    };

    expect(() => new User(missingRoleData)).toThrow('Role is required');
  });

  it('should not expose password directly', () => {
    const user = new User(validUserData);
    
    // The raw password property should not be accessible or exposed via getters
    expect((user as any).password).toBeUndefined();
    expect((user as any).getPassword).toBeUndefined();
    
    // Validation should happen via a dedicated method like verifyPassword(plainText)
    expect(typeof (user as any).verifyPassword).toBe('function');
  });
});
