import RequestBuilder from './RequestBuilder'
import SPA from './SPA'

const sleep = milliseconds => {
    return new Promise(resolve => {setTimeout(resolve, milliseconds)});
}

window.addEventListener("load", () => {
    history.replaceState({position: 0}, null, window.location.href);
    const spa = new SPA();

    document.addEventListener("click", async event => {
        let element = event.target;
        while(element && !element.hasAttribute("data-page-transition"))
            element = element.parentNode;
        
        if(element) {
            event.preventDefault();

            if(element === document.querySelector(".icon-bar .active")) return;

            if(element.hasAttribute("data-timeout")) await sleep(element.getAttribute("data-timeout"));

            let url;
            if(element.hasAttribute("href")) url = element.href;
            else {
                let elem = element;
                while(!elem.hasAttribute("action")) elem = elem.parentNode;
                url = elem.action;
            }
            
            let builder = new RequestBuilder(url);
            builder.buildHeader();
            builder.buildMethod(element.getAttribute("data-http-method"));
            builder.buildParams(element.getAttribute("data-params"));            
            let request = builder.getRequest();

            spa.changePage(request, element.getAttribute("data-page-transition"));
        }
    });

    window.addEventListener("popstate", () => {
        let transition;
        if(history.state.position < spa.currentPagePosition) {
            if(history.state.nextPageTransition === 'right') transition = 'left';
            else if(history.state.nextPageTransition === 'left') transition = 'right';
        }
        else transition = history.state.transition;
        
        let builder = new RequestBuilder(window.location.href);
        builder.buildHeader();
        builder.buildMethod();
        let request = builder.getRequest();

        spa.changePage(request, transition, "popstate");
    });
});