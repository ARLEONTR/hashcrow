# HashCrow

HASHCROW is a cutting-edge technology that addresses the pressing need for privacy and trust in the online world. It provides trusted links to archives of online resources using cryptographic hashes, allowing users to verify the authenticity of the content and safeguard their personal data. HASHCROW's unique signature for each Internet resource enables users to check whether the content has been altered since it was first published, access to all modified versions, make it easier to trust the information they access online and combat the spread of misinformation.

## Table of Contents

+ [Demo](../../../hashcrow#Demo)
+ [Features](../../../hashcrow#Features)
+ [Contributing](../../../hashcrow#Contributing)
+ [License](../../../hashcrow#License)

## Demo

http://hashed-web-page-demo.s3-website-us-west-2.amazonaws.com/ 

## Features

### Scope

Over 70% of URLs in academic journals do not link to their cited information due to link rot, which hinders transparency. HASHCROW addresses this as well as privacy and trust issues by using cryptographic tools such as hashes, MACs, and digital signatures to create trusted links. This enables users to authenticate their accessed resources and combat misinformation while protecting their data privacy.

### Problem

The internet has transformed the way individuals access and consume information, but this transformation also brings new challenges related to privacy and trust. Distinguishing between authentic and misleading information is increasingly difficult, making it hard for users to trust the content they see online. Additionally, with increasing concerns over data privacy-related risks, there is a need for solutions that allow users to prioritize privacy and trust. HASHCROW addresses this need by providing a platform that allows end-users to verify whether online resources are authentic and trustworthy, ensuring their personal data is protected. For example, Mallory faces potential defamation charges for deleted tweet content. HASHCROW can provide Mallory's accuser with an archive of the deleted tweets using a timestamp and signature technology to verify the tweet's authenticity should they need to pursue legal action.

### Ambition

HASHCROW seeks to revolutionize the way people access and consume online resources by providing cryptographically secure links. When Alice clicks on a URL, the platform displays archived snapshots of the resource and indicates whether the resource has been modified since being uploaded. Alice chooses a snapshot and HASHCROW verifies the signature for the snapshot, indicating whether the link is trusted (origin authenticated and integrity-protected). HASHCROW's browser extension uses a standard OpenAPI interface to communicate with the backend server, allowing users to configure the backend as they see fit. With its user-friendly approach, HASHCROW creates a safer and more trustworthy online ecosystem for various use cases. Academic journals can rely on HASHCROW to combat link rotting while enabling access to reliable and trustworthy information for scholars and researchers.

### Innovation

HASHCROW sets itself apart from existing solutions such as perma.cc by implementing cryptographically secured trust infrastructure to ensure the authenticity and trustworthiness of online resources. It also features an OpenAPI interface to the trust infrastructure for facilitating different front-ends such as browser extensions to access various back-end implementations. For instance, a centralized CA-like server may act on behalf of users for creating signatures of online resources, or a blockchain-based backend can be developed for establishing a distributed trust infrastructure where the signatures are kept on a blockchain. Its user-friendly approach makes it accessible for end-users, addressing the need for technologies and solutions that prioritize privacy and trust.

## Contributing

Thank you for considering contributing to HashCrow! Your contributions help improve the project.

To contribute, please follow these steps:

1. Fork the repository.

2. Create a new branch for your feature or bug fix.

3. Make your changes, adhering to the project's coding conventions.

4. Write unit tests for your code, if applicable.

5. Commit your changes with descriptive messages.

6. Push your changes to your forked repository.

7. Submit a pull request to the `main` branch of the original repository.

Please ensure that your contributions align with the project's goals and adhere to the code of conduct.

Thank you for your contributions!

## License

This project is licensed under the MIT License.
