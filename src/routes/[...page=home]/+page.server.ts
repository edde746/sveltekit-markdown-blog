import fs from 'fs/promises';
import type { PageServerLoad } from './$types';
import { parseHeader } from '$lib/helpers';

export const load: PageServerLoad = async ({ url }) => {
  // list files in ../../posts
  const files = await fs.readdir('./posts');

  // return the list of files
  return {
    articles: (await Promise.all(
      files.map(async (file) => {
        // read the file
        const content = await fs.readFile(`./posts/${file}`, 'utf-8');
        // parse the header
        const header = parseHeader(content);

        return {
          Slug: file.replace('.md', ''),
          ...header,
          Published: new Date(header.Published),
          Updated: header.Updated ? new Date(header.Updated) : undefined,
          Categories: header.Categories ? header.Categories.split(',').map((c) => c.trim()) : [],
        };
      })
    ).then((articles) => articles.sort((a, b) => b.Published.getTime() - a.Published.getTime()))) as Article[],
  };
};
