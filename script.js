/*
    Smart Expense Tracker

    This JavaScript file controls:
    1. Adding expenses
    2. Displaying expenses
    3. Calculating total amount
    4. Deleting expenses
    5. Saving data in browser
*/



// Getting HTML elements using their IDs

const expenseForm = document.getElementById("expenseForm");

const expenseName = document.getElementById("expenseName");

const expenseAmount = document.getElementById("expenseAmount");

const expenseCategory = document.getElementById("expenseCategory");

const expenseDate = document.getElementById("expenseDate");

const expenseContainer = document.getElementById("expenseContainer");

const totalAmount = document.getElementById("totalAmount");




// Array to store all expenses

// We first check if old data exists in browser
// If data exists, load it
// Otherwise start with an empty array

let expenses = JSON.parse(localStorage.getItem("expenses")) || [];





// Function to display expenses on screen

function displayExpenses() {


    // Clear previous expenses
    // This prevents duplicate cards

    expenseContainer.innerHTML = "";



    let total = 0;



    // Loop through every expense

    expenses.forEach(function(expense, index) {



        // Adding amount to total

        total = total + Number(expense.amount);



        // Creating a new expense card

        const expenseCard = document.createElement("div");

        expenseCard.classList.add("expense-card");



        expenseCard.innerHTML = `

            <div>

                <h3>${expense.name}</h3>

                <p>
                    Category: ${expense.category}
                </p>

                <p>
                    Date: ${expense.date}
                </p>

                <p>
                    Amount: Rs. ${expense.amount}
                </p>

            </div>


            <button class="delete-btn" onclick="deleteExpense(${index})">

                Delete

            </button>

        `;



        // Adding card to webpage

        expenseContainer.appendChild(expenseCard);



    });



    // Updating total amount

    totalAmount.innerText = "Rs. " + total;



}






// Function runs when user submits the form

expenseForm.addEventListener("submit", function(event) {



    // Prevent page refresh

    event.preventDefault();





    // Creating expense object

    const expense = {


        name: expenseName.value,


        amount: expenseAmount.value,


        category: expenseCategory.value,


        date: expenseDate.value


    };






    // Adding new expense into array

    expenses.push(expense);






    // Saving array into browser storage

    localStorage.setItem(

        "expenses",

        JSON.stringify(expenses)

    );






    // Reset form fields after adding

    expenseForm.reset();





    // Update display

    displayExpenses();



});







// Function to delete expense

function deleteExpense(index) {



    // Remove expense from array

    expenses.splice(index, 1);





    // Update local storage

    localStorage.setItem(

        "expenses",

        JSON.stringify(expenses)

    );





    // Refresh display

    displayExpenses();



}







// Display old expenses when website opens

displayExpenses();