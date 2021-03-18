import { dirname } from "path";
import { fileURLToPath } from 'url';

export const getDirname = (meta: ImportMeta): string => dirname(fileURLToPath(meta.url));