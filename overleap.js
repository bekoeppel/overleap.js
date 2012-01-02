/**
 * overleap.js
 * Author: Benedikt Koeppel, code@benediktkoeppel.ch, http://benediktkoeppel.ch
 * Licence: GNU GPL v3
 */
function getBrowserHeight() {
    var myHeight = 0;
 
    if( typeof( window.innerWidth ) == 'number' ) {
        //Non-IE
        myHeight = window.innerHeight;
    } else if( document.documentElement && ( document.documentElement.clientWidth || document.documentElement.clientHeight ) ) {
        //IE 6+ in 'standards compliant mode'
        myHeight = document.documentElement.clientHeight;
    } else if( document.body && ( document.body.clientWidth || document.body.clientHeight ) ) {
        //IE 4 compatible
        myHeight = document.body.clientHeight;
    }
    return myHeight;
}

function getVerticalOffset() {
    var scrOfY = 0;
 
    if( typeof( window.pageYOffset ) == 'number' ) {
        //Netscape compliant
        scrOfY = window.pageYOffset;
    } else if( document.body && ( document.body.scrollLeft || document.body.scrollTop ) ) {
        //DOM compliant
        scrOfY = document.body.scrollTop;
    } else if( document.documentElement && ( document.documentElement.scrollLeft || document.documentElement.scrollTop ) ) {
        //IE6 standards compliant mode
        scrOfY = document.documentElement.scrollTop;
    }
    return scrOfY;
}

var lastVerticalOffset = 0;

function overleapExpandSpacer() {
    var thisVerticalOffset = getVerticalOffset();
    var deltaVerticalOffset = thisVerticalOffset-lastVerticalOffset;

    var spacer = document.getElementById("overleapSpacer");
    var newSpacerHeight = 0;

    var totalDocumentHeight = document.body.offsetHeight;
    var bareDocumentHeight = totalDocumentHeight - parseInt(spacer.style.height);

    var browserHeight = getBrowserHeight();

    // if we are within the 2nd last "page" of the document, we add the scroll-value to the spacer, until we have exactly one empty "page" at the bottom
    if(bareDocumentHeight - thisVerticalOffset < browserHeight*2) {
        newSpacerHeight = parseInt(spacer.style.height) + deltaVerticalOffset;
        if(newSpacerHeight > browserHeight) {
            newSpacerHeight = browserHeight;
        }
    }
    spacer.style.height = newSpacerHeight + "px";
    lastVerticalOffset = thisVerticalOffset;;

    document.getElementById("overleapNotification").innerHTML = bareDocumentHeight + "+" + newSpacerHeight + "=" + totalDocumentHeight + "@" + thisVerticalOffset;

}

function overleapInit() {
    // initial vertical offset, i.e. where we jump into this document right at load
    lastVerticalOffset = document.body.offsetHeight;
    // set spacer to the appropriate height at load
    overleapExpandSpacer();
    // set onscroll handler
    window.onscroll=overleapExpandSpacer;
}
window.onload=overleapInit;
