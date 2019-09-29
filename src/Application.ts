import { HttpServer } from '../lib/HttpServerManager';
import { UserController } from './controllers/User.controller';
import { AService } from './services/A.service';
import { BService } from './services/B.service';
import { CService } from './services/C.service';
import { DService } from './services/D.service';
import { EService } from './services/E.service';
import { FService } from './services/F.service';
import { Global } from '../lib/decorators/Global';
import { Users } from './entities/Users';
import { TestController } from './controllers/Test.controller';

import { IConfig } from '../lib/types/ConfigTypes';

@Global({
    endpoints: [
        UserController,
        TestController
    ],
    services: [
        AService,
        CService,
        BService,
        DService,
        FService,
        EService,
    ],
    entities: [
        Users
    ]
})
export class Application extends HttpServer {
    constructor(config: IConfig) {
        super(config);
    }

}
