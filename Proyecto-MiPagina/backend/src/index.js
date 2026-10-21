import app from './app.js';
import { connectDB } from './db.js';
import {PORT} from './utils/config.js'

await connectDB();

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});