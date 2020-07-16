import React, { useState } from "react";
import { Modal, Button, Input } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import "./popup.css";

function Popup(props) {
  //State for setting the address on user input
  const [address, setAddress] = useState({
    place: "",
    content: "",
  });

  //Function runs whenever the inputs anything in the Address Popup Box
  function handleChange(event) {
    const { name, value } = event.target;
    console.log(event.target.value);

    setAddress((prevAddress) => {
      return {
        ...prevAddress, ///Spread operator for finding the Previous Addresses and keeping them in the array
        [name]: value,
      };
    });
  }

  //Function Runs when the user click on submit button in the Address Popup
  const submitAddress = () => {
    props.onAdd(address);
    setAddress({
      //This sets the address popup box to empty again.
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
    ///Function responsible for opening the address popup
    setState({
      visible: true,
    });
  };

  const handleCancel = () => {
    ///Function responsible for closing the address popup
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
