export function getValueByPath(obj, path) {
  const value = path.split('.').reduce((o, i) => o[i], obj);
  return value;
}
export function roundUp(num, precision) {
  if (!precision) precision = 0;
  precision = Math.pow(10, precision);
  return Math.ceil(num * precision) / precision;
}
// Source: http://www.bennadel.com/blog/1504-Ask-Ben-Parsing-CSV-Strings-With-Javascript-Exec-Regular-Expression-Command.htm
// Live Demo: https://jsfiddle.net/sturtevant/AZFvQ/

function csv2Array(strData, strDelimiter) {
  strDelimiter = strDelimiter || ',';
  var objPattern = new RegExp(
    '(\\' +
      strDelimiter +
      '|\\r?\\n|\\r|^)' +
      '(?:"([^"]*(?:""[^"]*)*)"|' +
      '([^"\\' +
      strDelimiter +
      '\\r\\n]*))',
    'gi'
  );
  var arrData = [[]];
  var arrMatches = null;
  while ((arrMatches = objPattern.exec(strData))) {
    var strMatchedDelimiter = arrMatches[1];
    if (strMatchedDelimiter.length && strMatchedDelimiter != strDelimiter) {
      arrData.push([]);
    }
    if (arrMatches[2]) {
      var strMatchedValue = arrMatches[2].replace(new RegExp('""', 'g'), '"');
    } else {
      var strMatchedValue = arrMatches[3];
    }
    arrData[arrData.length - 1].push(strMatchedValue);
  }
  return arrData;
}

export function csv2Json(csv) {
  var array = csv2Array(csv);
  var objArray = [];
  for (var i = 1; i < array.length; i++) {
    objArray[i - 1] = {};
    for (var k = 0; k < array[0].length && k < array[i].length; k++) {
      var key = array[0][k];
      if (
        array[i][k] &&
        (array[i][k].match(/^-{0,1}\d+$/) || array[i][k].match(/^\d+\.\d+$/))
      ) {
        array[i][k] = Number(array[i][k]);
      }
      objArray[i - 1][key] = array[i][k];
    }
  }
  //   var json = JSON.stringify(objArray);
  //   var str = json.replace(/},/g, '},\r\n');
  return objArray;
}

export default { getValueByPath, csv2Json };
