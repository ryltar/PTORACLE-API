import {ServerLoader, ServerSettings} from "@tsed/common";
import Path = require("path");

@ServerSettings({
    rootDir: Path.resolve(__dirname),
    acceptMimes: ["application/json"],
    httpPort : 5000,
    httpsPort: 5080
})
export class Server extends ServerLoader {

    /**
     * This method let you configure the middleware required by your application to works.
     * @returns {Server}
     */
    public $onMountingMiddlewares(): void|Promise<any> {

        const cookieParser = require('cookie-parser'),
            bodyParser = require('body-parser'),
            compress = require('compression'),
            methodOverride = require('method-override'),
            cors = require('cors');

        this
            .use(cookieParser())
            .use(compress({}))
            .use(methodOverride())
            .use(bodyParser.json())
            .use(bodyParser.urlencoded({
                extended: true
            }))
            .use(cors());
        return null;
    }

    public $onReady(){
        console.log('Server started...');
    }

    public $onServerInitError(err){
        console.error(err);
    }
}

export default new Server();