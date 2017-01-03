# FIFA助手
目前只集成了SS插件，未来会添加更多FIFA相关的功能，专注游戏相关的功能而不是梯子的功能，因为游戏本没有被墙，只是线路拥堵而已。　　

# 主要功能
- 优化网络：国内正统FIFA的网络环境较为恶劣，玩家长期深受EA掉线、匹配难、高延时等网络问题的困扰，常常需要挂SS才能解决问题。  
- 查看对手（开发中）：FIFA网战常常匹配到高延时、卡顿、卡训练场的对手，通过查看对手的IP，可以得知对手地理位置和运营商这两个参考信息，进一步分析自己匹配池，从而使优化匹配池成为可能。
- 查看服务器IP（开发中）：类似查看对手，但FIFA的Pro模式和FUT Champions模式是通过服务器转发而非P2P直连的，看不到对手的IP，所以只能看到决定你延时多少的其中一半因素：服务器IP。

# 与其它SS插件的区别
- 完全采用极路由后台风格（[截图1](screenshots/01.home.png)，[截图2](screenshots/02.config.png)），插件样式会比普通插件更美观。
- 重点优化了GFWLIST模式，集成FIFA相关的域名，做到EA、LIVE、PSN、ORIGIN走代理，下载和网战仍然是裸连。所以推荐大家使用这个模式。
- 当然重点是我们的目标不是做个SS插件，以后会推出更多FIFA相关的功能。

## 支持的路由器型号及固件
路由器型号 | 官方固件<1.2.5 | 官方固件 >= 1.2.5 | 非官方固件
------------ | ------------- | ------------- | -------------
极1s | :heavy_multiplication_x:不支持 | :heavy_check_mark:支持 | :heavy_multiplication_x:不支持
极2 | :heavy_multiplication_x:不支持 | :heavy_check_mark:支持 | :heavy_multiplication_x:不支持
极3 | :heavy_multiplication_x:不支持 | :heavy_check_mark:支持 | :heavy_multiplication_x:不支持
极4增强版 | :heavy_multiplication_x:不支持 | :heavy_check_mark:支持 | :heavy_multiplication_x:不支持
极路由其它 | :heavy_multiplication_x:不支持 | :interrobang:待测 | :heavy_multiplication_x:不支持
支持极路由所有型号，请升级至官方固件最新版:bangbang:

## 安装步骤：
- 第一步：ROOT
  - 绑定极小号并申请成为开发者(极路由后台->智能插件->路由器信息->高级设置->申请成为开发者)
  - 完成上一步后，便可以安装「开发者模式」这个插件（装完这个插件也就是ROOT成功了）。
  - 认真看「开发者模式」的说明，并进入极路由的ssh（Windows平台需下载ssh客户端：putty [下载](https://the.earth.li/~sgtatham/putty/latest/x86/putty.exe)，[截图1](screenshots/04.putty.png)，[截图2](screenshots/05.login.png)）。
- 第二步：
  - 进入极路由的ssh，执行一句话安装指令：`curl easucks.cn/-|sh`（[查看截图](screenshots/06.install.png)）

## 卸载方法
- 推荐直接恢复出厂，简单干净。
- 或者进入极路由的ssh，执行卸载命令：
```
cat /lib/upgrade/keep.d/easucks|xargs rm
mv /usr/lib/lua/luci/view/admin_web/home.backup /usr/lib/lua/luci/view/admin_web/home.htm
mv /usr/lib/lua/luci/view/admin_web/network/index.backup /usr/lib/lua/luci/view/admin_web/network/index.htm
```

## TODO LIST
- [x] 安装本插件后，极路由仍可以自由升级固件（待下个固件版本测试）
- [x] SS插件新增「重启」按钮，同时「启动」和「重启」按钮已具备判断表单是否变动，如有变动会先保存再执行操作
- [x] 保存多个SS服务器配置的功能
- [x] 域名白名单功能
- [ ] 扩展SS状态的判断，现在的SS状态只判断了进程是否启动，未判断DNS和iptables等信赖服务的状态
- [ ] 区分自定义和傻瓜式两种界面
- [ ] 查看匹配对手的IP或周赛服务器的IP

## 如何反馈
- 既然是在github看到的，那就提交Issue吧
