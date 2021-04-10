import type { PartialFields } from 'shared/types/fields.type.js';
import { mergeDefaults } from 'shared/utils/merge.js';

import { Tribe } from './enums/tribe.js';

export enum TokenType {
  Ajax,
  Bearer,
}

export type Token = {
  readonly type: TokenType;
  readonly value: string;
};

export class GameInfo {
  public parsed: boolean = false;

  public allyId: number | null = null;

  public speed = 0;

  public tribe: Tribe = Tribe.Romans;

  public token: Token = {
    type: TokenType.Ajax,
    value: '',
  };

  public mapSize: number = 200;

  constructor(params: PartialFields<GameInfo> = {}) {
    mergeDefaults(this, params);
  }
}
