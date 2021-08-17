import { Test, TestingModule } from '@nestjs/testing';
import { UsersManagerController } from './users-manager.controller';

describe('UsersManagerController', () => {
  let controller: UsersManagerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersManagerController],
    }).compile();

    controller = module.get<UsersManagerController>(UsersManagerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
