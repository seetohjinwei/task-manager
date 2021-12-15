import ISearch from "./interfaces/InterfaceSearch";
import ITask from "./interfaces/InterfaceTask";
import Task from "./Task";
import React from "react";

const Tasks = ({ tasks, searchProps }: { tasks: ITask[]; searchProps: ISearch }) => {
  // console.log(searchProps);
  const searchString: string = searchProps.searchString;
  // console.log(searchString);
  const searchTerms: string[] = searchString.split(" ");
  function render(task: ITask, index: number) {
    // empty string is trivially included in every other string
    // can change to .every() if decide to match ALL search terms
    // might make that an option (strict search -- match all terms)
    // "searchOptions maybe" -- include in InterfaceSearch
    const matchParam = (searchParam: string): boolean => {
      // decides if each search parameter matches this task
      const lowerCaseSearchParam: string = searchParam.toLowerCase();
      return (
        (searchParam.startsWith("#") &&
          task.tags.some((tag) => tag.includes(searchParam.slice(1)))) ||
        task.name.toLowerCase().includes(lowerCaseSearchParam) ||
        task.description.toLowerCase().includes(lowerCaseSearchParam)
      );
    };
    const toRender: boolean = searchProps.strictSearch
      ? searchTerms.every(matchParam)
      : searchTerms.some(matchParam);
    return toRender ? <Task key={index} {...task} /> : null;
  }
  return <div>{tasks.map(render)}</div>;
};

export default Tasks;
