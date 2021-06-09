function reducer_groups(state ,action){
    
    if(action.type === 'render_form')
        {
            state = [1]
        return {
            state,
            value: action.payload
               }
        }
    

    return state;
}

export default reducer_survey;