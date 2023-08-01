const express = require('express');
const router = express.Router();
const axios = require('axios');

/* GET home page. */
router.get('/', (req, res, next) => {
  // res.render('index', { title: 'Express' });
  res.json({message: "Welcome to my server"});
});

// Ruta para obtener la lista de Asteroids basados en su fecha de aproximación más cercana a la Tierra.
router.get('/neo-feed', async (req, res) => {
  try {
    const apiKey = 'aoe2Mwy6Y8tXapsuzMAaYqr1q9zAzsMyiBrtPcOZ';
    const apiUrl = 'https://api.nasa.gov/neo/rest/v1/feed';

    const start_date = '2023-05-25';
    const end_date = '2023-06-01';

    const response = await axios.get(apiUrl, {
      params: {
        start_date: start_date,
        end_date: end_date,
        api_key: apiKey,
      },
    });

    const data = response.data;
    res.json(data);
  } catch (error) {
    console.error('Error al obtener datos de NeoWs - Feed:', error);
    res.status(500).json({ error: 'Error al obtener datos de NeoWs - Feed' });
  }
});

// Ruta para buscar un asteroide específico basado en su NASA JPL small body (SPK-ID) ID.
router.get('/neo-lookup/:asteroid_id', async (req, res) => {
  try {
    const apiKey = 'aoe2Mwy6Y8tXapsuzMAaYqr1q9zAzsMyiBrtPcOZ';
    const asteroidId = req.params.asteroid_id;
    const apiUrl = `https://api.nasa.gov/neo/rest/v1/neo/${asteroidId}`;

    const response = await axios.get(apiUrl, {
      params: {
        api_key: apiKey,
      },
    });

    const data = response.data;
    res.json(data);
  } catch (error) {
    console.error('Error al obtener datos de NeoWs - Lookup:', error);
    res.status(500).json({ error: 'Error al obtener datos de NeoWs - Lookup' });
  }
});

// Ruta para navegar por el conjunto de datos general de los asteroides.
router.get('/neo-browse', async (req, res) => {
  try {
    const apiKey = 'aoe2Mwy6Y8tXapsuzMAaYqr1q9zAzsMyiBrtPcOZ';
    const apiUrl = 'https://api.nasa.gov/neo/rest/v1/neo/browse';

    const response = await axios.get(apiUrl, {
      params: {
        api_key: apiKey,
      },
    });

    const data = response.data;
    res.json(data);
  } catch (error) {
    console.error('Error al obtener datos de NeoWs - Browse:', error);
    res.status(500).json({ error: 'Error al obtener datos de NeoWs - Browse' });
  }
});

module.exports = router;
