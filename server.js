const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = 5001;

app.use(cors());

app.get('/api/cryptocurrencies', async (req, res) => {
    try {
        const { page } = req.query;
        const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
            params: {
                vs_currency: 'cad',
                order: 'market_cap_desc',
                per_page: 10,
                page: page || 1
            }
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch data' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
