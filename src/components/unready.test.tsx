import {ReadyState} from "react-use-websocket";
import {render, screen} from "@testing-library/react";
import {Unready} from "./unready";
import {testIds} from "../constants";

describe("OrderbookItem", () => {
  it("renders price correctly", () => {
    render(
        <Unready readyState={ReadyState.CONNECTING}/>
    );
    const element = screen.getByTestId(testIds.unready);
    expect(element).toContainHTML("Loading");
  });
});
