import { useMemo } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Button,
  Box,
} from "@chakra-ui/react";
import { useStepStore } from "state";
import { useTable } from "react-table";
import dayjs from "dayjs";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { LongStepDescriptionModal } from "./LongStepDescriptionModal";
import { EditStepModal } from "./EditStepModal";

export const StepTable = () => {
  const columns = useMemo(
    () => [
      {
        Header: "Date",
        accessor: "createdAt.seconds",
      },
      {
        Header: "Amount",
        accessor: "amount",
      },
      {
        Header: "Description",
        accessor: "description",
      },
      {
        Header: "Action",
        accessor: "id",
      },
    ],
    []
  );
  const steps = useStepStore((state) => state.steps);
  const deleteStepById = useStepStore((state) => state.deleteStepById);
  const updateStepId = useStepStore((state) => state.updateStepId);
  const { getTableProps, getTableBodyProps, rows, prepareRow } = useTable({
    columns: columns,
    data: steps,
  });

  const renderCellComponent = (header: any, cell: any) => {
    if (header === "Date") {
      return dayjs(cell.value).format("DD/M");
    } else if (header === "Action") {
      const currentStep = steps.filter(
        (step: any) => step.id === cell.value
      )[0];

      return (
        <Box
          display="flex"
          flexDir="column"
          justifyContent="center"
          alignItems="center"
        >
          <EditStepModal step={currentStep} />
          <Button
            mt="0.5rem"
            bg="#ff3034"
            _hover={{
              bg: "#cc2326",
            }}
            color="white"
            onClick={() => deleteStepHandler(cell.value)}
            rightIcon={<FiTrash2 />}
          >
            Delete
          </Button>
        </Box>
      );
    } else if (header === "Description") {
      let shortVersion = "";
      const LENGTH_RULE = 20;
      if (cell.value.length > LENGTH_RULE) {
        shortVersion = cell.value.slice(0, LENGTH_RULE);
      }
      const shortDescription = `${shortVersion}...`;

      return shortVersion ? (
        <LongStepDescriptionModal
          shortDescription={shortDescription}
          longDescription={cell.value}
        />
      ) : (
        cell.value
      );
    } else {
      return cell.value;
    }
  };

  const editStepHandler = (stepId: string) => {
    console.log("stepId", stepId);
    // await updateStepId({ stepId: stepId, amount: amount, description: description });
  };

  const deleteStepHandler = async (stepId: string) => {
    await deleteStepById({ stepId: stepId });
  };

  return (
    <TableContainer>
      <Table bg="white" variant="simple" {...getTableProps()}>
        <TableCaption
          color="#212121"
          bg="white"
          fontSize={"3xl"}
          borderBottom="1px solid black"
          mt="0"
          pt="0"
          placement="top"
        >
          Your Progress :
        </TableCaption>
        <Thead>
          <Tr>
            {columns.map((column) => (
              <Th key={column.accessor}>{column.Header}</Th>
            ))}
          </Tr>
        </Thead>
        <Tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <Tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  const header = cell.column.Header;
                  return (
                    <Td {...cell.getCellProps()}>
                      {renderCellComponent(header, cell)}
                    </Td>
                  );
                })}
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </TableContainer>
  );
};
