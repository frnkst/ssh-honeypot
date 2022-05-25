import React, { useEffect, useState } from "react";
import "./App.css";
import { TopPasswords } from "./Passwords";
import { RecentAttempts } from "./RecentAttempts";
import { UserNames } from "./UserNames";
import { TopIPs } from "./TopIps";

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

function App() {
  useEffect(() => {
    const getData = async () => {
      const recentAttempts = await getRecentAttempts();
      const usernames = await getUsernames();
      const passwords = await getPasswords();
      const ips = await getIPs();

      setUsernames(usernames);
      setRecentAttempts(recentAttempts);
      setPasswords(passwords);
      setIPs(ips);
    };

    getData().catch(console.error);
  }, []);

  const [recentAttempts, setRecentAttempts] = useState<Logins>([]);
  const [usernames, setUsernames] = useState<Usernames>([]);
  const [passwords, setPasswords] = useState<Passwords>([]);
  const [ips, setIPs] = useState<IPs>([]);

  return (
    <>
      <h1>SSH Honeypot</h1>

      <RecentAttempts data={recentAttempts} />
      <UserNames data={usernames} />
      <TopPasswords data={passwords} />
      <TopIPs data={ips} />
    </>
  );
}

export default App;
