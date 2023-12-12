import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { MemoryRouter, Route } from "react-router-dom";
import Defination from "./Defination";

let container = null;

beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
});

afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});

it("renders without crashing", () => {
    act(() => {
        render(
            <MemoryRouter>
                <Defination />
            </MemoryRouter>,
            container
        );
    });
});

it("handles click event", () => {
    let testLocation;
    act(() => {
        render(
            <MemoryRouter initialEntries={["/"]}>
                <Defination />
                <Route
                    path="*"
                    render={({ location }) => {
                        testLocation = location;
                        return null;
                    }}
                />
            </MemoryRouter>,
            container
        );
    });

    const button = container.querySelector("button");
    expect(button).toBeDefined(); 
    act(() => {
        button.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    expect(testLocation.pathname).toBe("/Characteristic");
});
