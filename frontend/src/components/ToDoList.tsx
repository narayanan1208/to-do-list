import "./ToDoList.css";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { BiSolidTrash } from "react-icons/bi";

const ToDoList = (props) => {
  const { listId, handleBackButton } = props;
  let labelRef = useRef();
  const [listData, setListData] = useState(null);
  const API_BASE_URL = "http://localhost:3001/api";
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`${API_BASE_URL}/lists/${listId}`);
      const newData = await response.data;
      setListData(newData);
    };
    fetchData();
  }, [listId]);

  const handleCreateItem = (label: string) => {
    const updateData = async () => {
      const response = await axios.post(`${API_BASE_URL}/lists/${listData.id}/items/`, {
        label: label,
      });
      setListData(await response.data);
    };
    updateData();
  };

  const handleDeleteItem = (id: number) => {
    const updateData = async () => {
      const response = await axios.delete(
        `${API_BASE_URL}/lists/${listData.id}/items/${id}`
      );
      setListData(await response.data);
    };
    updateData();
  };

  const handleCheckToggle = (itemId: number, newState: string) => {
    const updateData = async () => {
      const response = await axios.patch(
        `${API_BASE_URL}/lists/${listData.id}/checked_state`,
        {
          item_id: itemId,
          checked_state: newState,
        }
      );
      setListData(await response.data);
    };
    updateData();
  };

  if (listData === null) {
    return (
      <div className="ToDoList loading">
        <button className="back" onClick={handleBackButton}>
          Back
        </button>
        Loading to-do list ...
      </div>
    );
  }
  return (
    <div className="ToDoList">
      <button className="back" onClick={handleBackButton}>
        Back
      </button>
      <h1>List: {listData.name}</h1>
      <div className="box">
        <label>
          New Item:&nbsp;
          <input id={labelRef} type="text" />
        </label>
        <button
          onClick={() =>
            handleCreateItem(document.getElementById(labelRef).value)
          }
        >
          New
        </button>
      </div>
      {listData.items?.length > 0 ? (
        listData.items.map((item) => {
          return (
            <div
              key={item.id}
              className={item.checked ? "item checked" : "item"}
              onClick={() => handleCheckToggle(item.id, !item.checked)}
            >
              <span>{item.checked ? "✅" : "⬜️"} </span>
              <span className="label">{item.label} </span>
              <span className="flex"></span>
              <span
                className="trash"
                onClick={(evt) => {
                  evt.stopPropagation();
                  handleDeleteItem(item.id);
                }}
              >
                <BiSolidTrash />
              </span>
            </div>
          );
        })
      ) : (
        <div className="box">There are currently no items.</div>
      )}
    </div>
  );
};

export default ToDoList;
