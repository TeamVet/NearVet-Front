import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';
const MercadoPago = () => {
  //initMercadoPago('YOUR_PUBLIC_KEY');

  return (
    <div>
      <div id='wallet_container'>{/* <Wallet initialization={{ preferenceId: '<PREFERENCE_ID>' }} customization={{ texts: { valueProp: 'smart_option' } }} /> */}</div>
    </div>
  );
};
export default MercadoPago;
