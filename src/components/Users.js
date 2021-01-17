import React, { useState, useEffect } from "react";
import _ from "lodash";
import axios from "axios";
import {
  Grid,
  Segment,
  Transition,
  Image,
  Placeholder,
  List,
  Loader,
} from "semantic-ui-react";

function getUsers() {
  return [
    {
      id: 256,
      name: "Helen",
      score: 743,
      src: "/images/helen.jpg",
    },
    {
      id: 146,
      name: "Chris",
      score: 1243,
      src: "/images/christian.jpg",
    },
    {
      id: 1256,
      name: "Daniel",
      score: 1256,
      src: "/images/daniel.jpg",
    },
    {
      id: 990,
      name: "Joe",
      score: 990,
      src: "/images/joe.jpg",
    },
    {
      id: 1314,
      name: "Carl",
      score: 801,
      src: "images/jenny.jpg",
    },
    {
      id: 125265,
      name: "Justen",
      score: 899,
      src: "images/justen.jpg",
    },
    {
      id: 125265,
      name: "Elliot",
      score: 899,
      src: "images/elliot.jpg",
    },
    {
      id: 568,
      name: "Steve",
      score: 899,
      src: "images/steve.jpg",
    },
    {
      id: 166,
      name: "Stevie",
      score: 899,
      src: "images/stevie.jpg",
    },
    {
      id: 1656,
      name: "Matt",
      score: 411,
      src: "images/matt.jpg",
    },
    {
      id: 1662,
      name: "Laura",
      score: 333,
      src: "images/laura.jpg",
    },
  ];
}

function fetchUsers() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(getUsers());
    }, 2000);
  });
}

export default () => {
  const [load, setLoad] = useState(true);
  const [users, setUsers] = useState([]);
  const [show, setShow] = useState(false);

  useEffect(() => {
    // if (user.id > 0) {
    //   setUsers((prev) => {
    //     const state = [...prev];
    //     state.push(user);
    //     return _.orderBy(state, ["score"], ["desc"]);
    //   });
    //   return;
    // }
    fetchUsers()
      .then((res) => {
        setUsers(res);
        setLoad(false);
        setTimeout(() => {
          setShow(true);
        }, 0);
      })
      .catch((err) => console.log("Err fetching users"));
  }, []);
  console.log("user");
  return (
    <Grid>
      <style>
        {`
          .users-container {
            width: 100%;
            height: 28rem;
            overflow-y: auto;
            scrollbar-width: thin;
            scrollbar-color: #4B0082 #F0FFFF; 
          }
        `}
      </style>
      {load ? (
        <Segment padded="very" style={{ width: "100%", height: "20rem" }}>
          <Placeholder fluid>
            <Placeholder.Header image>
              <Placeholder.Line />
              <Placeholder.Line />
            </Placeholder.Header>
            <Placeholder.Paragraph>
              <Placeholder.Line />
              <Placeholder.Line />
              <Placeholder.Line />
            </Placeholder.Paragraph>
          </Placeholder>
        </Segment>
      ) : (
        <Grid.Row>
          {" "}
          <Transition animation="jiggle" visible={show} duration={500}>
            <Segment padded className="users-container">
              <List selection verticalAlign="middle">
                {users.map((user, i) => (
                  <List.Item key={user.id}>
                    <Image avatar src={user.src} />
                    <List.Content>
                      <List.Header>{user.name}: </List.Header>
                    </List.Content>
                    <List.Content style={{ marginTop: 6 }} floated="right">
                      {user.score}
                    </List.Content>
                  </List.Item>
                ))}
              </List>
            </Segment>
          </Transition>
        </Grid.Row>
      )}
    </Grid>
  );
};
