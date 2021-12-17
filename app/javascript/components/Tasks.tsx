import ISearch from "./interfaces/InterfaceSearch";
import ITask from "./interfaces/InterfaceTask";
import Task from "./Task";
import React from "react";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

const Tasks = ({ tasks, searchProps }: { tasks: ITask[]; searchProps: ISearch }) => {
  const searchString: string = searchProps.searchString;
  const searchTerms: string[] = searchString.split(" ");
  function render(task: ITask, index: number) {
    // empty string is trivially included in every other string
    // can change to .every() if decide to match ALL search terms
    // might make that an option (strict search -- match all terms)
    // "searchOptions maybe" -- include in InterfaceSearch

    const matchParam = (searchParam: string): boolean => {
      // decides if each search parameter matches this task
      if (searchParam === "") {
        // ignores empty search term
        return true;
      }
      const lowerCaseSearchParam: string = searchParam.toLowerCase();
      return (
        (searchParam.startsWith("#") &&
          task.tags.some((tag) => tag.includes(searchParam.slice(1)))) ||
        task.name.toLowerCase().includes(lowerCaseSearchParam) ||
        task.description.toLowerCase().includes(lowerCaseSearchParam)
      );
    };
    const passDisplayDone: boolean = searchProps.displayDone || !task.isDone;
    const passStrictSearch: boolean = searchProps.strictSearch
      ? searchTerms.every(matchParam)
      : searchTerms.some(matchParam);

    return (
      passDisplayDone &&
      passStrictSearch && (
        // renders however many tasks on 1 row
        <Col className="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4 col-xxl-3" key={index}>
          <Task {...task} />
        </Col>
      )
    );
  }

  return (
    <Container>
      {/* g-3 gutters (spacing between grid elements) */}
      <Row className="g-3">{tasks.map(render)}</Row>
    </Container>
  );
};

export default Tasks;
