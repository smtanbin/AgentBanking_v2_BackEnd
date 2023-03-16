
const _url = 'http://10.140.8.126:8080'; // Add the http:// prefix to the URL


export const NetworkRequest = async (
    type = "GET",
    path: string,
    data: any,
) => {
    new Promise<void>(async (resolve, reject) => {
        const { login, token }: any = useAuth();
        if (token) {
            const headers = {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token.token,
            }
            try {
                const response: any = axios({
                    method: type,
                    url: _url + "/api" + path,
                    data,
                    headers,
                })
                if (response.status === 401) {
                    const _token = await TokenRefrash(login, token)
                    if (_token) {
                        const headers = {
                            "Content-Type": "application/json",
                            Authorization: "Bearer " + token.token,
                        }

                        const response: any = axios({
                            method: type,
                            url: _url + "/api/" + path,
                            data,
                            headers,
                        })
                        resolve(response.data)
                    } else {
                        reject("Token Error R")
                    }
                }
            } catch (error) {
                return false
            }
        } else {

        }
    })
}

const TokenRefrash = (login: (arg0: { token: any; refreshToken: any }) => void, token: { token: string; refreshToken: any }) => {
    return new Promise<boolean>(async (resolve, reject) => {

        if (token) {
            const headers = {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token.token,
            }
            const data = { "refreshToken": token.refreshToken };
            const response: any = axios({
                method: "POST",
                url: _url + "/api/login/refrashToken",
                data: data,
                headers,
            })
            if (response.status === 200) {
                const { token } = response.data;
                login({ token: token, refreshToken: token.refreshToken });
                resolve(true)
            } else {
                console.log("Error" + response)
                reject(false)
            }
        } else {
            console.log("No token found")
            return "false"
        }
    })
}
function useAuth(): any {
    throw new Error("Function not implemented.");
}

function axios(arg0: { method: string; url: string; data: any; headers: { "Content-Type": string; Authorization: string; }; }) {
    throw new Error("Function not implemented.");
}

