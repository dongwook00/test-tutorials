import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

test("From order to order completion", async () => {
  render(<App />);
  const americaInput = await screen.findByRole("spinbutton", {
    name: "America",
  });

  userEvent.clear(americaInput);
  userEvent.type(americaInput, "2");

  const englandInput = await screen.findByRole("spinbutton", {
    name: "England",
  });

  userEvent.clear(englandInput);
  userEvent.type(englandInput, "3");

  const insuranceCheckbox = await screen.findByRole("checkbox", {
    name: "Insurance",
  });
  userEvent.click(insuranceCheckbox);

  const orderButton = screen.getByRole("button", { name: "주문하기" });
  userEvent.click(orderButton);

  // 주문 확인 페이지
  // 1. 주문 확인 제목 확인하기
  const summaryTitle = screen.getByRole("heading", {
    name: "주문 확인",
  });
  expect(summaryTitle).toBeInTheDocument();

  // 2. 상품총액 확인하기
  const productsPrice = screen.getByRole("heading", {
    name: "상품 가격: 5000",
  });
  expect(productsPrice).toBeInTheDocument();

  // 3. 옵션총액 확인하기
  const optionsPrice = screen.getByRole("heading", {
    name: "옵션 가격: 500",
  });
  expect(optionsPrice).toBeInTheDocument();

  // 4. 상품/총액 리스트 나열
  expect(screen.getByText("2 America")).toBeInTheDocument();
  expect(screen.getByText("3 England")).toBeInTheDocument();
  expect(screen.getByText("Insurance")).toBeInTheDocument();

  // 5. 체크박스 체크
  const confirmCheckbox = screen.getByRole("checkbox", {
    name: "주문하려는 것을 확인하셨나요?",
  });
  userEvent.click(confirmCheckbox);
  // 6. 주문확인 클릭
  const confirmButton = screen.getByRole("button", { name: "주문 확인" });
  userEvent.click(confirmButton);
});
