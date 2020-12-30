export default class PageInserter {
    constructor(parsedPage) {
        this.parsedPage = parsedPage;
    }

    insertPage() {
        return new Promise(resolve => {
            let newPage = this.parsedPage.querySelector("section");
            let oldPage = document.querySelector("section");
            oldPage.insertAdjacentElement("afterend", newPage);

            let pages = {oldPage, newPage};
            resolve(pages);
        });
    }

    insertScripts() {
        document.querySelectorAll("script").forEach(element => {
            element.remove();
        });

        this.parsedPage.querySelectorAll("script").forEach(element => {
            let script = document.createElement("script");
            script.innerText = element.innerText;
            script.src = element.src;
            if(!script.src.includes("application")) document.querySelector("head").insertAdjacentElement("beforeend", script);
        });
    }

    static insertResponseScript(js) {
        let script = document.createElement("script");
        script.innerText = js;
        document.querySelector("head").insertAdjacentElement("beforeend", script);
    }
}