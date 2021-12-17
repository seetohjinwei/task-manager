export default interface ITask {
  id: number;
  name: string;
  description: string;
  tags: string[];
  deadline: string;
  isdone: boolean;
}
