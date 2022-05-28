import React, { useEffect, useState } from "react";
import { TestChart } from "./components/TestChart";
import { BasicStats } from "./components/BasicStats";
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
  count: number;
};

type AtHistory = {
  date_trunc: string;
  count: number;
};

export type AttackHistoryData = AtHistory[];

async function getRecentAttempts() {
  const response = await fetch("http://172.105.78.155:40002/recent");
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

      setUsernames(usernames);
      setRecentAttempts(recentAttempts);
      setPasswords(passwords);
      setIPs(ips);
      setAttackHistoryData(attackHistoryData);
    };

    getData().catch(console.error);
  }, []);

  const [recentAttempts, setRecentAttempts] = useState<Logins>([]);
  const [usernames, setUsernames] = useState<Usernames>([]);
  const [passwords, setPasswords] = useState<Passwords>([]);
  const [ips, setIPs] = useState<IPs>([]);
  const [attackHistoryData, setAttackHistoryData] = useState<AttackHistoryData>(
    []
  );

  return (
    <>
      <h1>SSH Honeypot</h1>

      <div className="charts">
        <div className="basic-charts">
          <TestChart data={passwords} />
          <div className="stats-box">
            <BasicStats />
          </div>
        </div>

        <AttacksHistory data={attackHistoryData} />
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
