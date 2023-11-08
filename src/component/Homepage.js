import React from "react";
import { Button } from "react-bootstrap";
import ReactDOM from "react-dom";
import { withRouter } from "react-router-dom";

class Homepage extends React.Component {

  handleClickOnUseTool = () => {
    this.props.history.push("/Defination");
  }

  handleClickDocumentation = () => {
    this.props.history.push("/Introduction");
  }

  render() {
    return (
      <div className="container justify-content-start w-25">
        <div className="row">

          <h1 style={{ color: '#716F6F' }} className="fw-bolder">ISPTT</h1>
        </div>
        <div className="row">
          <h3 style={{ color: '#716F6F' }} className="fw-bolder">ISPTT
            INPUT-SPACE PARTITIONING TOOL</h3>
        </div>
        <div className="row ">
          <div className="col-5">
            <Button variant="secondary" onClick={this.handleClickOnUseTool}> Use tool</Button>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-5">

            <Button variant="secondary" onClick={this.handleClickDocumentation}> Documentation</Button>
          </div>
        </div>
        {/* <Button variant="secondary" > Feedback</Button> */}
      </div>
    );
  }
}

export default withRouter(Homepage);