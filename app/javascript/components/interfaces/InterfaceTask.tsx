export default interface ITask {
  id: number;
  name: string;
  description: string;
  tags: string[];
  // date or string better for deadline?
  deadline?: Date;
  isDone: boolean;
  // only support 1 level of children
  isChild: boolean;
  children: ITask[];
}
