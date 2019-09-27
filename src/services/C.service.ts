import { DService } from './D.service';
import { Service } from '../../lib/decorators/Service';

@Service()
export class CService {
    constructor(private readonly dService: DService) {

    }
}
