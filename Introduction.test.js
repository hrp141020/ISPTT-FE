
import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Introduction from "./Introduction";
import { BrowserRouter } from 'react-router-dom';

describe("Introduction component", () => {
    it("should render without errors", () => {
        render(
            <BrowserRouter>
            <Introduction />
        </BrowserRouter>);
    });

    
});
