# Sqlite3

SQLite 是一个软件库，实现了自给自足的、无服务器的、零配置的、事务性的 SQL 数据库引擎。SQLite 是在世界上最广泛部署的 SQL 数据库引擎。SQLite 源代码不受版权限制。常用在单机模式或嵌入式模式下。

官网地址：https://www.sqlite.org/

## 只导出数据库表结构

```
sqlite3 DATABASE_FILE.sqlite '.schema' > schema.sql
```

## 导出所有内容

```
sqlite3 DATABASE_FILE.sqlite '.dump' > dump.sql
```

## 导出 某张表内容

```
sqlite3 DATABASE_FILE.sqlite '.dump demotable1' > dump.sql
```

## 将一个表中的数据导入到另一张表中。

```
insert into v_arts(uuid,openid,title,keyword,views,status,ispub,islock,createtime,updatetime) select uuid,openid,title,'' as keyword,views,status,1 as ispub,0 as islock,createtime,updatetime from blog_articles;

insert into v_artconts(uuid,content) select uuid,content from blog_article_contents;
```
