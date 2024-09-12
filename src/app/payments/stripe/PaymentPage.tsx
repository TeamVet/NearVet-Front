export default function PaymentPage() {
  const handleCheckout = async () => {
    const response = await fetch('http://localhost:3000/payments/stripe/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        priceId: 'price_1PxepLG7LObgRzJ9FJDUYGxW', // Aquí debes pasar el ID del precio
      }),
    });

    const data = await response.json();
    if (data.url) {
      window.location.href = data.url; // Redirige al usuario a la página de pago de Stripe
    }
  };

  return (
    <div>
      <h1>Formulario de pago</h1>
      <button onClick={handleCheckout}>Ir a Checkout</button>
    </div>
  );
}
