import React from "react";
import { Button } from "react-bootstrap";
import ReactDOM from "react-dom";
import { withRouter } from "react-router-dom";

class Defination extends React.Component {

  handleClick = () => {
    this.props.history.push("/Characteristic");
  }

  render() {
    return (
      <div className="container justify-content-start w-50">
        <div className="row">

          <p style={{ color: '#716F6F' }} className="fs-1 fw-bolder">Input space Partitioning criteria.</p>
        </div>
        <div className="row">
          <p style={{ color: '#716F6F' }} className="fs-3 fw-bolder">What is ISP?</p>
        </div>
        <div className="row">
          <p style={{ color: '#716F6F' }} className="fs-5 fw-bolder">Input -Space Partitioning (ISP) is a software is a software testing technique that divide the input domain of the program into classes of data from which the test cases can be derived. By testing the representative values from each class, rather that all possible values, Testers can achieve comprehensive coverage with a manageable number of test cases.</p>
        </div>
        <div className="row ">
          <div className="col-5">
            <Button variant="secondary" onClick={this.handleClick}>Generate Test Case</Button>
          </div>
        </div>
        {/* <Button variant="secondary" > Feedback</Button> */}
      </div>
    );
  }
}

export default withRouter(Defination);