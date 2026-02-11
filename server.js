const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const cors = require('cors');

const app = express();
app.use(cors());

app.get('/hora-venezuela', async (req, res) => {
    try {
        const url = 'https://ww2.24timezones.com/Caracas/hora';
        
        // Comportamiento Ninja: Simulamos un navegador real para evitar bloqueos
        const response = await axios.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Accept-Language': 'es-ES,es;q=0.9',
                'Cache-Control': 'no-cache'
            }
        });

        const $ = cheerio.load(response.data);
        
        // Scrapeamos el div específico que me pasaste
        const timeSpans = $('#cityClock .time span');
        const horas = $(timeSpans[0]).text();
        const minutos = $(timeSpans[1]).text();
        const segundos = $(timeSpans[2]).text();
        
        // Extraemos la fecha del párrafo
        const fechaTexto = $('#cityClock p').text(); // "miércoles, febrero 11, 2026"

        // Construimos un objeto Date real para que SISOV PRO lo entienda
        // Nota: Al ser 2026, forzamos el año para evitar desfases
        const fechaISO = new Date(`${fechaTexto} ${horas}:${minutos}:${segundos} GMT-0400`);

        res.json({
            ok: true,
            hora: `${horas}:${minutos}:${segundos}`,
            fecha: fechaTexto,
            iso: fechaISO.toISOString(),
            unix: fechaISO.getTime()
        });

    } catch (error) {
        console.error('Error en el scrapeo:', error.message);
        res.status(500).json({ ok: false, error: 'No se pudo obtener la hora' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Ninja API activa en puerto ${PORT}`));