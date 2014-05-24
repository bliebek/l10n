;(function(root){

    var locale = {},
        translations = {},
        lang,
        GetText = function(){};

    GetText.prototype._paramsReplacer = function(params, m, i){
        return typeof params[i] !== 'undefined' ? params[i] : '';
    };

    GetText.prototype._noKeyOrTranslation = function(key, translation){
        return key === '' || key === undefined || key === null || key === false || translation === undefined;
    };

    GetText.prototype._replaceParams = function(message, params){
        var me = this,
            formatRe = /\{(\d+)\}/g;

        return message.replace(formatRe, me._paramsReplacer.bind(me, params));
    };

    GetText.prototype._pluralize = function(message){
        var me = this,
            formatRe = /\[\[([^\[\]]+)\]\]+/g,
            blocks = [],
            map = {};

        blocks = me._getAllMatches(message, formatRe);
        map = me._createPluralizeMap(blocks);

        console.log('BLOCKS:', blocks);
        console.log('MAP:', map);
        console.log('MESSAGE: ', message);
        return me._replaceWithPlural(message, blocks, map);
    };

    GetText.prototype._getAllMatches = function(message, formatRe){
        var blocks = [],
            row = [];

        while((row = formatRe.exec(message)) !== null){
            blocks.push(row);
        }

        return blocks;
    };

    GetText.prototype._createPluralizeMap = function(blockList){
        var map = {};

        blockList.forEach(function(row){
            var versions;
            versions = row[1].substring(row[1].indexOf(' ')+1).split('|');

            map[row[0]] = {
                '1': versions[0],
                '2': versions[1]
            };
        });

        return map;
    };

    GetText.prototype._replaceWithPlural = function(message, blocks, map){
        console.log('_rWP: ', message, blocks, map);
        blocks.forEach(function(block){
            message = message.replace(block[1], '...');
        });
        //var replacement =

        return message;
    };

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

    GetText.prototype.noTranslationHandler = function(str){
        return string;
    };

    GetText.prototype.attach = function(root){
        var me = this;

        root._ = me._.bind(me);
    };

    GetText.prototype._ = function (string) {

        var me = this,
            localizedMessage = locale.data[string];

        if(me._noKeyOrTranslation(string, localizedMessage)){
            return me.noTranslationHandler();
        }

        //return me._pluralize(me._replaceParams(localizedMessage, Array.prototype.slice.apply(arguments, [1])));
        return me._replaceParams(localizedMessage, Array.prototype.slice.apply(arguments, [1]));
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