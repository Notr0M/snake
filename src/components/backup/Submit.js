import React, { useState } from "react";
import axios from "axios";
import {
  Label,
  Input,
  Icon,
  Message,
  Form,
  Segment,
  Button,
  TransitionablePortal,
} from "semantic-ui-react";

function postUser(user) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(user);
    }, 1500);
  });
}

export default React.memo(({ score, setUser, isRunning }) => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [lock, setLock] = useState(false);
  const [err, setErr] = useState({
    error: false,
    msg: "",
  });

  const submitUser = () => {
    if (checkName(name)) {
      setErr({
        error: true,
        msg: "The Nickname could not be empty or include space.",
      });
      return;
    }
    if (score === 0) {
      setErr({
        error: err.error,
        msg: "Your score is 0 right now",
      });
      return;
    }
    setLoading(true);
    const test = {
      id: score,
      name: name,
      src: "https://react.semantic-ui.com/images/avatar/small/daniel.jpg",
      score: score,
    };
    postUser(test)
      .then((res) => {
        setUser(res);
        setLoading(false);
        setLock(true);
      })
      .catch((err) => console.log("err in submit"));
  };

  function checkName(name) {
    return name.includes(" ") || name === "" ? true : false;
  }

  const changeName = (e) => {
    const nickname = e.target.value;
    if (checkName(nickname)) {
      setErr({
        error: true,
        msg: "The Nickname could not be empty or include space.",
      });
      return;
    }
    setErr({
      error: false,
      msg: "",
    });
    setName(nickname);
  };

  console.log("isRunning ", isRunning);
  return (
    <div>
      <Label circular attached="top" color="green" size="large">
        Your Score:
        <Label.Detail>{score}</Label.Detail>
      </Label>
      <h4>You can submit your score here if you wish. </h4>

      <Form onSubmit={submitUser}>
        <div style={{ display: "flex" }}>
          <Form.Input
            readOnly={isRunning || lock}
            error={err.error}
            onChange={(e) => changeName(e)}
            placeholder="Nickname"
          />
          <Form.Button
            loading={loading}
            disabled={isRunning || loading || lock}
            color="blue"
          >
            Submit
          </Form.Button>
        </div>
        {err && <span style={{ color: "#DC143C" }}>{err.msg}</span>}
      </Form>
      {/* <Input
        icon="user"
        disabled={lock}
        value={name}
        iconPosition="left"
        placeholder="Nickname"
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      <Button
        disabled={lock}
        as="button"
        onClick={submitUser}
        attached="right"
        color="blue"
        type="submit"
      >
        Submit
      </Button> */}
    </div>
  );
});
