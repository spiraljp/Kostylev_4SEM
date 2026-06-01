class Ajax {
    async get(url, callback) {
        await this._request(url, { method: 'GET' }, callback);
    }

    async post(url, data, callback) {
        await this._request(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        }, callback);
    }

    async patch(url, data, callback) {
        await this._request(url, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        }, callback);
    }

    async delete(url, callback) {
        await this._request(url, { method: 'DELETE' }, callback);
    }

    async _request(url, options, callback) {
        try {
            const response = await fetch(url, options);
            const text = await response.text();
            const data = text ? JSON.parse(text) : null;

            callback(data, response.status);
        } catch (error) {
            console.error('Ошибка запроса:', error);
            callback(null, 500);
        }
    }
}

export const ajax = new Ajax();
