const Product = require('../models/Product');
const mockStore = require('../utils/mockStore');

const getProducts = async (req, res) => {
  try {
    let products;
    if (global.dbConnected) {
      products = await Product.find({});
    } else {
      products = mockStore.find('products', {});
      
      // Seed initial mock products if list is empty for immediate demonstration
      if (products.length === 0) {
        const seedProducts = [
          {
            productName: "Ragi Chocolate Almond Cookies",
            description: "Delicious finger millet cookies rich in organic cocoa and raw almonds.",
            category: "cookies",
            price: 35,
            ingredients: "Ragi flour, Cocoa, Raw Almonds, Organic Jaggery, Cow Ghee",
            availableQuantity: 150,
            imageUrl: "",
            entrepreneurId: "mock_owner_1",
          },
          {
            productName: "Jowar Masala Crisps",
            description: "Crispy snack made of Sorghum flour flavored with Indian traditional spices.",
            category: "snacks",
            price: 30,
            ingredients: "Jowar (Sorghum) flour, Rice bran oil, Chili flakes, Salt, Spices",
            availableQuantity: 100,
            imageUrl: "",
            entrepreneurId: "mock_owner_1",
          },
          {
            productName: "Bajra Dry Fruit Laddoo",
            description: "Sweet nutrient-packed laddoos made of pearl millet flour, nuts and dates.",
            category: "flour", // or other
            price: 50,
            ingredients: "Bajra flour, Almonds, Cashews, Dates, Jaggery, Cow Ghee",
            availableQuantity: 80,
            imageUrl: "",
            entrepreneurId: "mock_owner_2",
          }
        ];
        for (const p of seedProducts) {
          mockStore.create('products', p);
        }
        products = mockStore.find('products', {});
      }
    }
    res.status(200).json({ success: true, products });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getMyProducts = async (req, res) => {
  try {
    let products;
    if (global.dbConnected) {
      products = await Product.find({ entrepreneurId: req.user._id });
    } else {
      products = mockStore.find('products', { entrepreneurId: req.user._id });
    }
    res.status(200).json({ success: true, products });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getProductById = async (req, res) => {
  try {
    let product;
    if (global.dbConnected) {
      product = await Product.findById(req.params.id);
    } else {
      product = mockStore.findById('products', req.params.id);
    }

    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    res.status(200).json({ success: true, product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const createProduct = async (req, res) => {
  const { 
    productName, 
    description, 
    category, 
    price, 
    ingredients, 
    availableQuantity, 
    imageUrl 
  } = req.body;

  if (!productName || !description || !category || !price || !ingredients) {
    return res.status(400).json({ success: false, message: 'Please provide all required fields' });
  }

  try {
    const productData = {
      productName,
      description,
      category,
      price: Number(price),
      ingredients,
      entrepreneurId: req.user._id,
      availableQuantity: Number(availableQuantity) || 100,
      imageUrl: imageUrl || '',
    };

    let product;
    if (global.dbConnected) {
      product = await Product.create(productData);
    } else {
      product = mockStore.create('products', productData);
    }

    res.status(201).json({ success: true, product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getProducts, getMyProducts, getProductById, createProduct };
