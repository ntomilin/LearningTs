import { Get } from '../../lib/decorators/Methods';
import { AService } from '../services/A.service';
import { Route } from '../../lib/decorators/Classes';

@Route('/test')
export class TestController {
    constructor(private readonly serviceA: AService) {
    }

    @Get()
    public loadAllUsers(req: any, res) {
        res.send({
            success: true,
            field: this.serviceA.field,
        });
    }
}
