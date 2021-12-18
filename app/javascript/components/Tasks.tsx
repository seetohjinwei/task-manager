import ISearch from "./interfaces/InterfaceSearch";
import ITask from "./interfaces/InterfaceTask";
import Task from "./Task";
import React from "react";
// import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import axios from "axios";

const Tasks = ({
  tasks,
  setTasks,
  searchProps,
  loadTasks,
}: {
  tasks: ITask[];
  searchProps: ISearch;
  setTasks: React.Dispatch<React.SetStateAction<ITask[]>>;
  loadTasks: () => void;
}) => {
  const searchString: string = searchProps.searchString;
  const searchTerms: string[] = searchString.split(" ");
  function render(task: ITask, index: number) {
    // empty string is trivially included in every other string
    // can change to .every() if decide to match ALL search terms
    // might make that an option (strict search -- match all terms)
    // "searchOptions maybe" -- include in InterfaceSearch
    const matchParamStrict = (searchParam: string): boolean => {
      if (searchString !== "" && searchParam === "") {
        return true;
      } else {
        const lowerCaseSearchParam: string = searchParam.toLowerCase();
        return (
          (searchParam.startsWith("#") && task.tags.join(" ").includes(searchParam.slice(1))) ||
          task.name.toLowerCase().includes(lowerCaseSearchParam) ||
          task.description.toLowerCase().includes(lowerCaseSearchParam)
        );
      }
    };
    const matchParamNotStrict = (searchParam: string): boolean => {
      // decides if each search parameter matches this task
      if (searchString !== "" && searchParam === "") {
        // ignores empty search term
        return false;
      }
      const lowerCaseSearchParam: string = searchParam.toLowerCase();
      return (
        (searchParam.startsWith("#") && task.tags.join(" ").includes(searchParam.slice(1))) ||
        task.name.toLowerCase().includes(lowerCaseSearchParam) ||
        task.description.toLowerCase().includes(lowerCaseSearchParam)
      );
    };
    const passDisplayDone: boolean = searchProps.displayDone || !task.isdone;
    const passStrictSearch: boolean = searchProps.strictSearch
      ? searchTerms.every(matchParamStrict)
      : searchTerms.some(matchParamNotStrict);

    return (
      passDisplayDone &&
      passStrictSearch && (
        // renders however many tasks on 1 row
        <Col className="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4 col-xxl-3" key={index}>
          <Task {...{ task, updateTask, deleteTask }} />
        </Col>
      )
    );
  }

  const updateTask = (
    originalTask: ITask,
    newTask: {
      id: number;
      name?: string;
      description?: string;
      tags?: string[];
      deadline?: string;
      isdone?: boolean;
    }
  ) => {
    axios
      .patch(`http://localhost:3000/tasks/${newTask.id}`, newTask, { withCredentials: true })
      .then((response) => {
        if (response.status === 200) {
          const index: number = tasks.indexOf(originalTask);
          const tasksCopy: ITask[] = [...tasks];
          tasksCopy[index] = response.data.task;
          setTasks(tasksCopy);
        } else {
          console.log("error!", response);
        }
      })
      .catch((error) => console.log("error", error));
  };

  const deleteTask = (task: ITask) => {
    axios
      .delete(`http://localhost:3000/tasks/${task.id}`, { withCredentials: true })
      .then((response) => {
        if (response.status === 200) {
          const index: number = tasks.indexOf(task);
          const tasksCopy: ITask[] = [...tasks];
          tasksCopy.splice(index, 1);
          setTasks(tasksCopy);
        } else {
          console.log("error!", response);
        }
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <Container>
      {/* g-3 gutters (spacing between grid elements) */}
      <Row className="g-3">{tasks.map(render)}</Row>
    </Container>
  );
};

export default Tasks;
