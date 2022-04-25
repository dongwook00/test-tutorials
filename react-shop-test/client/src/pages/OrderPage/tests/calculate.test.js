import { render, screen } from "../../../test-utils";
import userEvent from "@testing-library/user-event";
import { OrderContextProvider } from "../../../contexts/OrderContext";
import Type from "../Type";

test("update product's total when products change", async () => {
  render(<Type orderType="products" />);
  const totalElement = screen.getByText("총 가격", {
    exact: false,
  });
  expect(totalElement).toHaveTextContent("0");

  const americaInputElement = await screen.findByRole("spinbutton", {
    name: "America",
  });

  userEvent.clear(americaInputElement);
  userEvent.type(americaInputElement, "1");

  expect(totalElement).toHaveTextContent("1000");
});

test("update options' total when options change", async () => {
  // 옵션1을 클릭한다
  // 가격을 확인한다
  render(<Type orderType="options" />);
  const optionsTotal = screen.getByText("총 가격", { exact: false });
  expect(optionsTotal).toHaveTextContent("0");

  // 옵션2를 클릭한다
  // 가격을 확인한다
  const option1 = await screen.findByRole("checkbox", {
    name: "Insurance",
  });
  userEvent.click(option1);
  expect(optionsTotal).toHaveTextContent("500");

  // 옵션2를 다시 클릭한다
  const option2 = await screen.findByRole("checkbox", { name: "Dinner" });
  userEvent.click(option2);
  expect(optionsTotal).toHaveTextContent("1000");

  // 가격을 확인한다
  userEvent.click(option2);
  expect(optionsTotal).toHaveTextContent("500");
});
