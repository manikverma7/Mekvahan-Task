import React from "react";
import { Card, Button } from "antd";
import "./address.css";

function Address(props) {
  function handleClick() {
    props.onDelete(props.id);
  }
  return (
    <div>
      <Card title={props.place} className="card-address">
        <p>{props.content}</p>
        <Button type="primary" danger className="btn btn-red">
          Edit
        </Button>
        <Button type="primary" onClick={handleClick} className="btn btn-delete">
          Delete
        </Button>
      </Card>
    </div>
  );
}

export default Address;
