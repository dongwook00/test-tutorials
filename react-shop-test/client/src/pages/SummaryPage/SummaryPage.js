import { useContext, useState } from "react";
import { OrderContext } from "../../contexts/OrderContext";

const SummaryPage = ({ setStep }) => {
  const [order] = useContext(OrderContext);
  const [checked, setChecked] = useState(false);

  const productsArr = Array.from(order.products);
  const productItems = productsArr.map(([key, value]) => (
    <li key={key}>
      {value} {key}
    </li>
  ));

  const hasOptions = order.options.size > 0;
  let options = null;
  if (hasOptions) {
    const optionsArr = Array.from(order.options.keys());
    const optionsList = optionsArr.map((key) => <li key={key}>{key}</li>);
    options = (
      <>
        <h2>옵션 가격: {order.totals.options}</h2>
        <ul>{optionsList}</ul>
      </>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setStep(2);
  };

  return (
    <div>
      <h1>주문 확인</h1>
      <h2>상품 가격: {order.totals.products}</h2>
      <ul>{productItems}</ul>
      {options}
      <form onSubmit={handleSubmit}>
        <input
          type="checkbox"
          id="confirm-checkbox"
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
        />
        <label htmlFor="confirm-checkbox">주문하려는 것을 확인하셨나요?</label>
        <br />
        <button disabled={!checked} type="submit">
          주문 확인
        </button>
      </form>
    </div>
  );
};

export default SummaryPage;
