import { render, screen } from "../../../test-utils";
import userEvent from "@testing-library/user-event";
import { OrderContextProvider } from "../../../contexts/OrderContext";
import Type from "../Type";
import OrderPage from "../OrderPage";

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

describe("total price of goods and options", () => {
  test("total price starts with 0 and updating total price when adding one product", async () => {
    render(<OrderPage />);
    const total = screen.getByText("total price", { exact: false });
    expect(total).toHaveTextContent("0");

    const americaInput = await screen.findByRole("spinbutton", {
      name: "America",
    });

    userEvent.clear(americaInput);
    userEvent.type(americaInput, "3");
    expect(total).toHaveTextContent("3000");
  });

  test("updating total price when adding one option", async () => {
    /**
     * 1. render OrderPage
     * 2. get TotalPage
     * 3. get options
     * 4. click one option
     * 5. check total price
     */
    render(<OrderPage />);
    const total = screen.getByText("total price", { exact: false });
    const options = await screen.findByRole("checkbox", { name: "Insurance" });
    userEvent.click(options);
    expect(total).toHaveTextContent("500");
  });

  test("updating total price when removing options and product", async () => {
    /**
     * 1. render OrderPage
     * 2. get total price
     * 3. get options
     * 4. get product
     * 5. click options
     * 6. type product
     * 7. check total
     */
    render(<OrderPage />);
    const total = screen.getByText("total price", { exact: false });
    const americaInput = await screen.findByRole("spinbutton", {
      name: "America",
    });
    const options = await screen.findByRole("checkbox", { name: "Insurance" });
    userEvent.click(options);
    userEvent.clear(americaInput);
    userEvent.type(americaInput, "3");

    userEvent.clear(americaInput);
    userEvent.type(americaInput, "1");

    expect(total).toHaveTextContent("1500");
  });
});
