export const createCommission = (
    email,
    option,
    extras,
    messageData
  ) => `
      mutation{
          createCommission(
              status: "pending"
              request: {
                email: "${email}"
                option: "${option}"
                extras: ["${extras.join('","')}"]
                rawData:  ${JSON.stringify(JSON.stringify(messageData))}
              }
              messages: [
                  {
                      sender: "user"
                      rawData:  ${JSON.stringify(JSON.stringify(messageData))}
                  }
              ]
          ) {
              id
          }
      }
  `;

  export const authenticateUser = () => ``;

  export const signupUser = () => ``;