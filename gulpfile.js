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
  copy('./packages/main/dist-prod/**', './app/build/main/'),
);

const buildRenderer = series(
  run('yarn workspace renderer build'),
  copy('./packages/renderer/build/**', './app/build/renderer/'),
);

const build = series(
  clean('build'),
  parallel(buildRenderer, buildMain),
);

exports.default = build;
exports.buildMain = buildMain;