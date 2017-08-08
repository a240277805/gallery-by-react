/**
 * Created by zmk on 2017/8/8.
 */
var initialState=[];

export function testreducer(state=initialState,action){
  console.log(' testreducer called with state ', state , ' and action ', action);
  switch(action.type){
    case "TestReducer":
      return{
        ...state,
        frozen:true
      }
    default:
      return  state;
  }
}
