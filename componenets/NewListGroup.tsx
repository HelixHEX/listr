import { useContext, useState } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  TextInput,
} from "react-native";
import Modal from "react-native-modal";
import ColorPicker from "react-native-wheel-color-picker";
import { AppwriteContext } from "../appwrite/Context";

const NewListGroup = ({
  navigation,
  getLists,
}: {
  navigation: any;
  getLists: () => void;
}) => {
  const [name, setName] = useState("");
  const [color, setColor] = useState("#000000");
  const [isModalVisible, setModalVisible] = useState(false);
  const { appwrite } = useContext(AppwriteContext);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleCreateList = async () => {
    if (name.length > 0) {
      let list = await appwrite.createList({ name, color });
      setColor("#000000");
      setName("");
      toggleModal();
      getLists();
      navigation.navigate("Tasks", { name, listId: list.$id, color });
    }
  };

  return (
    <>
      <TouchableOpacity
        onPress={toggleModal}
        style={{
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.23,
          shadowRadius: 2.62,

          elevation: 4,
          backgroundColor: "white",
          width: 110,
          height: 40,
          alignSelf: "center",
          justifyContent: "center",
          borderRadius: 5,
        }}
      >
        <Text
          style={{
            fontSize: 17,
            textAlign: "center",
            color: "#484848",
            fontWeight: "bold",
          }}
        >
          New List
        </Text>
      </TouchableOpacity>

      <Modal
        avoidKeyboard
        isVisible={isModalVisible}
        onSwipeComplete={toggleModal}
        onBackdropPress={() => setModalVisible(false)}
        style={{ justifyContent: "flex-end", margin: 0 }}
      >
        <View style={[styles.content, { backgroundColor: "#f2f2f2" }]}>
          <View style={{ alignSelf: "center", height: 20 }}>
            <ColorPicker
              swatchesOnly={true}
              discrete={true}
              onColorChange={(color) => setColor(color)}
              color={color}
            />
          </View>
          <Text
            style={{
              marginTop: 10,
              marginBottom: 10,
              fontSize: 20,
              fontWeight: "bold",
            }}
          >
            List Color: <Text style={{ color }}>{color}</Text>
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <TextInput
              value={name}
              onChangeText={(text) => setName(text)}
              placeholderTextColor={"#AEAEAE"}
              style={styles.input}
              placeholder="List Name"
            />
            <TouchableOpacity
              style={[styles.btn, { backgroundColor: "white" }]}
              onPress={handleCreateList}
            >
              <Text style={{ color: "#484848", fontWeight: "bold" }}>
                Create
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.btn} onPress={toggleModal}>
            <Text style={{ color: "white", fontWeight: "bold" }}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  content: {
    padding: 15,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    height: 250,
    borderColor: "rgba(0, 0, 0, 0.1)",
  },
  contentTitle: {
    fontSize: 20,
    marginBottom: 12,
  },
  input: {
    backgroundColor: "#484848",
    padding: 10,
    height: 40,
    borderRadius: 5,
    width: "70%",
    color: "white",
    borderColor: "#484848",
    borderBottomWidth: 1,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },
  btn: {
    marginBottom: 30,
    width: 90,
    height: 40,
    backgroundColor: "#484848",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },
});

export default NewListGroup;
