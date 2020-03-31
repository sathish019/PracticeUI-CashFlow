(function() {
  const friendList = [
    {
      userId: Math.floor(Math.random() * 10),
      userName: "Jake"
    },
    {
      userId: Math.floor(Math.random() * 10),
      userName: "Alan"
    },
    {
      userId: Math.floor(Math.random() * 10),
      userName: "Kelso"
    },
    {
      userId: Math.floor(Math.random() * 10),
      userName: "Robin"
    }
  ];

  const groupList = [
    {
      groupId: Math.floor(Math.random() * 10),  
      groupName: "Break Fast"  
    },
    {
      groupId: Math.floor(Math.random() * 10),  
      groupName: "Lunch"  
    },
    {
      groupId: Math.floor(Math.random() * 10),
      groupName: "Snacks"  
    },
    {
      groupId: Math.floor(Math.random() * 10),  
      groupName: "Dinner"  
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
