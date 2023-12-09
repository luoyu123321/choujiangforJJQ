
class Tab {
  constructor (id) {
    // 1. 获取元素
    this.main = document.querySelector(id)               
    this.content = this.main.querySelector('.jiangpin')
    this.clickBtn = this.main.querySelector('.choujiangBTN') 
    this.startend = false
    this.timeout = null
    this.init()
  }
  init () {
    // 把类中的 this 添加到 Tab 类下的 self 属性上
    Tab.self = this
    
    this.clickBtn.addEventListener('click', this.click)

  }
  
  click () {
    var that = Tab.self
    that.startend = !that.startend
    console.log(1111,this, that, that.startend)
    if(that.startend){
    // const jiangpin = ['苹果手表', '一元参与奖', '一小套化妆品(价值600元)', '带金手串', '一元参与奖','苹果手表', '一元参与奖', '一小套化妆品(价值600元)', '带金手串', '一元参与奖']
    const jiangpin = ['测试小狗屎1', '测试小垃圾2', '测试罗老师3', '测试床4', '测试瘦5','测试小狗屎1', '测试小垃圾2', '测试罗老师3', '测试床4', '测试瘦5']
    that.timeout = setInterval(()=>{
        const res = parseInt(Math.random() * 10)
        that.content.innerText = jiangpin[res]
      },20)
    } else {
      clearInterval(that.timeout)
    }
    that.init()
    
  }
}

// 实例化一个tab栏对象
new Tab('#choujiang')