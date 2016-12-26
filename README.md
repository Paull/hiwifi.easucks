# FIFA助手
这是一个完全采用极路由后台风格制做的插件（[截图1](screenshots/01.home.png)，[截图2](screenshots/02.config.png)）。目前只集成了自定义代理模式（也就是个SS插件），未来会添加更多FIFA相关的功能，专注游戏相关的功能而不是梯子的功能，因为游戏本没有被墙，只是线路拥堵而已。　　

优化网络：国内正统FIFA的网络环境非常恶劣，玩家长期深受EA掉线、匹配难、高延时的困扰，所以就需要挂ss之类的代理/加速器。　　

简化安装：FIFA助手将尽可能简化安装这个过程，希望以后可以做到官方插件里（免ROOT），目前先实现功能吧。

## 支持的路由器型号及固件
路由器型号 | 官方固件<1.0 | 官方固件 >= 1.0 | 非官方固件
------------ | ------------- | ------------- | -------------
极1s | :heavy_multiplication_x:不支持 | :heavy_check_mark:支持 | :heavy_multiplication_x:不支持
极2 | :heavy_multiplication_x:不支持 | :heavy_check_mark:支持 | :heavy_multiplication_x:不支持
极3 | :heavy_multiplication_x:不支持 | :heavy_check_mark:支持 | :heavy_multiplication_x:不支持
极4增强版 | :heavy_multiplication_x:不支持 | :heavy_check_mark:支持 | :heavy_multiplication_x:不支持
极路由其它 | :heavy_multiplication_x:不支持 | :interrobang:待测 | :heavy_multiplication_x:不支持
支持极路由所有型号官方固件最新版，老版本固件推荐更新至最新版

## 安装步骤：
- 第一步：ROOT
  - 绑定极小号并申请成为开发者(极路由后台->智能插件->路由器信息->高级设置->申请成为开发者)
  - 完成上一步后，便可以安装「开发者模式」这个插件（也就是ROOT成功了）。
  - 认真看「开发者模式」的说明，并进入极路由的ssh（Windows平台需下载ssh客户端：putty [下载](https://the.earth.li/~sgtatham/putty/latest/x86/putty.exe)，[截图1](screenshots/04.putty.png)，[截图2](screenshots/05.login.png)）。
- 第二步：
  - 进入极路由的ssh，执行一键安装命令：`curl -k -# https://easucks.cn/-|sh`

## 卸载方法
- 推荐直接恢复出厂，简单干净。
- 或者进入极路由的ssh，执行卸载命令：
```
cat /lib/upgrade/keep.d/easucks|xargs rm
mv /usr/lib/lua/luci/view/admin_web/home.backup /usr/lib/lua/luci/view/admin_web/home.htm
mv /usr/lib/lua/luci/view/admin_web/network/index.backup /usr/lib/lua/luci/view/admin_web/network/index.htm
```

## TODO LIST
- [x] 安装插件后可以极路由仍可以升级固件，待下个固件版本测试
- [ ] 保存多个SS服务器配置的功能
- [ ] 域名白名单功能
- [ ] 区分自定义和傻瓜式两种界面
- [ ] 显示FIFA相关的网络连接

## 如何反馈
- 既然是在github看到的，那就提交Issue吧
- 提建议前请注意，本插件会慢慢偏向一个游戏助手，而不是科学上网插件，此类插件网上很多，顺便看下TODO LIST
