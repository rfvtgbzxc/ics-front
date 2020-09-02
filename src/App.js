import React, {useState} from 'react';
import { Layout, Typography, Row, Col, Form, Input, Button } from "antd";
import 'antd/dist/antd.css';
import XWDatePicker from "./Components/XWDatePicker";
import axios from "axios";
const { Title } = Typography;
const { Content } = Layout;
const ajax_url = "http://hbat.online:7001/ICS/get";
const return_url = "http://hbat.online:7001/ICS/api/{@0}.ics";
function App() {
  const [form] = Form.useForm();
  const [downloadUrl, set_downloadUrl] = useState(null);
  const [requestState, set_requestState] = useState("beforeRequest");
  const buttonLoading = requestState === "onRequesting";
  console.log(form);
  const getICSUrl = ()=> {
    set_requestState("onRequesting");
    axios.post(ajax_url,{data:form.getFieldsValue()})
      .then((res)=> {
        set_downloadUrl(return_url.replace(/{@0}/,res.data));
        set_requestState("requestSuccess");
      })
      .catch(()=>set_requestState("requestFailed"));
  };
  return (
    <Layout>
      <Content>
        <Row>
          <Col span={2}/>
          <Col span={20}>
            <div style={styles.box}>
              <Title>重大课程表下载</Title>
              <Form form={form} initialValues={init_data} style={{width:"400px"}}>
                <Form.Item name="dates" label="上课第一天日期">
                  <XWDatePicker/>
                </Form.Item>
                <Form.Item name="username" label="学号">
                  <Input/>
                </Form.Item>
                <Form.Item name="password" label="密码">
                  <Input/>
                </Form.Item>
                <Button loading={buttonLoading} onClick={getICSUrl} disabled={buttonLoading}>查询课程表</Button>
              </Form>
              {
                requestState === "requestSuccess" ? <a href={downloadUrl}>查询完成，点击下载课程表</a> : null
              }
              {
                requestState === "requestFailed" ? <div>查询失败，请稍后重试！</div> : null
              }
            </div>
          </Col>
          <Col span={2}/>
        </Row>
      </Content>

    </Layout>
  );
}

const styles={
  box:{
    padding:"20px",
    margin:"20px",
    background:"white",
    borderRadius:"5px",
  }
};
const init_data = {
  dates:[2020,8,31]
};
export default App;
