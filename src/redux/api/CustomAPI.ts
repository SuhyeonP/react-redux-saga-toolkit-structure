import axios, { AxiosResponse } from 'axios';
import { IAdminState, LoginForm } from '~/redux/reducers';
import { IResponseData } from '~/redux/types/common';

const baseURL = '';

const filteringData = <T>(
  res: AxiosResponse<IResponseData<T>>,
): IResponseData<T> => {
  const { ok, err, result } = res.data;

  if (ok) {
    return { ok, err, result };
  } else {
    return {
      ok,
      result,
      err: {
        code: err.code,
        v: err.code,
      },
    };
  }
};

export const CustomAPI = {
  login: async (loginForm: LoginForm) => {
    const response: AxiosResponse<IResponseData<IAdminState>> =
      await axios.post('/', JSON.stringify(loginForm), {
        baseURL,
        headers: {
          'Content-type': 'application/json',
        },
      });

    if (response.status === 200) {
      return filteringData(response);
    }
  },
  logout: async () =>
    await axios.post(
      '',
      JSON.stringify({
        bearer_token: localStorage.getItem('authenticate'),
      }),
    ),
};
