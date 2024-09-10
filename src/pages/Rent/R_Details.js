import React, { Component } from "react";
import axios from "axios";

export default class R_Details extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: {},
    };
  }

  componentDidMount() {
   
    const id = this.props.match.params.id;

    axios.get(`http://localhost:3001/post/${id}`).then((res) => {
      if (res.data.success) {
        this.setState({
          post: res.data.post,
        });
        console.log(this.state.post);
      }
    });
  }

    render() {
        const { vehicleType, vehicle, driver, rentalDate, location, customerName, passportOrId, address, phone } = this.state.post;
    return (
      <div>
        <h1>R_Detail</h1>
        <p>Vehicle Type: {vehicleType}</p>
        <p>Vehicle: {vehicle}</p>
        <p>Driver: {driver}</p>
        <p>Rental Date: {rentalDate}</p>
        <p>Location: {location}</p>
        <p>Customer Name: {customerName}</p>
        <p>Passport or ID: {passportOrId}</p>
        <p>Address: {address}</p>
        <p>Phone: {phone}</p>
      </div>
    );
  }
}
