import { Input, UnorderedList } from "@chakra-ui/react";
import { PrimitiveAtom, atom, useAtom } from "jotai";
import { useFormik } from "formik";
import * as Yup from "yup";
import TodoItem from "./TodoItem";
import { Todo, TodoForm } from "../types";

const todosAtom = atom<PrimitiveAtom<Todo>[]>([]);

const TodosSchema = Yup.object().shape({
  todo: Yup.string()
    .min(2, "Too Short!")
    .max(15, "Too Long!")
    .required("Required"),
});

const Todos = () => {
  const [todos, setTodos] = useAtom(todosAtom);

  const formik = useFormik<TodoForm>({
    initialValues: {
      todo: "",
    },
    onSubmit: (values: TodoForm) => {
      setTodos((prev) => [
        ...prev,
        atom<Todo>({ label: values.todo, done: false }),
      ]);
      formik.setFieldValue("todo", "");
    },
    validationSchema: TodosSchema,
  });

  const remove = (todo: PrimitiveAtom<Todo>) =>
    setTodos((prev) => prev.filter((item) => item !== todo));

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <Input
          id="todo"
          name="todo"
          variant="outline"
          placeholder="New task"
          onChange={formik.handleChange}
          value={formik.values.todo}
          maxLength={15}
        />
      </form>
      <UnorderedList styleType="none">
        {todos.map((todo, index) => (
          <TodoItem key={index} atom={todo} remove={remove} />
        ))}
      </UnorderedList>
    </>
  );
};

export default Todos;
