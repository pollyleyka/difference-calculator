import path from 'path';
import {
  parseFiles,
} from './parsers.js';
import compare from './compare.js';

export default (...files) => {
  const getExtention = (file) => path.extname(path.basename((file)));
  if (getExtention(files[0]) !== getExtention(files[1])) {
    console.log('Ошибка: разные форматы файлов');
    return 'EROR';
  }
  const [fileData1, fileData2] = parseFiles(files);
  const gendiffResult = compare(fileData1, fileData2);
  console.log(gendiffResult);
  return gendiffResult;
};
