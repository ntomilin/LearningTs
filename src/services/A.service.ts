import { BService } from './B.service';
import { CService } from './C.service';
import { Service } from '../../lib/decorators/Service';

@Service()
export class AService {
    public constructor(
        private readonly bService: BService,
        private readonly cService: CService
    ) {}
}
