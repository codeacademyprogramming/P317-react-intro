import React, { useEffect, useMemo, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import "./App.css";
import { Flex } from "./components/Flex";
// import { Counter } from "./Counter";

function App() {
  const [newTodo, setNewTodo] = useState("");
  const [todos] = useState([
    {
      id: uuidv4().substring(0, 8),
      text: "do exercise",
      isDone: false,
    },
    {
      id: uuidv4().substring(0, 8),
      text: "do homework",
      isDone: true,
    },
    {
      id: uuidv4().substring(0, 8),
      text: "do do",
      isDone: false,
    },
  ]);
  const [selectedTodos, setSelectedTodos] = useState(
    todos.map((todo) => {
      return { ...todo, isSelected: false };
    })
  );

  const checkboxRef = useRef(null);

  useEffect(() => {
    let selectedCount = 0;

    selectedTodos.forEach((todo) => {
      if (todo.isSelected) {
        selectedCount++;
      }
    });

    if (selectedCount === 0) {
      checkboxRef.current.indeterminate = false;
      checkboxRef.current.checked = false;
    } else if (selectedCount === selectedTodos.length) {
      checkboxRef.current.indeterminate = false;
      checkboxRef.current.checked = true;
    } else {
      checkboxRef.current.indeterminate = true;
      checkboxRef.current.checked = false;
    }
  }, [selectedTodos]);

  const handleDelete = (id) => {
    return () => {
      setSelectedTodos((prevTodos) => {
        return prevTodos.filter((todo) => todo.id !== id && todo);
      });
    };
  };

  const handleClick = (id) => {
    return () => {
      setSelectedTodos(
        selectedTodos.map((todo) => {
          if (todo.id === id) {
            return { ...todo, isDone: !todo.isDone };
          }
          return todo;
        })
      );
    };
  };

  const handleCreate = () => {
    if (!newTodo) {
      alert("You should enter your todo name first");
      return;
    }
    setSelectedTodos((prevTodos) => {
      return [
        ...prevTodos,
        {
          id: uuidv4().substring(0, 8),
          text: newTodo,
          isDone: false,
        },
      ];
    });
    setNewTodo("");
  };

  const handleCheckboxChange = (state, id) => {
    return () => {
      setSelectedTodos((prevTodos) => {
        return prevTodos.map((todo) => {
          if (todo.id === id) {
            return { ...todo, isSelected: !todo.isSelected };
          }
          return todo;
        });
      });
    };
  };

  const handleRootCheckboxChange = () => {
    if (selectedTodos.every((selectedTodo) => selectedTodo.isSelected)) {
      setSelectedTodos((prevTodos) => {
        return prevTodos.map((todo) => {
          return { ...todo, isSelected: false };
        });
      });
    } else if (selectedTodos.some((selectedTodo) => selectedTodo.isSelected)) {
      setSelectedTodos((prevTodos) => {
        return prevTodos.map((todo) => {
          return { ...todo, isSelected: false };
        });
      });
    } else {
      setSelectedTodos((prevTodos) => {
        return prevTodos.map((todo) => {
          return { ...todo, isSelected: true };
        });
      });
    }
  };

  return (
    <div style={{ width: "50%", margin: "50px auto" }}>
      <h1>Todo list</h1>
      <Flex justifyContent="space-between" alignItems="initial">
        <input
          type="text"
          placeholder="enter your todo"
          value={newTodo}
          onChange={(e) => {
            setNewTodo(e.target.value);
          }}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              handleCreate();
            }
          }}
          style={{ width: "50%", outline: "none", padding: "10px" }}
        />
        <button onClick={handleCreate}>Add todo</button>
      </Flex>

      <input
        type="checkbox"
        onChange={handleRootCheckboxChange}
        style={{ marginTop: "16px" }}
        ref={checkboxRef}
      />

      <ul
        style={{
          paddingLeft: 0,
          listStyle: "none",
          border: "2px solid black",
          padding: "10px",
        }}
      >
        {selectedTodos.map(({ id, isDone, isSelected, text }, index) => {
          return (
            <Flex
              justifyContent="space-between"
              tag="li"
              style={{
                backgroundColor: isDone ? "green" : "initial",
                color: isDone ? "white" : "initial",
                padding: "10px",
                borderBottom:
                  index === todos.length - 1 ? "initial" : "2px solid black",
              }}
              key={id}
            >
              <span
                style={{
                  textDecoration: isDone ? "line-through" : "initial",
                }}
              >
                <input
                  type="checkbox"
                  onChange={handleCheckboxChange("single", id)}
                  checked={isSelected}
                  style={{ marginRight: "8px" }}
                />
                #{id} | {text}
              </span>
              <div>
                <button
                  style={{ marginRight: "10px" }}
                  onClick={handleDelete(id)}
                >
                  Delete
                </button>
                <button type="button" onClick={handleClick(id)}>
                  {isDone ? "Move to in progress" : "Move to done"}
                </button>
              </div>
            </Flex>
          );
        })}
      </ul>
      {/* <Counter /> */}
    </div>
  );
}

export default App;
