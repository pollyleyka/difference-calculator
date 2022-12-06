import parseFile from './parsers.js';
import compare from './compare.js';

export default (...files) => {
  const [fileData1, fileData2] = files.map(parseFile);
  console.log(fileData1, fileData2);
  const gendiffResult = compare(fileData1, fileData2);
  console.log(gendiffResult);
  return gendiffResult;
};
