import path from 'path';

export class GeneralSettings {
  public readonly dataPath: string = path.join(__dirname, '.data');
  public readonly chromePath: string = 'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe';
  public readonly headlessChrome: boolean = true;
}
