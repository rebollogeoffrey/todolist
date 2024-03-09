import { Tabs } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function Layout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          headerTitle: "To-do list",
          tabBarLabel: "To-do list",
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="list"
              size={24}
              color={focused ? "black" : "gray"}
            />
          ),
          tabBarActiveTintColor: "black",
          tabBarInactiveTintColor: "gray",
        }}
      />
      <Tabs.Screen
        name="stats"
        options={{
          headerTitle: "Stats",
          tabBarLabel: "Stats",
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="stats-chart"
              size={24}
              color={focused ? "black" : "gray"}
            />
          ),
          tabBarActiveTintColor: "black",
          tabBarInactiveTintColor: "gray",
        }}
      />
    </Tabs>
  );
}
