import React,{Component} from 'react';

import { Modal,DatePicker, Button,Row,Col,Input,Slider, InputNumber,Progress,Card,Form,Select,Table,Alert , Badge} from 'antd';
const { TextArea } = Input;
const FormItem = Form.Item;
const Option = Select.Option;
import  Common from './ajaxMethod';

import $ from "jquery" ;
function onChange(value) {
    console.log(value);
    
}
const columns = [{
    title: '申请时间',
    dataIndex: 'time',

    key: 'time',
}, {
    title: '请假类型',
    dataIndex: 'typ',

    key: 'typ',
}, {
    title: '是否批准',
    dataIndex: 'approve',

    key: 'approve',
}];
var b=[];
export default class Apply extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: '',
            approvero:"",
            inputValue: 1,
            name:'',
            value:'hello',
            isAllowed:"",
            approver:"",
            approvalDate:"",
            approvalRemark:"",
            style:"",
            percent:"",
            key:"",
            visible: true,
            role:this.props.location.query.role,
            leixing:''
        };
        console.log(this.state.role);
    }
    showModal = () => {
        this.setState({
            visible: true,
        });
    }
    handleOk = (e) => {
        console.log(e);
        this.setState({
            visible: false,
        });
    }
    handleCancel = (e) => {
        console.log(e);
        this.setState({
            visible: false,
        });
    }
    componentWillMount(){
        console.log(this.state.role);
        if("jingli" == this.state.role.toString()){
            this.setState({leixing:'2'});
        }else if("zhuren" == this.state.role.toString()){
            this.setState({leixing:'3'});
        }else if("employee" == this.state.role.toString()){
            this.setState({leixing:'1'});
        }

    }
    componentDidMount(){
        let _this = this;

        var dat={
            account:this.props.location.query.name,
            action:"findTaskToBeProcessed"
        };
        console.log('componentDidMount');
        console.log(this.state.value);
                Common.getDa(JSON.stringify(dat),function(data){
            let date,date1,allow,approve,approveDate,approveRemark,allowC,style0,percent;let a={};
            let tv;


            for (var i=1;i<data.msg.length;i++){
                date1=new Date(data.msg[0].askDate).getTime();//比较时间先后来获取当前最近一次请假详情
                date=new Date(data.msg[i].askDate).getTime();
                if(date1<date){
                    date1=date;
                    //allow="不批准";
                    allow=data.msg[i].isAllowed;
                    approve=data.msg[i].approver;
                    approveDate=data.msg[i].approvalDate;
                    approveRemark=data.msg[i].approvalRemark;
                }
            }




            for (var j=0;j<data.msg.length;j++){
                a={time:data.msg[j].askDate,typ:data.msg[j].askType,approve:data.msg[j].isAllowed};
                b.push(a);

            }


            switch(allow){
                case "不批准": {
                    allowC = "很遗憾您的请假不通过";
                    style0="exception ";
                    percent=100;
                }break;
                case "未审核": {

                style0="exception";
                    allowC = "未审核";
                    percent=0;
                }break;
                case "批准":{

                style0=""
                    allowC="恭喜您请假通过";
                percent=100;
                }break;
            }


            _this.setState({
                isAllowed:allowC,
                approver:approve,
                approvalDate:approveDate,
                approvalRemark:approveRemark ,
                style:style0,
                percent:percent,



            });


        });
                this.hua();
    }
    Submit(){
         console.log(this.state.role);


         var data={
                department:this.state.work,
                action:"askForLeaveProcess",
                name:this.state.name,
                askAccount:this.props.location.query.name,
                askType:this.state.applyclass,
                askRemark:this.state.otherinfo,
                leaveDate1:this.state.applytime1,
                leaveDate2:this.state.applytime2,
                leaveDateCount:this.state.inputValue,
                leixing:this.state.leixing
         };

        Common.test(JSON.stringify(data),function (ret) {
            if(ret=='success'){
                alert("申请成功");
                //{<Alert message="申请成功" type="success" />}
            }else{
                alert("申请失败");
            }
        });

//console.log(this.state.name)
    }

    handleChange(date) {
        this.setState({date:date});

    }
    handleChange2(work) {
        this.setState({work:work});

    }
    handleChange3(name) {
        this.setState({name:name});

    }
    handleChange4(applyclass) {
        this.setState({applyclass:applyclass});

    }
    handleChange5(otherinfo) {
        this.setState({otherinfo:otherinfo});

    }
    handleChange6(applytime1) {
        this.setState({applytime1:applytime1});

    }
    handleChange7(applytime2) {
        this.setState({applytime2:applytime2});

    }

    onChange = (value) => {

        this.setState({
            inputValue: value,
        });
    }
    onA(selectedRowKeys, selectedRows){//点击列表行改变颜色
        let _this=this;
        let v=document.getElementsByClassName("ant-table-tbody") [0].childNodes.length;
        //alert(v);
        for(var i =0;i<v;i++){
            document.getElementsByClassName("ant-table-tbody")[0].childNodes[i].className=document.getElementsByClassName("ant-table-tbody")[0].childNodes[i].className.replace(" table-tr-sel","");
        }
        console.log("",selectedRows)  ;

        console.log(selectedRowKeys)
    }
	onC(_this,record,selectedRows){
        if (_this.selectIndex == record.time) return; // 不加个判断会连续在一行tr加样式,到时候会有多个选中
        _this.selectIndex = record.time;

        const tbodytrs = selectedRows.target.parentNode.parentNode.childNodes;
        const counts = tbodytrs.length;
        const a=tbodytrs[0].cells[0].childNodes[3].nodeValue;

        for (let i = 0; i < counts; i++) {
            if (tbodytrs[i].cells[0].childNodes[3].nodeValue != record.time) {
                tbodytrs[i].className = tbodytrs[i].className.replace(" table-tr-sel", "");
            } else {
                tbodytrs[i].className += " table-tr-sel";
            }
        }
    }
       onSelect(record, selected, selectedRows){//更新当前请假单
       let _this = this;
       console.log(selectedRows);

        console.log( selected,record,selectedRows);
        console.log(record.typ);
        console.log(selectedRows,record);
        console.log(this.props.location.query.name);
       let dat={

           account:this.props.location.query.name,
           action:"findTaskToBeProcessed"
       };

       Common.getDa(JSON.stringify(dat),function(data) {
           let style0,percent,allowC;
           switch(record.approve){
               case "不批准": {
                   allowC = "很遗憾，您请假未通过";
                   style0="exception ";
                   percent=100;
               }break;
               case "未审核": {

                   style0="exception";
                   allowC = "未审核";
                   percent=0;
               }break;
               case "批准":{

                   style0=""
                   allowC="恭喜，您请假通过了";
                   percent=100;
               }break;
           }



           for(var b=0;b<data.msg.length;b++){
             if(record.time==data.msg[b].askDate){
               //(data.msg[b].askDate) ;
              // alert(record.approve);

                 localStorage.setItem("approvero",data.msg[b].approverRole);
               _this.setState({
                   isAllowed:allowC,
                   approver:data.msg[b].approver,
                   approvalDate:data.msg[b].approvalDate,
                   approvalRemark:data.msg[b].approvalRemark ,
                   style:style0,
                   percent:percent,
                   approvero:data.msg[b].approverRole,
               },_this.hua.bind(this));

          }}


       })
       _this.onC(_this,record,selectedRows) ;
    }
    drawArrow(ctx, fromX, fromY, toX, toY,theta,headlen,width,color) {
        var theta = theta || 30,
            headlen = headlen || 10,
            width = width || 1,
            color = color || '#000',
            angle = Math.atan2(fromY - toY, fromX - toX) * 180 / Math.PI,
            angle1 = (angle + theta) * Math.PI / 180,
            angle2 = (angle - theta) * Math.PI / 180,
            topX = headlen * Math.cos(angle1),
            topY = headlen * Math.sin(angle1),
            botX = headlen * Math.cos(angle2),
            botY = headlen * Math.sin(angle2);
        ctx.save();
        ctx.beginPath();
        var arrowX, arrowY;
        ctx.moveTo(fromX, fromY);
        ctx.lineTo(toX, toY);
        arrowX = toX + topX;
        arrowY = toY + topY;
        ctx.moveTo(arrowX, arrowY);
        ctx.lineTo(toX, toY);
        arrowX = toX + botX;
        arrowY = toY + botY;
        ctx.lineTo(arrowX, arrowY);
        ctx.strokeStyle = color;
        ctx.lineWidth = width;
        ctx.stroke();
        ctx.restore();
    }

    hua(){






        console.log(this.state.value);

        let xian0="#191970";
        let xian1= "#191970";
        let xian6="#191970";
        let x0="#191970";
        let x1="#191970";
        let x6="#191970";
        var z=this.props.value;
        switch (z){

            case "jingli":
                x0="#FF0000";
                x1="#FF0000";
                x6="#FF0000";
                xian0="#FF0000";
                xian1="#191970";
                xian6="#191970";
                break;
            case "zhuren":
                x0="#FF0000";
                x1="#FF0000";
                x6="#FF0000";
                xian0="#191970";
                xian1="#FF0000";
                xian6="#191970";
                break;
            case "dongshizhang":
                x0="#FF0000";
                x1="#FF0000";
                x6="#FF0000";
                xian0="#191970";
                xian1="#191970";
                xian6="#FF0000";
                break;
            default:
                x0="#191970";
                x1="#191970";
                x6="#191970";
                xian0="#191970";
                xian1="#191970";
                xian6="#191970";




        }





        var canvas=document.getElementById('c');
        var cxt=canvas.getContext('2d');

        cxt.clearRect(0, 0, 1000, 300);
        cxt.lineWidth=1;
        cxt.strokeStyle="#00ff00";
        cxt.fillStyle="#00ff00"




        cxt.font="normal 20px sans-serif";


        cxt.beginPath();
        var grd = cxt.createLinearGradient(50,140,70,160);
        grd.addColorStop(0,"#54FF9F");

        grd.addColorStop(0.99,"#F0FFF0");

        cxt.strokeStyle = grd;
        cxt.fillStyle= grd   ;

        cxt.arc(60,150,20,0,2*Math.PI,false);
        cxt.stroke();
        cxt.fill();
        cxt.fillStyle="#191970";
        cxt.fillText("开始",40,190);


        cxt.closePath();
        cxt.beginPath();
        cxt.strokeStyle=x0;
        this.drawArrow(cxt, 80, 150, 150,150,16,16,1,x0);

        cxt.closePath();

        cxt.beginPath();
        var grd = cxt.createLinearGradient(150,126,310,176);
        grd.addColorStop(0,"black");
        grd.addColorStop(0.5,"red");
        grd.addColorStop(1,"yellow");
        cxt.strokeStyle = grd;
        cxt.fillStyle="#191970";

        cxt.rect(150,126,160,50);
        cxt.stroke();
        cxt.fillText("员工请假申请",170,156);
        cxt.closePath();

        cxt.beginPath();
        this.drawArrow(cxt, 310, 150, 360,150,16,16,1,x1);

        cxt.closePath();



        cxt.save();




        cxt.fillStyle=	"#CDC673";
        cxt.translate(390,122);
        cxt.rotate(45*Math.PI/180) ;
        cxt.fillRect(0,0,40,40);
        cxt.restore();





        cxt.beginPath();
        cxt.strokeStyle=xian0;
        cxt.moveTo(390,123);
        cxt.lineTo(390,60);
        cxt.stroke();
        cxt.closePath()




        cxt.beginPath();
        this.drawArrow(cxt, 390, 60, 490,60,16,16,1,xian0);
        cxt.closePath();



        cxt.beginPath();
        cxt.strokeStyle=xian1;
        cxt.moveTo(390,176);
        cxt.lineTo(390,243);
        cxt.stroke();






        cxt.beginPath();
        this.drawArrow(cxt, 390, 243, 490,243,16,16,1,xian1);
        cxt.closePath()



        cxt.beginPath();
        var grd6 = cxt.createLinearGradient(490,36,650,86);
        grd6.addColorStop(0,"black");
        grd6.addColorStop(0.5,"red");
        grd6.addColorStop(1,"yellow");
        cxt.strokeStyle = grd6;
        cxt.rect(490,36,160,50);
        cxt.stroke();
        cxt.fillStyle="#191970";
        cxt.fillText("部门经理审批",506,66);
        cxt.closePath();
        cxt.beginPath();
        var grd = cxt.createLinearGradient(490,220,650,270);
        grd.addColorStop(0,"black");
        grd.addColorStop(0.5,"red");
        grd.addColorStop(1,"yellow");
        cxt.strokeStyle = grd;
        cxt.rect(490,220,160,50);
        cxt.stroke();
        cxt.fillStyle="#191970";
        cxt.fillText("主任审批",526,249);
        cxt.closePath();
        cxt.beginPath();
        cxt.closePath();



        cxt.strokeStyle=xian0;
        cxt.moveTo(650,60);
        cxt.lineTo(760,60);
        cxt.stroke();
        cxt.closePath();


        cxt.beginPath();
        cxt.strokeStyle=xian1;
        cxt.moveTo(650,240);
        cxt.lineTo(760,240);
        cxt.stroke();
        cxt.closePath();




        cxt.beginPath();
        this.drawArrow(cxt, 760, 60, 760,123,16,16,1,xian0);


        cxt.closePath();








        cxt.beginPath();
        this.drawArrow(cxt, 416, 150, 490,150,16,16,1,xian6);
        cxt.closePath();





        cxt.beginPath();
        var grd6 = cxt.createLinearGradient(490,175,576,225);
        grd6.addColorStop(0,"black");
        grd6.addColorStop(0.5,"red");
        grd6.addColorStop(1,"yellow");
        cxt.strokeStyle = grd6;
        cxt.rect(490,125,160,50);
        cxt.stroke();
        cxt.fillStyle="#191970";
        cxt.fillText("董事长审批",516,160);
        cxt.closePath();




        cxt.beginPath();
        this.drawArrow(cxt, 650, 150, 730,150,16,16,1,xian6);
        cxt.closePath();


        cxt.save();


        cxt.fillStyle=	"#CDC673";
        cxt.translate(760,122);
        cxt.rotate(45*Math.PI/180) ;
        cxt.fillRect(0,0,40,40);
        cxt.restore();
        cxt.beginPath();
        this.drawArrow(cxt, 760, 240, 760,177,16,16,1,xian1);
        cxt.beginPath();
        this.drawArrow(cxt, 789, 149, 900,149,16,16,1,xian1);

        cxt.closePath();
        cxt.beginPath();
        cxt.fillStyle="#CD2626";
        cxt.arc(920,149,20,0,2*Math.PI,false);
        cxt.fill();
        cxt.fillText("结束",900,186);
        cxt.closePath();
        cxt.closePath();






    }
    render(){


        console.log(this.state.approvero);
        return (
            <div className="gutter-example">
                        <Row  gutter={16}>
                          
                       <Col className="gutter-row" span={8} style={{height:160 , marginLeft:20}}>
                                <h1 style={{marginLeft:100,marginBottom:50}}>请假申请单</h1>
                                <Col span={6}><div>申请时间</div></Col>
                                <Col><DatePicker onChange={value => this.handleChange(value)} id="date"/></Col>
                                <div style={{height:20}}></div>
                                <Col span={6}><div>岗位</div></Col>
                                <Col>
                                    <Select style={{ width: 160}} id="work" onChange={value => this.handleChange2(value)} >
                                        <Option value="技术部">技术部</Option>
                                        <Option value="开发部">开发部</Option>
                                        <Option value="专响1部">专响1部</Option>
                                        <Option value="专响2部">专响2部</Option>
                                        <Option value="业务中心" >业务中心</Option>
                                        <Option value="客服中心" >客服中心</Option>
                                        <Option value="市场中心" >市场中心</Option>
                                        <Option value="市场部">市场部</Option>
                                        <Option value="财务部">财务部</Option>
                                        <Option value="综合部" >综合部</Option>
                                        <Option value="结单部" >结单部</Option>
                                        <Option value="线下拓展部" >线下拓展部</Option>
                                        <Option value="服务营销部" >服务营销部</Option>
                                        <Option value="接单部" >接单部</Option>
                                        <Option value="仓管部">仓管部</Option>
                                    </Select>
                                </Col>

                                <div style={{height:20}}></div>
                                <Col span={6}><div>姓名</div></Col>
                                <Col>
                                    <Input placeholder="请输入您的姓名"  style={{width:160}} id="name" onChange={value => this.handleChange3(value.target.value)} />
                                </Col>

                                <div style={{height:20}}></div>
                                <Col span={6}><div>请假类别</div></Col>
                                <Col>
                                    <Select style={{ width: 160 }} id="applyclass" onChange={value => this.handleChange4(value)}>
                                        <Option value="病假">病假</Option>
                                        <Option value="产假">产假</Option>
                                        <Option value="休假">休假</Option>
                                        <Option value="事假">事假</Option>

                                    </Select>
                                </Col>

                                <div style={{height:20}}></div>
                                <Col span={6}><div>请假备注</div></Col>
                                <Col>
                                    <TextArea rows={4} style={{width:160}} id="otherinfo" onChange={value => this.handleChange5(value.target.value)}/>
                                </Col>

                                <div style={{height:20}}></div>
                                <Col span={6}><div>请假时间</div></Col>
                                <Col span={16}>
                                    <DatePicker onChange={value => this.handleChange6(value)} id="applytime1"  />
                                    <br/><div style={{height:20}}>到</div>

                                    <DatePicker onChange={value => this.handleChange7(value)} id="applytime2" />
                                </Col>

                                <div style={{height:20}}></div>
                                <Col span={6}><div>共请假</div></Col>
                                <Col span={6}>
                                    <Slider min={1} max={20} onChange={this.onChange} value={this.state.inputValue} style={{width:160}} />
                                    <InputNumber
                                        min={1}
                                        max={20}
                                        style={{ marginLeft: 3 }}
                                        value={this.state.inputValue}
                                        onChange={this.onChange}
                                        id="timecount"
                                    />天
                                </Col>
								                                <Col span={24}>

                                    <Row>
                                        <div style={{height:20 }}></div>
                                    </Row>
                                </Col>
                                <Col span={6} style={{marginLeft:46}}>
                                    <Button type="primary" onClick={this.Submit.bind(this)} id="apply">申请</Button>
                                </Col>

                                <Col span={6} style={{marginLeft:60}}>
                                    <Button type="danger" id="cancel">取消</Button>

                                </Col>
                            </Col>

                            <Col id="a" className="gutter-row" span={8} style={{marginLeft:-70}}>
                                <h1 style={{marginLeft:100,marginBottom:50}}>历史请假单</h1>

                                <Table   onChange={this.onA.bind(this)} columns={columns} dataSource={b} onRowClick={this.onSelect.bind(this)} loadding="true"/>
                            </Col>



                            <Col className="gutter-row" span={6} style={{marginLeft:70}}>

                                <Row gutter={ {xs: 8, sm: 16, md: 24, lg: 32} }>
                                    <h1 style={{marginLeft:60,marginBottom:50}}>当前请假单状态</h1>

                                    <Col span={10}><div>当前状态：<Button type="primary"  onClick={this.showModal}>Open</Button></div></Col>

                                    <Col style={{marginTop:30}}>


                                        <Modal
                                            title="本次请假的流程有："
                                            visible={this.state.visible}
                                            width="1100"
                                            height="600"
                                            footer={null}
                                            onOk={this.handleOk}
                                            onCancel={this.handleCancel}
                                        >

                                            <canvas id="c" width="1000"　height="300"></canvas>


                                            <p><Row style={{textAlign:"left"}}><Col span={3} style={{marginLeft:60}}><Badge status="error" /></Col><Col span={10} style={{marginLeft:-100}}><p>已完成</p></Col></Row><Row style={{textAlign:"left"}}><Col span={3} style={{marginLeft:60}}><Badge status="processing" /></Col><Col span={10} style={{marginLeft:-100}}><p>未完成</p></Col></Row></p>
                                        </Modal>


                                        <Progress type="circle"   status={this.state.style} percent={this.state.percent}/>

                                    </Col>
                                    <div style={{height:20}}></div>
                                    <Card title="进度" bordered={false} style={{ width: 370 ,height:400}}>


                                        <Row>
                                            <Col span={9}>
                                                <p style={{fontSize:20,lineHeight:3}}>审批状态:</p>
                                            </Col>
                                            <Col span={15}>
                                                <p style={{fontSize:20,lineHeight:3}}>{this.state.isAllowed}</p>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col span={9}><p style={{fontSize:20,lineHeight:3}}>审批人:</p>
                                            </Col>
                                            <Col span={15}><p style={{fontSize:20,lineHeight:3}}>{this.state.approver}</p>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col span={9}>
                                                <p style={{fontSize:20,lineHeight:3}}>审批时间:</p>
                                            </Col>
                                            <Col span={15}>
                                                <p style={{fontSize:16,lineHeight:4}}>{this.state.approvalDate}</p>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col span={9}>
                                                <p style={{fontSize:20,lineHeight:3}}>审批备注:</p>
                                            </Col>
                                            <Col span={15}>
                                                <p style={{fontSize:20,lineHeight:3}}>{this.state.approvalRemark}</p>
                                            </Col>
                                        </Row>

                                    </Card>

                                </Row>

                            </Col>
                        </Row>
            </div>

        );
    }
}
// ReactDOM.render(<Apply />, document.getElementById('root'));
