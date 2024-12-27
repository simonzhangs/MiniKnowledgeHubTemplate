# Git

记录 Git 常用命令。

在每次开发新功能时，拉出一个新分支，分支名称为开发的功能名称，格式为 func-xxxx。当开发的功能完成并测试没有问题后，合并到主分支。

当在开发新功能时，如果出现 bug，能够马上解决的，直接在主分支上修改，如果需要时间长，则新创建一个分支，格式为 bug-xxxx。当开发的功能完成并测试没有问题后，合并到主分支。

1，开发分支。
切换到 dev 分支，进行代码开发。开发完毕后，合并到主分支。

```
git checkout dev
```

2，合并到主分支。

```
git checkout master
git merge dev
git push origin master
```

3，主分支添加 tag，并发布到线上。

```
git checkout master
git tag -a v1.0.0 -m "V1.0版本"
git push origin v1.0.0
git push --tags
go build
```

4，删除分支

```
git branch -d 分支名称
```

5，设置用户名和邮箱

```
git config --global user.name 你的用户名
git config --global user.email 你的邮箱
```
