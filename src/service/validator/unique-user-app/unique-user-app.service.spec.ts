import { Test, TestingModule } from '@nestjs/testing';
import { UniqueUserAppService } from './unique-user-app.service';

describe('UniqueUserAppService', () => {
  let service: UniqueUserAppService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UniqueUserAppService],
    }).compile();

    service = module.get<UniqueUserAppService>(UniqueUserAppService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
