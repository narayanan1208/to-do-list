import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import ListToDoLists from "./components/ListToDoLists";
import ToDoList from "./components/ToDoList";

function App() {
  const [listSummaries, setListSummaries] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const API_BASE_URL = "http://localhost:3001/api";
  useEffect(() => {
    reloadData().catch(console.error);
  }, []);

  const reloadData = async () => {
    const res = await axios.get(`${API_BASE_URL}/lists`);
    const data = await res.data;
    setListSummaries(data);
  };

  const handleNewToDoList = (newName: string) => {
    const updateData = async () => {
      const newListData = {
        name: newName,
      };

      await axios.post(`${API_BASE_URL}/lists`, newListData);
      reloadData().catch(console.error);
    };
    updateData();
  };

  const handleDeleteToDoList = (id: number) => {
    const updateData = async () => {
      await axios.delete(`${API_BASE_URL}/lists/${id}`);
      reloadData().catch(console.error);
    };
    updateData();
  };

  const handleSelectList = (id: number) => {
    console.log("Selecting item", id);
    setSelectedItem(id);
  };

  const backToList = () => {
    setSelectedItem(null);
    reloadData().catch(console.error);
  };

  if (selectedItem === null) {
    return (
      <div className="App">
        <ListToDoLists
          listSummaries={listSummaries}
          handleSelectList={handleSelectList}
          handleNewToDoList={handleNewToDoList}
          handleDeleteToDoList={handleDeleteToDoList}
        />
      </div>
    );
  } else {
    return (
      <div className="App">
        <ToDoList listId={selectedItem} handleBackButton={backToList} />
      </div>
    );
  }
}

export default App;
