/**
 * Demo Account Seeder
 * Run this once to create demo accounts in the database:
 *   node seed-demo.js
 */

const dotenv = require('dotenv');
dotenv.config();

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const userModel = require('./models/user.model');
const captainModel = require('./models/captain.model');

async function seed() {
    console.log('Connecting to database...');
    await mongoose.connect(process.env.DB_CONNECT);
    console.log('Connected!');

    // --- Demo User ---
    const existingUser = await userModel.findOne({ email: 'demo@user.com' });
    if (existingUser) {
        console.log('Demo user already exists, skipping...');
    } else {
        const hashedPassword = await userModel.hashPassword('demo1234');
        await userModel.create({
            fullname: { firstname: 'Demo', lastname: 'User' },
            email: 'demo@user.com',
            password: hashedPassword,
        });
        console.log('✅ Demo user created: demo@user.com / demo1234');
    }

    // --- Demo Captain ---
    const existingCaptain = await captainModel.findOne({ email: 'demo@captain.com' });
    if (existingCaptain) {
        console.log('Demo captain already exists, skipping...');
    } else {
        const hashedPassword = await captainModel.hashPassword('demo1234');
        await captainModel.create({
            fullname: { firstname: 'Demo', lastname: 'Captain' },
            email: 'demo@captain.com',
            password: hashedPassword,
            status: 'active',
            vehicle: {
                color: 'Black',
                plate: 'DEMO-001',
                capacity: 4,
                vehicleType: 'car',
            },
            location: { ltd: 28.6139, lng: 77.2090 },
        });
        console.log('✅ Demo captain created: demo@captain.com / demo1234');
    }

    await mongoose.disconnect();
    console.log('Done!');
}

seed().catch((err) => {
    console.error('Seeding failed:', err);
    process.exit(1);
});
