     
     
    let budgetFeedback = document.querySelector(".budget-feedback");
    let expenseFeedback = document.querySelector(".expense-feedback");
    let budgetForm = document.getElementById("budget-form");
    let budgetInput = document.getElementById("budget-input");
    let budgetAmount = document.getElementById("budget-amount");
    let expenseAmount = document.getElementById("expense-amount");
    let balance = document.getElementById("balance");
    let balanceAmount = document.getElementById("balance-amount");
    let expenseForm = document.getElementById("expense-form");
    let expenseInput = document.getElementById("expense-input");
    let amountInput = document.getElementById("amount-input");
    let expenseList = document.getElementById("expense-list");
    let itemList = [];
    let itemID = 0;


    //valeur du budget
    budgetForm.addEventListener("submit",
    function  (event){
      event.preventDefault();
        const value = budgetInput.value;
        if (value ===""|| value < 0){
          budgetFeedback.classList.add("showItem");
          budgetFeedback.innerHTML = `<p> la valeur est vide ou negative<p>`
          setTimeout(function() {
            budgetFeedback.classList.remove("showItem");
          }, 3000);

        }
        else{
         
          budgetAmount.textContent = value;
         
          budgetInput.value = "";
          showBalance();
        }
    })
    function showBalance(){
      const expense = totalExpense();
      const total = parseInt(budgetAmount.textContent)-expense;
      balanceAmount.textContent = total;
    }

   

    // expense submit
    expenseForm.addEventListener("submit",
     function(event){
       event.preventDefault();
      const expenseValue = expenseInput.value;
      const amountValue = amountInput.value;
      if(expenseValue ===""||amountValue===""|| amountValue <0){
        expenseFeedback.classList.add("showItem");
        expenseFeedback.innerHTML = `la valeur est vide ou negative`;
        setTimeout(function() {
          expenseFeedback.classList.remove("showItem");
        }, 3000);

      }
      else{
        let amount = parseInt(amountValue);
        expenseInput.value ="";
        amountValue.value = "";
        amountInput.value = "";
        
        let expense = {
          id: itemID,
          title:expenseValue,
          amount:amount
        };
        itemID++;
        itemList.push(expense);
        addExpense(expense);
        showBalance();
      }
     });
    
    function addExpense(expense){
      const div = document.createElement("div");
      div.classList.add("expense");
      div.innerHTML = 
      `<div class="expense-item d-flex justify-content-between align-items-baseline">
       <h6 class="expense-title mb-0 text-uppercase list-item">- ${
         expense.title
       }</h6>
       <h5 class="expense-amount mb-0 list-item">${expense.amount}</h5>
       <!-- icons -->
      <div class="expense-icons list-item">
          <a href="#" class="edit-icon mx-2" data-id="${expense.id}">
           <i class="fas fa-edit"></i>
          </a>
          <a href="#" class="delete-icon" data-id="${expense.id}">
           <i class="fas fa-trash"></i>
          </a>
         </div>
      </div>
   `;
   expenseList.appendChild(div);
    }
     //calcule de la depense total
     function totalExpense(){
      let total = 0;
      if (itemList.length > 0){
        total = itemList.reduce(function(prev,curr){
          prev += curr.amount;
          return prev;
        },0)
      }
      expenseAmount.textContent = total;
      return total;
    }

    //bouton edit expense
function editExpense(element){
  let id = parseInt(element.dataset.id);
  let parent = element.parentElement.parentElement.parentElement;
  // supression du DOM
  expenseList.removeChild(parent);
  // supression de la liste 
  let expense = itemList.filter(function(item){
    return item.id === id;
  });

  //afficher la valeur a edité
  expenseInput.value = expense[0].title;
  amountInput.value = expense[0].amount;
  //suppression de l'item
  let supList = itemList.filter(function(expense){
    return expense.id !== id;
  });
  
  itemList = supList;
  showBalance();
  /* addExpense(expense);
  totalExpense();
  console.log(expense.title); */
}


// supression de la depense


function deleteExpense (element){
  let id = parseInt(element.dataset.id);
  //console.log(id);
  let parent = element.parentElement.parentElement.parentElement;
  // supression du DOM
    expenseList.removeChild(parent);
  // supression de item
  let supItem = itemList.filter(function(expense){
    return expense.id !== id;
  });
 itemList = supItem;
  showBalance();

}
expenseList.addEventListener("click" ,function(event){
  if(event.target.parentElement.classList.contains("edit-icon")){
    editExpense(event.target.parentElement);
  }
  else if (event.target.parentElement.classList.contains("delete-icon")){
    deleteExpense(event.target.parentElement);
   /*  showBalance();
  addExpense(expense); */
  //totalExpense();
  }

});

/* document.addEventListener("DOMContentLoaded", function() {
  
});
 */    


