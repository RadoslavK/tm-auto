import { Resources } from '../_models/misc/resources.js';

export const resourceMentorTaskRewards: Map<string, Resources> = new Map<
  string,
  Resources
>([
  ['Economy_02', new Resources({ wood: 160, clay: 190, iron: 150, crop: 70 })],
  ['Economy_03', new Resources({ wood: 250, clay: 290, iron: 100, crop: 130 })],
  ['Economy_04', new Resources({ wood: 400, clay: 460, iron: 330, crop: 270 })],
  ['Economy_05', new Resources({ wood: 240, clay: 255, iron: 190, crop: 160 })],
  ['Economy_06', new Resources({ wood: 600 })],
  ['Economy_07', new Resources({ wood: 100, clay: 99, iron: 99, crop: 99 })],
  ['Economy_08', new Resources({ wood: 400, clay: 400, iron: 400, crop: 200 })],
  ['Economy_09', new Resources({ wood: 620, clay: 730, iron: 560, crop: 230 })],
  [
    'Economy_10',
    new Resources({ wood: 880, clay: 1020, iron: 590, crop: 320 }),
  ],
  [
    'Economy_11',
    new Resources({ wood: 900, clay: 790, iron: 685, crop: 2230 }),
  ],
  ['World_01', new Resources({ wood: 90, clay: 120, iron: 60, crop: 30 })],
  ['World_03', new Resources({ wood: 170, clay: 100, iron: 130, crop: 70 })],
  ['World_04', new Resources({ wood: 215, clay: 145, iron: 195, crop: 50 })],
  ['World_05', new Resources({ wood: 90, clay: 160, iron: 90, crop: 95 })],
  ['World_06', new Resources({ wood: 280, clay: 315, iron: 200, crop: 145 })],
  ['World_08', new Resources({ wood: 295, clay: 210, iron: 235, crop: 185 })],
  ['World_09', new Resources({ wood: 570, clay: 470, iron: 560, crop: 265 })],
  ['World_10', new Resources({ wood: 525, clay: 420, iron: 620, crop: 335 })],
  ['World_11', new Resources({ wood: 650, clay: 800, iron: 740, crop: 530 })],
  [
    'World_12',
    new Resources({ wood: 2650, clay: 2150, iron: 1810, crop: 1320 }),
  ],
  ['World_13', new Resources({ wood: 800, clay: 700, iron: 750, crop: 600 })],
  ['World_15', new Resources({ wood: 1050, clay: 800, iron: 900, crop: 750 })],
  ['Battle_02', new Resources({ wood: 130, clay: 150, iron: 120, crop: 100 })],
  ['Battle_03', new Resources({ wood: 110, clay: 140, iron: 160, crop: 30 })],
  ['Battle_04', new Resources({ wood: 190, clay: 250, iron: 160, crop: 110 })],
  ['Battle_06', new Resources({ wood: 120, clay: 120, iron: 90, crop: 50 })],
  ['Battle_09', new Resources({ wood: 280, clay: 120, iron: 220, crop: 110 })],
  ['Battle_10', new Resources({ wood: 440, clay: 290, iron: 430, crop: 240 })],
  ['Battle_11', new Resources({ wood: 210, clay: 170, iron: 245, crop: 115 })],
  ['Battle_12', new Resources({ wood: 450, clay: 435, iron: 515, crop: 550 })],
  ['Battle_13', new Resources({ wood: 500, clay: 400, iron: 700, crop: 400 })],
]);
