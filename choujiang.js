
class Tab {
  constructor(id) {
    // 1. 获取元素
    this.main = document.querySelector(id)
    // 获取需要操作的页面元素              
    this.jiangpinContent = document.querySelector('.jiangpin')
    this.timesContent = document.querySelector('.choujiangTimes')
    this.hadContent = document.querySelector('.hadjiangpin')
    this.bingoContent = document.querySelector('.bingo')
    this.jiangchiContent = document.querySelector('.jiangchi')
    this.addcdk = document.getElementById("addcdk")
    // 將各个按钮添加监听时间
    document.querySelector('.choujiangBTN').addEventListener('click', this.click);
    document.querySelector('.open-modal').addEventListener('click', this.openModal);
    document.querySelector('.openjiangchi-modal').addEventListener('click', this.openjiangchiModal);
    document.querySelector('.closeModal1').addEventListener('click', this.closeModal);
    document.querySelector('.closeModal2').addEventListener('click', this.closeModal);
    document.querySelector('.closeModal3').addEventListener('click', this.closeModal);
    document.querySelector('.addtimes').addEventListener('click', this.addtimes);
    // 抽奖按钮开始结束标识
    this.startend = false
    // 抽到的奖品
    this.bingoGift = ''
    // 定义的定时器，方便清除定时器
    this.timeout = null
    // 全部奖池
    this.jiangchi = [
      '特等隐藏奖苹果手表',
      '特等奖金吊坠或金手串',
      '两个愿望',
      '一个愿望',
      '周末游（1000元预算）',
      '周末游（700元预算）',
      '周末游（500元预算）',
      '一小套化妆品(价值500元)',
      '苹果原装手机壳',
      '罗大师亲手画作（带裱框）',
      '全身SPA按摩一次',
      '参与慰问奖131.4元',
      '参与安慰奖52元',
      '参与奖13.14元',
      '参与奖5.20元',
    ]
    this.initData()
    this.initFunc()
  }

  initData() {
    localStorage.setItem('addcdk', JSON.stringify(['我爱你', '我喜欢你', '我对象最帅']))
    // localStorage.setItem('jiangpin', '[]')
    localStorage.removeItem('choujiangTimes')
    localStorage.removeItem('jiangpin')
  }

  initFunc() {
    // 把类中的 this 添加到 Tab 类下的 self 属性上
    Tab.self = this
    const choujiangTimes = localStorage.getItem('choujiangTimes');
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
      that.timeout = setInterval(() => {
        const setData = (value) => {
          that.jiangpinContent.innerText = value;
          that.bingoGift = value;
        }
        const res = parseInt(Math.random() * 100);
        if (res < 2) {
          setData(that.jiangchi[0]);
        } else if (res >= 2 && res < 5) {
          setData(that.jiangchi[1]);
        } else if (res >= 5 && res < 8) {
          setData(that.jiangchi[2]);
        } else if (res >= 8 && res < 12) {
          setData(that.jiangchi[3]);
        } else if (res >= 12 && res < 15) {
          setData(that.jiangchi[4]);
        } else if (res >= 15 && res < 19) {
          setData(that.jiangchi[5]);
        } else if (res >= 19 && res < 24) {
          setData(that.jiangchi[6]);
        } else if (res >= 24 && res < 30) {
          setData(that.jiangchi[7]);
        } else {
          setData(that.jiangchi[parseInt(res / 10) + 5]);
        }
      }, 20)
    } else {
      clearInterval(that.timeout);
      if (that.bingoGift) {
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
    if (jiangpinArr.length === 0) {
      return that.hadContent.innerHTML = `<div style="color: lightgray;">您还没有奖品哦</div><div>赶快去抽奖吧</div>`
    }
    jiangpinArr.forEach((item) => that.hadContent.innerHTML += `<div style="color: greenyellow;">${item}</div>`)
  }

  openjiangchiModal() {
    const that = Tab.self
    const choujiangTimes = localStorage.getItem('choujiangTimes');
    const jiangpinArr = JSON.parse(localStorage.getItem('jiangpin') || '[]');
    console.log('choujiangTimes', choujiangTimes, that.jiangchi.indexOf(jiangpinArr[0]))
    if (choujiangTimes < 2 || choujiangTimes === null) {
      if (!confirm('还没抽完奖，确定要查看奖池吗')) return;
      if (!confirm('真的要查看吗')) return;
      if (!confirm('先看奖品就没有惊喜喽，确定继续查看吗')) return;
    }
    if (jiangpinArr.length >= 2) {
      if (jiangpinArr.every((item) => that.jiangchi.indexOf(item) > 7)) {
        if (!confirm('当你看到这个提示，就是与大奖擦肩而过了（狗头）')) return;
        if (!confirm('看完奖池别生气，快找你对象再抽')) return;
      } else {
        if (!confirm('恭喜幸运的小公主，中到了中大奖！')) return;
        if (!confirm('点击确认继续查看奖池，快去找你对象兑奖吧！')) return;
      }
    }
    // 打开弹框钱先清空弹框内容
    that.jiangchiContent.innerHTML = '';
    document.getElementById('jiangchi-modal').classList.add('show');
    document.getElementById('modal-overlay').classList.add('show');
    that.jiangchi.forEach((item) => that.jiangchiContent.innerHTML += `<div style="color: greenyellow;">${item}</div>`)
  }

  closeModal() {
    document.getElementById('tips').classList.remove('show');
    document.getElementById('modal').classList.remove('show');
    document.getElementById('jiangchi-modal').classList.remove('show');
    document.getElementById('modal-overlay').classList.remove('show');
  }

  addtimes() {
    const that = Tab.self
    const addcdk = localStorage.getItem('addcdk');
    const choujiangTimes = localStorage.getItem('choujiangTimes');
    const cdklist = JSON.parse(addcdk) || []
    if (cdklist.length > 0 && cdklist.includes(that.addcdk.value)) {
      localStorage.setItem('choujiangTimes', choujiangTimes - 1)
      const rescdk = cdklist.filter((item) => {
        return item !== that.addcdk.value
      })
      localStorage.setItem('addcdk', JSON.stringify(rescdk))
      that.initFunc()
    } else {
      return alert('别乱输入cdk哦，快去找你对象要！')
    }
  }


}

// 实例化一个tab栏对象
new Tab('#choujiang')