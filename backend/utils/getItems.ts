import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY, {
  apiVersion: "2022-11-15",
});

async function getCartItems(line_items: any) {
  return new Promise((resolve, reject) => {
    const cartItems:any = [];

    line_items?.data?.forEach(async (item:any) => {
      const product = await stripe.products.retrieve(item.price.product);
      const productId = product.metadata.productId;

      cartItems.push({
        product: productId,
        name: product.name,
        price: item.price.unit_amount_decimal / 100,
        quantity: item.quantity,
        image: product?.images[0] || ''
      });

      if (cartItems.length === line_items?.data.length) {
        resolve(cartItems);
      }
    });
  });
}

export default getCartItems;
