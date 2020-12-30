export default class RequestBuilder {
    constructor(url){
        this.url = new URL(url);
        this.init = {};
    }

    buildMethod(method = 'GET') {
        if(!method) return;

        this.init.method = method;
    }
    
    buildHeader(headers = [["Request-Ajax", "True"]]) {
        let myHeaders = new Headers();
        headers.forEach(header => {
            const [name, value] = header;
            myHeaders.append(name, value);            
        });
        
        this.init.headers = myHeaders;
    }

    buildParams(params) {
        if(!params) return;
        
        let paramList = params.split(' ');
        if(this.init.method === 'GET') {
            let urlSearch = new URLSearchParams();
            paramList.forEach(param => {
                let element = document.querySelector(`input[name="${param}"], textarea[name="${param}"]`);
                if(element.type === "text" || element.type === "password" || element.type === "textarea")
                    urlSearch.append(param, element.value);
                else if(element.type === "checkbox" || element.type === "radio") {
                    document.querySelectorAll(`input[name="${param}"]:checked`).forEach(box => {
                        urlSearch.append(param, box.value);
                    });
                }
            });

            this.url.search = urlSearch;
        }
        else {
            let token = document.querySelector("[name='authenticity_token']").value;
            this.init.headers.append('X-CSRF-Token', token);

            let paramsBody = new FormData();
            paramList.forEach(param => {
                let element = document.querySelector(`input[name="${param}"], textarea[name="${param}"]`);
                if(element.type === "text" || element.type === "password" || element.type === "textarea")
                    paramsBody.append(param, element.value);
                else if(element.type === "checkbox" || element.type === "radio") {
                    document.querySelectorAll(`input[name="${param}"]:checked`).forEach(box => {
                        paramsBody.append(param, box.value);
                    });
                }
                else if(element.type === "file")
                    paramsBody.append(param, element.files[0]);
            });

            this.init.body = paramsBody;
        }
    }

    getRequest() {
        return new Request(this.url, this.init);
    }
}