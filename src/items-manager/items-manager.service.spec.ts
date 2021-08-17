import { Test, TestingModule } from '@nestjs/testing';
import { ItemsManagerService } from './items-manager.service';

describe('ItemsManagerService', () => {
  let service: ItemsManagerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ItemsManagerService],
    }).compile();

    service = module.get<ItemsManagerService>(ItemsManagerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
