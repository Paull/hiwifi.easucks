# -----------下载
sudo apt install -y build-essential autoconf autopoint automake git pkg-config libtool upx

MODEL=HC5661A
BASEDIR=~/"$MODEL"_SDK

cd ~

wget http://sdk.ikcd.net/mtmips-sdk.tar.bz2
tar jxvf mtmips-sdk.tar.bz2
mv OpenWrt-SDK-mtmips-for-redhat-x86_64-gcc-4.8-linaro_uClibc-0.9.33.2 "$MODEL"_SDK

cd $BASEDIR

# -----------调整编译环境
MLIB=mipsel
TOOLCHAINDIR=$BASEDIR/staging_dir
TOOLCHAIN=$TOOLCHAINDIR/toolchain-mipsel_1004kc_gcc-4.8-linaro_uClibc-0.9.33.2
HOST=${MLIB}-openwrt-linux
PATH_A=$PATH
PATH=$TOOLCHAIN/bin:$PATH

$HOST-gcc -v

# -----------创建编译目录
BIN=$BASEDIR/bin
SRC=$BASEDIR/src
PREFIX=$BASEDIR/local
mkdir -p $BIN $SRC $PREFIX
PKG_CONFIG_PATH=$PREFIX/lib/pkgconfig/
LD_LIBRARY_PATH=$PREFIX/lib/

export STAGING_DIR=$BASEDIR/staging_dir

# ------------编译mbedTLS
cd $SRC
ver=2.6.0
wget --no-check-certificate https://tls.mbed.org/download/mbedtls-$ver-gpl.tgz
tar zxf mbedtls-$ver-gpl.tgz
cd mbedtls-$ver
CC=$HOST-gcc AR=$HOST-ar LD=$HOST-ld LDFLAGS=-static make DESTDIR=$PREFIX install

# ------------编译pcre
cd $SRC
ver=8.41
wget ftp://ftp.csx.cam.ac.uk/pub/software/programming/pcre/pcre-$ver.tar.gz
tar zxf pcre-$ver.tar.gz
cd pcre-$ver
./configure --host=$HOST --prefix=$PREFIX --disable-shared --enable-utf8 --enable-unicode-properties
make -nproc && make install

# ------------编译libsodium
cd $SRC
ver=1.0.16
wget https://github.com/jedisct1/libsodium/releases/download/$ver/libsodium-$ver.tar.gz
tar zxf libsodium-$ver.tar.gz
cd libsodium-$ver
./configure --host=$HOST --prefix=$PREFIX --disable-ssp --disable-shared
make -nproc && make install

# ------------编译libev
cd $SRC
ver=4.24
wget http://dist.schmorp.de/libev/libev-$ver.tar.gz
tar zxf libev-$ver.tar.gz
cd libev-$ver
./configure --host=$HOST --prefix=$PREFIX --disable-shared
make -nproc && make install

# # ------------编译libudns
# cd $SRC
# git clone git://github.com/shadowsocks/libudns
# cd libudns
# ./autogen.sh
# ./configure --host=$HOST --prefix=$PREFIX
# make -nproc && make install

# ------------编译c-ares
cd $SRC
ver=1.13.0
wget https://c-ares.haxx.se/download/c-ares-$ver.tar.gz
tar zxvf c-ares-$ver.tar.gz
cd c-ares-$ver
./buildconf
./configure --prefix=$PREFIX --host=$HOST CC=$HOST-gcc --enable-shared=no --enable-static=yes
make -nproc && make install

# ------------编译shadowsocks-libev
cd $SRC
ver=3.1.3
git clone --branch v$ver --single-branch --depth 1 git://github.com/shadowsocks/shadowsocks-libev
cd $SRC/shadowsocks-libev
git submodule update --init --recursive
sed -i '/PTHREAD/d;/pthread/d' configure.ac
./autogen.sh
LIBS="-lpthread -lm" LDFLAGS="-Wl,-static -static -static-libgcc -L$PREFIX/lib" CFLAGS="-I$PREFIX/include" ./configure --host=$HOST --prefix=$PREFIX --disable-ssp --disable-documentation --with-mbedtls=$PREFIX --with-pcre=$PREFIX --with-sodium=$PREFIX
make -nproc
make install

# # ------------编译simple-obfs
# cd $SRC
# ver=0.0.5
# git clone --depth 1 https://github.com/shadowsocks/simple-obfs
# cd $SRC/simple-obfs
# git submodule update --init --recursive
# ./autogen.sh
# LIBS="-lpthread -lm" LDFLAGS="-Wl,-static -static -static-libgcc -L$PREFIX/lib" CFLAGS="-I$PREFIX/include" ./configure --host=$HOST --prefix=$PREFIX --disable-ssp --disable-documentation
# make -nproc
# make install

# ------------压缩体积
cp $PREFIX/bin/ss-* $BIN
# cp $PREFIX/bin/obfs-* $BIN
cd $BIN
find ! -name ss-nat | xargs $HOST-strip
find ! -name ss-nat | xargs upx

------------还原环境变量
PATH=$PATH_A
echo
echo "Done!"
