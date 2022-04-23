import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { OrderContextProvider } from "../../../contexts/OrderContext";
import Type from "../Type";

test("update product's total when products change", async () => {
  render(<Type orderType="products" />, { wrapper: OrderContextProvider });
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
