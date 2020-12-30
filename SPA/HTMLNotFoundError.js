export default class HTMLNotFoundError extends Error {
    constructor(message, response) {
        super(message);
        this.response = response;
    }

    javascriptCheck() {
        return (this.response.type === 'text/javascript');
    }

    getJavascript() {
        return this.response.text();
    }
}