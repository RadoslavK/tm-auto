export class MentorTask {
  public readonly completed: boolean;
  public readonly id: string;

  constructor(params: MentorTask) {
    Object.assign(this, params);
  }
}