export const getServerShortcut = (server: string): string => {
  const match = /\/\/ts.*?(.*?)\.x(\d+)\.(.*?)\./.exec(server);

  if (!match) {
    console.error('Failed to parse server shortcut');

    return 'Unknown Server';
  }

  let serverNumber = match[1];

  if (serverNumber === 'e') {
    serverNumber = 'SHADOW EMPIRES';
  }

  return `${match[3].toUpperCase()} ${serverNumber} x${match[2]}`;
};
