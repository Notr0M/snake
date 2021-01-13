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

function fetchUsers() {
  const data = axios.get("api/users");
  return data;
}

export default React.memo(({ user }) => {
  const [load, setLoad] = useState(true);
  const [users, setUsers] = useState([]);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (user.id > 0) {
      setUsers((prev) => {
        const state = [...prev];
        state.push(user);
        return _.orderBy(state, ["score"], ["desc"]);
      });
      return;
    }
    fetchUsers()
      .then((res) => {
        setUsers(res.data);
        setLoad(false);
        setTimeout(() => {
          setShow(true);
        }, 0);
      })
      .catch((err) => console.log("Err fetching users"));
  }, [user]);
  console.log("user");
  return (
    <Grid style={{ marginTop: 20 }}>
      {load ? (
        <Segment padded="very" style={{ width: "100%" }}>
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
            <Segment padded style={{ width: "100%" }}>
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
});
