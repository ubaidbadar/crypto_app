const getUser = userDOC => {
    const { password, ...user } = userDOC._doc;
    if(user.email.includes('@test.com')) user.email = null;
    if(user.phone.includes('--')) user.phone = null;
    return user;
}

module.exports = getUser;