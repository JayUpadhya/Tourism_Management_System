import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import salaryImage from "../../images/Salary/logo.jpg"; // Import the image

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#ffffff", // Background color for the entire page
    padding: 20, // Added padding for better spacing
    justifyContent: "center", // Center align horizontally
    alignItems: "center", // Center align vertically
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
    textAlign: "center", // Center align text inside the section
  },
  image: {
    marginVertical: 10, // Adjusted margin for the image
    width: 100, // Adjusted width for the image
    height: 100, // Adjusted height for the image
    marginTop:-350,
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
    fontWeight: "bold",
    color: "#333", // Darker color for better readability
  },
  text: {
    fontSize: 14,
    marginBottom: 5,
    color: "#666", // Slightly darker color for better readability
  },
  dottText: {
    borderBottomWidth: 1,
    borderBottomColor: "black",
    
   
    marginBottom: 100,
  },
  signatureText: {
    fontSize: 14,
    color: "#666",
    marginBottom: 200, // Adjust this value to control spacing between text and line
  },
});



const InvoicePdf = ({ order }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Image src={salaryImage} style={styles.image} /> /* Add the image */
      <View style={styles.section}>
        <Text style={styles.title}>Invoice</Text>
        <Text style={styles.text}>Order ID: {order.o_id}</Text>
        <Text style={styles.text}>Select Package: {order.packagename}</Text>
        <Text style={styles.text}>Customer name: {order.customername}</Text>
        <Text style={styles.text}>Phone: {order.phone}</Text>
        <Text style={styles.text}>Email: {order.email}</Text>
        <Text style={styles.text}>Billing Address: {order.billingaddress}</Text>

        <Text style={styles.text}>Date Created: 2024 / 05 / 14 {order.billingaddress}</Text>
        <Text style={styles.dotText}>.................</Text> 
        <Text style={styles.signatureText}>Signature</Text> {/* Add this line */}
      </View>
      {/* You can add images or other elements as needed */}
    </Page>
  </Document>
);

export default InvoicePdf;
