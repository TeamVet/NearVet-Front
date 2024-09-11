import { AppProps } from 'next/app';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { useState, useEffect } from 'react';

// Llama a loadStripe fuera del componente para evitar su recreación en cada renderizado
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '');

function MyApp({ Component, pageProps }: AppProps) {
  const [clientSecret, setClientSecret] = useState<string | undefined>();

  // Ejemplo: obtener el clientSecret desde el servidor (esto se haría en la vida real)
  useEffect(() => {
    // Aquí deberías hacer una llamada para obtener el clientSecret del backend
    setClientSecret('CLIENT_SECRET_EXAMPLE');
  }, []);

  const options = {
    clientSecret,
  };
  return (
    <Elements stripe={stripePromise} options={options}>
      <Component {...pageProps} />
    </Elements>
  );
}

export default MyApp;
