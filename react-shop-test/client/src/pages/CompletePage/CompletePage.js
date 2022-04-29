import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { OrderContext } from "../../contexts/OrderContext";
import ErrorBanner from "../../components/ErrorBanner";

/**
 * 1. 백엔드에 주문확인을 요청한다.
 * 2. 주문확인 결과를 화면에 표시한다.
 */
const CompletePage = ({ setStep }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [ordersContext, , resetOrders] = useContext(OrderContext);

  useEffect(() => {
    requestOrder(ordersContext);
  }, [ordersContext]);

  const requestOrder = async (ordersContext) => {
    try {
      const res = await axios.post(
        "http://localhost:4000/complete",
        ordersContext
      );
      setOrders(res.data);
      setLoading(false);
    } catch (e) {
      setError(true);
    }
  };

  const handleClick = () => {
    resetOrders();
    setStep(0);
  };

  const orderHistory = orders.map((item) => {
    return (
      <tr key={item.orderNumber}>
        <td>{item.orderNumber}</td>
        <td>{item.orderPrice}</td>
      </tr>
    );
  });

  if (error) {
    return <ErrorBanner message="에러가 발생했습니다." />;
  }
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <h1>주문이 성공했습니다.</h1>
      <h2>지금까지의 모든 주문</h2>
      <table>
        <thead>
          <tr>
            <th>numbers</th>
            <th>price</th>
          </tr>
        </thead>
        <tbody>{orderHistory}</tbody>
      </table>
      <button onClick={handleClick}>첫페이지로</button>
    </div>
  );
};
export default CompletePage;
