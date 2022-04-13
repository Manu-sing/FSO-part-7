import React, { useState, useEffect, useRef } from "react";
import blogService from "./services/blogs";
import loginService from "./services/login";
import ErrorMessage from "./components/ErrorMessage";
import Header from "./components/Header";
import RenderAll from "./components/RenderAll";
import "./App.css";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import Forma from "./components/Forma";
import Togglable from "./components/Togglable";
import RegistrationForm from "./components/RegistrationForm";
import registrationService from "./services/registration";
import { handleNotification } from "./reducers/notificationReducer";
import { useDispatch, useSelector } from "react-redux";
import {
  initializeBlogs,
  createBlog,
  removeBlog,
  likeABlog,
  toggleABlog,
} from "./reducers/blogReducer";
// import { initializeUser } from "./reducers/signedInUserReducer";
import { initUsers } from "./reducers/usersReducer";
import RenderAllUsers from "./components/RenderAllUsers";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RenderSingleUser from "./components/RenderSingleUser";
import RenderSingleBlog from "./components/RenderSingleBlog";

const App = () => {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs);
  const users = useSelector((state) => state.users);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameForRegistration, setUsernameForRegistration] = useState("");
  const [nameForRegistration, setNameForRegistration] = useState("");
  const [passwordForRegistration, setPasswordForRegistration] = useState("");
  const [loginErrorMessage, setLoginErrorMessage] = useState("");
  const [registrationErrorMessage, setRegistrationErrorMessage] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    dispatch(initializeBlogs());
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  useEffect(() => {
    dispatch(initUsers());
  }, []);

  const addBlog = (blogObject) => {
    if (
      blogObject.title === "" ||
      blogObject.author === "" ||
      blogObject.url === ""
    ) {
      alert('THE FIELDS "TITLE", "AUTHOR" AND "URL" MUST BE PROVIDED.');
    } else {
      blogFormRef.current.toggleVisibility();
      dispatch(createBlog(blogObject));
      const msg = "THE ARTICLE WAS SUCCESFULLY ADDED TO THE LIST.";
      dispatch(handleNotification(msg));
    }
  };

  const handleUsername = (e) => {
    setUsername(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      resetLoginForm();
      blogFormRef.current.toggleVisibility();
    } catch (exception) {
      resetLoginForm();
      setLoginErrorMessage(
        "USERNAME AND PASSWORD MUST BE PROVIDED AND MUST BE AT LEAST 3 CHARACTERS LONG. USERNAME MUST BE UNIQUE."
      );
      setTimeout(() => {
        setLoginErrorMessage(null);
      }, 5000);
    }
  };

  const resetLoginForm = () => {
    setUsername("");
    setPassword("");
  };

  const loginForm = () => (
    <Togglable buttonLabel="Login" ref={blogFormRef}>
      <LoginForm
        handleLogin={handleLogin}
        password={password}
        handlePassword={handlePassword}
        username={username}
        handleUsername={handleUsername}
      />
    </Togglable>
  );

  const handleUsernameForRegistration = (e) => {
    setUsernameForRegistration(e.target.value);
  };

  const handleNameForRegistration = (e) => {
    setNameForRegistration(e.target.value);
  };

  const handlePasswordForRegistration = (e) => {
    setPasswordForRegistration(e.target.value);
  };

  const handleRegistration = async (e) => {
    e.preventDefault();
    const newUser = {
      username: usernameForRegistration,
      name: nameForRegistration,
      password: passwordForRegistration,
    };

    registrationService
      .registration(newUser)
      .then(() => {
        alert(
          "YOU HAVE SUCCESSFULLY SIGNED-IN. CLICK LOGIN, ENTER YOUR CREDENTIALS AND ENJOY USING THE APP!"
        );
        resetRegistrationForm();
        blogFormRef.current.toggleVisibility();
      })
      .catch(() => {
        resetRegistrationForm();
        setRegistrationErrorMessage(
          "USERNAME AND PASSWORD MUST BE PROVIDED AND BE AT LEAST 3 CHARACTERS LONG."
        );
        setTimeout(() => {
          setRegistrationErrorMessage(null);
        }, 4000);
      });
  };

  const resetRegistrationForm = () => {
    setUsernameForRegistration("");
    setNameForRegistration("");
    setPasswordForRegistration("");
  };

  const registrationForm = () => (
    <Togglable buttonLabel="Sign-in" ref={blogFormRef}>
      <RegistrationForm
        handleRegistration={handleRegistration}
        usernameForRegistration={usernameForRegistration}
        handleUsernameForRegistration={handleUsernameForRegistration}
        nameForRegistration={nameForRegistration}
        handleNameForRegistration={handleNameForRegistration}
        passwordForRegistration={passwordForRegistration}
        handlePasswordForRegistration={handlePasswordForRegistration}
      />
    </Togglable>
  );

  const blogFormRef = useRef();

  const blogForm = () => (
    <Togglable buttonLabel="Add New Blog" ref={blogFormRef}>
      <Forma createBlog={addBlog} />
    </Togglable>
  );

  const handleLogout = async () => {
    await window.localStorage.clear();
    setUser(null);
    setTimeout(() => {
      alert("YOU HAVE SUCCESSFULLY LOGOUT.");
    }, 100);
  };

  const toggleStatus = (id) => {
    const blogToToggle = blogs.find((n) => n.id === id);
    const changedStatus = blogToToggle.status === "Read" ? "Non Read" : "Read";
    const toggledBlog = { ...blogToToggle, status: changedStatus };
    dispatch(toggleABlog(id, toggledBlog));
    const msg = "THE STATUS OF THE ARTICLE WAS SUCCESFULLY UPDATED.";
    dispatch(handleNotification(msg));
  };

  const addALike = (id) => {
    const blogToAddaLikeTo = blogs.find((n) => n.id === id);
    const editedBlog = {
      ...blogToAddaLikeTo,
      likes: blogToAddaLikeTo.likes + 1,
    };
    dispatch(likeABlog(id, editedBlog));
    const msg = "YOU SUCCESFULLY ADDED A NEW LIKE TO THE ARTICLE.";
    dispatch(handleNotification(msg));
  };

  const handleDelete = (id) => {
    const blogToDelete = blogs.find((n) => n.id === id);

    if (
      window.confirm(
        `Are you sure you want to delete the article "${blogToDelete.title}" from the list?`
      )
    ) {
      dispatch(removeBlog(id));
      const msg = `The article "${blogToDelete.title}" was succesfully deleted from the list.`;
      dispatch(handleNotification(msg));
    }
  };

  return (
    <div>
      <Router>
        <div className="header-container">
          <Header text="BLOG APP" user={user} handleLogout={handleLogout} />
        </div>
        <div>
          {user === null ? (
            <div>
              {loginForm()}
              <ErrorMessage errorMessage={loginErrorMessage} />
              {registrationForm()}
              <ErrorMessage errorMessage={registrationErrorMessage} />
            </div>
          ) : (
            <div>
              {blogForm()}
              <hr />
              <Notification />
              <Routes>
                <Route
                  path="/"
                  element={
                    <RenderAll
                      blogs={blogs}
                      toggleStatus={toggleStatus}
                      addALike={addALike}
                      handleDelete={handleDelete}
                    />
                  }
                />
                <Route
                  path="/users"
                  element={<RenderAllUsers users={users} />}
                />
                <Route
                  path="/user/:id"
                  element={<RenderSingleUser users={users} />}
                />
                <Route
                  path="/blog/:id"
                  element={
                    <RenderSingleBlog
                      blogs={blogs}
                      addALike={addALike}
                      toggleStatus={toggleStatus}
                      handleDelete={handleDelete}
                    />
                  }
                />
              </Routes>
            </div>
          )}
        </div>
      </Router>
    </div>
  );
};

export default App;
