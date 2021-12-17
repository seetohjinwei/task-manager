import ISearch from "./interfaces/InterfaceSearch";
import React from "react";
import Form from "react-bootstrap/Form";

// renders the search box
const Search = ({
  searchProps,
  setSearchProps,
}: {
  searchProps: ISearch;
  setSearchProps: React.Dispatch<React.SetStateAction<ISearch>>;
}) => {
  const handleOnChangeCheckbox: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setSearchProps({ ...searchProps, [event.target.name]: event.target.checked });
  };
  const handleOnChangeString: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setSearchProps({ ...searchProps, [event.target.name]: event.target.value });
  };

  return (
    <div className="d-flex">
      <Form>
        <Form.Group>
          <Form.Control
            type="text"
            name="searchString"
            placeholder="Search..."
            value={searchProps.searchString}
            onChange={handleOnChangeString}
          ></Form.Control>
        </Form.Group>
        <Form.Check
          inline
          type="switch"
          label="Show Finished Tasks"
          name="displayDone"
          checked={searchProps.displayDone}
          onChange={handleOnChangeCheckbox}
        />
        <Form.Check
          inline
          type="switch"
          label="Match All Search Terms"
          name="strictSearch"
          checked={searchProps.strictSearch}
          onChange={handleOnChangeCheckbox}
        />
      </Form>
    </div>
  );
};

export default Search;
