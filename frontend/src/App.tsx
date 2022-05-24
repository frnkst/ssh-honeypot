import React, {useState} from 'react';
import './App.css';
import {TestChart} from "./TestChart";
import {RecentAttempts} from "./RecentAttempts";
import {useInterval} from "./custom-hooks/use-interval";

type Login = {
  logins_key: number,
  timestamp: string,
  ip: string,
  username: string,
  password: string,
  useragent: string | null
}

export type Logins = Login[]

// const a = [{"logins_key":1,"timestamp":"2022-05-23T00:00:00.000Z","ip":"77.57.32.117","username":"root","password":"this","useragent":null},{"logins_key":2,"timestamp":"2022-05-23T00:00:00.000Z","ip":"77.57.32.117","username":"root","password":"is ","useragent":null},{"logins_key":3,"timestamp":"2022-05-23T00:00:00.000Z","ip":"77.57.32.117","username":"root","password":"cool","useragent":null},{"logins_key":4,"timestamp":"2022-05-23T00:00:00.000Z","ip":"92.255.85.237","username":"root","password":"fa","useragent":null},{"logins_key":5,"timestamp":"2022-05-23T00:00:00.000Z","ip":"92.255.85.135","username":"root","password":"abcd123456789","useragent":null},{"logins_key":6,"timestamp":"2022-05-23T00:00:00.000Z","ip":"92.255.85.237","username":"root","password":"235689","useragent":null},{"logins_key":7,"timestamp":"2022-05-23T00:00:00.000Z","ip":"92.255.85.135","username":"root","password":"112358","useragent":null},{"logins_key":8,"timestamp":"2022-05-23T00:00:00.000Z","ip":"92.255.85.135","username":"root","password":"db2fenc1","useragent":null},{"logins_key":9,"timestamp":"2022-05-23T00:00:00.000Z","ip":"92.255.85.135","username":"root","password":"1234567891","useragent":null},{"logins_key":10,"timestamp":"2022-05-23T00:00:00.000Z","ip":"92.255.85.135","username":"root","password":"asd123123","useragent":null},{"logins_key":11,"timestamp":"2022-05-24T00:00:00.000Z","ip":"92.255.85.237","username":"root","password":"147896325","useragent":null},{"logins_key":12,"timestamp":"2022-05-24T00:00:00.000Z","ip":"92.255.85.135","username":"root","password":"332211","useragent":null},{"logins_key":13,"timestamp":"2022-05-24T00:00:00.000Z","ip":"92.255.85.135","username":"root","password":"asdf123456","useragent":null},{"logins_key":14,"timestamp":"2022-05-24T00:00:00.000Z","ip":"92.255.85.135","username":"root","password":"maximo","useragent":null},{"logins_key":15,"timestamp":"2022-05-24T00:00:00.000Z","ip":"92.255.85.237","username":"root","password":"19841018","useragent":null},{"logins_key":16,"timestamp":"2022-05-24T00:00:00.000Z","ip":"92.255.85.237","username":"root","password":"584520","useragent":null},{"logins_key":17,"timestamp":"2022-05-24T00:00:00.000Z","ip":"92.255.85.135","username":"root","password":"hao123","useragent":null},{"logins_key":18,"timestamp":"2022-05-24T00:00:00.000Z","ip":"92.255.85.135","username":"root","password":"christian","useragent":null},{"logins_key":19,"timestamp":"2022-05-24T00:00:00.000Z","ip":"92.255.85.135","username":"root","password":"li123456","useragent":null},{"logins_key":20,"timestamp":"2022-05-24T00:00:00.000Z","ip":"92.255.85.237","username":"root","password":"jasmin","useragent":null},{"logins_key":21,"timestamp":"2022-05-24T00:00:00.000Z","ip":"92.255.85.135","username":"root","password":"baba123","useragent":null},{"logins_key":22,"timestamp":"2022-05-24T00:00:00.000Z","ip":"92.255.85.237","username":"root","password":"baobao","useragent":null},{"logins_key":23,"timestamp":"2022-05-24T00:00:00.000Z","ip":"92.255.85.135","username":"root","password":"newlife","useragent":null},{"logins_key":24,"timestamp":"2022-05-24T00:00:00.000Z","ip":"92.255.85.135","username":"root","password":"0101","useragent":null},{"logins_key":25,"timestamp":"2022-05-24T00:00:00.000Z","ip":"179.39.41.13","username":"root","password":"root","useragent":null},{"logins_key":26,"timestamp":"2022-05-24T00:00:00.000Z","ip":"179.39.41.13","username":"root","password":"admin","useragent":null},{"logins_key":27,"timestamp":"2022-05-24T00:00:00.000Z","ip":"179.39.41.13","username":"root","password":"12345","useragent":null},{"logins_key":28,"timestamp":"2022-05-24T00:00:00.000Z","ip":"179.39.41.13","username":"root","password":"guest","useragent":null},{"logins_key":29,"timestamp":"2022-05-24T00:00:00.000Z","ip":"179.39.41.13","username":"root","password":"123456","useragent":null},{"logins_key":30,"timestamp":"2022-05-24T00:00:00.000Z","ip":"179.39.41.13","username":"root","password":"1234","useragent":null},{"logins_key":31,"timestamp":"2022-05-24T00:00:00.000Z","ip":"179.39.41.13","username":"root","password":"123","useragent":null},{"logins_key":32,"timestamp":"2022-05-24T00:00:00.000Z","ip":"179.39.41.13","username":"root","password":"hlL0mlNAabiR","useragent":null},{"logins_key":33,"timestamp":"2022-05-24T00:00:00.000Z","ip":"179.39.41.13","username":"root","password":"test","useragent":null},{"logins_key":34,"timestamp":"2022-05-24T00:00:00.000Z","ip":"179.39.41.13","username":"root","password":"toor","useragent":null},{"logins_key":35,"timestamp":"2022-05-24T00:00:00.000Z","ip":"92.255.85.135","username":"root","password":"vanessa","useragent":null},{"logins_key":36,"timestamp":"2022-05-24T00:00:00.000Z","ip":"92.255.85.135","username":"root","password":"annie123","useragent":null},{"logins_key":37,"timestamp":"2022-05-24T00:00:00.000Z","ip":"92.255.85.237","username":"root","password":"aa123456789","useragent":null},{"logins_key":38,"timestamp":"2022-05-24T00:00:00.000Z","ip":"92.255.85.135","username":"root","password":"010203","useragent":null}];

async function getLoginData() {
  const response = await fetch("http://172.105.78.155:40002/");
  return await response.json();
}

function App() {
  useInterval(async () => {
    const b = await getLoginData();
    setRawData(b);
    console.log("rawdata", b)
  }, 5000);

  const [rawData, setRawData] = useState<Logins>([]);

  return (
      <>
        <TestChart/>
        len is: {rawData?.length}

        <RecentAttempts data={rawData} />
      </>
      );
}

export default App;
