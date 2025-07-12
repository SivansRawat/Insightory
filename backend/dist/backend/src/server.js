"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const auth_1 = __importDefault(require("./routes/auth"));
const products_1 = __importDefault(require("./routes/products"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
// Middleware
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: 'http://localhost:3000', // IMPORTANT: Allow requests from your Next.js frontend
    credentials: true
}));
// MongoDB Connection
const mongoUri = process.env.MONGO_URI;
if (!mongoUri) {
    throw new Error('MONGO_URI environment variable is not defined');
}
mongoose_1.default.connect(mongoUri)
    .then(() => console.log('MongoDB Connected successfully!'))
    .catch((err) => {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
});
// Routes
app.use('/api/auth', auth_1.default);
app.use('/api/products', products_1.default);
// Simple test route
app.get('/', (req, res) => {
    res.send('Inventory Insights Backend API is running!');
});
// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
