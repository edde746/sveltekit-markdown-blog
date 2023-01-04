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
  return parsedHeader;
};
