const express = require('express');
const axios = require('axios');

const app = express();

// Замените HOST на ваш домен или IP-адрес V2Ray сервера
const V2RAY_HOSTNAME = 'rue2.dry-ghd.top';
const V2RAY_PORT = '11111';

app.all('/*', async (req, res) => {
    try {
        // Создаем URL для V2Ray сервера
        const url = `http://${V2RAY_HOSTNAME}:${V2RAY_PORT}${req.path}`;
        const headers = req.headers;
        const body = req.body;

        // Отправляем запрос к V2Ray серверу
        const resp = await axios({
            method: req.method,
            url: url,
            headers: headers,
            data: body,
            maxRedirects: 0
        });

        // Отправляем ответ клиенту
        res.status(resp.status).set(resp.headers).send(resp.data);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
