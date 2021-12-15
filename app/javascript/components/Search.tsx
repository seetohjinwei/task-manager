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
    // console.log(searchProps);
  };
  const handleOnChangeString: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setSearchProps({ ...searchProps, [event.target.name]: event.target.value });
    // console.log(searchProps);
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
  // return <div>This is the search form. This is the search string: {searchProps.searchString}.</div>;
};

export default Search;
