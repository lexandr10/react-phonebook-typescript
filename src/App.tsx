import React, { useEffect } from "react";

import "./App.css";
import Form from "./components/Form/Form";
import ListContact from "./components/ListContacts/ListContacts";
import { useAppDistpatch } from "./hooks/hooks";
import { getContacts } from "./store/thunk";

function App() {
  const distpatch = useAppDistpatch();
  useEffect(() => {
    distpatch(getContacts());
  }, [distpatch]);
  return (
    <div className="App">
      <Form />
      <ListContact />
    </div>
  );
}

export default App;
