const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const cors = require('cors');

const app = express();
app.use(cors({ origin: '*', methods: ['GET'] }));

app.get('/hora-venezuela', async (req, res) => {
    try {
        const url = 'https://ww2.24timezones.com/Caracas/hora';
        
        const response = await axios.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
            }
        });

        const $ = cheerio.load(response.data);
        
        // Técnica Ninja 2: Extraer del objeto de configuración de la página
        // Buscamos el texto dentro de los scripts que contiene la hora inicial
        let horaExtraida = "";
        let fechaExtraida = "";

        $('script').each((i, el) => {
            const content = $(el).html();
            if (content && content.includes('curTime')) {
                // Buscamos el patrón de la hora en el script
                const match = content.match(/\"curTime\":\"(\d{1,2}):(\d{2}):(\d{2})[^\"]*\"/);
                if (match) horaExtraida = `${match[1]}:${match[2]}:${match[3]}`;
            }
        });

        // Si el script falla, usamos la hora actual del servidor de Railway pero ajustada a Vzla (GMT-4)
        // Esto es mucho más estable que el scraping del DOM dinámico
        const ahora = new Date();
        const offsetVzla = -4; // Venezuela es GMT-4
        const horaVzla = new Date(ahora.getTime() + (ahora.getTimezoneOffset() * 60000) + (offsetVzla * 3600000));

        const finalISO = horaVzla.toISOString();

        res.json({
            ok: true,
            hora: horaExtraida || horaVzla.toTimeString().split(' ')[0],
            fecha: horaVzla.toLocaleDateString('es-VE', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
            iso: finalISO,
            unix: horaVzla.getTime()
        });

    } catch (error) {
        res.status(500).json({ ok: false, error: error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`API SISOV PRO en puerto ${PORT}`));