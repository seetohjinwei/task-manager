import IUser from "./interfaces/InterfaceUser";
import React from "react";
import Form from "react-bootstrap/Form";

// renders the search box
const Search = ({
  searchString,
  setSearchString,
  userDetails,
  setUserDetails,
}: {
  searchString: string;
  setSearchString: React.Dispatch<React.SetStateAction<string>>;
  userDetails: IUser;
  setUserDetails: React.Dispatch<React.SetStateAction<IUser>>;
}) => {
  const handleOnChangeCheckbox: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    // TODO: modify in database
    setUserDetails({ ...userDetails, [event.target.name]: event.target.checked });
  };
  const handleOnChangeString: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setSearchString(event.target.value);
  };

  return (
    <div className="d-flex my-3">
      <Form>
        <Form.Group>
          <Form.Control
            type="text"
            name="searchString"
            placeholder="Search..."
            value={searchString}
            onChange={handleOnChangeString}
          ></Form.Control>
        </Form.Group>
        <Form.Check
          inline
          type="switch"
          label="Show Finished Tasks"
          name="displayDone"
          checked={userDetails.display_done}
          onChange={handleOnChangeCheckbox}
        />
        <Form.Check
          inline
          type="switch"
          label="Match All Search Terms"
          name="strictSearch"
          checked={userDetails.strict_search}
          onChange={handleOnChangeCheckbox}
        />
      </Form>
    </div>
  );
};

export default Search;
