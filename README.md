# Overview
In this project, we prioritize security and code quality by employing several tools and practices to ensure robustness and maintainability.

# SolarLint
We utilize SolarLint as our primary linter to enforce code style conventions and identify potential issues in our codebase. SolarLint not only provides clean code tips but also offers security analysis, thereby enhancing our code quality and security posture.
Example of SolarLint providing clean code tips:

![image](https://github.com/pmatisic/stem2024/assets/100710047/ba4d9efd-8acd-4e97-930c-4078bb9a547c)


# Synk
For static application security testing and software composition analysis, we rely on Synk. Synk is integrated into our continuous integration pipeline, running on every commit pushed to GitHub. It helps us identify and address code vulnerabilities promptly, ensuring the integrity and security of our application.

![image](https://github.com/pmatisic/stem2024/assets/100710047/8fbc196c-d8f5-481b-9cef-d27b88b104cb)

# ZAP Automated Scan
As a final security measure, we conduct a ZAP Automated Scan on our frontend. This scan helps us identify any potential security vulnerabilities in our application. During our last scan, we received only a single warning, which we promptly investigated. Upon review, we found no cloud metadata that could be exploited for a potential attack, ensuring the robustness of our application.

![image](https://github.com/pmatisic/stem2024/assets/100710047/46023f3c-3d37-4392-b0e9-ecd93d380323)

# Access Credentials
To access our application, please use the following login credentials:

- Username: admin@gmail.com
- Password: admin123
