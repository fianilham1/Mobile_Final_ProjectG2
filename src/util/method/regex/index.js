export const ValidateRegexEmail = (emailInput) => {
    const regex = (/^[\w!#$%&’*+/=?`{|}~^-]+(?:\.[\w!#$%&’*+/=?`{|}~^-]+)*@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,6}$/.test(emailInput))
    return regex
}

export const  ValidateRegexPassword = (passwordInput) => {
    const specialChar = (/[^a-zA-Z0-9]/).test(passwordInput)
    const upperCase = (/[A-Z]/).test(passwordInput)
    const lowerCase = (/[a-z]/).test(passwordInput)
    const digitCase = (/[0-9]/).test(passwordInput)

    if (passwordInput.length < 8)
    {
        return ({
            status:false,
            errorMessage:'Password Length must be at least 8 char'
        })
    }else if(!specialChar){
         
        return ({
            status:false,
            errorMessage:'Password must have at least 1 special char'
        })
    }else if(!upperCase){
        return ({
            status:false,
            errorMessage:'Password must have at least 1 uppercase char'
        })  
    }else if(!lowerCase){  
        return ({
            status:false,
            errorMessage:'Password must have at least 1 lowercase char'
        })
    }else if(!digitCase){   
        return ({
            status:false,
            errorMessage:'Password must have at least 1 digit char'
        })
    }

    return ({
        status:true
    })
}