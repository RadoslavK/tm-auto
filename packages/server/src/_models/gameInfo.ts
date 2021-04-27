import { Tribe } from 'shared/enums/Tribe.js';
import type { PartialFields } from 'shared/types/fields.type.js';
import { mergeDefaults } from 'shared/utils/merge.js';

export enum TokenType {
  Ajax,
  Bearer,
}

export type Token = {
  readonly type: TokenType;
  readonly value: string;
};

export class GameInfo {
  public accountTribe: Tribe = Tribe.Romans;

  public factions: boolean = false;

  public parsed: boolean = false;

  public allyId: number | null = null;

  public speed = 0;

  public token: Token = {
    type: TokenType.Ajax,
    value: '',
  };

  public mapSize: number = 200;

  constructor(params: PartialFields<GameInfo> = {}) {
    mergeDefaults(this, params);
  }
}
