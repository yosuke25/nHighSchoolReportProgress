window.addEventListener('load', function () {

  let subject = [];

  let element = [];
  element[0] = document.getElementsByClassName('subject_1st_row');
  element[1] = document.getElementsByClassName('subject_2st_row');

  let limit = [];

  for (let subjectCount = 0; subjectCount < element[0].length; subjectCount++) {
    let childNode = [];
    childNode[0] = element[0][subjectCount].childNodes;
    childNode[1] = element[1][subjectCount * 2].childNodes;

    subject[subjectCount] = {};
    subject[subjectCount].progress = [];
    subject[subjectCount].report = {
      5: 0,
      6: 0,
      7: 0,
      8: 0,
      9: 0,
      10: 0,
      11: 0,
      12: 0
    };

    subject[subjectCount].name = childNode[0][1].innerHTML.split('<br>')[0];

    for (let childNodeCount = 0; childNodeCount < childNode[0].length; childNodeCount++) {
      let childNodeInnerText = childNode[0][childNodeCount].innerText;
      if ((childNode[0][childNodeCount].className === 'report_limit_date') && (childNodeInnerText !== '-')) {
        subject[subjectCount].report[Number(childNodeInnerText.split('/')[0])]++;
      }
    }

    for (let childNodeCount = 0; childNodeCount < childNode[1].length; childNodeCount++) {
      let childNodeInnerText = childNode[1][childNodeCount].innerText;
      if ((childNode[1][childNodeCount].className === 'report_progress') && (childNodeInnerText.substr(-1, 1) === '%' && childNodeInnerText !== '-')) {
        subject[subjectCount].progress.push(childNodeInnerText);
      }
    }
  }

  for (let reportCount = 0; reportCount < 8; reportCount++) {
    let maxCount = 0;
    for (let subjectCount = 0; subjectCount < element[0].length; subjectCount++) {
      let report = subject[subjectCount].report[reportCount + 5];
      if (report > maxCount) {
        maxCount = report;
      }
    }
    limit.push(maxCount);
  }

  let html = {};
  html[0] = createElement(['html']);
  html[0].inner[0] = createElement(['head']);
  html[0].inner[0].inner[0] = createElement(['meta', 'charset="UTF-8"']);
  html[0].inner[0].inner[1] = createElement(['meta', 'http-equiv="content-language" content="ja"']);
  html[0].inner[0].inner[2] = createElement(['title'], '進捗表 | N高等学校');
  html[0].inner[0].inner[3] = createElement(['link', 'rel="stylesheet" href="data:text/css;base64,Ym9keSB7CiAgZm9udC1mYW1pbHk6ICdBdmVuaXInLCdIZWx2ZXRpY2EgTmV1ZScsJ0hlbHZldGljYScsJ0FyaWFsJywnSGlyYWdpbm8gU2FucycsJ+ODkuODqeOCruODjuinkuOCtOOCt+ODg+OCrycsWXVHb3RoaWMsJ1l1IEdvdGhpYycsJ+ODoeOCpOODquOCqicsICdNZWlyeW8nLCfvvK3vvLMg77yw44K044K344OD44KvJywnTVMgUEdvdGhpYycsJ1JvYm90bycsJ0Ryb2lkIFNhbnMnLCdzYW5zLXNlcmlmJzsKfQoKdGFibGUgewogIHdpZHRoOiAxMDAlOwogIGhlaWdodDogMTAwJTsKICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlOwogIGJhY2tncm91bmQtY29sb3I6ICM2NjY2NjY7Cn0KCnRkIHsKICBjb2xvcjogIzMzMzMzMzsKfQoKLmZvbnQtbGFyZ2UgewogIGZvbnQtd2VpZ2h0OiBib2xkOwp9CgoucmVwb3J0LWNlbGwgewogIHdpZHRoOiA2NXB4Owp9CgouZ3JheS1iYWNrIHsKICBiYWNrZ3JvdW5kLWNvbG9yOiAjREREREREOwp9CgouZG9uZSB7CiAgYmFja2dyb3VuZC1jb2xvcjogIzkzQzQ3RDsKfQoKLnVuZG9uZSB7CiAgYmFja2dyb3VuZC1jb2xvcjogI0ZGRkZGRjsKfQoKLnRhYmxlLWFyZWEgewogIHdpZHRoOiAxMDAwcHg7CiAgaGVpZ2h0OiA1NzBweDsKICBwb3NpdGlvbjogcmVsYXRpdmU7CiAgbWFyZ2luOiBhdXRvOwogIHRvcDogMHB4OwogIGJvdHRvbTogMHB4OwogIGxlZnQ6IDBweDsKICByaWdodDogMHB4Owp9"']);
  html[0].inner[1] = createElement(['body']);
  html[0].inner[1].inner[0] = createElement(['div', 'id="table-area"']);
  html[0].inner[1].inner[0].inner[0] = createElement(['table']);
  html[0].inner[1].inner[0].inner[0].inner[0] = createElement(['tr', 'align="center"']);
  html[0].inner[1].inner[0].inner[0].inner[0].inner[0] = createElement(['td', 'rowspan="2" class="font-large gray-back"'], '科目');
  html[0].inner[1].inner[0].inner[0].inner[0].inner[1] = createElement(['td', 'colspan="' + limit.reduce(function (x, y) { return x + y }) + '" class="font-large gray-back"'], '提出期限');
  html[0].inner[1].inner[0].inner[0].inner[1] = createElement(['tr', 'align="center"']);

  for (let limitCount = 0; limitCount < limit.length; limitCount++) {
    html[0].inner[1].inner[0].inner[0].inner[1].inner[limitCount] = createElement(['td', 'colspan="' + limit[limitCount] + '" class="font-large gray-back"'], limitCount + 5 + '/15');
  }

  for (let trCount = 0; trCount < subject.length * 2; trCount++) {
    html[0].inner[1].inner[0].inner[0].inner[trCount + 2] = createElement(['tr', 'align="center"']);
  }

  for (let subjectCount = 0; subjectCount < subject.length; subjectCount++) {
    let index = 0;
    let report = 1;
    let progress = 0;

    html[0].inner[1].inner[0].inner[0].inner[(subjectCount + 1) * 2].inner[index++] = createElement(['td', 'rowspan="2" class="font-large gray-back"'], subject[subjectCount].name);

    for (let limitCount = 0; limitCount < 8; limitCount++) {
      for (let reportCount = 0; reportCount < subject[subjectCount].report[limitCount + 5]; reportCount++) {
        if (subject[subjectCount].progress[progress] === '100%') {
          html[0].inner[1].inner[0].inner[0].inner[(subjectCount + 1) * 2 + 1].inner[index - 1] = createElement(['td', 'class="report-cell done"'], subject[subjectCount].progress[progress++]);
          html[0].inner[1].inner[0].inner[0].inner[(subjectCount + 1) * 2].inner[index++] = createElement(['td', 'class="report-cell done"'], String(report++));
        } else {
          html[0].inner[1].inner[0].inner[0].inner[(subjectCount + 1) * 2 + 1].inner[index - 1] = createElement(['td', 'class="report-cell undone"'], subject[subjectCount].progress[progress++]);
          html[0].inner[1].inner[0].inner[0].inner[(subjectCount + 1) * 2].inner[index++] = createElement(['td', 'class="report-cell undone"'], String(report++));
        }
      }
      for (let reportCount = 0; reportCount < limit[limitCount] - subject[subjectCount].report[limitCount + 5]; reportCount++) {
        html[0].inner[1].inner[0].inner[0].inner[(subjectCount + 1) * 2 + 1].inner[index - 1] = createElement(['td', 'class="report-cell undone"'], ' ');
        html[0].inner[1].inner[0].inner[0].inner[(subjectCount + 1) * 2].inner[index++] = createElement(['td', 'class="report-cell undone"'], ' ');
      }
    }
  }

  let button = document.createElement('img');
  let buttonSize = window.getComputedStyle(document.getElementById('studentTermId')).getPropertyValue('height');
  button.style.width = buttonSize;
  button.style.height = buttonSize;
  button.style.float = 'right';
  button.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAB6UlEQVRoQ+2Zr07EQBDGb9s0wVEsAmqQlzRtSAgGDOE1MIBBok5hUEgcKHgLCOJ4gDYkNSiwOIKuKN8mNOn1uu3cLm1H7Lm7zu58v/mzt9sVE8InjuOCYDaKiaB4tQCUKGna6GTgpyiKN01/xsOEECEmWS8nWhkA4l/TND00VqI5QRRFc0AcWADNABoPsxlg1wPVNV4ljmJjXBvECZZKiCKOYkP0b2xmAag9gKw9I9xHGiF/SJLkRDVusAxYAEUKBssAHN1Aw66qFLAd2Mczr+E5jxJqq30JB4BLhQ1vAIi/hfiLFkC+AE3isao9Aei4AsQTQBH5xzzPrzzP+2ANoBIv1/swDLdd1/1kC9AmHqILAARsAbrEy6izBYD4OzTnaXW1QcPe4zh6LiNf/s4SoEX8WX35ZAewinh2JQTx1yibWUPZLEW+tAmCYM33/b3yOxr6C6vT+yi7UZTDjuM48rXHphTwV/NK8Rpb7Unvmzlso7cgbA7xL2jYfxUvgXsHkE6m0+lGlmXfOhHuGjMIQJcIk+cWgHomNolyx1li8d0o5ZUJxaYvwfV5bQkhIrzuByjlwfqKyQIM1b0KP4KSgZE1trq3AGNnx2aAVQbG/pOqB4NyH71QQmNHs+4fR8vOi3gL0GfWKBn4BUfxB4aQAoo9AAAAAElFTkSuQmCC';
  
  let result_table = document.getElementById('result_table');
  let result = document.getElementById('result');
  result.insertBefore(button, result_table);

  let newWindowInnerHTML = '<!DOCTYPE html>' + createHTML(html);

  button.addEventListener('click', function () {
    let newWindow = window.open(null, Math.random().toString(32).slice(-8), 'width=1000, height=570');
    newWindow.document.body.innerHTML = newWindowInnerHTML;
  }, false);

  function createHTML(object) {
    let html = '';

    if (!object && !isObject(object)) {
      error(message(1));
      return;
    }

    let childElement = objectLength(object);

    for (let i = 0; i < childElement; i++) {

      if (!object[i]) {
        error(message(1, i));
        return;
      }

      if (!object[i].tag) {
        error(message(2, i));
        return;
      }

      let tag = object[i].tag;

      if (!tag || !isString(tag)) {
        error(message(4, i));
        return;
      }

      html += '<' + tag;

      let attr = object[i].attr;

      if (attr) {
        if (isString(attr)) {
          html += ' ' + attr;
        } else {
          error(message(5, i));
          return;
        }
      }

      html += '>';

      if (!object[i].inner) {
        error(message(6, i));
        return;
      }

      let inner = object[i].inner;
      
      if (isObject(inner)) {
        html += createHTML(inner);
      } else if (isString(inner)) {
        html += inner;
      } else {
        error(message(7, i));
        return;
      }

      html += '</' + tag + '>';

    }

    return html;

  }

  function createElement(tag, inner = null) {
    let element = {};
    element.tag = tag[0];
    if (tag[1]) {
      element.attr = tag[1];
    }
    if (inner === null) {
      element.inner = {};
    } else {
      element.inner = inner;
    }
    return element;
  }

  function error(message) {
    throw new Error(message);
  }

  function message(messageNumber, option = null) {
    let message = [
      'Argument is false or not an object: object',
      'Element is false: object[' + option + ']',
      'Tag is false: object[' + option + '][0]',
      'Tag is not an array: object[' + option + '][0]',
      'Tag name is false or not a string: object[' + option + '][0][0]',
      'Attribute is not a string: object[' + option + '][0][1]',
      'inner is false: object[' + option + '][1]',
      'inner is neither an object nor a string: object[' + option + '][1]'
    ];
    return message[messageNumber];
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