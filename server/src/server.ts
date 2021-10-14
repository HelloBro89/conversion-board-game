import { app } from './app';
// import { config } from './common/config'
// import { connectionDB } from './connection/connectionDB';

const PORT = 4000;

(async () => {
    // await connectionDB();
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    })
})();