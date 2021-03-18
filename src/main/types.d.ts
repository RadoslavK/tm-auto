declare module 'electron-squirrel-startup';

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      readonly NODE_ENV: string;
      readonly shouldGenerateArtifacts?: boolean;
    }
  }
}