// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare namespace App {
  // interface Error {}
  // interface Locals {}
  // interface PageData {}
  // interface Platform {}
}

// Article
type Article = {
  Slug: string;
  Title: string;
  Author: string;
  Published: Date;
  Updated?: Date;
  Categories: string[];
  Thumbnail: string;
};
