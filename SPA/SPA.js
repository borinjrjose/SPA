import loadPage from './loadPage'
import getPageTransition from './getPageTransition'
import PageInserter from './PageInserter'
import Semaphore from './Semaphore'
import updateFooter from './updateFooter'
import HTMLNotFoundError from './HTMLNotFoundError'

export default class SPA {
    constructor() {
        this.semaphore = new Semaphore();
        this.currentPagePosition = 0;
    }

    async changePage(request, transition, ...args) {
        try {
            let {parsedPage, url} = await loadPage(request);

            if(args[0] !== "popstate") this.updateHistory(url, transition);
            this.currentPagePosition = history.state.position;

            let inserter = new PageInserter(parsedPage);
            let transitionProcess = this.getTransitionProcess(inserter, transition);

            this.semaphore.P(transitionProcess);
        } catch(err) {
            if(err instanceof HTMLNotFoundError) {
                if(err.javascriptCheck())
                    PageInserter.insertResponseScript(await err.getJavascript());
                else
                    alert(err.message.concat("\nConteúdo: ".concat(err.response.type)));
            }
            else {
                console.log(err);
            }
        };
    }

    getTransitionProcess(inserter, transition) {
        const transitionProcess = async () => {
            const {oldPage, newPage} = await inserter.insertPage();
            inserter.insertScripts();

            getPageTransition(transition)(oldPage, newPage).then(() => {
                this.semaphore.V();
            });

            updateFooter();
        };

        return transitionProcess;
    }

    updateHistory(url, transition) {
        history.replaceState({
            position: history.state.position,
            transition: history.state.transition,
            nextPageTransition: transition
        }, null, window.location.href);

        history.pushState({
            position: history.state.position+1,
            transition: history.state.nextPageTransition,
            nextPageTransition: null                
        }, null, url);
    }
}