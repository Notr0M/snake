import React, { useState, useEffect } from "react";
import {
  Grid,
  Segment,
  Icon,
  Dropdown,
  Modal,
  Form,
  Input,
  Button,
  Menu,
  Loader,
  Label,
  Divider,
} from "semantic-ui-react";

import Submit from "./Submit";

function getSpeeds() {
  return [
    {
      text: "Fast",
      value: 100,
      key: 100,
    },
    {
      text: "Very Fast",
      value: 50,
      key: 50,
    },
    {
      text: "Insane",
      value: 20,
      key: 20,
    },
    {
      text: "Legend",
      value: 1,
      key: 1,
      disabled: true,
    },
  ];
}

const Score = ({ score, status, setSpeed }) => {
  const [open, setOpen] = useState(false);
  const [err, setErr] = useState("");
  const toggle = status === "running" || status === "paused" ? true : false;
  let name = localStorage.getItem("jouje-name");

  const setNameToLocal = (name) => {
    localStorage
      ? localStorage.setItem("jouje-name", name)
      : setErr("localStorage is disabled");
  };

  React.useEffect(() => {
    name = localStorage.getItem("jouje-name");
  }, [open]);
  console.log("score name ", name);
  return (
    <>
      <SetUsernameModal
        open={open}
        setOpen={setOpen}
        setNameToLocal={setNameToLocal}
        localName={name}
      />
      <Menu vertical>
        <Menu.Item>
          <span id="score-span">Score:</span>
          {!score ? (
            <Label
              floating={true}
              style={{ top: 12, left: "80%" }}
              as="a"
              circular
            >
              0
            </Label>
          ) : (
            <Label floating={true} style={{ top: 12, left: "80%" }} as="a">
              {score}
            </Label>
          )}
        </Menu.Item>
        <Menu.Item>
          <span id="score-span">Name:</span>
          {name ? (
            <>
              <Icon
                link
                color="yellow"
                name="edit"
                onClick={() => setOpen(true)}
              />
              <Label>{name}</Label>
            </>
          ) : (
            <>
              <Icon
                link
                color="green"
                name="plus"
                onClick={() => setOpen(true)}
              />
              <Label>unspecified</Label>
            </>
          )}
        </Menu.Item>
        <Menu.Item>
          <span id="score-span">Speed: </span>
          <Label as="div">
            <Dropdown
              disabled={toggle}
              placeholder="Choose Speed"
              options={getSpeeds()}
              onChange={(e, { value }) => setSpeed(value)}
            />
          </Label>
        </Menu.Item>
      </Menu>
      <Divider />
      <Submit score={score} localName={name} />
    </>
  );
};
export default Score;

function SetUsernameModal({ open, setOpen, localName, setNameToLocal }) {
  const [name, setName] = useState("");
  const [err, setErr] = useState({
    error: false,
    msg: "",
  });

  return (
    <Modal size="mini" open={open}>
      <Modal.Header>Insert Your Nickname</Modal.Header>
      <Modal.Content>
        <p>
          Your Nickname won't save anywhere but your browser's local storage.
        </p>
        <Segment basic>
          current name:{" "}
          {localName ? <Label>{localName}</Label> : <Label>unspecified</Label>}
        </Segment>
        <SeUsername err={err} setErr={setErr} setName={setName} />
      </Modal.Content>
      <Modal.Actions>
        <Button negative onClick={() => setOpen(false)}>
          Cancel
        </Button>
        <Button
          positive
          disabled={err.error}
          onClick={() => {
            setNameToLocal(name);
            setOpen(false);
          }}
        >
          Submit
        </Button>
      </Modal.Actions>
    </Modal>
  );
}

function SeUsername({ err, setErr, setName }) {
  function checkName(nickname) {
    return nickname.includes(" ") || nickname === "" ? true : false;
  }

  const changeName = (e) => {
    const nickname = e.target.value;
    if (checkName(nickname)) {
      setErr({
        error: true,
        msg: "Nickname could not be empty either include space",
      });
      return;
    }
    setErr({
      error: false,
      msg: "",
    });

    setName(nickname);
  };

  return (
    <div>
      <div>
        <Input placeholder="Nickname" onChange={(e) => changeName(e)} />
      </div>

      <span
        style={{
          position: "relative",

          color: "#DC143C",
        }}
      >
        {err.msg}
      </span>
    </div>
  );
}
