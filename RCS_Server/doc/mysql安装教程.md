<!--
 * @Author: your name
 * @Date: 2020-10-06 01:34:21
 * @LastEditTime: 2020-10-06 01:36:32
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \fc_numbere:\VUE_RCS监控\RCS_Server2020-10-06\doc\mysql配置.md
-->
win server200  mysql安装教程https://blog.csdn.net/u011145571/article/details/105069529/


安装mysql数据库
完整配置教程参考：https://www.cnblogs.com/zhengze/p/10702035.html（5.6版本）

1解压msyql-8.0.19到c盘programfile/  msyqlserver目录下
2配置环境变量:我的电脑—》右键属性—》高级系统设置—》环境变量  -双击path变量，将msyql-8.0.19解压获得的bin文件路径添加进去
3.打开命令行窗口，在里面输入：mysqld --install 
 
4 . 【Windows键+R键】打开“运行”窗口 ,里面输入“services.msc”并按下回车键

找到mysql服务，右键启动
 
mysql 启动后停止 ：https://www.cnblogs.com/pandaly/p/11738789.html
  mysql用户配置：
第一安装完为初始随机密码，需要修改：

2. 连接权限数据库： use mysql; 
3.改密码：update user set password=password("123") where user="root";（别忘了最后加分号） 。 
4. mysql –u –p 进入mysql界面既成功
https://www.jb51.net/article/179011.htm 忘记密码
https://www.cnblogs.com/alibai/p/4038954.html数据库存导出
ALTER USER root@‘localhost' IDENTIFIED WITH mysql_native_password BY  123456' 

2.安装nodejs 
比较简单，安装完
Cmd输入node –v可出现版本号即成功
3安装数据库可视化工具navicat
安装完，右键  ---》‘编辑连接’，输入修改好的mysql密码，既可连接到数据库

http-sftp
https://blog.csdn.net/daxia5a0/article/details/103041620