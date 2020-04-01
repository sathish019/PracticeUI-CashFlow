(function() {
  const friendList = [
    {
      userId: Math.floor(Math.random() * 10),
      userName: "Jake",
      expenseDetails: [
        {
          expenseId: 1000,
          expenseName: "Bus Ticket",
          paidByuser: "Jake",
          paidAmount: 200
        },
        {
          expenseId: 2000,
          expenseName: "Train Ticket",
          paidByuser: "Charlie",
          paidAmount: 300
        }
       ]
    },
    {
      userId: Math.floor(Math.random() * 10),
      userName: "Alan",
      expenseDetails: [
        {
          expenseId: 3000,
          expenseName: "Movie Ticket",
          paidByuser: "Charllie",
          paidAmount: 400
        },
        {
          expenseId: 4000,
          expenseName: "Taxi Fare",
          paidByuser: "Alan",
          paidAmount: 500
        }
      ]  
    },
    {
      userId: Math.floor(Math.random() * 10),
      userName: "Kelso",
      expenseDetails: [
        {
          expenseId: 5000,
          expenseName: "Auto Fare",
          paidByuser: "Charlie",
          paidAmount: 700
        },
        {
          expenseId: 6000,
          expenseName: "Train Ticket",
          paidByuser: "Charlie",
          paidAmount: 200
        }
      ]
    },
    {
      userId: Math.floor(Math.random() * 10),
      userName: "Robin",
      expenseDetails: [
        {
          expenseId: 7000,
          expenseName: "Snacks",
          paidByuser: "Charlie",
          paidAmount: 500
        },
        {
          expenseId: 8000,
          expenseName: "Flight Ticket",
          paidByuser: "Robin",
          paidAmount: 300
        }
      ]
    }
  ];

  const groupList = [
    {
      groupId: Math.floor(Math.random() * 10),  
      groupName: "Bangalore",
      expenseDetails: [
        {
          expenseId: 20011,
          expenseName: "Food",
          paidByuser: "Charlie",
          paidAmount: 600,
          splitBetweenusers: ["Charlie", "Alan", "Jake"]
        },
        {
          expenseId: 20012,
          expenseName: "Room rent",
          paidByuser: "Alan",
          paidAmount: 700,
          splitBetweenusers: ["Alan", "Kelso"]
        }
      ],
      groupMembers: ["Kelso", "Jake","Charlie", "Alan"]  
    },
    {
      groupId: Math.floor(Math.random() * 10),  
      groupName: "Chennai",
      expenseDetails: [
        {
          expenseId: 30011,
          expenseName: "Breakfast",
          paidByuser: "Charlie",
          paidAmount: 500,
          splitBetweenusers: ["Charlie", "Alan", "Robin"]
        },
        {
          expenseId: 30012,
          expenseName: "Bus Ticket",
          paidByuser: "Alan",
          paidAmount: 700,
          splitBetweenusers: ["Alan", "Kelso"]
        },
        {
          expenseId: 30013,
          expenseName: "Snacks",
          paidByuser: "Kelso",
          paidAmount: 300,
          splitBetweenusers: ["Alan", "Kelso", "Jake", "Charlie"]
        }
      ],
      groupMembers: ["Alan", "Kelso", "Jake", "Charlie"]  
    },
    {
      groupId: Math.floor(Math.random() * 10),
      groupName: "Mumbai",
      expenseDetails: [
        {
          expenseId: 40011,
          expenseName: "Food",
          paidByuser: "Charlie",
          paidAmount: 500,
          splitBetweenusers: ["Charlie", "Alan", "Kelso"]
        },
        {
          expenseId: 40012,
          expenseName: "Flight ticket",
          paidByuser: "Kelso",
          paidAmount: 700,
          splitBetweenusers: ["Kelso", "Alan"]
        },
        {
          expenseId: 40013,
          expenseName: "Snacks",
          paidByuser: "Kelso",
          paidAmount: 300,
          splitBetweenusers: ["Alan", "Kelso", "Charlie", "Jake", "Robin"]
        }
      ],
      groupMembers: ["Charlie", "Alan", "Kelso", "Jake", "Robin"]  
    },
    {
      groupId: Math.floor(Math.random() * 10),  
      groupName: "Kolkata",
      expenseDetails: [
        {
          expenseId: 50011,
          expenseName: "Snacks",
          paidByuser: "Charlie",
          paidAmount: 500,
          splitBetweenusers: ["Charlie", "Alan", "Jake"]
        },
        {
          expenseId: 50012,
          expenseName: "Room rent",
          paidByuser: "Alan",
          paidAmount: 700,
          splitBetweenusers: ["Alan", "Kelso"]
        },
        {
          expenseId: 50013,
          expenseName: "Drinks",
          paidByuser: "Kelso",
          paidAmount: 300,
          splitBetweenusers: ["Alan", "Charlie", "Jake", "Kelso"]
        }
      ],
      groupMembers: ["Kelso", "Charlie", "Alan", "Jake"]  
    }
  ];
  const renderFriends = "friendsList";
  const renderGroups = "groupsList";
  const modal = new Modal(friendList, groupList, renderFriends, renderGroups);

  const renderExpenses = "renderDebts&Expenses";
  const view = new View(renderFriends, renderGroups, renderExpenses);

  let cashFlow = new Controller(modal,view);
  cashFlow.expenseDetails();
})();
