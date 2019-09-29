import { AService } from './A.service';
import { FService } from './F.service';
import { Service } from '../../lib/decorators/Classes';

@Service()
export class EService {
    constructor(private readonly aService: AService,
                private readonly fService: FService) {

    }
}
