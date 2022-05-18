import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  FlatList,
} from "react-native";
import axios from "axios";
import { Card } from "react-native-shadow-cards";
import { h, w } from "./utils/constants";
import { Button } from "react-native-elements";

export default function App() {

  //Here the function is activated when the app starts.
  useEffect(() => {
    getUsers();
  }, []);

 //Here we have our variables that are going to be controlling the list refreshing and the information.
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState("");

  //Function that is called when we want to refresh the list with new information.
  const handleRefresh = () => {
    setLoading(true);
    getUsers();
  };

  //This function calls the API to get the information and then saves the information.
  const getUsers = async () => {
    var url =
      "https://my.api.mockaroo.com/users.json?page=1&count=5&key=930279b0";
    await axios
      .get(
        url,
        {
          headers: {
            Accept: "application/json",
            Content_Type: "application/json",
          },
        },
        { timeout: 10000 }
      )
      .then((response) => {
        console.log("Response");
        console.log(response.data);
        setLoading(false);
        setData(response.data.entries);
      })
      .catch((error) => {
        console.log(error);
        console.log(error.response.data)
      });
  };

  //Here we show the list to the users
  return (
    <View style={styles.container}>
      {/* This part show an activity indicator that tell us that something is still loading while the function getUsers still working. */}
      {loading === true && (
        <View>
          <ActivityIndicator
            style={styles.containerIndicator}
            size="large"
            color="#0000ff"
            // position="center"
          />
        </View>
      )}

      <View style={styles.top}>
        <Text style={styles.header}>U S E R S</Text>
      </View>

      <View style={styles.containerMiddle}>
         {/* When getUsers finish we show the information that we got. */}
        {loading === false && (
          <FlatList
            data={data}
            renderItem={({ item, index }) => (
              <View>
                <Card style={styles.card}>
                  <View>
                    <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                      <View style={styles.textSpace}>
                        <Text style={styles.spaceRight}>
                          Email: {item.email}
                        </Text>
                        <Text style={styles.idSpace}>ID: {item.id}</Text>
                      </View>
                    </View>

                    <View>
                      <Text style={styles.description}>
                        {item.name.firstName} {item.name.lastName}
                      </Text>
                      <Text style={styles.roleFont}>{item.role}</Text>
                    </View>
                  </View>
                </Card>
              </View>
            )}
            keyExtractor={(item, index) => String(index)}
          />
        )}
      </View>

 {/* This button is for refreshing the list. */}
      <View style={styles.buttonRefresh}>
        <Button
          buttonStyle={styles.btn}
          onPress={() => handleRefresh()}
          title={"Refresh"}
        />
      </View>
    </View>
  );
}

 {/*Here we control the look of this app. */}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: w,
    height: h,
    backgroundColor: "#e0e0e0",
    // borderStyle: "dotted",
    // borderWidth: 1,
    // borderRadius: 1,
  },

  containerMiddle: {
    width: "93%",
    height: "70%",
    position: "absolute",
    alignSelf: "center",
    top: "15%",
    justifyContent: "center",
    // borderStyle: "dotted",
    // borderWidth: 1,
    // borderRadius: 1,
  },
  containerIndicator: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    backgroundColor: "#e0e0e0",
  },
  top: {
    position: "absolute",
    paddingTop: 15,
    paddingBottom: 15,
    alignSelf: "center",
    justifyContent: "center",
    top: "5%",
    //     borderStyle: "dotted",
    // borderWidth: 1,
    // borderRadius: 1,
  },
  header: {
    alignContent: "center",
    color: "#000a12",
    fontSize: 20,
    borderColor: "#000a12",
    borderWidth: 2,
    paddingLeft: 40,
    paddingRight: 40,
    marginBottom: 10,
    backgroundColor: "transparent",
  },
  header2: {
    textAlign: "center",
    alignSelf: "center",
    color: "#000a12",
    fontSize: 24,
    borderColor: "#000a12",
    borderWidth: 2,
    paddingLeft: 20,
    paddingRight: 20,
    padding: 15,
    backgroundColor: "transparent",
  },
  buttonRefresh: {
    justifyContent: "center",
    width: "90%",
    height: "7%",
    position: "absolute",
    bottom: "5%",
    // borderStyle: "dotted",
    // borderWidth: 1,
    // borderRadius: 1,
  },
  btn: {
    backgroundColor: "#50B848",
    width: "45%",
    alignSelf: "center",
    borderRadius: 20,
    margin: 3,
  },
  card: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    alignSelf: "center",
    marginBottom: 20,
    marginTop: 8,
    borderRadius: 10,
  },
  spaceRight: {
    fontWeight: "bold",
    fontSize: 15,
    textAlign: "left",
    marginLeft: 10,
    marginRight: 10,
    fontStyle: "italic",
  },
  idSpace: {
    fontWeight: "bold",
    fontSize: 15,
    textAlign: "right",
    padding: 5,
    marginLeft: "60%",
    marginRight: 10,
    alignSelf: "flex-end",
    position: "absolute",
    fontStyle: "italic",
  },
  description: {
    fontWeight: "bold",
    padding: 7,
    fontSize: 15,
    textAlign: "center",
    justifyContent: "center",
  },
  roleFont: {
    padding: 7,
    fontSize: 13,
    textAlign: "center",
    justifyContent: "center",
    fontStyle: "italic",
  },
  textSpace: {
    flex: 1,
    padding: 5,
    alignSelf: "flex-start",
    flexDirection: "row",
    flexWrap: "wrap",
    borderColor: "#6AB547",
    borderWidth: 2,
    backgroundColor: "#6AB547",
    // borderStyle: "dotted",
    // borderWidth: 1,
    // borderRadius: 1,
  },
});
