/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import fetchData from "../../utils/fetchEndPoints";

const RepositoryStars = ({ owner, repo, commits }) => {
  const [count, setCount] = useState(0);

  let url = null;

  if (commits) {
    url = `https://api.github.com/repos/${owner}/${repo}/commits`;
  } else {
    url = `https://api.github.com/repos/${owner}/${repo}`;
  }

  useEffect(() => {
    (async () => {
      const result = await fetchData(url);
      let count = commits ? result.length : result.stargazers_count;
      setCount(count);
    })();
  }, []);

  return ` ${count}`;
};

export default RepositoryStars;
