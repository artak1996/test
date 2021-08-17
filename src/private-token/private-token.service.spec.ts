import { Test, TestingModule } from '@nestjs/testing';
import { PrivateTokenService } from './private-token.service';

describe('PrivateTokenService', () => {
  let service: PrivateTokenService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrivateTokenService],
    }).compile();

    service = module.get<PrivateTokenService>(PrivateTokenService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
