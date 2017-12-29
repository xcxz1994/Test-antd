import React,{Component} from 'react';

import {Col, Row ,Button,Table,Modal,Input} from 'antd';
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
            rowdata:[],
            role:this.props.location.query.role,
            name:this.props.location.query.name,
        }
    }
    //用于表格排序
    handleChange = (pagination, filters, sorter) => {
        console.log('Various parameters', pagination, filters, sorter);
        this.setState({
            filteredInfo: filters,
            sortedInfo: sorter,
        });
    }
    //页面加载之前，请求服务器端的数据
    componentWillMount()  {
        console.log(this.state.data);

        let _this=this;

        var data2={
            action:"queryTaskOfManager",
            name:this.props.location.query.name,
            approverRole:this.props.location.query.role,

        };
        console.log(data2);
        Common.getData(JSON.stringify(data2),function(ret) {
            console.log(ret);
            console.log("渲染界面")
            _this.setState({data:ret.msg})

        });
    }
    //点击“我也要请假”之后调用的函数，实现页面跳转
    ApplyToo(){
        const w=window.open('about:blank');
        w.location.href='#/apply?name='+this.state.name+'&role='+this.state.role;
    }
    //当点击不批时调用的函数，传被选中的行的参数给服务器端，成功后自动刷新页面
    showModal = (record) => {
        let _this=this;
        var iddata=[];
        var departmentdata=[];
        var isAllowdata=[];
        var namedata=[];
        var approverAccountdata=[];

        for(let i=0;i<_this.state.rowdata[0].length;i++){
            record=_this.state.rowdata[0];
            console.log(record);
            iddata.push(record[i].id);
            departmentdata.push(record[i].department);
            isAllowdata.push(-1)


        }
        var delay = function(){
            var nodata={
                action:'taskProcess',
                id:iddata,
                isAllowed:isAllowdata,
                department:departmentdata,
                name:this.props.location.query.name,
                approverRole:this.props.location.query.role,
                approvalRemark:[_this.state.otherinfo],


            };
            if(_this.state.ok==1){
               // console.log(_this.state.otherinfo);
                console.log(nodata);
                Common.examine(JSON.stringify(nodata),function (ret) {
                    if(ret=='success'){
                        alert("不批准的备注已经发送")
                        window.location.reload();
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
    //点击不批按钮，弹出Model后按确认后调用的方法
    handleOk = (e) => {
        console.log(e);
        this.setState({
            visible: false,
            ok:1

        });
    }
    //点击不批按钮，弹出Model后按取消后调用的方法
    handleCancel = (e) => {
        console.log(e);
        this.setState({
            visible: false,
        });
    }
    //点击不批按钮，弹出Model后，文本框输入内容后调用的方法
    handleChange5(otherinfo) {
        this.setState({otherinfo:otherinfo});
    }
    //点击批准按钮后调用，传被选中的行的参数给服务器端
    Select(record){

        let _this=this;
        var iddata=[];
        var departmentdata=[];
        var isAllowdata=[];
        var namedata=[];
        var approverAccountdata=[];
        var approvalRemarkdata=[];
        for(let i=0;i<_this.state.rowdata[0].length;i++){
            record=_this.state.rowdata[0];
            console.log(record);

            iddata.push(record[i].id);
            departmentdata.push(record[i].department);
            isAllowdata.push(1)
            approvalRemarkdata.push(null);
        }
        var yesdata={
            action:'taskProcess',
            id:iddata,
            isAllowed:isAllowdata,
            department:departmentdata,
            name:this.props.location.query.name,
            approverRole:this.props.location.query.role,
            approvalRemark:approvalRemarkdata,

        };
        console.log(yesdata)
        Common.examine(JSON.stringify(yesdata),function (ret) {
            if(ret=='success'){
                alert("已批准");
                window.location.reload();
            }else{
                alert("发生未知的错误");
            }
        });
    }

    render(){
        //表格组件的行选择器，用于获取被选中行的数据
        const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
                console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
                this.state.rowdata.push(selectedRows);
                console.log(this.state.rowdata);
            },
        };

        //用于表格排序功能
        let { sortedInfo, filteredInfo } = this.state;
        sortedInfo = sortedInfo || {};
        filteredInfo = filteredInfo || {};

        //定义表格每列的列头，以及每列加载的数据
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
                    <Col span={4}>
                        <Button type="primary" onClick={this.ApplyToo.bind(this)}>我也要请假</Button>
                    </Col>
                    <Col span={4}>
                        <Button type="primary" onClick={this.Select.bind(this)}>批准</Button>
                    </Col>
                    <Col span={4}>
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

