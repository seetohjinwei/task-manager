import ISearch from "./InterfaceSearch";
import React from "react";

// renders the search box
const Search = ({
  searchProps,
  setSearchProps,
}: {
  searchProps: ISearch;
  setSearchProps: React.Dispatch<React.SetStateAction<ISearch>>;
}) => {
  return <div>This is the search form. This is the search string: {searchProps.searchString}.</div>;
};

export default Search;
