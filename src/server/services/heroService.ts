import { Hero } from '../_models/hero/hero';

class HeroService {
  private hero: Hero = new Hero();

  public get = (): Hero => this.hero;
}

export const heroService = new HeroService();
