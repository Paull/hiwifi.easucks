# FIFA20专用路由器已发布
- 小白福音：花最少的钱，体验最好的效果，不折腾，买回家即插即用
- 四大功能：锁中亚/北亚、防掉线、菜单加速、比赛加速
- 链接：[点击跳转到淘宝购买](https://item.taobao.com/item.htm?id=612863985874)

# FIFA20锁服功能已更新
- 强制锁定中亚（香港）服务器，适用于DR模式、周赛模式以及俱乐部模式（其中俱乐部模式可查看当前所在服务器，[截图8](screenshots/08.likeapro.png)）
- 锁服功能仅适用于裸连香港服务器延时较低的小伙伴们
- 裸连延时测试方法：用电脑ping 180.150.147.42，目前国内平均延时50ms左右，属于比较流畅
- 非极路由玩家可以使用[测试脚本](https://github.com/Paull/hiwifi.easucks/issues/111)

# FIFA助手
- 目前只是个SS插件而已。
- 完全采用极路由后台风格设计（[截图1](screenshots/01.home.png)，[截图2](screenshots/02.config.png)），插件样式更美观。
- 重点推荐域名列表模式，集成FIFA有关域名（[截图3](screenshots/03.mylist.png)），实现EA、LIVE、PSN、ORIGIN等便秘网络走代理，下载和踢球仍然是裸连。
- 网页模式和游戏模式默认开启国内IP白名单，不影响国内网站的正常访问和速度。
- 高级选项可以自定义以域名列表、IP列表、MAC列表，走不走代理拥有更多的自主权。
- 我们的目标不是做SS插件，专注游戏而不是梯子，因为游戏本没有被墙，只是线路拥堵而已，如果裸连流畅的话当然更推荐裸连。

## FIFA常见网络问题汇总
- 掉EA：通过挂SS改善TCP稳定性（FIFA助手的域名列表模式、梅林的白名单模式和游戏模式、老毛子等固件也可以）。
- 赛季模式搜人难：提升NAT等级至开放，方法一般是光猫桥接后使用路由器拔号就可以解决。
- 在线模式延时大：方案一，挂SS，通过代理改善UDP稳定性（梅林的模式，老毛子有UDP转发选项，但FIFA助手的SS不支持UDP）。
- 在线模式延时大：方案二，使用FIFA助手锁定中亚（香港）服务器，裸连踢球更流畅。

## 支持的路由器型号及固件
路由器型号 | 官方固件 < 1.2.5 | 1.2.5 <= 官方固件 <= 1.5.9 | 非官方固件 |
------------ | ------------- | ------------- | ------------- |
极1s | :heavy_multiplication_x:不支持 | :heavy_check_mark:支持 | :heavy_multiplication_x:不支持 |
极2 | :heavy_multiplication_x:不支持 | :heavy_check_mark:支持 | :heavy_multiplication_x:不支持 |
极3 | :heavy_multiplication_x:不支持 | :heavy_check_mark:支持 | :heavy_multiplication_x:不支持 |
极4 | :heavy_multiplication_x:不支持 | :heavy_check_mark:支持 | :heavy_multiplication_x:不支持 |
极B70 | :heavy_multiplication_x:不支持 | :heavy_check_mark:支持 | :heavy_multiplication_x:不支持 |
极X | :heavy_multiplication_x:不支持 | :heavy_check_mark:支持 | :heavy_multiplication_x:不支持 |
极Enjoy | :heavy_multiplication_x:不支持 | :heavy_check_mark:支持 | :heavy_multiplication_x:不支持 |
极路由美的 | :heavy_multiplication_x:不支持 | :heavy_check_mark:支持 | :heavy_multiplication_x:不支持 |
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

## 加密升级方法（不支持极路由器X,CPU架构不同）
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
- 1.4.10
  - 新增FIFA19锁服功能
- 20190123
  - 已支持极X等1.5.x版本的固件
- 20190930
  - 插件界面的锁中亚按钮从FIFA19改为FIFA20

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
