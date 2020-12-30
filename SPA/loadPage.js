import HTMLNotFoundError from './HTMLNotFoundError'

export default function loadPage(request) {
    return fetch(request).then(response => {
        let url = response.url;
        return response.blob().then(blob => {
            if(blob.type === "text/html") return blob.text();
            else throw new HTMLNotFoundError("Conteúdo resposta não suportado!", blob);
        }).then(html => {
            let parser = new DOMParser();
            let parsedPage = parser.parseFromString(html, "text/html");
            return {parsedPage, url};
        });
    });
}