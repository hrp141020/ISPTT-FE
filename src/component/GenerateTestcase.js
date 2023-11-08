import React from "react";
import { Button } from "react-bootstrap";
import ReactDOM from "react-dom";
import Select from "react-select";
import ErrorLabel from "./ErrorLabel";
import ReactTags from "react-tag-autocomplete";
import { withRouter } from "react-router-dom";


class GenerateTestcase extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }

  render() {
    console.log(this.props);
    return (
      <div className="App h-100">
        <div className='container pt-5 h-100'>
          <div className="row justify-content-center mb-5">
            <div className='col text-center'>
              <p className='main-label'>Enter Characteristics and Blocks</p>
            </div>
          </div>
          <div className='border mt-4 rounded bg-white h-75 d-flex justify-content-center flex-column'>
            <div className="overflow-auto">
              {
                this.props.location.state.map(list =>
                (<div className="p-2 border rounded d-inline-block m-2">
                  {
                    list.map(c =>
                      <span class="badge bg-primary m-1">{c}</span>
                    )
                  }
                </div>
                ))
              }
            </div>
            <div className='mt-auto mb-2 d-flex justify-content-center'>
              <Button variant="secondary" onClick={this.handleClickOnAddCharacteristic}>
                Export Testcases
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }


}

export default withRouter(GenerateTestcase);