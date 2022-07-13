import React, { useEffect } from "react";
import {
  Button,
  Header,
  Image,
  Modal,
  Card,
  Icon,
  CardGroup,
  Grid,
} from "semantic-ui-react";
import CardMore from "./Card/CardMore";
import CardSearch from "./Card/CardSearch";

export default function ModalExampleModal(props) {
  const [open, setOpen] = React.useState(true);
  const [count, setCount] = React.useState([]);
  const [reservCaunt, setReservCaunt] = React.useState([]);

  const [openRepos, setOpenRepos] = React.useState([]);
console.log(props.singeRepo,'singeRepo')
console.log(props.allRepos,'allRepos')

  useEffect(() => {
    fetch(props.allRepos || props.singeRepo)
      .then((res) => res.json())
      .then((repo) => {
        setCount(repo);
        setReservCaunt(repo);
      });
  }, []);

  function filter(list, text) {
    text = text.toUpperCase();

    if (text === "") {
      return reservCaunt;
    }
    if (list.length < 1) {
      list = reservCaunt;
      return list.filter((el) => el.name.toUpperCase().includes(text));
    }

    return list.filter((el) => el.name.toUpperCase().includes(text));
  }

  const changeHandler = (e) => {
    let b = filter(count, e.target.value);
    setCount(b);
  };
  let location =
    props.location === null ? "Somewhere on Earth)" : props.location;
  let email = props.email === null ? "not yet)" : props.email;
  let name = props.name === null ? props.userName : props.name;

  const clickHandler = (e) => {
    let arr = count.filter((item) => e.target.innerHTML === item.name);
    setOpenRepos(arr);
  };
  return (
    <Modal onClose={props.close} open={open}>
      <Modal.Header>Profile {props.userName}</Modal.Header>
      <Modal.Content image>
        <Image size="big" src={props.image} wrapped />
        <Modal.Description>
          <Header>Default Profile {props.userName}</Header>
          <p>
            Avatar image, username, number of followers, number of following,
            biography, email, location, join date, and a list of public
            repositories with a search bar at the top
          </p>

          <p>
            {" "}
            <Icon name="address card outline" /> Name: {name}
          </p>
          <p>
            {" "}
            <Icon name="mail" /> Email: {email}
          </p>
          <p>
            {" "}
            <Icon name="map" /> Location: {location}
          </p>
          <hr />
          <Card.Content extra>
            <a>
              <Icon name="time" />
              {props.created.split("T")[0]} (Account created)
            </a>
          </Card.Content>
          <Card.Content extra>
            <a>
              <Icon name="time" />
              {props.updated.split("T")[0]} (Account updated)
            </a>
          </Card.Content>
          <hr />
          <Card.Content extra>
            <a>
              <Icon name="github" />
              {props.followers} (Followers)
            </a>
          </Card.Content>
          <p>
            <a>
              <Icon name="user" />
              {props.following} (Following)
            </a>
          </p>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        {/* CardSearch CardMore */}
        <CardGroup>
          <CardSearch
            count={count}
            changeHandler={changeHandler}
            clickHandler={clickHandler}
          />
          <CardMore openRepos={openRepos} />
        </CardGroup>
        {/* CardSearch CardMore */}
      </Modal.Actions>
      <Modal.Actions>
        <Grid>
          <Grid.Column textAlign="center">
            <Button color="black" onClick={props.close}>
              Close
            </Button>
            <Button
              content="Yep, that's me"
              labelPosition="right"
              icon="checkmark"
              onClick={props.close}
              positive
            />
          </Grid.Column>
        </Grid>
      </Modal.Actions>
    </Modal>
  );
}
