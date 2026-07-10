import React from 'react'

const CheckoutLoadingStatus = () => {
  return 
    if (cartItems.length === 0) {
    return (
      <div className="h-auto flex flex-col items-center justify-center px-4 py-16 bg-background">
        <div className="rounded-3xl p-12 shadow-lg text-center max-w-sm w-full bg-background">
          <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5">
            <ShoppingCart size={80} className="p-2 rounded-4xl text-yellow-700 animate-bounce" />
          </div>
          <h1 className="text-4xl font-serif mb-2">Your Cart</h1>
          <p className="text-xs uppercase tracking-widest mb-6 font-serif">No items yet</p>
          <button
            onClick={() => navigate('/redeem')}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-yellow-700 via-yellow-200 to-yellow-800 text-sm uppercase tracking-widest font-serif transition hover:opacity-90 inline-flex items-center justify-center gap-2"
          >
            Browse Jewellery <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  // ── Order Confirmed ──
  if (ordered) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-background">
        <div className="rounded-3xl p-12 text-center shadow-lg max-w-sm w-full bg-white border border-yellow-700/30">
          <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5 bg-green-100">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-4xl font-serif font-bold mb-2 bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-700 bg-clip-text text-transparent">
            {isWallet ? 'Added to Wallet!' : 'Order Confirmed!'}
          </h2>
          <p className="text-xs uppercase tracking-widest mb-3 text-green-700">
            {isWallet ? 'Success' : 'Thank you for your purchase'}
          </p>
          <button
            onClick={() => navigate('/')}
            className="w-full py-3.5 rounded-xl text-sm uppercase tracking-widest font-semibold hover:opacity-90 transition bg-gradient-to-r from-yellow-700 via-yellow-200 to-yellow-800 text-yellow-950"
          >
            {isWallet ? 'Go to Portfolio' : 'Back to Home'}
          </button>
        </div>
      </div>
    );
  }
  )
}

export default CheckoutLoadingStatus