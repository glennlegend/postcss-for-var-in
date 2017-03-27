const atImport = require('postcss-import');

module.exports = {
  'postcss-for-var-in': {
    'basic/test': {
      message: 'imports and replace css'
    },
    'multiple-vars/test': {
      message: 'imports and replace multiple vars css'
    },
    'multiple-rules/test': {
      message: 'multiple forVar in one css'
    },
    'other-var-names/test': {
      message: 'should work with different var names'
    },
    'malformed-import-syntax/test': {
      message: 'should fail on malformed import syntax',
      error: {
        reason: "Malformed forVar statement. Should be: @forVar $name, $value in @import 'name-of-css-file.css'"
      }
    },
    'malformed-var-syntax/test': {
      message: 'should fail on malformed var syntax',
      error: {
        reason: "Malformed forVar statement. Should be: @forVar $name, $value in @import 'name-of-css-file.css'"
      }
    },
  }
}
