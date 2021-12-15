export default interface ISearch {
  searchString: string;
  // displayDone: hides "done" tasks
  displayDone: boolean;
  // strictSearch: matches for ALL search terms
  strictSearch: boolean;
}
