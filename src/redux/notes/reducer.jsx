const DEFAULT_STATE={
    data: [],
    loading: false,
    error: null,
}
export const notesReducer = (state=DEFAULT_STATE, action) => {
  switch (action.type) {
    case "NOTES/LOADING":
      return{
        loading:true,
        error:null,
        data:[]
      }
    
    case "NOTES/SET":
      return{
        loading:false,
        error:null,
        data:action.payload
    }

    case "NOTES/DELETE":
      return{
        loading:false,
        error:null,
        data:action.payload
    }

    case "NOTES/ADD":
      return{
        loading:false,
        error:null,
        data:state.data.concat(action.payload)
    }

    case "NOTES/ERROR":
      return{
        ...state,
        loading:false,
        error:action.payload.toString(),
    }
    default:
      return state;
  }
};
