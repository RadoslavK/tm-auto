import fs from 'fs';

import { launch } from 'puppeteer-core';

import { Duration } from '../src/server/_models/duration';
import { Resources } from '../src/server/_models/misc/resources';

const scrape = async () => {
  const browser = await launch({
    executablePath:
      'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
    headless: true,
  });

  if (1 || 2) return;

  const infos = JSON.parse(
    fs.readFileSync('./resources/building-infos-new.json').toString(),
  );
  const newInfos = { 0: infos[0] } as Record<string, any>;

  for (let i = 1; i <= 45; i++) {
    console.log(`Parsing: ${infos[i].name}`);
    const page = await browser.newPage();

    await Promise.all([
      page.goto(`http://travian.kirilloid.ru/build.php#b=${i}&mb=0&s=1.45`),
      page.waitForNavigation({ waitUntil: 'domcontentloaded' }),
    ]);

    const rows = await page.$$('#data tbody tr:not(.sum)');

    const originalInfo = infos[i];

    const newInfo = {
      category: originalInfo.category,
      conditions: originalInfo.conditions,
      name: originalInfo.name,
      type: originalInfo.type,
      maxLevel: rows.length,
      levelInfos: {} as Record<string, any>,
    };

    for (const row of rows) {
      const level = await row.$eval('td:nth-child(1)', (x) => +x.textContent!);

      const wood = await row.$eval('td:nth-child(2)', (x) => +x.textContent!);
      const clay = await row.$eval('td:nth-child(3)', (x) => +x.textContent!);
      const iron = await row.$eval('td:nth-child(4)', (x) => +x.textContent!);
      const crop = await row.$eval('td:nth-child(5)', (x) => +x.textContent!);
      const freeCrop = await row.$eval(
        'td:nth-child(7)',
        (x) => +x.textContent!,
      );
      const cost = new Resources({
        wood,
        clay,
        iron,
        crop,
        freeCrop,
      });

      const culturePoints = await row.$eval(
        'td:nth-child(10)',
        (x) => +x.textContent!,
      );
      const duration = await row.$eval(
        'td:nth-child(11)',
        (x) => x.textContent,
      );
      const buildingTime = Duration.fromText(duration!);

      const levelInfo = {
        cost,
        buildingTime,
        culturePoints,
      };

      newInfo.levelInfos[level] = levelInfo;

      newInfos[i] = newInfo;
    }
  }

  fs.writeFileSync('./building-infos.json', JSON.stringify(newInfos));
  console.log('done');
  browser.close();
};

scrape();
