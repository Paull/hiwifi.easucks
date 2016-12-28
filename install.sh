NAME=FIFA助手
DOWNFROM=https://yourdownloadmirror.com/downloads
FILENAME=yourpackagename.tar.gz
if [ $(grep 'admin_web.*upgrade' /usr/lib/lua/luci/view/admin_web/home.htm|wc -l) -eq 1 ]; then
    WHERE="首页"
    echo ">>>备份首页文件..."
    [ ! -f /usr/lib/lua/luci/view/admin_web/home.backup ] && cp /usr/lib/lua/luci/view/admin_web/home.htm /usr/lib/lua/luci/view/admin_web/home.backup
    echo ">>>修改首页按钮..."
    sed -i 's/admin_web.*upgrade.*%>/admin_web'"'"','"'"'easucks'"'"')%>">'"$NAME"'/' /usr/lib/lua/luci/view/admin_web/home.htm
else
    WHERE="互联网页"
    echo ">>>备份互联网页文件..."
    [ ! -f /usr/lib/lua/luci/view/admin_web/network/index.backup ] && cp /usr/lib/lua/luci/view/admin_web/network/index.htm /usr/lib/lua/luci/view/admin_web/network/index.backup
    if [ $(grep $NAME /usr/lib/lua/luci/view/admin_web/network/index.htm|wc -l) -lt 1 ]; then
        echo ">>>在互联网页插入按钮..."
        sed -i 's/<ul id="advanced_setup">/<ul id="advanced_setup">\n<li><a href="<%=luci.dispatcher.build_url('"'"'admin_web'"'"','"'"'easucks'"'"')%>">'"$NAME"'<\/a><\/li>/' /usr/lib/lua/luci/view/admin_web/network/index.htm
    fi
fi
echo -n ">>>正在安装系统插件..."
opkg update > /dev/null
echo -n "..."
opkg install pdnsd shadowsocks-libev > /dev/null
echo "..."
echo ">>>正在下载$NAME..."
curl -# -k $DOWNFROM/$FILENAME -o /tmp/$FILENAME > /dev/null
echo ">>>正在安装$NAME..."
tar zxf /tmp/$FILENAME -C /
rm -f /usr/bin/ss-local
rm -f /usr/bin/ss-tunnel
rm -f /tmp/$FILENAME
echo ">>>安装完成！"
if [ -f /var/run/luci-indexcache ]; then
    rm /var/run/luci-indexcache && echo ">>>请到极路由后台[$WHERE]找[$NAME]按钮进入插件"
else
    echo ">>>需要手动重启路由器，重启后到极路由后台[$WHERE]找[$NAME]按钮进入插件"
fi
