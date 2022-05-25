import { Passwords } from "./App";
import "./Recent.css";

type PasswordsProps = {
  data: Passwords;
};

export function TopPasswords(props: PasswordsProps) {
  return (
    <>
      <h2>Top Passwords</h2>
      <table>
        <thead>
          <tr>
            <th>Password</th>
            <th>Count</th>
          </tr>
        </thead>
        <tbody>
          {props.data.map((item, index) => (
            <tr key={index}>
              <td>{item.password}</td>
              <td>{item.count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
