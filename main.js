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


  console.log(el[0]);

  console.log(el[1]);

  console.log(lim);

  console.log(sub);
  












  let colAll = lim.reduce(function (x, y) { return x + y });

  let html = {};
  html[0] = ce(['table', 'border="1']);
  html[0][1][0] = ce(['tr']);
  html[0][1][0][1][0] = ce(['td', 'rowspan="2"'], '科目');
  html[0][1][0][1][1] = ce(['td', 'colspan="' + colAll + '"'], '提出期限');
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

      //let prg = 0;

      for (let rptCnt = 0; rptCnt < sub[subCnt].rpt[limCnt + 5]; rptCnt++) {
        
        
        html[0][1][(subCnt + 1) * 2 + 1][1][idx - 1] = ce(['td'], sub[subCnt].prg[prg]);
        
        prg += 1;
        
        html[0][1][(subCnt + 1) * 2][1][idx++] = ce(['td'], rpt++);

        

      }

      for (let rptCnt = 0; rptCnt < lim[limCnt] - sub[subCnt].rpt[limCnt + 5]; rptCnt++) {

        html[0][1][(subCnt + 1) * 2 + 1][1][idx - 1] = '';


        html[0][1][(subCnt + 1) * 2][1][idx++] = ce(['td'], '');
      }

      console.log(rpt);

    }

  }




  // for (let subCnt = 0; subCnt < sub.length; subCnt++) {

  //   for ()
  // }




  console.log(html);




  function ce(tag, inner = null) {
    if (inner === null) {
      return [tag, {}];
    } else {
      return [tag, inner];
    }
  }

  

}, false);