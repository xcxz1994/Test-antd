import React,{Component} from 'react';
import {Can} from "./Can"
import { Modal,DatePicker, Button,Row,Col,Input,Slider, InputNumber,Progress,Card,Form,Select,Table} from 'antd';
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
            visible: false
        };
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
    componentDidMount(){
        let _this = this;

        var dat={
            account:"chunyu",
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
    }
    Submit(){
         //console.log(this.state.work);
         var data={
                department:this.state.work,
                action:"askForLeaveProcess",
                name:this.state.name,
                askAccount:"chunyu",
                askType:this.state.applyclass,
                askRemark:this.state.otherinfo,
                leaveDate1:this.state.applytime1,
               leaveDate2:this.state.applytime2,
             leaveDateCount:this.state.inputValue,
             leixing:"1"
         };

        Common.test(JSON.stringify(data),function (ret) {
            if(ret=='success'){
                alert("申请成功");
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
       let dat={
           account:"chunyu",
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
               _this.setState({
                   isAllowed:allowC,
                   approver:data.msg[b].approver,
                   approvalDate:data.msg[b].approvalDate,
                   approvalRemark:data.msg[b].approvalRemark ,
                   style:style0,
                   percent:percent,
               });

          }}


       })
       _this.onC(_this,record,selectedRows) ;
    }

    render(){
        console.log('asssss');
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

                                            <Can/>
                                            <p>版权所有</p>
                                            <p>盗版必究</p>
                                            <p></p>
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
