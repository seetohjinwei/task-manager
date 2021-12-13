export default interface ITask {
  id: number;
  name: string;
  description: string;
  tags: string[];
  deadline?: Date;
  // only support 1 level of children
  isChild: boolean;
  children: ITask[];
}
