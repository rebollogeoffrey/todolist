import { useCallback, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const TODOS_KEY = "todos";

export type Todo = {
  id: number;
  text: string;
  done: boolean;
};

export default function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const todos = await AsyncStorage.getItem(TODOS_KEY);
        if (todos) {
          setTodos(JSON.parse(todos));
        }
      } catch (e) {
        console.warn("Error fetching todos", e);
      }
    };
    fetchTodos();
  }, []);

  const addTodo = useCallback(async (text: string) => {
    const newTodo = { text, done: false, id: Date.now() };
    try {
      await AsyncStorage.setItem(
        TODOS_KEY,
        JSON.stringify([...todos, newTodo])
      );
      setTodos((prev) => [...prev, newTodo]);
    } catch (e) {
      console.warn("Error saving todo", e);
    }
  }, []);

  const removeTodo = useCallback(
    async (id: number) => {
      try {
        await AsyncStorage.setItem(
          TODOS_KEY,
          JSON.stringify(todos.filter((todo) => todo.id !== id))
        );
        setTodos((prev) => prev.filter((todo) => todo.id !== id));
      } catch (e) {
        console.warn("Error removing todo", e);
      }
    },
    [todos]
  );

  const clearTodos = useCallback(async () => {
    try {
      await AsyncStorage.removeItem(TODOS_KEY);
      setTodos([]);
    } catch (e) {
      console.warn("Error clearing todos", e);
    }
  }, []);

  const setTodo = useCallback(
    async (todo: Todo) => {
      try {
        await AsyncStorage.setItem(
          TODOS_KEY,
          JSON.stringify(
            todos.map((t) => (t.id === todo.id ? { ...t, done: !t.done } : t))
          )
        );
        setTodos((prev) =>
          prev.map((t) => (t.id === todo.id ? { ...t, done: !t.done } : t))
        );
      } catch (e) {
        console.warn("Error setting todo", e);
      }
    },
    [todos]
  );

  return { todos, addTodo, removeTodo, clearTodos, setTodo };
}
