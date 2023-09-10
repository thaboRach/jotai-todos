import { PrimitiveAtom, useAtom } from "jotai";
import { Checkbox, CloseButton, Flex, ListItem, Text } from "@chakra-ui/react";
import { Todo } from "../types";

type ListItemProps = {
  atom: PrimitiveAtom<Todo>;
  remove: (item: PrimitiveAtom<Todo>) => void;
};

const TodoItem = ({ atom, remove }: ListItemProps) => {
  const [item, setItem] = useAtom(atom);

  const toggleCompleted = () => {
    setItem((props) => ({ ...props, done: !props.done }));
  };

  return (
    <ListItem onClick={toggleCompleted}>
      <Flex direction="row" gap="6">
        <Checkbox onChange={toggleCompleted} />
        <Text
          noOfLines={1}
          style={{ textDecoration: item.done ? "line-through" : "" }}
        >
          {item.label}
        </Text>
        <CloseButton marginLeft="auto" size="sm" onClick={() => remove(atom)} />
      </Flex>
    </ListItem>
  );
};

export default TodoItem;
