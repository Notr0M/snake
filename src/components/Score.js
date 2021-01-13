import React, { useState, useEffect } from "react";
import { Grid, Segment, Loader, Label } from "semantic-ui-react";

const Score = React.memo(({ length, score, setScore, isRunning }) => {
  const [load, setLoad] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoad(false);
    }, 500);
  }, []);

  React.useEffect(() => {
    if (isRunning)
      setScore((prev) => prev + Math.floor(Math.random() * (16 - 10) + 10));
  }, [length]);

  return (
    <Grid style={{ marginTop: 40 }}>
      {load ? (
        <Loader style={{ marginTop: 40 }} active inline="centered" />
      ) : (
        <div>
          <Grid.Row>
            <Segment>
              Score:{" "}
              {!(length - 1) ? (
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
            </Segment>
          </Grid.Row>
          <Grid.Row>
            <Segment>
              Name:{" "}
              <Label as="a" tag size="tiny">
                undefined
              </Label>
            </Segment>
          </Grid.Row>
          <Grid.Row>
            <Segment>
              hits:{" "}
              <Label
                style={{ top: 12, left: "80%" }}
                floating={true}
                as="a"
                circular
              >
                {length - 1}
              </Label>
            </Segment>
          </Grid.Row>
        </div>
      )}
    </Grid>
  );
});
export default Score;
