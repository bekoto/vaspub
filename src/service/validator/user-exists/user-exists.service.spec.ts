import { Test, TestingModule } from '@nestjs/testing';
import { UserExistsService } from './user-exists.service';

describe('UserExistsService', () => {
  let service: UserExistsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserExistsService],
    }).compile();

    service = module.get<UserExistsService>(UserExistsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
