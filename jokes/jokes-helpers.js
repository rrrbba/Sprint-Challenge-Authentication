module.exports = {
    validateUser
};

function validateUser(user) {
    let errors = [];

    if(!user.username || user.username.length < 2) {
        errors.push('PLEASE INCLUDE A USERNAME WITH AT LEAST 2 CHARACTERS!!!')
    }

    if(!user.password || user.password.length < 4) {
        errors.push('PLEASE INCLUDE A PASSWORD WITH AT LEAST 4 CHARACTERS!!!')
    }

    return {
        isSuccessful: errors.length > 0 ? false : true,
        errors
    }
};