import { BService } from './B.service';
import { CService } from './C.service';
import { Service } from '../../lib/decorators/Classes';

@Service()
export class AService {

    public field: number = 1;

    public constructor(
        private readonly bService: BService,
        private readonly cService: CService
    ) {}
}
