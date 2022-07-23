import dotenv from 'dotenv';
dotenv.config();
import config from 'config';
import connect from './utils/connect'
import createServer from './utils/server';
import { startMetricsServer } from './utils/metrics';

const app = createServer();

const port = config.get<number>('port');

app.listen(port, async () => {
    console.log(`App listening on http://localhost:${port}`);
    await connect();

    startMetricsServer();
})