import createReducer from 'restack-core/lib/utils/createReducer'

const INCREMENT = "INCREMENT"
const increment = createReducer(1,{
	[INCREMENT](state, action){
		console.log('increment');
		return ++state;
	},
});

export default {increment};
