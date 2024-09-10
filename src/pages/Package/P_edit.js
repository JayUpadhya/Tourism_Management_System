import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Form, Input, Select, Checkbox, Button, Row, Col } from 'antd';
import '../../styles/Package/P_edit.css';
import PSidebar from "../../components/Package/PSidebar";

const { Option } = Select;

const P_edit = () => {
  const { id } = useParams();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState(null);
  const [districtsForProvince, setDistrictsForProvince] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState(null);


  const provinces = [
    'Western Province',
    'Central Province',
    'Southern Province',
    'Northern Province',
    'Eastern Province',
    'North Western Province',
    'North Central Province',
    'Uva Province',
    'Sabaragamuwa Province',
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
    { type: 'Car', seats: 4 },
    { type: 'Van', seats: 10 },
    { type: 'Bike', seats: 2 },
    { type: 'Bicycle', seats: 1 },
    { type: 'Luxury Bus', seats: 25 },
  ];

  const accommodations = ['3 Star Hotel', '5 Star Hotel', 'Annexe'];
  const mealOptions = ['Breakfast', 'Lunch', 'Tea', 'Dinner'];

  useEffect(() => {
    axios.get(`http://localhost:3001/api/package/${id}`)
      .then(res => {
        const packageData = res.data.package;
        setValues({
          pID: packageData.pID,
          province: packageData.province,
          district: packageData.district,
          packageName: packageData.packageName,
          vehicle: packageData.vehicle,
          noOfPerson: packageData.noOfPerson,
          places: packageData.places,
          meals: packageData.meals,
          activities: packageData.activities,
          accommodation: packageData.accommodation,
          price: packageData.price,
        });
      })
      .catch(err => console.log(err));
  }, [id]);

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



  const onFinish = async (values) => {
    try {
      setLoading(true);
      await axios.put(`http://localhost:3001/api/package/update/${id}`, values);
      alert('Package updated successfully!');
    } catch (error) {
      console.error('Update failed:', error);
      alert('Failed to update package. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (event, fieldName) => {
    const charCode = event.which ? event.which : event.keyCode;
    const value = event.key;
    if (
      (charCode >= 65 && charCode <= 90) || // A-Z
      (charCode >= 97 && charCode <= 122) || // a-z
      (charCode >= 48 && charCode <= 57) || // 0-9
      charCode === 8 || // Backspace
      charCode === 32 || // Space
      charCode === 9 || // Tab
      (charCode >= 37 && charCode <= 40) || // Arrow keys
      charCode === 46 || // Delete
      (value === value.toUpperCase() && value !== value.toLowerCase())
    ) {
      return true;
    } else {
      event.preventDefault();
      alert(`Please enter only alphanumeric characters for ${fieldName}`);
      return false;
    }
  };

  const handleAlphaKeyPress = (event, fieldName) => {
    const charCode = event.which ? event.which : event.keyCode;
    if (
      (charCode >= 65 && charCode <= 90) || // A-Z
      (charCode >= 97 && charCode <= 122) || // a-z
      charCode === 8 || // Backspace
      charCode === 32 || // Space
      charCode === 9 || // Tab
      (charCode >= 37 && charCode <= 40) || // Arrow keys
      charCode === 46
    ) {
      return true;
    } else {
      event.preventDefault();
      alert(`Please enter only letters for ${fieldName}`);
      return false;
    }
  };

  return (
    <div>
      <PSidebar />
      <h2 className='u-tittle'>Update Package</h2>
      <div className="update-form">
        {values ? (
          <Form
            form={form}
            onFinish={onFinish}
            layout="vertical"
            initialValues={values}
          >
            <Row gutter={[26, 26]}>
              <Col span={8}>
                <Form.Item
                  label="Package ID"
                  name="pID"
                  rules={[{ required: true, message: 'Please enter Package ID' }]}
                >
                  <Input readOnly />
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
                  rules={[{ required: true, message: 'Please enter Package Name' }]}
                >
                  <Input
                onKeyPress={(e) => handleKeyPress(e, "Package Name")} />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  label="Select Vehicle"
                  name="vehicle"
                  rules={[{ required: true, message: 'Please select Vehicle' }]}
                >
                  <Select placeholder="Select Vehicle" onChange={handleVehicleChange}>
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
                  rules={[{ required: true, message: 'Please enter Number of Persons' }]}
                >
                  <Input type="number" min={1} />
                </Form.Item>
                <Form.Item
                  label="Places"
                  name="places"
                  rules={[{ required: true, message: 'Please enter Places' }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Meals"
                  name="meals"
                  rules={[{ required: true, message: 'Please select Meals', type: 'array' }]}
                >
                  <Checkbox.Group options={mealOptions} />
                </Form.Item>
              </Col>
              
              <Col span={8}>
                <Form.Item
                  label="Activities"
                  name="activities"
                  rules={[{ required: true, message: 'Please enter Activities' }]}
                >
                  <Input 
                onKeyPress={(e) => handleAlphaKeyPress(e, "Activities")}
              />
                </Form.Item>
                <Form.Item
                  label="Select Accommodation"
                  name="accommodation"
                  rules={[{ required: true, message: 'Please select Accommodation' }]}
                >
                  <Select placeholder="Select Accommodation">
                    {accommodations.map((accommodationOption, index) => (
                      <Option key={index} value={accommodationOption}>
                        {accommodationOption}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item
                  label="Price"
                  name="price"
                  rules={[{ required: true, message: 'Please enter Price' }]}
                >
                  <Input onKeyPress={(e) => handleKeyPress(e, "Price")}
               />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item>
              <div  style={{ textAlign: "center", marginTop: "20px" }}>
              <Button type="primary" htmlType="submit" loading={loading} style={{backgroundColor:"gray",color:"white"}}>
                Update Package
              </Button>
              </div>
            </Form.Item>
          </Form>
        ) : (
          <p>Loading package data...</p>
        )}
      </div>
    </div>
  );
};

export default P_edit;
