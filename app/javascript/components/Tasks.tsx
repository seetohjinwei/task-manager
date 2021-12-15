import ISearch from "./interfaces/InterfaceSearch";
import ITask from "./interfaces/InterfaceTask";
import Task from "./Task";
import React from "react";

// TODO: task renders if does NOT match searchString
// TODO: exception for empty searchString

const Tasks = ({ tasks, searchProps }: { tasks: ITask[]; searchProps: ISearch }) => {
  const searchString: string = searchProps.searchString;
  const searchTerms: string[] = searchString.split(" ");
  function render(task: ITask, index: number) {
    // empty string is trivially included in every other string
    // can change to .every() if decide to match ALL search terms
    // might make that an option (strict search -- match all terms)
    // "searchOptions maybe" -- include in InterfaceSearch
    const toRender: boolean = searchTerms.some((searchParam) => {
      const lowerCaseSearchParam: string = searchParam.toLowerCase();
      return (
        (searchParam.startsWith("#") && task.tags.includes(searchParam.slice(1))) ||
        task.name.toLowerCase().includes(lowerCaseSearchParam) ||
        task.description.toLowerCase().includes(lowerCaseSearchParam)
      );
    });
    return toRender ? <Task key={index} {...task} /> : null;
  }
  return <div>{tasks.map(render)}</div>;
};

export default Tasks;
