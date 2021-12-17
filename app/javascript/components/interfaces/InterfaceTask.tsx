export default interface ITask {
  id: number;
  name: string;
  description: string;
  tags: string[];
  // date or string better for deadline
  deadline?: string;
  isDone: boolean;
}
