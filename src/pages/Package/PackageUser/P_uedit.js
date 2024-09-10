import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Form,
  Input,
  Select,
  Checkbox,
  Button,
  Row,
  Col,
  DatePicker,
} from "antd";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import "../../../styles/Package/P_uedit.css";
import PUSidebar from "../../../components/Package/PUSidebar";
import NavigationBar from "../../../components/NavigationBar3";

const { Option } = Select;

export default function P_uedit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState(null);
  const [districtsForProvince, setDistrictsForProvince] = useState([]);
  const [placesAndActivities, setPlacesAndActivities] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);

  // Function to calculate the total price based on the selected options
  const calculateFullPrice = (changedValues, allValues) => {
    const { district, duration, vehicle, meals, accommodation } = allValues;

    // Define prices for each parameter

    const districtPrice = {
      Colombo: 2500,
      Gampaha: 2400,
      Kalutara: 2300,
      Kandy: 4000,
      Matale: 2000,
      NuwaraEliya: 5000,
      Galle: 10000,
      Matara: 7500,
      Hambantota: 6000,
      Jaffna: 5000,
      Kilinochchi: 4000,
      Mannar: 2000,
      Vavuniya: 3000,
      Mullaitivu: 3000,
      Batticaloa: 7000,
      Ampara: 6000,
      Trincomalee: 9500,
      Kurunegala: 6000,
      Puttalam: 5000,
      Anuradhapura: 5000,
      Polonnaruwa: 6000,
      Badulla: 10000,
      Monaragala: 4000,
      Ratnapura: 6000,
      Kegalle: 5000,
      // Define prices for other districts if needed
    };

    const placesPrice = {
      Colombo: 10000,
      Gampaha: 600,
      Kalutara: 5000,
      Kandy: 1000,
      Matale: 8000,
      NuwaraEliya: 20000,
      Galle: 15000,
      Matara: 14000,
      Hambantota: 8000,
      Jaffna: 7000,
      Kilinochchi: 6500,
      Mannar: 6000,
      Vavuniya: 5500,
      Mullaitivu: 5000,
      Batticaloa: 9500,
      Ampara: 9000,
      Trincomalee: 12000,
      Kurunegala: 1250,
      Puttalam: 1200,
      Anuradhapura: 1150,
      Polonnaruwa: 1100,
      Badulla: 20000,
      Monaragala: 20000,
      Ratnapura: 1300,
      Kegalle: 1250,
      // Define prices for places in other districts if needed
    };

    const activitiesPrice = {
      Colombo: 17000,
      Gampaha: 16000,
      Kalutara: 15000,
      Kandy: 14000,
      Matale: 13000,
      NuwaraEliya: 12000,
      Galle: 11000,
      Matara: 10000,
      Hambantota: 90000,
      Jaffna: 8000,
      Kilinochchi: 75000,
      Mannar: 7000,
      Vavuniya: 6500,
      Mullaitivu: 6000,
      Batticaloa: 10500,
      Ampara: 10000,
      Trincomalee: 9500,
      Kurunegala: 1400,
      Puttalam: 13500,
      Anuradhapura: 13000,
      Polonnaruwa: 12500,
      Badulla: 22000,
      Monaragala: 11500,
      Ratnapura: 15000,
      Kegalle: 14500,
      // Define prices for activities in other districts if needed
    };

    const vehiclePrice = {
      Car: 5000, // Sample price for a car
      Van: 10000,
      Bike: 3000,
      Bicycle: 100,
      "Luxury Bus": 20000,
    };

    const mealsPrice = {
      Breakfast: 600,
      Lunch: 1500,
      Tea: 500,
      Dinner: 2000,
    };

    const accommodationPrice = {
      "5 Star Hotel": 100000,
      "3 Star Hotel": 50000,
      Annexe: 30000,
      // Define prices for other types of accommodations if needed
    };

    // Calculate price for each parameter
    const districtPriceTotal = districtPrice[district] || 0;
    const placesPriceTotal = placesPrice[district] || 0; // Include price for places in Galle district
    const activitiesPriceTotal = activitiesPrice[district] || 0; // Include price for activities in Galle district
    const vehiclePriceTotal = vehiclePrice[vehicle] || 0;
    const mealsPriceTotal = (meals || []).reduce(
      (total, meal) => total + (mealsPrice[meal] || 0),
      0
    );
    const accommodationPriceTotal = accommodationPrice[accommodation] || 0;
    const durationPriceTotal = calculateDurationPrice(duration);

    // Calculate total price
    const totalPrice =
      districtPriceTotal +
      placesPriceTotal +
      activitiesPriceTotal +
      vehiclePriceTotal +
      mealsPriceTotal +
      accommodationPriceTotal +
      durationPriceTotal;

    // Update the state with the calculated total price
    setTotalPrice(totalPrice);

    // Autofill the Price field in the form
    form.setFieldsValue({ price: `Rs ${totalPrice} ` });
  };

  const calculateDurationPrice = (duration) => {
    if (!duration || !duration.start || !duration.end) {
      return 0; // Return 0 if duration is not selected
    }

    const startDate = new Date(duration.start);
    const endDate = new Date(duration.end);
    const durationInDays = Math.ceil(
      (endDate - startDate) / (1000 * 60 * 60 * 24)
    ); // Convert duration to days
    return durationInDays * 500; // Assuming price per day is 50
  };

  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/user/${id}`)
      .then((res) => {
        const packageData = res.data.package;
        setValues({
          province: packageData.province,
          district: packageData.district,
          duration: [
            moment(packageData.duration.start),
            moment(packageData.duration.end),
          ],
          noOfPerson: packageData.noOfPerson,
          vehicle: packageData.vehicle,
          places: packageData.places,
          meals: packageData.meals,
          activities: packageData.activities,
          accommodation: packageData.accommodation,
          price: packageData.price,
        });
      })
      .catch((err) => console.log(err));
  }, [id]);

  const onFinish = async (values) => {
    try {
      setLoading(true);
      await axios.put(`http://localhost:3001/api/package/update/${id}`, values);
      alert("Package updated successfully!");
      navigate("/udashboard");
    } catch (error) {
      console.error("Update failed:", error);
      alert("Failed to update package. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (event) => {
    const keyCode = event.keyCode || event.which;
    if (
      (keyCode >= 48 && keyCode <= 57) ||
      (keyCode >= 186 && keyCode <= 222)
    ) {
      event.preventDefault();
      alert("Numbers and special characters are not allowed in this field.");
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

  const handleProvinceChange = (value) => {
    setDistrictsForProvince(districts[value]);
    form.setFieldsValue({ district: undefined });
  };

  const handleVehicleChange = (value) => {
    const selectedVehicle = vehicles.find((vehicle) => vehicle.type === value);
    if (selectedVehicle) {
      form.setFieldsValue({ noOfPerson: selectedVehicle.seats });
    }
  };

  const disabledDate = (current) => {
    const today = moment().startOf("day");
    if (current < today) return true;

    const startDate = form.getFieldValue(["duration", "start"]);
    if (startDate && current.isSame(startDate, "day")) return true;

    return false;
  };

  const validateDuration = (_, value) => {
    if (value && value.length === 2) {
      const [startDate, endDate] = value;
      if (endDate.diff(startDate, "days") < 2) {
        return Promise.reject("Package duration must be at least 2 days");
      }
      if (endDate.isSame(startDate, "day")) {
        return Promise.reject("End date cannot be the same as start date");
      }
    }
    return Promise.resolve();
  };

  const handleDistrictChange = (value) => {
    const placesAndActivitiesForDistrict = {
      Colombo: {
        places: "Galle Face Green, Gangaramaya Temple, Viharamahadevi Park",
        activities: "Shopping, Sightseeing, Nightlife",
      },
      Gampaha: {
        places: "Negombo Beach, Muthurajawela Wetland, Attidiya Bird Sanctuary",
        activities: "Bird Watching, Boat Safari, Cycling",
      },
      Kalutara: {
        places: "Kalutara Bodhiya, Richmond Castle, Kalutara Beach",
        activities: "Religious Visits, Historical Tours, Beach Activities",
      },
      Kandy: {
        places: "Temple of the Tooth, Kandy Lake, Royal Botanic Gardens",
        activities: "Temple Visits, Cultural Shows, Nature Walks",
      },
      Matale: {
        places: "Sigiriya, Dambulla Cave Temple, Aluvihare Rock Temple",
        activities: "Hiking, Rock Climbing, Cultural Tours",
      },
      "Nuwara Eliya": {
        places: "Horton Plains National Park, Gregory Lake, Pedro Tea Estate",
        activities: "Hiking, Boating, Tea Factory Tours",
      },
      Galle: {
        places: "Galle Fort, Hikkaduwa, Thalpe",
        activities: "Kayaking, Boat Riding, Diving",
      },
      Matara: {
        places: "Polhena Beach, Mirissa Beach, Matara Paravi Duwa Temple",
        activities: "Beach Activities, Snorkeling, Temple Visits",
      },
      Hambantota: {
        places: "Yala National Park, Bundala National Park, Kataragama Temple",
        activities: "Safari Tours, Bird Watching, Religious Visits",
      },
      Jaffna: {
        places: "Nallur Kovil, Jaffna Fort, Casuarina Beach",
        activities: "Temple Visits, Historical Tours, Beach Relaxation",
      },
      Kilinochchi: {
        places:
          "Kilinochchi War Memorial, Iranamadu Tank, Kanakambikai Amman Temple",
        activities: "War Memorial Visits, Tank Excursions, Temple Tours",
      },
      Mannar: {
        places: "Mannar Fort, Doric House, Adam's Bridge",
        activities: "Fort Visits, Cultural Tours, Bridge Sightseeing",
      },
      Mullaitivu: {
        places: "Mullaitivu Beach, Mullaitivu Lighthouse, Madhu Church",
        activities: "Beach Relaxation, Lighthouse Tours, Church Visits",
      },
      Vavuniya: {
        places:
          "Kandakadu Bird Sanctuary, Rambaikulam Forest Reserve, Vavuniya War Cemetery",
        activities: "Bird Watching, Nature Walks, Cemetery Visits",
      },
      Trincomalee: {
        places: "Nilaveli Beach, Pigeon Island, Koneswaram Temple",
        activities: "Beach Activities, Snorkeling, Temple Visits",
      },
      Batticaloa: {
        places: "Pasikudah Beach, Kallady Bridge, Batticaloa Fort",
        activities: "Beach Relaxation, Bridge Sightseeing, Fort Visits",
      },
      Ampara: {
        places: "Arugam Bay, Lahugala National Park, Magul Maha Viharaya",
        activities: "Surfing, Safari Tours, Temple Visits",
      },
      Puttalam: {
        places:
          "Wilpattu National Park, Dutch Fort, Anawilundawa Bird Sanctuary",
        activities: "Safari Tours, Fort Visits, Bird Watching",
      },
      Kurunegala: {
        places: "Ethugalpura, Ridi Viharaya, Ibbagamuwa Central College Ground",
        activities: "Historical Tours, Temple Visits, Leisure Activities",
      },
      Polonnaruwa: {
        places:
          "Polonnaruwa Ancient City, Minneriya National Park, Parakrama Samudra",
        activities: "Historical Tours, Safari Tours, Boat Rides",
      },
      Anuradhapura: {
        places: "Anuradhapura Ancient City, Mihintale, Isurumuniya Temple",
        activities: "Historical Tours, Pilgrimage Visits, Nature Walks",
      },
      Badulla: {
        places: "Ella, Dunhinda Falls, Ravana Ella Cave",
        activities: "Scenic Train Rides, Waterfall Visits, Cave Explorations",
      },
      Monaragala: {
        places: "Yala National Park, Buduruwagala, Maligawila Buddha Statue",
        activities: "Safari Tours, Temple Visits, Statue Sightseeing",
      },
      Ratnapura: {
        places: "Adams Peak, Sinharaja Forest Reserve, Katugas Ella",
        activities: "Hiking, Rainforest Tours, Waterfall Visits",
      },
      Kegalle: {
        places:
          "Pinnawala Elephant Orphanage, Rambukkana Buddha Statue, Mawanella",
        activities: "Elephant Interaction, Temple Visits, Leisure Activities",
      },
    };
    const districtInfo = placesAndActivitiesForDistrict[value];
    if (districtInfo) {
      setPlacesAndActivities(districtInfo);
      form.setFieldsValue({
        places: districtInfo.places,
        activities: districtInfo.activities,
      });
    }
  };

  return (
    <div>
      <div className="navBar">
        <NavigationBar />
      </div>
      <PUSidebar />
      <div className="cus-form2">
        <h2 className="pc-tittle"> Update</h2>
        <Form
          form={form}
          onFinish={onFinish}
          layout="vertical"
          onValuesChange={calculateFullPrice}
          initialValues={values}
        >
          <Row gutter={[26, 26]}>
            <Col span={8}>
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
                rules={[{ required: true, message: "Please select District" }]}
              >
                <Select
                  placeholder="Select District"
                  onChange={handleDistrictChange}
                >
                  {districtsForProvince.map((district) => (
                    <Option key={district} value={district}>
                      {district}
                    </Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                label="Places"
                name="places"
                rules={[
                  { required: true, message: "Please enter Places" },
                  {
                    pattern: /^[a-zA-Z\s,]*$/,
                    message: "Only letters, spaces, and commas are allowed",
                  },
                ]}
              >
                <Input placeholder="Places" onKeyDown={handleKeyDown} />
              </Form.Item>
              <Form.Item
                label="Duration"
                name="duration"
                rules={[
                  { required: true, message: "Please select Duration" },
                  { validator: validateDuration },
                ]}
              >
                <Row gutter={[8, 0]}>
                  <Col span={12}>
                    <Form.Item name={["duration", "start"]} noStyle>
                      <DatePicker
                        placeholder="Start Date"
                        disabledDate={disabledDate}
                        style={{ width: "100%" }}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item name={["duration", "end"]} noStyle>
                      <DatePicker
                        placeholder="End Date"
                        disabledDate={disabledDate}
                        style={{ width: "100%" }}
                      />
                    </Form.Item>
                  </Col>
                </Row>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Select Vehicle"
                name="vehicle"
                rules={[{ required: true, message: "Please select Vehicle" }]}
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
                <Input type="number" min={1} readOnly />
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
                  { required: true, message: "Please enter Activities" },
                  {
                    pattern: /^[a-zA-Z\s,]*$/,
                    message: "Only letters, spaces, and commas are allowed",
                  },
                ]}
              >
                <Input placeholder="Activities" onKeyDown={handleKeyDown} />
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
                rules={[{ required: true, message: "Please enter Price" }]}
              >
                <Input
                  placeholder="Price"
                  value={`${totalPrice} Rs`}
                  readOnly
                />
              </Form.Item>
            </Col>
          </Row>
          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              style={{ backgroundColor: "gray", color: "white" }}
            >
              Customize Package
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}
