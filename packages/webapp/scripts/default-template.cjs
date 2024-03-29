const path = require('node:path');

/**
 * See https://react-svgr.com/docs/custom-templates/
 * */
function indexTemplate(filePaths) {
  const exportEntries = filePaths.map(({ path: filePath }) => {
    const basename = path.basename(filePath, path.extname(filePath));
    const exportName = /^\d/.test(basename) ? `Svg${basename}` : basename;
    return `export { default as Custom${exportName} } from './${basename}'`;
  });
  return exportEntries.join('\n');
}

module.exports = indexTemplate;
