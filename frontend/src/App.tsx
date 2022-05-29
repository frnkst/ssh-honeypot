import React, { useEffect, useState } from "react";
import { TestChart } from "./components/TestChart";
import { BasicStatsView } from "./components/BasicStats";
import { TopIPs } from "./components/TopIps";
import { TopPasswords } from "./components/Passwords";
import { UserNames } from "./components/UserNames";
import { AttacksHistory } from "./components/AttackHistory";
import { RecentAttempts } from "./components/RecentAttempts";
import "./App.css";

type Login = {
  logins_key: number;
  timestamp: string;
  ip: string;
  username: string;
  password: string;
  useragent: string | null;
};

export type Logins = Login[];
export type Usernames = Username[];
export type Username = {
  username: string;
  count: number;
};

export type Passwords = Password[];
export type Password = {
  password: string;
  count: number;
};

export type IPs = IP[];
export type IP = {
  ip: string;
  city: string;
  country: string;
  count: number;
};

type AtHistory = {
  date_trunc: string;
  count: number;
};

type Counter = {
  count: string;
};

export type BasicStats = {
  count15mins: Counter[];
  count1h: Counter[];
  count24h: Counter[];
  countAll: Counter[];
};

export type AttackHistoryData = AtHistory[];

async function getRecentAttempts() {
  const response = await fetch("http://172.105.78.155:40002/recent");
  return await response.json();
}

async function getBasicStats() {
  const response = await fetch("http://172.105.78.155:40002/count");
  return await response.json();
}

async function getUsernames() {
  const response = await fetch("http://172.105.78.155:40002/usernames");
  return await response.json();
}

async function getPasswords() {
  const response = await fetch("http://172.105.78.155:40002/passwords");
  return await response.json();
}

async function getIPs() {
  const response = await fetch("http://172.105.78.155:40002/ip");
  return await response.json();
}

async function getAttackHistoryData() {
  const response = await fetch("http://172.105.78.155:40002/attack-history");
  return await response.json();
}

function App() {
  useEffect(() => {
    const getData = async () => {
      const recentAttempts = await getRecentAttempts();
      const usernames = await getUsernames();
      const passwords = await getPasswords();
      const ips = await getIPs();
      const attackHistoryData = await getAttackHistoryData();
      const basicStats = await getBasicStats();

      setUsernames(usernames);
      setRecentAttempts(recentAttempts);
      setPasswords(passwords);
      setIPs(ips);
      setAttackHistoryData(attackHistoryData);
      setBasicStats(basicStats);
    };

    getData().catch(console.error);
  }, []);

  const [recentAttempts, setRecentAttempts] = useState<Logins>([]);
  const [usernames, setUsernames] = useState<Usernames>([]);
  const [passwords, setPasswords] = useState<Passwords>([]);
  const [ips, setIPs] = useState<IPs>([]);
  const [basicStats, setBasicStats] = useState<BasicStats>({
    countAll: [{ count: "0" }],
    count24h: [{ count: "0" }],
    count1h: [{ count: "0" }],
    count15mins: [{ count: "0" }],
  });
  const [attackHistoryData, setAttackHistoryData] = useState<AttackHistoryData>(
    []
  );

  return (
    <>
      <h1>SSH Honeypot</h1>

      <div className="charts">
        <div>
          <div>
            <div>Attacks per minute</div>
            <TestChart data={basicStats} />
          </div>
        </div>
        <div>
          <div>History</div>
          <AttacksHistory data={attackHistoryData} />
        </div>
      </div>

      <div className="box">
        <h2>Summary</h2>
        <BasicStatsView data={basicStats} />
      </div>

      <div className="all-stats">
        <div className="detail-stats">
          <div className="box">
            <h2>Top 20 IP Adresses</h2>
            <TopIPs data={ips} />
          </div>

          <div className="box">
            <h2>Top 20 usernames</h2>
            <UserNames data={usernames} />
          </div>

          <div className="box">
            <h2>Top 20 passwords</h2>
            <TopPasswords data={passwords} />
          </div>
        </div>
      </div>

      <div className="recent-attempts box">
        <RecentAttempts data={recentAttempts} />
      </div>
    </>
  );
}

export default App;
