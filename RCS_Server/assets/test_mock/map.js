var Mapmark=[{ID:'E1',x:1279,y:532,state:true},
          {ID:'E2',x:1394,y:532,state:true},
          {Type:"UpdateAGVStatus",ID:'C1',Th:0,x:200,y:400,state:true},
          {Type:"UpdateAGVStatus",ID:'C2',Th:0,x:200,y:400,state:true},
          {Type:"UpdateAGVStatus",ID:'C3',Th:0,x:200,y:400,state:true},
          {Type:"UpdateAGVStatus",ID:'C4',Th:0,x:200,y:400,state:true},
          {ID:'F1Line',x:1120,y:399,state:true},
          {ID:'F2Line',x:1220,y:399,state:true},
          {ID:'Lift1',x:800,y:350,state:true},
          ]
          var test =123
var Update = {
                   Agvstaus :{Type:"UpdateAGVStatus",     name:'avg',     ID: 'AGV1', x:500,y:1100, ip: '22.22.2.22',   state:true,  JackingStatus: '底部' ,'顶起的设备':'空料车'
                           ,PowerPercent:'80%','充电状态':'否','预计时间':'20分钟',AbnormalStatus:'无',AbnormalDetail:'触发避障'},
                   Agvtask :{Type:"UpdateAGVTaskStatus",   ID: 'AGV1',  TaskID:"2020-08-22 10:10:01",CurrentPos:'仓库发料区',   CurrentOperate:"行车中",  TaskTypeName: '原料配送任务' ,StartPlace:'仓库发料区'
                         ,EndPlace:'2楼线边仓','充电状态':'否',ScheduledTime:'10:20:05',RemainTime:'10:04'},    

                   Alarm:   {Type:"UpdateAlarmModuleStatus",  ID: 'AM1',     ip: '22.22.2.22',  state:true,  Alarm:true,     Content	: "车已到站"}
                  ,'Place':   {Type:"UpdatePlaceStatus",     ID: 'A05K101',    ip: '22.22.2.22',  state:true,  Name:'仓库发料库位1',HaveCar:true,Lock:true}
                  ,'AutoDoo': {Type:"UpdateAutoDoorStatus",  ID: 'F2Product',  ip: '22.22.2.22',  state:true,  DoorOpen:true}
                  ,'Pile' :   {Type:"UpdatePileStatus",      ID: 'ChargePile1',ip: '232.22.2.22', state:true,  MovingStatus: '1', ChargeStatus:'InCharging',ChargeCur:'1.5',ChargeVoltage:"50"}
                  ,'Lift' :   {Type:"UpdateLiftStatus",      ID: 'Lift2',      ip: '21.22.2.22',  state:true,  Pos: 'Bottom',HaveMaterial:true}
                  ,'Ele'  :   {Type:"UpdateEleStatus",       ID: 'E2',         ip: '52.22.2.22',  state:true,  Floor: '1',DoorOpen:true,InUse:true}
                  ,'name' :   {UpdateAlarmModuleStatus:'AM1',UpdatePlaceStatus:'A05K101',UpdateLiftStatus:'Lift2',UpdateLiftStatus:'Lift2'}}

 var path = {floor1:{path:[{x:462,y:602,state:true},{x:550,y:602,state:true,angle:90},{x:550,y:370,state:true,angle:0},{x:1506,y:370,state:true}
                ,{x:1669,y:369,state:true,angle:-90},{x:1669,y:405,state:true},{x:1540,y:405,state:true},{x:1539,y:446,state:true}],
                  offx:976,offy:2201},


            floor2:{path:[[{x:526,y:136,state:true},{x:525,y:159,state:true},{x:586,y:159,state:true},{x:586,y:401,state:true}
                  ,{x:933,y:401,state:true},{x:943,y:334,state:true},{x:971,y:294,state:true},]
        
                  [{x:933,y:401,state:true},{x:1225,y:401,state:true},{x:1465,y:401,state:true},{x:1825,y:401,state:true}
                    ,{x:1823,y:568,state:true},{x:1799,y:675,state:true},{x:1796,y:1009,state:true},{x:1763,y:1198,state:true}
                    ,{x:1590,y:1198,state:true},{x:1590,y:1171,state:true},{x:1685,y:1172,state:true}],
               ],
            offx:4478,offy:2252}}            
                  
   module.exports = {
    Mapmark,
    Update,test,path
    }