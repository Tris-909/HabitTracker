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
  useMediaQuery,
} from "@chakra-ui/react";
import { useStepStore } from "state";
import { useTable, usePagination } from "react-table";
import dayjs from "dayjs";
import {
  FiTrash2,
  FiChevronsLeft,
  FiChevronLeft,
  FiChevronRight,
  FiChevronsRight,
} from "react-icons/fi";
import { LongStepDescriptionModal } from "../LongStepDescriptionModal";
import { EditStepModal } from "../EditStepModal";
import { TableFooterButton } from "./TableFooterButton";
import { MEDIA_QUERY } from "consts";

export const StepTable = ({ goal }) => {
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
  const stepsForCurrentGoal = steps[goal?.id] ? steps[goal?.id] : [];
  const deleteStepById = useStepStore((state) => state.deleteStepById);
  const {
    getTableProps,
    getTableBodyProps,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    state: { pageIndex },
  } = useTable(
    {
      columns: columns,
      data: stepsForCurrentGoal.sort(
        (a, b) => b.createdAt.seconds - a.createdAt.seconds
      ),
      autoResetPage: false,
      autoResetSortBy: false,
      initialState: { pageIndex: 0, pageSize: 3 },
    },
    usePagination
  );
  const [isDesktop] = useMediaQuery(`(min-width: ${MEDIA_QUERY.DESKTOP})`, {
    ssr: false,
  });

  const renderCellComponent = (header, cell) => {
    if (header === "Date") {
      return dayjs(dayjs.unix(cell.value)).format("DD/MM/YYYY");
    } else if (header === "Action") {
      const currentStep = stepsForCurrentGoal.filter(
        (step) => step.id === cell.value
      )[0];

      return (
        <Box
          display="flex"
          flexDir="column"
          justifyContent="center"
          alignItems="center"
        >
          <EditStepModal step={currentStep} goal={goal} />
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

  const deleteStepHandler = async (stepId) => {
    await deleteStepById({ stepId: stepId, goalId: goal?.id });
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
          {page.map((row, i) => {
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
      <Box
        w="100%"
        pt="3"
        pb="3"
        bg="white"
        display="flex"
        justifyContent="center"
        alignItems="center"
        position="relative"
      >
        {isDesktop ? (
          <Box position="absolute" right="2%">
            Total : {stepsForCurrentGoal.length}
          </Box>
        ) : null}

        <Box mr="3">
          <TableFooterButton
            tooltipMessage="First Page"
            onClickHandler={() => gotoPage(0)}
            isDisabled={!canPreviousPage}
            ButtonIcon={<FiChevronsLeft />}
            ariaLabel={"First page"}
          />
          <TableFooterButton
            tooltipMessage="Previous Page"
            onClickHandler={previousPage}
            isDisabled={!canPreviousPage}
            ButtonIcon={<FiChevronLeft />}
            ariaLabel={"Previous Page"}
          />
        </Box>

        <Box>{pageIndex}</Box>

        <Box ml="6">
          <TableFooterButton
            tooltipMessage="Next Page"
            onClickHandler={nextPage}
            isDisabled={!canNextPage}
            ButtonIcon={<FiChevronRight />}
            ariaLabel={"Next Page"}
          />
          <TableFooterButton
            tooltipMessage="Last Page"
            onClickHandler={() => gotoPage(pageCount - 1)}
            isDisabled={!canNextPage}
            ButtonIcon={<FiChevronsRight />}
            ariaLabel={"Last Page"}
          />
        </Box>
      </Box>
    </TableContainer>
  );
};
