import React, { useState, useEffect } from "react";
import { DUMMY_ARR_FAVORITE } from "../arrOfPopularUsers";
import { List, Image, Item } from "semantic-ui-react";
import ListItem from "./ListItem";


const ListUsers = (props) => {
  const [sortArr, setSortArr] = useState(DUMMY_ARR_FAVORITE);

  function compare(a, b) {
    const bandA = +a.followers;
    const bandB = +b.followers;

    let comparison = 0;
    if (bandA < bandB) {
      comparison = 1;
    } else if (bandA > bandB) {
      comparison = -1;
    }
    return comparison;
  }

  let sort = DUMMY_ARR_FAVORITE.sort(compare);


  // filter
  function filter(list, text) {
    text = text.toUpperCase();

    if (text === "") {
      return sort;
    }
    if (list.length < 1) {
      return list.filter((el) => el.login.toUpperCase().includes(text));
    }

    return list.filter((el) => el.login.toUpperCase().includes(text));
  }

  useEffect(() => {
    sort = filter(sort, props.userInput);

    setSortArr(sort);
    console.log('render1')
  }, [props.userInput]);
  // filter
  useEffect(() => {
    setSortArr(props.arr);
    console.log('render2')

  }, [props.arr]);
  useEffect(() => {
    setSortArr(DUMMY_ARR_FAVORITE);
    console.log('render3')
  }, []);


  const mapOfArr = sortArr.map((item) => (
    <ListItem
      id={item.id}
      login={item.login}
      src={item.avatar_url}
      name={item.name}
      email ={item.email}
      updated = {item.updated_at}
      fullName={item.full_name}
      followers={item.followers}
      following={item.following}
      location = {item.location}
      repos={item.public_repos}
      created={item.created_at}
    />
  ));
  return (
    <div>
      <List selection  size="big" >
        {mapOfArr}
      </List>
    </div>
  );
};

export default ListUsers;
