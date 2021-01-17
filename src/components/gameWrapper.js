import React, { useState } from "react";
import {
  Grid,
  Label,
  Popup,
  Message,
  Table,
  Button,
  Icon,
  Divider,
  Segment,
} from "semantic-ui-react";

import { withName } from "./withName";
import Board from "./board.js";
import Score from "./score.js";
import Users from "./Users";

function gameWrapper() {
  const [score, setScore] = useState(0);
  const [status, setStatus] = useState("idle");
  const [speed, setSpeed] = useState(200);

  React.useEffect(() => {}, []);

  return (
    <>
      <Grid.Column width={4}>
        <Score score={score} status={status} setSpeed={setSpeed} />
      </Grid.Column>
      <Grid.Column textAlign="center" width={2}>
        <ActionButton status={status} setStatus={setStatus} />
        <Divider />
        <StatusElement status={status} />
      </Grid.Column>
      <Grid.Column width={4}>
        <Message floating>
          Default speed is{" "}
          <Label color="red" horizontal basic>
            Fast
          </Label>
        </Message>
      </Grid.Column>
      <Grid.Column width={4}>
        <Segment basic>
          <Popup
            content="Disabled temporarily"
            inverted
            style={{ opacity: 0.7 }}
            position="right center"
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
        </Segment>
      </Grid.Column>
      <Grid.Column width={16}>
        <Grid>
          <Grid.Row>
            <Grid.Column width={4}>
              <StaticTable />
            </Grid.Column>
            <Grid.Column
              width={9}
              only="large screen"
              style={{
                top: -140,
              }}
            >
              <Board
                status={status}
                speed={speed}
                setStatus={setStatus}
                setScore={setScore}
              />
            </Grid.Column>
            <Grid.Column
              style={{
                top: "-12rem",
              }}
              width={3}
            >
              <Users />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Grid.Column>
    </>
  );
}

function ActionButton({ status, setStatus }) {
  const action = (type) => {
    setStatus(type);
  };

  switch (status) {
    case "running":
      return (
        <WrapperButton cb={action} type="paused">
          <Icon fitted name="pause" />
        </WrapperButton>
      );
    case "paused":
      return (
        <WrapperButton cb={action} type="running">
          <Icon fitted name="play" />
        </WrapperButton>
      );
    case "failed":
      return (
        <WrapperButton cb={action} type="init">
          <Icon fitted name="redo" />
        </WrapperButton>
      );
    case "idle":
      return (
        <WrapperButton cb={action} type="running">
          <Icon fitted name="play" />
        </WrapperButton>
      );
    default:
      return (
        <WrapperButton cb={action} type="running">
          <Icon fitted name="play" />
        </WrapperButton>
      );
  }
}

function WrapperButton({ cb, type, children }) {
  return <Button onClick={() => cb(type)}>{children}</Button>;
}

function StaticTable() {
  return (
    <>
      <Table singleLine>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Difficulty</Table.HeaderCell>
            <Table.HeaderCell>Score Range</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          <Table.Row>
            <Table.Cell>Fast</Table.Cell>
            <Table.Cell>10 - 14</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Very Fast</Table.Cell>
            <Table.Cell>15 - 20 </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Insane</Table.Cell>
            <Table.Cell>21 - 26</Table.Cell>
          </Table.Row>
          <Table.Row warning>
            <Table.Cell>
              Legend
              <Popup
                position="bottom center"
                content="Requires login"
                trigger={<Icon name="attention" />}
              />
            </Table.Cell>
            <Table.Cell>43 - 50</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </>
  );
}

function StatusElement({ status }) {
  return (
    <span>
      <style>
        {` 
          .pulse {
            display: block;
            cursor: pointer;
            animation: ${status === "paused" ? "none" : "pulse 0.4s infinite"};
          .pulse:hover {
            animation: none;
          }
        `}
      </style>
      <Icon
        className={status === "running" ? "pulse" : ""}
        name="heart"
        size="large"
        color={status === "running" ? "red" : "grey"}
      />
    </span>
  );
}

export default withName(gameWrapper);
