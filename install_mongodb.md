### Install MongoDB

```bash
# 添加安装库配置
$ sudo vi /etc/yum.repos.d/mongodb-org.repo
```

```ini
# /etc/yum.repos.d/mongodb-org.repo
# 注意版本号
[mongodb-org-3.6]
name=MongoDB Repository
baseurl=https://repo.mongodb.org/yum/redhat/$releasever/mongodb-org/3.6/x86_64/
gpgcheck=1
enabled=1
gpgkey=https://www.mongodb.org/static/pgp/server-3.6.asc

$ yum repolist # 执行这行确认添加成功
```

**安装**

```bash
$ sudo yum install mongodb-org -y
```

**mac 下可以使用下面的代码安装来替代以上配置安装方法**

```bash
$ sudo brew install mongodb
```

**设置为系统服务**

```bash
$ sudo systemctl start mongod # 启动服务
$ sudo systemctl start mongod # 停止服务
$ sudo systemctl status mongod.service # 查看服务状态
$ sudo systemctl reload mongod # 重新读取/etc/mongod.conf配置
```

**log**

```bash
$ sudo tail /var/log/mongodb/mongod.log # 查看最后10条log
```

**other**

```bash
$ mongo # 进入当前运行文本行界面
```

默认数据库目录在 `/var/lib/mongo`