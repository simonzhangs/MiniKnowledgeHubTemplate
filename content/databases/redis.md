## Redis

Redis 是一个由 Salvatore Sanfilippo 写的 key-value 存储系统，是跨平台的非关系型数据库。

官网地址：https://redis.io/

Redis 日常开发中常用命令。

#### 设置字符串键值对

- 设置键值 `SET key value `
- 获取键值 `GET key`
- 删除键 `DEL key`
- 设置键有效期 `EXPIRE key seconds`
- 设置键值有效期 `SETEX key seconds value`
- 键值自增 `INCR key`
- 键值自减 `DECR key`

#### 设置哈希 HASH

哈希适合用于存储对象，每个 hash 可以存储 40 多亿键值对。

- 删除一个哈希表字段 `HDEL key field1`
- 获取哈希表中某个字段的值 `HGET key field`
- 获取所有字段和值 `HGETALL key`
- 获取哈希表中字段数量 `HLEN key`
- 设置哈希表中字段的值 `HSET key field value`

#### 设置列表 List

列表是简单的字符串列表，按照插入顺序排序。可以从头部或者尾部插入。一个列表可包含 40 亿个元素。

- 获取列表长度 `LLEN key`
- 移出并获取列表的第一个元素 `LPOP key`
- 将一个元素插入到列表头部 `LPUSH key value1`
- 获取列表指定范围内的元素 `LRANGE key start stop`
- 移除列表元素，count 为 0 删除所有 `LREM key count value`
- 通过索引设置列表元素的值 `LSET key index value`
- 移除列表最后的一个元素，返回值为移除的元素 `RPOP key`
- 从列表尾部添加一个元素 `RPUSH key value1`

#### 设置集合 Set

集合是 String 类型的无序集合。集合成员是唯一的。添加，删除，查找时间复杂度为 O（1）。可以存储 40 亿个成员。

- 向集合中添加一个成员 `SADD key member1`
- 获取集合的成员数量 `SCARD key`
- 判断 member 是否是集合的成员 `SISMEMBER key member`
- 返回集合中的所有成员 `SMEMBERS key`
- 删除集合中的一个成员 `SREM key member1`
