import { Usernames } from "./App";
import "./Recent.css";

type UserNamesProps = {
  data: Usernames;
};

export function UserNames(props: UserNamesProps) {
  return (
    <>
      <h2>Top Usernames</h2>
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Count</th>
          </tr>
        </thead>
        <tbody>
          {props.data.map((item, index) => (
            <tr key={index}>
              <td>{item.username}</td>
              <td>{item.count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
