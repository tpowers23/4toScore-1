import connection from "../config/connectDB";


//then with that user_id query into friends table and find all friends
//usernames with that user_id

let findFriends = (user_id) => {
    connection.query("SELECT friend_username from friends where user_id = ?", user_id, function (error, result) {
        if (error) throw(error);
        let friend = result;
        console.log(friend);
    });
    /*
    connection.query("SELECT * from friends where user_id = ?", user_id, function (error, rows) {
        if (error) throw error;
        let friends = [];
        for (let i = 0; i < rows.length; i++) {
            friends.push(rows[i]);
        }
        //console.log(friends);
    });*/
};

module.exports = {
    findFriends: findFriends
};


//shows friends in friends list on website

/*
To add a friend:
1. User searches for friends through a table that shows all users
created EXCEPT THEIR OWN SINCE THEY CANT FRIEND THEMSELF
2. User has found friends and presses add friend button
3. Said friend is entered into friends table and is assigned
the user_id that added them as a friend.

To Remove a friend: 
1. User searches their friends list to find friend they want to remove.
This performs a query using the user's user_id to get their friends.
2. User has found friend and presses remove friend button.
3. Said friend is removed from friends table by finding them by username and
user_id they are assigned to. 
*/