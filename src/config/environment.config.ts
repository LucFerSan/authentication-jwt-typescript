import * as dotenv from 'dotenv';

import { resolve } from 'path';

dotenv.config({
  path: resolve(__dirname, '..', '..', '.env'),
});

export default {
  jwtSecret: process.env.JWT_SECRET as string,
};
