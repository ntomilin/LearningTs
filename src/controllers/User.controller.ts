import { Route } from '../../lib/decorators/Route';
import { Get } from '../../lib/decorators/Get';
import { Post } from '../../lib/decorators/Post';

@Route('/users')
export class UserController {
    constructor() {
    }

    @Get()
    public loadAllUsers(req: any, res) {
        res.send({
            success: true,
            users: []
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
