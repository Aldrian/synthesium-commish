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
  
export const getCommissionData = (id) => `
    query {
        Commission(id: "${id}") {
            messages {
                sender
                createdAt
                rawData
            }
        }
    }  
`;

  export const authenticateUser = () => ``;

  export const signupUser = () => ``;