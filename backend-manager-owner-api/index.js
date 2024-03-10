const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Dummy database to store availability data
let availabilityData = {};

app.use(bodyParser.json());

// API for Restaurant Manager Availability Management
app.post('/api/availability', (req, res) => {
    const { restaurant_id, date, time_slots } = req.body;
    
    // Update availability data in the database
    availabilityData[restaurant_id] = { date, time_slots };
    
    res.json({ message: 'Availability updated successfully' });
});

// API for Restaurant Owner Data Access
app.get('/api/restaurants/:restaurant_id/data', (req, res) => {
    const { restaurant_id } = req.params;
    
    // Retrieve data related to the specified restaurant from the database
    const restaurantData = availabilityData[restaurant_id];
    
    if (!restaurantData) {
        return res.status(404).json({ message: 'Restaurant not found' });
    }
    
    res.json({ restaurantData });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
