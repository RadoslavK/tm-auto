declare module 'TMAuto' {
  import { Validator } from 'prop-types';

  global {
    type PropTypesShape<IProps> = {
      [P in keyof IProps]-?: Validator<any>;
    };
  }
}
