import { useState, useEffect } from "react";
import axios from "axios";

const RepositoryStars = ({ owner, repo, commits }) => {
  const [starCount, setStarCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(`https://api.github.com/repos/${owner}/${repo}${commits ? "/commits" : ""}`);
      setStarCount(commits ? result.data.length : result.data.stargazers_count);
    };
    fetchData();
  }, [owner, repo, commits]);

  return `${starCount} ${commits ? commits.length === 1 ? "commit" : "commits" : starCount === 1 ? "star" : "stars" }`;
};

export default RepositoryStars;