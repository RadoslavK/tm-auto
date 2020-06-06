import fs, { MakeDirectoryOptions } from 'fs';
import { dirname } from 'path';

import { PartialFields } from '../../_shared/types/fields.type';

class FileService {
  public save = async (targetPath: string, object: unknown): Promise<void> => {
    const folder = dirname(targetPath);
    const serializedObject = JSON.stringify(object);
    const options: MakeDirectoryOptions = {
      recursive: true,
    };

    await fs.promises.mkdir(folder, options);

    return fs.promises.writeFile(targetPath, serializedObject, { flag: 'w' });
  };

  public loadInstance = <T extends unknown>(targetPath: string, constructor: { new(params?: PartialFields<T>): T }, defaultValue?: T | undefined): T => {
    try {
      const file = fs.readFileSync(targetPath);
      const params: T = JSON.parse(file.toString());
      return new constructor(params);
    } catch {
      return defaultValue || new constructor();
    }
  };

  public load = <T extends unknown>(targetPath: string, defaultValue: T): T => {
    try {
      const file = fs.readFileSync(targetPath);
      return JSON.parse(file.toString()) as T;
    } catch {
      return defaultValue;
    }
  };

  public delete = async (targetPath: string): Promise<void> => new Promise(resolve => {
    try {
      if (fs.existsSync(targetPath)) {
        fs.rmdir(targetPath, { recursive: true }, () => resolve());
      } else {
        resolve();
      }
    } catch (error) {
      console.error(error);
      throw new Error(`Failed to delete account at ${targetPath}`);
    }
  });
}

export const fileService = new FileService();
