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
    array.forEach((value,index) => {
      const liItem = document.createElement("li");
      let liItemDescription;
      if(value.userName !== undefined) {
        liItemDescription = document.createTextNode(value.userName);
        liItem.classList.add("friend");
        liItem.setAttribute("id",value.userId);
      }
      else {
        liItemDescription = document.createTextNode(value.groupName);
        liItem.classList.add("group"); 
        liItem.setAttribute("id",value.groupId); 
      }
      liItem.appendChild(liItemDescription);  
      elementId.appendChild(liItem);
    });
  }

  renderRelevantExpenses(objectToRender) {
    const mainContainer = document.getElementById(this.elementToRenderExpenses);
    mainContainer.innerHTML = "";
    if(objectToRender){
      if(objectToRender[0].userName !== undefined){
        const friendName = document.createTextNode(objectToRender[0].userName);
        const expenseArray = objectToRender[0].expenseDetails;
        expenseArray.forEach((val,indx) => {
           const expenseList =  document.createElement("div");
           expenseList.classList.add("dp-flex", "mg-t-20p", "mg-l-40p");
           const expenseHeading = document.createElement("div");
           expenseHeading.classList.add("w-18");
           const expenseDesc = document.createTextNode(val.expenseName);
           
           const splitDetails = document.createElement("div");
           splitDetails.classList.add("fs-14");
           const splitDescrip1 = document.createElement("div");
           const splitDescrip2 = document.createElement("div");

           if(val.paidByuser !== friendName.textContent){

            splitDescrip1.appendChild(document.createTextNode(friendName.textContent +" paid "+ val.paidAmount));
            splitDescrip2.appendChild(document.createTextNode("you owe " + (val.paidAmount)/2));
              
           }
           else {
            splitDescrip1.appendChild(document.createTextNode(" you owed "+ val.paidAmount));
            splitDescrip2.appendChild(document.createTextNode(" you get back " + (val.paidAmount)/2));
           }
           
           splitDetails.appendChild(splitDescrip1);
           splitDetails.appendChild(splitDescrip2);
           expenseHeading.appendChild(expenseDesc);
           expenseList.appendChild(expenseHeading);
           expenseList.appendChild(splitDetails);
    
           mainContainer.appendChild(expenseList); 
        });
      }
      else{
        const groupName = document.createTextNode(objectToRender[0].groupName);
        const groupMembers = objectToRender[0].groupMembers;
        const expenseArray = objectToRender[0].expenseDetails;

        const expenseHeader = document.createElement("div");
        expenseHeader.classList.add("dp-flex", "mg-t-20p");
        const membersInGroupHeading = document.createElement("div");
        membersInGroupHeading.classList.add("w-18","groupMembr", "mg-l-40p");
        membersInGroupHeading.appendChild(document.createTextNode("Group Members"));
        
        const expenseHeading = document.createElement("div");
        expenseHeading.classList.add("expenseDtls","w-66");
        expenseHeading.appendChild(document.createTextNode("Expense Details"));
        
        groupMembers.forEach((val,i) => {
          const usrName = document.createElement("div");
          usrName.appendChild(document.createTextNode(val));
          membersInGroupHeading.append(usrName); 
        });

        expenseArray.forEach((val,i) => {
          const expnseItem = document.createElement("div");
          expnseItem.classList.add("dp-flex"); 
          
          const expenseHeading1 = document.createElement("div");
          expenseHeading1.classList.add("w-18");
          expenseHeading1.appendChild(document.createTextNode(val.expenseName));
           
          const splitDetails = document.createElement("div");
          splitDetails.appendChild(document.createTextNode(val.paidByuser + " paid " + val.paidAmount));
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

  renderOverAllExpenses(friendsList, groupsList) {
    const container = document.getElementById(this.elementToRenderExpenses);
    container.innerHTML = "";
  }

  addNewExpenseLayout(friendsList) {
    const container = document.getElementById(this.elementToRenderExpenses);
    container.innerHTML = "";
    
    const expData = document.createElement("div");
    expData.classList.add("mg-t-20p");
    const expName = document.createTextNode("Expense Name :");
    const expDesc = document.createElement("input");
    expDesc.setAttribute("id","expnName");
    expDesc.classList.add("mg-l-10p");

    const expAmount = document.createElement("div");
    expAmount.classList.add("mg-t-20p");
    const expAmountLabel = document.createTextNode("Enter Amount :");
    const expAmountValue = document.createElement("input");
    expAmountValue.setAttribute("id","expnAmount");
    expAmountValue.classList.add("mg-l-20p");

    const paidByYou = document.createElement("div");
    paidByYou.classList.add("mg-t-20p");
    const checkBox = document.createElement("input");
    checkBox.classList.add("mg-r-5p");
    checkBox.setAttribute("type","checkbox");
    checkBox.setAttribute("id","paidByYou");
    const checkBoxLabel = document.createTextNode("Paid by You");

    const pickFriend = document.createElement("div");
    pickFriend.classList.add("mg-t-20p");
    const pickFriendLabel = document.createTextNode("Pick a Friend -");
    const pickFriendElement = document.createElement("select");
    pickFriendElement.classList.add("mg-l-10p","z-green-btn");
    pickFriendElement.setAttribute("id", "pickedFriend")
    const pickFriendValue = document.createElement("option");
    pickFriendValue.setAttribute("value","select");
    pickFriendValue.setAttribute("selected","selected");
    pickFriendValue.append(document.createTextNode("-- select --"));
    this.friendsNameDropDown(friendsList,pickFriendElement);

    const submitValues = document.createElement("div");
    submitValues.classList.add("mg-t-20p", "align-font-center");
    const okBtn = document.createElement("button");
    okBtn.setAttribute("id","okBtn");
    okBtn.classList.add("mg-r-10p","z-green-btn");
    okBtn.append(document.createTextNode("Submit"));
    const cancelBtn = document.createElement("button");
    cancelBtn.setAttribute("id","cancelBtn");
    cancelBtn.classList.add("mg-l-10p","z-green-btn");
    cancelBtn.append(document.createTextNode("Cancel"));

    expData.appendChild(expName);
    expData.appendChild(expDesc);

    expAmount.appendChild(expAmountLabel);
    expAmount.appendChild(expAmountValue);

    paidByYou.appendChild(checkBox);
    paidByYou.appendChild(checkBoxLabel);

    pickFriend.appendChild(pickFriendLabel);
    pickFriend.appendChild(pickFriendElement);
    pickFriendElement.appendChild(pickFriendValue);

    submitValues.appendChild(okBtn);
    submitValues.appendChild(cancelBtn);

    container.appendChild(expData);
    container.appendChild(expAmount);
    container.appendChild(paidByYou);
    container.appendChild(pickFriend);
    container.appendChild(submitValues);
  }

  friendsNameDropDown(friendsList, pickFriendElement) {
    friendsList.forEach((val,indx) => {
      const opt = document.createElement("option");
      opt.append(document.createTextNode(val.userName));
      pickFriendElement.appendChild(opt);
    });
  }

}
