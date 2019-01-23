NAME=FIFA助手
DOWNFROM=https://yourdownloadmirror/downloads
FILENAME=yourpackagename.tar.gz
echo ">>>正在下载$NAME..."
curl -# -k $DOWNFROM/$FILENAME -o /tmp/$FILENAME > /dev/null
if [ $? -eq 0 ]; then
    if [ $(grep 'admin_web.*upgrade' /usr/lib/lua/luci/view/admin_web/home.htm|wc -l) -eq 1 ]; then
        ENTRY="首页"
        [ ! -f /usr/lib/lua/luci/view/admin_web/home.backup ] && {
            echo ">>>备份首页文件..."
            cp /usr/lib/lua/luci/view/admin_web/home.htm /usr/lib/lua/luci/view/admin_web/home.backup
        }
        if [ $(grep $NAME /usr/lib/lua/luci/view/admin_web/home.htm|wc -l) -lt 1 ]; then
            echo ">>>修改首页按钮..."
            sed -i 's/admin_web.*upgrade.*%>/admin_web'"'"','"'"'easucks'"'"')%>">'"$NAME"'/' /usr/lib/lua/luci/view/admin_web/home.htm
        fi
    else
        ENTRY="互联网页"
        [ ! -f /usr/lib/lua/luci/view/admin_web/network/index.backup ] && {
            echo ">>>备份互联网页文件..."
            cp /usr/lib/lua/luci/view/admin_web/network/index.htm /usr/lib/lua/luci/view/admin_web/network/index.backup
        }
        if [ $(grep $NAME /usr/lib/lua/luci/view/admin_web/network/index.htm|wc -l) -lt 1 ]; then
            echo ">>>在互联网页插入按钮..."
            sed -i 's/<ul id="advanced_setup">/<ul id="advanced_setup">\n<li><a href="<%=luci.dispatcher.build_url('"'"'admin_web'"'"','"'"'easucks'"'"')%>">'"$NAME"'<\/a><\/li>/' /usr/lib/lua/luci/view/admin_web/network/index.htm
        fi
    fi
	
	# 添加到手机版后台, modified from https://github.com/qiwihui/hiwifi-ss/blob/master/shadow.sh
    cd /usr/lib/lua/luci/view/admin_mobile
    cp home.htm home.htm.backup
    mobile_router_control_line_num=`grep -n "mobile_router_control" home.htm | cut -d : -f 1`
    ul_end_relative_line_num=`tail -n +$mobile_router_control_line_num home.htm | grep -n -m 1 "/ul" | cut -d : -f 1`
    ul_end_line_num=`expr $mobile_router_control_line_num + $ul_end_relative_line_num - 1`
    ul_end_line_num_sub_1=`expr $ul_end_line_num - 1`
    head -n $ul_end_line_num_sub_1 home.htm > new_home.htm
    echo '<li> <a href="<%=luci.dispatcher.build_url('"'"'admin_web'"'"','"'"'easucks'"'"')%>" target="_blank">安全上网<span class="right-bar"><em class="enter-pointer"></em></span></a> </li>' >> new_home.htm
    tail -n +$ul_end_line_num home.htm >> new_home.htm
    mv new_home.htm home.htm
    echo -e '...[\e[32m手机版后台安装成功\e[0m]'
	
    echo -n ">>>正在安装系统插件."
    opkg update > /dev/null
    echo -n "."
    opkg install pdnsd> /dev/null
    if [ -f /usr/bin/pdnsd_init ]; then
        mv /usr/bin/pdnsd_init /etc/init.d/pdnsd
    fi
    echo -n "."
    opkg install shadowsocks-libev > /dev/null
    echo "."
    echo ">>>正在安装$NAME..."
    tar zxf /tmp/$FILENAME -C /
    rm -f /usr/bin/ss-local
    rm -f /usr/bin/ss-tunnel
    rm -f /tmp/$FILENAME
    echo ">>>安装完成！"
    if [ -f /var/run/luci-indexcache ]; then
        rm /var/run/luci-indexcache && echo ">>>请到极路由后台[$ENTRY]找[$NAME]按钮进入插件"
    else
        echo ">>>需要手动重启路由器，重启后到极路由后台[$ENTRY]找[$NAME]按钮进入插件"
    fi
else
    echo ">>>下载出问题了，请稍候再试，下载服务器确实偶有连不上的情况。"
fi
