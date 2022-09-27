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
} from "@chakra-ui/react";
import { useStepStore } from "state";
import { useTable } from "react-table";
import dayjs from "dayjs";
import { FiEdit2 } from "react-icons/fi";

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
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns: columns,
      data: steps,
    });

  console.log("steps", steps);

  const renderCellComponent = (header: any, cell: any) => {
    if (header === "Date") {
      return dayjs(cell.value).format("DD/M");
    } else if (header === "Action") {
      return (
        <Button
          onClick={() => editStepHandler(cell.value)}
          rightIcon={<FiEdit2 />}
        >
          Edit
        </Button>
      );
    } else {
      return cell.value;
    }
  };

  const editStepHandler = (stepId: string) => {
    console.log("stepId", stepId);
  };

  return (
    <TableContainer>
      <Table bg="white" variant="simple" {...getTableProps()}>
        <TableCaption
          color="white"
          fontSize={"3xl"}
          mb="1rem"
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
