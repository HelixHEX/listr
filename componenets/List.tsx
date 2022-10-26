import { TouchableOpacity, View, Text } from "react-native";

type Props = {
  $collectionId?: string;
  $createdAt?: string;
  $databaseId?: string;
  $id?: string;
  $permissions?: [];
  $updatedAt?: string;
  color: string;
  name: string;
  user_id: string;
  navigation: any;
};
const List = ({ color, name, navigation, $id }: Props) => {
  return (
    <>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("Tasks", { listId: $id, name, color })
        }
        style={{
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.23,
          shadowRadius: 2.62,

          elevation: 4,
          marginRight: 10,
          marginTop: 20,
          backgroundColor: "white",
          width: 150,
          height: 80,
          borderRadius: 10,
          flexDirection: "row",
        }}
      >
        <View
          style={{
            backgroundColor: color,
            width: 8,
            height: "100%",
            borderTopLeftRadius: 10,
            borderBottomLeftRadius: 10,
          }}
        ></View>
        <View style={{ marginLeft: 7, alignSelf: "center" }}>
          <Text style={{ color: "#484848", fontWeight: "bold" }}>{name}</Text>
        </View>
      </TouchableOpacity>
    </>
  );
};

export default List;
