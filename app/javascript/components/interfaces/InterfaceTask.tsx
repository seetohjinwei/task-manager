export default interface ITask {
  id: number;
  posid: number;
  name: string;
  description: string;
  tags: string[];
  deadline: string;
  isdone: boolean;
}
