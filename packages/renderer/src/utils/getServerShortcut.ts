const getOldServerShortcut = (server: string): string => {
  const speedMatch = /(x).*\.travian.*\.(.*)\/?/.exec(server);

  if (speedMatch && speedMatch.length === 3 && speedMatch[1] && speedMatch[2]) {
    return `${speedMatch[2]}${speedMatch[1]}`;
  }

  const match = /s(\d+).*\.travian.*\.(.*)\/?/.exec(server);

  if (match && match.length === 3 && match[1] && match[2]) {
    return `${match[2]}${match[1]}`;
  }

  console.error(`Failed to parse server shortcut: ${server}`);

  return 'Unknown Server';
};

export const getServerShortcut = (server: string): string => {
  //  New formats
  const newMatch = /https?:\/\/(.*?)\.(.*?)\.travian/.exec(server);

  if (!newMatch) {
    return getOldServerShortcut(server);
  }

  const [, type, country] = newMatch;

  const typeMatch = /tx(\d+)|ts(\d+)/.exec(type);

  if (!typeMatch) {
    console.error('Failed to parse server type');

    return 'Unknown Server';
  }

  const typeName = typeMatch[1] ? `${typeMatch[1]}x` : typeMatch[2];

  return `${country.toUpperCase()} ${typeName}`;
};
