import React from "react";
import { Header, Image } from "semantic-ui-react";

const HeaderImage = () => (

  <div>
    <Header as="h2">
      <Image
        circular
        size="small"
        src="https://cdn-icons-png.flaticon.com/512/1484/1484963.png"
      />{" "}
      Popular users:
    </Header>
  </div>
);

export default HeaderImage;
