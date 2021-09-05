const defaultState = {
    currentPage : "/user/auth"
}

const pageConfig = (state = defaultState, action) => {
    
    switch (action.type) {
        case "/user/auth":
            return {
                currentPage:"/user/auth"
            }
        case "/dashboard":
            return {
                currentPage:"/dashboard"
            }
        case "/listParking":
            return {
                currentPage:"/listParking"
            }
        default: 
            return state
    }
}

export default pageConfig