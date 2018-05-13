import React from "react";
import { connect } from "react-redux";
const ComponentOne = ({ reducer1, reducer2 }) => (
  <div>
    This is ComponentOne2222222{" "}
    {reducer1.map((el, i) => <div key={i}>{el}</div>)}
  </div>
);

export default connect(state => state)(ComponentOne);
