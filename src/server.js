import dotenv from 'dotenv';

dotenv.config();

import app from './App';

app.listen(process.env.SERVER_PORT, () => {
  console.log(`Server started on port ${process.env.SERVER_PORT}`);
});
