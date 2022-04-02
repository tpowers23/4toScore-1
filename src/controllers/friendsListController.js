import friendService from "../services/friendService";

let getFriendsList = (req, res) => {
    friendService.findFriends(req.user.user_id);
    return res.render("friends.ejs", {
        user: req.user
    })
};



module.exports = {
    getFriendsList: getFriendsList
};