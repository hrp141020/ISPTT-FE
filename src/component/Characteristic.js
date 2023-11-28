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
      isBaseInputError: false,
      showCriteriaError: false,
      showBlockError: false,
      showBaseInputEror: false,
      labelToEdit: [],
      baseCaseInput: ''
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


  componentDidMount() {
    const prevState = localStorage.getItem('prevState');
    if (prevState) {
      const json = JSON.parse(prevState);
      this.setState({
        baseCaseInput: json.baseCaseInput, selectCriteria: json.selectCriteria, characteristic: json.characteristic,
        isCriteriaSelected: json.isCriteriaSelected, isBaseInputError: json.isBaseInputError, showCriteriaError: json.showCriteriaError,
        showBlockError: json.showBlockError, showBaseInputEror: json.showBaseInputEror,
        labelToEdit: json.labelToEdit, baseCaseInput: json.baseCaseInput
      });
      localStorage.clear();
    }
  }

  setSelectedOption = (e) => {
    console.log(e);
    this.setState({ showCriteriaError: false });
    if (!e) {
      this.setState({ isCriteriaSelected: false });
    }
    else {
      this.setState({ isCriteriaSelected: true });
    }
    this.setState({ selectCriteria: e });
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
    let modifiedBlocks = null;
    if (!this.state.isCriteriaSelected) {
      this.setState({ showCriteriaError: true });
      isError = true;
    }
    if (this.state.isCharacteristicValid.length > 0
      && this.state.isCharacteristicValid.some(e => e == false)) {
      this.setState({ showBlockError: true });
      isError = true;
    }
    if (this.state.selectCriteria?.value === 'bc') {
      const json = JSON.parse(JSON.stringify(this.state.characteristic));
      const arr = [];
      const chars = this.state.baseCaseInput.split(",");
      console.log(">>> chars", chars);
      console.log(">>> json: ", json);
      chars.forEach(char => {
        var index = -1;
        for (var i = 0; i < json.length; i++) {
          var characteristics = json[i];
          console.log("charateristics: ", characteristics, char);
          var flag = characteristics.some(e => e.name === char);

          if (flag === true) {
            index = i;
            let blockIndex = characteristics.findIndex(e => e.name === char);

            if (blockIndex !== -1) { // If element is found in the array
              // Remove the element from its current position
              characteristics.splice(blockIndex, 1); // This removes 1 element starting from the index

              // Add the element at the beginning of the array
              characteristics.unshift({ name: char });
              arr.push(characteristics);
              console.log(">>> index", index);
              json.splice(index, 1);
            }
          }
        }
      });
      if (json.length !== 0) {
        this.setState({ showBaseInputEror: true, isBaseInputError: true });
        isError = true;
      }
      else {
        modifiedBlocks = arr;
      }
    }

    if (!isError) {
      (async () => {
        let path = '';
        if (this.state.selectCriteria?.value == 'acoc') {
          path = this.ALL_COMBINATIONS;
        }
        else if (this.state.selectCriteria?.value == 'ec') {
          path = this.EACH_CHOICE;
        }
        else {
          path = this.BASE_CHOICE;
        }
        console.log("state: ", this.state);
        const body = this.state.selectCriteria?.value !== 'bc' ? this.state.characteristic.map(chars => chars.map(c => c.name)) :
          modifiedBlocks.map(chars => chars.map(c => c.name));
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
        localStorage.setItem("prevState", JSON.stringify(this.state));
        this.props.history.push("/GenerateTestcase", content);
      })();
    }
  }

  changeLabelEvent = (label, index) => {
    this.state.labelToEdit[index] = label;
    const labelToEdit = [...this.state.labelToEdit];
    this.setState({ labelToEdit });
  };

  handleInputChange = (event) => {
    console.log("event: ", event)
    this.setState({ baseCaseInput: event.target.value, isBaseInputError: false, showBaseInputEror: false });
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
                value={this.state.selectCriteria}
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
              this.state.selectCriteria?.value === 'bc' && (
                <div className="d-flex justify-content-between m-3 flex-column">

                  <div className="row">
                    <div className="col-12">
                      <div class="form-group">
                        <label for="exampleInputEmail1">Enter base blocks</label>
                        <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="e.g. a1,b1,c1"
                          onChange={this.handleInputChange} />
                        {
                          this.state.showBaseInputEror &&
                          <ErrorLabel message={"Invalid input!"} />
                        }

                      </div>
                    </div>
                  </div>
                </div>
              )
            }
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