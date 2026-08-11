require('dotenv').config();
const mongoose = require('mongoose');
const Category = require('./models/Category');
const Food = require('./models/Food');
const User = require('./models/User');
const bcrypt = require('bcryptjs');

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Clear existing data
    await Category.deleteMany({});
    await Food.deleteMany({});
    await User.deleteMany({});

    // Create categories
    const categories = await Category.insertMany([
      {
        name: 'Biryani',
        description: 'Fragrant rice dishes with meat',
        image: 'https://via.placeholder.com/150?text=Biryani'
      },
      {
        name: 'Curry',
        description: 'Spiced curry dishes',
        image: 'https://via.placeholder.com/150?text=Curry'
      },
      {
        name: 'Bread',
        description: 'Indian breads and naan',
        image: 'https://via.placeholder.com/150?text=Bread'
      },
      {
        name: 'Desserts',
        description: 'Sweet treats and desserts',
        image: 'https://via.placeholder.com/150?text=Desserts'
      },
      {
        name: 'Beverages',
        description: 'Drinks and refreshments',
        image: 'https://via.placeholder.com/150?text=Beverages'
      }
    ]);

    // Create foods
    await Food.insertMany([
      {
        name: 'Chicken Biryani',
        description: 'Fragrant basmati rice cooked with tender chicken',
        price: 250,
        category: categories[0]._id,
        image: 'https://via.placeholder.com/150?text=Chicken+Biryani',
        rating: 4.5,
        isVegetarian: false,
        isAvailable: true
      },
      {
        name: 'Mutton Biryani',
        description: 'Aromatic biryani with tender mutton pieces',
        price: 320,
        category: categories[0]._id,
        image: 'https://via.placeholder.com/150?text=Mutton+Biryani',
        rating: 4.7,
        isVegetarian: false,
        isAvailable: true
      },
      {
        name: 'Butter Chicken',
        description: 'Creamy tomato-based curry with tender chicken',
        price: 280,
        category: categories[1]._id,
        image: 'https://via.placeholder.com/150?text=Butter+Chicken',
        rating: 4.6,
        isVegetarian: false,
        isAvailable: true
      },
      {
        name: 'Paneer Tikka Masala',
        description: 'Cottage cheese in spiced cream sauce',
        price: 220,
        category: categories[1]._id,
        image: 'https://via.placeholder.com/150?text=Paneer+Tikka',
        rating: 4.4,
        isVegetarian: true,
        isAvailable: true
      },
      {
        name: 'Naan',
        description: 'Traditional Indian flatbread',
        price: 40,
        category: categories[2]._id,
        image: 'https://via.placeholder.com/150?text=Naan',
        rating: 4.3,
        isVegetarian: true,
        isAvailable: true
      },
      {
        name: 'Roti',
        description: 'Whole wheat Indian bread',
        price: 30,
        category: categories[2]._id,
        image: 'https://via.placeholder.com/150?text=Roti',
        rating: 4.2,
        isVegetarian: true,
        isAvailable: true
      },
      {
        name: 'Gulab Jamun',
        description: 'Sweet milk solids in syrup',
        price: 80,
        category: categories[3]._id,
        image: 'https://via.placeholder.com/150?text=Gulab+Jamun',
        rating: 4.5,
        isVegetarian: true,
        isAvailable: true
      },
      {
        name: 'Kheer',
        description: 'Rice pudding with milk and nuts',
        price: 90,
        category: categories[3]._id,
        image: 'https://via.placeholder.com/150?text=Kheer',
        rating: 4.4,
        isVegetarian: true,
        isAvailable: true
      },
      {
        name: 'Mango Lassi',
        description: 'Refreshing yogurt-based mango drink',
        price: 60,
        category: categories[4]._id,
        image: 'https://via.placeholder.com/150?text=Mango+Lassi',
        rating: 4.3,
        isVegetarian: true,
        isAvailable: true
      },
      {
        name: 'Masala Chai',
        description: 'Spiced Indian tea',
        price: 40,
        category: categories[4]._id,
        image: 'https://via.placeholder.com/150?text=Masala+Chai',
        rating: 4.2,
        isVegetarian: true,
        isAvailable: true
      }
    ]);

    // Create admin user
    const hashedPassword = await bcrypt.hash('admin123', 10);
    await User.create({
      name: 'Admin User',
      email: 'admin@foodhub.com',
      phone: '9999999999',
      password: hashedPassword,
      role: 'admin',
      address: 'Admin Address'
    });

    // Create regular users
    const userPassword = await bcrypt.hash('user123', 10);
    await User.insertMany([
      {
        name: 'John Doe',
        email: 'john@example.com',
        phone: '9876543210',
        password: userPassword,
        role: 'user',
        address: '123 Main St, City'
      },
      {
        name: 'Jane Smith',
        email: 'jane@example.com',
        phone: '9123456789',
        password: userPassword,
        role: 'user',
        address: '456 Oak Ave, Town'
      }
    ]);

    console.log('Database seeded successfully!');
    console.log('\nDefault Credentials:');
    console.log('Admin - Email: admin@foodhub.com, Password: admin123');
    console.log('User - Email: john@example.com, Password: user123');
    console.log('User - Email: jane@example.com, Password: user123');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error.message);
    process.exit(1);
  }
};

seedDatabase();
