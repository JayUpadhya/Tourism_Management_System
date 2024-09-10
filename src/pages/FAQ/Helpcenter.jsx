import React, { useState } from "react";
import Accordion from "./Accordion";
import ticketImage from "../../images/Ticket/ticket.jpg";
import { useNavigate } from "react-router-dom"; // import the useNavigate hook
import NavigationBar from "../../components/NavigationBar3";

const Data = [
  {
    id: 1,
    question: "01.What payment methods do you accept?",
    answer:
      "We accept all major credit and debit cards, as well as PayPal and bank transfers for payment.",
  },
  {
    id: 2,
    question: "02.Is my payment information secure?",
    answer:
      "Yes, we use industry-standard encryption and security protocols to ensure that your payment information is fully protected.",
  },
  {
    id: 3,
    question: "03.When will my credit card be charged?",
    answer:
      "Your credit card will be charged immediately upon completing your booking, unless otherwise stated during the booking process.",
  },
  {
    id: 4,
    question: "04.What types of vehicles do you offer for rental?",
    answer:
      "We offer a wide range of vehicles, including motorcycles, bikes, cars, SUVs, vans, and even luxury vehicles, to suit your transportation needs.",
  },
  {
    id: 5,
    question: "05.Are there any age restrictions for renting a vehicle?",
    answer:
      "Yes, drivers must typically be at least 21 years old, and additional fees or restrictions may apply for drivers under 25.",
  },
  {
    id: 6,
    question:
      "06.Can I pick up and drop off the rental vehicle at different locations?",
    answer:
      "In most cases, yes, but this may be subject to availability and additional fees.",
  },
  {
    id: 7,
    question: "07.What is included in your travel packages?",
    answer:
      "Our travel packages typically include accommodations, transportation, activities, and sometimes meals, depending on the package you select.",
  },
  {
    id: 8,
    question: "08.Can I customize a package to fit my specific preferences?",
    answer:
      "Yes, many of our packages can be customized to meet your needs. Simply contact us to discuss your requirements.",
  },
  {
    id: 9,
    question:
      "09.Are there any group discounts available for package bookings?",
    answer:
      "Yes, we offer discounts for group bookings. Please contact us for more information.",
  },
  {
    id: 10,
    question:
      "10.Can you provide recommendations for things to do and see in a particular destination?",
    answer:
      "Absolutely! Our destination experts can provide personalized recommendations based on your interests and preferences.",
  },
  {
    id: 11,
    question:
      "11.Do you offer guided tours in addition to booking accommodations?",
    answer: "Yes, You can get your guided tour from our vehicle driver.",
  },
  {
    id: 12,
    question:
      "12.How can I get assistance if I encounter issues during my stay in a destination?",
    answer:
      "You can reach our customer support team 24/7 for assistance with any issues or emergencies during your stay.",
  },
];

const HelpCenter = () => {
  const [text, setText] = useState(false);
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState(Data); // Initialize with all data

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    const filtered = Data.filter((item) =>
      item.question.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredData(filtered);
  };
  const display = () => {
    setText(!text);
  };

  return (
    <div
      className="p-4"
      style={{
        backgroundImage: `url(${ticketImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
      }}
    >
      <div
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          padding: "2rem",
          borderRadius: "1rem",
        }}
      >
        <>
          <div className="navBar">
            <NavigationBar />
          </div>
          <h1 style={{ color: "blue" }}>Welcome to the Help Center</h1>
          <h2>We Are Await For You.....</h2>
          <h2>You can Search Your Common Solutions From Here..</h2>

          <div
            className="search-bar"
            style={{
              backgroundColor: "black",
              padding: "5px",
              borderRadius: "5px",
              marginBottom: "10px",
              marginLeft: "400px",
              width: "50%",
            }}
          >
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={handleSearch}
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "10px",
                border: "none",
                outline: "none",
                "::placeholder": { color: "red" },
              }}
            />
          </div>

          <div className="container1">
            <div className="accordionBlock">
              {filteredData.map((val) => {
                return (
                  <Accordion
                    key={val.id}
                    question={val.question}
                    answer={val.answer}
                  />
                );
              })}
              {filteredData.length === 0 && <p>No results found.</p>}
            </div>
          </div>
          <div className="container1">
            <div className="accordionBlock">
              {Data.map((val) => {
                return (
                  <Accordion
                    key={val.id}
                    question={val.question}
                    answer={val.answer}
                  />
                );
              })}
              <h3>Still need help?</h3>
              <h3>Please send us to email regarding your issue </h3>
            </div>
          </div>

          <div style={{ textAlign: "center", margin: "20px 0" }}>
            <button
              style={{ color: "red", fontSize: "20px" }}
              onClick={() => navigate("/email")}
            >
              Click Here
            </button>{" "}
            {/* Add this button to navigate to the Contact page */}
          </div>

          <div style={{ textAlign: "center", margin: "20px 0" }}></div>
        </>
      </div>
    </div>
  );
};

export default HelpCenter;
