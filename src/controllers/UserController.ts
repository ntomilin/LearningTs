// import { RouteClass, GET, POST } from '../decorators';

import { ENDPOINT } from '../../lib/decorators/ENDPOINT';
import { GET } from '../../lib/decorators/GET';
import { POST } from '../../lib/decorators/POST';

@ENDPOINT('/users')
export class UserController {
    constructor() { }

    @GET()
    public loadAllUsers(req, res) {
        res.send({
            success: true,
            users: []
        });
    }

    @POST('/oops')
    public createUser(req, res) {
        res.send(`ok!`);
    }
}


