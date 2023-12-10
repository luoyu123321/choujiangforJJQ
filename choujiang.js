
class Tab {
  constructor(id) {
    // 1. 获取元素
    this.main = document.querySelector(id)
    // 获取需要操作的页面元素              
    this.jiangpinContent = document.querySelector('.jiangpin')
    this.timesContent = document.querySelector('.choujiangTimes')
    this.hadContent = document.querySelector('.hadjiangpin')
    this.bingoContent = document.querySelector('.bingo')
    // 將各个按钮添加监听时间
    document.querySelector('.choujiangBTN').addEventListener('click', this.click);
    document.querySelector('.openModal').addEventListener('click', this.openModal);
    document.querySelector('.closeModal1').addEventListener('click', this.closeModal);
    document.querySelector('.closeModal2').addEventListener('click', this.closeModal);
    // 抽奖按钮开始结束标识
    this.startend = false
    // 抽到的奖品
    this.bingoGift = ''
    // 定义的定时器，方便清除定时器
    this.timeout = null
    this.initData()
    this.initFunc()
  }

  initData() {
    // localStorage.setItem('choujiangTimes', '0')
    // localStorage.setItem('jiangpin', '[]')
    // localStorage.removeItem('choujiangTimes')
    // localStorage.removeItem('jiangpin')
  }

  initFunc() {
    // 把类中的 this 添加到 Tab 类下的 self 属性上
    Tab.self = this
    const choujiangTimes = localStorage.getItem('choujiangTimes');
    const jiangpin = localStorage.getItem('jiangpin');
    console.log('choujiangTimes', choujiangTimes,jiangpin)
    this.timesContent.innerText = `剩余 ${2 - parseInt(choujiangTimes || 0)} 次机会`
  }

  click() {
    const choujiangTimes = localStorage.getItem('choujiangTimes');
    const jiangpinArr = localStorage.getItem('jiangpin');
    console.log('localStorage1', choujiangTimes, 'localStorage2', jiangpinArr)
    if (choujiangTimes >= 2) {
      return alert('抽奖次数用完啦，看看自己的奖品吧')
    }
    const that = Tab.self
    that.startend = !that.startend
    !that.startend && localStorage.setItem('choujiangTimes', parseInt(choujiangTimes || 0) + 1)
    if (that.startend) {
      // const jiangpin = ['苹果手表', '一元参与奖', '一小套化妆品(价值600元)', '带金手串', '一元参与奖','苹果手表', '一元参与奖', '一小套化妆品(价值600元)', '带金手串', '一元参与奖']
      const jiangpin = ['测试小狗屎1', '测试小垃圾2', '测试罗老师3', '测试床4', '测试瘦5', '测试小狗屎1', '测试小垃圾2', '测试罗老师3', '测试床4', '测试瘦5']
      that.timeout = setInterval(() => {
        const res = parseInt(Math.random() * 10);
        that.jiangpinContent.innerText = jiangpin[res];
        that.bingoGift = jiangpin[res]
      }, 20)
    } else {
      clearInterval(that.timeout);
      if(that.bingoGift) {
        that.bingoContent.innerText = '';
        document.getElementById('tips').classList.add('show');
        document.getElementById('modal-overlay').classList.add('show');
        that.bingoContent.innerHTML = `<div>恭喜小公主</div><div>中了【<span style="color: greenyellow; font-weight: bold;">${that.bingoGift}</span>】</div>`;
        const newJiangpinArr = JSON.stringify(JSON.parse(jiangpinArr || '[]').concat([that.bingoGift]));
        localStorage.setItem('jiangpin', newJiangpinArr);
      }
    }
    that.initFunc();
  }

  openModal() {
    const that = Tab.self
    // 打开弹框钱先清空弹框内容
    that.hadContent.innerHTML = '';
    const jiangpinArr = JSON.parse(localStorage.getItem('jiangpin') || '[]');
    document.getElementById('modal').classList.add('show');
    document.getElementById('modal-overlay').classList.add('show');
    jiangpinArr.forEach((item)=> that.hadContent.innerHTML += `<div style="color: greenyellow;">${item}</div>`)
    if(jiangpinArr.length === 0) {
      that.hadContent.innerHTML =`<div style="color: lightgray;">您还没有奖品哦</div><div>赶快去抽奖吧</div>`
    }
  }

  closeModal() {
    document.getElementById('tips').classList.remove('show');
    document.getElementById('modal').classList.remove('show');
    document.getElementById('modal-overlay').classList.remove('show');
  }


}

// 实例化一个tab栏对象
new Tab('#choujiang')