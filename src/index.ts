import { app } from './serve';
import {env} from './env'
//routes register

import { router as usuario } from './routes/usuario';
import { router as access } from './routes/access';
import { router as rol } from './routes/rol';
import { router as libros } from './routes/libros';


app.use('/api/usuario',usuario);
app.use('/api/access',access);
app.use('/api/rol',rol);
app.use('/api/libros',libros);

app.listen(env.PORT, () => {
    console.log(`API-USER  started on port ${env.PORT}`);
})