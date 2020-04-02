class Modal {
  constructor(
    endUser,
    friendList,
    groupList,
    renderFriends,
    renderGroups,
    newFriend,
    newGroup,
    newExpense
  ) {
    this.endUser = endUser;
    this.friendsList = friendList;
    this.groupsList = groupList;
    this.friendsElement = renderFriends;
    this.groupsElement = renderGroups;
    this.addFriendInput = newFriend;
    this.addGroupInput = newGroup;
    this.newExpensebutton = newExpense;
  }

  getEndUserName() {
    return this.endUser;
  }

  generateNewId() {
    return Math.floor(Math.random() * 10);
  }

  getFriendsElementId() {
    return this.friendsElement;
  }

  getGroupsElementId() {
    return this.groupsElement;
  }

  getAddFriendElementID() {
    return this.addFriendInput;
  }

  getAddGroupElementID() {
    return this.addGroupInput;
  }

  getFriendsList() {
    return this.friendsList;
  }

  getGroupsList() {
    return this.groupsList;
  }

  getExpenseButton() {
    return this.newExpensebutton;
  }

  addNewFriend(newArrayObject) {
    this.friendsList.push(newArrayObject);
    return this.friendsList;
  }

  addNewGroup(newArrayObject) {
    this.groupsList.push(newArrayObject);
    return this.groupsList;
  }

  filterObjectOfFriend(objectId, objectName) {
    const object = this.friendsList.filter(obj => {
      if (obj.userId == parseInt(objectId) && obj.userName == objectName) {
        return obj;
      }
    });
    return object;
  }

  filterObjectOfGroup(objectId, objectName) {
    const object = this.groupsList.filter(obj => {
      if (obj.groupId == parseInt(objectId) && obj.groupName == objectName) {
        return obj;
      }
    });
    return object;
  }

  addNewFriendExpense(newExpYouPaid, user, newExpDesc, newExpAmount) {
    this.friendsList.forEach(element => {
      if (user == element.userName && newExpYouPaid == false) {
        element.expenseDetails.push({
          expenseId: this.generateNewId(),
          expenseName: newExpDesc,
          paidByuser: this.endUser,
          paidAmount: newExpAmount
        });
      } else if (user == element.userName && newExpYouPaid == true) {
        element.expenseDetails.push({
          expenseId: this.generateNewId(),
          expenseName: newExpDesc,
          paidByuser: user,
          paidAmount: parseInt(newExpAmount)
        });
      }
    });
  }

  addNewGroupExpense(newExpDesc, newExpAmount, pickedGroupName, splitBetween, grpExpensePaidBy) {
    const splitBetweenUsersArray = [];
    for (var i = 0; i < splitBetween.length; i++) {
      if (splitBetween[i].firstChild.checked) {
        splitBetweenUsersArray.push(splitBetween[i].textContent);
      }
    }

    this.groupsList.forEach(element => {
      if (element.groupName == pickedGroupName) {
        element.expenseDetails.push({
          expenseId: this.generateNewId(),
          expenseName: newExpDesc,
          paidByuser: grpExpensePaidBy,
          paidAmount: parseInt(newExpAmount),
          splitBetweenusers: splitBetweenUsersArray
        });
      }
    });
  }
}