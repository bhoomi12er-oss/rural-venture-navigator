const Order = require('../models/Order');
const Product = require('../models/Product');
const mockStore = require('../utils/mockStore');

const placeOrder = async (req, res) => {
  const { productId, quantity } = req.body;

  if (!productId || !quantity) {
    return res.status(400).json({ success: false, message: 'Please provide product ID and quantity' });
  }

  try {
    let product;
    if (global.dbConnected) {
      product = await Product.findById(productId);
    } else {
      product = mockStore.findById('products', productId);
    }

    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    const price = product.price;
    const totalAmount = price * Number(quantity);

    const orderData = {
      customerId: req.user._id,
      entrepreneurId: product.entrepreneurId,
      productId,
      quantity: Number(quantity),
      price,
      totalAmount,
      orderStatus: 'completed', // immediately marked as completed for test/mock workflow
    };

    let order;
    if (global.dbConnected) {
      order = await Order.create(orderData);
    } else {
      order = mockStore.create('orders', orderData);
    }

    res.status(201).json({ success: true, order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getOrders = async (req, res) => {
  try {
    let orders;
    if (global.dbConnected) {
      if (req.user.role === 'entrepreneur') {
        orders = await Order.find({ entrepreneurId: req.user._id })
          .populate('customerId', 'name phone')
          .populate('productId', 'productName');
      } else {
        orders = await Order.find({ customerId: req.user._id })
          .populate('productId', 'productName')
          .populate('entrepreneurId', 'name');
      }
    } else {
      if (req.user.role === 'entrepreneur') {
        orders = mockStore.find('orders', { entrepreneurId: req.user._id });
      } else {
        orders = mockStore.find('orders', { customerId: req.user._id });
      }

      // Manually simulate Mongoose population for local JSON storage mode
      const users = mockStore.find('users', {});
      const products = mockStore.find('products', {});
      orders = orders.map(order => {
        const customer = users.find(u => String(u._id) === String(order.customerId));
        const product = products.find(p => String(p._id) === String(order.productId));
        const seller = users.find(u => String(u._id) === String(order.entrepreneurId));
        return {
          ...order,
          customerId: customer ? { _id: customer._id, name: customer.name, phone: customer.phone } : { name: 'Customer' },
          productId: product ? { _id: product._id, productName: product.productName } : { productName: 'Product' },
          entrepreneurId: seller ? { _id: seller._id, name: seller.name } : { name: 'Seller' }
        };
      });
    }

    res.status(200).json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { placeOrder, getOrders };
