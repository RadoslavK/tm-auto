export const getServerShortcut = (server: string): string => {
  const speedMatch = /(x).*\.travian.*\.(.*)\/?/.exec(server);

  if (speedMatch && speedMatch.length === 3 && speedMatch[1] && speedMatch[2]) {
    return `${speedMatch[2]}${speedMatch[1]}`;
  }

  const match = /s(\d+).*\.travian.*\.(.*)\/?/.exec(server);

  if (match && match.length === 3 && match[1] && match[2]) {
    return `${match[2]}${match[1]}`;
  }

  throw new Error(`Could not parse server shortcut, for server: ${server}`);
};