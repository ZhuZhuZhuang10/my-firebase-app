import requests
from flask import Flask, request, jsonify

app = Flask(__name__)

# Замените HOST на ваш домен или IP-адрес V2Ray сервера
V2RAY_HOSTNAME = 'rue2.dry-ghd.top'
V2RAY_PORT = '11111'

@app.route('/', defaults={'path': ''}, methods=['GET', 'POST', 'PUT', 'DELETE', 'PATCH'])
@app.route('/<path:path>', methods=['GET', 'POST', 'PUT', 'DELETE', 'PATCH'])
def proxy(path):
    try:
        # Создаем URL для V2Ray сервера
        url = f'http://{V2RAY_HOSTNAME}:{V2RAY_PORT}/{path}'
        headers = {key: value for key, value in request.headers.items()}
        body = request.get_data()

        # Отправляем запрос к V2Ray серверу
        resp = requests.request(
            method=request.method,
            url=url,
            headers=headers,
            data=body,
            cookies=request.cookies,
            allow_redirects=False
        )

        # Создаем ответ для клиента
        return (resp.content, resp.status_code, dict(resp.headers))
    except Exception as e:
        return jsonify(error=str(e)), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080)
