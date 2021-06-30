let app = (function () {

    const Three = require("three-js");
    const $ = require("jquery");
    return {
      three : Three,
      jquery : $
    }
    
})();
  
module.exports = app;