import {observable, computed, reaction} from 'mobx'


export default class HelloStore{
  @observable msg = "world"

  sayHi(name){
  }

  changeMsg(msg){
    this.msg = msg
  }
}
