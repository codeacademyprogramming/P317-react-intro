import React, { useEffect, useMemo, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import "./App.css";
import { Flex } from "./components/Flex";
// import { Counter } from "./Counter";

function App() {
  const [currentlyEditingTodo, setCurrentlyEditingTodo] = useState(null);
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

  const handleDeleteSelecteds = () => {
    setSelectedTodos((prevTodos) => {
      return prevTodos.filter((prevTodo) => !prevTodo.isSelected);
    });
  };

  const handleEdit = (e) => {
    setCurrentlyEditingTodo((previouslyEditingTodo) => ({
      ...previouslyEditingTodo,
      text: e.target.value,
    }));
  };

  const handleSave = () => {
    setSelectedTodos((prevTodos) => {
      return prevTodos.map((prevTodo) => {
        if (prevTodo.id === currentlyEditingTodo.id) {
          return {
            ...prevTodo,
            ...currentlyEditingTodo,
          };
        }
        return prevTodo;
      });
    });
    setCurrentlyEditingTodo(null);
  };

  const isAnySelected = useMemo(
    () => selectedTodos.some((todo) => todo.isSelected),
    [selectedTodos]
  );

  return (
    <div style={{ width: "70%", margin: "50px auto" }}>
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

      {isAnySelected && (
        <button onClick={handleDeleteSelecteds}>Delete selected todos</button>
      )}

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
                #{id} |
                {currentlyEditingTodo?.id === id ? (
                  <input
                    value={currentlyEditingTodo.text}
                    onChange={handleEdit}
                  />
                ) : (
                  text
                )}
              </span>
              <div>
                {currentlyEditingTodo &&
                  currentlyEditingTodo.id === id &&
                  currentlyEditingTodo.text !== text && (
                    <button
                      style={{ marginRight: "10px" }}
                      onClick={() => setCurrentlyEditingTodo(null)}
                    >
                      Cancel
                    </button>
                  )}
                {!isDone && (
                  <button
                    style={{ marginRight: "10px" }}
                    onClick={() => {
                      if (currentlyEditingTodo?.id === id) {
                        handleSave();
                      } else {
                        setCurrentlyEditingTodo({
                          id,
                          text,
                          isDone,
                          isSelected,
                        });
                      }
                    }}
                  >
                    {currentlyEditingTodo?.id === id ? "Save" : "Edit"}
                  </button>
                )}
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
