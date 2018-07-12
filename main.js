window.addEventListener('load', function () {

  var sub = [];

  var el = [];
  el[0] = document.getElementsByClassName('subject_1st_row');
  el[1] = document.getElementsByClassName('subject_2st_row');

  var lim = [1, 1, 1, 1, 1, 1, 1, 1];

  //var html = {};
  //html.tr = [];

  for (var subCnt = 0; subCnt < el[0].length; subCnt++) {

    sub[subCnt] = {};
    sub[subCnt].lim = [];
    sub[subCnt].prg = [];
    sub[subCnt].rpt = [1, 1, 1, 1, 1, 1, 1, 1];

    var ch = [];
    ch[0] = el[0][subCnt].childNodes;
    ch[1] = el[1][subCnt * 2].childNodes;

    sub[subCnt].name = ch[0][1].innerHTML.split('<br>')[0];

    for (var chCnt = 0; chCnt < ch[0].length; chCnt++) {
      if (ch[0][chCnt].className === 'report_limit_date' && ch[0][chCnt].innerText !== '-') {

        var chTxt = ch[0][chCnt].innerText;
        var limTxt = sub[subCnt].lim[sub[subCnt].lim.length - 1];

        //console.log(chTxt);
        //console.log(limTxt);

        if (chTxt === limTxt) {

          var num = Number(chTxt.split('/')[0]) - 5;
          
          sub[subCnt].rpt[num]++;

          if (sub[subCnt].rpt[num] > lim[num]) {
            lim[num]++;
          }
        }
        sub[subCnt].lim.push(chTxt);
      }
    }

    for (var chCnt = 0; chCnt < ch[1].length; chCnt++) {
      var chTxt = ch[1][chCnt].innerText;
      if (ch[1][chCnt].className === 'report_progress' && chTxt.substr(-1, 1) === '%' && chTxt !== '-') {
        sub[subCnt].prg.push(chTxt);
      }
    }
    
  }

  
  console.log(sub);

  // var html = {
  //   0: [['table', 'border="1"'], {
  //     0: [['tr'], {
  //       0: [['td', 'rowspan="2'], '科目'],
  //       1: [['td', 'colspan="' + lim.reduce(function(x, y) { return x + y; }) + '"'], '提出期限']
  //     }],
  //     1: [['tr'], {

  //     }]
  //   }]
  // };
  
  var colAll = lim.reduce(function (x, y) { return x + y });
  
  var html = {};
  html[0] = ce(['table', 'border="1']);
  html[0][1][0] = ce(['tr']);
  html[0][1][0][1][0] = ce(['td', 'rowspan="2"'], '科目');
  html[0][1][0][1][1] = ce(['td', 'colspan="' + colAll + '"'], '提出期限');
  html[0][1][1] = ce(['tr']);


  for (var limCnt = 0; limCnt < lim.length; limCnt++) {
    html[0][1][1][1][limCnt] = ce(['td', 'colspan="' + lim[limCnt] + '"'], limCnt + 5 + '/15');
  }

  for (var rowCnt = 0; rowCnt < sub.length * 2; rowCnt++) {
    html[0][1][rowCnt + 2] = ce(['tr']);
  }















  for (var subCnt = 0; subCnt < sub.length; subCnt++) {
  
    
    html[0][1][subCnt + 2] = ce(['tr']);

    var idxCnt = 0;

    var test = ce(['td', 'rowspan="2"'], sub[subCnt].name);

    console.log(test);
    console.log((subCnt + 1) * 2);

    var num = (subCnt + 1) * 2; 
    // 0 1 2 3 4  5  6
    // 2 4 6 8 10 12 14
//    html[0][1][num/*(subCnt + 1) * 2*/][1][idxCnt++] = test;
    html[0][1][num/*(subCnt + 1) * 2*/][1][0] = test;


    // for (var rptCnt = 0; rptCnt < colAll; rptCnt++) {

    
    //   for ()
    //   //var test = lim[rptCnt] - sub[rptRowCnt].rpt[rptCnt];

    //   //console.log(test);




    //   for (var i = 0; i < sub[subCnt].rpt[rptCnt]; i++) {
    //     html[0][1][(subCnt + 1) * 2][1][c++] = ce(['td'], String(i + 1));
    //   }




    // }

  }

  // for (var subCnt = 0; subCnt < sub.length; subCnt++) {
    
  //   html[0][1][subCnt + 2] = ce(['tr']);
  //   //html[0][1][subCnt + 2][1][0] = ce(['td', 'rowspan="2"'], sub[subCnt].name);
  //   for (var rptCnt = 0; rptCnt < colAll + 1; rptCnt++) {
  //     if (rptCnt === 0) {
  //       html[0][1][subCnt + 2][1][0] = ce(['td', 'rowspan="2"'], sub[subCnt].name);
  //     }
      
  //   }

    

  // }

  


  console.log(html);




  function ce(tag, inner = null) {
    if (inner === null) {
      return [tag, {}];
    } else {
      return [tag, inner];
    }
  }
  



/*

  html = add(html, 0, ce('table', 'border="1'));

  console.log(html);




  

  var table = ce('table');
  table.setAttribute('border', 1);

  var tr = ce('tr');
  for (var i = 0; i < 2; i++) {
    var td = ce('td');
    if (i === 1) {
      td.innerHTML
    } else if (i === 2) {
    }
  }







  console.log(sub);
  
  var table = ce('table');
  table.setAttribute('border', 1);

  var titleRow = ce('tr');
  
  var subRow = ce('td');
  subRow.innerHTML = '科目';
  subRow.setAttribute('rowspan', 2);
  titleRow.appendChild(subRow);

  var limRow = ce('td');
  limRow.innerHTML = '提出期限';
  limRow.setAttribute('colspan', lim.reduce(function(x, y) { return x + y; }));
  subRow.parentNode.appendChild(limRow);

  table.appendChild(titleRow);

  var lim
  for (var limCnt = 0; limCnt < lim.length; limCnt++) {

  }



  for (var subCnt = 0; subCnt < sub.length; subCnt++) {
    var rptRow = ce('tr');

    var prgRow = ce('tr');
    
  }

  console.log(table);


  //console.log(html.table);
  


  
  







  for (var subCnt = 0; subCnt < sub.length * 2; subCnt++) {

  }





  
  var tr = document.createElement('tr');
  
  var 

  for (var limCnt = 0; limCnt < lim.length; limCnt++) {
    var td = document.createElement('td');
    td.colspan = lim[limCnt];
    td.innerHTML = limCnt + 5 + '/15';
    html.appendChild(td);
  }

  console.log(html);

  for (var subCnt = 0; subCnt < sub.length; subCnt++) {

    
    var name = document.createElement('td');
    name.rowspan = '2';
    name.innerHTML = sub[subCnt].name;

    

    for (var limCnt = 0; limCnt < sub[subCnt].lim.length; limCnt++) {

      var rpt = document.createElement('td');
      rpt.innerHTML = limCnt;

    }

  }

  //var td = document.createElement('td');
  //td.

  

  function ce(tag, txt) {
    return ['<' + tag + ' ' + attr + '>', '</' + tag + '>'];
  }

  function add(arr, pos, el) {
    return arr.splice(pos, 0, el);
  }

  //function ctr()

  
  */



}, false);