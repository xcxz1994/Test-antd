import React,{Component} from 'react';

import { Card, Col, Row ,Button,Table,Modal,Input} from 'antd';
import  Common from './ajaxMethod';

const { TextArea } = Input;


export default class Examines extends Component{

    constructor(props) {

        super(props);
        this.state = {
            data:'',
            filteredInfo: null,
            sortedInfo: null,
            visible: false,
            otherinfo:'',
            ok:0,
            yes:0,
            rowdata:[]
        }
    }

    handleChange = (pagination, filters, sorter) => {
        console.log('Various parameters', pagination, filters, sorter);
        this.setState({
            filteredInfo: filters,
            sortedInfo: sorter,
        });
    }
    componentWillMount()  {
        console.log(this.state.data);
        let _this=this;
        //console.log("aaaaaaaa");

        var data2={
            action:"queryTaskOfManager",
            name:'john'
        };
        Common.getData(JSON.stringify(data2),function(ret) {
            console.log(ret);
            console.log("渲染界面")
            _this.setState({data:ret.msg})



        });
    }
    ApplyToo(){
        const w=window.open('about:blank');
        w.location.href='/';

    }

    showModal = (record) => {
        let _this=this;
        record=_this.state.rowdata[0][0];
        var delay = function(){

            var nodata={
                action:'taskProcess',
                id:record.id,
                isAllowed:-1,
                department:record.department,
                name:'john',
                approverAccount:'john',
                approvalRemark:_this.state.otherinfo
            };
            if(_this.state.ok==1){
                console.log(_this.state.otherinfo)
                Common.examine(JSON.stringify(nodata),function (ret) {
                    if(ret=='success'){
                        console.log("不批准原因已经提交")
                    }else{
                        alert("发生未知的不批准错误");
                    }
                });
            } else{setTimeout(function(){delay()}, 100)}
        }
        _this.setState({
            visible: true,
        });
        console.log("发送不批准信息");
        delay();
    }
    handleOk = (e) => {
        console.log(e);
        this.setState({
            visible: false,
            ok:1

        });
    }
    handleCancel = (e) => {
        console.log(e);
        this.setState({
            visible: false,
        });
    }
    handleChange5(otherinfo) {
        this.setState({otherinfo:otherinfo});

    }
    Select(record){

        let _this=this;
        record=_this.state.rowdata[0][0];
        console.log(record);
        var yesdata={
            action:'taskProcess',
            id:record.id,
            isAllowed:1,
            department:record.department,
            name:'john',
            approverAccount:'john',

            approvalRemark:null
        };
            Common.examine(JSON.stringify(yesdata),function (ret) {
                if(ret=='success'){
                    alert("已批准");
                }else{
                    alert("发生未知的错误");
                }
            });
        //console.log(record);
    }
    render(){
        const rowSelection = {

            onChange: (selectedRowKeys, selectedRows) => {
                console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
                this.state.rowdata.push(selectedRows);
                console.log(this.state.rowdata);
            },
        };
        let { sortedInfo, filteredInfo } = this.state;
        sortedInfo = sortedInfo || {};
        filteredInfo = filteredInfo || {};
        const columns = [{
            title: '申请人',
            dataIndex: 'name',
            render: text => <a href="#">{text}</a>,
        }, {
            title: '申请时间',
            key: 'askDate',
            sorter: (a, b) => a.age - b.age,
            sortOrder: sortedInfo.columnKey === 'askDate' && sortedInfo.order,
            dataIndex: 'askDate',
        }, {
            title: '岗位',
            dataIndex: 'department',
        },{
            title: '请假类型',
            width: '8%',
            dataIndex: 'askType',
        },{
            title: '请假备注',
            width: '10%',
            dataIndex: 'askRemark',
        },{
            title: '请假时间',
            width:"10%",
            align:"center",
            colSpan: 2,
            dataIndex: 'leaveDate1',
        },{
            colSpan: 0,
            width:"10%",
            dataIndex: 'leaveDate2',
        },{
            title: '共请假天数',
            dataIndex: 'leaveDateCount',
            width: '8%',
        },
        ];


        return(

            <div style={{ background: '#ECECEC', padding: '30px' }} onLoad={this.componentWillMount}>
                <Row gutter={16}>
                    <Col span={8}>
                        <Button type="primary" style={{marginLeft:530,marginBottom:20}} onClick={this.ApplyToo.bind(this)}>我也要请假</Button>

                    </Col>
                    <Col span={8}>
                        <Button type="primary" onClick={this.Select.bind(this)}>批准</Button>
                    </Col>
                    <Col span={8}>
                        <Button type="danger" onClick={this.showModal.bind(this)}>不批</Button>
                    </Col>

                </Row>

                <Table bordered rowSelection={rowSelection} columns={columns}  dataSource={this.state.data}  onChange={this.handleChange}  style={{backgroundColor:'#FFFFFF'}} />

                <Modal
                    title="不批原因备注"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <TextArea rows={4} style={{width:160}} id="otherinfo" onChange={value => this.handleChange5(value.target.value)}/>
                </Modal>

            </div>

        );

    }

}



// ReactDOM.render(<Examines />, document.getElementById('root'));

