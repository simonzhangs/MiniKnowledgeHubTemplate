# mongodb

MongoDB 是一个流行的开源文档型数据库，它使用类似 JSON 的文档模型存储数据，这使得数据存储变得非常灵活。

官网地址：https://www.mongodb.com/

当你需要迁移数据库时，或者进行备份时，使用 mongodump，可以将文件导出。

```
mongodump -h 127.0.0.1 --username 'xxx' -p '密码' --authenticationDatabase admin -d 数据库 --gzip --archive=xxx.gz
```

将数据导入到另一个服务器 mongo 数据库，或者进行升级。

```
mongorestore --uri="mongodb://localhost:27017" --gzip --archive=xxx.gz
```

如何你的数据库需要认证，那么请在 uri 中添加用户名和密码。

```
mongorestore --uri="mongodb://user:password@localhost:27017" --gzip --archive=xxx.gz
```

如果你的密码中包含如@等特殊字符，需要使用 uri encoded 工具将密码加密一下。

如果你要在 mongo 中创建用户，请使用如下命令：

```
db.createUser({user:"user",pwd:"你的密码",roles:[{role:"readWrite",db:"你的数据库"}]})
```

如果你已经拥有账户，想赋予新的数据库操作权限，请使用如下命令：

```
db.grantRolesToUser('你的用户名',[{role:'readWrite',db:'你的数据库'}])
```

查看数据库的命令`show dbs;`

删除数据库命令：

```
use yourdb;
db.dropDatabase();
```

删除 id 为 4f29e4860b2e2ecb9910e304 的数据,操作

```
db.logs.remove({'_id':ObjectId('4f29e4860b2e2ecb9910e304')})
```

查询文档记录

```
db.logs.find({'adId':'887760470'})
```

当报错`no geo indices for geoNear`，在集合中创建：

```
db.feed.createIndex({loc:"2dsphere"})
```

清空 logs 表记录

```
db.logs.deleteMany({})
```

修改 logs 表记录

```
db.logs.update({userId:{$in:[id1,id2]}},{$set:{'sex':1}},{multi:true});
```
