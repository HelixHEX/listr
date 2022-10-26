import { Octicons } from "@expo/vector-icons";
import { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  DeviceEventEmitter,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ColorPicker from "react-native-wheel-color-picker";
import { AppwriteContext } from "../appwrite/Context";
import PageContainer from "../componenets/PageContainer";
import Task from "../componenets/Task";
import Modal from "react-native-modal";
import { StatusBar } from "expo-status-bar";

const TasksScreen = ({
  route,
  navigation,
}: {
  route: any;
  navigation: any;
}) => {
  const { listId, name, color } = route.params;
  const { appwrite } = useContext(AppwriteContext);
  const [tasks, setTasks] = useState<any>([]);
  const [newTask, setNewTask] = useState("");
  const [newName, setNewName] = useState(name);
  const [newColor, setNewColor] = useState(color);
  const [isModalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const main = async () => {
      setTasks((await appwrite.getTasks({ listId })).documents);
    };
    main();
  }, []);

  const handleCreateTask = async () => {
    if (newTask.length > 0) {
      await appwrite.createTask({ list_id: listId, name: newTask });
      setNewTask("");
      setTasks((await appwrite.getTasks({ listId })).documents);
    }
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleUpdateList = async () => {
    await appwrite.updateList({ id: listId, name: newName, color: newColor });
    setTasks((await appwrite.getTasks({ listId })).documents);
    toggleModal();
    DeviceEventEmitter.emit("getLists");
  };

  const handleDeleteList = async () => {
    await appwrite.deleteList({ id: listId });
    toggleModal();
    DeviceEventEmitter.emit("getLists");
    navigation.goBack();
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        <StatusBar style="dark" />
        <View style={{ flexDirection: "row" }}>
          <View
            style={{ backgroundColor: `${newColor}`, height: 60, width: 5 }}
          />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
              paddingRight: 30,
            }}
          >
            <Text style={styles.title}>{newName}</Text>
            <TouchableOpacity
              onPress={toggleModal}
              style={{ alignSelf: "center" }}
            >
              <Octicons name="pencil" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ paddingLeft: 30, paddingRight: 30, marginTop: 20 }}>
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <TextInput
              value={newTask}
              onChangeText={(text) => setNewTask(text)}
              placeholderTextColor={"#AEAEAE"}
              placeholder="New Task"
              style={styles.input}
            />
            <TouchableOpacity onPress={handleCreateTask} style={styles.button}>
              <Text style={styles.buttonText}>Add Task</Text>
            </TouchableOpacity>
          </View>
          {tasks.length > 0 ? (
            <FlatList
              data={tasks}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => <Task {...item} />}
              keyExtractor={(item, index) => "key" + index}
            />
          ) : (
            <Text style={styles.noTasks}>No Tasks</Text>
          )}
        </View>
        <Modal
          avoidKeyboard
          isVisible={isModalVisible}
          onSwipeComplete={toggleModal}
          onBackdropPress={() => setModalVisible(false)}
          style={{ justifyContent: "flex-end", margin: 0 }}
        >
          <View style={[styles.content, { backgroundColor: "white" }]}>
            <View style={{ alignSelf: "center", height: 20 }}>
              <ColorPicker
                swatchesOnly={true}
                discrete={true}
                onColorChange={(color) => setNewColor(color)}
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
              List Color: <Text style={{ color: newColor }}>{newColor}</Text>
            </Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <TextInput
                value={newName}
                onChangeText={(text) => setNewName(text)}
                placeholderTextColor={"#AEAEAE"}
                style={styles.input}
                placeholder="List Name"
              />
              <TouchableOpacity
                onPress={handleUpdateList}
                style={[styles.modalButton, { backgroundColor: "#43BCCD" }]}
              >
                <Text style={{ color: "white" }}>Save</Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                marginTop: 30,
                flexDirection: "row",
                width: 300,
                height: "auto",
                justifyContent: "space-evenly",
              }}
            >
              <TouchableOpacity
                style={styles.modalButton}
                onPress={toggleModal}
              >
                <Text style={{ color: "white" }}>Close</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: "#E53E3E" }]}
                onPress={handleDeleteList}
              >
                <Text style={{ color: "white" }}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#484848",
    alignSelf: "center",
    marginLeft: 20,
  },
  input: {
    backgroundColor: "#484848",
    color: "#fff",
    height: 40,
    padding: 10,
    borderRadius: 5,
    width: "70%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },
  button: {
    backgroundColor: "white",
    height: 40,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },
  buttonText: {
    color: "#484848",
    fontSize: 13,
    fontWeight: "bold",
  },
  noTasks: {
    color: "#484848",
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 20,
    alignSelf: "center",
  },
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
  modalButton: {
    // marginBottom: 30,
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

export default TasksScreen;
