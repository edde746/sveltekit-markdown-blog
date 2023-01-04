# sveltekit-markdown-blog

A simple blog that statically generates from markdown files. Built with [SvelteKit](https://kit.svelte.dev/).

## Features

- Fully static
- Markdown files
- Dark mode

## Running Locally

```
# Clone the repository
git clone https://github.com/edde746/sveltekit-markdown-blog.git

# Navigate to the project directory
cd sveltekit-markdown-blog

# Install dependencies with pnpm
pnpm install

# Run the development server
pnpm run dev

# Generate the static site
pnpm run build
```

## Adding Posts

To add a new post, create a markdown file in the `posts` directory. The file should have the following front matter at the top:

```md
<!-- 
    Title: <title of the post>
    Author: <your name here>
    Published: <date in YYYY-MM-DD HH:MM format>
    Categories: <comma-separated list of categories>
    Thumbnail: <url, e.g. images/image.webp then put that image in the static/images folder>
-->
```

## Deploying

To deploy your blog, you can simply upload the contents of the `build` directory to your web server. Alternatively, you can use a static site hosting service such as [Cloudflare Pages](https://pages.cloudflare.com/).

## License

Use it however you want.