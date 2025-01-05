import { Account, AppwriteException, Avatars, Client, Databases, ID, OAuthProvider } from "react-native-appwrite"
import * as Linking from 'expo-linking'
import { openAuthSessionAsync } from "expo-web-browser"


import { User } from "./global-provider"

const EXPO_PUBLIC_APPWRITE_PROJECT_ID = "67798bf60031d5df9d7b"
const EXPO_PUBLIC_APPWRITE_ENDPOINT = "https://cloud.appwrite.io/v1"
const EXPO_PUBLIC_APPWRITE_STORAGE_ID = "6779d52b00195f2095ac"
const EXPO_PUBLIC_APPWRITE_DATABASE_ID = "6779d5db002637002052"
const EXPO_PUBLIC_USER_COLLECTION_ID = "6779d63100221ad7f464"


export const config = {
  platform: 'com.table42app.TABLE42',
  endpoint: EXPO_PUBLIC_APPWRITE_ENDPOINT,
  projectId: EXPO_PUBLIC_APPWRITE_PROJECT_ID,
  databaseId: EXPO_PUBLIC_APPWRITE_DATABASE_ID,
  userCollectionId: EXPO_PUBLIC_USER_COLLECTION_ID,
}

export const client = new Client();

client
  .setEndpoint(config.endpoint!)
  .setProject(config.projectId!)
  .setPlatform(config.platform!)

export const avatar = new Avatars(client);
export const account = new Account(client);
export const databases = new Databases(client);

export async function login() {
  try {
    const redirectUri = Linking.createURL('/');

    const response = await account.createOAuth2Token(OAuthProvider.Google, redirectUri)

    if (!response) throw new Error("Failed to login");

    const browserResult = await openAuthSessionAsync(
      response.toString(),
      redirectUri
    )

    if (browserResult.type != 'success') throw new Error("Failed to login");
    const url = new URL(browserResult.url);

    const secret = url.searchParams.get('secret')?.toString();
    const userId = url.searchParams.get('userId')?.toString();

    if (!secret || !userId) throw new Error("Failed to login");

    const session = await account.createSession(userId, secret);
    if (!session) throw new Error("Failed to create a session");

    const userDetails = await account.get();

    console.log(userDetails)


    try {

      const result = await databases.getDocument(
        config.databaseId,
        config.userCollectionId,
        userDetails.$id
      );

      console.log(result);

    } catch (error) {
      if (error instanceof AppwriteException && error.code === 404) {

        console.log("Yo");

        await databases.createDocument(config.databaseId, config.userCollectionId, userDetails.$id, {
          userID: userDetails.$id,
        });
        console.log("New User created");

      } else {
        console.error(error);
      }
    }




    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function logout() {
  try {
    await account.deleteSession('current');
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function getCurrentUser() {
  try {
    const response = await account.get();

    if (response.$id) {
      const userAvatar = avatar.getInitials(response.name);

      return {
        ...response,
        avatar: userAvatar.toString()
      }
    }
  } catch (error) {
    console.error(error);
    return null;
  }
}

// export async function saveUserToDB(user: User) {
//   try {
//     const newUser = await databases.createDocument(config.databaseId, config.userCollectionId, user.$id, user)
//   } catch (error) {
//     console.log(error);
//   }
// }