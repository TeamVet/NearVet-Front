import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import { FormEvent, useState } from 'react';

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return; // Stripe.js aún no se ha cargado
    }

    setIsSubmitting(true);

    const result = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: 'https://tu-sitio.com/pago-completo',
      },
    });

    setIsSubmitting(false);

    if (result.error) {
      // Mostrar error a tu cliente (por ejemplo, detalles incompletos)
      console.error(result.error.message);
    } else {
      // El cliente será redirigido a tu `return_url`
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <button disabled={!stripe || isSubmitting}>Pagar</button>
    </form>
  );
};

export default CheckoutForm;
