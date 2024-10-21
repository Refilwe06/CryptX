const router = require("express").Router();
const db = require("../db");
const axios = require('axios');

// Fetch dummy transaction data from my db
router.get("/get-transactions", (req, res) => {
    // fetch user from my db using the provided username
    const sql = "SELECT * FROM cryptx_transactions";

    db.query(sql, (err, data) => {
        // return db error back to my frontend if it exists
        if (err) return res.status(500).json({ err: err.message });

        if (data.length > 0) {
            if (err) return res.status(400).json({ err: err.message });

            // send transactions back to my frontend
            return res.status(200).json({ transactions: data });
        } else {
            return res.status(400).json({ err: "Error fetching transactions" });
        }
    });
});

// Fetch coin prices for the last 6 months from Coin Gecko API for a single coin
router.get("/fetch-coin-prices", async (req, res) => {
    const { coinId } = req.query;
    try {
        const response = await axios.get(`${process.env.COIN_GECKO_URL}/coins/${coinId}/market_chart`, {
            params: {
                vs_currency: 'usd',
                days: 183
            }
        });
        const result = response.data;

        const transformedData = groupDataByMonth(result.prices);
        res.status(200).send({ data: transformedData })
    } catch (error) {
        console.error('Error fetching coin prices:', error);
        return res.status(500).json({ err: error.message })
    }
})

// Fetch coin prices for the last 6 months from Coin Gecko API for multiple coins
router.get("/fetch-multiple-coin-prices", async (req, res) => {
    try {
        const coinIds = ['bitcoin', 'ethereum', 'litecoin', 'cardano'];  // Replace with your coin IDs

        // Make multiple requests in parallel using Axios
        const responses = await Promise.all(
            coinIds.map(id => axios.get(`${process.env.COIN_GECKO_URL}/coins/${id}/market_chart`, {
                params: {
                    vs_currency: 'usd',
                    days: '183',
                },
                headers: {
                    'x-cg-demo-api-key': process.env.COIN_GECKO_API_KEY
                }
            }))
        );

        // Combine the responses into a single data object
        const result = responses.map((response, index) => ({
            id: coinIds[index],
            data: groupDataByMonth(response.data.prices)
        }));

        res.status(200).json(result);  // Send combined data to frontend
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ message: 'Error fetching cryptocurrency data' });
    }
});

// Function to group data by month and calculate the average price for each month
const groupDataByMonth = (prices) => {
    const monthlyData = {};

    prices.forEach(price => {
        const date = new Date(price[0]); // Convert timestamp to date
        const monthYear = `${date.getFullYear()}-${date.getMonth() + 1}`; // Get year-month (e.g., '2024-10')

        // If the monthYear key doesn't exist, create it with an array to hold the prices
        if (!monthlyData[monthYear]) {
            monthlyData[monthYear] = [];
        }

        // Add the price for this particular day to the corresponding month
        monthlyData[monthYear].push(price[1]);
    });

    // Calculate the average price for each month
    const result = Object.keys(monthlyData).map(monthYear => {
        const pricesInMonth = monthlyData[monthYear];
        const averagePrice = pricesInMonth.reduce((sum, price) => sum + price, 0) / pricesInMonth.length;

        // Convert the monthYear back to a readable format (e.g., "Jan")
        const [year, month] = monthYear.split('-');
        const monthName = new Date(year, month - 1).toLocaleString('default', { month: 'short' });

        return {
            name: `${monthName}`,
            price: averagePrice.toFixed(2),
        };
    });

    return result;
};

// Fetch coin data from Coin Gecko API for bitcoin, ethereum, litecoin and cardano
router.get("/fetch-coin-data", async (req, res) => {
    try {
        const response = await axios.get(`${process.env.COIN_GECKO_URL}/coins/markets?vs_currency=usd&ids=bitcoin%2Cethereum%2Clitecoin%2Ccardano`, {
            headers: {
                'x-cg-demo-api-key': process.env.COIN_GECKO_API_KEY
            }
        });
        const result = response.data;

        res.status(200).send({ coinData: result })
    } catch (error) {
        console.error('Error fetching coin data:', error);
        return res.status(500).json({ err: error.message })
    }
})



module.exports = router;
