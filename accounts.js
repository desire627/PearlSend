/* =====================================================================
   MefraPay – accounts customers pay into
   ---------------------------------------------------------------------
   These are shown on the success screen after someone submits the form,
   so they know where to send the money.

   Any account whose "number" is empty is hidden. If a direction has no
   filled-in accounts, customers instead see
   "We'll send you the payment details when we contact you."

   Double-check every number: customers will send real money here.
   ===================================================================== */
const PAYMENT_ACCOUNTS = {

  // Russia → Uganda: the customer is in Russia and pays in ROUBLES (RUB)
  to: [
    {
      method: 'SBP (Fast Payment System)',
      bank:   'Сбербанк',
      number: '+7 933 724-43-01',
      name:   'Mukisa Emma Francis'
    }
  ],

  // Uganda → Russia: the customer is in Uganda and pays in SHILLINGS (UGX)
  from: [
    {
      method: 'MTN Mobile Money',
      bank:   '',
      number: '+256 782 492 032',
      name:   'Mukisa Emma Francis'
    }
  ]
};
