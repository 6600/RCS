/*
 Navicat Premium Data Transfer

 Source Server         : localhost_3306
 Source Server Type    : MySQL
 Source Server Version : 80019
 Source Host           : localhost:3306
 Source Schema         : rcs

 Target Server Type    : MySQL
 Target Server Version : 80019
 File Encoding         : 65001

 Date: 16/10/2020 21:12:57
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for agvcharge
-- ----------------------------
DROP TABLE IF EXISTS `agvcharge`;
CREATE TABLE `agvcharge`  (
  `ID` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `IP` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `StartChargeTime` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `StopChargeTime` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for agvtask
-- ----------------------------
DROP TABLE IF EXISTS `agvtask`;
CREATE TABLE `agvtask`  (
  `ID` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `CurrentPos` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `CurrentOperate` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `TaskTypeName` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `StartPlace` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `EndPlace` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `ScheduledTime` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `RemainTime` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for agvworktime
-- ----------------------------
DROP TABLE IF EXISTS `agvworktime`;
CREATE TABLE `agvworktime`  (
  `AGVID` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `AGVIP` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `NormalWorkStartTime` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `NormalWorkEndTime` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `AbNormalWorkStartTime` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `AbNormalWorkEndTime` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `WorkDate` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `NormalWorkTotal` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `AbNormalWorkTotal` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for taskemail
-- ----------------------------
DROP TABLE IF EXISTS `taskemail`;
CREATE TABLE `taskemail`  (
  `email` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `verify` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for taskinfo
-- ----------------------------
DROP TABLE IF EXISTS `taskinfo`;
CREATE TABLE `taskinfo`  (
  `TaskID` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '任务ID',
  `TaskType` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `TaskTypeName` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '任务类型',
  `TaskStatus` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `TaskStatusDescription` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '任务状态',
  `AGVID` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '执行任务的小车ID',
  `SetTime` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `StartTime` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `FinishTime` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `Sender` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `Receiver` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `OrderID` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `MaterialID` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT 'F0P1;F0P2   原料iD',
  `MaterialNum` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT ' 2;3    原料数量',
  `ProductID` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT 'F0P1;F0P2 成品ID',
  `ProductNum` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '2,3    成品ID数量',
  `FireTokenID` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '火令牌ID',
  `StartPlaceDescription` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '起点描述',
  `EndPlaceDescription` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '目标点描述',
  `Number` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '数量',
  `Unit` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '单位',
  `TokenStartTime` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `TokenFinishTime` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `TokenUseTime` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `TokenMaxTime` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `TokenOffSet` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `AGVIP` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `LabelNumber` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '资安数量',
  `LineID` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '产品线'
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `user` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `pass` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `datetime` datetime(0) NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP(0),
  PRIMARY KEY (`user`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Procedure structure for batchInsertTestData
-- ----------------------------
DROP PROCEDURE IF EXISTS `batchInsertTestData`;
delimiter ;;
CREATE PROCEDURE `batchInsertTestData`(INOUT `n` int,`startdate` VARCHAR(20),`enddate` VARCHAR(20))
BEGIN
	#Routine body goes here...

   DECLARE i INT DEFAULT 0;
	  
        WHILE i < n DO
				SET @ID  =(SELECT  substring_index(substring_index('C1;C2;C3;C4', ';',- FLOOR( rand( ) * 7+1 ) ), ';', 1 )); 
				SET @TaskTypeName  =(SELECT  substring_index(substring_index('原料配送任务;成品入库任务;栈板配送任务;手动送料任务;手动退料任务', ';',- FLOOR( rand( ) * 7+1 ) ), ';', 1 ));     
				SET @CurrentOperate  =(SELECT  substring_index(substring_index('准备出发;行车中;己完成;到达目的', ';',- FLOOR( rand( ) * 7+1 ) ), ';', 1 )); 
				SET @TaskStatus  =(SELECT  substring_index(substring_index('待执行;正在执行;己完成;任务异常', ';',- FLOOR( rand( ) * 7+1 ) ), ';', 1 )); 
			 
	    	SET @startplace  =(SELECT  substring_index(substring_index('0楼线边仓;1楼线边仓;2楼线边仓;3楼线边仓', ';',- FLOOR( rand( ) * 7+1 ) ), ';', 1 )); 
				SET @endplace  =(SELECT  substring_index(substring_index('2楼线边仓;3楼线边仓;1楼线边仓;0楼线边仓', ';',- FLOOR( rand( ) * 7+1 ) ), ';', 1 )); 
	      SET @Sender  =(SELECT  substring_index(substring_index('物料员甲;物料员丙;物料员丁;物料员忆', ';',- FLOOR( rand( ) * 7+1 ) ), ';', 1 )); 
				SET @Receiver  =(SELECT  substring_index(substring_index('Receiver1;Receiver2;Receiver3;Receiver4', ';',- FLOOR( rand( ) * 7+1 ) ), ';', 1 )); 
				
	      SET @nstart = dateget(startdate,enddate);  
	    	SET @nend =  from_unixtime(unix_timestamp(@nstart)+rand()*3000,'%Y-%m-%d %H:%i:%S');
				SET @abstart = dateget(startdate,enddate);  
	    	SET @abend =  from_unixtime(unix_timestamp(@abstart)+rand()*3000,'%Y-%m-%d %H:%i:%S');
		  	##agvworktime表插入随机数据 
    	 insert into agvworktime(Type,ID,IP,NormalTimeStart,NormalTimeEnd,AbnormalTimeStart,AbnormalTimeEnd,date) 
    				values('AGVWorkTime',@ID,'22.22.22.22',@nstart,@nend,@abstart,@abend,unix_timestamp(@nstart));
			 	##agvcharge表插入随机数据  
			  insert into agvcharge(Type,ID,IP,StartChargeTime,StopChargeTime) 
    				values('AGVCharge',@ID,'22.22.22.22',@nstart,@nend);
		 

				##agvtask表插入随机数据  		
				insert into agvtask(Type,ID,CurrentPos,CurrentOperate,TaskTypeName,StartPlace,EndPlace,ScheduledTime, RemainTime)   
				          values('AGVTask',@ID,@startplace,@CurrentOperate,@TaskTypeName,@startplace,@endplace,@nstart,@nend-@nstart);
     
				 
   ##taskinfo表插入随机数据 
				insert into  taskinfo(Type,TaskID,TaskStatus,TaskTypeName,AGVID,StartPlaceDescription,EndPlaceDescription,SetTime,StartTime,FinishTime,Sender,Receiver,OrderID,MaterialID,MaterialNum,ProductID,ProductNum,TokenStartTime,TokenFinishTime,TokenUsedTime,TokenMaxTime) 
    				values('TaskInfo',@nstart,@TaskStatus,@TaskTypeName,@ID,@startplace,@endplace,@nstart,@nstart,@nend,@Sender,@Receiver,'test',materialid(),randnum(10),productid(),randnum(10),@nstart,@nend,randtime(10),randtime(10));
        SET i = i+1;
        END WHILE;
END
;;
delimiter ;

-- ----------------------------
-- Function structure for dateget
-- ----------------------------
DROP FUNCTION IF EXISTS `dateget`;
delimiter ;;
CREATE FUNCTION `dateget`(start VARCHAR(30),end VARCHAR(30))
 RETURNS datetime
  DETERMINISTIC
BEGIN
	#Routine body goes here... 
	 #2017-01-01  2018-08-08
	RETURN from_unixtime(
 unix_timestamp(start) 
 + floor(
   rand() * ( unix_timestamp(end) - unix_timestamp(start) + 1 )
 )
);
END
;;
delimiter ;

-- ----------------------------
-- Function structure for materialid
-- ----------------------------
DROP FUNCTION IF EXISTS `materialid`;
delimiter ;;
CREATE FUNCTION `materialid`()
 RETURNS varchar(20) CHARSET utf8mb4
  DETERMINISTIC
BEGIN
	#Routine body goes here...
SET @MaterialID  =(SELECT  substring_index(substring_index('F0P1;F0P2;F0P3;F0P4', ';',- FLOOR( rand( ) * 7+1 ) ), ';', 1 )); 
	RETURN CONCAT(@MaterialID,',',@MaterialID);
END
;;
delimiter ;

-- ----------------------------
-- Function structure for productid
-- ----------------------------
DROP FUNCTION IF EXISTS `productid`;
delimiter ;;
CREATE FUNCTION `productid`()
 RETURNS varchar(40) CHARSET utf8mb4
  DETERMINISTIC
BEGIN
	#Routine body goes here...
 SET @ProductID  =(SELECT  substring_index(substring_index('test2;test3;test4;test1', ';',- FLOOR( rand( ) * 7+1 ) ), ';', 1 )); 
	RETURN CONCAT(@ProductID,',',@ProductID);
END
;;
delimiter ;

-- ----------------------------
-- Function structure for randnum
-- ----------------------------
DROP FUNCTION IF EXISTS `randnum`;
delimiter ;;
CREATE FUNCTION `randnum`(i int)
 RETURNS varchar(20) CHARSET utf8mb4
  DETERMINISTIC
BEGIN
	#Routine body goes here...

	RETURN CONCAT(FLOOR(RAND()*i),',',FLOOR(RAND()*i));
END
;;
delimiter ;

-- ----------------------------
-- Function structure for randtime
-- ----------------------------
DROP FUNCTION IF EXISTS `randtime`;
delimiter ;;
CREATE FUNCTION `randtime`(i int)
 RETURNS varchar(20) CHARSET utf8mb4
  DETERMINISTIC
BEGIN
	#Routine body goes here...

	RETURN CONCAT(FLOOR(RAND()*i)+FLOOR(RAND()*i),':',FLOOR(RAND()*i)+FLOOR(RAND()*i));
END
;;
delimiter ;

-- ----------------------------
-- Function structure for rand_string
-- ----------------------------
DROP FUNCTION IF EXISTS `rand_string`;
delimiter ;;
CREATE FUNCTION `rand_string`(n INT)
 RETURNS varchar(255) CHARSET utf8mb4
  DETERMINISTIC
BEGIN 

    DECLARE chars_str varchar(100) DEFAULT 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    DECLARE return_str varchar(255) DEFAULT '' ;
    DECLARE i INT DEFAULT 0;
    WHILE i < n DO
        SET return_str = concat(return_str, substring(chars_str, FLOOR(1 + RAND() * 62), 1));
        SET i = i + 1;
    END WHILE;
    RETURN return_str;
END
;;
delimiter ;

SET FOREIGN_KEY_CHECKS = 1;
