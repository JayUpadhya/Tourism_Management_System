import React, { useState } from "react";
import { Form, Input, Select, Checkbox, Button, Row, Col } from "antd";
import axios from "axios";
import "../../styles/Package/P_create.css";
import PSidebar from "../../components/Package/PSidebar";

const { Option } = Select;

const P_create = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [districtsForProvince, setDistrictsForProvince] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState(null); // Add state to store selected province

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:3001/api/package/save",
        values
      );
      if (response.data.Success) {
        alert("Package created successfully!");
        form.resetFields();
      } else {
        alert("Failed to create package.");
      }
    } catch (error) {
      console.error(error);
      alert(
        "An error occurred while creating the package. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  const provinces = [
    "Western Province",
    "Central Province",
    "Southern Province",
    "Northern Province",
    "Eastern Province",
    "North Western Province",
    "North Central Province",
    "Uva Province",
    "Sabaragamuwa Province",
  ];

  const districts = {
    "Western Province": ["Colombo", "Gampaha", "Kalutara"],
    "Central Province": ["Kandy", "Matale", "Nuwara Eliya"],
    "Southern Province": ["Galle", "Matara", "Hambantota"],
    "Northern Province": [
      "Jaffna",
      "Kilinochchi",
      "Mannar",
      "Mullaitivu",
      "Vavuniya",
    ],
    "Eastern Province": ["Trincomalee", "Batticaloa", "Ampara"],
    "North Western Province": ["Puttalam", "Kurunegala"],
    "North Central Province": ["Polonnaruwa", "Anuradhapura"],
    "Uva Province": ["Badulla", "Monaragala"],
    "Sabaragamuwa Province": ["Ratnapura", "Kegalle"],
  };

  const vehicles = [
    { type: "Car", seats: 4 },
    { type: "Van", seats: 10 },
    { type: "Bike", seats: 2 },
    { type: "Bicycle", seats: 1 },
    { type: "Luxury Bus", seats: 25 },
  ];

  const mealOptions = ["Breakfast", "Lunch", "Tea", "Dinner"];

  const handleVehicleChange = (value) => {
    const selectedVehicle = vehicles.find((vehicle) => vehicle.type === value);
    if (selectedVehicle) {
      form.setFieldsValue({ noOfPerson: selectedVehicle.seats });
    }
  };

  const handleProvinceChange = (value) => {
    setSelectedProvince(value); // Set the selected province
    setDistrictsForProvince(districts[value]);
    form.setFieldsValue({ district: undefined }); // Reset district field when province changes
  };

  const handleKeyDown = (event, fieldType) => {
    // Get the key code of the pressed key
    const keyCode = event.keyCode || event.which;
    
    if (fieldType === 'pID') {
        // Allow numbers (48-57), uppercase and lowercase letters (65-90, 97-122), space (32), and backspace (8)
        if (!((keyCode >= 48 && keyCode <= 57) || 
              (keyCode >= 65 && keyCode <= 90) || // Uppercase letters
              (keyCode >= 97 && keyCode <= 122) || // Lowercase letters
              keyCode === 32 || // space key
              keyCode === 8   // backspace key
            )) {
            // Prevent the default action (typing)
            event.preventDefault();
            // Show an alert message for special characters
            alert("Only numbers, letters, spaces, and backspace are allowed in this field.");
        }
        
        // Check if the shift key is pressed along with numbers
        if (event.shiftKey && keyCode >= 48 && keyCode <= 57) {
            // Show an alert message for shift key + numbers
            alert("Special charactersis not allowed in this field.");
        }
    } else {
        // For the 'Places' and 'Activities' fields, block both numbers and special characters
        if ((keyCode >= 48 && keyCode <= 57) || (keyCode >= 186 && keyCode <= 192) || (keyCode >= 219 && keyCode <= 222)) {
            // Prevent the default action (typing)
            event.preventDefault();
            // Show an alert message
            alert("Numbers and special characters are not allowed in this field.");
        }
    }
};

  return (
    <div>
      <PSidebar />
      <div className="package-form1">
        <h2 className="c-tittle">Create Package</h2>
        <Form
          form={form}
          onFinish={handleSubmit}
          layout="vertical"
          initialValues={{
            pID: "",
            province: "",
            district: "",
            packageName: "",
            vehicle: "",
            meals: [],
            accommodation: "",
            noOfPerson: "",
            places: "",
            activities: "",
            price: "",
          }}
        >
          <Row gutter={[26, 26]}>
            <Col span={8}>
              <Form.Item
                label="Package ID"
                name="pID"
                rules={[
                  { required: true, message: "Please enter Package ID" },
                ]}
              >
                <Input placeholder="Package ID" />
              </Form.Item>
              <Form.Item
                label="Select Province"
                name="province"
                rules={[{ required: true, message: "Please select Province" }]}
              >
                <Select
                  placeholder="Select Province"
                  onChange={handleProvinceChange}
                >
                  {provinces.map((province) => (
                    <Option key={province} value={province}>
                      {province}
                    </Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                label="Select District"
                name="district"
                rules={[
                  { required: true, message: "Please select District" },
                ]}
              >
                <Select placeholder="Select District">
                  {districtsForProvince.map((district) => (
                    <Option key={district} value={district}>
                      {district}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                label="Package Name"
                name="packageName"
                rules={[
                  { required: true, message: "Please add package name" },
                ]}
              >
                <Select placeholder="Package Name">
                  <Option value="2 Days">2 Days Package</Option>
                  <Option value="4 Days">4 Days Package</Option>
                  <Option value="6 Days">6 Days Package</Option>
                  <Option value="8 Days">8 Days Package</Option>
                  <Option value="10 Days">10 Days Package</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Select Vehicle"
                name="vehicle"
                rules={[
                  { required: true, message: "Please select Vehicle" },
                ]}
              >
                <Select
                  placeholder="Select Vehicle"
                  onChange={handleVehicleChange}
                >
                  {vehicles.map((vehicle) => (
                    <Option key={vehicle.type} value={vehicle.type}>
                      {vehicle.type}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                label="Number of Persons"
                name="noOfPerson"
                rules={[
                  {
                    required: true,
                    message: "Please enter Number of Persons",
                  },
                ]}
              >
                <Input type="number" min={1}
                readOnly />
              </Form.Item>
              <Form.Item
                label="Places"
                name="places"
                rules={[
                  {
                    required: true,
                    message: "Please enter Places",
                  },
                  {
                    pattern: /^[a-zA-Z\s]*$/,
                    message: "Only letters and spaces are allowed",
                  },
                ]}
              >
                <Input placeholder="Places" onKeyDown={handleKeyDown}/>
              </Form.Item>
              <Form.Item
                label="Meals"
                name="meals"
                rules={[
                  {
                    required: true,
                    message: "Please select Meals",
                    type: "array",
                  },
                ]}
              >
                <Checkbox.Group options={mealOptions} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Activities"
                name="activities"
                rules={[
                  {
                    required: true,
                    message: "Please enter Activities",
                  },
                  {
                    pattern: /^[a-zA-Z\s]*$/,
                    message: "Only letters and spaces are allowed",
                  },
                ]}
              >
                <Input placeholder="Activities" onKeyDown={handleKeyDown}/>
              </Form.Item>
              <Form.Item
                label="Select Accommodation"
                name="accommodation"
                rules={[
                  { required: true, message: "Please select Accommodation" },
                ]}
              >
                <Select placeholder="Select Accommodation">
                  <Option value="3 Star Hotel">3 Star Hotel</Option>
                  <Option value="5 Star Hotel">5 Star Hotel</Option>
                  <Option value="Annexe">Annexe</Option>
                </Select>
              </Form.Item>
              <Form.Item
                label="Price"
                name="price"
                rules={[
                  { required: true, message: "Please enter Price" },
                ]}
              >
                <Input placeholder="Price"/>
              </Form.Item>
            </Col>
          </Row>
          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <Button type="primary" htmlType="submit" loading={loading} style={{backgroundColor:"gray",color:"white"}}>
              Create Package
            </Button>
          </div>
          <div
            style={{
              textAlign: "left",
              marginTop: "5px",
              marginLeft: "308px",
            }}
          ></div>
        </Form>
      </div>
    </div>
  );
};

export default P_create;
