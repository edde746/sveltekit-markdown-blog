import fs from 'fs/promises';
import type { PageServerLoad } from './$types';
import { parseHeader } from '$lib/helpers';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ url, params }) => {
  const article = params.article.split('/')?.at(1);
  if (!article) throw error(404, 'Not found');

  // read the file
  const content = await fs.readFile(`./posts/${article}.md`, 'utf-8');
  if (!content) throw error(404, 'Not found');
  // parse the header
  const header = parseHeader(content) as Article;

  return {
    content,
    header,
  };
};
