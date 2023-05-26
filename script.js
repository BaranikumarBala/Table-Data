var http = new XMLHttpRequest();
var arr = [];
http.open("GET","http://www.filltext.com/?rows=32&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D",true);
http.onreadystatechange = 
function()
{
    if(this.readyState == 4 && this.status == 200)
    {
        var dataList = JSON.parse(http.responseText);
        arr = dataList;
        // console.log(dataList);
        for(let i = 0; i<dataList.length; i++)
        {
        // console.log(dataList[i].firstName);
        document.getElementById("tbody").innerHTML +=
        `
        <tr class="data-row" id=${i} onclick="clicked(${i})">
            <td class="column1">${dataList[i].id}</td>
            <td class="column2">${dataList[i].firstName}</td>
            <td class="column3">${dataList[i].lastName}</td>
            <td class="column4">${dataList[i].email}</td>
            <td class="column5">${dataList[i].phone}</td>
        </tr>
        `
        }
    }
}
http.send();

window.onload = function()
{
    document.getElementById("overlay").style.display = "none";
}

var input, searchVal, table, tr, td, textVal;

function tableSearch()
{
    // console.log("logged");
    input = document.getElementById("search-box");
    searchVal = input.value.toLowerCase();
    // console.log(searchVal);
    table = document.getElementById("tbody")
    // console.log(table);
    tr = table.getElementsByTagName("tr");
    // console.log(tr.length)
    for(let i=0; i<tr.length; i++)
    {
        td = tr[i].getElementsByTagName("td");
        // console.log(td);
        for(let j=0; j<td.length; j++)
        if(td)
        {
            textVal = td[j].innerText || td[j].textContent;
            if(searchVal.length>0)
            {
                if(textVal.toLowerCase().indexOf(searchVal)>-1)
                {
                    td[j].style.color="red";
                }
                else
                {
                    td[j].style.color="";
                }
            }
            else
            {
                td[j].style.color="";
            }
        }
    }
}


function clicked(val)
{
    
    let tableRow = document.getElementsByTagName("tr");
    for(i=0; i<tableRow.length; i++)
    {
    tableRow[i].classList.remove("active");
    tableRow[val+1].classList.add("active");
    }

    

    document.getElementById("info-content").innerHTML = 
    `
    <div><b>User selected:</b> ${arr[val].firstName} ${arr[val].lastName}</div>
                <div>
                    <b>Description: </b>
                    <textarea cols="50" rows="5" readonly>
                        ${arr[val].description}
                    </textarea>
                </div>
                <div><b>Address:</b> ${arr[val].address.streetAddress}</div>
                <div><b>City:</b> ${arr[val].address.city}</div>
                <div><b>State:</b> ${arr[val].address.state}</div>
                <div><b>Zip:</b> ${arr[val].address.zip}</div>
    `
}
