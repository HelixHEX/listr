import { Ionicons } from "@expo/vector-icons";
import { useContext, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Pressable,
} from "react-native";
import { AppwriteContext } from "../appwrite/Context";

type Props = {
  $collectionId?: string;
  $createdAt?: string;
  $databaseId?: string;
  $id: string;
  $permissions?: [];
  $updatedAt?: string;
  completed: boolean;
  list_id: string;
  name: string;
  user_id: string;
};

const Task = ({ completed, name, $id }: Props) => {
  const [checked, onChange] = useState(completed);
  const {appwrite} = useContext(AppwriteContext);

  const onCheckmarkPress = () => {
    // TODO: Update task in database
    appwrite.updateTask({completed: !checked, id: $id})
    onChange(!checked);
  }
  return (
    <>
      <View style={styles.container}>
        <Pressable
          style={[styles.checkboxBase, checked && styles.checkboxChecked]}
          onPress={onCheckmarkPress}
        >
          {checked && <Ionicons name="checkmark" size={20} color="white" />}
        </Pressable>
        <Text style={[styles.text, checked && styles.textChecked]}>{name}</Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    marginTop: 30,
  },
  checkboxBase: {
    alignSelf: 'center',
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#43BCCD',
    backgroundColor: 'transparent',
  },

  checkboxChecked: {
    backgroundColor: '#43BCCD',
  },

  circle: {
    width: 30,
    height: 30,
    borderRadius: 20,
    borderWidth: 3,
    borderColor: "#43BCCD",
    marginTop: 20,
    alignSelf: "center",
  },
  text: {
    color: "#484848",
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 20,
  },
  textChecked: {
    textDecorationLine: 'line-through',
    color: '#AEAEAE',
  }
});

export default Task;
