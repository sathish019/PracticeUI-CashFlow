class Modal {
  constructor(friendList, groupList, renderFriends, renderGroups) {
    this.frindsList = friendList;
    this.groupsList = groupList;
    this.friendsElement = renderFriends;
    this.groupsElement = renderGroups;
  }

  generateNewId() {
    return Math.floor(Math.random()*10);  
  }

  getFriendsElementId() {
    return this.friendsElement;  
  }

  getGroupsElementId() {
     return this.groupsElement; 
  }

  getFriendsList() {
    return this.frindsList;
  }

  getGroupsList() {
    return this.groupsList;
  }

  addNewFriend(newArrayObject) {  
    this.frindsList.push(newArrayObject);
    return this.frindsList;
  }

  addNewGroup(newArrayObject) {  
    this.groupsList.push(newArrayObject);
    return this.groupsList;
  }
}
