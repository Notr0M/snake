import React, { useState } from "react";
import {
  Grid,
  Container,
  Segment,
  Button,
  Popup,
  GridColumn,
  Label,
  Divider,
  Dropdown,
  Header,
  Checkbox,
} from "semantic-ui-react";

export default ({ children }) => {
  const [dark, setDark] = useState(false);

  return (
    <Container id="main-page">
      <style>
        {`
            body {
              background-color: ${dark ? "#2F4F4F" : "#F0F8FF"};
              transition: ease-in 0.2s;  
            }
            .ui.header, p {
              color: ${dark ? "#F0F8FF" : "#696969"}
            }
            #main-checkbox {
              background-color: red;
            }
            .ui.fitted.toggle.checkbox {
              background-color: #778899;
              border-radius: 10px
            }
            .ui.vertical.menu {
              background-color: ${dark ? "#F0F8FF" : "#483D8B"};
            }
            #score-span {
              color: ${dark ? "#696969" : "#F0FFFF"};
            }
           .divider.default.text {
             color: #F0F8FF !important;
           }
            
          `}
      </style>
      <Grid stackable>
        <Grid.Row columns={2} style={{ marginTop: "1.5rem" }}>
          <Grid.Column width={4}>
            <Header as="h3">Let's have a fun</Header>
          </Grid.Column>
          <Grid.Column floated="right" width={1}>
            <Checkbox toggle onChange={() => setDark(!dark)} />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          {children}
          {/* <Grid.Column color="red">{children[1]}</Grid.Column>
          <Grid.Column color="yellow">{children[2]}</Grid.Column> */}
        </Grid.Row>
      </Grid>
    </Container>
  );
};
