export function handleModels(context){
  const models = {}
  const preHandle =  context.keys()
  .map((key)=>{
    const array = key.split("/")
    const fullName = array[array.length-1]
    const name = array[array.length-1].slice(0,fullName.length-9)
    const modelCls = context(key).default
    return models[name] = new modelCls()
  })
  return models;
}
