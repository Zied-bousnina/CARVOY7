import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React, { useEffect, useState } from 'react';
import PaymentForm from './PaymentForm';
import { StripeService } from '@/_services/stripe.service';

function StripeContainer({ id }) {
  const [stripePromise, setStripePromise] = useState(null);

  useEffect(() => {
    const fetchStripeKey = async () => {
      try {
        // Fetch the publishable key from the database
        const data = await StripeService.GetStripeConfig();
        const publishableKey = data?.publishableKey || process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;

        if (!publishableKey) {
          console.error('No publishable key found in database or .env file.');
          return;
        }

        // Load Stripe with the publishable key
        const stripe = loadStripe(publishableKey);
        setStripePromise(stripe);
      } catch (error) {
        console.error('Error fetching publishable key:', error.message);

        // Fallback to the local .env key if database fetch fails
        const fallbackKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
        if (fallbackKey) {
          const stripe = loadStripe(fallbackKey);
          setStripePromise(stripe);
        } else {
          console.error('No fallback publishable key found in .env file.');
        }
      }
    };

    fetchStripeKey();
  }, []);

  if (!stripePromise) {
    return <div>Loading Stripe...</div>;
  }

  return (
    <Elements stripe={stripePromise}>
      <PaymentForm id={id} />
    </Elements>
  );
}

export default StripeContainer;
