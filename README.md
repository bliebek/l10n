Simple gettext implementation for JS

## Usage ##

Create file with translations:

```javascript
var obj = {
    'language': 'en_GB',                      // ISO language code should be placed here
    'name': 'English',                        // localized language name should be placed here
    'decimalSeparator': '.',                  // a separator for decimal part in numbers
    'thousandSeparator': ' ',                 // a separator for thousands in numbers

    // ... any other metedata needed for a given language

    'data': {
        'translationKey': 'Translated text',

        // ...
    }
}
```

Add translation:
```javascript
gettext.addTranslation('en_GB', obj);
```

Set language:
```javascript
gettext.setLang('en_GB');
```

Use gettext function across the app:
```javascript
gettext.attach(window); // very handy, allows to use global _ function instead of gettext._
var translatedText = _('translationKey');
```

## Basic features ##

Variables support:
```javascript
// ...
// 'translationKey': 'Translated text with variables: {{0}} {{1}} {{2}}'
//
var translatedTextWithVariables = _('translationKeyWithVariables', 'string', 0, 'any other variable');
```

## TODO ##
1. Implement pluralizer.