import { Text, View, TouchableOpacity } from "react-native";

export default function Index() {

  const sendToServer = async (status: Number) => {
    try {
      await fetch('http://192.168.1.224:3001/device', {
        method: 'POST',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "id": "lolin", "status": status })
      }).then(response => response.json())
        .then(response => console.log(response))
    }
    catch (err) {
      console.log(err);
    }
  }


  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <TouchableOpacity onPress={() => sendToServer(1)}>
        <Text>On</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => sendToServer(0)}>
        <Text>Off</Text>
      </TouchableOpacity>
    </View>
  );
}