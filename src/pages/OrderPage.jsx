import React, { useEffect, useState } from 'react';
import axios from 'axios';
import malzemeData from '../malzemeData';
import OrderSummary from '../components/OrderSummary';
import PizzaForm from '../components/PizzaForm';
import PizzaInfo from '../components/PizzaInfo';
import Header from '../components/Header';
import '../css/OrderPage.css';
import '../css/ResetButton.css';


function OrderPage({ onBack, onSuccess }) {
    const [pizzaIndex, setPizzaIndex] = useState(null);
    const [order, setOrder] = useState({
        username: "",
        pizzaCount: 1,
        selectedSize: "orta",
        selectedDough: "normal",
        selectedToppings: [],
        orderNote: "",
        pizzaName: "",
    });
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        const randomIndex = Math.floor(Math.random() * malzemeData.length);
        setPizzaIndex(randomIndex);
        setOrder((prevOrder) => ({
            ...prevOrder,
            pizzaName: malzemeData[randomIndex].name,
        }));
    }, []);

    if (pizzaIndex === null) {
        return <p>Loading...</p>;
    }

    const pizzaPrice = malzemeData[pizzaIndex].price;

    const updateOrder = (key, value) => {
        setOrder((prevOrder) => ({
            ...prevOrder,
            [key]: value,
        }));
    };

    const handleToppingChange = (event) => {
        const value = event.target.value;

        setOrder((prevOrder) => {
            const isSelected = prevOrder.selectedToppings.includes(value);
            if (!isSelected && prevOrder.selectedToppings.length >= 10) {
                setErrorMessage("En fazla 10 malzeme seçebilirsiniz.");
                return prevOrder;
            }
            const selectedToppings = isSelected
                ? prevOrder.selectedToppings.filter((topping) => topping !== value)
                : [...prevOrder.selectedToppings, value];
            setErrorMessage("");
            return { ...prevOrder, selectedToppings };
        });
    };

    const toppingPrice = 5;
    const totalToppingPrice = order.selectedToppings.length * toppingPrice;
    const totalPizzaPrice = pizzaPrice * order.pizzaCount;
    const totalPrice = totalPizzaPrice + totalToppingPrice;

    const handleSubmit = async () => {
        try {
            const response = await axios.post('https://reqres.in/api/users', {
                ...order,
                totalPrice,
            });
            console.log('Order submitted:', response.data);
            onSuccess();
        } catch (error) {
            console.error('Error submitting order:', error);
        }
    };

    const handleReset = () => {
        setOrder({
            username: "",
            pizzaCount: 1,
            selectedSize: "orta",
            selectedDough: "normal",
            selectedToppings: [],
            orderNote: "",
            pizzaName: malzemeData[pizzaIndex].name,
        });
    };

    return (
        <div>
            <Header onBack={onBack} />
            <section>
                <div className="reset-container">
                    <button className="reset-button" onClick={handleReset} data-cy="reset-order">Sıfırla</button>
                </div>
                <PizzaInfo pizza={malzemeData[pizzaIndex]} />
                <PizzaForm
                    order={order}
                    updateOrder={updateOrder}
                    handleToppingChange={handleToppingChange}
                    errorMessage={errorMessage}
                />
                <OrderSummary
                    order={order}
                    totalPrice={totalPrice}
                    totalToppingPrice={totalToppingPrice}
                    updateOrder={updateOrder}
                    handleSubmit={handleSubmit}
                />
            </section>
        </div>
    );
}

export default OrderPage;
