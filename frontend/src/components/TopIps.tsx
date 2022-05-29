import { IPs } from "../App";
import "./Recent.css";

type TopIPsProps = {
  data: IPs;
};

export function TopIPs(props: TopIPsProps) {
  return (
    <>
      <table>
        <thead>
          <tr>
            <th>IP</th>
            <th>City</th>
            <th>Country</th>
            <th>Count</th>
          </tr>
        </thead>
        <tbody>
          {props.data.map((item, index) => (
            <tr key={index}>
              <td>{item.ip}</td>
              <td>{item.count}</td>
              <td>{item.city}</td>
              <td>{item.country}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
