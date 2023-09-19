
// Inputs Parameters
let title = document.getElementById('title');
let price = document.getElementById('Price');
let taxes = document.getElementById('Taxes');
let ads = document.getElementById('Ads');
let discount = document.getElementById('Discount');
let total = document.getElementById('total');
let quantity = document.getElementById('quantity');
let category = document.getElementById('category');
let CreateBtn = document.getElementById('subBtn');
// Outputs Parameters
let search = document.getElementById('Search');
let srchTitle = document.getElementById('srchTitle');
let srchCatg = document.getElementById('srchCatg');
let DeleteAllBtn = document.getElementById('deleteAll');
let DeleteBtn = document.getElementById('DeleteBtn');
let UpdateBtn = document.getElementById('UpdateBtn');
let mode = 'create';
let UpdateID;

console.log(title,price,taxes,ads,discount,total,
            quantity,category,CreateBtn,search,srchTitle,
            srchCatg,DeleteAllBtn,DeleteBtn,UpdateBtn);

// Get Total Price Function 
function GetTotal(){
    if(price.value != ''){
        let TotalVal = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML = TotalVal;
        total.style.backgroundColor = 'rgb(132, 130, 93)';
    }
    else 
        total.innerHTML ='',total.style.backgroundColor = 'rgb(12, 16, 16)';
}

// Check Local Storage Data
let Items = [];
if(localStorage.getItem('Items') != null)
    Items = JSON.parse( localStorage.getItem('Items') );

// Create Item
CreateBtn.onclick = function(){
    let Item = {
        title : title.value.toLowerCase(),
        price : price.value,
        taxes : taxes.value,
        ads : ads.value,
        discount : discount.value,
        total : total.innerHTML,
        quantity : quantity.value,
        category : category.value.toLowerCase(),
    };
    if(title !=''&&price !=''&& 
        taxes!=''&&ads!=''&&discount!=''
        && quantity!='' && quantity.value < 100 && category!='')
    {
        // Add to Local Storage
        if(mode === 'create'){
            for(let i=0;i<Item.quantity;i++)
                Items.push(Item);
        }
        //Update Item In Local Storage
        else {
            Items[UpdateID] = Item;
            mode = 'create';
            CreateBtn.innerHTML = mode;
            quantity.style.display = 'block';
            scrollTo({top:0, behavior:'smooth'});
        }
        localStorage.setItem('Items',JSON.stringify(Items));
        alert('Product Added Succesfully ^-^');
    }
    ClearInputs();
    ShowDataTable();
};
//Clear Data
function ClearInputs(){
    title.value='';
    price.value='';
    taxes.value='';
    ads.value  ='';
    discount.value='';
    category.value='';
    quantity.value='';
    GetTotal();
}
//Show Data To Page Table
function ShowDataTable(){
    let Table = [];
    for (let i=0;i<Items.length;i++){
        Table +=
                `<tr>
                    <td>${i+1}</td>
                    <td>${Items[i].title}</td>
                    <td>${Items[i].price}</td>
                    <td>${Items[i].taxes}</td>
                    <td>${Items[i].ads}</td>
                    <td>${Items[i].discount}</td>
                    <td>${Items[i].total}</td>
                    <td>${Items[i].category}</td>
                    <td><button onclick="Update(${i})" id="UpdateBtn">Update</button></td>
                    <td><button onclick="Delete(${i})" id="DeleteBtn">Delete</button></td>
                </tr>`
    }
    document.getElementById('tbody').innerHTML = Table;
    DeleteAllBtn.innerHTML = Items.length;
    if(Items.length == 0)
        DeleteAllBtn.classList.add('hide');
    else
        DeleteAllBtn.classList.remove('hide');
}
//Delete Product
function Delete(i){
    Items.splice(i,1);
    localStorage.Items = JSON.stringify(Items);
    ShowDataTable();
}
//Delete All Products
function DeleteAll(){
    Items = [];
    localStorage.Items = JSON.stringify(Items);
    ShowDataTable();
}
// Update Function
function Update(i){
    UpdateID=i;
    mode = 'Update';
    title.value = Items[i].title;
    price.value = Items[i].price ;
    taxes.value = Items[i].taxes;
    ads.value = Items[i].ads;
    discount.value = Items[i].discount;
    GetTotal();
    quantity.style.display = 'none';
    category.value = Items[i].category;
    CreateBtn.innerHTML = mode;
}
ShowDataTable();
// Search Product By Title Or Category
let SearchMode = 'title';
function SearchType(mode){
    if(mode === 'srchTitle'){
        search.placeholder = 'Search By Title';
        SearchMode='title';
    }
    else{
        search.placeholder = 'Search By Category'
        SearchMode='category';
    }
    search.focus();
    search.value='';
}
function Search(val){
    let Table=[];
    if(SearchMode === 'title'){
        for (let i = 0; i < Items.length; i++) {
            if(Items[i].title.includes(val)){
                Table +=
                `<tr>
                    <td>${i+1}</td>
                    <td>${Items[i].title}</td>
                    <td>${Items[i].price}</td>
                    <td>${Items[i].taxes}</td>
                    <td>${Items[i].ads}</td>
                    <td>${Items[i].discount}</td>
                    <td>${Items[i].total}</td>
                    <td>${Items[i].category}</td>
                    <td><button onclick="Update(${i})" id="UpdateBtn">Update</button></td>
                    <td><button onclick="Delete(${i})" id="DeleteBtn">Delete</button></td>
                </tr>`
            }
        }
    }
    else{
        for (let i = 0; i < Items.length; i++) {
            if(Items[i].category.includes(val)){
                Table +=
                `<tr>
                    <td>${i+1}</td>
                    <td>${Items[i].title}</td>
                    <td>${Items[i].price}</td>
                    <td>${Items[i].taxes}</td>
                    <td>${Items[i].ads}</td>
                    <td>${Items[i].discount}</td>
                    <td>${Items[i].total}</td>
                    <td>${Items[i].category}</td>
                    <td><button onclick="Update(${i})" id="UpdateBtn">Update</button></td>
                    <td><button onclick="Delete(${i})" id="DeleteBtn">Delete</button></td>
                </tr>`
            }
        }
    }
    document.getElementById('tbody').innerHTML = Table;
}
