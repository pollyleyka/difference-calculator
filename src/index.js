import parseFile from './parsers.js';
import compare from './compare.js';

export default (file1, file2) => {
  const files = [file1, file2];
  const [fileData1, fileData2] = files.map(parseFile);
  const gendiffResult = compare(fileData1, fileData2);
  console.log(gendiffResult);
  return gendiffResult;
};
