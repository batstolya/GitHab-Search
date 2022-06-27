import React from "react";
import { Card, Icon, Image } from "semantic-ui-react";

export default function CardPreview(props) {
  return (
    <div className="card">
      <Card onClick={props.clickHandler}>
        <Image src={props.src} wrapped ui={false} />
        <Card.Content>
          <Card.Header>{props.name}</Card.Header>
          <Card.Header>{props.userName}</Card.Header>
        </Card.Content>
        <Card.Content extra>
          <a>
            <Icon name="user" />
            {props.followers} Followers
          </a>
        </Card.Content>
        <Card.Content extra>
          <a>
            <Icon name="user" />
            {props.repos} Repos
          </a>
        </Card.Content>
        <Card.Content extra>
          <a>
            <Icon name="user" />
            {props.following} Following
          </a>
        </Card.Content>
      </Card>
    </div>
  );
}
