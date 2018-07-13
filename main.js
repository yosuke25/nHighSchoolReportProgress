window.addEventListener('load', function () {

  let sub = [];

  let el = [];
  el[0] = document.getElementsByClassName('subject_1st_row');
  el[1] = document.getElementsByClassName('subject_2st_row');

  let lim = [];

  for (let subCnt = 0; subCnt < el[0].length; subCnt++) {

    let ch = [];
    ch[0] = el[0][subCnt].childNodes;
    ch[1] = el[1][subCnt * 2].childNodes;

    sub[subCnt] = {};
    sub[subCnt].prg = [];
    sub[subCnt].rpt = {
      5: 0,
      6: 0,
      7: 0,
      8: 0,
      9: 0,
      10: 0,
      11: 0,
      12: 0
    };

    sub[subCnt].name = ch[0][1].innerHTML.split('<br>')[0];

    for (let chCnt = 0; chCnt < ch[0].length; chCnt++) {
      let chTxt = ch[0][chCnt].innerText;
      if ((ch[0][chCnt].className === 'report_limit_date') && (chTxt !== '-')) {
        sub[subCnt].rpt[Number(chTxt.split('/')[0])]++;
      }
    }

    for (let chCnt = 0; chCnt < ch[1].length; chCnt++) {
      let chTxt = ch[1][chCnt].innerText;
      if ((ch[1][chCnt].className === 'report_progress') && (chTxt.substr(-1, 1) === '%' && chTxt !== '-')) {
        sub[subCnt].prg.push(chTxt);
      }
    }

  }

  for (let rptCnt = 0; rptCnt < 8; rptCnt++) {
    let cnt = 0;
    for (let subCnt = 0; subCnt < el[0].length; subCnt++) {
      let rpt = sub[subCnt].rpt[rptCnt + 5];
      if (rpt > cnt) {
        cnt = rpt;
      }
    }
    lim.push(cnt);
  }

  let html = {};
  html[0] = ce(['table', 'border="1"']);
  html[0][1][0] = ce(['tr']);
  html[0][1][0][1][0] = ce(['td', 'rowspan="2"'], '科目');
  html[0][1][0][1][1] = ce(['td', 'colspan="' + lim.reduce(function (x, y) { return x + y }) + '"'], '提出期限');
  html[0][1][1] = ce(['tr']);

  for (let limCnt = 0; limCnt < lim.length; limCnt++) {
    html[0][1][1][1][limCnt] = ce(['td', 'colspan="' + lim[limCnt] + '"'], limCnt + 5 + '/15');
  }

  for (let trCnt = 0; trCnt < sub.length * 2; trCnt++) {
    html[0][1][trCnt + 2] = ce(['tr']);
  }

  for (let subCnt = 0; subCnt < sub.length; subCnt++) {

    let idx = 0;
    let rpt = 1;

    html[0][1][(subCnt + 1) * 2][1][idx++] = ce(['td', 'rowspan="2"'], sub[subCnt].name);

    for (let limCnt = 0, prg = 0; limCnt < 8; limCnt++) {

      for (let rptCnt = 0; rptCnt < sub[subCnt].rpt[limCnt + 5]; rptCnt++) {
        html[0][1][(subCnt + 1) * 2 + 1][1][idx - 1] = ce(['td'], sub[subCnt].prg[prg++]);
        html[0][1][(subCnt + 1) * 2][1][idx++] = ce(['td'], String(rpt++));
      }

      for (let rptCnt = 0; rptCnt < lim[limCnt] - sub[subCnt].rpt[limCnt + 5]; rptCnt++) {
        html[0][1][(subCnt + 1) * 2 + 1][1][idx - 1] = ce(['td'], ' ');
        html[0][1][(subCnt + 1) * 2][1][idx++] = ce(['td'], ' ');
      }

    }

  }




  console.log(html);

  console.log(createHTML(html));


  //console.log(isObject([]));

  // console.log(createHTML({
  //   0: [['dir'], 'hoge']
  // }));





  function ce(tag, inner = null) {
    if (inner === null) {
      return [tag, {}];
    } else {
      return [tag, inner];
    }
  }


  function createHTML(object) {

    let html = '';

    if (object && isObject(object)) {


      let childElement = objectLength(object);

      console.log(childElement);

      for (let childElementCount = 0; childElementCount < childElement; childElementCount++) {

        if (object[childElementCount]) {

          if (object[childElementCount][0]) {

            let tag = object[childElementCount][0];

            if (isArray(tag)) {

              if (tag[0] && isString(tag[0])) {
                html += '<' + tag[0];

                if (tag[1]) {
                  if (isString(tag[1])) {
                    html += ' ' + tag[1];
                  } else {
                    throw new Error('Attribute is not a string; object[' + childElementCount + '][0][1]');
                  }
                }

                html += '>';



                if (object[childElementCount][1]) {
                  let inner = object[childElementCount][1];
                  if (isObject(inner)) {
                    html += createHTML(inner);
                  } else if (isString(inner)) {
                    html += inner;
                  } else {
                    throw new Error('inner is neither an object nor a string: object[' + childElementCount + '][1]')
                  }
                } else {

                  //console.log(object[childElementCount][1]);

                  throw new Error('inner is false: object[' + childElementCount + '][1]');
                  return;
                }


                html += '</' + tag[0] + '>';




              } else {
                throw new Error('Tag name is false or not a string: object[' + childElementCount + '][0][0]');
                return;
              }
            } else {
              throw new Error('Tag is not an array: object[' + childElementCount + '][0]');
              return;
            }
          } else {
            throw new Error('Tag is false: object[' + childElementCount + '][0]');
            return;
          }
        } else {
          throw new Error('Element is false: object[' + childElementCount + ']');
          return;
        }











      }


    } else {
      throw new Error('Argument is false or not an object');
      return;
    }









    // if (isArray(object[0])) {
    //   html += '<' + 
    // }

    // let childElement = objectLength(object);

    // for (var childElementCount = 0; childElementCount < childElement; childElementCount++) {






    // }

    return html;


  }











  function isArray(object) {
    if ((object !== null) && (typeof object === 'object') && object.length) {
      return true;
    } else {
      return false;
    }
  }

  function isObject(object) {
    if ((object !== null) && (typeof object === 'object') && (object.length === undefined)) {
      return true;
    } else {
      return false;
    }
  }

  function isString(string) {
    if (typeof string === 'string') {
      return true;
    } else {
      return false;
    }
  }

  function objectLength(object) {
    return Object.keys(object).length;
  }


}, false);