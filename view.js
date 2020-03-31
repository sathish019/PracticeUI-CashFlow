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
      if(value.userName !== undefined) 
        liItemDescription = document.createTextNode(value.userName);
      else 
        liItemDescription = document.createTextNode(value.groupName);  
      liItem.appendChild(liItemDescription);  
      elementId.appendChild(liItem);
    });
  }

  renderRelevantExpenses() {
    const mainContainer = document.getElementById(this.elementToRenderExpenses); 
  }
}
