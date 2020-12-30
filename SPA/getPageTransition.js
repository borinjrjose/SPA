export default function getPageTransition(transition) {
    let pageTransition;
    if(transition === 'left') pageTransition = transitionLeft;
    else if(transition === 'right') pageTransition = transitionRight;
    return pageTransition;
}

const transitionLeft = (oldPage, newPage) => {
    return new Promise(resolve => {        
        oldPage.animate([
            { transform: 'translateX(0%)' },
            { transform: 'translateX(100%)' }
        ], 300).onfinish = () => {
            oldPage.remove();
            resolve();
        }
        
        newPage.animate([
            { transform: `translate(-100%, -${oldPage.offsetHeight}px)` },
            { transform: `translate(0%, -${oldPage.offsetHeight}px)` }
        ], 300);
    });
}

const transitionRight = (oldPage, newPage) => {
    return new Promise(resolve => {        
        newPage.animate([
            { transform: `translate(100%, -${oldPage.offsetHeight}px)` },
            { transform: `translate(0%, -${oldPage.offsetHeight}px)` }
        ], 300);
        
        oldPage.animate([
            { transform: 'translateX(0%)' },
            { transform: 'translateX(-100%)' }
        ], 300).onfinish = () => {
            oldPage.remove();
            resolve();
        }
    });
}