import { Route } from '../../lib/decorators/Route';
import { Get } from '../../lib/decorators/Get';
import { AService } from '../services/A.service';

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
