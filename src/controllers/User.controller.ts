import { Route } from '../../lib/decorators/Route';
import { Get } from '../../lib/decorators/Get';
import { Post } from '../../lib/decorators/Post';
import { AService } from '../services/A.service';

@Route('/users')
export class UserController {
    constructor(private readonly serviceA: AService) {
    }

    @Get()
    public loadAllUsers(req: any, res) {
        const currentValue = this.serviceA.field;
        this.serviceA.field += 1;
        res.send({
            success: true,
            field: currentValue,
        });
    }

    @Post('/oops')
    public createUser(req, res) {
        res.send(`ok!`);
    }

    @Post('/oops1')
    public createUse1r(req, res) {
        res.send(`ok!`);
    }
}
