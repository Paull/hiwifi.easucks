# 最新功能
- FIFA19锁服功能，强制锁定中亚（香港）服务器（[截图7](screenshots/07.fifa19regionlock.png)）
- 适用于Division Rivals模式、周赛模式以及俱乐部模式（其中俱乐部模式可查看当前所在服务器[截图8](screenshots/08.likeapro.png)）

# FIFA助手
- 目前只是个SS插件而已。
- 完全采用极路由后台风格设计（[截图1](screenshots/01.home.png)，[截图2](screenshots/02.config.png)），插件样式更美观。
- 重点优化了GFWLIST模式，集成FIFA相关的域名（[截图3](screenshots/03.mylist.png)），做到EA、LIVE、PSN、ORIGIN走代理，下载和网战仍然是裸连。所以推荐大家使用这个模式。
- 网页模式和游戏模式默认开启国内IP白名单，不影响国内网站的正常访问和速度
- 拥有更多的自主权，可以自定义强制走代理或强制不走代理的域名、IP、IP段甚至是MAC地址
- 但我们的目标不是做个SS插件，未来会推出更多FIFA相关的功能，专注游戏而不是梯子，因为游戏本没有被墙，只是线路拥堵而已。

## 主要功能
- 优化网络：国内正统FIFA的网络环境较为恶劣，玩家长期深受EA掉线、匹配难、高延时等网络问题的困扰，常常需要挂SS才能解决问题。
- 切匹配池：同上，挂了SS以后，根据SS的GeoIP决定FIFA的匹配池（理论）。
- 查看对手IP（开发中）：FIFA网战常常匹配到高延时、卡顿、卡训练场的对手，通过查看对手的IP，可以得知对手地理位置和运营商这两个参考信息，进一步分析自己匹配池，从而使优化匹配池成为可能。
- 查看服务器IP（开发中）：类似查看对手，但FIFA的Pro模式和FUT Champions模式是通过服务器转发而非P2P直连的，看不到对手的IP，所以只能看到决定你延时多少的其中一半因素--->服务器IP。

## 支持的路由器型号及固件
路由器型号 | 官方固件<1.2.5 | 官方固件 >= 1.2.5 | 非官方固件 |
------------ | ------------- | ------------- | ------------- |
极1s | :heavy_multiplication_x:不支持 | :heavy_check_mark:支持 | :heavy_multiplication_x:不支持 |
极2 | :heavy_multiplication_x:不支持 | :heavy_check_mark:支持 | :heavy_multiplication_x:不支持 |
极3 | :heavy_multiplication_x:不支持 | :heavy_check_mark:支持 | :heavy_multiplication_x:不支持 |
极4 | :heavy_multiplication_x:不支持 | :heavy_check_mark:支持 | :heavy_multiplication_x:不支持 |
极B70 | :heavy_multiplication_x:不支持 | :heavy_check_mark:支持 | :heavy_multiplication_x:不支持 |
极Enjoy | :heavy_multiplication_x:不支持 | :heavy_check_mark:支持 | :heavy_multiplication_x:不支持 |
极路由x美的 | :heavy_multiplication_x:不支持 | :heavy_check_mark:支持 | :heavy_multiplication_x:不支持 |
极路由其它 | :heavy_multiplication_x:不支持 | :interrobang:待测 | :heavy_multiplication_x:不支持 |

理论支持极路由所有型号，需升级至官方固件最新版:bangbang: 

## 安装步骤：
- 工具准备：
  - Windows需下载ssh客户端：putty（[点此下载](https://the.earth.li/~sgtatham/putty/latest/w32/putty.exe)）
- 第一步：申请开发者模式
  - 登录极路由后台->智能插件->路由器信息->高级设置->申请开发者模式(新路由器要15天后才能申请:bangbang:)
- 第二步：开启ssh服务
  - 安装「开发者模式」这个插件既可开启ssh服务
- 第三步：登录ssh
  - 使用ssh客户端连接路由器的IP地址(一般是192.168.199.1)和1022端口（[截图4](screenshots/04.putty.png)）
  - 登录ssh需要帐号密码，帐号是root，密码一般就是wifi密码（[截图5](screenshots/05.login.png)）
- 第四步：安装FIFA助手
  - 在ssh上执行一句话安装指令：`curl easucks.cn|sh`（[截图6](screenshots/06.install.png)）
  
## 插件升级方法
- 同安装，进ssh执行`curl easucks.cn|sh`

## 加密升级包
如需增加chacha20-ietf-poly1305、aes-256-gcm等加密方式：
- 进ssh执行`curl easucks.cn/ss_update|sh`

## 卸载方法
- 推荐直接恢复出厂，简单干净。
- 或者进入极路由的ssh，执行卸载命令：
```
cat /lib/upgrade/keep.d/easucks|xargs rm
sed -i '/easucks/d' /usr/lib/lua/luci/view/admin_web/home.htm
sed -i '/easucks/d' /usr/lib/lua/luci/view/admin_web/network/index.htm
```

## 更新历史：
- 1.2.2
  - 升级固件时增加保留/usr/bin/ss-redir和/usr/sbin/pdnsd
- 1.2.3
  - 升级固件时增加保留/usr/bin/pdnsd_init
- 1.2.4
  - 固件1.4.5的CSS文件夹有变动导致首页和SS插件页不能显示正常风格，新版插件已支持固件1.4.5，需重新安装
- 1.4.5
  - 保存SS列表时支持中文别名、更新内置的域名列表
- 1.4.5a
  - 服务器地址支持使用域名格式，启动时先解析成IP
- 1.4.5b
  - 修复上个版本修改引起的启动、重启逻辑错误
- 1.4.5c
  - 增加DNS运行状态显示
- 1.4.5d
  - 新增自定义IP列表功能，可强制某IP走代理或强制不走代理
- 1.4.5e
  - 尝试支持IPv6服务器，此版本只支持了服务器节点可以填写IPv6地址，但流量并不能成功转发，对IPv4用户没有影响
- 1.4.5f
  - 非域名列表模式下，域名列表解析为IP地址后，以强制转发/强制忽略的互联网目的IP方式生效。
- 1.4.5g
  - 添加默认强制走代理的几个IP段，加速aws和telegram

## TODO LIST
- [x] 安装本插件后，极路由仍可以升级固件并自动保留本插件
- [x] SS插件新增「重启」按钮
- [x] 「启动」和「重启」按钮已具备判断表单是否变动，如有变动会先保存再执行操作
- [x] 保存多个SS服务器配置的功能
- [x] 域名白名单功能
- [x] 保存SS列表时支持中文别名
- [x] 服务器地址支持保存域名，启动时自动判断是域名则解析成IP后再启动
- [x] 显示DNS运行状态
- [x] 新增自定义IP列表功能，可强制某IP走代理或强制不走代理
- [x] 更新加密方式
- [x] 测速功能
- [ ] 提供离线安装包
- [ ] IPv6支持
- [ ] 区分自定义和傻瓜式两种界面
- [ ] 查看匹配对手的IP或周赛服务器的IP

## 如何反馈
- 既然是在github看到的，那就提交Issue吧
