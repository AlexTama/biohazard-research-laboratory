import { Role } from '@prisma/client';
import { User } from '../domain/user';

// Mocking dependencies that aren't implemented or need isolation
const mockUserRepository = {
  findByEmail: jest.fn(),
};

const mockJwtService = {
  sign: jest.fn(),
};

const mockHashService = {
  compare: jest.fn(),
};

describe('AuthService', () => {
  // @ts-ignore - AuthService not implemented yet
  let authService: AuthService;

  beforeEach(() => {
    jest.clearAllMocks();
    // @ts-ignore
    authService = new AuthService(
      mockUserRepository as any,
      mockJwtService as any,
      mockHashService as any
    );
  });

  const loginDto = {
    email: 'admin@umbrella.local',
    password: 'correct-password',
  };

  it('should return a JWT token for valid credentials', async () => {
    const user = new User({
      email: loginDto.email,
      password: 'hashed-password',
      role: Role.ADMIN,
    });

    mockUserRepository.findByEmail.mockResolvedValue(user);
    mockHashService.compare.mockResolvedValue(true);
    mockJwtService.sign.mockReturnValue('mocked-jwt-token');

    const result = await authService.login(loginDto.email, loginDto.password);

    expect(result).toEqual({ accessToken: 'mocked-jwt-token' });
    expect(mockUserRepository.findByEmail).toHaveBeenCalledWith(loginDto.email);
    expect(mockHashService.compare).toHaveBeenCalledWith(loginDto.password, expect.any(String));
  });

  it('should throw an error if user is not found by email', async () => {
    mockUserRepository.findByEmail.mockResolvedValue(null);

    // @ts-ignore
    await expect(authService.login(loginDto.email, loginDto.password))
      .rejects.toThrow('Invalid credentials');
  });

  it('should throw an error if password does not match', async () => {
    const user = new User({
      email: loginDto.email,
      password: 'hashed-password',
      role: Role.ADMIN,
    });

    mockUserRepository.findByEmail.mockResolvedValue(user);
    mockHashService.compare.mockResolvedValue(false);

    // @ts-ignore
    await expect(authService.login(loginDto.email, loginDto.password))
      .rejects.toThrow('Invalid credentials');
  });
});
