import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesManagerService } from './categories.service';

describe('CategoriesManagerService', () => {
  let service: CategoriesManagerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CategoriesManagerService],
    }).compile();

    service = module.get<CategoriesManagerService>(CategoriesManagerService);
  })

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
