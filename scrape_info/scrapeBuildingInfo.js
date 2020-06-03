import { launch } from 'puppeteer';
import fs from 'fs';
import {Duration} from '../src/server/_models/duration';
import {Cost} from '../src/server/_models/misc/cost';
import {Resources} from '../src/server/_models/misc/resources';

const scrape = async () => {
  const browser = await launch({
    executablePath: 'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
    headless: true,
  });

  const infos = JSON.parse(fs.readFileSync('./resources/building-infos.json').toString());
  const newInfos = { 0: infos[0] };

  for (let i = 1; i <= 45; i++) {
    console.log('Parsing: ' + infos[i].name);
    const page = await browser.newPage();

    await Promise.all([
      page.goto(`http://travian.kirilloid.ru/build.php#b=${i}&mb=0&s=1.45`),
      page.waitForNavigation({waitUntil: 'domcontentloaded'}),
    ]);

    const rows = await page.$$('#data tbody tr:not(.sum)');

    const originalInfo = infos[i];

    const newInfo = {
      category: originalInfo.category,
      conditions: originalInfo.conditions,
      name: originalInfo.name,
      type: originalInfo.type,
      costs: { 0: new Cost() },
      culturePoints: { 0: 0 },
      maxLevel: rows.length,
    }

    for (const row of rows) {
      const level = await row.$eval('td:nth-child(1)', x => +x.textContent);

      const wood = await row.$eval('td:nth-child(2)', x => +x.textContent);
      const clay = await row.$eval('td:nth-child(3)', x => +x.textContent);
      const iron = await row.$eval('td:nth-child(4)', x => +x.textContent);
      const crop = await row.$eval('td:nth-child(5)', x => +x.textContent);
      const freeCrop = await row.$eval('td:nth-child(7)', x => +x.textContent);
      const resources = new Resources({
        wood,
        clay,
        iron,
        crop,
        freeCrop,
      })

      const culturePoints = await row.$eval('td:nth-child(10)', x => +x.textContent);
      const duration = await row.$eval('td:nth-child(11)', x => x.textContent);
      const buildTime = Duration.fromText(duration);

      const cost = new Cost({
        buildTime,
        resources,
      });

      newInfo.costs[level] = cost;
      newInfo.culturePoints[level] = culturePoints;

      newInfos[i] = newInfo;
    }
  }

  fs.writeFileSync('./building-infos.json', JSON.stringify(newInfos));
  console.log('done');
  browser.close();
};

scrape();