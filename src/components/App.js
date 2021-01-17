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
  Header,
} from "semantic-ui-react";

import useSnake from "hooks/useSnake.js";

import Wrapper from "./gameWrapper";

import MyComponent from "./test";
import Layout from "./template";

const App = () => {
  // console.log("Welcome");
  return (
    <Layout>
      <Wrapper />
    </Layout>
  );
};

export default App;
