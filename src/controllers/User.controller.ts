import { Get, Post } from '../../lib/decorators/Methods';
import { AService } from '../services/A.service';
import { Route } from '../../lib/decorators/Classes';

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
