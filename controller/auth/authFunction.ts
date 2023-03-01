import execute from "../../model/oracleClient"

export default class auth {
  // username check
  async check(username: string) {
    /*
    The check function takes in a username parameter as a string, executes a SQL query using execute function, and returns a boolean value based on the result of the query.
    
    The SQL query checks if there user existed in the USER_INFO table that meets the following conditions:
    
    PSTATUS is 'Y'
    USTATUS is 'U' or is null
    USERID matches the provided username in a case-insensitive manner
    
    If the query returns at least one row, then the function returns true, otherwise it returns false.
    */
    const sql: string =
      "SELECT COUNT (*) COUNT FROM AGENT_BANKING.USER_INFO u WHERE     u.PSTATUS = 'Y' AND (u.USTATUS = 'U' OR u.USTATUS IS NULL) AND u.USERID = UPPER ( :username)"

    const bindParams = [username.toString()]
    const payload = await execute(sql, bindParams)
    let temp: any = payload.rows
    return temp[0].COUNT === 0 ? false : true
  }
  //   retrieves roles
  async user(username: string) {
    /* This function retrieves the USERNAME and ROLEID of a user from the AGENT_BANKING.USER_INFO table based on the USERID provided in the username argument. The SQL query filters the rows based on the following conditions:

        PSTATUS column is equal to 'Y'
        USTATUS column is equal to 'U' or is NULL
        USERID column is equal to the value of username argument in uppercase
    The function then executes the query using the execute function and returns the rows from the payload as the result. Here's the updated function with comments explaining each step*/

    try {
      // Define the SQL query with a bind variable for the username
      const sql: string =
        "SELECT USERNAME,ROLEID FROM AGENT_BANKING.USER_INFO u WHERE u.PSTATUS = 'Y' AND (u.USTATUS = 'U' OR u.USTATUS IS NULL) AND u.USERID = UPPER(:username)"
      // Bind the username value to the bind variable
      const bindParams = [username.toUpperCase()]
      // Execute the query using the execute function
      const payload = await execute(sql, bindParams)
      // Return the rows from the payload as the result
      return payload.rows
    } catch (error) {
      console.error(`Error fetching user info for ${username}: ${error}`)
      return null
    }
  }

  // Verify username and password
  async verify(username: string, password: string) {
    try {
      const sql: string =
        "SELECT COUNT (*) COUNT  FROM AGENT_BANKING.USER_INFO u WHERE u.PSTATUS = 'Y' AND (u.USTATUS = 'U' OR u.USTATUS IS NULL) AND u.USERID = UPPER ( :username)  AND TANBIN.FUNC_GET_PIN (u.UPASS) = :password"
      const bindParams = [username.toString(), password.toString()]
      const payload = await execute(sql, bindParams)
      let temp: any = payload.rows
      return temp[0].COUNT == "0" ? false : true
    } catch (error) {
      console.error(error)
      throw new Error("Unable to verify user")
    }
  }

  // Refresh
  async lookRefreshToken(
    username: string,
    token_value: string
  ): Promise<boolean> {
    try {
      const sql: string = `SELECT STATUS FROM TANBIN.JWT_TOKEN WHERE "USER" = :username_value and "TOKEN" = :token_value)`
      const bindParams: any = [token_value.toString(), username.toString()]
      const payload: any = await execute(sql, bindParams)
      return payload.rows
    } catch (error) {
      console.error(error)
      throw new Error("Unable to store refresh token")
    }
  }
  // Refresh Token
  async storeRefreshToken(
    username: string,
    token_value: string
  ): Promise<boolean> {
    try {
      const sql: string = `INSERT INTO TANBIN.JWT_TOKEN (TOKEN, "USER", STATUS, GEN_DATE) VALUES(:token_value, :user_value, 'A', SYSDATE)`
      const bindParams: any = [username.toString(), token_value.toString()]
      const payload: any = await execute(sql, bindParams)
      return !payload.lastRowid ? false : true
    } catch (error) {
      console.error(error)
      throw new Error("Unable to store refresh token")
    }
  }
  // Update Token
  async updateRefreshToken(
    username: string,
    token_value: string
  ): Promise<boolean> {
    try {
      const sql: string = `UPDATE TANBIN.JWT_TOKEN SET STATUS='E',EXP_DATE=SYSDATE WHERE "USER" = :username_value and "TOKEN" = :token_value`
      const bindParams: any = [token_value.toString(), username.toString()]
      const payload: any = await execute(sql, bindParams)
      return !payload.lastRowid ? false : true
    } catch (error) {
      console.error(error)
      throw new Error("Unable to store refresh token")
    }
  }
}
