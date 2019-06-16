import { Cooldown } from '../../../_models/cooldown';
import { ICoolDown } from '../../../_types/graphql';

export const mapCoolDown = (coolDown: ICoolDown): Cooldown => new Cooldown(coolDown);
