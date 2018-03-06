NAME=加密更新
VERSION=3.1.3
DOWNFROM=https://yourdownloadmirror/downloads
FILENAME=ss-redir
echo ">>>正在关闭插件..."
/etc/init.d/easucks stop
echo ">>>正在下载$NAME..."
curl -k -o `which $FILENAME` $DOWNFROM/$VERSION/$FILENAME
echo ">>>正在下载$NAME..."
chmod +x `which $FILENAME`
echo ">>>正在替换管理界面选项..."
cat /usr/lib/lua/luci/view/admin_web/easucks/ss_setup_node.htm|sed '1,/ss_server_meth/!d' > /tmp/3.txt
echo '<option value="">请选择</option>' >> /tmp/3.txt
echo '<option value="rc4-md5">rc4-md5</option>' >> /tmp/3.txt
echo '<option value="aes-128-gcm">aes-128-gcm</option>' >> /tmp/3.txt
echo '<option value="aes-192-gcm">aes-192-gcm</option>' >> /tmp/3.txt
echo '<option value="aes-256-gcm">aes-256-gcm</option>' >> /tmp/3.txt
echo '<option value="aes-128-cfb">aes-128-cfb</option>' >> /tmp/3.txt
echo '<option value="aes-192-cfb">aes-192-cfb</option>' >> /tmp/3.txt
echo '<option value="aes-256-cfb">aes-256-cfb</option>' >> /tmp/3.txt
echo '<option value="aes-128-ctr">aes-128-ctr</option>' >> /tmp/3.txt
echo '<option value="aes-192-ctr">aes-192-ctr</option>' >> /tmp/3.txt
echo '<option value="aes-256-ctr">aes-256-ctr</option>' >> /tmp/3.txt
echo '<option value="camellia-128-cfb">camellia-128-cfb</option>' >> /tmp/3.txt
echo '<option value="camellia-192-cfb">camellia-192-cfb</option>' >> /tmp/3.txt
echo '<option value="camellia-256-cfb">camellia-256-cfb</option>' >> /tmp/3.txt
echo '<option value="bf-cfb">bf-cfb</option>' >> /tmp/3.txt
echo '<option value="chacha20-ietf-poly1305">chacha20-ietf-poly1305</option>' >> /tmp/3.txt
echo '<option value="xchacha20-ietf-poly1305">xchacha20-ietf-poly1305</option>' >> /tmp/3.txt
echo '<option value="salsa20">salsa20</option>' >> /tmp/3.txt
echo '<option value="chacha20">chacha20</option>' >> /tmp/3.txt
echo '<option value="chacha20-ietf">chacha20-ietf</option>' >> /tmp/3.txt
cat /usr/lib/lua/luci/view/admin_web/easucks/ss_setup_node.htm|sed '/ <\/select/,$!d' >> /tmp/3.txt
mv /tmp/3.txt /usr/lib/lua/luci/view/admin_web/easucks/ss_setup_node.htm
echo ">>>更新完毕，请进入管理界面重新开启插件。"
