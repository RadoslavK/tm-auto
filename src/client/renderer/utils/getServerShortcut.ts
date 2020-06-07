export const getServerShortcut = (server: string): string => {
  const match = /https?:\/\/(.*?)\.(.*?)\.travian/.exec(server);

  if (!match) {
    throw new Error('Failed to parse server shortcut');
  }

  const type = match[1];
  const country = match[2];

  const typeMatch = /tx(\d+)|ts(\d+)/.exec(type);

  if (!typeMatch) {
    throw new Error('Failed to parse server type');
  }

  const typeName = typeMatch[1]
    ? `${typeMatch[1]}x`
    : typeMatch[2];

  return `${country.toUpperCase()} ${typeName}`;
};