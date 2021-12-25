import { createConnection } from 'typeorm';
import app from './app';
import { databaseConfig, PORT } from './common/config';

(async () => {
    console.log('Connecting to database...');
    await createConnection(databaseConfig);

    app.listen(PORT, (): void =>
    console.log(`App is running on http://localhost:${PORT}`)
);
})()


