import { SimpleLineIcons } from "@expo/vector-icons";
import { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  DeviceEventEmitter,
} from "react-native";
import { AppwriteContext } from "../appwrite/Context";
import List from "../componenets/List";
import NewListGroup from "../componenets/NewListGroup";
import PageContainer from "../componenets/PageContainer";

const HomeScreen = ({ navigation }: { navigation: any }) => {
  const { appwrite, setLoggedIn, loggedIn } = useContext(AppwriteContext);
  const [lists, setLists] = useState<any>([]);

  const handleLogout = () => {
    appwrite.logout();
    setLoggedIn(false);
  };

  useEffect(() => {
    const main = async () => {
      getLists();
    };
    main();
  }, []);

  const getLists = async () => {
    setLists((await appwrite.getLists()).documents);
  };
  

  useEffect(() => {
    DeviceEventEmitter.addListener("getLists", getLists);
    return () => DeviceEventEmitter.removeAllListeners("getLists");
  }, []);

  useEffect(() => {
    navigation.setOptions({
      getLists,
    });
  }, [navigation]);

  // export const fetchlists = async () => {
  //   setLists((await appwrite.getLists()).documents);
  // }

  return (
    <>
      <PageContainer>
        <TouchableOpacity onPress={handleLogout}>
          <SimpleLineIcons
            style={{ alignSelf: "flex-end" }}
            name="logout"
            size={24}
            color="black"
          />
        </TouchableOpacity>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 20,
          }}
        >
          <Text style={{ color: "#484848", fontSize: 40, fontWeight: "bold" }}>
            Listr.
          </Text>
          <NewListGroup getLists={getLists} navigation={navigation} />
        </View>
        <FlatList
          contentContainerStyle={{
            justifyContent: "space-between",
            width: "100%",
          }}
          style={{ height: "100%", marginTop: 50, width: "100%" }}
          data={lists}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => <List navigation={navigation} {...item} />}
          keyExtractor={(item, index) => "key" + index}
        />
      </PageContainer>
    </>
  );
};

export default HomeScreen;
