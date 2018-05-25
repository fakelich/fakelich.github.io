// ==== INPUT DATA ====

var tableInfo = [
    {
      name: 'Thor Walton',
      position: 'Developer',
      office: 'New York',
      age: 61,
      startDate: '2013/08/11',
      salary: 98540,
    },
    {
      name: 'Quinn Flynn',
      position: 'Support Lead',
      office: 'Edinburgh',
      age: 22,
      startDate: '2013/03/03',
      salary: 342000,
    },
    {
      name: 'Jennifer Acosta',
      position: 'Junior Javascript Developer',
      office: 'Edinburgh',
      age: 43,
      startDate: '2013/02/01',
      salary: 75650,
    },
    {
      name: 'Haley Kennedy',
      position: 'Senior Marketing Designer',
      office: 'London',
      age: 43,
      startDate: '2012/12/18',
      salary: 313500,
    },
    {
      name: 'Brielle Williamson',
      position: 'Integration Specialist',
      office: 'New York',
      age: 61,
      startDate: '2012/12/02',
      salary: 372000,
    },
    {
      name: 'Michael Silva',
      position: 'Marketing Designer',
      office: 'London',
      age: 66,
      startDate: '2012/11/27',
      salary: 198500,
    },
    {
      name: 'Bradley Greer',
      position: 'Software Engineer',
      office: 'London',
      age: 41,
      startDate: '2012/10/13',
      salary: 132000,
    },
    {
      name: 'Dai Rios',
      position: 'Personnel Lead',
      office: 'Edinburgh',
      age: 35,
      startDate: '2012/09/26',
      salary: 217500,
    },
    {
      name: 'Herrod Chandler',
      position: 'Sales Assistant',
      office: 'San Francisco',
      age: 59,
      startDate: '2012/08/06',
      salary: 137500,
    },
    {
      name: 'Zorita Serrano',
      position: 'SoftwareEngineer',
      office: 'San Francisco',
      age: 56,
      startDate: '2012/06/01',
      salary: 115000,
    },
    {
      name: 'Norita Chandler',
      position: 'Sales Assistant',
      office: 'San Francisco',
      age: 32,
      startDate: '2013/06/01',
      salary: 125000,
    },
  ];

// ==== DRAWING FUNCTION ====

function drawRows(arr) {
    for (var i = tbody.children.length-1; i >= 0; i--) {
        tbody.children[i].remove();
    }
    for (var i = 0; i < arr.length; i++) {
        arr[i].setAttribute('data-range',i+1);
        tbody.appendChild(arr[i]);
    }
    pagination(event);
}

// ==== FIRST DRAWING ====

var table = document.createElement('table');
table.className = 'table table-sm table-hover';
var thead = document.createElement('thead');
thead.className = 'thead-light';
var tr = thead.insertRow(0);
tr.setAttribute('id','theadCustomers');

for (var i = 0; i < tableInfo.length; i++) {
    var row = table.insertRow(i);
    row.className = 'num';
    row.setAttribute('data-range',i+1);
    var counter = 0;
    for (var key in tableInfo[i]){
        var cell = row.insertCell(counter);
        cell.innerHTML = tableInfo[i][key];
        counter++;
    }
}

var tbody = table.getElementsByTagName('tbody')[0];
var rowsArray = [].slice.call(tbody.rows);

var th = '';
var title;
for (var key in tableInfo[0]) {
    switch (key){
        case 'startDate':
            title = 'Start Date';
            th += '<th data-type=\'date\'>'+title+'</th>';
            break;
        default:
            title = key[0].toUpperCase()+key.slice(1);
            th += '<th data-type=\''+typeof tableInfo[0][key]+'\'>'+title+'</th>';
            break;
    }
}
tr.innerHTML = th;

document.getElementById('customers').appendChild(table);
table.insertBefore(thead,table.children[0]);

// ==== SEARCH ====

var searchField = document.createElement("input");
searchField.setAttribute("type","text");
searchField.setAttribute("placeholder","Search by name...");
searchField.setAttribute("id","searchField");
searchField.className = "form-control";

document.getElementById("search").appendChild(searchField);

searchField.onkeyup = function () {
  tableSearch();
}

function tableSearch() {
  var request = new RegExp(searchField.value);
  var searchResults = [];
  for (var i = 0; i < rowsArray.length; i++) {
    var check = rowsArray[i].children[0].innerHTML;
    if(request.test(check)){
      searchResults.push(rowsArray[i]);
    }
  }
  drawRows(searchResults);
}

// ==== SORTING ====

document.getElementById('theadCustomers').onclick = function(e) {
    sorter(e.target.cellIndex, e.target.getAttribute('data-type'));
};

var sortCounter, arrCounter = [0, 0, 0, 0, 0, 0];

function sorter(numCol, type) {
    var compare;
    var rowsArray = [].slice.call(tbody.rows);
    var sortResults = [];
    switch (type) {
        case 'number':
            compare = function(rowA, rowB) {
            return rowA.cells[numCol].innerHTML - rowB.cells[numCol].innerHTML;
            };
            break;
        case 'string':
            compare = function(rowA, rowB) {
            return rowA.cells[numCol].innerHTML.localeCompare(rowB.cells[numCol].innerHTML);
            };
            break;
        case 'date':
            compare = function(rowA, rowB){
                return Date.parse(rowA.cells[numCol].innerHTML) - Date.parse(rowB.cells[numCol].innerHTML);
            }
    }

    for (var i = 0; i < 6; i++) {
        switch (numCol) {
            case i:
              arrCounter[i] += 1;
              sortCounter = arrCounter[i];
              break;
            default:
              arrCounter[i] = 0;
              break;
        }
    }

    rowsArray.sort(compare);

    if (sortCounter == 1){
      for (var i = 0; i < rowsArray.length; i++) {
          sortResults.push(rowsArray[i]);
      }
    } else {
      for (var i = rowsArray.length-1; i > -1; i--) {
        sortResults.push(rowsArray[i]);
      }
    }

    drawRows(sortResults);
}

// ==== PAGINATION ====

paginator.onclick = function(){
  pagination();
};

pagination(event)

function pagination(event) {

var paginator = document.getElementById('paginator');

var count = tbody.children.length;
var cnt = 5;
var cnt_page = Math.ceil(count / cnt);

var page = '';

for (var i = 0; i < cnt_page; i++) {
  page += '<span data-page=' + i * cnt + '  id=\'page' + (i + 1) + '\'>' + (i + 1) + '</span>';
}

paginator.innerHTML = page;

for (var i = 0; i < count; i++) {
  if (i < cnt) {
    tbody.children[i].style.display = 'table-row';
  }
}

var mainPage = document.getElementById('page1');
mainPage.classList.add('paginatorActive');

  var e = event || window.event;
  var target = e.target;
  var id = target.id;
  var dataPage = +target.dataset.page;

  if (target.tagName.toLowerCase() == 'ul') return;
  
  if (id[0] != 'p'){
    id = 'page1';
    dataPage = 0;
  };
  
  var nums = id.substr(4);
  mainPage.classList.remove('paginatorActive');
  mainPage = document.getElementById(id);
  mainPage.classList.add('paginatorActive');

  var j = 0;
  for (var i = 0; i < count; i++) {
    if (!tbody.children[i]) break;
    tbody.children[i].style.display = 'none';
  }
  for (var i = dataPage; i < count; i++) {
    if (j >= cnt) break;
    tbody.children[i].style.display = 'table-row';
    j++;
  }
}