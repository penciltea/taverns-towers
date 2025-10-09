/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom';
import { render, screen } from "@testing-library/react";
import InfoListItem from "./InfoListItem";

describe("InfoListItem", () => {
  test("renders the label text", () => {
    render(<InfoListItem label="Name" value="Lirielle" />);
    
    const labelElement = screen.getByText("Name");
    expect(labelElement).toBeInTheDocument();
  });

  test("renders the value text when provided", () => {
    render(<InfoListItem label="Age" value={120} />);
    
    const valueElement = screen.getByText("120");
    expect(valueElement).toBeInTheDocument();
  });

  test('renders "N/A" when value is not provided', () => {
    render(<InfoListItem label="Race" />);
    
    const valueElement = screen.getByText("N/A");
    expect(valueElement).toBeInTheDocument();
  });

  test("renders label as bold (semantic check)", () => {
    render(<InfoListItem label="Class" value="Cleric" />);
    
    const labelElement = screen.getByText("Class");
    expect(labelElement.tagName.toLowerCase()).toBe("dt");
  });
});
