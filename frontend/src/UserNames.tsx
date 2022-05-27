import { Usernames } from "./App";
import "./Recent.css";

type UserNamesProps = {
  data: Usernames;
};

export function UserNames(props: UserNamesProps) {
  return (
    <>
      <table width="100%">
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
