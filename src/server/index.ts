import { Account, IAccount } from './models/account';
import { TravianPath } from './enums/TravianPath';
import { ensureLoggedIn } from './controller/modules/ensureLoggedIn';
import { ensureUrl } from './controller/modules/ensureUrl';
import { parseBuildings } from './controller/parsers/parseBuildings';

export const account: IAccount = new Account({
  username: 'Buckyx',
  password: 'Speedas11',
  url: 'https://tx3.czsk.travian.com',
});

(async function main() {
  await ensureLoggedIn();
  await ensureUrl(TravianPath.BuildingsOverview);

  await parseBuildings();
})();
