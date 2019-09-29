import { DService } from './D.service';
import { Service } from '../../lib/decorators/Classes';

@Service()
export class CService {
    constructor(private readonly dService: DService) {

    }
}
