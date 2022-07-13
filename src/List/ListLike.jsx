import React, { useState, useEffect } from "react";
import { List, Image, Button, Icon, Label, Loader } from "semantic-ui-react";

export default function ListLike() {
  const [like, setLike] = useState([]);
  const [isLoader, setIsLoader] = useState(false);

  useEffect(() => {
    getLocalStorage();
  }, []);
  function getLocalStorage() {
    let arr = [];
    for (let key in localStorage) {
      if (!localStorage.hasOwnProperty(key)) {
        continue; // пропустит такие ключи, как "setItem", "getItem" и так далее
      }
      arr.push({ name: key, src: localStorage.getItem(key) });
    }
    setLike(arr);
    setIsLoader(false)
    
  }

  const giveMeLikes = () => {
    getLocalStorage();
 
  };


  return (
    <div onClick={giveMeLikes} className= 'absolute'>
      <Button as="div" labelPosition="right">
        <Button color="red" onClick={()=> {
          setIsLoader(true)
        }}>
          <Icon name="heart" />
          Show favorite
        </Button>
        <Label as="a" basic color="red" pointing="left">
          {like.length}
        </Label>
        
      </Button>

      {/* {like.length} */}
      <List animated verticalAlign="middle" >
      {isLoader && <Loader active inline />}
        {like.map((item) => (
            <List.Item>
              <Image avatar src={item.src} />{" "}
              <List.Content>
              <List.Header >{item.name}</List.Header>
              <List.Description>
              <Label
          as="a"
          pointing="left"
          onClick={() => {
            for (let key in localStorage) {
              if (!localStorage.hasOwnProperty(key)) {
                continue; // пропустит такие ключи, как "setItem", "getItem" и так далее
              }
              if(key === item.name) {
                localStorage.removeItem(item.name);

              }
            }
          
          }}
        >
          <Icon name="close" color='red' /> (close)
        </Label>
        </List.Description>
              </List.Content>
              
            </List.Item>
      
        ))}
     </List>
    </div>
  );
}
