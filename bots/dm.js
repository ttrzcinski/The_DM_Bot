'use strict';

class DM {
    // TODO Add list of last known requests and response
    
    constructor(name) {
        this.name = name;
        // TODO Add call to 'Your name will be xxxx.'
    }

    // TODO Add method to put request and return after processing a response
    ask(request) {
        var responseInText = 'notImplementedYet';
        var imageMimeType = 'image/jpeg';
        var imageUrl = 'https://3.bp.blogspot.com/-1OjnKgn1QDM/V31R4_2zYGI/AAAAAAAAG_I/us2HT_7MzL0INCe5_7pPDJx49tpCHnj9wCLcB/s1600/repeating-svg-vector-with-misc-rectangle-shapes.jpg';

        switch (request) {
            case "what's your name?":
                response = this.name;
                break;
        }

        return [responseInText, imageMimeType, imageUrl];
    }

    test() {
        return "works";
    }

    // TODO Add method to call for debug responsing with whole object as a structure of data
}

// let dm = new DM('The_DM');
//export {DM};
// TODO maybe this?!
export default DM;