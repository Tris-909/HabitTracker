import { Box, Heading, Icon } from "@chakra-ui/react";
import { FiPlus } from "react-icons/fi";
import { useStore, useNoteStore } from "state";
import { Note } from "./Note";
import { useEffect } from "react";

export const NoteBoard = ({ goal }) => {
  const user = useStore((state) => state.user);
  const notes = useNoteStore((state) => state.notes);
  const currentNotesByGoal = notes[goal?.id];
  const createNote = useNoteStore((state) => state.createNote);
  const fetchNotesByGoalId = useNoteStore((state) => state.fetchNotesByGoalId);

  // useEffect(() => {
  //   if (goal?.id) {
  //     fetchNotesByGoalId({ goalId: goal?.id });
  //   }
  // }, [goal?.id]);

  const createNoteHandler = () => {
    createNote({ user: user, goalId: goal.id });
  };

  const testNotes = [
    {
      id: "12345",
      createdAt: "11 October 2022 at 20:06:34 UTC+7",
      createdBy: "tranminhtri9090@gmail.com",
      description: "test",
      parentId: "XlUNu3apqaxzgNPch5g6",
      userId: "2pNCpmiFScflXCt1cPfh",
      x: 298,
      y: 117,
    },
  ];

  return (
    <Box
      h="500px"
      bgColor="white"
      mt="1rem"
      mb="2rem"
      borderRadius="1rem"
      position={"relative"}
    >
      <Heading
        color="#212121"
        fontSize={"3xl"}
        top="5%"
        left="45%"
        position={"absolute"}
      >
        Notes
      </Heading>
      <Icon
        as={FiPlus}
        fontSize="30px"
        top="3%"
        right="3%"
        cursor="pointer"
        position={"absolute"}
        onClick={() => createNoteHandler()}
      />
      {testNotes &&
        testNotes.map((note) => {
          return <Note note={note} />;
        })}
    </Box>
  );
};
