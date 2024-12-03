import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import React from 'react'
import PaymentForm from './PaymentForm'

// const apiKey = `pk_live_51OdwexAFbclQdyveddA1UnYh3py2azs5N0PGMaw0EuSwMoSwPLNyoZyqX7tqLUn5nDJl2t0hxFkYVbHJDg54NzjG00nDqskg7u`;
const apiKey = `pk_live_51OdwexAFbclQdyveddA1UnYh3py2azs5N0PGMaw0EuSwMoSwPLNyoZyqX7tqLUn5nDJl2t0hxFkYVbHJDg54NzjG00nDqskg7u`;
const stripeTestPromise = loadStripe(
  apiKey
)
console.log("stripeTestPromise",stripeTestPromise, apiKey)
function StripeContainer(id) {
  return (
    <Elements
        stripe={stripeTestPromise}

    >
    <PaymentForm id={id}/>

    </Elements>
  )
}

export default StripeContainer