import React, { useState, useEffect } from "react";
import "./App.css";
import ModalExampleModal from './ModalExampleModal';
import { Form, Card, Icon, Image } from "semantic-ui-react";


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
  const [updated, setUpdated] = useState('')
  const [location, setLocation] = useState('')
  const [email, setEmail] = useState('')

  const [newComp, setNewComp] = useState(false)

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
    email
  }) => {
    avatar_url = avatar_url === "https://avatars.githubusercontent.com/u/57936?v=4" ?'https://react.semantic-ui.com/images/avatar/large/matthew.png': avatar_url;

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
    console.log(e.target.value)
    setUserInput(e.target.value)
  } 
  const handleSubmit = () => {
    fetch(`https://api.github.com/users/${userInput}`)
      .then((res) => res.json())
      .then((date) => {
        if(date.message) {
          setError(date.message)
        } else {
          console.log(date)
          setError(null)
          setDate(date);
        }
      }, []);
    
  } 
  const clickHandler = () => {
    setNewComp(true)
  }

  const closeClickHandler = () => {
    setNewComp(false)
  }


let errorMessage = <h1 style={{textAlign: "center"}}>{error}</h1>
  return (
    <div>
      <header className="search">
        <h1>GitHab Search</h1>
      </header>
      <Form className="from" onSubmit={handleSubmit}>
        <Form.Group >
          <Form.Input placeholder="Name" name="name" onChange={handleSearch} />
          <Form.Button content="Submit" />
        </Form.Group>
      </Form>
      {error? errorMessage: (<div className="card">
        <Card onClick={clickHandler}>
          <Image
            src = {avatar}
            wrapped
            ui={false}
          />
          <Card.Content>
            <Card.Header>{name}</Card.Header>
            <Card.Header>{userName}</Card.Header>
          </Card.Content>
          <Card.Content extra>
            <a>
              <Icon name="user" />
              {followers} Followers
            </a>
          </Card.Content>
          <Card.Content extra>
            <a>
              <Icon name="user" />
              {repos} Repos
            </a>
          </Card.Content>
          <Card.Content extra>
            <a>
              <Icon name="user" />
              {following} Following
            </a>
          </Card.Content>
        </Card>
        {newComp? <ModalExampleModal
          userName = {userName}
          image = {avatar}
          allRepos = {allRepos}
          value = {newComp}
          close = {closeClickHandler}
          created = {created}
          updated = {updated}
          followers = {followers}
          following ={following}
          location = {location}
          email = {email}
          name = {name}
        />: null }
      </div>)}
      
    </div>
  );
}

export default App;
