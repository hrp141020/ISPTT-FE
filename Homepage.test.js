import React from 'react';
import { MemoryRouter, Router } from 'react-router-dom';
import { render, fireEvent } from "@testing-library/react";
import { createMemoryHistory } from 'history';
import Homepage from "./Homepage";

describe("Homepage", () => {
    it("renders without crashing", () => {
        render(
            <MemoryRouter>
                <Homepage />
            </MemoryRouter>
        );
    });

    it("handles click on 'Use Tool' button", () => {
        const { getByText } = render(
            <MemoryRouter>
                <Homepage />
            </MemoryRouter>
        );
        const useToolButton = getByText("Use tool");
        fireEvent.click(useToolButton);
        // Add your assertions here to test the expected behavior
    });

    it("handles click on 'Documentation' button", () => {
        const { getByText } = render(
            <MemoryRouter>
                <Homepage />
            </MemoryRouter>
        );
        const documentationButton = getByText("Documentation");
        fireEvent.click(documentationButton);
        // Add your assertions here to test the expected behavior
    });

    it('navigates to /Defination when "Use tool" is clicked', () => {
        const history = createMemoryHistory();
        const { getByText } = render(
            <Router history={history}>
                <Homepage />
            </Router>
        );
    
        fireEvent.click(getByText('Use tool'));
        expect(history.location.pathname).toBe('/Defination');
    });

    it('navigates to /Introduction when "Documentation" is clicked', () => {
        const history = createMemoryHistory();
        const { getByText } = render(
            <Router history={history}>
                <Homepage />
            </Router>
        );
    
        fireEvent.click(getByText('Documentation'));
        expect(history.location.pathname).toBe('/Introduction');
    });
});
