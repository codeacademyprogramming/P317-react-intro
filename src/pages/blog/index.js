import axios from "axios";
import React, { useEffect, useState } from "react";

export const Blogs = () => {
  const [posts, setPosts] = useState([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then((res) => {
        setPosts(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsError(true);
        setIsLoading(false);
      });
  }, []);

  return (
    <div style={{ margin: "50px auto" }}>
      {isLoading && <h2>Posts are loading...</h2>}
      {Boolean(posts.length) && (
        <>
          <h3>Posts</h3>
          <ul
            style={{
              display: "flex",
              listStyle: "none",
              paddingLeft: 0,
              flexWrap: "wrap",
            }}
          >
            {posts.map(({ id, title, body }) => {
              return (
                <li
                  key={id}
                  style={{
                    marginRight: "20px",
                    width: "25%",
                    border: "2px solid black",
                    padding: "10px",
                  }}
                >
                  <h2># {id}</h2>
                  <h3>{title}</h3>
                  <p>{body}</p>
                </li>
              );
            })}
          </ul>
        </>
      )}
      {isError && <h2>Something went wrong</h2>}
    </div>
  );
};
