import fs, { MakeDirectoryOptions } from 'fs';
import { dirname } from 'path';

class FileService {
  public save = async (path: string, object: object): Promise<void> => {
    const folder = dirname(path);
    const serializedObject = JSON.stringify(object);
    const options: MakeDirectoryOptions = {
      recursive: true,
    };

    await fs.promises.mkdir(folder, options);

    return fs.promises.writeFile(path, serializedObject, { flag: 'w' });
  };

  public loadInstance = <T extends object>(path: string, constructor: { new(params?: Partial<T>): T }, defaultValue: T | undefined = undefined): T => {
    try {
      const file = fs.readFileSync(path);
      const params: T = JSON.parse(file.toString());
      return new constructor(params);
    } catch {
      return defaultValue || new constructor();
    }
  };

  public load = <T extends object>(path: string, defaultValue: T): T => {
    try {
      const file = fs.readFileSync(path);
      return JSON.parse(file.toString()) as T;
    } catch {
      return defaultValue;
    }
  };

  public delete = async (path: string): Promise<void> => {
    return new Promise(resolve => {
      try {
        if (fs.existsSync(path)) {
          fs.rmdir(path, { recursive: true }, () => resolve());
        } else {
          resolve();
        }
      } catch (error) {
        console.error(error);
        throw new Error(`Failed to delete account at ${path}`);
      }
    });
  };
}

export const fileService = new FileService();
