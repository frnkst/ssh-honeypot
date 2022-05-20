import countBy from "lodash/countBy";
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
import { forIn } from "lodash";

type Top10IpsProps = {
  data: Logins;
};

export function Top10Ips(props: Top10IpsProps) {
  const countedByIp: any = [];
  forIn(countBy(props.data, "ip"), function (value, key) {
    countedByIp.push({ ip: key, count: value });
  });

  console.log("count", countedByIp);

  return (
    <>
      <h3>Top 10 attacking ips</h3>
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>IP Address</Th>
              <Th>Number of Attacks</Th>
            </Tr>
          </Thead>
          <Tbody>
            {countedByIp.map((item: any) => (
              <Tr>
                <Td>{item.ip}</Td>
                <Td>{item.count}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
}
