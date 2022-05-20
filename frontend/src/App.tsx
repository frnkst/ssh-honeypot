import React, { useState } from "react";
import "./App.css";
import { TestChart } from "./TestChart";
import { RecentAttempts } from "./RecentAttempts";
import { useInterval } from "./custom-hooks/use-interval";
import { Top10Ips } from "./Top10Ips";

type Login = {
  logins_key: number;
  timestamp: string;
  ip: string;
  username: string;
  password: string;
  useragent: string | null;
};

export type Logins = Login[];

async function getLoginData() {
  const response = await fetch("http://172.105.78.155:40002/");
  return await response.json();
}

function App() {
  useInterval(async () => {
    const loginData = await getLoginData();
    setRawData(loginData);
  }, 5000);

  const [rawData, setRawData] = useState<Logins>([]);

  return (
    <>
      <div style={{ width: "50%" }}>
        <TestChart data={rawData} />
      </div>
      <div style={{ width: "50%" }}>
        <RecentAttempts data={rawData} />
      </div>
      <div>
        <Top10Ips data={rawData} />
      </div>
    </>
  );
}

export default App;
