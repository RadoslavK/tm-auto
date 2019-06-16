import fs, { MakeDirectoryOptions } from 'fs';
import { dirname } from 'path';

export const fileUtils = {
  save(path: string, object: object): void {
    const folder = dirname(path);
    const serializedObject = JSON.stringify(object);
    const options: MakeDirectoryOptions = {
      recursive: true,
    };

    fs.promises.mkdir(folder, options)
      .then(() => fs.writeFile(path, serializedObject, { flag: 'w' }, err => {
        if (err) {
          console.error(err);
        }
      }));
  },

  load: <T extends object>(path: string, constructor: { new(params?: Partial<T>): T }, defaultValue: T = undefined): T => {
    try {
      const file = fs.readFileSync(path);
      const params: T = JSON.parse(file.toString());
      return new constructor(params);
    } catch {
      return defaultValue || new constructor();
    }
  },
};
