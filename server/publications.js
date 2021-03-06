Meteor.publish('tracks', function(playlistId) {
  return Tracks.find({pid: playlistId});
});

Meteor.publish('playlists', function(userId) {
  return Playlists.find({userId: userId});
});

Meteor.publish('collaborations', function(userId) {
  return Playlists.find({collaborators: userId});
});

Meteor.publish('playlist', function(id) {
  return Playlists.find({_id: id});
});

Meteor.publish('friendsPlaylists', function(userList) {
  return Playlists.find({FB_id: {$in: userList}});
});

Meteor.publish('notifications', function(userId) {
  return Notifications.find({userId: userId, read: false});
});

Meteor.publish("userData", function () {
  if (this.userId) {
    return Meteor.users.find({_id: this.userId},
                             {fields: {'services.facebook.id': true, 'scUser': true, 'rdioUser': true}});
  } else {
    this.ready();
  }
});
