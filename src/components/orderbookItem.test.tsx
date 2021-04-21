import React from "react";
import {render, screen} from "@testing-library/react";
import { OrderbookItem } from "./orderbookItem";
import {testIds} from "../constants";

describe("OrderbookItem", () => {
  it("renders price correctly", () => {
    render(
        <OrderbookItem size={200} price={100} total={300} />
    );
    const element = screen.getByTestId(testIds.orderbookPrice);
    expect(element).toContainHTML("$100.00");
  });

  it("renders size correctly", () => {
    render(
      <OrderbookItem size={200} price={100} total={300} />
    );
    const element = screen.getByTestId(testIds.orderbookSize);
    expect(element).toContainHTML("200.000");
  });

  it("renders total correctly", () => {
    render(
        <OrderbookItem size={200} price={100} total={300} />
    );
    const element = screen.getByTestId(testIds.orderbookTotal);
    expect(element).toContainHTML("300.000");
  });
});
