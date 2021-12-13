import ISearch from "./InterfaceSearch";
import React from "react";

// renders the search box
const Search = (props: ISearch) => {
  return (
    <div>
      This is the search form. This is the search string: {props.searchString}.
    </div>
  );
};

export default Search;
