import { BasicStats } from "../App";

type BasicStatsProps = {
  data: BasicStats;
};

export function BasicStatsView(props: BasicStatsProps) {
  return (
    <>
      <table width="100%">
        <tbody>
          <tr>
            <td>Last 15 minutes</td>
            <td>{props.data.count15mins[0].count}</td>
          </tr>
          <tr>
            <td>Last 1 hour</td>
            <td>{props.data.count1h[0].count}</td>
          </tr>
          <tr>
            <td>Last 24 hour</td>
            <td>{props.data.count24h[0].count}</td>
          </tr>
          <tr>
            <td>Since beginning</td>
            <td>{props.data.countAll[0].count}</td>
          </tr>
        </tbody>
      </table>
    </>
  );
}
