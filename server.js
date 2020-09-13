const app = require('./app');
const db = require('./config/db');
const { PORT } = require('./config');

db.connect().then(() => {
    app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));
});
