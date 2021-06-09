function reducer_groups(state ,action){
    
    if(action.type === 'load_chathead')
        {
            state = [1]
        return {
            state,
            value: action.payload
               }
        }
    
    else if(action.type === 'load_form')
        {   state = [2];
        return  {state}
        }
    else if(action.type === 'load_home')
        {   state = [0];
        return  {state}
        }

    return state;
}

export default reducer_groups;