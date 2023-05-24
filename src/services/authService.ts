import $authAPI from "@/http/auth"

const checkEmail = async (email: string): Promise<boolean> => {

  try {
    const { data: result } = await $authAPI.get(`/check/${email}`);
    
    console.log(result);

    return !!result;
  } catch (error) {
    return false; 
  }
}

const register = async (email: string, password: string) => {

  try {
    const { data: result } = await $authAPI.post("/registration", {
      email,
      password
    });
    
    console.log(result);

    return result;

  } catch (error) {
    console.log(error);
  }
}


export default { checkEmail, register };