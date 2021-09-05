const defaultState = {
    currentEntries:4,
    currentPage:1
}

const pageConfig = (state = defaultState, action) => {
    
    switch (action.type) {
        case "GoToPage":
            return {
                ...state,
                currentPage:action.payload.page
            }
        default: 
            return state
    }
}

export default pageConfig