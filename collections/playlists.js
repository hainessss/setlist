Playlists = new Meteor.Collection('playlists');

Meteor.methods({
  createPlaylist: function(playlistData) {
    var user = Meteor.user();

    if (!user) {
      throw new Meteor.Error(401, "You must be logged in to create a new playlist");
    }

    if(!playlistData.name) {
      throw new Meteor.Error(422, "Please give your playlist a name");
    }

    var playlist = _.extend(_.pick(playlistData, 'name'), {
      userId: user._id,
      submitted: new Date().getTime(),
      collaborators: [],
      FB_id: user.services.facebook.id
    });

    var playlistId = Playlists.insert(playlist);

    return playlistId;
  },

  deletePlaylist: function(playlistId, playlistAdminId) {
    var user = Meteor.user();
    var ownsPlaylist = function(userId, pfAdminId) {
      return userId === pfAdminId;
    }

    if (!user) {
      throw new Meteor.Error(401, "You must be logged in to create a new playlist");
    }

    if (!ownsPlaylist(user._id, playlistAdminId)) {
      throw new Meteor.Error(422, "You do not own this playlist, jerk!");
    }


    var playlistId = Playlists.remove(playlistId);
  },

  addCollaborator: function(playlistId) {
    var user = Meteor.user();

    if (!user) {
      throw new Meteor.Error(401, "You must be logged in to create a new playlist");
    }

    return Playlists.update({_id: playlistId}, {$push: {collaborators: user._id}});
  }
});
