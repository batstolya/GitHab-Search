import React, { useEffect, useState } from "react";
import { List, Image, Icon, Label } from "semantic-ui-react";
import ModalExampleModal from "../ModalExampleModal";

export default function ListItem(props) {
  const [modalOpen, setModalOpen] = useState(false);
  const [color, setColor] = useState("grey");
  const [number, setNumber] = useState(1);

  const testFunction = () => {
    setModalOpen(true);
    console.log("open");
  };
  const closeClickHandler = (e) => {
    console.log("close modal");
    setModalOpen(false);
  };


  useEffect(() => {
    console.log("render");

    for (let key in localStorage) {
      if (!localStorage.hasOwnProperty(key)) {
        continue; // пропустит такие ключи, как "setItem", "getItem" и так далее
      }
      if (props.login === key && +number === 2 && color === "yellow") {
        setColor("grey");
        console.log("work222");
      }

      if (props.login === key && +number === 1) {
        setColor("yellow");
      }

      if (props.login === key && +number % 2 === 0) {
        setColor("yellow");
        console.log("work odd");
      }
      if (props.login === key && +number % 2 === 1) {
        console.log("work even");

        // setColor('yellow')
        if (+number !== 1) {
          localStorage.removeItem(props.login);
          setColor("grey");
        }
      }
    }
  }, [number]);

  return (
    <>
      <List.Item
        color="red"
        style={{
          margin: "10px",
          borderRadius: "0.28571429rem",
          boxShadow: "0px 1px 1px 0px #d4d4d5, 0px 0px 0px 1px #d4d4d5",
        }}
      >
        <Image avatar src={props.src} />
        <List.Content onClick={testFunction}>
          <List.Header as="a">
            {/* {props.name === null ? props.login : props.name} */}
            {props.login}
          </List.Header>
          <List.Description>
            Click on the {" "}
            <a href={`https://github.com//${props.login}`}>
              <b>link</b>
            </a>{" "}
            to go to the actual repositories.
          </List.Description>
          <List.Description>
            <p>
              <Label as="a" basic>
                <Icon name="github" color="red" />
                {props.followers} Followers
              </Label>
              <Label>
                <Icon name="book" /> {props.repos} repos.
              </Label>
              <Label tag size="small" as="a" name="list ul">
                <Icon name="edit outline" />
                {props.created.split("T")[0]}
              </Label>
            </p>
          </List.Description>
        </List.Content>
        <Label
          as="a"
          pointing="left"
          onClick={() => {
            setNumber((prev) => prev + 1);
            setColor("yellow");
            localStorage.setItem(props.login, props.src);
          }}
        >
          <Icon name="star" color={color} />
        </Label>
      </List.Item>

      {/* some code  */}
      {modalOpen && (
        <ModalExampleModal
          userName={props.login}
          image={props.src}
          singeRepo={`https://api.github.com/users/${props.login}/repos`}
          value={"modalOpen"}
          close={closeClickHandler}
          created={props.created}
          updated={props.updated}
          followers={props.followers}
          following={props.following}
          location={props.location}
          email={props.email}
        />
      )}
    </>
  );
}
