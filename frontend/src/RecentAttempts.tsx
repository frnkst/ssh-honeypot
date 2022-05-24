import sortBy from "lodash/sortBy";
import { Logins } from "./App";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";

type RecentAttemptProps = {
  data: Logins;
};

export function RecentAttempts(props: RecentAttemptProps) {
  const sortedByTimestamp = sortBy(props.data, ["timestamp"]).splice(0, 20);

  return (
    <>
      <h3>Last 20 attempts</h3>
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>IP Address</Th>
              <Th>Time</Th>
              <Th>Username</Th>
              <Th>Password</Th>
            </Tr>
          </Thead>
          <Tbody>
            {sortedByTimestamp.map((item, index) => (
              <Tr>
                <Td>{item.ip}</Td>
                <Td>{new Date(item.timestamp).toLocaleTimeString()}</Td>
                <Td>{item.username}</Td>
                <Td>{item.password}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
}
