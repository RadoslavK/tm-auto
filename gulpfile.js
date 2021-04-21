const del = require('del');
const runCommand = require('gulp-run');
const {
  dest,
  parallel,
  series,
  src,
} = require('gulp');

const clean = (path) => () => {
  console.log(`Clearing ${path} ...`);

  return del(path);
};

const copy = (from, to) => () => {
  console.log(`Copying from ${from} to ${to}`);

  return src(from).pipe(dest(to));
};

const run = (command) => (callback) => {
  runCommand(command).exec(undefined, callback);
};

const buildMain = series(
  run('yarn workspace main build-prod'),
  copy('./packages/main/dist/**', './app/build/main/'),
);

const buildMainDev = series(
  run('yarn workspace main build-dev'),
  copy('./packages/main/dist-dev/**', './app/build-dev/main/'),
);

const buildRenderer = (isDev = false) => series(
  run('yarn workspace renderer build'),
  copy('./packages/renderer/build/**', `./app/build${isDev ? '-dev' : ''}/renderer/`),
);

const build = series(
  clean('build'),
  parallel(buildRenderer(), buildMain),
);

const buildDev = series(
  clean('build-dev'),
  parallel(buildRenderer(true), buildMainDev),
);

exports.default = build;
exports.buildDev = buildDev;
exports.buildMainDev = buildMainDev;