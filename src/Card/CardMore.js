import React from "react";
import { Card, Icon } from "semantic-ui-react";
export default function CardMore(props) {
  return (
    <Card >
      <Card.Content textAlign="center">
        <Card.Header >More about the repository</Card.Header>
        <Card.Description textAlign="left">
          <div className="more-information">
            {props.openRepos.map((item) => (
              <div key={item.name}>
                <p>
                  <Icon name="copy" />
                  Name: {item.name}
                </p>
                <p>
                  <Icon name="user" />
                  Owner: {item.owner.login}
                </p>
                <p>
                  <Icon name="edit outline" />
                  Description: {item.description}
                </p>
                <p>
                  {" "}
                  <Icon name="low vision" />
                  Visibility: {item.visibility}
                </p>
                <p>
                  {" "}
                  <Icon name="fork" />
                  Forks: {item.forks}
                </p>
                <p>
                  {" "}
                  <Icon name="resize horizontal" />
                  Size: {item.forks}
                </p>
                <p>
                  {" "}
                  <Icon name="minus square" />
                  Open Issues: {item.open_issues}
                </p>
                <p>
                  {" "}
                  <Icon name="eye" />
                  Watchers: {item.open_watchers}
                </p>
                <p>
                  {" "}
                  <Icon name="code branch" />
                  Default_branch: {item.default_branch}
                </p>
                <p>
                  {" "}
                  <Icon name="code" />
                  Tehnologic:{" "}
                  {item.topics.map((i) => (
                    <li>{i}</li>
                  ))}
                </p>
                <p>
                  <Icon name="github" />
                  <a href={`https://github.com//${item.full_name}`}>
                    Click to: {item.name}
                  </a>
                </p>
                <p>
                  {" "}
                  <Icon name="calendar alternate outline" />
                  Created at: {item.created_at.split("T")[0]}
                </p>
              </div>
            ))}
          </div>
        </Card.Description>
      </Card.Content>
    </Card>
  );
}
