import React, { useState, useEffect, Fragment } from "react";
import "./App.css";
import ModalExampleModal from "./ModalExampleModal";
import {
  Form,
  Loader,
  Dimmer,
} from "semantic-ui-react";

import ListUsers from "./List/ListUsers";
import ListLike from "./List/ListLike";

function App() {
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [followers, setFollowers] = useState("");
  const [following, setFollowing] = useState("");
  const [repos, setRepos] = useState("");
  const [avatar, setAvatar] = useState("");
  const [userInput, setUserInput] = useState("");
  const [error, setError] = useState(null);
  const [allRepos, setAllRepos] = useState("");
  const [created, setCreated] = useState("");
  const [updated, setUpdated] = useState("");
  const [location, setLocation] = useState("");
  const [email, setEmail] = useState("");
  const [dateArr, setDateArr] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [reservArr, setReservArr] = useState([]);


  useEffect(() => {
    fetch("https://api.github.com/users/example")
      .then((res) => res.json())
      .then((date) => {
        setDate(date);
      });
  }, []);
  const setDate = ({
    name,
    login,
    followers,
    following,
    public_repos,
    avatar_url,
    repos_url,
    created_at,
    updated_at,
    location,
    email,
  }) => {
    avatar_url =
      avatar_url === "https://avatars.githubusercontent.com/u/57936?v=4"
        ? "https://react.semantic-ui.com/images/avatar/large/matthew.png"
        : avatar_url;

    setName(name);
    setUserName(login);
    setFollowers(followers);
    setFollowing(following);
    setRepos(public_repos);
    setAvatar(avatar_url);
    setAllRepos(repos_url);
    setCreated(created_at);
    setUpdated(updated_at);
    setLocation(location);
    setEmail(email);
  };

  const handleSearch = (e) => {
    setUserInput(e.target.value);
    setError(null);
  };

  const handleSubmit = () => {
    setIsLoading(true);
    fetch(`https://api.github.com/users/${userInput}`)
      .then((res) => res.json())
      .then((date) => {
        if (date.message) {
          setError(date.message);
          setIsLoading(false);
          // console.log(date.message,'date.messagedate.messagedate.messagedate.messagedate.messagedate.message')
        } else {
          // console.log(date, 'asdasdsadasdasdsadsadas')
          setError(null);
          setDate(date);
          setDateArr([date]);
          setIsLoading(false);
          let arr = [...reservArr, date];

          setReservArr(arr);
        }
      }, []);
  };
  const clickHandler = () => {
    setModalOpen(true);
  };

  const closeClickHandler = () => {
    setModalOpen(false);
  };

  return (
    <Fragment>
      <header className="search">
        <h1>GitHab Search</h1>
        <Form className="from" onSubmit={handleSubmit} size="middle">
          <Form.Group>
            <Form.Input
              error={userInput === ""}
              placeholder="Name"
              name="name"
              onChange={handleSearch}
            />
            <Form.Button content="Submit" size="middle" />
          </Form.Group>
        </Form>
      </header>
      {/* list like */}
      <ListLike onArr={reservArr} />
      {isLoading && userInput != "" && dateArr.length > 0 && (
        <Dimmer active>
          <Loader indeterminate>Preparing Files</Loader>
        </Dimmer>
      )}
      {/* list like */}
      {error && <p className="is-loading">{error}</p>}
      <div className="flex">
        {/* <HeaderImage /> */}
        <ListUsers
          // onName={onNameFromList}
          arr={dateArr}
          userInput={userInput}
        />
      </div>
      {modalOpen ? (
        <ModalExampleModal
          userName={userName}
          image={avatar}
          allRepos={allRepos}
          value={modalOpen}
          close={closeClickHandler}
          created={created}
          updated={updated}
          followers={followers}
          following={following}
          location={location}
          email={email}
          name={name}
        />
      ) : null}
    </Fragment>
  );
}

export default App;
