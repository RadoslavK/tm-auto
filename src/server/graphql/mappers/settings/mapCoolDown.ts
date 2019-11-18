import { CoolDown } from '../../../_models/coolDown';
import { ICoolDown } from '../../../_types/graphql';

export const mapCoolDown = (coolDown: ICoolDown): CoolDown => new CoolDown(coolDown);
