import React from "react";
import "./App.css";
import { BrowserRouter as Router, Link, Switch, Route } from "react-router-dom";
import { UserProvider } from "./context";
import { Todos } from "./pages/todos";
import { Home } from "./pages/home";
import { About } from "./pages/about";
import { NotFound } from "./pages/notFound";
import { Blogs } from "./pages/blog";

function App() {
  return (
    <UserProvider>
      <div style={{ width: "70%", margin: "30px auto" }}>
        <Router>
          <nav>
            <ul style={{ display: "flex", listStyle: "none", paddingLeft: 0 }}>
              <li style={{ marginRight: "20px" }}>
                <Link to="/">Home</Link>
              </li>
              <li style={{ marginRight: "20px" }}>
                <Link to="/about">About</Link>
              </li>
              <li style={{ marginRight: "20px" }}>
                <Link to="/todos">Todos</Link>
              </li>
              <li style={{ marginRight: "20px" }}>
                <Link to="/blogs">Blogs</Link>
              </li>
            </ul>
          </nav>
          <main>
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route path="/about">
                <About />
              </Route>
              <Route path="/todos">
                <Todos />
              </Route>
              <Route path="/blogs">
                <Blogs />
              </Route>
              <Route path="*">
                <NotFound />
              </Route>
            </Switch>
          </main>
          <footer>This is our footer</footer>
        </Router>
      </div>
    </UserProvider>
  );
}

export default App;
