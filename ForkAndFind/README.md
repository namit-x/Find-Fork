![Build Status](https://img.shields.io/badge/build-passing-brightgreen)
![License](https://img.shields.io/badge/license-MIT-blue)
![Stars](https://img.shields.io/github/stars/yourusername/yourrepo)
![Forks](https://img.shields.io/github/forks/yourusername/yourrepo)
![Issues](https://img.shields.io/github/issues/yourusername/yourrepo)

## Table of Contents
- [About](#about)
- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Contributing](#contributing)
- [License](#license)

<details> <summary>Click to expand</summary>
const fetchData = async () => {
  try {
    const response = await fetch("https://api.example.com/data");
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
fetchData();
</details>
