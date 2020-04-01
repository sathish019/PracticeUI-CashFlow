class Modal {
  constructor(friendList, groupList, renderFriends, renderGroups) {
    this.friendsList = friendList;
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
    return this.friendsList;
  }

  getGroupsList() {
    return this.groupsList;
  }

  addNewFriend(newArrayObject) {  
    this.friendsList.push(newArrayObject);
    return this.friendsList;
  }

  addNewGroup(newArrayObject) {  
    this.groupsList.push(newArrayObject);
    return this.groupsList;
  }

  filterObjectOfFriend(objectId,objectName) {
    const object = this.friendsList.filter(
      (obj) => {
        if(obj.userId == parseInt(objectId) && obj.userName == objectName){
          return obj;
        } 
      });
    return object; 
  }

  filterObjectOfGroup(objectId,objectName) {
    const object = this.groupsList.filter(
      (obj) => {
        if(obj.groupId == parseInt(objectId) && obj.groupName == objectName){
          return obj;
        }
      }); 
    return object;  
  }
}
