import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect"; // for the "toBeInTheDocument" matcher
import ConversionResult from "./ConversionResult"; // Update path if necessary

describe("<ConversionResult />", () => {
  it("renders without crashing", () => {
    const { container } = render(<ConversionResult postmanJson={{}} />);
    expect(container).toBeInTheDocument();
  });

  it("displays the postmanJson prop", () => {
    const sampleJson = {
      key1: "value1",
      key2: "value2",
    };

    const { getByText } = render(<ConversionResult postmanJson={sampleJson} />);
    expect(getByText(JSON.stringify(sampleJson, null, 2))).toBeInTheDocument();
  });
});
