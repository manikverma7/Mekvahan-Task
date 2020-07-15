import React, { useState } from "react";
import { Modal, Button, Input } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import "./popup.css";

function Popup(props) {
  const [address, setAddress] = useState({
    place: "",
    content: "",
  });
  function handleChange(event) {
    const { name, value } = event.target;
    console.log(event.target.value);

    setAddress((prevNote) => {
      return {
        ...prevNote,
        [name]: value,
      };
    });
  }

  const submitAddress = () => {
    props.onAdd(address);
    setAddress({
      place: "",
      content: "",
    });
    setState({ loading: true });
    setTimeout(() => {
      setState({ loading: false, visible: false });
    }, 3000);
  };

  const [state, setState] = useState({
    loading: false,
    visible: false,
  });

  const { TextArea } = Input;

  const showModal = () => {
    setState({
      visible: true,
    });
  };

  const handleCancel = () => {
    setState({ visible: false });
  };

  const { visible, loading } = state;

  return (
    <div>
      <Button type="text" onClick={showModal} className="btn-addAddress">
        <PlusOutlined />
        Add Address
      </Button>
      <Modal
        visible={visible}
        title="Provide Your Location"
        onOk={submitAddress}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Return
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={loading}
            onClick={submitAddress}
            className=" btn-red"
          >
            Submit
          </Button>,
        ]}
      >
        <TextArea
          placeholder="Enter Place Here-Home/PG/Hostel/Other"
          autoSize={{ minRows: 1, maxRows: 2 }}
          name="place"
          onChange={handleChange}
          value={address.place}
        />

        <div style={{ margin: "1rem 0" }} />
        <TextArea
          placeholder="Enter Your Full Address Here.."
          autoSize={{ minRows: 2, maxRows: 6 }}
          name="content"
          onChange={handleChange}
          value={address.content}
        />
      </Modal>
    </div>
  );
}

export default Popup;
