function reducer_delete(state ,action){
    
    if(action.type === 'delete_group')
        {
            state = [1]
        return {
            state
               }
        }

    return state;
}

export default reducer_delete;