/*
import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from 'react-router-dom';
import Characteristic from "./Characteristic";
import 'mutation-observer';
import { not } from "micromatch";

global.MutationObserver = class {
    constructor(callback) {}
    disconnect() {}
    observe(element, initObject) {}
};


describe("Characteristic", () => {
    it("renders without errors", () => {
        render( <Router>
            <Characteristic />
        </Router>);
    });

    it("sets selected option correctly", () => {
        const { getByRole } = render(<Router>
            <Characteristic />
        </Router>);
        const selectElement = getByRole('combobox');
        fireEvent.keyDown(selectElement, { keyCode: 40 }); // arrow down
        fireEvent.keyDown(selectElement, { keyCode: 13 }); // enter
    
    });
    
    it("adds and removes tags correctly", () => {
        const { getByText } = render(
            <Router>
                <Characteristic />
            </Router>
        );
    
        // First, add a characteristic
        const addCharacteristicButton = getByText("Add Characteristic");
        fireEvent.click(addCharacteristicButton);
    
        // Now, the "Remove" button should be in the DOM
        const removeButton = getByText("Remove");
    
    });
    

    it("triggers event handlers correctly", async () => {
        const { getByText, findByText } = render(
            <Router>
                <Characteristic />
            </Router>
        );
        const addCharacteristicButton = getByText("Add Characteristic");
        fireEvent.click(addCharacteristicButton);
    
        // Wait for the "Remove" button to appear
        const removeButton = await waitFor(() => getByText("Remove"));
    
        const generateTestCasesButton = getByText("Generate Testcases");
    
       
        fireEvent.click(removeButton);
        
    
        fireEvent.click(generateTestCasesButton);
       
    });
});
*/
