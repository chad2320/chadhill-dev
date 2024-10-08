import React, { useEffect, useState, useRef } from "react";
import LaunchIcon from "@mui/icons-material/Launch";
import { getRepositoryInfo } from "../../utils/githubService";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

export const DefaultPage: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(1080);
  const [repositoryInfo1, setRepositoryInfo1] = useState<any | null>(null);
  const [repositoryInfo2, setRepositoryInfo2] = useState<any | null>(null);

  useEffect(() => {
    //Grab github repo info
    const fetchData = async (
      username: string,
      repositoryName: string,
      repo: number
    ) => {
      const data = await getRepositoryInfo(username, repositoryName);
      if (repo === 1) setRepositoryInfo1(data);
      else if (repo === 2) setRepositoryInfo2(data);
    };

    fetchData("chad2320", "Chads-Data-Tabler", 1);
    fetchData("chad2320", "chadhill-dev", 2);
  }, []);

  useEffect(() => {
    //Get main divs width to properly set flex direction
    const handleResize = () => {
      // Get the width of the component
      const componentWidth = ref.current?.getBoundingClientRect().width || 0;

      // Change the flex direction based on the component width
      setWidth(componentWidth);
    };

    // Call the handleResize function immediately to set the initial flex direction
    handleResize();
    // Add a listener to detect changes in the component width
    const observer = new ResizeObserver(handleResize);
    if (ref.current) {
      observer.observe(ref.current);
    }

    // Clean up the observer on component unmount
    return () => {
      observer.disconnect();
    };
  });

  const handleDownload = () => {
    const documentUrl = "/chadHillResume.pdf";
    const link = document.createElement("a");
    link.href = documentUrl;

    link.download = "chadHillResume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!repositoryInfo1 || !repositoryInfo2)
    return (
      <div className="flex h-full w-full items-center justify-center">
        <h1 className="font-chicago text-2xl text-white">
          Loading Github Info
        </h1>
      </div>
    );

  return (
    <div
      ref={ref}
      className=" no-scrollbar flex h-full w-full flex-col items-center overflow-y-scroll bg-gradient-to-t from-[#0e1b3e] to-slate-900 to-50%"
    >
      <div
        className={` m-4 flex h-auto w-[90%] items-center justify-center  ${
          width > 800 ? "flex-row" : "flex-col"
        }`}
      >
        <div className={` flex h-full w-[40%] items-center justify-center `}>
          <img
            className={` max-h-[100%] w-auto rounded-full`}
            src={require("../../assets/images/chad.jpeg")}
            alt={":)"}
          />
        </div>
        <div
          className={` ${
            width > 800 ? "w-[50%]" : "w-[95%]"
          } m-2 flex h-full  flex-col items-center rounded-md bg-gradient-to-b  from-[#293d5b] to-[#1f2d41] px-2`}
        >
          <h1
            className={` m-2 font-chicago ${
              width < 800 ? "text-lg" : "text-2xl"
            } text-white`}
          >
            {/* eslint-disable-next-line */}
            Welcome to my website! I'm Chad, and I'm a digital marketer!
          </h1>
          <div className=" h-[1px] w-[80%] bg-black" />
          <p
            className={` m-2 font-chicago ${
              width < 800 ? "text-sm" : "text-lg"
            } text-white`}
          >
            {/* eslint-disable-next-line */}
              I know a bit about webdev and decided to make this site as a fun little challenge for myself. I included another project below that I've worked on as it was an interest data processing problem I found.
          </p>
          <p
            className={` m-2 font-chicago ${
              width < 800 ? "text-sm" : "text-lg"
            } text-white`}
          >
            {/* eslint-disable-next-line */}
            I hope you found this interesting!
          </p>
          <p>{/* eslint-disable-next-line */}</p>
          <div
            className={`flex h-full w-full ${
              width > 845 ? "flex-row" : "flex-col"
            } items-end justify-between pb-2`}
          >
            <div className="flex h-8 items-center rounded-lg border-2 border-slate-700 bg-purple-800 p-[3px]">
              <p
                className={`font-chicago ${
                  width < 800 ? "text-xs" : "text-sm"
                } text-white`}
              >
                Status:&nbsp;
                <span className="text-green-500">Media Buyer</span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className=" mb-12 flex h-auto w-full flex-col items-center px-4">
        <div className=" min-h-20 mb-2 flex w-[100%] max-w-[1000px] flex-col items-center rounded-md  bg-gradient-to-t from-slate-800 to-slate-700">
          <div
            className={` flex w-full ${
              width > 700 ? "flex-row" : "flex-col"
            } items-center justify-between`}
          >
            <h1 className="ml-2 font-chicago text-xl text-white">
              Chads Data Tabler
            </h1>
            <p className="text-md font-chicago text-white">
              Commits:&nbsp;{repositoryInfo1?.commits}
            </p>
            <p className="text-md font-chicago text-white">
              Last Commit:&nbsp;
              {dayjs().from(repositoryInfo1?.last_commit, true)}
              &nbsp;ago
            </p>
            <div className="m-2 flex flex-row items-center">
              <h1 className="font-chicago text-white">Github:&nbsp;</h1>
              <button
                className="rounded-sm p-[1px] text-white hover:bg-slate-500 "
                onClick={() =>
                  window.open("https://github.com/chad2320/Chads-Data-Tabler")
                }
              >
                <LaunchIcon />
              </button>
            </div>
          </div>
          <div className="m-[3px] h-[2px] w-4/5 bg-black" />
          <div className="flex w-full flex-col items-center justify-between">
            <div className="w-[100%] p-2 font-chicago text-sm text-white">
              <h1>
                Automatically generate a viewable datatable with accurate
                filters for each data type. Generally useful for webscraping
                projects.
              </h1>
            </div>
            <div
              className={`flex w-full ${
                width > 950 ? "flex-row" : "flex-col"
              } justify-start font-chicago text-lg text-white`}
            >
              <LanguagesVisual languages={repositoryInfo1?.languages} />
              <div
                className={`flex w-full ${
                  width > 600 ? "flex-row" : "flex-col"
                } justify-around`}
              >
                <div className=" m-2 w-48">
                  <h1>Frameworks:</h1>
                  <ul className="text-sm">
                    <li>React</li>
                    <li>Mongoose</li>
                    <li>Express</li>
                  </ul>
                </div>
                <div className=" m-2 w-48">
                  <h1>Libraries:</h1>
                  <ul className="text-sm">
                    <li>MUI</li>
                  </ul>
                </div>
                <div className=" m-2 w-48">
                  <h1>Platforms:</h1>
                  <ul className="text-sm">
                    <li>Atlas {"(Db)"}</li>
                    <li>Vercel {"(FE/BE)"}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className=" min-h-20 mb-2 flex w-[100%] max-w-[1000px] flex-col items-center rounded-md  bg-gradient-to-t from-slate-800 to-slate-700">
          <div
            className={` flex w-full ${
              width > 700 ? "flex-row" : "flex-col"
            } items-center justify-between`}
          >
            <h1 className="ml-2 font-chicago text-xl text-white">
              chadhill.dev
            </h1>
            <p className="text-md font-chicago text-white">
              Commits:&nbsp;{repositoryInfo2?.commits}
            </p>
            <p className="text-md font-chicago text-white">
              Last Commit:&nbsp;
              {dayjs().from(repositoryInfo2?.last_commit, true)}
              &nbsp;ago
            </p>
            <div className="m-2 flex flex-row items-center">
              <h1 className="font-chicago text-white">Github:&nbsp;</h1>
              <button
                className="rounded-sm p-[1px] text-white hover:bg-slate-500 "
                onClick={() =>
                  window.open("https://github.com/chad2320/chadhill-dev")
                }
              >
                <LaunchIcon />
              </button>
            </div>
          </div>
          <div className="m-[3px] h-[2px] w-4/5 bg-black" />
          <div className="flex w-full flex-col items-center justify-between">
            <div className="w-[100%] p-2 font-chicago text-sm text-white">
              <h1>If your reading this, then you already know!</h1>
            </div>
            <div
              className={`flex w-full ${
                width > 950 ? "flex-row" : "flex-col"
              } justify-around font-chicago text-lg text-white`}
            >
              <LanguagesVisual languages={repositoryInfo2?.languages} />
              <div
                className={`flex w-full ${
                  width > 600 ? "flex-row" : "flex-col"
                } justify-around`}
              >
                <div className=" m-2 w-48">
                  <h1>Frameworks:</h1>
                  <ul className="text-sm">
                    <li>React</li>
                  </ul>
                </div>
                <div className=" m-2 w-48">
                  <h1>Libraries:</h1>
                  <ul className="text-sm">
                    <li>Tailwind</li>
                    <li>Framer Motion</li>
                    <li>Howler</li>
                    <li>RND React</li>
                  </ul>
                </div>
                <div className=" m-2 w-48">
                  <h1>Platforms:</h1>
                  <ul className="text-sm">
                    <li>Vercel {"(FE)"}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface LanguageData {
  [key: string]: number;
}

interface LanguagesVisualProps {
  languages: LanguageData;
}

export const LanguagesVisual: React.FC<LanguagesVisualProps> = ({
  languages,
}) => {
  const totalValue = Object.values(languages).reduce(
    (acc, curr) => acc + curr,
    0
  );

  // Group languages into pairs to create rows
  const languagePairs: [string, number][] = Object.entries(languages);
  const rows: [string, number][][] = [];
  for (let i = 0; i < languagePairs.length; i += 2) {
    rows.push(languagePairs.slice(i, i + 2));
  }

  return (
    <div className="m-2 w-[300px]">
      <h1>Languages</h1>
      <div className="flex h-2 w-full flex-row overflow-hidden rounded-md">
        {Object.entries(languages).map(([language, value]) => (
          <div
            key={language}
            style={{ width: `${((value / totalValue) * 100).toFixed(2)}%` }}
            className={` h-2  ${
              language == "TypeScript"
                ? "bg-blue-600"
                : language == "JavaScript"
                ? "bg-yellow-300"
                : language == "HTML"
                ? "bg-red-500"
                : "bg-purple-600"
            }`}
          />
        ))}
      </div>
      <div className="flex flex-col">
        {rows.map((row, index) => (
          <div key={index} className="flex flex-row">
            {row.map(([language, value]) => (
              <LanguageItem
                key={language}
                language={language}
                value={value}
                totalValue={totalValue}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

interface LanguageItemProps {
  language: string;
  value: number;
  totalValue: number;
}

const LanguageItem: React.FC<LanguageItemProps> = ({
  language,
  value,
  totalValue,
}) => {
  const percentage = ((value / totalValue) * 100).toFixed(2);

  return (
    <div className="flex w-[150px] flex-row items-center justify-start text-[12px]">
      <div
        className={`mr-2 h-[5px] w-[5px] rounded-full ${
          language == "TypeScript"
            ? "bg-blue-600"
            : language == "JavaScript"
            ? "bg-yellow-300"
            : language == "HTML"
            ? "bg-red-500"
            : "bg-purple-600"
        }`}
      />
      <p>
        {language} {percentage}%
      </p>
    </div>
  );
};

export default LanguageItem;
