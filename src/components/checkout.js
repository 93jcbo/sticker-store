import React, { useState } from 'react'
import getStripe from '../utils/stripejs'
import Image from '../components/image'

const buttonStyles = {
  fontSize: '13px',
  textAlign: 'center',
  color: '#EFFFF6',
  fontWeight: 'bold',
  padding: '12px 60px',
  backgroundColor: '#a71409',
  borderRadius: '6px',
  border: 'none',
  letterSpacing: '1.5px',
}

const buttonDisabledStyles = {
  opacity: '0.5',
  cursor: 'not-allowed',
}

const stickerQuant ={
  padding: '10px 5px',
  margin: '4px 15px',
}

const Checkout = () => {
  const [loading, setLoading] = useState(false)

  const redirectToCheckout = async event => {
    event.preventDefault()
    setLoading(true)

    const stripe = await getStripe()
    const { error } = await stripe.redirectToCheckout({
      mode: 'payment',
      lineItems: [{ 
        price: 'price_1HK8ytGEQAxFtzEqBQsmKXZJ', 
        quantity: parseInt(document.getElementById('sticker-quant').value)
      }],
      successUrl: `${window.location.origin}/page-2/`,
      cancelUrl: `${window.location.origin}/`,
    })

    if (error) {
      console.warn('Error:', error)
      setLoading(false)
    }
  }

  return (
    <div id="grid-container" className="sticker-grid">
      <div className="sticker-grid-span7 grid-item-header">
        <h1>
          Help stick it to childhood&nbsp;cancer
        </h1>
      </div>
      <div className="sticker-grid-span4 grid-item-sticker">
        <div 
          style ={{
            maxWidth: '350px',
            maxHeight: '410px',
            margin: '0 auto'
          }}
        >
          <Image/>
        </div>
      </div>
      <div className="sticker-grid-span3 grid-item-buy">
        <h2>"TOO Strong" Sticker</h2>
        <h3>$3.00</h3>
        <p>
          In support of Childhood Cancer Awareness Month, <strong>$2</strong> from each sticker sale will be donated to St. Jude Children's Research Hospital.
        </p>
        <p>Size is 2.5in x 3in. Free Shipping</p>
        <div>
          <label for='sticker-quant' style={{display:'none'}}>Quantity</label>
          <select name='quant' required id='sticker-quant' style={stickerQuant}>
            <option value='1' defaultValue>1</option>
            <option value='2'>2</option>
            <option value='3'>3</option>
            <option value='4'>4</option>
            <option value='5'>5</option>
            <option value='6'>6</option>
            <option value='7'>7</option>
            <option value='8'>8</option>
            <option value='9'>9</option>
            <option value='10'>10</option>
          </select>
          <button
            disabled={loading}
            style={
              loading ? { ...buttonStyles, ...buttonDisabledStyles } : buttonStyles
            }
            onClick={redirectToCheckout}
          >
            BUY
          </button>
        </div>
      </div>
      <div className="sticker-grid-span7 grid-item-description">
        <h2>
          Story of the sticker
        </h2>
        <p>
          Estelita, The Cancer-Fighting Cactus, is wearing a gold (ok, it's more yellowish than gold, but you get it) cap and pot to show support for the fight against all childhood cancers. On her planter she wrote part of her favorite <em>Remember the Titans</em> quote:
        </p>
        <q>
        How strong are you?
        TOO Strong
        </q>
        <p>
          Estelita had
        </p>
      </div>
    </div>
  )
}

export default Checkout
