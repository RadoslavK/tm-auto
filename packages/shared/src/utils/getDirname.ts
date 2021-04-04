import { dirname } from "path";
import { fileURLToPath } from 'url';

//  TODO, this is a hack for node for running this in a special mode to generate types and schema
//  otherwise the server runs as cjs module
export const getDirname = (meta: ImportMeta): string => dirname(fileURLToPath(meta.url));