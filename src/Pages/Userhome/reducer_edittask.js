function reducer_edittask(state ,action){
    
    if(action.type === 'task_edit')
        {
            console.log("found here");
            state = [1]
        return {
            state,
            value: action.payload
               }
        }


    return state;
}

export default reducer_edittask;