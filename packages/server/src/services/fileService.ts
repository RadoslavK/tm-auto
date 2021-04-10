import fs, { MakeDirectoryOptions } from 'fs';
import path, { dirname } from 'path';
import type { PartialFields } from 'shared/types/fields.type.js';

import { getServerAppDirectory } from '../utils/getServerAppDirectory.js';

class FileService {
  public save = async (targetPath: string, object: unknown): Promise<void> => {
    const absolutePath = path.join(getServerAppDirectory(), targetPath);
    const folder = dirname(absolutePath);
    const serializedObject = JSON.stringify(object);
    const options: MakeDirectoryOptions = {
      recursive: true,
    };

    await fs.promises.mkdir(folder, options);

    return fs.promises.writeFile(absolutePath, serializedObject, { flag: 'w' });
  };

  public loadInstance = <T extends object>(
    targetPath: string,
    constructor: { new (params?: PartialFields<T>): T },
    defaultValue?: T | undefined,
  ): T => {
    const absolutePath = path.join(getServerAppDirectory(), targetPath);

    try {
      const file = fs.readFileSync(absolutePath);
      const params: T = JSON.parse(file.toString());
      return new constructor(params);
    } catch {
      return defaultValue || new constructor();
    }
  };

  public loadInstanceWithoutDefaultValue = <T extends object>(
    targetPath: string,
    constructor: { new (params?: PartialFields<T>): T },
  ): T | null => {
    const absolutePath = path.join(getServerAppDirectory(), targetPath);

    try {
      const file = fs.readFileSync(absolutePath);
      const params: T = JSON.parse(file.toString());
      return new constructor(params);
    } catch {
      return null;
    }
  };

  public load = <T extends unknown>(targetPath: string, defaultValue: T): T => {
    const absolutePath = path.join(getServerAppDirectory(), targetPath);

    try {
      const file = fs.readFileSync(absolutePath);
      return JSON.parse(file.toString()) as T;
    } catch {
      return defaultValue;
    }
  };

  public loadWithoutDefaultValue = <T extends unknown>(targetPath: string): T | null => {
    const absolutePath = path.join(getServerAppDirectory(), targetPath);

    try {
      const file = fs.readFileSync(absolutePath);
      return JSON.parse(file.toString()) as T;
    } catch {
      return null;
    }
  };

  public delete = async (targetPath: string): Promise<void> => {
    const absolutePath = path.join(getServerAppDirectory(), targetPath);

    try {
      if (fs.existsSync(absolutePath)) {
        await fs.promises.rm(absolutePath, { recursive: true });
      }
    } catch (error) {
      console.error(error);
      throw new Error(`Failed to delete account at ${absolutePath}`);
    }
  };

  public getFiles = async (targetPath: string): Promise<ReadonlyArray<string>> => {
    const absolutePath = path.join(getServerAppDirectory(), targetPath);

    try {
      return await fs.promises.readdir(absolutePath);
    } catch {
      return [];
    }
  };
}

export const fileService = new FileService();
