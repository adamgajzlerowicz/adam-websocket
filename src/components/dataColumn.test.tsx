import React from "react";
import { render, screen } from "@testing-library/react";
import { DataColumn } from "./dataColumn";
import { testIds } from "../constants";

describe("DataColumn", () => {
  it("renders title", () => {
    render(<DataColumn data={[]} heading="Hello world" />);
    const titleElement = screen.getByTestId(testIds.dataColumnHeading);
    expect(titleElement).toContainHTML("Hello world");
  });

  it("contains headings", () => {
    render(<DataColumn data={[]} heading="Hello world" />);
    expect(screen.getByTestId(testIds.priceHeading)).toBeInTheDocument();
    expect(screen.getByTestId(testIds.sizeHeading)).toBeInTheDocument();
    expect(screen.getByTestId(testIds.totalHeading)).toBeInTheDocument();
  });

  it("renders orderbook correctly", () => {
    render(
      <DataColumn
        data={[[1, 2], [2, 3], [3, 4]]}
        heading="Hello world"
      />
    );

    const firstPrice = screen.getAllByTestId(testIds.orderbookPrice)[0]
    const firstSize = screen.getAllByTestId(testIds.orderbookSize)[0]
    const firstTotal = screen.getAllByTestId(testIds.orderbookTotal)[0]

    expect(firstPrice).toContainHTML("$1.00");
    expect(firstSize).toContainHTML("2.000");
    expect(firstTotal).toContainHTML("9.000");
  });
});
