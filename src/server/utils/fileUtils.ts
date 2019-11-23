import fs, { MakeDirectoryOptions } from 'fs';
import { dirname, join } from 'path';

const basePath = '.data';

export const fileUtils = {
  async save(path: string, object: object): Promise<void> {
    const finalPath = join(basePath, path);
    const folder = dirname(finalPath);
    const serializedObject = JSON.stringify(object);
    const options: MakeDirectoryOptions = {
      recursive: true,
    };

    await fs.promises.mkdir(folder, options);

    return fs.promises.writeFile(finalPath, serializedObject, { flag: 'w' });
  },

  loadInstance: <T extends object>(path: string, constructor: { new(params?: Partial<T>): T }, defaultValue: T | undefined = undefined): T => {
    const finalPath = join(basePath, path);

    try {
      const file = fs.readFileSync(finalPath);
      const params: T = JSON.parse(file.toString());
      return new constructor(params);
    } catch {
      return defaultValue || new constructor();
    }
  },

  load: <T extends object>(path: string, defaultValue: T): T => {
    const finalPath = join(basePath, path);

    try {
      const file = fs.readFileSync(finalPath);
      return JSON.parse(file.toString()) as T;
    } catch {
      return defaultValue;
    }
  },
};
