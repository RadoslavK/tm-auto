export class MentorTask {
  public readonly completed: boolean = false;
  public readonly id: string = '';

  constructor(params: MentorTask) {
    Object.assign(this, params);
  }
}