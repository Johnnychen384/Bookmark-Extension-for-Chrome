let myLeads = [];
const inputEl = document.getElementById('input-el')
const inputBtn = document.getElementById('input-btn')
const ulEl = document.getElementById('ul-el')
const deleteBtn = document.getElementById('delete-btn')
const saveTab = document.getElementById('save-tab')


const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))
if (leadsFromLocalStorage){
    myLeads = leadsFromLocalStorage
    render(myLeads);
}
// console.log(leadsFromLocalStorage)

deleteBtn.addEventListener('click', function() {
    localStorage.clear()
    myLeads = []
    render(myLeads)
})

saveTab.addEventListener('click', function(){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        myLeads.push(tabs[0].url) 
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        render(myLeads)
    })
})

inputBtn.addEventListener("click", function() {
    myLeads.push(inputEl.value) 
    inputEl.value = ""
    localStorage.setItem("myLeads", JSON.stringify(myLeads));

    render(myLeads);
})

function render(Leads){
    let listItems = ""
    for (let i = 0; i < Leads.length; i++){
        listItems += `
        <li>
            <a target="_blank" href="${Leads[i]}">${Leads[i]}</a>
        </li>`
        // console.log(listItems)
    }
    ulEl.innerHTML = listItems
}