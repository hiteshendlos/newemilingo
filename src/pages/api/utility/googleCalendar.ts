import axios from "axios";
const { google } = require("googleapis");

// import credentials from '@/services/config/'
// const privatekey = require("@/services/config/CalendyCredentials.json");

// export default async function googleCalendar(query: any) {
//   try {
//     // Load the stored access token and refresh token
//     const storedAccessToken =
//       "eyJhbGciOiJSUzI1NiIsImtpZCI6IjFiYjI2MzY4YTNkMWExNDg1YmNhNTJiNGY4M2JkYjQ5YjY0ZWM2MmYiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiSGl0ZXNoIEt1bWFyIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FHTm15eFpFNFhObTVjaFRMVjRsM0NCZFhBS1JfWWxNLW9ZLXI1LVJ2STlMPXM5Ni1jIiwiaXNzIjoiaHR0cHM6Ly9zZWN1cmV0b2tlbi5nb29nbGUuY29tL2VuZGxvcy1lbWFpbC00MWNhNyIsImF1ZCI6ImVuZGxvcy1lbWFpbC00MWNhNyIsImF1dGhfdGltZSI6MTY4NDMyNDM5NSwidXNlcl9pZCI6ImVqTEUwOGtSeE9SOXE4SXVBN0R5NUk2blRvWjIiLCJzdWIiOiJlakxFMDhrUnhPUjlxOEl1QTdEeTVJNm5Ub1oyIiwiaWF0IjoxNjg0MzI0Mzk1LCJleHAiOjE2ODQzMjc5OTUsImVtYWlsIjoiaGl0ZXNoLmVuZGxvc0BnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJnb29nbGUuY29tIjpbIjExMzkyODI1NDU0OTQxMzQ5OTQ4MiJdLCJlbWFpbCI6WyJoaXRlc2guZW5kbG9zQGdtYWlsLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6Imdvb2dsZS5jb20ifX0.uwwvFkQx4Sdz9ZJAKGl70Nf2KXUFDFs4zLQBazpOgyeW979Rc2dC_c1jtwzMqD-oMPPQfr0B07QXRq3YYqSUBNMajszAfdggykq9T1c_1Gq-SZiJMid6Nl7zc3CJZX97hHjGE0zkND13uSBBAMTuJqiZgWvCl_a9FTHJSMvpIDaiU-abXyJMHHf_FM8jcVSi-XfiRXEYuIZVGSPWd0ri18Nc5gd__djJm4zvfEC5eInO9dbK08CLavWuknzeW63sMGF1Ej9rkJSIk6ELAqTnR9Xogsk-SJNv6bIAkxmQDhPH3eHzVJLu2FSH-rR2ygsuGtU-sy-5FyO711eAEemLLw"; // Replace with the stored access token
//     const refreshToken =
//       "eyJhbGciOiJSUzI1NiIsImtpZCI6IjFiYjI2MzY4YTNkMWExNDg1YmNhNTJiNGY4M2JkYjQ5YjY0ZWM2MmYiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiSGl0ZXNoIEt1bWFyIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FHTm15eFpFNFhObTVjaFRMVjRsM0NCZFhBS1JfWWxNLW9ZLXI1LVJ2STlMPXM5Ni1jIiwiaXNzIjoiaHR0cHM6Ly9zZWN1cmV0b2tlbi5nb29nbGUuY29tL2VuZGxvcy1lbWFpbC00MWNhNyIsImF1ZCI6ImVuZGxvcy1lbWFpbC00MWNhNyIsImF1dGhfdGltZSI6MTY4NDMyNDM5NSwidXNlcl9pZCI6ImVqTEUwOGtSeE9SOXE4SXVBN0R5NUk2blRvWjIiLCJzdWIiOiJlakxFMDhrUnhPUjlxOEl1QTdEeTVJNm5Ub1oyIiwiaWF0IjoxNjg0MzI0Mzk1LCJleHAiOjE2ODQzMjc5OTUsImVtYWlsIjoiaGl0ZXNoLmVuZGxvc0BnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJnb29nbGUuY29tIjpbIjExMzkyODI1NDU0OTQxMzQ5OTQ4MiJdLCJlbWFpbCI6WyJoaXRlc2guZW5kbG9zQGdtYWlsLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6Imdvb2dsZS5jb20ifX0.uwwvFkQx4Sdz9ZJAKGl70Nf2KXUFDFs4zLQBazpOgyeW979Rc2dC_c1jtwzMqD-oMPPQfr0B07QXRq3YYqSUBNMajszAfdggykq9T1c_1Gq-SZiJMid6Nl7zc3CJZX97hHjGE0zkND13uSBBAMTuJqiZgWvCl_a9FTHJSMvpIDaiU-abXyJMHHf_FM8jcVSi-XfiRXEYuIZVGSPWd0ri18Nc5gd__djJm4zvfEC5eInO9dbK08CLavWuknzeW63sMGF1Ej9rkJSIk6ELAqTnR9Xogsk-SJNv6bIAkxmQDhPH3eHzVJLu2FSH-rR2ygsuGtU-sy-5FyO711eAEemLLw"; // Replace with the stored refresh token

//     // Create an OAuth2 client
//     const oAuth2Client = new google.auth.OAuth2(
//       "111184343526595140941",
//       "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCxt5l7xwLKv7Sf\n0sNwKct5buL/bxupYAj8PUpBQafHUn1FcOS2ej5314wG1t9edAqXPZ1qEzrIbxzU\nfSWvc/semQRbI5bCiKO+yyv3iVysnrvkrr4DlxqC9sj4Wnt4M74XkTx04UkkxlRR\niSZmiBDEthukUfgNwFKDk0JGRorKb/RpBmB5pMTx1R20QpSumh+Mcm0vTxogaMkL\nJluyCeZtNuIiW55Lu5dNNU35l7gzcqiC3GArCOGhdGdBLl5qwxpufmGhURy2DrJD\nabfQKRieh2XJwpBtQir0QrJ2c4i6kXnTtYmIC76ygbUshIczuvTQENbBLOWrLrhI\nwXAUAkxRAgMBAAECggEAA7M0kIsBji7GDj+jGvUGRI5YxRLUM4dTQS5k3/6hLLH3\nvHz+nC6Y6IHXRAemJfflcmXixjLAmhhP+TIdhasDu5aU548DgyQbmZDa3QYuVhLy\nbZZvAbZIbaMjjivXyQKTY62bfzyyIooGisVEsMnLggp845xPbpE+9VEY8nLY66qi\n0+GFLClGBzrC7bG7sZT0SXl45O4D7a1pugN2jxdqqg3WCVckvTZH08hlz4/JI7AZ\ndQq7GpB/GBO0at5wu54WlDZ4ml3PEluW0fyGD+d8tnUOy+iF0wWN1YKWLpjqsTtb\ngJSKtotmb25d7Bs1Bq/sdXpWMZLVPCyIwNeMUZq/KQKBgQD4haMCBh2AOIJW3fgN\nplFf98wA/aJawIEqdOcTGga13yxORMU5P71jGaPVBDjHfLVmBQQAJ/HJIuCSXyKg\n8EACltAYeGVHkfI6ppQF2Bue0ls0xLES+9AFfOMAOzKxFROGaCnmd8dUAJ1w2rcE\nHW/SqEOHT4sA9xvLXB5RYU+2+wKBgQC3EI2/Hu3gGBxdvgHf62J2Yt/++0vj42Qb\n2fE95X1VKviFLwYkukJcOYel7+eRtCs4lDV3AUn9g5DECK3Ni5cWmkMS8HiuhJFv\nucPC3G1dFnSUXRa0+jx/7ijEVpzhZ1ZTjQUlJ4or/Uef55mhyjr0zlh/zxOVZYw+\nF9lBD8JYIwKBgQDx5qovOyKV/usngLGFH8GPhxRkVn0klsJjQBz349pqRwvKN3g9\nbER85KUqoAxgaIvs/K7TNA5N+IvdDYsYWiIEIyX026PBkVbVLfVg5uSjqB+s8lNl\npgPqg5A1VmnWIiy6JEO8mBRGOL8G7W09LSX+R1hLqeoki2LbhBPipLTB5wKBgDj5\nmPQrvyMoveNbGKBFVS69VTO5qIPzqJuWeCOoghp4tkJVQVc69R5Y9WPqx6qsZWtF\njWJNb2bMhMjOXrGDSXHKbye82gKO1ejs6wWBrzPyojPuyPtoil3SlLOOtWLd05tL\nX5eRt8o7GQimf0VAeJrqgda9bz3nDf/hUkeSjQz7AoGAORCFLxg1ZkFHMYVMtlSf\nTRR65du1JHUgUsYqZSzvXQuRyFord2v2BpPbnChmM+BkWpZc072nQYhkh9URnaXa\nwqIU5gBFIb+Cb3J740/wlgl92mpA5sRHN7YXwd8H+gx/bi9bHZSAuS62rP/YISzW\nzq9MU/ep7DH3wEEthGQ2jfI=\n-----END PRIVATE KEY-----\n"
//     );

//     // Set the credentials using the stored access token
//     oAuth2Client.setCredentials({
//       access_token: storedAccessToken,
//       refresh_token: refreshToken,
//     });

//     // Create a new calendar event
//     const createEvent = async (auth: any) => {
//       const calendar = google.calendar({ version: "v3", auth });
//       const event = {
//         summary: "Test Event",
//         start: {
//           dateTime: "2023-05-18T10:00:00",
//           timeZone: "America/New_York",
//         },
//         end: {
//           dateTime: "2023-05-18T11:00:00",
//           timeZone: "America/New_York",
//         },
//         description: "This is a test event.",
//       };

//       try {
//         const response = await calendar.events.insert({
//           calendarId: "primary", // Use 'primary' for the user's primary calendar
//           resource: event,
//         });

//         console.log("Event created:", response.data);
//       } catch (error) {
//         console.error("Error creating event:", error);
//       }
//     };

//     // Call the createEvent function with the authenticated client
//     createEvent(oAuth2Client);

//     // // Define the event details
//     // const eventDetails = {
//     //   summary: "Event Title",
//     //   description: "Event Description",
//     //   start: {
//     //     dateTime: "2023-05-18T10:00:00", // Replace with the start date and time in the correct format
//     //     timeZone: "Your Time Zone", // Replace with the desired time zone
//     //   },
//     //   end: {
//     //     dateTime: "2023-05-18T12:00:00", // Replace with the end date and time in the correct format
//     //     timeZone: "Your Time Zone", // Replace with the desired time zone
//     //   },
//     //   reminders: {
//     //     useDefault: false,
//     //     overrides: [
//     //       { method: "email", minutes: 60 }, // Set a reminder email 60 minutes before the event
//     //       { method: "popup", minutes: 30 }, // Set a popup reminder 30 minutes before the event
//     //     ],
//     //   },
//     // };

//     // const auth = new google.auth.GoogleAuth({
//     //   credentials: {
//     //     client_email: "hitesh.endlos@gmail.com",
//     //     // idToken:
//     //     //   "eyJhbGciOiJSUzI1NiIsImtpZCI6IjFiYjI2MzY4YTNkMWExNDg1YmNhNTJiNGY4M2JkYjQ5YjY0ZWM2MmYiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiSGl0ZXNoIEt1bWFyIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FHTm15eFpFNFhObTVjaFRMVjRsM0NCZFhBS1JfWWxNLW9ZLXI1LVJ2STlMPXM5Ni1jIiwiaXNzIjoiaHR0cHM6Ly9zZWN1cmV0b2tlbi5nb29nbGUuY29tL2VuZGxvcy1lbWFpbC00MWNhNyIsImF1ZCI6ImVuZGxvcy1lbWFpbC00MWNhNyIsImF1dGhfdGltZSI6MTY4NDMxODQ4MiwidXNlcl9pZCI6ImVqTEUwOGtSeE9SOXE4SXVBN0R5NUk2blRvWjIiLCJzdWIiOiJlakxFMDhrUnhPUjlxOEl1QTdEeTVJNm5Ub1oyIiwiaWF0IjoxNjg0MzE4NDgyLCJleHAiOjE2ODQzMjIwODIsImVtYWlsIjoiaGl0ZXNoLmVuZGxvc0BnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJnb29nbGUuY29tIjpbIjExMzkyODI1NDU0OTQxMzQ5OTQ4MiJdLCJlbWFpbCI6WyJoaXRlc2guZW5kbG9zQGdtYWlsLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6Imdvb2dsZS5jb20ifX0.NJadvEd-Auszdi6PnbeJPHeP6sRF8BGSUFABbhy7ToBas3NCi3XI1Z09fOgFGL59YpFZxome8GgyJImMLPia6ljnFQRjj0AaWRntHcgWAMEf9go_LZjfyQEXcK6D_d3Lq2YH3BPLCFDBIkW_I2Alo-QecECEf1hCykaByhkMsIbhYqb01-2aTWy_ezLR9O_JX9JpuXtn9MGTvlGUr28jN_DqIIlO-XLF876Z02_pKWnDmAHgbkNN3HJfrXPRhAjTj5CXYwQZSTVt-eCJ-Eh8Cn_zU2vW_pMG5Zg66Xm0r71c0swFKffzJt_Ox3sgUhLHJ0prPiWLWCxDQ9pCmSnudg",
//     //     idToken:
//     //       "ya29.a0AWY7CkmJJpsxxKsnwx6_l1Ej2zQHbTIg2y7PRCHqK3cgqWoazWAAMlLAEFI9exu1EvfTAU9oeSHA7CGsaie3b5kD3_R5_5bDEH6m03aV2ihxLNn5X5S3W14VsTn_7hAmoMCpvpNJqE10BZEWRbpuABTgS0J-aCgYKAT4SARMSFQG1tDrpi9N0yE_A_RJ5L9PNYYkKcw0163",

//     //     privatekey: {
//     //       type: "service_account",
//     //       project_id: "endlos-email",
//     //       private_key_id: "e90139042c3414dc621cf4c228ab0cd7f5cd6854",
//     //       private_key:
//     //         "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCxt5l7xwLKv7Sf\n0sNwKct5buL/bxupYAj8PUpBQafHUn1FcOS2ej5314wG1t9edAqXPZ1qEzrIbxzU\nfSWvc/semQRbI5bCiKO+yyv3iVysnrvkrr4DlxqC9sj4Wnt4M74XkTx04UkkxlRR\niSZmiBDEthukUfgNwFKDk0JGRorKb/RpBmB5pMTx1R20QpSumh+Mcm0vTxogaMkL\nJluyCeZtNuIiW55Lu5dNNU35l7gzcqiC3GArCOGhdGdBLl5qwxpufmGhURy2DrJD\nabfQKRieh2XJwpBtQir0QrJ2c4i6kXnTtYmIC76ygbUshIczuvTQENbBLOWrLrhI\nwXAUAkxRAgMBAAECggEAA7M0kIsBji7GDj+jGvUGRI5YxRLUM4dTQS5k3/6hLLH3\nvHz+nC6Y6IHXRAemJfflcmXixjLAmhhP+TIdhasDu5aU548DgyQbmZDa3QYuVhLy\nbZZvAbZIbaMjjivXyQKTY62bfzyyIooGisVEsMnLggp845xPbpE+9VEY8nLY66qi\n0+GFLClGBzrC7bG7sZT0SXl45O4D7a1pugN2jxdqqg3WCVckvTZH08hlz4/JI7AZ\ndQq7GpB/GBO0at5wu54WlDZ4ml3PEluW0fyGD+d8tnUOy+iF0wWN1YKWLpjqsTtb\ngJSKtotmb25d7Bs1Bq/sdXpWMZLVPCyIwNeMUZq/KQKBgQD4haMCBh2AOIJW3fgN\nplFf98wA/aJawIEqdOcTGga13yxORMU5P71jGaPVBDjHfLVmBQQAJ/HJIuCSXyKg\n8EACltAYeGVHkfI6ppQF2Bue0ls0xLES+9AFfOMAOzKxFROGaCnmd8dUAJ1w2rcE\nHW/SqEOHT4sA9xvLXB5RYU+2+wKBgQC3EI2/Hu3gGBxdvgHf62J2Yt/++0vj42Qb\n2fE95X1VKviFLwYkukJcOYel7+eRtCs4lDV3AUn9g5DECK3Ni5cWmkMS8HiuhJFv\nucPC3G1dFnSUXRa0+jx/7ijEVpzhZ1ZTjQUlJ4or/Uef55mhyjr0zlh/zxOVZYw+\nF9lBD8JYIwKBgQDx5qovOyKV/usngLGFH8GPhxRkVn0klsJjQBz349pqRwvKN3g9\nbER85KUqoAxgaIvs/K7TNA5N+IvdDYsYWiIEIyX026PBkVbVLfVg5uSjqB+s8lNl\npgPqg5A1VmnWIiy6JEO8mBRGOL8G7W09LSX+R1hLqeoki2LbhBPipLTB5wKBgDj5\nmPQrvyMoveNbGKBFVS69VTO5qIPzqJuWeCOoghp4tkJVQVc69R5Y9WPqx6qsZWtF\njWJNb2bMhMjOXrGDSXHKbye82gKO1ejs6wWBrzPyojPuyPtoil3SlLOOtWLd05tL\nX5eRt8o7GQimf0VAeJrqgda9bz3nDf/hUkeSjQz7AoGAORCFLxg1ZkFHMYVMtlSf\nTRR65du1JHUgUsYqZSzvXQuRyFord2v2BpPbnChmM+BkWpZc072nQYhkh9URnaXa\nwqIU5gBFIb+Cb3J740/wlgl92mpA5sRHN7YXwd8H+gx/bi9bHZSAuS62rP/YISzW\nzq9MU/ep7DH3wEEthGQ2jfI=\n-----END PRIVATE KEY-----\n",
//     //       client_email: "emailify@endlos-email.iam.gserviceaccount.com",
//     //       client_id: "111184343526595140941",
//     //       auth_uri: "https://accounts.google.com/o/oauth2/auth",
//     //       token_uri: "https://oauth2.googleapis.com/token",
//     //       auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
//     //       client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/emailify%40endlos-email.iam.gserviceaccount.com",
//     //       universe_domain: "googleapis.com",
//     //     },

//     //     //           client_id:"836048737248-kvdus072fd64kgacov6l1lig1j2cad67.apps.googleusercontent.com",
//     //     // project_id:"endlos-email",
//     //     // auth_uri:"https://accounts.google.com/o/oauth2/auth",
//     //     // token_uri:"https://oauth2.googleapis.com/token",
//     //     // auth_provider_x509_cert_url:"https://www.googleapis.com/oauth2/v1/certs",
//     //     // client_secret:"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",
//     //     // javascript_origins:["http://localhost"]},
//     //   },

//     //   scopes: ["https://www.googleapis.com/auth/calendar"],
//     // });

//     // const calendar = google.calendar({ version: "v3", auth });
//     // const response = await calendar.events.insert({
//     //   calendarId: "primary", // Use 'primary' for the user's primary calendar
//     //   requestBody: eventDetails,
//     // });

//     // console.log("Event with reminders created:", response.data.htmlLink);
//   } catch (error) {
//     console.error("Error:", error);
//   }

//   //   return data;
// }
// export default async function googleCalendar(query: any) {
//   try {
//     const client_id = "846260142876-1ikkf0rpkviln05h2ncvng5buoa2ld9k.apps.googleusercontent.com";
//     const client_secret = "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";

//     // Create an OAuth2 client
//     const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, "http://localhost:3000");

//         const storedAccessToken =
//           "eyJhbGciOiJSUzI1NiIsImtpZCI6IjgyMjgzOGMxYzhiZjllZGNmMWY1MDUwNjYyZTU0YmNiMWFkYjViNWYiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJuYmYiOjE2ODQzODk3NTgsImF1ZCI6Ijg0NjI2MDE0Mjg3Ni0xaWtrZjBycGt2aWxuMDVoMm5jdm5nNWJ1b2EybGQ5ay5hcHBzLmdvb2dsZXVzZXJjb250ZW50LmNvbSIsInN1YiI6IjExMzkyODI1NDU0OTQxMzQ5OTQ4MiIsImVtYWlsIjoiaGl0ZXNoLmVuZGxvc0BnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiYXpwIjoiODQ2MjYwMTQyODc2LTFpa2tmMHJwa3ZpbG4wNWgybmN2bmc1YnVvYTJsZDlrLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwibmFtZSI6IkhpdGVzaCBLdW1hciIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BR05teXhaRTRYTm01Y2hUTFY0bDNDQmRYQUtSX1lsTS1vWS1yNS1Sdkk5TD1zOTYtYyIsImdpdmVuX25hbWUiOiJIaXRlc2giLCJmYW1pbHlfbmFtZSI6Ikt1bWFyIiwiaWF0IjoxNjg0MzkwMDU4LCJleHAiOjE2ODQzOTM2NTgsImp0aSI6IjM2ZDFmYjQ0YmIwOTVjYTIyZGUzYTJiZTE3OWY5YjA1YThkYTFkZGMifQ.d9o95bcFcKPg7mkROltHzok-YwiFH0qt7ZyalJSNriL7DfyGdpFVcV_AgD2ESuhXIstiLhHtoBwYUN2MM2ULT7n9ixiE_XhlPBeIYI6QeiTtpqlG8cFY7QC2_BFcaUExv7v2UeWS8ob5mB-GMvvIEfFymEZmfTpOOwwUZOUjPXwdsFUBXgHjp8Nt3cKuefh6OGTCVTInz6hF7Ok6Ibi8Y9_L2fC8HE1IoeUePp3_4FJcwfzGEHzdrHf4Pz7AMcrwAZtvAHePfACy7KyG9UFBuRZw2NG8yTLKMDYFcIY_R1cwlUMk-4bhZTlHUwWOtHHmvDM-l_4rUaXn195gymbj8g"; //


//           const refreshToken =
//             "APZUo0QN8oHNLpt84M0oU4YE8_4R6AB5HdU4qQZWqQqsjGedc08rLUI-hSQkNPgUGPRXXnKNz9lgpezBXf9CD2JNR8uhRs4Xeeg4RSdFhwq9MIM2U8QwiysFNA-bRS3YFMsjw1KBkFwFPsJHd_0aukLjO-NvJXWqr_sW7zEiy7qhMZAQ5kkpFgzO-ZqGzNnb3lNXkdeEb9UBD_8GQWPOZo4kTCjTG4K44rUBnBii_31zt01zvIEdFiN1vhpDUfYOwEB4mCsj_vWAVxTSInpGDKW7WPl0-6G1B94BGiGhmpLyR0ZH4bD4I9H8gN014YFrqluQ5_Sdxpl3W-zOSYrJTMqxrrfWhBdJqLay4xx-nwDr46UT7sXVSXZyy2NrJzgpeWR2OOEMJFl19qPe3xjTc3hA8pIMStSqksdn_VY5LGkegEk43khEzBk";

//     const response = await oAuth2Client.getToken(storedAccessToken);




//     // await fetch ("https://www.googleapis.com/calendar/v3/calendars/primary/evernts",{
//     //   method:"POST",
//     //   headers:{
//     //     'Authorization':'Bearer'+storedAccessToken
//     //   }


   
//     const myevent = {
//       'summary': "eventName",
//       'description': "eventDescription",
//       'start': {
//         'dateTime': "2023-05-18T10:00:00", // Date.toISOString() ->
//         'timeZone': Intl.DateTimeFormat().resolvedOptions().timeZone // America/Los_Angeles
//       },
//       'end': {
//         'dateTime': "2023-05-18T10:00:00", // Date.toISOString() ->
//         'timeZone': Intl.DateTimeFormat().resolvedOptions().timeZone // America/Los_Angeles
//       }
//     }
//     await fetch("https://www.googleapis.com/calendar/v3/calendars/primary/events", {
//       method: "POST",
//       headers: {
//         'Authorization':'Bearer ' + storedAccessToken // Access token for google
//       },
//       body: JSON.stringify(myevent)
//     }).then((data) => {
//       return data.json();
//     }).then((data) => {
//       console.log(data);
   
//     });



//  console.log({response});
//   } catch (error) {
//     console.error("Error:", error);
//   }

//   //   return data;
// }


type EventInformation = {
  Summary: string;
  DueAmount: string;
  DueDate: string;
};





export default async function googleCalendar(EventInfomation: EventInformation) {
  try {
    // Load the stored access token and refresh token

    const clientId = "846260142876-1ikkf0rpkviln05h2ncvng5buoa2ld9k.apps.googleusercontent.com";
    const access_token =
      "ya29.a0AWY7CkmyuuyHC7sDCZ9uEEAHUKuWqtxxupMmd7-4AXNEmUQ__dtR2PQQU9lL-qutEH1SUpOsNltaJgk3D5OJL2fsoMAyN5tGk_e-b9q8ZfGgPPUPfBPtD6R4b4O693_nqwKUqABgWrWppHB-pI7ZQAH_fl4DaCgYKAb8SARMSFQG1tDrpF23n1muomzhnluactYlurw0163";
    //  / Replace with the stored access token
    // Create a new instance of the OAuth2 client
    const oauth2Client = new google.auth.OAuth2();
    oauth2Client.setCredentials({
      access_token: access_token,
      clientId,
    });

    // Create an instance of the Google Calendar API
    const calendar = google.calendar({ version: "v3", auth: oauth2Client });

    // const event = {
    //   summary: "Hitesh Event Setting",
    //   start: {
    //     dateTime: "2023-05-18T16:30:00+05:30",
    //     timeZone: "Asia/Kolkata",
    //   },
    //   end: {
    //     dateTime: "2023-05-18T17:30:00+05:30",
    //     timeZone: "Asia/Kolkata",
    //   },
    //   description: "This is a test event. BY CODE",
    // };

    const event = {
      summary: EventInfomation?.Summary ? EventInfomation?.Summary : "Hitesh Event Setting",
      start: {
        dateTime: EventInfomation.DueDate,
        timeZone: "Asia/Kolkata",
      },
      end: {
        dateTime: EventInfomation.DueDate,
        timeZone: "Asia/Kolkata",
      },
      description:`Your Amount due ${EventInfomation.DueAmount}`,
      location: "india",
      colorId: "7",
    };

  //   // API request to fetch events within the time range
  //  // Make API request to retrieve the list of calendars
  //   const response = await calendar.calendarList.list()

  //   // console.log({calendarlist:response});
  //   console.log({calendarlist:response.data.items});






    calendar.events.insert(
      {
        calendarId: "primary",
        requestBody: event,
        //  requestBody: {

        //    summary: "Hitesh Event Setting",
        //    start: {
        //      dateTime: "2023-05-18T16:30:00+05:30",
        //      timeZone: "Asia/Kolkata",
        //    },
        //    end: {
        //      dateTime: "2023-05-18T17:30:00+05:30",
        //      timeZone: "Asia/Kolkata",
        //    },
        //    location:"india",
        //    description: "This is a test event. BY CODE",
        //    colorId:"7"
        //  },
      },
      (err: any, res: any) => {
        if (err) {
          console.error("Error creating event:", err);
          return;
        }
        console.log("Event created:", res.data.htmlLink);
      }
    );
  } catch (error) {
    console.error("Error:", error);
  }

  //   return data;
}