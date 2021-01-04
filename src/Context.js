import React from "react";

const Context = React.createContext({
  NOTES: {},
  deleteNote: () => {},
  addFolder: () => {},
  addNote: () => {},
});

export default Context;
