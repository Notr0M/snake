import React, { useState } from "react";
import axios from "axios";
import {
  Label,
  Input,
  Icon,
  Message,
  Form,
  Header,
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

export default React.memo(({ score, setUser, isRunning, localName }) => {
  const [name, setName] = useState(localName);
  const [loading, setLoading] = useState(false);
  const [lock, setLock] = useState(false);
  const [err, setErr] = useState({
    error: false,
    msg: "",
  });
  React.useEffect(() => {
    setName(localName);
  }, [localName]);
  const submitUser = () => {
    if (checkName(name)) {
      setErr({
        error: true,
        msg: "Nickname could not be empty either include space",
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
      <style>
        {`
          #score-submit-input {
            color: #808080;
            opacity: ${name ? 0.5 : 1};
          }
        `}
      </style>
      <Header as="h4">You can submit your score here if you wish. </Header>

      <Form onSubmit={submitUser}>
        <div style={{ display: "flex" }}>
          <Form.Input
            readOnly={isRunning || lock || name}
            error={err.error}
            value={name}
            onChange={(e) => changeName(e)}
            placeholder="Nickname"
            id="score-submit-input"
          />
          <Form.Button
            loading={loading}
            disabled={isRunning || loading || lock}
            color="blue"
          >
            Submit
          </Form.Button>
        </div>
        {err && (
          <span
            style={{
              position: "fixed",
              left: "40%",
              top: "25%",
              color: "#DC143C",
              textAlign: "right",
              zIndex: 10,
            }}
          >
            {err.msg}
          </span>
        )}
      </Form>
    </div>
  );
});
