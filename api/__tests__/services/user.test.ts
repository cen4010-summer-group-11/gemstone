import UserService from '../../src/services/user';
import * as bcrypt from 'bcrypt';
import queryDb from '../../src/db/db';
import { createJWT } from '../../src/util/jwt';
import { respond } from '../../src/util/data';

jest.mock('bcrypt');
jest.mock('../../src/db/db');
jest.mock('../../src/util/jwt');
jest.mock('../../src/util/error');

describe('UserService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('RegisterUser', () => {
    it('should register a new user and return a JWT', async () => {
      (queryDb as jest.Mock).mockResolvedValueOnce([]); // User not found
      (bcrypt.hash as jest.Mock).mockResolvedValueOnce('hashed_password');
      (queryDb as jest.Mock).mockResolvedValueOnce([{ username: 'testuser' }]);
      (createJWT as jest.Mock).mockReturnValueOnce('test_jwt_token');

      const response = await UserService.RegisterUser('testuser', 'password');

      expect(response).toEqual(respond({ bearerToken: 'test_jwt_token' }));
      expect(queryDb).toHaveBeenCalledTimes(2);
      expect(bcrypt.hash).toHaveBeenCalledWith('password', 10);
      expect(createJWT).toHaveBeenCalledWith(expect.anything(), {
        username: 'testuser',
      });
    });

    it('should throw an error if username is taken', async () => {
      (queryDb as jest.Mock).mockResolvedValueOnce([{ username: 'testuser' }]); // User found

      try {
        await UserService.RegisterUser('testuser', 'password');
      } catch (error) {
        expect.anything();
      }

      expect(queryDb).toHaveBeenCalledTimes(1);
      expect(bcrypt.hash).not.toHaveBeenCalled();
    });

    it('should throw an internal error if password hashing fails', async () => {
      (queryDb as jest.Mock).mockResolvedValueOnce([]); // User not found
      (bcrypt.hash as jest.Mock).mockResolvedValueOnce(null);

      try {
        await UserService.RegisterUser('testuser', 'password');
      } catch (error) {
        expect.anything();
      }

      expect(queryDb).toHaveBeenCalledTimes(1);
      expect(bcrypt.hash).toHaveBeenCalled();
    });
  });

  describe('LoginUser', () => {
    it('should login a user and return a JWT', async () => {
      (queryDb as jest.Mock).mockResolvedValueOnce([
        { username: 'testuser', pw: 'hashed_password' },
      ]);
      (bcrypt.compare as jest.Mock).mockResolvedValueOnce(true);
      (createJWT as jest.Mock).mockReturnValueOnce('test_jwt_token');

      const response = await UserService.LoginUser('testuser', 'password');

      expect(response).toEqual(respond({ bearerToken: 'test_jwt_token' }));
      expect(queryDb).toHaveBeenCalledWith(expect.anything(), ['testuser']);
      expect(bcrypt.compare).toHaveBeenCalledWith(
        'password',
        'hashed_password'
      );
      expect(createJWT).toHaveBeenCalledWith(expect.anything(), {
        username: 'testuser',
      });
    });

    it('should throw an error if username is not found', async () => {
      (queryDb as jest.Mock).mockResolvedValueOnce([]);

      try {
        await UserService.LoginUser('testuser', 'password');
      } catch (error) {
        expect.anything();
      }

      expect(queryDb).toHaveBeenCalledWith(expect.anything(), ['testuser']);
      expect(bcrypt.compare).not.toHaveBeenCalled();
    });

    it('should throw an error if password does not match', async () => {
      (queryDb as jest.Mock).mockResolvedValueOnce([
        { username: 'testuser', pw: 'hashed_password' },
      ]);
      (bcrypt.compare as jest.Mock).mockResolvedValueOnce(false);

      try {
        await UserService.LoginUser('testuser', 'password');
      } catch (error) {
        expect.anything();
      }

      expect(queryDb).toHaveBeenCalledWith(expect.anything(), ['testuser']);
      expect(bcrypt.compare).toHaveBeenCalledWith(
        'password',
        'hashed_password'
      );
    });
  });

  describe('IsUserRegistered', () => {
    it('should return true if user is registered', async () => {
      (queryDb as jest.Mock).mockResolvedValueOnce([{ username: 'testuser' }]);

      let response;
      try {
        response = await UserService.IsUserRegistered('testuser');
      } catch (error) {
        expect.anything();
      }

      expect(response).toBe(true);
      expect(queryDb).toHaveBeenCalledWith(expect.anything(), ['testuser']);
    });

    it('should return false if user is not registered', async () => {
      (queryDb as jest.Mock).mockResolvedValueOnce([]);

      const response = await UserService.IsUserRegistered('testuser');

      expect(response).toBe(false);
      expect(queryDb).toHaveBeenCalledWith(expect.anything(), ['testuser']);
    });
  });
});
