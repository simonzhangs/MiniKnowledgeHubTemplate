# Mysql

MySQL 是最流行的关系型数据库管理系统，在 WEB 应用方面 MySQL 是最好的 RDBMS(Relational Database Management System：关系数据库管理系统)应用软件之一。

官网地址：https://www.mysql.com/

备份数据

```
mysqldump -uroot -p --database logs > logs.sql
```

mysql 快速导入数百万级记录，这种方案可以节省很多时间。

```
mysql -uroot -p

create database dbname;

set sql_log_bin=off;
set autocommit=0;

use dbname;
start transaction;
source dbfilename;

commit;
```

查询用户 ID，在有规律的名称中，例如群 mKe，群 aer，等中，查找出这些群，然后取出创建者，并去重。

在这里没有使用%模糊匹配，而使用\_进行匹配一个任意字符。

```
select distinct creater_id from group_info where name like '群___';
```

修改表的主键 key 自增值

```
alter table users auto_increment=1000;
```

查询用户留存率

```
select id,DATEDIFF(now(),ifnull(login_date,add_date)) as 'days' from user;
```

查询天数

```
select id,floor((DATEDIFF(now(),login_date))/7) as 'groupid' from user  where login_date != '';

select t2.* from (select id,floor((DATEDIFF(now(),login_date))/7) as 'groupid' from user t1  where login_date != '') t2 where groupid < 2 and groupid >=1;


select id,floor(0.05) as 'groupid' from user where login_date !='';

select now from user ;

select  t1.id,now() from user t1 where id = '9xxxxxxx';
```

查询周数

```
select t.weekid,count(t.id) as num from
(
select id,floor((DATEDIFF(now(),login_date))/7) as 'weekid' from user  where login_date != ''

) as t
group by t.weekid
order by t.weekid
```

查询月数

```
select floor(groupid / 4) as mon,sum(num) from (
select t.groupid,count(t.id) as num from
(
select id,floor((DATEDIFF(now(),login_date))/7) as 'groupid' from user  where login_date != ''
) as t
group by t.groupid
order by t.groupid
) t3
group by floor(groupid / 4)
```

查看视图定义者

```
select TABLE_SCHEMA,TABLE_NAME,DEFINER from information_schema.VIEWS;
```

查询待修改视图定义者，dbs@%是老的 view 定义者，app@localhost 是新的 view 定义者。

```
select concat("alter DEFINER=app@localhost SQL SECURITY DEFINER VIEW ",TABLE_SCHEMA,".",TABLE_NAME," as ",VIEW_DEFINITION,";") from information_schema.VIEWS where DEFINER = 'dbs@%';
```

在 MYSQL 命令中，再次使用得到的结果语句执行即可。
