import React, { useState, useCallback } from "react";
import _ from "lodash";
import {
  Grid,
  Segment,
  Button,
  Popup,
  GridColumn,
  Label,
  Divider,
  Dropdown,
} from "semantic-ui-react";

import useSnake from "hooks/useSnake.js";
import Board from "./Board.js";
import Score from "./Score";
import Users from "./Users";
import Submit from "./Submit";

const App = () => {
  const [snakes, position, isRunning, setIsRunning, setReset] = useSnake();
  const [score, setScore] = useState(0);
  const [user, setUser] = useState([]);
  // const randomDigit = useCallback(
  //   (prev) => {
  //     if (snakes.length === 1) return 0;
  //     prev.current += Math.floor(Math.random() * (16 - 10) + 10);
  //     return prev;
  //   },
  //   [snakes.length]
  // );

  return (
    <div>
      <Grid centered columns={3} container>
        <Grid.Row columns={2} only="mobile tablet">
          <Grid.Column>
            <Segment inverted color="red">
              Mobile and Tablet are not supported unfortunately
            </Segment>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column only="large screen" width={3}>
            <Score
              isRunning={isRunning}
              length={snakes.length}
              setScore={setScore}
              score={score}
            />

            <Grid centered style={{ marginTop: "2rem" }}>
              <Popup
                position="right center"
                content="You need to login"
                trigger={<Segment disabled>Timer 00:00:00</Segment>}
              />

              <Segment>
                <Popup
                  position="left center"
                  content="You need to login"
                  trigger={<Label color="purple" icon="lock" corner="left" />}
                />
                <Segment basic disabled>
                  <h4>Limit Speed: </h4>
                  <input
                    onChange={() => {}}
                    type="range"
                    min={0}
                    max={5}
                    value={[1, 2, 3, 4, 5]}
                  />

                  <Dropdown
                    placeholder="Dimensions"
                    fluid
                    selection
                    options={[]}
                  />
                  <Divider />
                  <Dropdown placeholder="colors" fluid selection options={[]} />
                </Segment>
              </Segment>
            </Grid>
          </Grid.Column>
          <Grid.Column only="large screen" width={9} style={{ marginTop: 10 }}>
            <div>
              <Board
                setReset={setReset}
                setIsRunning={setIsRunning}
                isRunning={isRunning}
                snakes={snakes}
                position={position}
              />
            </div>
          </Grid.Column>
          <Grid.Column only="large screen" width={4}>
            <Users user={user} />

            <Divider />
            <Popup
              position="right center"
              content="disabled temporarily"
              trigger={
                <Button.Group>
                  <Button disabled>Login</Button>
                  <Button.Or />
                  <Button disabled positive>
                    Signup
                  </Button>
                </Button.Group>
              }
            />
          </Grid.Column>
        </Grid.Row>

        <Grid.Row
          style={{
            maxWidth: "70%",
            position: "absolute",
            top: "25rem",
            left: 0,
          }}
        >
          <GridColumn floated="right" width={10}>
            <Segment>
              <Submit setUser={setUser} score={score} isRunning={isRunning} />
            </Segment>
          </GridColumn>
        </Grid.Row>
      </Grid>
      {/* <Board snakes={snakes} position={position} />
      <div
        hidden={isFailed}
        style={{
          textAlign: "center",
          fontSize: 20,
          color: "#DC143C",
          marginTop: 4,
        }}
      >
        <p>Opps .. you failed, try again</p>
      </div> */}
    </div>
  );
};

export default App;
