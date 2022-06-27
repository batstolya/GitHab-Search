import React from 'react'
import {
  Input,
  Card,
  Icon,
} from "semantic-ui-react";
export default function CardSearch(props) {

  return (
    <Card>
      <Card.Content textAlign="center">
        <Card.Header>Search for repositories</Card.Header>
        <Card.Meta>
          <Input
            loading
            icon="user"
            placeholder="Search..."
            onChange={props.changeHandler}
          />
        </Card.Meta>
        <Card.Description textAlign="left" className={'hover-card'} >
          {props.count.map((rep, i) => (
            <p
              style={{ cursor: "pointer"}}
              key={Math.random(10)}
              onClick={props.clickHandler}
              className={props.name}
            >
             {rep.name}
            </p>
          ))}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <a>
          Pero:
          <Icon name="sort numeric up" color="red" />
          {props.count.length}
        </a>
      </Card.Content>
    </Card>
  )
}
