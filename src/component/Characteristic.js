import React from "react";
import { Button } from "react-bootstrap";
import ReactDOM from "react-dom";
import Select from "react-select";
import ErrorLabel from "./ErrorLabel";
import ReactTags from "react-tag-autocomplete";
import { withRouter } from "react-router-dom";
import EditableLabel from "./EditableLabel";


class Characteristic extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectCriteria: null,
      characteristic: [],
      isCharacteristicValid: [],
      isCriteriaSelected: null,
      showCriteriaError: false,
      showBlockError: false,
      labelToEdit: []
    };
  }
  criteriaOptions = [
    { value: 'acoc', label: 'All combinations' },
    { value: 'ec', label: 'Each choice' },
    { value: 'bc', label: 'Base choice' },
  ];

  ALL_COMBINATIONS = 'allCombinationTestCases';
  BASE_CHOICE = 'baseChoiceCriteria';
  EACH_CHOICE = 'eachChoiceCriteria';

  setSelectedOption = (e) => {
    console.log(e);
    this.setState({ showCriteriaError: false });
    if (!e) {
      this.setState({ isCriteriaSelected: false });
    }
    else {
      this.setState({ selectCriteria: e, isCriteriaSelected: true });
    }
  }

  handleDelete(i, index) {
    this.setState({ showBlockError: false });
    const tags = this.state.characteristic[index].slice(0);
    tags.splice(i, 1);
    this.state.characteristic[index] = tags;
    if (tags.length == 0) {
      const isCharacteristicValid = [...this.state.isCharacteristicValid];
      isCharacteristicValid[index] = false;
      this.setState({ isCharacteristicValid });
    }
    this.setState({ characteristic: this.state.characteristic });
  }

  handleAddition(tag, index) {
    this.setState({ showBlockError: false });
    const tags = [].concat(this.state.characteristic[index], tag);
    this.state.characteristic[index] = tags;
    this.setState({ characteristic: this.state.characteristic });
    const isCharacteristicValid = [...this.state.isCharacteristicValid];
    isCharacteristicValid[index] = true;
    this.setState({ isCharacteristicValid });
  }

  handleClickOnAddCharacteristic = () => {
    this.setState({ showBlockError: false });
    this.setState({
      characteristic: [...this.state.characteristic, []], isCharacteristicValid: [...this.state.isCharacteristicValid, false],
      labelToEdit: [...this.state.labelToEdit, '']
    });
  }

  handleClickOnRemove = (index) => {
    this.setState({ showBlockError: false });
    const characteristic = this.state.characteristic.slice(0);
    characteristic.splice(index, 1);
    const isCharacteristicValid = this.state.isCharacteristicValid.slice(0);
    isCharacteristicValid.splice(index, 1);
    const labelToEdit = this.state.labelToEdit.slice(0);
    this.setState({ characteristic, isCharacteristicValid, labelToEdit });
  }

  handleClickOnGenerateTestCases = () => {
    let isError = false;
    if (!this.state.isCriteriaSelected) {
      this.setState({ showCriteriaError: true });
      isError = true;
    }
    if (this.state.isCharacteristicValid.length > 0
      && this.state.isCharacteristicValid.some(e => e == false)) {
      this.setState({ showBlockError: true });
      isError = true;
    }
    if (!isError) {
      (async () => {
        let path = '';
        if (this.state.selectCriteria.value == 'acoc') {
          path = this.ALL_COMBINATIONS;
        }
        else if (this.state.selectCriteria.value == 'ec') {
          path = this.EACH_CHOICE;
        }
        else {
          path = this.BASE_CHOICE;
        }

        const body = this.state.characteristic.map(chars => chars.map(c => c.name));
        console.log("body", body);
        const rawResponse = await fetch(`http://ec2-13-58-203-89.us-east-2.compute.amazonaws.com:5000/${path}`, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(body)
        });
        const content = await rawResponse.json();

        console.log(content);
        this.props.history.push("/GenerateTestcase", content);
      })();
    }
  }

  changeLabelEvent = (label, index) => {
    this.state.labelToEdit[index] = label;
    const labelToEdit = [...this.state.labelToEdit];
    this.setState({ labelToEdit });
  };

  render() {
    console.log("size: ", this.state);
    return (
      <div className="App h-100">
        <div className='container pt-5 h-100'>
          <div className="row justify-content-center">
            <div className='col text-center'>
              <p className='main-label'>Enter Characteristics and Blocks</p>
            </div>
          </div>
          <div className='row justify-content-center'>

            <div className='col-6 col-md-3 mr-2'>
              <Select
                placeholder="Select Criteria"
                className="basic-single"
                classNamePrefix="select"
                // defaultValue={"Select Criteria"}
                isClearable
                isSearchable={false}
                name="criteria"
                options={this.criteriaOptions}
                onChange={this.setSelectedOption}
              />
              {
                this.state.showCriteriaError &&
                <ErrorLabel />
              }

            </div>
            <div className='col-6 col-md-3'>
              <Button variant="secondary" onClick={this.handleClickOnGenerateTestCases}>Generate Testcases </Button>
            </div>
          </div>
          <div className='border mt-4 rounded bg-white overflow-auto h-75'>
            {
              this.state.characteristic.map((c, index) =>
                <div className="d-flex justify-content-between m-3 flex-column">
                  <div className="row">
                    <div className="col-12">
                      <EditableLabel
                        placeholder="Enter name for characteristics"
                        labelValue={this.state.labelToEdit[index]}
                        editChangeEvent={(e) => this.changeLabelEvent(e, index)}
                        customEditIconStyle={{ color: "orange" }}
                        customCancelIconStyle={{ color: "red" }}
                        customApproveIconStyle={{ color: "green" }}
                        placeholderStyle={{ color: "gray" }}
                      />
                    </div>
                  </div>
                  <div className="row justify-content-between">
                    <div className="col-8">
                      <ReactTags
                        tags={this.state.characteristic[index]}
                        suggestions={[]}
                        handleDelete={(e) => this.handleDelete(e, index)}
                        handleAddition={(e) => this.handleAddition(e, index)}
                        allowNew={this.state.characteristic[index].length <= 30}
                        placeholder="Write block and hit enter"
                        minQueryLength={1}
                      />
                      {
                        this.state.showBlockError && !this.state.isCharacteristicValid[index] &&
                        <ErrorLabel />
                      }

                    </div>
                    <div className="col-2">
                      <Button variant="danger" className='' onClick={(e) => this.handleClickOnRemove(index)}>
                        Remove
                      </Button>
                    </div>
                  </div>

                </div>)
            }
            <Button variant="secondary" className='m-3'
              disabled={this.state.characteristic.length == 30}
              onClick={this.handleClickOnAddCharacteristic}>
              Add Characteristic
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Characteristic);