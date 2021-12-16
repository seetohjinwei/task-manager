import ISearch from "./interfaces/InterfaceSearch";
import React from "react";

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
    <form>
      <input
        type="checkbox"
        name="displayDone"
        checked={searchProps.displayDone}
        onChange={handleOnChangeCheckbox}
      />
      {"Show Finished Tasks"}
      <input
        type="checkbox"
        name="strictSearch"
        checked={searchProps.strictSearch}
        onChange={handleOnChangeCheckbox}
      />
      {"Match All Search Terms"}
      <input
        type="text"
        name="searchString"
        value={searchProps.searchString}
        onChange={handleOnChangeString}
      />
    </form>
  );
};

export default Search;
