# htt-loader
it's a dynamic js loader for webpack

## usage
for webPack
```js
{
  loader: 'htt-loader',
  options: {
    lazy: true,
    name: 'xx',
    regExp: 'abc/xx/(.*)/',
  }
}
```
由于实际上使用的还是promise异步函数，所以你应该还需要一个js着陆的Component，拿react来说的话例如以下这个简单的栗子：
```js
import { Component } from 'react';

// 这是一个demo给被loader封装过的js的React.Component
class Bundle extends Component {
  state = {
    // short for "module" but that's a keyword in js, so "mod"
    mod: null
  }

  componentWillMount() {
    this.load(this.props)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.load !== this.props.load) {
      this.load(nextProps)
    }
  }
  // 加载
  load = (props) => {
    props.load(this.cb)();
  }
  // 回调
  cb = (_import) => {
    this.setState({ mod: _import.default || null });
  }

  render() {
    const Mod = this.state.mod;
    return this.state.mod ? <Mod /> : null
  }
}
```

## caution
使用的时候必须遵守的规则
- 需要在.babelrc加入syntax-dynamic-import规则用来开启动态加载语法

