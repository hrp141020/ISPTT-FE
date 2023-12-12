 import { render } from "@testing-library/react";
import React from "react";
import { unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { BrowserRouter } from "react-router-dom";
import GenerateTestcase from "./GenerateTestcase";
import { fireEvent } from '@testing-library/react'; 

let container = null;

beforeEach(() => {
    // Set up a DOM element as a render target
    container = document.createElement("div");
    document.body.appendChild(container);
});

afterEach(() => {
    // Clean up on exiting
    unmountComponentAtNode(container);
    container.remove();
});

it("renders without crashing", () => {
    // Mock the location state with sample data
    const mockLocationState = [
        ["Characteristic1"],["Characteristic2"],
        
    ];

    render(
        <BrowserRouter>
            <GenerateTestcase location={{ state: mockLocationState }} />
        </BrowserRouter>
    );

});


// Test case: "loads data correctly from API"
it("loads data correctly from API", async () => {
    // Mock the API call
    jest.spyOn(global, "fetch").mockImplementation(() =>
        Promise.resolve({
            json: () => Promise.resolve({ data: "mocked data" }),
        })
    );

    // Render the component
    await act(async () => {
        render(
            <BrowserRouter>
                <GenerateTestcase />
            </BrowserRouter>,
            container
        );
    });

    // Check if the data is displayed correctly
    expect(container.textContent).toContain("mocked data");

    // Clean up
    global.fetch.mockRestore();
});

// Test case: "updates state based on user input"
it("updates state based on user input", () => {
    // Render the component
    act(() => {
        render(
            <BrowserRouter>
                <GenerateTestcase />
            </BrowserRouter>,
            container
        );
    });

    // Simulate user input
    const input = container.querySelector("input");
    fireEvent.change(input, { target: { value: 'test input' } });

    // Check if the state is updated correctly
    expect(input.value).toBe('test input');
});


