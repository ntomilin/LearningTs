import { Global } from '../lib/decorators/Classes';
import { IConfig } from '../lib/types/ConfigTypes';
import { HttpServer } from '../lib/HttpServer';

import { UserController } from './controllers/User.controller';
import { TestController } from './controllers/Test.controller';

import { AService } from './services/A.service';
import { BService } from './services/B.service';
import { CService } from './services/C.service';
import { DService } from './services/D.service';
import { EService } from './services/E.service';
import { FService } from './services/F.service';

import { Users } from './entities/Users';

import { MainMenu } from './scenes/MainMenu';

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
    ],
    scenes: [
        MainMenu,
    ]
})
export class Application extends HttpServer {
    constructor(config: IConfig) {
        super(config);
    }

}
