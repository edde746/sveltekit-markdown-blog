import fs from 'fs/promises';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url, params }) => {
  return {
    content: await fs.readFile(`./src/routes/privacy/privacy-policy.md`, 'utf-8'),
  };
};
