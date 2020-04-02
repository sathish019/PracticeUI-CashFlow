class Controller {
  constructor(modal, view) {
    this.modal = modal;
    this.view = view;
  }

  expenseDetails() {
    this.view.renderDebtsAndExpenses(
      this.modal.getFriendsList(),
      this.modal.getGroupsList()
    );
    //this.view.renderOverAllExpenses(this.modal.getFriendsList(),this.modal.getGroupsList());
    this.addNewListItem();
    this.relevantListItemExpenses();
    this.addNewExpense();
  }

  //add new group or friend
  addNewListItem() {
    const newFriend = document.getElementById(
      this.modal.getAddFriendElementID()
    );
    newFriend.addEventListener("keyup", event => {
      if (event.keyCode == 13) {
        const listItemValue = event.target.value;
        const friendsListId = document.getElementById(
          this.modal.getFriendsElementId()
        );
        let newArray = this.modal.addNewFriend({
          userId: this.modal.generateNewId(),
          userName: listItemValue,
          expenseDetails: []
        });
        friendsListId.innerHTML = "";
        this.view.renderListItems(newArray, friendsListId);
      }
    });

    const newGroup = document.getElementById(this.modal.getAddGroupElementID());
    newGroup.addEventListener("keyup", event => {
      if (event.keyCode == 13) {
        const listItemValue = event.target.value;
        const groupsListId = document.getElementById(
          this.modal.getGroupsElementId()
        );
        let newArray = this.modal.addNewGroup({
          groupId: this.modal.generateNewId(),
          groupName: listItemValue,
          expenseDetails: [],
          groupMembers: []
        });
        groupsListId.innerHTML = "";
        this.view.renderListItems(newArray, groupsListId);
      }
    });
  }

  relevantListItemExpenses() {
    const friendsContainer = document.getElementById(this.modal.getFriendsElementId());
    friendsContainer.addEventListener("click", event => {
      const eventTarget = event.target;
      this.listItemExpenses(eventTarget);
    });

    const groupsContainer = document.getElementById(this.modal.getGroupsElementId());
    groupsContainer.addEventListener("click", event => {
      const eventTarget = event.target;
      this.listItemExpenses(eventTarget);
    });
  }

  //friend or group relevant expenses
  listItemExpenses(eventTarget) {
    const listItemId = eventTarget.getAttribute("id");
    const listItemContent = eventTarget.textContent;
    let objectToRender;
    if (eventTarget.classList.contains("group")) {
      event.stopPropagation();
      objectToRender = this.modal.filterObjectOfGroup(
        listItemId,
        listItemContent
      );
    } else if (eventTarget.classList.contains("friend")) {
      event.stopPropagation();
      objectToRender = this.modal.filterObjectOfFriend(
        listItemId,
        listItemContent
      );
    }
    this.view.renderRelevantExpenses(objectToRender);
  }

  //new expense
  addNewExpense() {
    const addExpenseBtn = document.getElementById(this.modal.getExpenseButton());
    addExpenseBtn.addEventListener("click", event => {
      const eventTarget = event.target;
      if (eventTarget.textContent == "Add Expense") {
        event.stopPropagation();
        this.view.addNewExpenseLayout(this.modal.getFriendsList(), this.modal.getGroupsList());

        const frndCheckBoxValue = document.getElementById("addAsFrndsExpCheckBox");
        const grpCheckBoxValue = document.getElementById("grpCheckBox");
        const pickGroup = document.getElementById("showGrpExpOptions");
        const pickedGroupName = document.getElementById("pickedGroup");
        const membersList = document.getElementById("membersList");

        frndCheckBoxValue.addEventListener("click", event => {
          if (document.getElementById("addAsFrndsExpCheckBox").checked) {
            document.getElementById("paidByYou").classList.remove("dp-hidden");
            document.getElementById("pickFriend").classList.remove("dp-hidden");
          } else {
            document.getElementById("paidByYou").classList.add("dp-hidden");
            document.getElementById("pickFriend").classList.add("dp-hidden");
          }
        });

        grpCheckBoxValue.addEventListener("click", event => {
          if (grpCheckBoxValue.checked) {
            pickGroup.classList.remove("dp-hidden");
            pickedGroupName.addEventListener("change", event => {
              if (pickedGroupName !== "select") {
                this.view.newExpenseGrpMembers(
                  this.modal.getGroupsList(),
                  membersList,
                  pickedGroupName.value
                );
                membersList.classList.remove("dp-hidden");
              }
            });
          } else {
            pickGroup.classList.add("dp-hidden");
            membersList.classList.add("dp-hidden");
          }
        });

        //submit button - append new expense to modal
        const submitBtn = document.getElementById("okBtn");
        submitBtn.addEventListener("click", event => {
          const newExpDesc = document.getElementById("expnName").value;
          const newExpAmount = document.getElementById("expnAmount").value;
          const newExpYouPaid = document.getElementById("paidByYou").firstChild
            .checked;
          const newExpOfFriend = document.getElementById("pickedFriend").value;

          if (newExpOfFriend !== "select" && !grpCheckBoxValue.checked) {
            this.modal.addNewFriendExpense(newExpYouPaid, newExpOfFriend, newExpDesc, newExpAmount);
            alert("Expense added");
          } else if (grpCheckBoxValue.checked) {
            const splitBetween = document.getElementById("splitBetween").children;
            const grpExpensePaidByElement = document.getElementById("grpExpensePaidByElement");
            this.modal.addNewGroupExpense(newExpDesc, newExpAmount, pickedGroupName.value, splitBetween, grpExpensePaidByElement.value);
            alert("Expense added");
          }
        });

        const cancelBtn = document.getElementById("cancelBtn");
        cancelBtn.addEventListener("click", event => {
          this.view.addNewExpenseLayout(
            this.modal.getFriendsList(),
            this.modal.getGroupsList()
          );
        });
      }
    });
  }
}
