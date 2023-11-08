import React from "react";
import { Button } from "react-bootstrap";
import ReactDOM from "react-dom";
import { withRouter } from "react-router-dom";

class Introduction extends React.Component {

  handleClick = () => {
    this.props.history.push("/Characteristic");
  }

  render() {
    return (
      <div className="container justify-content-start w-50">
        <div className="row">
          <p style={{ color: '#716F6F' }} className="fs-4 fw-bold">Table of Contents</p>
        </div>
        <ol type="1" style={{ color: '#716F6F' }} className="fs-6 fw-bold">
          <li>Introduction</li>
          <li>Getting Started</li>
          <li>Adding Characteristics and Blocks</li>
          <li>Selecting a Test Criterion</li>
          <li>Generating Test Cases</li>
          <li>Viewing Generated Test Cases</li>
          <li>FAQs</li>
          <li>Troubleshooting</li>
          <li>Contact Support</li>
        </ol>
        <div className="row">
          <p style={{ color: '#716F6F' }} className="fs-4 fw-bold">1. Introduction</p>
        </div>
        <div className="row">
          <p style={{ color: '#716F6F' }} className="fs-6 fw-bold">Welcome to the documentation for the Input Space Partitioning (ISP) Test Generation Tool. This tool is designed to assist software testers in creating test cases based on the widely used test criterion known as Input Space Partitioning (ISP). With an intuitive user interface, users can easily define characteristics and blocks, select a test criterion, and generate test cases for their software testing needs.</p>
        </div>
        <div className="row">
          <p style={{ color: '#716F6F' }} className="fs-4 fw-bold">2. Getting Started</p>
        </div>
        <div className="row">
          <p style={{ color: '#716F6F' }} className="fs-6 fw-bold">To begin using the ISP Test Generation Tool, navigate to the tool's URL and wait for the main interface to load. The main interface comprises three primary sections: <br />
            Characteristics and Blocks Input Section <br />
            Test Criterion Selection Section <br />
            Generate Button</p>
        </div>
        <div className="row">
          <p style={{ color: '#716F6F' }} className="fs-4 fw-bold">3. Adding Characteristics and Blocks</p>
        </div>
        <div className="row">
          <p style={{ color: '#716F6F' }} className="fs-6 fw-bold">In this section, users can define the characteristics and blocks for their test input space.
            Steps: <br />
            Click on the "Add Characteristic" button to create a new characteristic input field. <br />
            Enter the name of the characteristic in the provided text field. <br />
            For each characteristic, click on the "Add Block" button to create block input fields. <br />
            Enter the names of the blocks in the provided text fields.<br />
            Repeat steps 1-4 to add as many characteristics and blocks as required.</p>
        </div>
        <div className="row">
          <p style={{ color: '#716F6F' }} className="fs-4 fw-bold">4. Selecting a Test Criterion</p>
        </div>
        <div className="row">
          <p style={{ color: '#716F6F' }} className="fs-6 fw-bold">Three test criteria are available for selection: <br />
            All combinations (ACoC) <br />
            Each choice (ECC) <br />
            Base choice (BCC) <br /> <br />

            Steps: <br /> <br />

            Select one of the radio buttons corresponding to the desired test criterion.
          </p>
        </div>
        <div className="row">
          <p style={{ color: '#716F6F' }} className="fs-4 fw-bold">5. Generating Test Cases</p>
        </div>
        <div className="row">
          <p style={{ color: '#716F6F' }} className="fs-6 fw-bold">Once the characteristics, blocks, and test criterion have been defined, users can generate test cases. <br /><br />

            Steps: <br />
            Click on the "Generate Test Cases" button.</p>
        </div>
        <div className="row">
          <p style={{ color: '#716F6F' }} className="fs-4 fw-bold">6. Viewing Generated Test Cases</p>
        </div>
        <div className="row">
          <p style={{ color: '#716F6F' }} className="fs-6 fw-bold">After clicking the "Generate" button, the generated test cases will be displayed in the main area.</p>
        </div>
        <div className="row">
          <p style={{ color: '#716F6F' }} className="fs-4 fw-bold">7. FAQs</p>
        </div>
        <div className="row">
          <p style={{ color: '#716F6F' }} className="fs-6 fw-bold">This section provides answers to frequently asked questions regarding the ISP Test Generation Tool.</p>
        </div>


      </div>
    );
  }
}

export default withRouter(Introduction);