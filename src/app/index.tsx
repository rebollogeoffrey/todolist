import { StyleSheet, View, FlatList, Button } from "react-native";
import { ToDoInput, TodoEntry } from "../components";
import { useTodos } from "../hooks";

export default function ToDoList() {
  const { todos, addTodo, removeTodo, clearTodos, setTodo } = useTodos();

  return (
    <View style={styles.container}>
      <ToDoInput onAdd={addTodo} />
      <FlatList
        data={todos}
        renderItem={({ item }) => (
          <TodoEntry
            todo={item}
            onDone={setTodo}
            onRemove={(todo) => removeTodo(todo.id)}
          />
        )}
        keyExtractor={(todo) => todo.id.toString()}
        ListFooterComponent={
          todos.length ? (
            <Button title="Clear all items" onPress={() => clearTodos()} />
          ) : null
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
