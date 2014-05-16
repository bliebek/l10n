;(function(root){

    var locale = {},
        translations = {},
        lang,
        GetText = function(){};

    GetText.prototype.addTranslation = function(lang, obj){
        translations[lang] = obj;
    };

    GetText.prototype.getTranslation = function(lang){
        return lang ? translations[lang] : translations;
    };

    GetText.prototype.setLang = function(isoLang){
        lang = isoLang;
        locale = translations[lang];
    };

    GetText.prototype.getLang = function(){
        return lang;
    };

    GetText.prototype._ = function (string) {

        var localizedMessage = locale.data[string],
            formatRe = /\{(\d+)\}/g,
            params = Array.prototype.slice.apply(arguments, [1]);

        if( string === '' || string === undefined || string === null || string === false){
            return '';
        }
        if(localizedMessage === undefined){
            return string;
        }

        localizedMessage = localizedMessage.replace(formatRe, function(m, i) {
            return typeof params[i] !== 'undefined' ? params[i] : '';
        });

        return localizedMessage;
    };

    if(typeof define === 'function' && define.amd){
        define('gettext', [], function(){
            return new GetText();
        });
    }else if(typeof module === "object" && typeof module.exports === "object"){
        module.exports = new GetText();
    }else{
        root.gettext = new GetText();
    }

})(window);