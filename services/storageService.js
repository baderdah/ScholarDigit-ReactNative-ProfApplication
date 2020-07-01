async function setVar(key, value) {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    console.log("error saving data", error);
  }
}

async function getVar(key) {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return await value;
    }
  } catch (error) {
    // Error retrieving data
    console.log("Error retrieving data", error);
  }
}

async function removeItem(key) {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.log("error deleting data", error);
  }
}
