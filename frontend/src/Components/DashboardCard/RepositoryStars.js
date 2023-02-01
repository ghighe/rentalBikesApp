import { useState, useEffect } from "react";
import axios from "axios";

const RepositoryStars = ({ owner, repo }) => {
  const [starCount, setStarCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(`https://api.github.com/repos/${owner}/${repo}`);
      setStarCount(result.data.stargazers_count);
    };
    fetchData();
  }, [owner, repo]);

  return `${starCount} ${starCount === 1 ? "star" : "stars"}`;
};

export default RepositoryStars;