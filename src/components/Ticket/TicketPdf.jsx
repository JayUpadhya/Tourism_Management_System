import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";


// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#ffffff",
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
    marginVertical: 50,
    marginHorizontal: 50,
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
    fontWeight: "bold",
    color: "#333", // Darker color for better readability
  },
  text: {
    fontSize: 14,
    marginBottom: 5,
    color: "#666", // Slightly darker color for better readability
  },
  successText: {
    fontSize: 16, // Adjust the font size as needed
    marginBottom: 10,
    fontWeight: "bold",
    color: "#008000", // Green color for success text
  },
});

const TicketPdf = ({ ticket }) => (
  <Document>
    <Page size="A4" style={styles.page}>
    
      <View style={styles.section}>
        <Text style={styles.title}>Inquiry  Details</Text>
        <Text style={styles.text}>Name: {ticket.name}</Text>
        <Text style={styles.text}>Email: {ticket.email}</Text>
        <Text style={styles.text}>Issue Type: {ticket.issueType}</Text>
        <Text style={styles.text}>Issue: {ticket.issue}</Text>
        
        {/* Adjusted styles for success text */}
        <Text style={styles.successText}>Inquiry solved Successfully</Text>
        <Text style={styles.text}>Date Created: 14/05/2024</Text>
      </View>
      {/* You can add images or other elements as needed */}
    </Page>
  </Document>
);

export default TicketPdf;
