export const parseHeader = (content: string) => {
  // Extract the comment from the header
  const commentRegex = /<!--([\s\S]*?)-->/;
  const comment = content.match(commentRegex);
  if (!comment?.length) return {};

  // Split the comment into lines
  const lines = comment[0].split('\n');

  // Initialize an empty object to store the parsed header
  const parsedHeader = {} as Record<string, string>;

  // Iterate through each line of the header
  for (const line of lines) {
    // Split the line into a key-value pair
    const [key, value] = line.trim().split(': ');

    // If the line doesn't contain a key-value pair, skip it
    if (!key || !value) continue;

    // Store the key-value pair in the parsed header object
    parsedHeader[key] = value;
  }

  // Return the parsed header object
  return {
    ...parsedHeader,
    Published: new Date(parsedHeader.Published),
    Updated: parsedHeader.Updated ? new Date(parsedHeader.Updated) : undefined,
    Categories: parsedHeader.Categories ? parsedHeader.Categories.split(',').map((c) => c.trim()) : [],
  };
};

export const slugify = (str: string) =>
  str
    .toLowerCase()
    .replace(/[^\w ]+/g, '')
    .replace(/ +/g, '-');

export const stringColor = (str: string) => {
  // hash the string
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }

  // generate a random hsv hue value
  const hue = (hash % 360) / 360;

  return `hsl(${hue * 360}, 58%, 45%)`;
};

export const titleCase = (str: string) =>
  str
    .toLowerCase()
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

export const makeDescription = (text: string) => {
  // strip html tags
  const stripped = text.replace(/(<([^>]+)>)/gi, '');

  // truncate to 160 characters
  const truncated = stripped.slice(0, 160);

  // remove trailing punctuation
  const trimmed = truncated.replace(/[,.;:!?]$/, '');

  return trimmed + '...';
};
