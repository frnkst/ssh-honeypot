import { Logins } from "../App";
import "./Recent.css";

type RecentAttemptProps = {
  data: Logins;
};

export function RecentAttempts(props: RecentAttemptProps) {
  return (
    <>
      <h2>Most recent attempts</h2>
      <table>
        <thead>
          <tr>
            <th>Time</th>
            <th>IP</th>
            <th>Username</th>
            <th>Password</th>
          </tr>
        </thead>
        <tbody>
          {props.data.map((item, index) => (
            <tr key={index}>
              <td>{new Date(item.timestamp).toLocaleTimeString()}</td>
              <td>{item.ip}</td>
              <td>{item.username}</td>
              <td>{item.password}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
