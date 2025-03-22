# Linux 操作手册

## 目录

1. [Linux 简介](#linux-简介)
2. [基础命令](#基础命令)
3. [文件系统管理](#文件系统管理)
4. [用户和权限管理](#用户和权限管理)
5. [进程管理](#进程管理)
6. [网络配置](#网络配置)
7. [系统服务](#系统服务)
8. [软件包管理](#软件包管理)
9. [Shell 脚本基础](#shell-脚本基础)
10. [系统监控与维护](#系统监控与维护)
11. [常见问题解答](#常见问题解答)

## Linux 简介

Linux 是一种自由和开放源代码的类 UNIX 操作系统，由芬兰学生 Linus Torvalds 于 1991 年创建。Linux 可以安装在各种计算机硬件设备中，从手机到超级计算机。

### Linux 的优势

- **开源免费**：Linux 是开源软件，任何人都可以自由使用、修改和分发
- **安全稳定**：相比其他操作系统，Linux 更加安全和稳定
- **轻量高效**：可以在资源有限的设备上高效运行
- **多用户多任务**：支持多用户同时操作和多任务处理
- **强大的网络功能**：提供丰富的网络功能和服务
- **软件支持**：拥有大量免费的应用软件和开发工具

### 常见 Linux 发行版

- **Ubuntu**：用户友好，适合 Linux 新手
- **Debian**：稳定可靠，是许多发行版的基础
- **CentOS/RHEL**：企业级应用，注重稳定性和安全性
- **Fedora**：创新激进，使用最新技术
- **Arch Linux**：高度可定制，滚动更新模式
- **openSUSE**：易于使用，拥有优秀的管理工具

## 基础命令

### 终端基础

终端（Terminal）是与 Linux 系统交互的主要方式。以下是一些基本概念：

- **Shell**：命令解释器，最常用的是 Bash (Bourne Again SHell)
- **命令提示符**：通常以 `username@hostname:~$` 的形式显示
- **根用户提示符**：通常以 `#` 结尾，表示拥有最高权限

### 帮助命令

```bash
man command      # 显示命令的手册页
info command     # 显示命令的详细信息
command --help   # 显示命令的简要帮助信息
whatis command   # 显示命令的简短描述
```

### 文件和目录操作

#### 导航命令

```bash
pwd              # 显示当前工作目录
ls               # 列出目录内容
ls -l            # 以长格式列出目录内容
ls -a            # 列出所有文件，包括隐藏文件
ls -lh           # 以人类可读的格式显示文件大小
cd directory     # 切换到指定目录
cd               # 切换到用户主目录
cd ~             # 切换到用户主目录
cd ..            # 切换到上级目录
cd -             # 切换到上一个工作目录
```

#### 文件操作命令

```bash
touch file       # 创建空文件或更新文件时间戳
cat file         # 显示文件内容
less file        # 分页显示文件内容
head file        # 显示文件开头部分
tail file        # 显示文件结尾部分
tail -f file     # 实时显示文件追加的内容
cp source dest   # 复制文件或目录
mv source dest   # 移动或重命名文件或目录
rm file          # 删除文件
rm -r directory  # 递归删除目录及其内容
rm -f file       # 强制删除文件，不提示
ln -s file link  # 创建符号链接
```

#### 目录操作命令

```bash
mkdir directory  # 创建目录
mkdir -p dir1/dir2 # 创建多级目录
rmdir directory  # 删除空目录
du -sh directory # 显示目录大小
find dir -name pattern # 在目录中查找文件
```

### 文本处理

#### 文本查看和编辑

```bash
cat file         # 显示整个文件内容
more file        # 分页显示文件内容
less file        # 交互式查看文件内容
head -n 10 file  # 显示文件前10行
tail -n 20 file  # 显示文件后20行
grep pattern file # 在文件中搜索模式
grep -r pattern dir # 在目录中递归搜索模式
sed 's/old/new/g' file # 替换文件中的文本
awk '{print $1}' file # 处理文件中的文本
```

#### 文本编辑器

```bash
nano file        # 简单易用的文本编辑器
vim file         # 高级文本编辑器
emacs file       # 功能强大的文本编辑器
```

### 系统信息命令

```bash
uname -a         # 显示系统信息
hostname         # 显示主机名
date             # 显示当前日期和时间
uptime           # 显示系统运行时间和负载
w                # 显示当前登录用户和活动
whoami           # 显示当前用户名
id               # 显示当前用户的ID信息
free -h          # 显示内存使用情况
df -h            # 显示磁盘使用情况
```

## 文件系统管理

### 文件系统层次结构

Linux 文件系统遵循文件系统层次结构标准 (FHS)，主要目录包括：

- **/bin**：基本命令二进制文件
- **/boot**：启动文件，包括内核和引导加载程序
- **/dev**：设备文件
- **/etc**：系统配置文件
- **/home**：用户主目录
- **/lib**：共享库文件
- **/media**：可移动媒体挂载点
- **/mnt**：临时挂载点
- **/opt**：可选软件包
- **/proc**：进程和系统信息的虚拟文件系统
- **/root**：root用户的主目录
- **/run**：运行时变量数据
- **/sbin**：系统二进制文件
- **/srv**：服务数据
- **/sys**：系统和设备信息
- **/tmp**：临时文件
- **/usr**：用户程序和数据
- **/var**：可变数据文件

### 磁盘管理

#### 查看磁盘信息

```bash
df -h            # 显示文件系统磁盘空间使用情况
du -sh directory # 显示目录大小
fdisk -l         # 列出磁盘分区表
lsblk            # 以树状格式列出块设备
```

#### 分区和格式化

```bash
fdisk /dev/sda   # 分区工具
mkfs.ext4 /dev/sda1 # 格式化为ext4文件系统
mkfs.xfs /dev/sda2 # 格式化为XFS文件系统
```

#### 挂载和卸载

```bash
mount /dev/sda1 /mnt # 挂载分区到/mnt
umount /mnt      # 卸载/mnt目录
```

#### 自动挂载配置

编辑 `/etc/fstab` 文件以配置系统启动时自动挂载：

```
/dev/sda1  /mnt/data  ext4  defaults  0  2
```

### 文件系统检查和修复

```bash
fsck /dev/sda1   # 检查和修复文件系统
e2fsck /dev/sda1 # 检查ext文件系统
xfs_repair /dev/sda2 # 修复XFS文件系统
```

### 磁盘配额

```bash
quota -v user    # 显示用户配额
edquota user     # 编辑用户配额
repquota -a      # 显示所有用户的配额报告
```

## 用户和权限管理

### 用户管理

#### 用户相关命令

```bash
useradd username # 创建新用户
usermod -options username # 修改用户属性
userdel username # 删除用户
passwd username  # 设置或修改用户密码
chage -options username # 修改用户密码过期信息
id username      # 显示用户ID和组信息
su - username    # 切换到其他用户
sudo command     # 以超级用户权限执行命令
```

#### 用户配置文件

- **/etc/passwd**：用户账户信息
- **/etc/shadow**：用户密码信息
- **/etc/login.defs**：用户创建默认配置

### 组管理

```bash
groupadd groupname # 创建新组
groupmod -options groupname # 修改组属性
groupdel groupname # 删除组
usermod -aG groupname username # 将用户添加到组
gpasswd groupname # 设置组密码
groups username  # 显示用户所属的组
```

#### 组配置文件

- **/etc/group**：组信息
- **/etc/gshadow**：组密码信息

### 文件权限

#### 权限类型

Linux 文件权限分为三类：

- **r (read)**：读取权限，数值为 4
- **w (write)**：写入权限，数值为 2
- **x (execute)**：执行权限，数值为 1

权限应用于三种用户类型：

- **u (user)**：文件所有者
- **g (group)**：文件所属组
- **o (others)**：其他用户

#### 查看和修改权限

```bash
ls -l            # 显示文件权限
chmod permissions file # 修改文件权限
chmod u+x file   # 给文件所有者添加执行权限
chmod g-w file   # 移除组的写入权限
chmod o=r file   # 设置其他用户只有读取权限
chmod 755 file   # 设置权限为rwxr-xr-x
chmod -R 755 directory # 递归设置目录权限
```

#### 更改所有者和组

```bash
chown user file  # 更改文件所有者
chown user:group file # 同时更改所有者和组
chown -R user:group directory # 递归更改目录所有权
chgrp group file # 更改文件所属组
```

#### 特殊权限

```bash
chmod u+s file   # 设置SUID位
chmod g+s directory # 设置SGID位
chmod +t directory # 设置粘滞位
```

#### 访问控制列表 (ACL)

```bash
getfacl file     # 显示文件的ACL
setfacl -m u:user:rwx file # 为用户设置ACL
setfacl -m g:group:rx file # 为组设置ACL
setfacl -x u:user file # 删除用户的ACL
```

## 进程管理

### 查看进程

```bash
ps               # 显示当前终端的进程
ps aux           # 显示所有进程详细信息
ps -ef           # 以全格式显示所有进程
top              # 实时显示进程信息
htop             # 增强的交互式进程查看器
pgrep pattern    # 根据名称查找进程ID
```

### 进程控制

```bash
kill PID         # 终止指定进程
kill -9 PID      # 强制终止进程
pkill pattern    # 根据名称终止进程
killall process_name # 终止所有指定名称的进程
nice -n value command # 以指定优先级运行命令
renice value -p PID # 修改运行中进程的优先级
nohup command &  # 在后台运行命令，即使终端关闭也继续运行
bg               # 将作业放到后台运行
fg               # 将作业放到前台运行
jobs             # 列出当前终端的后台作业
```

### 进程监控

```bash
top              # 实时监控系统进程
htop             # 增强的交互式进程监控器
atop             # 高级系统和进程监控
iotop            # 监控磁盘I/O使用情况
lsof             # 列出打开的文件
lsof -p PID      # 列出指定进程打开的文件
fuser file       # 显示哪些进程正在使用指定文件
```

### 后台任务调度

#### at 命令

```bash
at 10:00         # 在指定时间执行命令
atq              # 列出等待的作业
atrm job_number  # 删除等待的作业
```

#### cron 任务

```bash
crontab -l       # 列出当前用户的cron任务
crontab -e       # 编辑当前用户的cron任务
crontab -r       # 删除当前用户的所有cron任务
```

crontab 格式：

```
分 时 日 月 周 命令
```

例如：

```
0 2 * * * /usr/local/bin/backup.sh  # 每天凌晨2点执行备份脚本
```

## 网络配置

### 网络基础命令

```bash
ifconfig         # 显示或配置网络接口
ip addr show     # 显示IP地址信息
ip link show     # 显示网络接口信息
route            # 显示或配置路由表
ip route show    # 显示路由表
netstat -tuln    # 显示所有监听端口
ss -tuln         # 显示所有监听端口（新命令）
ping host        # 测试与主机的连接
traceroute host  # 跟踪到主机的路由路径
dig domain       # 查询DNS信息
nslookup domain  # 查询DNS信息
host domain      # 查询DNS信息
whois domain     # 查询域名注册信息
```

### 网络配置文件

- **/etc/hostname**：主机名配置
- **/etc/hosts**：主机名到IP地址的映射
- **/etc/resolv.conf**：DNS客户端配置
- **/etc/network/interfaces** 或 **/etc/sysconfig/network-scripts/**：网络接口配置

### 网络管理工具

```bash
nmcli            # NetworkManager命令行工具
nmtui            # NetworkManager文本用户界面
nm-connection-editor # NetworkManager图形界面
```

### 防火墙配置

#### iptables

```bash
iptables -L      # 列出防火墙规则
iptables -A INPUT -p tcp --dport 22 -j ACCEPT # 允许SSH连接
iptables -A INPUT -j DROP # 丢弃所有其他输入包
iptables-save > rules.v4 # 保存规则
iptables-restore < rules.v4 # 恢复规则
```

#### firewalld (CentOS/RHEL 7+)

```bash
firewall-cmd --state # 显示防火墙状态
firewall-cmd --get-zones # 列出可用区域
firewall-cmd --get-active-zones # 列出活动区域
firewall-cmd --add-service=http # 允许HTTP服务
firewall-cmd --add-port=8080/tcp # 允许TCP端口8080
firewall-cmd --runtime-to-permanent # 将运行时配置保存为永久配置
```

#### ufw (Ubuntu)

```bash
ufw status       # 显示防火墙状态
ufw enable       # 启用防火墙
ufw disable      # 禁用防火墙
ufw allow 22/tcp # 允许TCP端口22
ufw deny 23/tcp  # 拒绝TCP端口23
ufw allow http   # 允许HTTP服务
```

### SSH 配置

```bash
ssh user@host    # 连接到远程主机
ssh-keygen       # 生成SSH密钥对
ssh-copy-id user@host # 将公钥复制到远程主机
scp file user@host:/path # 安全复制文件到远程主机
rsync -avz source user@host:/path # 同步文件到远程主机
```

SSH配置文件：
- **/etc/ssh/sshd_config**：SSH服务器配置
- **~/.ssh/config**：用户SSH客户端配置

## 系统服务

### systemd 服务管理

```bash
systemctl status service # 查看服务状态
systemctl start service # 启动服务
systemctl stop service # 停止服务
systemctl restart service # 重启服务
systemctl reload service # 重新加载服务配置
systemctl enable service # 设置服务开机自启动
systemctl disable service # 禁用服务开机自启动
systemctl list-units --type=service # 列出所有服务单元
systemctl list-unit-files # 列出所有可用服务单元文件
```

### 服务日志查看

```bash
journalctl       # 查看所有日志
journalctl -u service # 查看特定服务的日志
journalctl -f    # 实时查看日志
journalctl --since today # 查看今天的日志
```

### SysVinit 服务管理 (旧系统)

```bash
service service_name status # 查看服务状态
service service_name start # 启动服务
service service_name stop # 停止服务
service service_name restart # 重启服务
chkconfig service_name on # 设置服务开机自启动
chkconfig service_name off # 禁用服务开机自启动
chkconfig --list # 列出所有服务的运行级别配置
```

## 软件包管理

### Debian/Ubuntu (APT)

```bash
apt update       # 更新软件包列表
apt upgrade      # 升级已安装的软件包
apt full-upgrade # 升级软件包，可能会删除一些包
apt install package # 安装软件包
apt remove package # 删除软件包
apt purge package # 删除软件包及其配置文件
apt autoremove   # 删除不再需要的依赖包
apt search keyword # 搜索软件包
apt show package # 显示软件包信息
apt list --installed # 列出已安装的软件包
dpkg -l          # 列出已安装的软件包
dpkg -i package.deb # 安装本地DEB包
dpkg -r package  # 删除软件包
```

### Red Hat/CentOS (YUM/DNF)

```bash
yum update       # 更新所有软件包
yum install package # 安装软件包
yum remove package # 删除软件包
yum search keyword # 搜索软件包
yum info package # 显示软件包信息
yum list installed # 列出已安装的软件包
rpm -qa          # 列出所有已安装的RPM包
rpm -i package.rpm # 安装RPM包
rpm -e package   # 删除RPM包

# DNF (YUM的下一代版本)
dnf update       # 更新所有软件包
dnf install package # 安装软件包
dnf remove package # 删除软件包
dnf search keyword # 搜索软件包
```

### Arch Linux (Pacman)

```bash
pacman -Syu      # 同步数据库并升级系统
pacman -S package # 安装软件包
pacman -R package # 删除软件包
pacman -Rs package # 删除软件包及其依赖
pacman -Ss keyword # 搜索软件包
pacman -Qi package # 显示已安装软件包的信息
pacman -Q        # 列出所有已安装的软件包
```

### 源码编译安装

```bash
./configure      # 配置源码
make             # 编译源码
make install     # 安装编译好的程序
```

## Shell 脚本基础

### 脚本基础

创建一个简单的Shell脚本：

```bash
#!/bin/bash
# 这是一个注释
echo "Hello, World!"
```

赋予脚本执行权限：

```bash
chmod +x script.sh
```

运行脚本：

```bash
./script.sh
```

### 变量

```bash
# 定义变量
NAME="Linux"

# 使用变量
echo "Hello, $NAME"

# 命令替换
DATE=$(date)
echo "Current date: $DATE"

# 环境变量
echo "Home directory: $HOME"
```

### 条件语句

```bash
# if语句
if [ "$1" = "hello" ]; then
    echo "Hello yourself!"
elif [ "$1" = "bye" ]; then
    echo "Goodbye!"
else
    echo "I don't understand"
fi

# case语句
case "$1" in
    start)
        echo "Starting..."
        ;;
    stop)
        echo "Stopping..."
        ;;
    *)
        echo "Usage: $0 {start|stop}"
        ;;
esac
```

### 循环

```bash
# for循环
for i in 1 2 3 4 5; do
    echo "Number: $i"
done

# while循环
count=1
while [ $count -le 5 ]; do
    echo "Count: $count"
    count=$((count + 1))
done

# until循环
count=1
until [ $count -gt 5 ]; do
    echo "Count: $count"
    count=$((count + 1))
done
```

### 函数

```bash
# 定义函数
greet() {
    echo "Hello, $1!"
}

# 调用函数
greet "World"
```

### 脚本参数

```bash
echo "脚本名称: $0"
echo "第一个参数: $1"
echo "第二个参数: $2"
echo "所有参数: $@"
echo "参数个数: $#"
```

### 输入和输出

```bash
# 读取用户输入
echo "请输入您的名字:"
read name
echo "您好, $name!"

# 重定向
ls > file_list.txt  # 将输出重定向到文件
wc < file_list.txt  # 从文件读取输入
ls >> file_list.txt # 将输出追加到文件
ls 2> errors.txt    # 将错误重定向到文件
ls &> all_output.txt # 将标准输出和错误都重定向到文件
```

## 系统监控与维护

### 系统监控

```bash
top              # 实时系统监控
htop             # 增强的交互式系统监控
glances          # 高级系统监控工具
vmstat           # 虚拟内存统计
mpstat           # 多处理器统计
iostat           # 输入/输出统计
sar              # 系统活动报告
dstat            # 系统资源统计
iftop            # 网络带宽监控工具
```

#### iftop 网络带宽监控

iftop 是一个实时监控网络带宽使用情况的命令行工具，类似于 top 命令监控 CPU 使用情况。

##### 安装 iftop

```bash
# Debian/Ubuntu
apt install iftop

# CentOS/RHEL
yum install epel-release
yum install iftop

# Arch Linux
pacman -S iftop

# Fedora
dnf install iftop
```

##### 基本用法

```bash
iftop             # 监控默认网络接口
iftop -i eth0     # 监控指定网络接口
iftop -n          # 不解析主机名
iftop -P          # 显示端口信息
iftop -B          # 以字节而非比特为单位显示
iftop -F 192.168.1.0/24  # 监控特定网段流量
iftop -t          # 使用文本界面模式
```

##### 界面解读

- **顶部**：显示总体带宽使用情况（TX：发送，RX：接收）
- **中间**：显示主机对之间的连接，包括：
  - 源主机和目标主机
  - 最近2秒、10秒和40秒的平均流量
  - 累计传输的数据量
- **底部**：显示总计和峰值统计信息

##### 交互式命令

```
h          # 显示帮助
n          # 切换是否显示主机名
s          # 切换是否显示源主机
d          # 切换是否显示目标主机
t          # 切换文本显示模式
N          # 切换端口显示模式
S          # 显示源端口
D          # 显示目标端口
p          # 暂停显示
b          # 切换是否以字节为单位显示
B          # 切换是否显示条形图
T          # 切换显示模式（发送+接收/仅发送/仅接收）
l          # 设置屏幕刷新间隔
L          # 切换是否显示比例尺
j/k        # 向下/向上滚动主机列表
1/2/3      # 按第1/2/3列排序
<          # 按源主机名排序
>          # 按目标主机名排序
o          # 冻结当前顺序
q          # 退出程序
```

##### 实用技巧

1. **监控特定主机流量**：
   ```bash
   iftop -f "host 192.168.1.100"
   ```

2. **监控特定端口流量**：
   ```bash
   iftop -f "port 80"
   ```

3. **排除特定流量**：
   ```bash
   iftop -f "not port 22"
   ```

4. **组合过滤条件**：
   ```bash
   iftop -f "host 192.168.1.100 and not port 22"
   ```

5. **保存流量数据**：
   ```bash
   iftop -t > network_traffic.txt
   ```

### 日志管理

重要的系统日志文件：

- **/var/log/syslog** 或 **/var/log/messages**：系统日志
- **/var/log/auth.log** 或 **/var/log/secure**：认证日志
- **/var/log/kern.log**：内核日志
- **/var/log/dmesg**：启动消息
- **/var/log/apache2/** 或 **/var/log/httpd/**：Apache日志

日志查看命令：

```bash
cat /var/log/syslog # 查看系统日志
tail -f /var/log/syslog # 实时查看系统日志
grep ERROR /var/log/syslog # 在系统日志中搜索错误
zcat /var/log/syslog.1.gz # 查看压缩的日志文件
```

### 系统备份

```bash
tar -czvf backup.tar.gz /path/to/backup # 创建压缩备份
tar -xzvf backup.tar.gz # 解压备份
rsync -avz /source /destination # 同步文件和目录
dd if=/dev/sda of=/path/to/image.img # 创建磁盘镜像
```

### 系统恢复

```bash
fsck /dev/sda1   # 检查和修复文件系统
e2fsck -p /dev/sda1 # 自动修复ext文件系统
restore -rf backup.tar /path/to/restore # 从备份恢复文件
grub-install /dev/sda # 重新安装GRUB引导加载程序
update-grub      # 更新GRUB配置
```

### 系统性能优化

```bash
nice -n 19 command # 以低优先级运行命令
ionice -c 3 command # 以低I/O优先级运行命令
sysctl -a        # 显示所有内核参数
sysctl -w parameter=value # 设置内核参数
ulimit -a        # 显示所有资源限制
ulimit -n 4096   # 设置打开文件数限制
```

## 常见问题解答

### 如何重置忘记的root密码？

1. 重启系统，在GRUB菜单按'e'编辑启动项
2. 找到以'linux'或'linux16'开头的行，在行末添加'init=/bin/bash'
3. 按Ctrl+X启动系统
4. 挂载根文件系统为可写：`mount -o remount,rw /`
5. 使用passwd命令更改root密码：`passwd root`
6. 同步并重启：`sync; exec /sbin/init 6`

### 如何修复"No space left on device"错误？

1. 检查磁盘空间：`df -h`
2. 查找大文件：`find / -type f -size +100M | sort -rh`
3. 清理日志文件：`journalctl --vacuum-size=100M`
4. 清理软件包缓存：
   - Debian/Ubuntu：`apt clean`
   - CentOS/RHEL：`yum clean all`
5. 检查inode使用情况：`df -i`

### 如何解决系统运行缓慢的问题？

1. 检查CPU使用情况：`top` 或 `htop`
2. 检查内存使用情况：`free -h`
3. 检查磁盘I/O：`iostat -x 1`
4. 查找占用CPU最多的进程：`ps aux --sort=-%cpu | head`
5. 查找占用内存最多的进程：`ps aux --sort=-%mem | head`
6. 检查系统负载：`uptime`
7. 检查网络连接：`netstat -tuln`

### 如何解决SSH连接被拒绝的问题？

1. 检查SSH服务是否运行：`systemctl status sshd`
2. 检查防火墙设置：`iptables -L` 或 `firewall-cmd --list-all`
3. 检查SSH配置文件：`cat /etc/ssh/sshd_config`
4. 检查SSH日志：`tail /var/log/auth.log` 或 `tail /var/log/secure`
5. 确保远程主机允许SSH连接：`ssh -v user@host`

### 如何解决"Command not found"错误？

1. 检查命令是否已安装：`which command`
2. 检查PATH环境变量：`echo $PATH`
3. 安装缺少的软件包：
   - Debian/Ubuntu：`apt install package`
   - CentOS/RHEL：`yum install package`
4. 如果命令在非标准位置，可以创建符号链接：`ln -s /path/to/command /usr/local/bin/`

### 如何解决网络连接问题？

1. 检查网络接口状态：`ip addr show`
2. 测试网络连接：`ping 8.8.8.8`
3. 检查DNS解析：`ping google.com` 和 `cat /etc/resolv.conf`
4. 检查路由表：`ip route show`
5. 检查防火墙设置：`iptables -L` 或 `firewall-cmd --list-all`
6. 重启网络服务：`systemctl restart NetworkManager` 或 `systemctl restart networking`

### 如何解决软件包依赖问题？

1. 更新软件包列表：
   - Debian/Ubuntu：`apt update`
   - CentOS/RHEL：`yum check-update`
2. 修复损坏的依赖关系：
   - Debian/Ubuntu：`apt --fix-broken install`
   - CentOS/RHEL：`yum clean all && yum update`
3. 检查软件包状态：
   - Debian/Ubuntu：`dpkg --audit`
   - CentOS/RHEL：`rpm -Va`

---

本手册涵盖了Linux系统的基础和进阶用法，希望能帮助你更好地使用和管理Linux系统。如有更多问题，可以参考各发行版的官方文档或社区资源。