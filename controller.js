class Controller {
  constructor(modal, view) {
    this.modal = modal;
    this.view = view;
  }

  expenseDetails() {
    this.view.renderDebtsAndExpenses(this.modal.getFriendsList(),this.modal.getGroupsList()); 
    this.addNewListItem();
    this.relevantListItemExpenses(); 
  }

  addNewListItem() {
    document.addEventListener("keyup", event => {
      if(event.keyCode == 13) {  
        const listItemId = event.target.id;
        const listItemValue = event.target.value;
        const groupsListId = document.getElementById(this.modal.getGroupsElementId());
        const friendsListId = document.getElementById(this.modal.getFriendsElementId());
        let newArray = [];
        if(listItemId=="addGroup") {
          newArray = this.modal.addNewGroup({
            groupId: this.modal.generateNewId(),
            groupName: listItemValue
          });
          groupsListId.innerHTML = ""; 
          this.view.renderListItems(newArray, groupsListId);  
        }
        else if(listItemId=="addFriend") {
          newArray = this.modal.addNewFriend({
            userId: this.modal.generateNewId(),
            userName: listItemValue  
          });
          friendsListId.innerHTML = "";
          this.view.renderListItems(newArray, friendsListId);  
        }  
      }
    });  
  }
  
  relevantListItemExpenses() {
    document.addEventListener("click", event => {
      const listItem = event.target;  
      
    }); 
  }
}
