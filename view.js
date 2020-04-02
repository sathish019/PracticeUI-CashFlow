class View {
  constructor(renderFriends, renderGroups, renderExpenses) {
    this.elementToRenderFriends = renderFriends;
    this.elementToRenderGroups = renderGroups;
    this.elementToRenderExpenses = renderExpenses;
  }

  renderDebtsAndExpenses(friendsList, groupsList) {
    const friendsListElement = document.getElementById(this.elementToRenderFriends);
    const groupsListElement = document.getElementById(this.elementToRenderGroups);
    this.renderListItems(friendsList, friendsListElement);
    this.renderListItems(groupsList, groupsListElement);
    this.renderRelevantExpenses();
  }

  renderListItems(array, elementId) {
    array.forEach((value, index) => {
      const liItem = document.createElement("li");
      let liItemDescription;
      if (value.userName !== undefined) {
        liItemDescription = document.createTextNode(value.userName);
        liItem.classList.add("friend");
        liItem.setAttribute("id", value.userId);
      } else {
        liItemDescription = document.createTextNode(value.groupName);
        liItem.classList.add("group");
        liItem.setAttribute("id", value.groupId);
      }
      liItem.appendChild(liItemDescription);
      elementId.appendChild(liItem);
    });
  }

  renderRelevantExpenses(objectToRender) {
    const mainContainer = document.getElementById(this.elementToRenderExpenses);
    mainContainer.innerHTML = "";
    if (objectToRender) {
      if (objectToRender[0].userName !== undefined) {
        const friendName = document.createTextNode(objectToRender[0].userName);
        const expenseArray = objectToRender[0].expenseDetails;
        expenseArray.forEach((val, indx) => {
          const expenseList = document.createElement("div");
          expenseList.classList.add("dp-flex", "mg-t-20p", "mg-l-40p");
          const expenseHeading = document.createElement("div");
          expenseHeading.classList.add("w-18");
          const expenseDesc = document.createTextNode(val.expenseName);

          const splitDetails = document.createElement("div");
          splitDetails.classList.add("fs-14");
          const splitDescrip1 = document.createElement("div");
          const splitDescrip2 = document.createElement("div");

          if (val.paidByuser !== friendName.textContent) {
            splitDescrip1.appendChild(document.createTextNode(friendName.textContent + " paid " + val.paidAmount));
            splitDescrip2.appendChild(document.createTextNode("you owe " + val.paidAmount / 2));
          } else {
            splitDescrip1.appendChild(document.createTextNode(" you owed " + val.paidAmount));
            splitDescrip2.appendChild(document.createTextNode(" you get back " + val.paidAmount / 2));
          }

          splitDetails.appendChild(splitDescrip1);
          splitDetails.appendChild(splitDescrip2);
          expenseHeading.appendChild(expenseDesc);
          expenseList.appendChild(expenseHeading);
          expenseList.appendChild(splitDetails);

          mainContainer.appendChild(expenseList);
        });
      } else {
        const groupName = document.createTextNode(objectToRender[0].groupName);
        const groupMembers = objectToRender[0].groupMembers;
        const expenseArray = objectToRender[0].expenseDetails;

        const expenseHeader = document.createElement("div");
        expenseHeader.classList.add("dp-flex", "mg-t-20p");
        const membersInGroupHeading = document.createElement("div");
        membersInGroupHeading.classList.add("w-18", "groupMembr", "mg-l-40p");
        membersInGroupHeading.appendChild(
          document.createTextNode("Group Members")
        );

        const expenseHeading = document.createElement("div");
        expenseHeading.classList.add("expenseDtls", "w-66");
        expenseHeading.appendChild(document.createTextNode("Expense Details"));

        groupMembers.forEach((val, i) => {
          const usrName = document.createElement("div");
          usrName.appendChild(document.createTextNode(val));
          membersInGroupHeading.append(usrName);
        });

        expenseArray.forEach((val, i) => {
          const expnseItem = document.createElement("div");
          expnseItem.classList.add("dp-flex");

          const expenseHeading1 = document.createElement("div");
          expenseHeading1.classList.add("w-18");
          expenseHeading1.appendChild(document.createTextNode(val.expenseName));

          const splitDetails = document.createElement("div");
          splitDetails.appendChild(
            document.createTextNode(val.paidByuser + " paid " + val.paidAmount)
          );
          expnseItem.appendChild(expenseHeading1);
          expnseItem.appendChild(splitDetails);

          expenseHeading.append(expnseItem);
        });

        expenseHeader.appendChild(membersInGroupHeading);
        expenseHeader.appendChild(expenseHeading);
        mainContainer.appendChild(expenseHeader);
      }
    }
  }

  /* renderOverAllExpenses(friendsList, groupsList) {
    const container = document.getElementById(this.elementToRenderExpenses);
    container.innerHTML = "";
  } */

  addNewExpenseLayout(friendsList, groupsList) {
    const container = document.getElementById(this.elementToRenderExpenses);
    container.innerHTML = "";

    const expData = document.createElement("div");
    expData.classList.add("mg-t-20p");
    const expName = document.createTextNode("Expense Name :");
    const expDesc = document.createElement("input");
    expDesc.setAttribute("id", "expnName");
    expDesc.classList.add("mg-l-10p");

    const expAmount = document.createElement("div");
    expAmount.classList.add("mg-t-20p");
    const expAmountLabel = document.createTextNode("Enter Amount :");
    const expAmountValue = document.createElement("input");
    expAmountValue.setAttribute("id", "expnAmount");
    expAmountValue.classList.add("mg-l-20p");

    //add as friends expense
    const addAsFrndsExp = document.createElement("div");
    addAsFrndsExp.classList.add("mg-t-20p");
    const addAsFrndsExpCheckBox = document.createElement("input");
    addAsFrndsExpCheckBox.classList.add("mg-r-5p");
    addAsFrndsExpCheckBox.setAttribute("type", "checkbox");
    addAsFrndsExpCheckBox.setAttribute("id", "addAsFrndsExpCheckBox");
    const addAsFrndsExpCheckBoxLabel = document.createTextNode(
      "Add as Friend's Expense"
    );

    const paidByYou = document.createElement("div");
    paidByYou.classList.add("mg-t-20p", "dp-hidden");
    paidByYou.setAttribute("id", "paidByYou");
    const checkBox = document.createElement("input");
    checkBox.classList.add("mg-r-5p");
    checkBox.setAttribute("type", "checkbox");
    checkBox.setAttribute("id", "paidByYou");
    const checkBoxLabel = document.createTextNode("Paid by You");

    const pickFriend = document.createElement("div");
    pickFriend.setAttribute("id", "pickFriend");
    pickFriend.classList.add("mg-t-20p", "dp-hidden");
    const pickFriendLabel = document.createTextNode("Pick a Friend -");
    const pickFriendElement = document.createElement("select");
    pickFriendElement.classList.add("mg-l-10p", "z-green-btn");
    pickFriendElement.setAttribute("id", "pickedFriend");
    const pickFriendValue = document.createElement("option");
    pickFriendValue.setAttribute("value", "select");
    pickFriendValue.setAttribute("selected", "selected");
    pickFriendValue.append(document.createTextNode("-- select --"));
    this.friendsNameDropDown(friendsList, pickFriendElement);

    //add as group expense
    const grpExp = document.createElement("div");
    grpExp.classList.add("mg-t-20p");
    const grpCheckBox = document.createElement("input");
    grpCheckBox.classList.add("mg-r-5p");
    grpCheckBox.setAttribute("type", "checkbox");
    grpCheckBox.setAttribute("id", "grpCheckBox");
    const grpCheckBoxLabel = document.createTextNode("Add as Group Expense");

    const pickGroup = document.createElement("div");
    pickGroup.setAttribute("id", "showGrpExpOptions");
    pickGroup.classList.add("mg-t-20p", "dp-hidden");
    const pickGroupLabel = document.createTextNode("Pick a Group -");
    const pickGroupElement = document.createElement("select");
    pickGroupElement.classList.add("mg-l-10p", "z-green-btn");
    pickGroupElement.setAttribute("id", "pickedGroup");
    const pickGroupValue = document.createElement("option");
    pickGroupValue.setAttribute("value", "select");
    pickGroupValue.setAttribute("selected", "selected");
    pickGroupValue.append(document.createTextNode("-- select --"));
    this.groupsNameDropDown(groupsList, pickGroupElement);

    const renderGrpMembers = document.createElement("div");
    renderGrpMembers.classList.add("mg-t-20p", "dp-hidden");
    renderGrpMembers.setAttribute("id", "membersList");
    //const splitBtwnLabel = document.createTextNode("split between");

    const submitValues = document.createElement("div");
    submitValues.classList.add("mg-t-20p", "align-font-center");
    const okBtn = document.createElement("button");
    okBtn.setAttribute("id", "okBtn");
    okBtn.classList.add("mg-r-10p", "z-green-btn");
    okBtn.append(document.createTextNode("Submit"));
    const cancelBtn = document.createElement("button");
    cancelBtn.setAttribute("id", "cancelBtn");
    cancelBtn.classList.add("mg-l-10p", "z-green-btn");
    cancelBtn.append(document.createTextNode("Cancel"));

    //append to respective parent
    expData.appendChild(expName);
    expData.appendChild(expDesc);

    expAmount.appendChild(expAmountLabel);
    expAmount.appendChild(expAmountValue);

    addAsFrndsExp.appendChild(addAsFrndsExpCheckBox);
    addAsFrndsExp.appendChild(addAsFrndsExpCheckBoxLabel);

    paidByYou.appendChild(checkBox);
    paidByYou.appendChild(checkBoxLabel);

    pickFriend.appendChild(pickFriendLabel);
    pickFriend.appendChild(pickFriendElement);
    pickFriendElement.appendChild(pickFriendValue);

    grpExp.appendChild(grpCheckBox);
    grpExp.appendChild(grpCheckBoxLabel);

    pickGroup.appendChild(pickGroupLabel);
    pickGroup.appendChild(pickGroupElement);
    pickGroupElement.appendChild(pickGroupValue);

    pickGroup.appendChild(renderGrpMembers);

    submitValues.appendChild(okBtn);
    submitValues.appendChild(cancelBtn);

    //append to container
    container.appendChild(expData);
    container.appendChild(expAmount);
    container.appendChild(addAsFrndsExp);
    container.appendChild(paidByYou);
    container.appendChild(pickFriend);
    container.appendChild(grpExp);
    container.appendChild(pickGroup);
    container.appendChild(renderGrpMembers);
    container.appendChild(submitValues);
  }

  friendsNameDropDown(friendsList, pickFriendElement) {
    friendsList.forEach((val, indx) => {
      const opt = document.createElement("option");
      opt.append(document.createTextNode(val.userName));
      pickFriendElement.appendChild(opt);
    });
  }

  groupsNameDropDown(groupsList, pickGroupElement) {
    groupsList.forEach((val, indx) => {
      const opt = document.createElement("option");
      opt.append(document.createTextNode(val.groupName));
      pickGroupElement.appendChild(opt);
    });
  }

  newExpenseGrpMembers(groupsList, membersListId, pickedGroupName) {
    const splitBetween = document.createElement("div");
    splitBetween.setAttribute("id", "splitBetween");

    groupsList.forEach((val, indx) => {
      if (val.groupName == pickedGroupName) {
        membersListId.innerHTML = "";
        splitBetween.append(document.createTextNode("Split between : "));
        val.groupMembers.forEach(element => {
          const span = document.createElement("span");
          const checkBox = document.createElement("input");
          checkBox.setAttribute("type", "checkbox");
          checkBox.classList.add("mg-r-5p");
          const label = document.createElement("i");
          label.append(document.createTextNode(element));
          label.classList.add("mg-r-20p");

          span.append(checkBox);
          span.append(label);
          splitBetween.appendChild(span);
        });
      }
    });

    const grpExpensePaidBy = document.createElement("div");
    grpExpensePaidBy.setAttribute("id", "grpExpensePaidBy");
    grpExpensePaidBy.classList.add("mg-t-20p");
    const grpExpensePaidByLabel = document.createTextNode("Paid By -");
    const grpExpensePaidByElement = document.createElement("select");
    grpExpensePaidByElement.classList.add("mg-l-10p", "z-green-btn");
    grpExpensePaidByElement.setAttribute("id", "grpExpensePaidByElement");
    const grpExpensePaidByValue = document.createElement("option");
    grpExpensePaidByValue.setAttribute("value", "select");
    grpExpensePaidByValue.setAttribute("selected", "selected");

    groupsList.forEach((val, indx) => {
      if (val.groupName == pickedGroupName) {
        val.groupMembers.forEach(element => {
          const opt = document.createElement("option");
          opt.append(document.createTextNode(element));
          grpExpensePaidByElement.appendChild(opt);
        });
      }
    });

    grpExpensePaidBy.appendChild(grpExpensePaidByLabel);
    grpExpensePaidBy.appendChild(grpExpensePaidByElement);
    grpExpensePaidBy.appendChild(grpExpensePaidByValue);

    membersListId.appendChild(splitBetween);
    membersListId.appendChild(grpExpensePaidBy);
  }
}