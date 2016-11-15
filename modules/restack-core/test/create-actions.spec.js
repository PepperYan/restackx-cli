
function createRequestActions(base) {

    const actionTypes = ["REQUEST", "SUCCESS", "FAILURE"].reduce((all, type) => {
        all[`${base.toUpperCase()}_${type}`] = `${base.toUpperCase()}_${type}`;
        return all
    }, {})

    const actions = {
        request: () => {type: `${base}_REQUEST`},
        success: () => {type: `${base}_SUCCESS`},
        failure: () => {type: `${base}_FAILURE`}
    }

    return {
        ...actionTypes,
        [base]: actions
    }
}


it('works fine', () => {
  let result = createRequestActions("budgetModules")
  let result2 = createRequestActions("users")

  function combine(...actions) {
    return actions.reduce( (all, each) => {
      return {...all, ...each}
    }, {})
  }

  console.log(result)
  console.log(result2)

  console.log(combine(result, result2))
})
