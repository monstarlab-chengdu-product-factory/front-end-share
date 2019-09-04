import Taro, { Component, Config } from '@tarojs/taro';
import { View, Text, Button, Image } from '@tarojs/components';
import './index.scss';
import Jpg from './WechatI1.jpeg'

export default class Index extends Component {
  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config = {
    navigationBarTitleText: '首页',
    usingComponents: {
      painter: '/pages/painter/painter'
    }
  };
  // state={
  //   test:{
  //     width: '300px',
  //     height: '416px',
  //     background: Jpg,
  //     views: [
  //       {
  //         type:'text',
  //         text:'我\n果\n然\n是\n个\n天\n才\n!',
  //         css:{
  //           top:'300px',
  //           left:'20px',
  //         }
  //       }
  //     ]
  //   }

  // }

  onImgOK=(e)=>{
    this.setState({
      src:e.detail.path
    })
  }

  draw=()=>{
    const views = [
      {
        type:'image',
        url:Jpg,
        css:{
          width:'300px',
          height:'416px',
          top:'0px',
          left:'0px'
        }
      },
      {
        type:'qrcode',
        content:'樱木花道',
        css:{
          width:'50px',
          height:'50px',
          top:'200px',
          left:'60px',
          shadow:'10px 10px 5px #888888'
        }
      }
    ];
    const text = '我果然是个天才!'
    let tmpText = '';
    let index = 0;
    for (let i = 0; i < text.length; i++) {
      tmpText = `${text[i]}`;
        views.push({
          type: 'text',
          text: tmpText,
          css: {
            left: '20px',
            top: `${150 + index}px`,
            fontSize: '40rpx',
            lineHeight: '50rpx',
            shadow:'10px 10px 5px #888888',
            rotate:'20',
            textStyle:'stroke'
          },
        });
        index += 30;
        tmpText = '';
    }
    return ({
      width: '300px',
      height: '416px',
      background: '#ccc',
      views: views,
    });
  }

  componentWillMount() {}

  componentDidMount() {
    this.setState({
      test:this.draw()
    })
  }

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    const { test, src } = this.state
    console.log('test',test)
    return (
      <View className='page'>
        <Button>生成canvas</Button>
        <View className='canvas'>
          <painter
            palette={test}
            onImgOK={this.onImgOK}
            onImgErr={this.onImgErr}
          />
        </View>
        <Image src={src} className='img'></Image>
      </View>
    );
  }
}
