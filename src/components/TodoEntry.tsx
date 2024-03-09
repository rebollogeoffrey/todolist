import { StyleSheet, Text, Pressable, TouchableOpacity } from "react-native";
import Checkbox from "expo-checkbox";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Todo } from "../hooks/useTodos";

type TodoProps = {
  todo: Todo;
  onDone?: (todo: Todo) => void;
  onRemove?: (todo: Todo) => void;
};

export default function TodoEntry({ todo, onDone, onRemove }: TodoProps) {
  return (
    <Pressable style={styles.container} onPress={() => onDone?.(todo)}>
      <Checkbox
        value={todo.done}
        onValueChange={() => onDone?.(todo)}
        color="purple"
        style={todo.done && styles.doneOpacity}
      />
      <Text style={todo.done && styles.doneOpacity}>{todo.text}</Text>
      <TouchableOpacity
        onPress={() => onRemove?.(todo)}
        style={todo.done && styles.doneOpacity}
      >
        <Ionicons name="remove-circle-outline" style={styles.btn} />
      </TouchableOpacity>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    marginHorizontal: 20,
    marginVertical: 5,
    alignItems: "center",
    flexDirection: "row",
  },
  doneOpacity: {
    textDecorationLine: "line-through",
    opacity: 0.3,
  },
  btn: {
    color: "purple",
    fontSize: 35,
  },
});
