var postcss = require('postcss');
var atImport = require('postcss-import');
var makeVars = require('postcss-simple-vars');
var path = require('path');
var fs = require('fs');

const promises = [];

function getParts(params, rule) {
  const match = params.match(/\$(\w+),? \$(\w+) in (@import.*)$/);
  if(match && match.length === 4) {
    const keyName = match[1];
    const valueName = match[2];
    return {
      values: {
        keyName,
        valueName,
      },
      importRule: match[3]
    };
  } else {
    throw rule.error('Malformed forVar statement. Should be: @forVar $name, $value in @import \'name-of-css-file.css\'');
  }
}

module.exports = postcss.plugin('postcss-for-var-in', (opts = {}) => {
  return (root, result) => {
    let isRule = false;
    root.walkAtRules(function (rule, index) {
      if ( rule.name === 'forVar' ) {
        promises.push(new Promise((resolve, reject) => {
          const parts = getParts(rule.params, rule);
          if (parts) {
            const { values, importRule } = parts;
            const file = rule.source.input.file ?
                         path.resolve(rule.source.input.file) :
                         opts.from
            const dir = fs.lstatSync(file).isDirectory() ?
                        file :
                        path.dirname(file);
            postcss()
              .use(atImport({
                root: dir
              }))
              .process(importRule)
              .then(res => {
                res.root.nodes[0].nodes.map(decl => {
                  var content = rule.clone();
                  var { prop: name, value } = decl;
                  name = name.replace('--', '');
                  const vars = { [values.keyName]: name, [values.valueName]: value };
                  makeVars({ only: vars })(content);
                  rule.parent.insertBefore(rule, content.nodes);
                });
                if (rule.parent) {
                  rule.remove();
                }
                resolve();
              }).catch(e => {
                throw new Error(e);
              })
          }
        }))
      }
    });
    return Promise.all(promises);
  }
});
