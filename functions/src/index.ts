import * as functions from 'firebase-functions';
import nodeFetch from 'node-fetch';

export const handleRequest = functions.https.onRequest(async (req: functions.Request, res: functions.Response) => {
  try {
    let url = new URL(req.url);
    url.protocol = 'http';
    url.hostname = 'rue2.dry-ghd.top'; // Замените на ваш домен V2Ray сервера
    url.port = '11111'; // Укажите порт вашего V2Ray сервера

    let upstream = new URL(url.toString());
    let response = await nodeFetch(upstream.toString(), {
      method: req.method,
      headers: req.headers as any,
      body: req.method === 'POST' ? (req as any).body : undefined
    });

    const responseBody = await response.text();
    res.status(response.status).send(responseBody);
  } catch (error) {
    res.status(500).send((error as Error).toString());
  }
});
