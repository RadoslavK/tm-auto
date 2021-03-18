//  TODO: Hack to support ES Modules in Electron
require = require('esm')(module);
require('./preload');